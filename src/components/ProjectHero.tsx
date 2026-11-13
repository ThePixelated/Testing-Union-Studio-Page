import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, FocusEvent, KeyboardEvent, PointerEvent } from 'react'
import { featuredProjects } from '../data/projects'
import type { ProjectSlide } from '../data/projects'
import { assetUrl } from '../lib/assets'
import { timing } from '../lib/carouselTiming'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { useI18n } from '../i18n'

/* Auto-advance timing lives in src/lib/carouselTiming.ts (image 4 s, hover 7 s, video end + 2.5 s).
 * Paused (PAUSE button / keyboard focus): no auto-advance at all. */
/** Minimum horizontal travel (px) for a touch swipe to change slides. */
const SWIPE_DISTANCE = 50

const slideCount = featuredProjects.length

type SlideState = { active: number; prev: number | null }
type MediaIssue = 'failed' | 'blocked'

const isVideoSlide = (slide: ProjectSlide) => slide.mediaType === 'video' && Boolean(slide.video)

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
  playing,
  failed,
  onFail,
  onBlocked,
  onEnded,
}: {
  slide: ProjectSlide
  active: boolean
  mounted: boolean
  playing: boolean
  failed: boolean
  onFail: (id: string) => void
  onBlocked: (id: string) => void
  onEnded: (id: string) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  const videoSrc = isVideoSlide(slide) ? slide.video : undefined
  const imageSrc = slide.mediaType === 'video' ? undefined : (slide.image ?? slide.poster)
  const showMedia = mounted && !failed && Boolean(videoSrc || imageSrc)

  // A video starts from the beginning every time its slide becomes active.
  useEffect(() => {
    const video = videoRef.current
    if (video && active) video.currentTime = 0
  }, [active, showMedia])

  // Play only while the slide is active, autoplay is allowed and the user hasn't paused.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (playing) {
      video.play().catch(() => onBlocked(slide.id))
    } else {
      video.pause()
    }
  }, [playing, showMedia, slide.id, onBlocked])

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
          playsInline
          disablePictureInPicture
          preload={active ? 'auto' : 'metadata'}
          onLoadedData={() => setLoaded(true)}
          onEnded={() => onEnded(slide.id)}
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
  const { lang, t } = useI18n()
  const [{ active, prev }, setSlides] = useState<SlideState>({ active: 0, prev: null })
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focusing, setFocusing] = useState(false)
  const [mediaIssues, setMediaIssues] = useState<Record<string, MediaIssue>>({})
  const [endedId, setEndedId] = useState<string | null>(null)
  const swipeStart = useRef<{ x: number; y: number } | null>(null)

  const project = featuredProjects[active]
  const nextIndex = (active + 1) % slideCount
  const previousIndex = (active - 1 + slideCount) % slideCount

  // Reduced motion no longer switches autoplay off (a cross-fade is not movement). It only stops videos from autoplaying.
  const paused = slideCount < 2 || userPaused || focusing
  const videoTimed = isVideoSlide(project) && !mediaIssues[project.id] && !reducedMotion
  const videoEnded = endedId === project.id

  const goNext = useCallback(() => setSlides((c) => (slideCount < 2 ? c : { active: (c.active + 1) % slideCount, prev: c.active })), [])
  const goPrev = useCallback(
    () => setSlides((c) => (slideCount < 2 ? c : { active: (c.active - 1 + slideCount) % slideCount, prev: c.active })),
    [],
  )

  // Single source of truth for the project colour: any component (navbar, section edge…) can read var(--ambient).
  useEffect(() => {
    document.documentElement.style.setProperty('--ambient', project.ambient)
  }, [project.ambient])

  // "Video ended" belongs to one slide visit: forget it whenever the slide changes.
  useEffect(() => {
    setEndedId(null)
  }, [active])

  // Auto-advance (see the timing table at the top). Restarts whenever slide, hover or pause state changes.
  useEffect(() => {
    if (paused) return
    if (videoTimed && !videoEnded) return // wait for the video to finish
    const delay = hovering ? timing.hover : videoTimed ? timing.videoExtra : timing.image
    const timer = window.setTimeout(goNext, delay)
    return () => window.clearTimeout(timer)
  }, [active, paused, hovering, videoTimed, videoEnded, goNext])

  const markIssue = useCallback((id: string, issue: MediaIssue) => setMediaIssues((current) => ({ ...current, [id]: issue })), [])
  const onFail = useCallback((id: string) => markIssue(id, 'failed'), [markIssue])
  const onBlocked = useCallback((id: string) => markIssue(id, 'blocked'), [markIssue])
  const onEnded = useCallback((id: string) => setEndedId(id), [])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') goNext()
    else if (event.key === 'ArrowLeft') goPrev()
  }

  // Keyboard focus pauses autoplay; mouse-click focus does not.
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

  return (
    <section
      className="hero"
      aria-label={t.hero.carousel}
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
          const layerClass = ['hero-slide', slide.artwork, isActive ? 'is-active' : index === prev ? 'is-prev' : ''].filter(Boolean).join(' ')
          return (
            <div key={slide.id} className={layerClass} style={{ '--slide-ambient': slide.ambient } as CSSProperties}>
              <SlideVisual
                slide={slide}
                active={isActive}
                mounted={mounted}
                playing={isActive && !reducedMotion && !userPaused}
                failed={mediaIssues[slide.id] === 'failed'}
                onFail={onFail}
                onBlocked={onBlocked}
                onEnded={onEnded}
              />
            </div>
          )
        })}
      </div>

      <div className="hero-shade" />

      {slideCount > 1 && (
        <>
          <button className="hero-side hero-side-prev" aria-label={`${t.hero.previous}: ${featuredProjects[previousIndex].title}`} onClick={goPrev}>
            <Chevron direction="left" />
          </button>
          <button className="hero-side hero-side-next" aria-label={`${t.hero.next}: ${featuredProjects[nextIndex].title}`} onClick={goNext}>
            <Chevron direction="right" />
          </button>
        </>
      )}

      <div className="hero-inner">
        <div className="hero-intro">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.line1}<br /><em>{t.hero.em}</em> {t.hero.rest}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
        </div>

        <div className="hero-bottom">
          <a className="button button-light" href="#works">{t.hero.explore} <span>↗</span></a>
          {/* Every slide's copy is stacked in one grid cell: the old text fades out, then the new one fades in. */}
          <div className="featured-copy" aria-live={userPaused ? 'polite' : 'off'}>
            {featuredProjects.map((slide, index) => (
              <div key={slide.id} className={index === active ? 'featured-copy-item is-active' : 'featured-copy-item'} aria-hidden={index !== active}>
                <div className="eyebrow">{slide.category[lang]} <span className="status-dot" /> {slide.status[lang]}</div>
                <h2>{slide.title}</h2>
                <p>{slide.description[lang]}</p>
                <a className="text-link" href={slide.href} tabIndex={index === active ? undefined : -1}>{t.hero.viewProject} <span>↗</span></a>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-controls">
          {slideCount > 1 && (
            <button className="pause-button" aria-pressed={userPaused} onClick={() => setUserPaused((value) => !value)}>
              {userPaused ? t.hero.play : t.hero.pause}
            </button>
          )}
        </div>
      </div>

      {/* Organic bottom edge: the hero dissolves into the next section instead of ending on a straight line. */}
      <div className="hero-edge" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 78C130 40 250 14 400 50S650 116 830 78S1110 6 1265 38S1400 84 1440 64V120H0Z" />
        </svg>
      </div>
    </section>
  )
}
