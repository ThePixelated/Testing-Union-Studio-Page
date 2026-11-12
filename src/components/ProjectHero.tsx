import { useEffect, useState } from 'react'
import { featuredProjects } from '../data/projects'

export default function ProjectHero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const project = featuredProjects[active]

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % featuredProjects.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <section
      className={`hero ${project.artwork}`}
      style={{ '--ambient': project.ambient } as React.CSSProperties}
      aria-label="Featured projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-artwork" aria-hidden="true">
        <div className="art-orb" />
        <div className="art-ridge ridge-back" />
        <div className="art-ridge ridge-front" />
        <div className="art-grid" />
      </div>
      <div className="hero-shade" />
      <div className="hero-inner">
        <div className="hero-intro">
          <p className="eyebrow">Independent creative technology studio</p>
          <h1>We build worlds,<br /><em>experiences</em> & things.</h1>
          <p className="hero-subtitle">Turning ideas into interactive experiences — from games and XR to digital applications.</p>
        </div>

        <div className="hero-bottom">
          <a className="button button-light" href="#works">Explore our work <span>↗</span></a>
          <div className="featured-copy" aria-live="polite">
            <div className="eyebrow">{project.category} <span className="status-dot" /> {project.status}</div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a className="text-link" href={project.href}>View project <span>↗</span></a>
          </div>
        </div>

        <div className="hero-controls">
          <div className="slide-count">{String(active + 1).padStart(2, '0')} <span>/ {String(featuredProjects.length).padStart(2, '0')}</span></div>
          <div className="slide-dots">
            {featuredProjects.map((item, index) => (
              <button
                key={item.id}
                className={index === active ? 'slide-dot active' : 'slide-dot'}
                aria-label={`Show ${item.title}`}
                aria-current={index === active}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
          <button className="pause-button" onClick={() => setPaused((value) => !value)}>
            {paused ? 'PLAY' : 'PAUSE'}
          </button>
        </div>
      </div>
    </section>
  )
}