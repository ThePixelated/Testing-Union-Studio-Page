import type { StructureResolver } from 'sanity/structure'

/** Documents that exist exactly once (no "create new", no delete). Keep in sync with sanity.config.ts. */
export const singletons = [
  { type: 'siteSettings', title: 'Pengaturan situs' },
  { type: 'homePage', title: 'Halaman Home' },
  { type: 'aboutPage', title: 'Halaman About' },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Konten')
    .items([
      ...singletons.map(({ type, title }) =>
        S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title)),
      ),
      S.divider(),
      S.documentTypeListItem('project').title('Proyek'),
      S.divider(),
      S.documentTypeListItem('service').title('Layanan (belum tampil di situs)'),
      S.documentTypeListItem('faq').title('FAQ (belum tampil di situs)'),
    ])
