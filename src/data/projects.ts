import type { Lang } from '../i18n'
import { toLocalized } from '../content/localize'
import { snapshot } from '../content/snapshot'
import type { RawProject, RawSlide } from '../content/types'

/** A string with one version per language. Project names are proper nouns and stay plain strings. */
export type Localized = Record<Lang, string>

/** What a client buys, not which tool was used. */
export type ProjectCategory = 'ARLearning' | 'ARBrand' | 'Games'
export type FilterKey = 'All' | ProjectCategory
/** Set only when confirmed: shown as an honest label on the project page. */
export type ProjectOrigin = 'client' | 'self-initiated'
export type ProjectStatus = 'portfolio' | 'prototype' | 'in-development' | 'released'

/**
 * One slide inside a card / the project cover.
 * Without real media a slide is CSS artwork (`artwork` + `variant`); with media it is an image or a video.
 * Media URLs come from the CMS (absolute) or from /public (relative path).
 */
export type CardSlide = {
  artwork?: string
  variant?: 1 | 2 | 3
  image?: string
  video?: string
  poster?: string
}

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  status: Localized
  ambient: string
  artwork: string
  slides: CardSlide[]
  /** Appears in the Home hero carousel. */
  hero?: boolean
  /** Appears in the "Selected works" teaser on Home. */
  featured?: boolean
  /* ---- optional details: the project page only renders what exists ---- */
  summary?: Localized
  origin?: ProjectOrigin
  role?: Localized
  year?: string
  platform?: string
  tools?: string[]
  links?: { label: Localized; href: string }[]
  story?: { challenge?: Localized; approach?: Localized; result?: Localized }
  /** Hero media (derived from the first media slide). */
  mediaType?: 'image' | 'video'
  image?: string
  video?: string
  poster?: string
}

/* ------------------------------------------------------------------------------------------
 * The project list comes from the CMS snapshot (src/content/snapshot.ts, refreshed from Sanity
 * by scripts/fetch-content.mjs). Edit projects in the Studio, not here.
 * ---------------------------------------------------------------------------------------- */

const statusLabels: Record<ProjectStatus, Localized> = {
  portfolio: { en: 'Portfolio project', id: 'Proyek portofolio' },
  prototype: { en: 'Prototype', id: 'Prototipe' },
  'in-development': { en: 'In development', id: 'Dalam pengembangan' },
  released: { en: 'Released', id: 'Sudah rilis' },
}

const categoryAmbient: Record<ProjectCategory, string> = { ARLearning: '#5f86a8', ARBrand: '#b06a82', Games: '#6f8f5a' }
const artworkCycle = ['art-spatial', 'art-animal', 'art-radiant', 'art-experiment']

/** Shown until a real one-line summary is written. Deliberately says nothing that isn't known. */
const genericSummary: Record<ProjectCategory, Localized> = {
  ARLearning: {
    en: 'Augmented reality project for learning. Full description coming soon.',
    id: 'Proyek augmented reality untuk pembelajaran. Deskripsi lengkap menyusul.',
  },
  ARBrand: {
    en: 'Augmented reality project for a brand. Full description coming soon.',
    id: 'Proyek augmented reality untuk brand. Deskripsi lengkap menyusul.',
  },
  Games: {
    en: 'A game project. Full description coming soon.',
    id: 'Proyek game. Deskripsi lengkap menyusul.',
  },
}

export const summaryOf = (project: Project): Localized => project.summary ?? genericSummary[project.category]

const isCategory = (value: string): value is ProjectCategory => value === 'ARLearning' || value === 'ARBrand' || value === 'Games'
const isStatus = (value: string | undefined): value is ProjectStatus => Boolean(value && value in statusLabels)

/** Ask the Sanity image CDN for a sensible size/format. Other URLs are left alone. */
const sized = (url: string | undefined, width: number): string | undefined => {
  if (!url) return undefined
  if (!url.includes('cdn.sanity.io/images')) return url
  return `${url}${url.includes('?') ? '&' : '?'}w=${width}&auto=format`
}

