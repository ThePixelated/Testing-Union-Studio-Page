import type { Lang } from '../i18n'

/** A string with one version per language. Project names are proper nouns and stay plain strings. */
export type Localized = Record<Lang, string>

/** What a client buys, not which tool was used. */
export type ProjectCategory = 'ARLearning' | 'ARBrand' | 'Games'
export type FilterKey = 'All' | ProjectCategory
/** Set only when confirmed: shown as an honest label on the project page. */
export type ProjectOrigin = 'client' | 'self-initiated'

/**
 * One slide inside a card / the project cover.
 * Placeholder slides use CSS artwork (`artwork` + `variant`). Replace them with real media:
 *   { image: 'media/simlab-1.jpg' }  or  { video: 'media/simlab.mp4', poster: 'media/simlab.jpg' }
 * Paths are relative to /public.
 */
export type CardSlide = {
  artwork?: string
  variant?: 1 | 2 | 3
  image?: string
  video?: string
  poster?: string
}

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  status: Localized
  ambient: string
  artwork: string
  slides: CardSlide[]
  /** Appears in the Home hero carousel (order = order in the `projects` array). */
  hero?: boolean
  /** Appears in the "Selected works" teaser on Home (order = order in the array). */
  featured?: boolean
  /* ---- optional details: the project page only renders what exists ---- */
  summary?: Localized
  origin?: ProjectOrigin
  role?: Localized
  year?: string
  platform?: string
  tools?: string[]
  links?: { label: Localized; href: string }[]
  story?: { challenge?: Localized; approach?: Localized; result?: Localized }
  /** Optional hero media (paths relative to /public). */
  mediaType?: 'image' | 'video'
  image?: string
  video?: string
  poster?: string
}

const placeholderSlides = (artwork: string): CardSlide[] => [
  { artwork, variant: 1 },
  { artwork, variant: 2 },
  { artwork, variant: 3 },
]

const portfolioStatus: Localized = { en: 'Portfolio project', id: 'Proyek portofolio' }

/** Shown until a real one-line summary is written. Deliberately says nothing that isn't known. */
const genericSummary: Record<ProjectCategory, Localized> = {
  ARLearning: {
    en: 'Augmented reality project for learning. Full description coming soon.',
    id: 'Proyek augmented reality untuk pembelajaran. Deskripsi lengkap menyusul.',
  },
  ARBrand: {
    en: 'Augmented reality project for a brand. Full description coming soon.',
    id: 'Proyek augmented reality untuk brand. Deskripsi lengkap menyusul.',
  },
  Games: {
    en: 'A game project. Full description coming soon.',
    id: 'Proyek game. Deskripsi lengkap menyusul.',
  },
}

export const summaryOf = (project: Project): Localized => project.summary ?? genericSummary[project.category]

/**
 * ALL projects that may be shown on the site. Order matters (cards, hero, Works page).
 * Categories, hero picks and statuses are PROVISIONAL — see docs/content/projects.md.
 */
export const projects: Project[] = [
  { slug: 'simlab-elektronik', title: 'Simlab Elektronik', category: 'ARLearning', status: portfolioStatus, ambient: '#5f86a8', artwork: 'art-spatial', hero: true, featured: true, slides: placeholderSlides('art-spatial') },
  { slug: 'interaksi-pecahan-mtk', title: 'Interaksi Pecahan MTK', category: 'ARLearning', status: portfolioStatus, ambient: '#9a754d', artwork: 'art-animal', hero: true, featured: true, slides: placeholderSlides('art-animal') },
  { slug: 'house-effect-tiktok-ar', title: 'House Effect — TikTok AR Filter', category: 'ARBrand', status: { en: 'Prototype', id: 'Prototipe' }, ambient: '#b06a82', artwork: 'art-radiant', hero: true, featured: true, slides: placeholderSlides('art-radiant') },
  {
    slug: 'animal-chase',
    title: 'Animal Chase',
    category: 'Games',
    status: { en: 'In development', id: 'Dalam pengembangan' },
    ambient: '#6f8f5a',
    artwork: 'art-animal',
    featured: true,
    summary: { en: 'An independent game currently in development.', id: 'Game independen yang sedang dalam pengembangan.' },
    slides: placeholderSlides('art-animal'),
  },
  { slug: 'interaksi-peluang-mtk', title: 'Interaksi Peluang MTK', category: 'ARLearning', status: portfolioStatus, ambient: '#7d6a9a', artwork: 'art-experiment', slides: placeholderSlides('art-experiment') },
  { slug: 'elektronika-listrik', title: 'Elektronika Listrik', category: 'ARLearning', status: portfolioStatus, ambient: '#4f8a82', artwork: 'art-spatial', slides: placeholderSlides('art-spatial') },
  { slug: 'dokter-gigi', title: 'Dokter Gigi', category: 'ARLearning', status: portfolioStatus, ambient: '#8c665d', artwork: 'art-radiant', slides: placeholderSlides('art-radiant') },
]

export const findProject = (slug: string) => projects.find((project) => project.slug === slug)

/** Shape the hero carousel expects. Derived from `projects` — edit the data above, not this. */
export type ProjectSlide = {
  id: string
  title: string
  category: ProjectCategory
  description: Localized
  status: Localized
  ambient: string
  artwork: string
  href: string
  mediaType?: 'image' | 'video'
  image?: string
  video?: string
  poster?: string
}

export const featuredProjects: ProjectSlide[] = projects
  .filter((project) => project.hero)
  .map((project) => ({
    id: project.slug,
    title: project.title,
    category: project.category,
    description: summaryOf(project),
    status: project.status,
    ambient: project.ambient,
    artwork: project.artwork,
    href: `#/work/${project.slug}`,
    mediaType: project.mediaType,
    image: project.image,
    video: project.video,
    poster: project.poster,
  }))
