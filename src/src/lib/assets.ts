/**
 * Resolve a file inside /public to a URL that works under any Vite `base`
 * (GitHub Pages subpath now, root domain on Cloudflare later).
 * Usage: assetUrl('media/animal-chase.mp4')
 */
export function assetUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
