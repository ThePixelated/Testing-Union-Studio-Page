import { useEffect, useMemo, useState } from 'react'

/** Tiny hash router (works on GitHub Pages without server rewrites). Replaced by real paths in Fase 2a. */
export type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'work' }
  | { name: 'project'; slug: string }

export function parseRoute(hash: string): Route {
  if (/^#\/about(?:[/?#]|$)/.test(hash)) return { name: 'about' }
  const project = hash.match(/^#\/work\/([^/?#]+)/)
  if (project) {
    try {
      return { name: 'project', slug: decodeURIComponent(project[1]) }
    } catch {
      return { name: 'project', slug: project[1] }
    }
  }
  if (/^#\/work(?:[/?#]|$)/.test(hash)) return { name: 'work' }
  return { name: 'home' }
}

export const routeKey = (route: Route) => (route.name === 'project' ? `project:${route.slug}` : route.name)

export function useHashRoute(): Route {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return useMemo(() => parseRoute(hash), [hash])
}
