import { defineArrayMember, defineField, defineType } from 'sanity'

/** One-of-a-kind document (see structure.ts): contact details shown in the footer and contact section. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Pengaturan situs',
  type: 'document',
  fields: [
    defineField({ name: 'contactEmail', title: 'Email kontak', type: 'string', validation: (Rule) => Rule.required().email() }),
    defineField({
      name: 'replyPromise',
      title: 'Janji waktu balas',
      type: 'localizedString',
      description: 'Contoh: "Balasan maksimal 2 hari kerja." Hanya tulis yang sanggup ditepati.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Tautan sosial / portofolio (footer)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          title: 'Tautan',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: { list: ['Behance', 'LinkedIn', 'itch.io', 'TikTok', 'Instagram', 'YouTube', 'GitHub', 'Lainnya'] },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https'] }) }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Pengaturan situs' }) },
})
