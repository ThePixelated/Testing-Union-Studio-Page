# Design tokens

## Colour palette (current)
| Token | Value | Used for |
|---|---|---|
| `--navy` | `#16264D` | Brand colour: navbar glass, hero base, capabilities section, cards, contact glow |
| `--white` | `#FFFFFF` | Text on dark, light sections, buttons |
| `--graphite` | `#323232` | Playground section, text on light sections |
| `--black` | `#000000` | Page background, hero base, footer |
| `--accent` | `var(--white)` | Small accents (status dot, link arrows, focus ring). Change this one line if an accent colour is added later. |

Project ambient colours (hero glow) are content-driven per slide and are not part of the palette.

## Font roles (change in `:root` of `styles.css`)
| Variable | Role | Currently (placeholder) |
|---|---|---|
| `--font-display` | Hero headline, section titles, project titles, network headings | Manrope |
| `--font-body` | Paragraphs, navigation, buttons, UI text | Manrope |
| `--font-mono` | Small labels, metadata, eyebrows, status tags | DM Mono |

Self-host fonts as `.woff2` in `public/fonts/` with `@font-face` (use `font-display: swap`); remove the Google Fonts `@import` at the top of `styles.css` when switching.
