import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, FocusEvent, KeyboardEvent, PointerEvent } from 'react'
import { featuredProjects } from '../data/projects'
import type { ProjectSlide } from '../data/projects'
import { assetUrl } from '../lib/assets'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

/** Time each slide stays on screen (ms) before auto-fading to the next one. */
const SLIDE_DURATION = 5000
/** Minimum horizontal travel (px) for a touch swipe to change slides. */
const SWIPE_DISTANCE = 50

const slideCount = featuredProjects.length

type SlideState = { active: number; prev: number | null }

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === 'left' ? 'M15 4.5 7.5 12l7.5 7.5' : 'M9 4.5 16.5 12 9 19.5'} />
    </svg>
  )
}

/* ---------------------------------------------------------------------------
 * Slide visual: CSS artwork is always the base layer. If the slide has real
 * media it fades in on top once loaded; if it errors we just keep the artwork.
 * ------------------------------------------------------------------------- */
function SlideVisual({
  slide,
  active,
  mounted,
  reducedMotion,
  failed,
  onFail,
}: {
  slide: ProjectSlide
  active: boolean
  mounted: boolean
  reducedMotion: boolean
  failed: boolean
  onFail: (id: string) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  const videoSrc = slide.mediaType === 'video' ? slide.video : undefined
  const imageSrc = slide.mediaType === 'video' ? undefined : (slide.image ?? slide.poster)
  const showMedia = mounted && !failed && Boolean(videoSrc || imageSrc)

  // Only the active slide plays; reduced-motion users get the poster frame only.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active && !reducedMotion) {
      video.play().catch(() => {
        /* autoplay blocked: poster stays visible, that's fine */
      })
    } else {
      video.pause()
    }
  }, [active, reducedMotion, showMedia])

  return (
    <>
      <div className="slide-art" aria-hidden="true">
        <div className="art-orb" />
        <div className="art-ridge ridge-back" />
        <div className="art-ridge ridge-front" />
        <div className="art-grid" />
      </div>
      {showMedia && videoSrc && (
        <video
          ref={videoRef}
          className={loaded ? 'slide-media is-loaded' : 'slide-media'}
          src={assetUrl(videoSrc)}
          poster={slide.poster ? assetUrl(slide.poster) : undefined}
          muted
          loop
          playsInline
          disablePictureInPicture
          preload={active ? 'auto' : 'metadata'}
          onLoadedData={() => setLoaded(true)}
          onError={() => onFail(slide.id)}
        />
      )}
      {showMedia && !videoSrc && imageSrc && (
        <img
          className={loaded ? 'slide-media is-loaded' : 'slide-media'}
          src={assetUrl(imageSrc)}
          alt=""
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => onFail(slide.id)}
        />
      )}
    </>
  )
}

