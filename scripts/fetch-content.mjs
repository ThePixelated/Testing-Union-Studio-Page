/**
 * Pulls the published content from Sanity and writes it to src/content/snapshot.ts.
 *
 *  - Runs automatically when `npm run dev` / `npm run build` starts (see vite.config.ts).
 *  - Manual run:  node scripts/fetch-content.mjs
 *  - No npm dependencies: it calls the Sanity HTTP API with fetch (Node 18+).
 *  - Only PUBLISHED documents are returned (drafts need a token and are never fetched).
 *
 * Environment (shell, CI, .env or .env.local in the project root):
 *   SANITY_PROJECT_ID   required to talk to Sanity (without it the committed snapshot is used)
 *   SANITY_DATASET      default "production"
 *   CONTENT_STRICT=1    production safety: fail the build instead of silently shipping old content
 *   ALLOW_EMPTY=1       accept a dataset with zero projects
 *   SANITY_API_HOST     override (testing)
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const API_VERSION = '2025-01-01'
const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SNAPSHOT = fileURLToPath(new URL('../src/content/snapshot.ts', import.meta.url))

/** Localized fields are stored as { id, en }; always project them without _type. */
const L = (name) => `${name}{ id, en }`

export const QUERY = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    contactEmail,
    ${L('replyPromise')},
    socialLinks[]{ platform, url }
  },
  "homePage": *[_type == "homePage"][0]{
    ${L('heroEyebrow')}, ${L('heroLine1')}, ${L('heroEm')}, ${L('heroRest')}, ${L('heroSubtitle')},
    ${L('aboutPreviewHeadline')}, ${L('aboutPreviewBody')},
    ${L('capabilitiesCopy')}, capabilities[]{ id, en }
  },
  "aboutPage": *[_type == "aboutPage"][0]{ ${L('heading')}, ${L('statement')}, ${L('body')} },
  "projects": *[_type == "project" && defined(slug.current)] | order(coalesce(sortOrder, 9999) asc, title asc){
    "slug": slug.current,
    title, category, status, origin, ambientColor, sortOrder, showInHero, showOnHome,
    ${L('summary')}, year, platform, tools, ${L('role')},
    story{ ${L('challenge')}, ${L('approach')}, ${L('result')} },
    links[]{ ${L('label')}, url },
    slides[]{
      _type,
      _type == "imageSlide" => { "image": image.asset->url },
      _type == "videoSlide" => { "video": video.asset->url, "poster": poster.asset->url }
    }
  },
  "services": *[_type == "service"] | order(coalesce(sortOrder, 9999) asc){
    ${L('title')}, ${L('description')}, ${L('audience')}, deliverables[]{ id, en },
    "evidence": evidenceProjects[]->slug.current
  },
  "faq": *[_type == "faq"] | order(coalesce(sortOrder, 9999) asc){ ${L('question')}, ${L('answer')} }
}`

function parseEnvFile(path) {
  const out = {}
  if (!existsSync(path)) return out
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i)
    if (match && !line.trim().startsWith('#')) out[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
  }
  return out
}

function readEnv(extra = {}) {
  const files = { ...parseEnvFile(`${ROOT}.env`), ...parseEnvFile(`${ROOT}.env.local`) }
  const shell = Object.fromEntries(Object.entries(process.env).filter(([, value]) => value !== undefined))
  // priority: explicit argument > real environment > .env.local > .env
  return { ...files, ...shell, ...Object.fromEntries(Object.entries(extra).filter(([, value]) => value !== undefined && value !== '')) }
}

/** Remove null / empty values so the snapshot only contains what editors actually filled in. */
function prune(value) {
  if (Array.isArray(value)) return value.map(prune).filter((item) => item !== undefined)
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).map(([key, item]) => [key, prune(item)]).filter(([, item]) => item !== undefined)
    return entries.length ? Object.fromEntries(entries) : undefined
  }
  if (value === null || value === undefined) return undefined
  if (typeof value === 'string' && value.trim() === '') return undefined
  return value
}

const truthy = (value) => value === '1' || value === 'true'

export async function fetchContent({ env: extraEnv, log = console } = {}) {
  const env = readEnv(extraEnv)
  const strict = truthy(env.CONTENT_STRICT)
  const projectId = env.SANITY_PROJECT_ID

  if (!projectId) {
    const message = 'SANITY_PROJECT_ID is not set'
    if (strict) throw new Error(`[content] ${message} (CONTENT_STRICT is on)`)
    log.info(`[content] ${message}: using the committed snapshot (src/content/snapshot.ts).`)
    return { source: 'snapshot' }
  }

  try {
    const dataset = env.SANITY_DATASET || 'production'
    const host = env.SANITY_API_HOST || `https://${projectId}.api.sanity.io`
    // Not the CDN host on purpose: a build triggered by a publish must see the newest content.
    const response = await fetch(`${host}/v${API_VERSION}/data/query/${dataset}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: QUERY }),
      signal: AbortSignal.timeout(20000),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status} ${(await response.text()).slice(0, 300)}`)

    const { result } = await response.json()
    const content = prune(result) ?? {}
    content.projects = Array.isArray(content.projects) ? content.projects : []

    if (content.projects.length === 0 && !truthy(env.ALLOW_EMPTY)) {
      throw new Error('the dataset has no published projects (set ALLOW_EMPTY=1 to accept that)')
    }

    const source =
      `// AUTO-GENERATED by scripts/fetch-content.mjs from Sanity (project ${projectId}, dataset ${dataset}).\n` +
      `// Do not edit by hand: change content in the Studio. Commit this file: it is the fallback when the CMS is unreachable.\n` +
      `import type { RawContent } from './types'\n\nexport const snapshot: RawContent = ${JSON.stringify(content, null, 2)}\n`
    const previous = existsSync(SNAPSHOT) ? readFileSync(SNAPSHOT, 'utf8') : ''
    if (previous !== source) writeFileSync(SNAPSHOT, source)

    log.info(`[content] Sanity OK: ${content.projects.length} projects, ${content.services?.length ?? 0} services, ${content.faq?.length ?? 0} FAQ${previous === source ? ' (no changes)' : ' (snapshot updated)'}.`)
    return { source: 'sanity' }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (strict) throw new Error(`[content] Sanity fetch failed: ${message}`)
    log.warn(`[content] Sanity fetch failed (${message}). Using the committed snapshot instead.`)
    return { source: 'snapshot' }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  fetchContent().catch((error) => {
    console.error(error.message)
    process.exit(1)
  })
}
