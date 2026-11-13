import type { Lang } from '../i18n'

/** A string with one version per language. Project names are proper nouns and stay plain strings. */
export type Localized = Record<Lang, string>

export type FilterKey = 'All' | 'Games' | 'XR' | 'Apps' | 'Experiments'

export type ProjectSlide = {
  id: string
  title: string
  category: Localized
  description: Localized
  status: Localized
  ambient: string
  artwork: string
  href: string
  featured: boolean
  /**
   * Optional real media (paths are relative to /public, e.g. 'media/animal-chase.mp4').
   * Without media the slide falls back to the CSS artwork. Shape mirrors the planned Sanity Hero Slide.
   */
  mediaType?: 'image' | 'video'
  image?: string
  video?: string
  poster?: string
}

export const featuredProjects: ProjectSlide[] = [
  {
    id: 'radiant',
    title: 'Project Radiant',
    category: { en: 'Game Development', id: 'Pengembangan Game' },
    description: {
      en: 'A published game project. Replace this copy with the verified project description.',
      id: 'Proyek game yang sudah dirilis. Ganti teks ini dengan deskripsi proyek yang sudah terverifikasi.',
    },
    status: { en: 'Published', id: 'Sudah rilis' },
    ambient: '#8c665d',
    artwork: 'art-radiant',
    href: '#works',
    featured: true,
  },
  {
    id: 'spatial',
    title: 'Spatial Experiences',
    category: { en: 'XR & Spatial', id: 'XR & Spasial' },
    description: {
      en: 'Client-based augmented and immersive experiences. Add approved media and project details.',
      id: 'Pengalaman augmented dan imersif untuk klien. Tambahkan media dan detail proyek yang sudah disetujui.',
    },
    status: { en: 'Selected client work', id: 'Proyek klien pilihan' },
    ambient: '#547f83',
    artwork: 'art-spatial',
    href: '#works',
    featured: true,
  },
  {
    id: 'animal-chase',
    title: 'Animal Chase',
    category: { en: 'Game Development', id: 'Pengembangan Game' },
    description: {
      en: 'An independent game currently in development.',
      id: 'Game independen yang sedang dalam pengembangan.',
    },
    status: { en: 'In development', id: 'Dalam pengembangan' },
    ambient: '#9a754d',
    artwork: 'art-animal',
    href: '#works',
    featured: true,
  },
]

/**
 * One slide inside a Selected Works card.
 * Placeholder slides use CSS artwork (`artwork` + `variant`). Replace them with real media:
 *   { image: 'media/animal-chase-1.jpg' }  or  { video: 'media/animal-chase.mp4', poster: 'media/animal-chase.jpg' }
 * Paths are relative to /public.
 */
export type CardSlide = {
  artwork?: string
  variant?: 1 | 2 | 3
  image?: string
  video?: string
  poster?: string
}

export type GridProject = {
  title: string
  filter: Exclude<FilterKey, 'All'>
  status: Localized
  slides: CardSlide[]
}

const placeholderSlides = (artwork: string): CardSlide[] => [
  { artwork, variant: 1 },
  { artwork, variant: 2 },
  { artwork, variant: 3 },
]

export const projects: GridProject[] = [
  { title: 'Project Radiant', filter: 'Games', status: { en: 'Published', id: 'Sudah rilis' }, slides: placeholderSlides('art-radiant') },
  { title: 'Spatial Experiences', filter: 'XR', status: { en: 'Client projects', id: 'Proyek klien' }, slides: placeholderSlides('art-spatial') },
  { title: 'Animal Chase', filter: 'Games', status: { en: 'In development', id: 'Dalam pengembangan' }, slides: placeholderSlides('art-animal') },
  { title: 'Interactive Experiments', filter: 'Experiments', status: { en: 'Selected explorations', id: 'Eksplorasi pilihan' }, slides: placeholderSlides('art-experiment') },
]
