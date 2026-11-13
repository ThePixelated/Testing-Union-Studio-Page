import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { useScrolled } from '../hooks/useScrolled'
import { networkGroups, networkRoot } from '../data/network'
import { useI18n } from '../i18n'
import type { Route } from '../hooks/useHashRoute'
import LanguageSwitch from './LanguageSwitch'
import Logo from './Logo'
import NetworkEntry from './NetworkEntry'

const links = [
  { key: 'works', href: '#works' },
  { key: 'playground', href: '#playground' },
  { key: 'about', href: '#/about' },
  { key: 'contact', href: '#contact' },
] as const

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  )
}

export default function SiteHeader({ route }: { route: Route }) {
  const { t } = useI18n()
  const scrolled = useScrolled(40)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNetworkOpen, setMobileNetworkOpen] = useState(false)
  const [networkOpen, setNetworkOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Escape closes any open menu; clicking outside closes the network dropdown.
  useEffect(() => {
    if (!menuOpen && !networkOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (networkOpen) triggerRef.current?.focus()
      setMenuOpen(false)
      setNetworkOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!networkOpen) return
      const target = event.target as Node
      if (!triggerRef.current?.contains(target) && !panelRef.current?.contains(target)) setNetworkOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen, networkOpen])

  const closeAll = () => {
    setMenuOpen(false)
    setNetworkOpen(false)
  }

  // The contact section lives on every page; from the About page just scroll to it instead of leaving the page.
  const onContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeAll()
    if (route === 'about') {
      event.preventDefault()
      document.getElementById('contact')?.scrollIntoView()
    }
  }

  const linkProps = (link: (typeof links)[number]) => ({
    href: link.href,
    'aria-current': link.key === 'about' && route === 'about' ? ('page' as const) : undefined,
    onClick: link.key === 'contact' ? onContactClick : closeAll,
  })

  return (
    <>
      <header className={scrolled ? 'site-header is-scrolled' : 'site-header'} id="top">
        <a className="wordmark" href="#top" aria-label={t.nav.home}>
          <Logo />
        </a>
        <nav className="main-nav" aria-label={t.nav.mainNav}>
          {links.map((link) => <a key={link.key} {...linkProps(link)}>{t.nav[link.key]}</a>)}
        </nav>
        <div className="header-actions">
          <button
            ref={triggerRef}
            className="network-trigger"
            aria-expanded={networkOpen}
            aria-controls="network-panel"
            onClick={() => setNetworkOpen((open) => !open)}
          >
            {t.nav.network} <Chevron />
          </button>
          <a className="header-cta" href="#contact" onClick={onContactClick}>{t.nav.talk} <span>↗</span></a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? t.nav.close : t.nav.menu}
          </button>
          <LanguageSwitch />
        </div>
        <nav id="mobile-menu" className={menuOpen ? 'mobile-menu is-open' : 'mobile-menu'} aria-label={t.nav.mobileNav}>
          {links.map((link) => <a key={link.key} {...linkProps(link)}>{t.nav[link.key]}</a>)}
          <button
            className="mobile-network-toggle"
            aria-expanded={mobileNetworkOpen}
            aria-controls="mobile-network"
            onClick={() => setMobileNetworkOpen((open) => !open)}
          >
            {t.nav.network} <Chevron />
          </button>
          <div id="mobile-network" className={mobileNetworkOpen ? 'mobile-network is-open' : 'mobile-network'}>
            <NetworkEntry item={networkRoot} variant="root" onNavigate={closeAll} />
            {networkGroups.map((group) => (
              <div className="network-group" key={group.entity.id}>
                <NetworkEntry item={group.entity} variant="group" onNavigate={closeAll} />
                {group.items.map((item) => <NetworkEntry key={item.id} item={item} onNavigate={closeAll} />)}
              </div>
            ))}
          </div>
          <a className="mobile-cta" href="#contact" onClick={onContactClick}>{t.nav.talk} ↗</a>
        </nav>
      </header>

      {/* Sibling of the header (not a child) so its own backdrop blur works. */}
      <div id="network-panel" ref={panelRef} className={networkOpen ? 'network-panel is-open' : 'network-panel'} role="region" aria-label={t.network.label}>
        <NetworkEntry item={networkRoot} variant="root" onNavigate={closeAll} />
        <div className="network-columns">
          {networkGroups.map((group) => (
            <div className="network-group" key={group.entity.id}>
              <NetworkEntry item={group.entity} variant="group" onNavigate={closeAll} />
              {group.items.map((item) => <NetworkEntry key={item.id} item={item} onNavigate={closeAll} />)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
