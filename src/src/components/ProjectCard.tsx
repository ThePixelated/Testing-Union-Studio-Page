import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import type { CardSlide, GridProject } from '../data/projects'
import { assetUrl } from '../lib/assets'
import { useI18n } from '../i18n'

const SWIPE_DISTANCE = 40

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === 'left' ? 'M15 4.5 7.5 12l7.5 7.5' : 'M9 4.5 16.5 12 9 19.5'} />
    </svg>
  )
}

/** One slide: CSS placeholder artwork, or a real image / video. Videos only play while the card is hovered. */
function CardSlideView({ slide, active, near, hovered }: { slide: CardSlide; active: boolean; near: boolean; hovered: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active && hovered) video.play().catch(() => undefined)
    else video.pause()
  }, [active, hovered, near])

  const className = ['project-slide', 'project-art', slide.artwork, slide.variant ? `v${slide.variant}` : '', active ? 'is-active' : ''].filter(Boolean).join(' ')
  return (
    <div className={className} aria-hidden={!active}>
      {near && slide.video && (
        <video ref={videoRef} className="card-media" src={assetUrl(slide.video)} poster={slide.poster ? assetUrl(slide.poster) : undefined} muted loop playsInline preload="metadata" />
      )}
      {near && !slide.video && slide.image && <img className="card-media" src={assetUrl(slide.image)} alt="" loading="lazy" decoding="async" />}
    </div>
  )
}

export default function ProjectCard({ project }: { project: GridProject }) {
  const { lang, t } = useI18n()
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const swipeStart = useRef<number | null>(null)
  const count = project.slides.length

  const go = (delta: number) => setIndex((current) => (current + delta + count) % count)

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (count < 2) return
    if (event.key === 'ArrowRight') go(1)
    else if (event.key === 'ArrowLeft') go(-1)
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
        className="project-media"
        role="group"
        aria-roledescription="carousel"
        aria-label={project.title}
        onKeyDown={onKeyDown}
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
          return <CardSlideView key={i} slide={slide} active={i === index} near={near} hovered={hovered} />
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
        <span className="sr-only" aria-live="polite">{index + 1} / {count}</span>
      </div>
      <div className="project-meta">
        <div><h3>{project.title}</h3><p>{t.works.filters[project.filter]} · {project.status[lang]}</p></div>
        <span>↗</span>
      </div>
    </article>
  )
}
