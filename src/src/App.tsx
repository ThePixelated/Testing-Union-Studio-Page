import { useEffect, useRef } from 'react'
import AboutPage from './components/AboutPage'
import ContactSection from './components/ContactSection'
import HomePage from './components/HomePage'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import { useHashRoute } from './hooks/useHashRoute'
import { I18nProvider } from './i18n'

function Shell() {
  const route = useHashRoute()
  const firstRender = useRef(true)

  // After a route change, put the user where the link pointed (the browser can't: the target didn't exist yet).
  useEffect(() => {
    const hash = window.location.hash
    const isFirst = firstRender.current
    firstRender.current = false
    if (route === 'about' || hash === '' || hash === '#top') {
      if (!isFirst) window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const frame = window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
    return () => window.cancelAnimationFrame(frame)
  }, [route])

  return (
    <>
      <SiteHeader route={route} />
      <main>
        {route === 'about' ? <AboutPage /> : <HomePage />}
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Shell />
    </I18nProvider>
  )
}
