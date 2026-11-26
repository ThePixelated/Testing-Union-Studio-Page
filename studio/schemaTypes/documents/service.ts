import { defineArrayMember, defineField, defineType } from 'sanity'

/** A service we offer. Collected already; shown on the website when the Services page is built. */
export const service = defineType({
  name: 'service',
  title: 'Layanan',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nama layanan', type: 'localizedString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Penjelasan (bahasa klien: hasil, bukan teknologi)', type: 'localizedText' }),
    defineField({ name: 'audience', title: 'Cocok untuk', type: 'localizedString' }),
    defineField({ name: 'deliverables', title: 'Yang diterima klien', type: 'array', of: [defineArrayMember({ type: 'localizedString' })] }),
    defineField({
      name: 'evidenceProjects',
      title: 'Bukti: proyek terkait',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      description: 'Pilih proyek yang membuktikan layanan ini. Jangan tampilkan layanan tanpa bukti.',
    }),
    defineField({ name: 'sortOrder', title: 'Urutan tampil', type: 'number', validation: (Rule) => Rule.min(0) }),
  ],
  orderings: [{ title: 'Urutan tampil', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'title.id', subtitle: 'audience.id' } },
})
