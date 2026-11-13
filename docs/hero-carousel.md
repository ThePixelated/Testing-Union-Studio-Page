# Hero carousel — how it works

Component: `src/components/ProjectHero.tsx` · Data: `src/data/projects.ts` (`featuredProjects`)

## Behaviour
Auto-advance timing (constants at the top of `ProjectHero.tsx`):

| Situation | Time on slide |
|---|---|
| Image slide, mouse away | 5 s (`IMAGE_DURATION`) |
| Video slide, mouse away | until the video ends + 2.5 s (`VIDEO_EXTRA`) |
| Mouse over the hero | 30 s (`HOVER_DURATION`), counted from the moment the mouse enters (video: from when it ends) |
| PAUSE button / keyboard focus | no auto-advance |

- The countdown restarts whenever the slide, the hover state or the pause state changes.
- Videos are muted, don't loop (so "ended" fires) and restart from 0 each time their slide becomes active. If a video fails or autoplay is blocked, the slide falls back to the 5 s image timing.
- Slides change with a cross-fade (opacity only): the old copy fades out, then the new copy fades in; visuals cross-fade with the previous one held underneath, so there is no dark dip.
- Side controls: full-height zones on the left/right edge. Arrow and black gradient are hidden until the cursor enters the zone, then fade in (arrow slides in from outside the frame, cubic ease-in-out). On touch-only devices wider than 700px the arrows stay faintly visible; <= 700px they are hidden (swipe instead).
- Also: ArrowLeft/ArrowRight inside the hero, touch swipe, PAUSE/PLAY button.
- `prefers-reduced-motion`: fades are kept (shortened to .35s) and the sliding arrow animation is removed. Autoplay stays on (there is a PAUSE button); videos do not autoplay (poster only).

## Ambient colour
- Each slide has an `ambient` colour. Each slide gets its own glow layer; layers cross-fade with `opacity` (cheap on mobile GPUs).
- The active colour is also written to `--ambient` on `<html>`. `@property --ambient` is registered in `styles.css`, so anything can transition on it (the navbar tint does).
- Browsers without `@property` support simply snap the navbar tint; the hero glow still fades.

## Adding real media to a slide
Put files in `public/media/` and set the optional fields:

```ts
{
  id: 'animal-chase', /* ...existing fields... */
  mediaType: 'video',            // or 'image'
  video: 'media/animal-chase.mp4',
  poster: 'media/animal-chase-poster.jpg',
  // for mediaType 'image': image: 'media/animal-chase.jpg'
}
```

- Paths are relative to `public/` and resolved through `assetUrl()` (`src/lib/assets.ts`), so they keep working when `base` changes.
- Only the previous / active / next slide mount their media. Only the active video plays.
- If media fails to load, the CSS artwork stays visible as fallback.
- Keep videos muted, short loops (a few MB). Always provide a poster.

## Navbar
`src/components/SiteHeader.tsx` — sticky glass bar (navy base + ambient tint), darker once scrolled, mobile menu below 700px.
Network dropdown content lives in `src/data/network.ts`; set an item to `status: 'live'` + `href` when its site exists.
Logo: set `logo.src` in `src/data/brand.ts` after adding the file to `public/brand/`.

## Hero bottom edge
`.hero-edge` (SVG wave inside the hero) + the tinted top of `.about-strip` use the active `--ambient` colour, so the project colour "bleeds" into the next section and the border is not a straight line. Change the wave in the `<path>` in `ProjectHero.tsx`, the height with `--edge-h`, the tint strength with the `26%` in `styles.css`.

## Selected Works cards
`src/components/ProjectCard.tsx`: each card is a carousel (manual only). Arrows are hidden until the cursor is near the left/right edge (same reveal as the hero). Slides come from `projects[].slides` in `src/data/projects.ts`; the current ones are CSS placeholders (`artwork` + `variant`). Replace with `{ image: 'media/…jpg' }` or `{ video, poster }`; videos play only while the card is hovered.
