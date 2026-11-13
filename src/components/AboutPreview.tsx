import { useI18n } from '../i18n'
import Lines from './Lines'

/** Short homepage teaser. The full story lives on the About page (#/about). */
export default function AboutPreview() {
  const { t } = useI18n()
  return (
    <section className="about-strip" id="about">
      <div className="section-kicker">{t.aboutPreview.kicker}</div>
      <div className="about-strip-content">
        <h2><Lines lines={t.aboutPreview.headline} /></h2>
        <div>
          <p>{t.aboutPreview.body}</p>
          <a className="text-link dark-link" href="#/about">{t.aboutPreview.cta} <span>↗</span></a>
        </div>
      </div>
    </section>
  )
}
