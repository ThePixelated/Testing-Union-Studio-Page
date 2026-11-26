import { useSiteContent } from '../content/site'
import { useI18n } from '../i18n'
import Lines from './Lines'

/**
 * Dedicated About page (#/about). Currently only the verified/approved prototype copy.
 * Add philosophy, vision/mission, collaborators and milestones here once they are confirmed.
 */
export default function AboutPage() {
  const { t } = useI18n()
  const site = useSiteContent()
  return (
    <>
      <section className="page-hero">
        <div className="section">
          <a className="back-link" href="#top">← {t.aboutPage.back}</a>
          <p className="eyebrow">{t.aboutPage.eyebrow}</p>
          <h1><Lines lines={site.aboutPage.heading} /></h1>
        </div>
      </section>
      <section className="about-page-body">
        <div className="section">
          <p className="about-statement">{site.aboutPage.statement}</p>
          <p className="about-body">{site.aboutPage.body}</p>
        </div>
      </section>
    </>
  )
}
