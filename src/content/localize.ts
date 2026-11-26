import type { Lang } from '../i18n'
import type { RawLocalized } from './types'

/** The requested language, else the other one, else undefined. Blank strings count as missing. */
export function pickText(value: RawLocalized | undefined, lang: Lang): string | undefined {
  const other: Lang = lang === 'id' ? 'en' : 'id'
  const text = value?.[lang]?.trim() || value?.[other]?.trim()
  return text || undefined
}

/** Both languages filled in (missing one falls back to the other). */
export function toLocalized(value: RawLocalized | undefined): Record<Lang, string> | undefined {
  const id = value?.id?.trim()
  const en = value?.en?.trim()
  if (!id && !en) return undefined
  return { id: (id || en) as string, en: (en || id) as string }
}

/** Multi-line field → array of lines (editors press Enter for a line break). */
export const splitLines = (text: string | undefined): string[] | undefined => {
  const lines = text?.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  return lines && lines.length ? lines : undefined
}