export default function ProjectHero() {
  const reducedMotion = usePrefersReducedMotion()
  const [{ active, prev }, setSlides] = useState<SlideState>({ active: 0, prev: null })
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focusing, setFocusing] = useState(false)
  const [failedMedia, setFailedMedia] = useState<Record<string, boolean>>({})
  const swipeStart = useRef<{ x: number; y: number } | null>(null)

  const project = featuredProjects[active]
  const nextIndex = (active + 1) % slideCount

  // Autoplay is off for reduced-motion users and when there is nothing to rotate to.
  const autoplay = slideCount > 1 && !reducedMotion
  const paused = !autoplay || userPaused || hovering || focusing

  const goNext = useCallback(() => setSlides((c) => (slideCount < 2 ? c : { active: (c.active + 1) % slideCount, prev: c.active })), [])
  const goPrev = useCallback(
    () => setSlides((c) => (slideCount < 2 ? c : { active: (c.active - 1 + slideCount) % slideCount, prev: c.active })),
    [],
  )

  // Single source of truth for the project colour: any component (navbar now, more later) can read var(--ambient).
  useEffect(() => {
    document.documentElement.style.setProperty('--ambient', project.ambient)
  }, [project.ambient])

  const markFailed = useCallback((id: string) => setFailedMedia((current) => ({ ...current, [id]: true })), [])

  // Auto-advance. Any change of slide (auto or manual) restarts the countdown; pausing clears it.
  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(goNext, SLIDE_DURATION)
    return () => window.clearTimeout(timer)
  }, [active, paused, goNext])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') goNext()
    else if (event.key === 'ArrowLeft') goPrev()
  }

  // Keyboard focus pauses autoplay; mouse-click focus does not (otherwise clicking a dot would freeze the carousel).
  const onFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.target.matches(':focus-visible')) setFocusing(true)
  }
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusing(false)
  }

  // Touch / pen swipe. Vertical scrolling is left to the browser via `touch-action: pan-y` in CSS.
  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') return
    if ((event.target as HTMLElement).closest('a, button')) return
    swipeStart.current = { x: event.clientX, y: event.clientY }
  }
  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = swipeStart.current
    swipeStart.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext()
      else goPrev()
    }
  }

  const previousIndex = (active - 1 + slideCount) % slideCount

  return (
    <section
      className="hero"
      aria-label="Featured projects"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        swipeStart.current = null
      }}
    >
      {/* Ambient colour: one soft glow per slide, cross-faded with opacity (GPU-cheap, no gradient animation). */}
      <div className="hero-ambient" aria-hidden="true">
        {featuredProjects.map((slide, index) => (
          <div
            key={slide.id}
            className={index === active ? 'ambient-layer is-active' : 'ambient-layer'}
            style={{ '--slide-ambient': slide.ambient } as CSSProperties}
          />
        ))}
      </div>

      {/* Visuals: only previous / active / next slides get their media mounted, so we never download everything at once. */}
      <div className="hero-stage" aria-hidden="true">
        {featuredProjects.map((slide, index) => {
          const isActive = index === active
          const mounted = isActive || index === prev || index === nextIndex
          const layerClass = ['hero-slide', isActive ? 'is-active' : index === prev ? 'is-prev' : ''].filter(Boolean).join(' ')
          return (
            <div key={slide.id} className={layerClass} style={{ '--slide-ambient': slide.ambient } as CSSProperties}>
              <SlideVisual
                slide={slide}
                active={isActive}
                mounted={mounted}
                reducedMotion={reducedMotion}
                failed={Boolean(failedMedia[slide.id])}
                onFail={markFailed}
              />
            </div>
          )
        })}
      </div>

      <div className="hero-shade" />

      {slideCount > 1 && (
        <>
          <button className="hero-side hero-side-prev" aria-label={`Previous project: ${featuredProjects[previousIndex].title}`} onClick={goPrev}>
            <Chevron direction="left" />
          </button>
          <button className="hero-side hero-side-next" aria-label={`Next project: ${featuredProjects[nextIndex].title}`} onClick={goNext}>
            <Chevron direction="right" />
          </button>
        </>
      )}

      <div className="hero-inner">
        <div className="hero-intro">
          <p className="eyebrow">Independent creative technology studio</p>
          <h1>We build worlds,<br /><em>experiences</em> & things.</h1>
          <p className="hero-subtitle">Turning ideas into interactive experiences — from games and XR to digital applications.</p>
        </div>

        <div className="hero-bottom">
          <a className="button button-light" href="#works">Explore our work <span>↗</span></a>
          <div className="featured-copy" aria-live={userPaused ? 'polite' : 'off'}>
            <div className="featured-copy-inner" key={project.id}>
              <div className="eyebrow">{project.category} <span className="status-dot" /> {project.status}</div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <a className="text-link" href={project.href}>View project <span>↗</span></a>
            </div>
          </div>
        </div>

        <div className="hero-controls">
          {autoplay && (
            <button className="pause-button" aria-pressed={userPaused} onClick={() => setUserPaused((value) => !value)}>
              {userPaused ? 'PLAY' : 'PAUSE'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
