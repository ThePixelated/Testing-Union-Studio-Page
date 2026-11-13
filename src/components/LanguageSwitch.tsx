import { useI18n } from '../i18n'
import type { Lang } from '../i18n'

const options: { code: Lang; label: string; name: string }[] = [
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia' },
  { code: 'en', label: 'EN', name: 'English' },
]

export default function LanguageSwitch() {
  const { lang, setLang, t } = useI18n()
  return (
    <div className="lang-switch" role="group" aria-label={t.nav.language}>
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          lang={option.code}
          title={option.name}
          aria-label={option.name}
          aria-pressed={lang === option.code}
          onClick={() => setLang(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
