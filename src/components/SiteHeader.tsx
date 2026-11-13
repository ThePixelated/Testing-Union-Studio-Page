import { useEffect, useRef, useState } from 'react'
import { useScrolled } from '../hooks/useScrolled'
import { networkGroups, networkRoot } from '../data/network'
import Logo from './Logo'
import NetworkEntry from './NetworkEntry'

const links = [
  { href: '#works', label: 'Works' },
  { href: '#playground', label: 'Playground' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  )
}

export default function SiteHeader() {
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

  return (
    <>
      <header className={scrolled ? 'site-header is-scrolled' : 'site-header'} id="top">
        <a className="wordmark" href="#top" aria-label="UNION STUDIO — back to top">
          <Logo />
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="header-actions">
          <button
            ref={triggerRef}
            className="network-trigger"
            aria-expanded={networkOpen}
            aria-controls="network-panel"
            onClick={() => setNetworkOpen((open) => !open)}
          >
            Network <Chevron />
          </button>
          <a className="header-cta" href="#contact">Let's talk <span>↗</span></a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <nav id="mobile-menu" className={menuOpen ? 'mobile-menu is-open' : 'mobile-menu'} aria-label="Mobile navigation">
          {links.map((link) => <a key={link.href} href={link.href} onClick={closeAll}>{link.label}</a>)}
          <button
            className="mobile-network-toggle"
            aria-expanded={mobileNetworkOpen}
            aria-controls="mobile-network"
            onClick={() => setMobileNetworkOpen((open) => !open)}
          >
            Network <Chevron />
          </button>
          <div id="mobile-network" className={mobileNetworkOpen ? 'mobile-network is-open' : 'mobile-network'}>
            <p className="network-root-label">{networkRoot.label}</p>
            {networkGroups.map((group) => (
              <div className="network-group" key={group.entity.id}>
                <p className="network-group-title">{group.entity.label}</p>
                {group.items.map((item) => <NetworkEntry key={item.id} item={item} onNavigate={closeAll} />)}
              </div>
            ))}
          </div>
          <a className="mobile-cta" href="#contact" onClick={closeAll}>Let's talk ↗</a>
        </nav>
      </header>

      {/* Sibling of the header (not a child) so its own backdrop blur works. */}
      <div id="network-panel" ref={panelRef} className={networkOpen ? 'network-panel is-open' : 'network-panel'} role="region" aria-label="UNION network">
        <p className="network-root-label">{networkRoot.label}</p>
        <div className="network-columns">
          {networkGroups.map((group) => (
            <div className="network-group" key={group.entity.id}>
              <p className="network-group-title">{group.entity.label}</p>
              {group.items.map((item) => <NetworkEntry key={item.id} item={item} onNavigate={closeAll} />)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
