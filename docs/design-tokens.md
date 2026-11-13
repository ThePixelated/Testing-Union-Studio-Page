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
All three roles currently use **Alan Sans** (variable font, weights 300–900, Latin, SIL OFL — free for commercial/web use). Loaded from Google Fonts via the `@import` at the top of `styles.css`.

| Variable | Role |
|---|---|
| `--font-display` | Hero headline, section titles, project titles, network headings |
| `--font-body` | Paragraphs, navigation, buttons, UI text |
| `--font-mono` | Small labels, metadata, eyebrows, status tags |

To self-host instead (no third-party request, faster): `npm i @fontsource-variable/alan-sans`, add `import '@fontsource-variable/alan-sans'` in `main.tsx`, set the three variables to `'Alan Sans Variable', system-ui, sans-serif`, and delete the `@import` line.
