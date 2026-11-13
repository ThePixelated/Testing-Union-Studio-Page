import { useState } from 'react'
import { projects } from '../data/projects'
import type { FilterKey } from '../data/projects'
import { useI18n } from '../i18n'
import AboutPreview from './AboutPreview'
import Lines from './Lines'
import ProjectCard from './ProjectCard'
import ProjectHero from './ProjectHero'

const filterKeys: FilterKey[] = ['All', 'Games', 'XR', 'Apps', 'Experiments']

export default function HomePage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<FilterKey>('All')
  const visibleProjects = projects.filter((project) => filter === 'All' || project.filter === filter)

  return (
    <>
      <ProjectHero />
      <AboutPreview />

      <section className="section works-section" id="works">
        <div className="section-heading">
          <div><p className="eyebrow">{t.works.eyebrow}</p><h2><Lines lines={t.works.heading} /></h2></div>
          <p className="section-aside">{t.works.aside}</p>
        </div>
        <div className="filters" role="group" aria-label={t.works.filtersLabel}>
          {filterKeys.map((key) => (
            <button key={key} className={filter === key ? 'filter active' : 'filter'} aria-pressed={filter === key} onClick={() => setFilter(key)}>
              {t.works.filters[key]}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {visibleProjects.map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
      </section>

      <section className="playground-section" id="playground">
        <div className="section playground-layout">
          <div>
            <p className="eyebrow">{t.playground.eyebrow}</p>
            <h2>{t.playground.line1}<br /><em>{t.playground.em}</em></h2>
            <p className="playground-copy">{t.playground.copy}</p>
          </div>
          <div className="playground-card">
            <div className="demo-label">{t.playground.label}</div>
            <div className="demo-stage">
              <button className="demo-object" aria-label={t.playground.objectLabel} onClick={(event) => event.currentTarget.classList.toggle('moved')}><span /></button>
              <div className="demo-hint">{t.playground.hint}</div>
            </div>
            <div className="demo-footer"><div><h3>{t.playground.title}</h3><p>{t.playground.subtitle}</p></div><span>{t.playground.badge}</span></div>
          </div>
        </div>
      </section>

      <section className="capabilities-section">
        <div className="section capabilities-layout">
          <div>
            <p className="eyebrow">{t.capabilities.eyebrow}</p>
            <h2><Lines lines={t.capabilities.heading} /></h2>
            <p className="capabilities-copy">{t.capabilities.copy}</p>
          </div>
          <div className="capability-list">
            {t.capabilities.items.map((item, index) => <div className="capability-row" key={item}><span>0{index + 1}</span><strong>{item}</strong><span>↗</span></div>)}
          </div>
        </div>
      </section>
    </>
  )
}
