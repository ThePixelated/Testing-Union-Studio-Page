import { defineField, defineType } from 'sanity'

/** One picture in a project's gallery. The FIRST media item becomes the card cover and the hero image. */
export const imageSlide = defineType({
  name: 'imageSlide',
  title: 'Gambar',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Gambar',
      type: 'image',
      options: { hotspot: true },
      description: 'Disarankan landscape (rasio sekitar 16:9 atau 3:2), lebar minimal 1600 px.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare: ({ media }) => ({ title: 'Gambar', media }),
  },
})

/** A short looping video. Keep files small (a few MB). */
export const videoSlide = defineType({
  name: 'videoSlide',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      title: 'File video',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'MP4 (H.264), 10–40 detik, tanpa suara itu tidak masalah (video diputar muted). Usahakan ≤ 8 MB.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Gambar sampul (poster)',
      type: 'image',
      options: { hotspot: true },
      description: 'Satu frame yang mewakili video. Tampil sebelum video dimuat dan jika animasi dimatikan.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { media: 'poster' },
    prepare: ({ media }) => ({ title: 'Video', media }),
  },
})