const placeholderSlides = (artwork: string): CardSlide[] => [
  { artwork, variant: 1 },
  { artwork, variant: 2 },
  { artwork, variant: 3 },
]

function mediaSlides(raw: RawSlide[] | undefined, width: number): CardSlide[] {
  return (raw ?? []).flatMap((slide): CardSlide[] => {
    if (slide._type === 'imageSlide' && slide.image) return [{ image: sized(slide.image, width) }]
    if (slide._type === 'videoSlide' && slide.video) return [{ video: slide.video, poster: sized(slide.poster, width) }]
    return []
  })
}

function mapProject(raw: RawProject, index: number): Project | undefined {
  if (!raw.slug || !raw.title || !isCategory(raw.category)) return undefined
  const artwork = artworkCycle[index % artworkCycle.length]
  const cards = mediaSlides(raw.slides, 1400)
  const cover = mediaSlides(raw.slides, 2000)[0]
  const story = {
    challenge: toLocalized(raw.story?.challenge),
    approach: toLocalized(raw.story?.approach),
    result: toLocalized(raw.story?.result),
  }

  return {
    slug: raw.slug,
    title: raw.title,
    category: raw.category,
    status: statusLabels[isStatus(raw.status) ? raw.status : 'portfolio'],
    ambient: raw.ambientColor && /^#[0-9a-f]{6}$/i.test(raw.ambientColor) ? raw.ambientColor : categoryAmbient[raw.category],
    artwork,
    slides: cards.length ? cards : placeholderSlides(artwork),
    hero: raw.showInHero,
    featured: raw.showOnHome,
    summary: toLocalized(raw.summary),
    origin: raw.origin === 'client' || raw.origin === 'self-initiated' ? raw.origin : undefined,
    role: toLocalized(raw.role),
    year: raw.year?.trim() || undefined,
    platform: raw.platform?.trim() || undefined,
    tools: raw.tools?.filter(Boolean),
    links: raw.links?.flatMap((link) => (link.url ? [{ label: toLocalized(link.label) ?? { id: link.url, en: link.url }, href: link.url }] : [])),
    story: story.challenge || story.approach || story.result ? story : undefined,
    mediaType: cover ? (cover.video ? 'video' : 'image') : undefined,
    image: cover?.image,
    video: cover?.video,
    poster: cover?.poster,
  }
}

/** ALL projects shown on the site, in CMS order ("Urutan tampil"). */
export const projects: Project[] = snapshot.projects.flatMap((raw, index) => mapProject(raw, index) ?? [])

export const findProject = (slug: string) => projects.find((project) => project.slug === slug)

/** Hero carousel = projects flagged "Tampilkan di hero" (fallback: the first three). */
const heroPicks = projects.filter((project) => project.hero)
export const heroProjects = (heroPicks.length ? heroPicks : projects.slice(0, 3)).slice(0, 5)

/** Home teaser = projects flagged "Tampilkan di Home" (fallback: the first four). */
const teaserPicks = projects.filter((project) => project.featured)
export const teaserProjects = (teaserPicks.length ? teaserPicks : projects.slice(0, 4)).slice(0, 6)

/** Shape the hero carousel expects. Derived from `projects`. */
export type ProjectSlide = {
  id: string
  title: string
  category: ProjectCategory
  description: Localized
  status: Localized
  ambient: string
  artwork: string
  href: string
  mediaType?: 'image' | 'video'
  image?: string
  video?: string
  poster?: string
}

export const featuredProjects: ProjectSlide[] = heroProjects.map((project) => ({
  id: project.slug,
  title: project.title,
  category: project.category,
  description: summaryOf(project),
  status: project.status,
  ambient: project.ambient,
  artwork: project.artwork,
  href: `#/work/${project.slug}`,
  mediaType: project.mediaType,
  image: project.image,
  video: project.video,
  poster: project.poster,
}))
