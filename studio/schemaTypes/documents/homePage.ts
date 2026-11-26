import { defineArrayMember, defineField, defineType } from 'sanity'

/** One-of-a-kind document: marketing copy on the Home page. Empty fields fall back to the text built into the website. */
export const homePage = defineType({
  name: 'homePage',
  title: 'Halaman Home',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero (bagian paling atas)', options: { collapsible: true, collapsed: false } },
    { name: 'about', title: 'Tentang (preview)', options: { collapsible: true, collapsed: true } },
    { name: 'capabilities', title: 'Layanan / Capabilities', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Label kecil di atas headline', type: 'localizedString', fieldset: 'hero' }),
    defineField({
      name: 'heroLine1',
      title: 'Headline — baris 1',
      type: 'localizedString',
      fieldset: 'hero',
      description: 'Headline = baris 1, lalu kata penekanan (warna redup), lalu sisanya. Contoh: "Kami bangun dunia," / "pengalaman" / "& karya."',
    }),
    defineField({ name: 'heroEm', title: 'Headline — kata penekanan', type: 'localizedString', fieldset: 'hero' }),
    defineField({ name: 'heroRest', title: 'Headline — sisa kalimat', type: 'localizedString', fieldset: 'hero' }),
    defineField({ name: 'heroSubtitle', title: 'Subjudul', type: 'localizedText', fieldset: 'hero', description: '1–2 kalimat spesifik: apa yang dikerjakan dan untuk siapa.' }),

    defineField({
      name: 'aboutPreviewHeadline',
      title: 'Headline',
      type: 'localizedText',
      fieldset: 'about',
      description: 'Tekan Enter untuk pindah baris.',
    }),
    defineField({ name: 'aboutPreviewBody', title: 'Paragraf', type: 'localizedText', fieldset: 'about' }),

    defineField({ name: 'capabilitiesCopy', title: 'Kalimat pengantar', type: 'localizedText', fieldset: 'capabilities' }),
    defineField({
      name: 'capabilities',
      title: 'Daftar layanan (singkat)',
      type: 'array',
      fieldset: 'capabilities',
      of: [defineArrayMember({ type: 'localizedString' })],
      description: 'Biasanya 3–4 baris.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Halaman Home' }) },
})
