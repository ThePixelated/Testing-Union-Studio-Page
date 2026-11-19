import { useEffect } from 'react'
import { findProject, projects, summaryOf } from '../data/projects'
import type { Localized, Project } from '../data/projects'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { assetUrl } from '../lib/assets'
import { useI18n } from '../i18n'
import ProjectCard from './ProjectCard'

function Cover({ project }: { project: Project }) {
  const reducedMotion = usePrefersReducedMotion()
  const slide = project.slides[0]
  const artClass = ['project-art', slide.artwork ?? project.artwork, slide.variant ? `v${slide.variant}` : ''].filter(Boolean).join(' ')
  return (
    <div className="project-cover">
      <div className={artClass} aria-hidden="true" />
      {slide.video && (
        <video className="card-media" src={assetUrl(slide.video)} poster={slide.poster ? assetUrl(slide.poster) : undefined} muted loop playsInline autoPlay={!reducedMotion} />
      )}
      {!slide.video && slide.image && <img className="card-media" src={assetUrl(slide.image)} alt="" decoding="async" />}
    </div>
  )
}

/**
 * One project (case study). Only sections that have data are rendered — no empty boxes.
 * Fill the optional fields in src/data/projects.ts to grow a page.
 */
export default function ProjectPage({ slug }: { slug: string }) {
  const { lang, t } = useI18n()
  const project = findProject(slug)

  // The navbar tint follows the project, like it does on the home hero.
  useEffect(() => {
    if (project) document.documentElement.style.setProperty('--ambient', project.ambient)
  }, [project])

  if (!project) {
    return (
      <section className="page-hero">
        <div className="section">
          <a className="back-link" href="#/work">← {t.projectPage.back}</a>
          <h1>{t.projectPage.notFound.title}</h1>
          <p className="page-intro">{t.projectPage.notFound.body}</p>
        </div>
      </section>
    )
  }

  const text = (value?: Localized) => (value ? value[lang] : undefined)
  const meta: [string, string][] = [
    [t.projectPage.meta.category, t.works.filters[project.category]],
    [t.projectPage.meta.status, project.status[lang]],
  ]
  if (project.origin) meta.push([t.projectPage.meta.origin, t.projectPage.origin[project.origin]])
  if (project.role) meta.push([t.projectPage.meta.role, project.role[lang]])
  if (project.year) meta.push([t.projectPage.meta.year, project.year])
  if (project.platform) meta.push([t.projectPage.meta.platform, project.platform])
  if (project.tools?.length) meta.push([t.projectPage.meta.tools, project.tools.join(', ')])

  const story = (['challenge', 'approach', 'result'] as const).filter((key) => project.story?.[key])
  const gallery = project.slides.slice(1).filter((slide) => slide.image || slide.video)
  const others = projects.filter((item) => item.slug !== project.slug)
  const index = projects.findIndex((item) => item.slug === project.slug)
  const more = [others[index % others.length], others[(index + 1) % others.length]].filter((item, i, all) => item && all.indexOf(item) === i)

  return (
    <>
      <section className="page-hero">
        <div className="section">
          <a className="back-link" href="#/work">← {t.projectPage.back}</a>
          <p className="eyebrow">{t.works.filters[project.category]} <span className="status-dot" /> {project.status[lang]}</p>
          <h1>{project.title}</h1>
          <p className="page-intro">{summaryOf(project)[lang]}</p>
        </div>
      </section>

      <section className="section project-body">
        <Cover project={project} />
        <div className="project-layout">
          <dl className="project-facts">
            {meta.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          {(story.length > 0 || (project.links && project.links.length > 0)) && (
            <div className="project-story">
              {story.map((key) => (
                <div key={key}><h2>{t.projectPage.sections[key]}</h2><p>{text(project.story?.[key])}</p></div>
              ))}
              {project.links && project.links.length > 0 && (
                <div>
                  <h2>{t.projectPage.links}</h2>
                  <p className="project-links">
                    {project.links.map((link) => <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noreferrer">{link.label[lang]} <span>↗</span></a>)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        {gallery.length > 0 && (
          <div className="project-gallery" aria-label={t.projectPage.gallery}>
            {gallery.map((slide, i) => (slide.video
              ? <video key={i} src={assetUrl(slide.video)} poster={slide.poster ? assetUrl(slide.poster) : undefined} muted loop playsInline controls />
              : <img key={i} src={assetUrl(slide.image!)} alt="" loading="lazy" decoding="async" />))}
          </div>
        )}
      </section>

      <section className="section more-projects">
        <h2 className="more-title">{t.projectPage.more}</h2>
        <div className="project-grid">
          {more.map((item, order) => <ProjectCard key={item.slug} project={item} order={order} />)}
        </div>
      </section>
    </>
  )
}
