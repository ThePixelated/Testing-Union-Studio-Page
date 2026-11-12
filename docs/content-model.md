# Proposed Sanity Content Model

This is a planning document. Schemas are not yet implemented.

## Site Settings
- siteName
- logo
- navigationItems[]
- networkSwitcherItems[]
- footerGroups[]
- socialLinks[]
- contactEmail

## Project
- title
- slug
- category[]
- shortDescription
- fullDescription
- status (published, in-development, concept, archived)
- coverImage
- gallery[]
- heroMedia (image or video)
- ambientColor
- platforms[]
- technologies[]
- credits[]
- externalLinks[]
- featuredOnHome
- sortOrder
- locale

## Hero Slide
- project (reference to Project)
- headlineOverride (optional)
- descriptionOverride (optional)
- heroMedia (optional override)
- ambientColor (optional override)
- sortOrder
- enabled

## Playground Demo
- title
- slug
- category
- project (optional reference)
- demoType (web-embed, web-build, external-link, video-preview, device-preview)
- embedUrl (only where appropriate)
- fallbackMedia
- compatibilityNotes
- enabled

## About Page
- introduction
- studioStory
- vision
- mission[]
- partners[] (only verified and approved)
- trackRecord[]
- media[]

## Capabilities
- title
- description
- icon
- relatedProjects[]
- enabled
- sortOrder

## Editorial and publishing rules
- Keep project titles and descriptions as text fields, never baked into hero images.
- Provide image alt text.
- Store a poster image for video media.
- Do not publish client work without permission.
- Distinguish published work from works in development.
