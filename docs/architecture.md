# UNION STUDIO — Initial Architecture

## Phase 1: Static frontend

- React + TypeScript
- Vite build tool
- CSS design tokens and component styles
- GitHub repository and GitHub Actions
- GitHub Pages hosting

## Phase 2: CMS

Sanity is planned as the headless CMS. The public website will consume published content through Sanity's read API.

Proposed content types:
1. Site Settings
2. Hero Slide
3. Project
4. Project Category
5. Playground Demo
6. Capabilities
7. About Page
8. Contact Settings

### Relationships

- A Hero Slide references one Project.
- A Project belongs to one or more Categories.
- A Project can reference one or more Playground Demos.
- Site Settings contains global navigation, footer and brand/network switcher settings.

## Frontend data flow

Sanity published content → public read client → typed content mapping → React sections.

Use local fallback content if the CMS request fails. Keep all secrets out of the browser bundle.

## Hosting migration

The frontend should remain portable:
- GitHub Pages for the first public prototype.
- Cloudflare Pages as a later hosting option.
- When moving from a repository subpath to a custom domain root, change Vite `base` to `/` and update deployment configuration.

## Brand and factual safeguards

The UNION documentation proposes a shared Network Switcher and a corporate design system. Treat the network bar as a proposed cross-site component, not proof that all sibling websites are live.

The documentation also states UNION is not yet an established legal business entity. Avoid claims that imply a registered corporation, large established team, physical headquarters, or unverified partners and credentials.
