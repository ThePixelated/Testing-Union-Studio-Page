import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { singletons, structure } from './structure'

const singletonTypes = new Set(singletons.map((item) => item.type))
// Only these actions on one-of-a-kind documents: no delete, no duplicate.
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'UNION STUDIO',
  // Set in studio/.env (copy .env.example). Both come from your Sanity project.
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'MISSING_PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType) ? input.filter(({ action }) => action && singletonActions.has(action)) : input,
  },
})
