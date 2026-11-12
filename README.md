# UNION STUDIO Website

Initial frontend scaffold for the UNION STUDIO website.

## Requirements

- Node.js LTS
- npm
- Git

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## GitHub Pages

This project is configured for:

`https://thepixelated.github.io/Testing-Union-Studio-Page/`

The Vite `base` value is configured in `vite.config.ts` as `/Testing-Union-Studio-Page/`.

To publish:
1. Push the project files to the repository's `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and deploys the site.

## Current prototype status

- Responsive homepage sections
- Glass-style main navigation
- Featured project carousel with autoplay, pause, and manual pagination
- Ambient color field tied to active hero slide
- Portfolio category filters
- Small interactive playground interaction
- About preview, capabilities, contact CTA and footer

Project artwork is CSS-generated placeholder artwork. Replace it with approved project screenshots, images, or video before public launch. The contact email is also a placeholder.

## Planned architecture

The initial frontend is deliberately independent from a CMS. Sanity will be introduced in a later milestone and will supply:
- Site settings and navigation
- Hero slides and featured projects
- Project details and categories
- Playground demo metadata
- About page content
- Contact and social links

Do not put Sanity write tokens or private API credentials in browser code.
