/**
 * Shape of the content returned by the GROQ query in scripts/fetch-content.mjs (and stored in snapshot.ts).
 * Every field is optional on purpose: the site must keep working while the CMS is half-filled.
 * Localized fields are { id: Indonesian, en: English }.
 */
export type RawLocalized = { id?: string; en?: string }

export type RawSlide =
  | { _type: 'imageSlide'; image?: string }
  | { _type: 'videoSlide'; video?: string; poster?: string }

export type RawProject = {
  slug: string
  title: string
  category: string
  status?: string
  origin?: string
  ambientColor?: string
  sortOrder?: number
  showInHero?: boolean
  showOnHome?: boolean
  summary?: RawLocalized
  year?: string
  platform?: string
  tools?: string[]
  role?: RawLocalized
  story?: { challenge?: RawLocalized; approach?: RawLocalized; result?: RawLocalized }
  links?: { label?: RawLocalized; url?: string }[]
  slides?: RawSlide[]
}

export type RawContent = {
  siteSettings?: {
    contactEmail?: string
    replyPromise?: RawLocalized
    socialLinks?: { platform?: string; url?: string }[]
  }
  homePage?: {
    heroEyebrow?: RawLocalized
    heroLine1?: RawLocalized
    heroEm?: RawLocalized
    heroRest?: RawLocalized
    heroSubtitle?: RawLocalized
    aboutPreviewHeadline?: RawLocalized
    aboutPreviewBody?: RawLocalized
    capabilitiesCopy?: RawLocalized
    capabilities?: RawLocalized[]
  }
  aboutPage?: { heading?: RawLocalized; statement?: RawLocalized; body?: RawLocalized }
  projects: RawProject[]
  /** Fetched already; not shown on the site yet (Services page and FAQ come next). */
  services?: {
    title?: RawLocalized
    description?: RawLocalized
    audience?: RawLocalized
    deliverables?: RawLocalized[]
    evidence?: string[]
  }[]
  faq?: { question?: RawLocalized; answer?: RawLocalized }[]
}
