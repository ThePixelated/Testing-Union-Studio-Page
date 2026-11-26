import { defineField, defineType } from 'sanity'

/** A frequently asked question. Collected already; shown when the FAQ section is built. */
export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Pertanyaan', type: 'localizedString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Jawaban', type: 'localizedText', validation: (Rule) => Rule.required() }),
    defineField({ name: 'sortOrder', title: 'Urutan tampil', type: 'number', validation: (Rule) => Rule.min(0) }),
  ],
  orderings: [{ title: 'Urutan tampil', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'question.id', subtitle: 'answer.id' } },
})
