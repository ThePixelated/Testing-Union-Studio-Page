import { defineField, defineType } from 'sanity'

/** One-of-a-kind document: the About page. Written in the voice of the studio ("kami"), no personal name or photo. */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Halaman About',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Judul besar', type: 'localizedText', description: 'Tekan Enter untuk pindah baris.' }),
    defineField({ name: 'statement', title: 'Pernyataan utama', type: 'localizedText' }),
    defineField({ name: 'body', title: 'Penjelasan', type: 'localizedText' }),
  ],
  preview: { prepare: () => ({ title: 'Halaman About' }) },
})
