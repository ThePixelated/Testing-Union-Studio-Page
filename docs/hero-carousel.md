# Hero carousel — how it works

Component: `src/components/ProjectHero.tsx` · Data: `src/data/projects.ts` (`featuredProjects`)

## Behaviour
- Auto-advances every `SLIDE_DURATION` ms (5000) with a cross-fade (opacity only, no sliding).
- Side controls: two full-height zones on the left/right edge, black-to-transparent gradient, chevron in the middle. Hidden on screens <= 700px (use swipe there).
- Also: ArrowLeft/ArrowRight inside the hero, touch swipe, PAUSE/PLAY button.
- Autoplay pauses on mouse hover, keyboard focus (`:focus-visible` only) and the PAUSE button. It restarts a fresh countdown on resume or after any slide change.
- Autoplay is disabled when `prefers-reduced-motion: reduce` is set (no PAUSE button in that case).

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
