import { defineField, defineType } from 'sanity'

/**
 * Two-language fields. Indonesian is the main language (required), English is optional:
 * if English is empty the website shows the Indonesian text instead.
 */
export const localizedString = defineType({
  name: 'localizedString',
  title: 'Teks pendek (ID / EN)',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'id', title: 'Indonesia', type: 'string', validation: (Rule) => Rule.required().error('Isi versi Indonesia.') }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ],
  preview: { select: { title: 'id', subtitle: 'en' } },
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Teks panjang (ID / EN)',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'id', title: 'Indonesia', type: 'text', rows: 4, validation: (Rule) => Rule.required().error('Isi versi Indonesia.') }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
  ],
  preview: { select: { title: 'id', subtitle: 'en' } },
})
