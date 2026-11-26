import { featuredProjects, teaserProjects } from '../data/projects'
import { useSiteContent } from '../content/site'
import { useI18n } from '../i18n'
import AboutPreview from './AboutPreview'
import Lines from './Lines'
import ProjectCard from './ProjectCard'
import ProjectHero from './ProjectHero'

export default function HomePage() {
  const { t } = useI18n()
  const site = useSiteContent()

  return (
    <>
      {featuredProjects.length > 0 && <ProjectHero />}
      <AboutPreview />

      {/* Teaser only: the full catalogue (with filters) is the Works page. */}
      <section className="section works-section" id="works">
        <div className="section-heading">
          <div><p className="eyebrow">{t.works.eyebrow}</p><h2><Lines lines={t.works.heading} /></h2></div>
          <p className="section-aside">{t.works.aside}</p>
        </div>
        <div className="project-grid">
          {teaserProjects.map((project, order) => <ProjectCard key={project.slug} project={project} order={order} />)}
        </div>
        <p className="view-all"><a className="text-link" href="#/work">{t.works.viewAll} <span>↗</span></a></p>
      </section>

      <section className="capabilities-section">
        <div className="section capabilities-layout">
          <div>
            <p className="eyebrow">{t.capabilities.eyebrow}</p>
            <h2><Lines lines={t.capabilities.heading} /></h2>
            <p className="capabilities-copy">{site.capabilities.copy}</p>
          </div>
          <div className="capability-list">
            {site.capabilities.items.map((item, index) => <div className="capability-row" key={item}><span>0{index + 1}</span><strong>{item}</strong><span>↗</span></div>)}
          </div>
        </div>
      </section>
    </>
  )
}
