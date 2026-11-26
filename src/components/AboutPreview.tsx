import { useSiteContent } from '../content/site'
import { useI18n } from '../i18n'
import Lines from './Lines'

/** Short homepage teaser. The full story lives on the About page (#/about). */
export default function AboutPreview() {
  const { t } = useI18n()
  const site = useSiteContent()
  return (
    <section className="about-strip" id="about">
      <div className="section-kicker">{t.aboutPreview.kicker}</div>
      <div className="about-strip-content">
        <h2><Lines lines={site.aboutPreview.headline} /></h2>
        <div>
          <p>{site.aboutPreview.body}</p>
          <a className="text-link dark-link" href="#/about">{t.aboutPreview.cta} <span>↗</span></a>
        </div>
      </div>
    </section>
  )
}
