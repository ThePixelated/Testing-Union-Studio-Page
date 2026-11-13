export type ProjectSlide = {
  id: string
  title: string
  category: string
  description: string
  status: string
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
    category: 'Game Development',
    description: 'A published game project. Replace this copy with the verified project description.',
    status: 'Published',
    ambient: '#8c665d',
    artwork: 'art-radiant',
    href: '#works',
    featured: true,
  },
  {
    id: 'spatial',
    title: 'Spatial Experiences',
    category: 'XR & Spatial',
    description: 'Client-based augmented and immersive experiences. Add approved media and project details.',
    status: 'Selected client work',
    ambient: '#547f83',
    artwork: 'art-spatial',
    href: '#works',
    featured: true,
  },
  {
    id: 'animal-chase',
    title: 'Animal Chase',
    category: 'Game Development',
    description: 'An independent game currently in development.',
    status: 'In development',
    ambient: '#9a754d',
    artwork: 'art-animal',
    href: '#works',
    featured: true,
  },
]

export const projects = [
  { title: 'Project Radiant', category: 'Games', status: 'Published', artwork: 'art-radiant' },
  { title: 'Spatial Experiences', category: 'XR', status: 'Client projects', artwork: 'art-spatial' },
  { title: 'Animal Chase', category: 'Games', status: 'In development', artwork: 'art-animal' },
  { title: 'Interactive Experiments', category: 'Experiments', status: 'Selected explorations', artwork: 'art-experiment' },
]