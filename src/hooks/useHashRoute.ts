import { useEffect, useState } from 'react'

export type Route = 'home' | 'about'

/** Tiny hash router (works on GitHub Pages without server rewrites): '#/about' → About page, anything else → Home. */
const readRoute = (): Route => (window.location.hash.startsWith('#/about') ? 'about' : 'home')

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute)
  useEffect(() => {
    const onChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
