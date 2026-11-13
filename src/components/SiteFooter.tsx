import { useI18n } from '../i18n'
import Logo from './Logo'

export default function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className="site-footer">
      <div>
        <a className="wordmark" href="#top" aria-label={t.nav.home}><Logo /></a>
        <p>{t.footer.part}</p>
      </div>
      <div className="footer-links">
        <a href="#works">{t.nav.works}</a>
        <a href="#playground">{t.nav.playground}</a>
        <a href="#/about">{t.nav.about}</a>
        <a href="#contact">{t.nav.contact}</a>
      </div>
      <p className="copyright">© {new Date().getFullYear()} UNION STUDIO · {t.footer.copyright}</p>
    </footer>
  )
}
