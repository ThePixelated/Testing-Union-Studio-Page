import { useCallback, useEffect, useRef, useState } from 'react'
import type { FocusEvent, KeyboardEvent, PointerEvent } from 'react'
import type { CardSlide, GridProject } from '../data/projects'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { assetUrl } from '../lib/assets'
import { timing } from '../lib/carouselTiming'
import { useI18n } from '../i18n'

const SWIPE_DISTANCE = 40
/** Cards start their first countdown a little apart so the whole grid doesn't flip at the same instant. */
const STAGGER = 700

type Issue = 'failed' | 'blocked'

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === 'left' ? 'M15 4.5 7.5 12l7.5 7.5' : 'M9 4.5 16.5 12 9 19.5'} />
    </svg>
  )
}

/** One slide: CSS placeholder artwork, or a real image / video. */
function CardSlideView({
  slide,
  position,
  active,
  near,
  playing,
  failed,
  onIssue,
  onEnded,
}: {
  slide: CardSlide
  position: number
  active: boolean
  near: boolean
  playing: boolean
  failed: boolean
  onIssue: (position: number, issue: Issue) => void
  onEnded: (position: number) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const showVideo = near && Boolean(slide.video) && !failed

  useEffect(() => {
    const video = videoRef.current
    if (video && active) video.currentTime = 0
  }, [active, showVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (playing) video.play().catch(() => onIssue(position, 'blocked'))
    else video.pause()
  }, [playing, showVideo, position, onIssue])

  const className = ['project-slide', 'project-art', slide.artwork, slide.variant ? `v${slide.variant}` : '', active ? 'is-active' : ''].filter(Boolean).join(' ')
  return (
    <div className={className} aria-hidden={!active}>
      {showVideo && (
        <video
          ref={videoRef}
          className="card-media"
          src={assetUrl(slide.video!)}
          poster={slide.poster ? assetUrl(slide.poster) : undefined}
          muted
          playsInline
          preload="metadata"
          onEnded={() => onEnded(position)}
          onError={() => onIssue(position, 'failed')}
        />
      )}
      {near && !slide.video && slide.image && <img className="card-media" src={assetUrl(slide.image)} alt="" loading="lazy" decoding="async" />}
    </div>
  )
}

export default function ProjectCard({ project, order = 0 }: { project: GridProject; order?: number }) {
  const { lang, t } = useI18n()
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focusing, setFocusing] = useState(false)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')
  const [issues, setIssues] = useState<Record<number, Issue>>({})
  const [endedAt, setEndedAt] = useState<number | null>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const swipeStart = useRef<number | null>(null)
  const stagger = useRef(order * STAGGER)
  const count = project.slides.length

  const go = useCallback((delta: number) => setIndex((current) => (current + delta + count) % count), [count])

  // Only animate cards that are on screen.
  useEffect(() => {
    const element = mediaRef.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const current = project.slides[index]
  const videoTimed = Boolean(current.video) && !issues[index] && !reducedMotion
  const videoEnded = endedAt === index

  useEffect(() => {
    setEndedAt(null)
  }, [index])

  // Auto-advance: same rules as the hero (see src/lib/carouselTiming.ts).
  useEffect(() => {
    if (count < 2 || !visible || focusing) return
    if (videoTimed && !videoEnded) return
    const base = hovered ? timing.hover : videoTimed ? timing.videoExtra : timing.image
    const timer = window.setTimeout(() => {
      stagger.current = 0
      go(1)
    }, base + stagger.current)
    return () => window.clearTimeout(timer)
  }, [count, index, visible, focusing, hovered, videoTimed, videoEnded, go])

  const onIssue = useCallback((position: number, issue: Issue) => setIssues((all) => ({ ...all, [position]: issue })), [])
  const onEnded = useCallback((position: number) => setEndedAt(position), [])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (count < 2) return
    if (event.key === 'ArrowRight') go(1)
    else if (event.key === 'ArrowLeft') go(-1)
  }
  const onFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.target.matches(':focus-visible')) setFocusing(true)
  }
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusing(false)
  }
  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' && !(event.target as HTMLElement).closest('button')) swipeStart.current = event.clientX
  }
  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = swipeStart.current
    swipeStart.current = null
    if (start === null || count < 2) return
    const dx = event.clientX - start
    if (Math.abs(dx) >= SWIPE_DISTANCE) go(dx < 0 ? 1 : -1)
  }

  return (
    <article className="project-card">
      <div
        ref={mediaRef}
        className="project-media"
        role="group"
        aria-roledescription="carousel"
        aria-label={project.title}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStart.current = null
        }}
      >
        {project.slides.map((slide, i) => {
          const near = i === index || i === (index + 1) % count || i === (index - 1 + count) % count
          return (
            <CardSlideView
              key={i}
              slide={slide}
              position={i}
              active={i === index}
              near={near}
              playing={i === index && visible && !reducedMotion}
              failed={issues[i] === 'failed'}
              onIssue={onIssue}
              onEnded={onEnded}
            />
          )
        })}
        {/* The whole picture is the link. Arrows are siblings (not children) so we never nest buttons inside a link. */}
        <a className="project-link" href="#contact" aria-label={`${t.works.view} ${project.title}`} />
        <span className="art-caption">{t.works.caption}</span>
        {count > 1 && (
          <>
            <button className="card-side card-side-prev" aria-label={t.works.previousImage} onClick={() => go(-1)}>
              <Chevron direction="left" />
            </button>
            <button className="card-side card-side-next" aria-label={t.works.nextImage} onClick={() => go(1)}>
              <Chevron direction="right" />
            </button>
          </>
        )}
        <span className="sr-only" aria-live="off">{index + 1} / {count}</span>
      </div>
      <div className="project-meta">
        <div><h3>{project.title}</h3><p>{t.works.filters[project.filter]} · {project.status[lang]}</p></div>
        <span>↗</span>
      </div>
    </article>
  )
}
