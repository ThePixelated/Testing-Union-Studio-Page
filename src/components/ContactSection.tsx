import { useSiteContent } from '../content/site'
import { useI18n } from '../i18n'

export default function ContactSection() {
  const { t } = useI18n()
  const { contactEmail, replyPromise } = useSiteContent()
  return (
    <section className="contact-section" id="contact">
      <p className="eyebrow">{t.contact.eyebrow}</p>
      <h2>{t.contact.line1}<br />{t.contact.before} <em>{t.contact.em}</em></h2>
      <p>{t.contact.body}</p>
      <a className="button button-light" href={`mailto:${contactEmail}`}>{t.contact.cta} ↗</a>
      <small>{contactEmail}</small>
      {replyPromise && <small className="reply-promise">{replyPromise}</small>}
    </section>
  )
}
