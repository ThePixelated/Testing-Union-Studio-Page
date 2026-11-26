import { defineArrayMember, defineField, defineType } from 'sanity'

const categoryTitles: Record<string, string> = {
  ARLearning: 'AR Pembelajaran',
  ARBrand: 'AR untuk Brand',
  Games: 'Game',
}

/** One piece of work. Each published project gets its own page on the website (/work/<slug>). */
export const project = defineType({
  name: 'project',
  title: 'Proyek',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Dasar', default: true },
    { name: 'media', title: 'Media' },
    { name: 'story', title: 'Studi kasus' },
    { name: 'display', title: 'Tampilan di situs' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Judul', type: 'string', group: 'basic', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (bagian dari URL)',
      type: 'slug',
      group: 'basic',
      options: { source: 'title', maxLength: 80 },
      description: 'Dipakai di alamat halaman proyek. JANGAN diubah setelah dipublikasikan: link lama akan rusak.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      group: 'basic',
      options: {
        layout: 'radio',
        list: [
          { title: 'AR Pembelajaran', value: 'ARLearning' },
          { title: 'AR untuk Brand', value: 'ARBrand' },
          { title: 'Game', value: 'Games' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'basic',
      options: {
        layout: 'radio',
        list: [
          { title: 'Proyek portofolio', value: 'portfolio' },
          { title: 'Prototipe', value: 'prototype' },
          { title: 'Dalam pengembangan', value: 'in-development' },
          { title: 'Sudah rilis', value: 'released' },
        ],
      },
      initialValue: 'portfolio',
    }),
    defineField({
      name: 'origin',
      title: 'Jenis proyek (opsional)',
      type: 'string',
      group: 'basic',
      description: 'Tampil sebagai label di halaman proyek. Isi hanya jika pasti.',
      options: {
        layout: 'radio',
        list: [
          { title: 'Proyek klien', value: 'client' },
          { title: 'Proyek mandiri / tugas kuliah', value: 'self-initiated' },
        ],
      },
    }),
    defineField({
      name: 'summary',
      title: 'Ringkasan satu kalimat',
      type: 'localizedText',
      group: 'basic',
      description: 'Apa yang dilakukan proyek ini? Kosong = situs menampilkan teks "deskripsi menyusul".',
    }),
    defineField({ name: 'year', title: 'Tahun', type: 'string', group: 'basic' }),
    defineField({ name: 'platform', title: 'Platform', type: 'string', group: 'basic', description: 'Contoh: Android, iOS, WebAR, TikTok.' }),
    defineField({
      name: 'tools',
      title: 'Alat yang dipakai',
      type: 'array',
      group: 'basic',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      description: 'Hanya yang benar-benar dipakai.',
    }),
    defineField({ name: 'role', title: 'Peran', type: 'localizedString', group: 'basic', description: 'Apa yang dikerjakan di proyek ini (jangan mengklaim kerja orang lain).' }),

    defineField({
      name: 'slides',
      title: 'Gambar & video',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'imageSlide' }), defineArrayMember({ type: 'videoSlide' })],
      description: 'Item PERTAMA = sampul di kartu dan di bagian atas halaman proyek. Geser untuk mengubah urutan. Kosong = artwork sementara.',
    }),

    defineField({
      name: 'story',
      title: 'Studi kasus (opsional)',
      type: 'object',
      group: 'story',
      description: 'Bagian yang kosong tidak ditampilkan. Tulis hanya yang benar dan bisa dibuktikan.',
      fields: [
        defineField({ name: 'challenge', title: 'Tantangan', type: 'localizedText' }),
        defineField({ name: 'approach', title: 'Pendekatan', type: 'localizedText' }),
        defineField({ name: 'result', title: 'Hasil / yang dipelajari', type: 'localizedText' }),
      ],
    }),
    defineField({
      name: 'links',
      title: 'Tautan',
      type: 'array',
      group: 'story',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectLink',
          title: 'Tautan',
          fields: [
            defineField({ name: 'label', title: 'Teks tombol', type: 'localizedString', validation: (Rule) => Rule.required() }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https', 'http'] }) }),
          ],
          preview: { select: { title: 'label.id', subtitle: 'url' } },
        }),
      ],
    }),

    defineField({
      name: 'showInHero',
      title: 'Tampilkan di carousel hero (Home)',
      type: 'boolean',
      group: 'display',
      initialValue: false,
      description: 'Disarankan 3 proyek. Jika tidak ada yang dicentang, situs memakai 3 proyek pertama.',
    }),
    defineField({
      name: 'showOnHome',
      title: 'Tampilkan di "Karya pilihan" (Home)',
      type: 'boolean',
      group: 'display',
      initialValue: false,
      description: 'Disarankan 4 proyek. Semua proyek selalu muncul di halaman Karya.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Urutan tampil',
      type: 'number',
      group: 'display',
      description: 'Angka kecil tampil lebih dulu (10, 20, 30…). Kosong = di paling akhir.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'ambientColor',
      title: 'Warna ambient (opsional)',
      type: 'string',
      group: 'display',
      description: 'Warna cahaya di hero dan navbar saat proyek ini tampil. Format #RRGGBB, contoh #5f86a8. Kosong = warna bawaan kategori.',
      validation: (Rule) => Rule.regex(/^#[0-9a-fA-F]{6}$/, { name: 'warna hex' }).error('Gunakan format #RRGGBB, contoh #5f86a8.'),
    }),
  ],
  orderings: [{ title: 'Urutan tampil', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', category: 'category', media: 'slides.0.image', poster: 'slides.0.poster' },
    prepare: ({ title, category, media, poster }) => ({
      title,
      subtitle: categoryTitles[category as string] ?? category,
      media: media ?? poster,
    }),
  },
})
