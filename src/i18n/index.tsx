import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { en, id } from './dictionary'
import type { Dictionary } from './dictionary'

export type Lang = 'id' | 'en'

const STORAGE_KEY = 'union-studio-lang'

/** IANA time zones that belong to Indonesia (WIB / WITA / WIT). */
const INDONESIA_TIME_ZONES = new Set(['Asia/Jakarta', 'Asia/Pontianak', 'Asia/Makassar', 'Asia/Ujung_Pandang', 'Asia/Jayapura'])

const dictionaries: Record<Lang, Dictionary> = { en, id }

/**
 * Initial language, in priority order:
 * 1. a language the visitor picked before (saved in localStorage)
 * 2. English if the browser's time zone is outside Indonesia (region check, no permission or network request needed)
 * 3. Indonesian (default)
 */
export function detectLanguage(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'id' || saved === 'en') return saved
  } catch {
    /* storage unavailable (private mode): ignore */
  }
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (timeZone && !INDONESIA_TIME_ZONES.has(timeZone)) return 'en'
  } catch {
    /* Intl unavailable: fall through to default */
  }
  return 'id'
}

type I18nContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: Dictionary }

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLanguage)
  const t = dictionaries[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
  }, [lang, t])

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      t,
      setLang: (next) => {
        setLangState(next)
        try {
          window.localStorage.setItem(STORAGE_KEY, next) // only a manual choice is remembered
        } catch {
          /* ignore */
        }
      },
    }),
    [lang, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside <I18nProvider>')
  return context
}
