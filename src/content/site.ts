import { useMemo } from 'react'
import { contactEmail as fallbackEmail } from '../data/contact'
import { useI18n } from '../i18n'
import type { Lang } from '../i18n'
import type { Dictionary } from '../i18n/dictionary'
import { pickText, splitLines } from './localize'
import { snapshot } from './snapshot'

/**
 * Site-wide copy that the owner edits in the CMS. Anything missing in the CMS falls back to the
 * built-in text in src/i18n/dictionary.ts, so a half-filled CMS never breaks a page.
 */
export function buildSiteContent(lang: Lang, t: Dictionary) {
  const site = snapshot.siteSettings
  const home = snapshot.homePage
  const about = snapshot.aboutPage
  const capabilities = (home?.capabilities ?? []).map((item) => pickText(item, lang)).filter((item): item is string => Boolean(item))

  return {
    contactEmail: site?.contactEmail?.trim() || fallbackEmail,
    replyPromise: pickText(site?.replyPromise, lang),
    socialLinks: (site?.socialLinks ?? []).filter((link) => link.url).map((link) => ({ platform: link.platform || 'Link', url: link.url as string })),
    hero: {
      eyebrow: pickText(home?.heroEyebrow, lang) ?? t.hero.eyebrow,
      line1: pickText(home?.heroLine1, lang) ?? t.hero.line1,
      em: pickText(home?.heroEm, lang) ?? t.hero.em,
      rest: pickText(home?.heroRest, lang) ?? t.hero.rest,
      subtitle: pickText(home?.heroSubtitle, lang) ?? t.hero.subtitle,
    },
    aboutPreview: {
      headline: splitLines(pickText(home?.aboutPreviewHeadline, lang)) ?? t.aboutPreview.headline,
      body: pickText(home?.aboutPreviewBody, lang) ?? t.aboutPreview.body,
    },
    aboutPage: {
      heading: splitLines(pickText(about?.heading, lang)) ?? t.aboutPage.heading,
      statement: pickText(about?.statement, lang) ?? t.aboutPage.statement,
      body: pickText(about?.body, lang) ?? t.aboutPage.body,
    },
    capabilities: {
      copy: pickText(home?.capabilitiesCopy, lang) ?? t.capabilities.copy,
      items: capabilities.length ? capabilities : t.capabilities.items,
    },
  }
}

export function useSiteContent() {
  const { lang, t } = useI18n()
  return useMemo(() => buildSiteContent(lang, t), [lang, t])
}
