import { useState } from 'react'
import { projects } from '../data/projects'
import type { FilterKey } from '../data/projects'
import { useI18n } from '../i18n'
import Lines from './Lines'
import ProjectCard from './ProjectCard'

const filterOrder: FilterKey[] = ['All', 'ARLearning', 'ARBrand', 'Games']

/** The full catalogue. Home only shows a curated teaser; every project lives here and has its own page. */
export default function WorksPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<FilterKey>('All')
  // Never show a filter for a category that has no project.
  const filters = filterOrder.filter((key) => key === 'All' || projects.some((project) => project.category === key))
  const visible = projects.filter((project) => filter === 'All' || project.category === filter)

  return (
    <>
      <section className="page-hero">
        <div className="section">
          <a className="back-link" href="#top">← {t.worksPage.back}</a>
          <p className="eyebrow">{t.worksPage.eyebrow}</p>
          <h1><Lines lines={t.worksPage.heading} /></h1>
          <p className="page-intro">{t.worksPage.intro}</p>
        </div>
      </section>
      <section className="section works-page-body">
        <div className="filters" role="group" aria-label={t.works.filtersLabel}>
          {filters.map((key) => (
            <button key={key} className={filter === key ? 'filter active' : 'filter'} aria-pressed={filter === key} onClick={() => setFilter(key)}>
              {t.works.filters[key]}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {visible.map((project, order) => <ProjectCard key={project.slug} project={project} order={order} />)}
        </div>
      </section>
    </>
  )
}
