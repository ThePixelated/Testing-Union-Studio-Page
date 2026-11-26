import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Pulls the latest published content from Sanity into src/content/snapshot.ts when `vite` / `vite build` starts. */
function sanityContent(env: Record<string, string>): Plugin {
  return {
    name: 'union-sanity-content',
    async buildStart() {
      const { fetchContent } = await import('./scripts/fetch-content.mjs')
      await fetchContent({ env })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  return {
    plugins: [react(), sanityContent(env)],
    // GitHub Pages serves this repository from a sub-path (default below).
    // On Cloudflare Pages or a custom domain, set the environment variable VITE_BASE_PATH=/
    base: env.VITE_BASE_PATH || '/Testing-Union-Studio-Page/',
  }
})
