# Content model (Sanity)

Skema ada di `studio/schemaTypes/`. Aturan umum: **tambah field boleh kapan saja; mengganti nama atau menghapus field butuh migrasi.**

## Dua bahasa
Setiap teks yang tampil ke pengunjung memakai `localizedString` (pendek) atau `localizedText` (panjang) = `{ id, en }`.
- **Indonesia wajib**, English opsional. English kosong → situs menampilkan Indonesia.
- Alasan: 2 bahasa, dokumen sedikit → satu dokumen per proyek dengan dua kolom bersebelahan lebih mudah daripada dua dokumen per bahasa.
- Nama proyek (`title`) adalah nama diri; tidak diterjemahkan.

## Dokumen

### Satu-satunya (singleton)
| Tipe | Isi | Dipakai di |
|---|---|---|
| `siteSettings` | `contactEmail`, `replyPromise`, `socialLinks[]` | Contact, footer |
| `homePage` | Hero (eyebrow, headline 3 bagian, subjudul), preview About (headline, paragraf), pengantar + daftar layanan | Home |
| `aboutPage` | Judul besar, pernyataan, penjelasan | About |

### Koleksi
| Tipe | Field penting | Dipakai di |
|---|---|---|
| `project` | `title`, `slug`, `category` (AR Pembelajaran / AR untuk Brand / Game), `status` (portofolio / prototipe / dalam pengembangan / rilis), `origin`, `summary`, `year`, `platform`, `tools[]`, `role`, `story{challenge, approach, result}`, `links[]`, `slides[]` (gambar / video), `showInHero`, `showOnHome`, `sortOrder`, `ambientColor` | Hero, teaser Home, halaman Karya, halaman proyek |
| `service` | `title`, `description`, `audience`, `deliverables[]`, `evidenceProjects[]` (referensi proyek), `sortOrder` | **Halaman Services (belum dibangun)** |
| `faq` | `question`, `answer`, `sortOrder` | **FAQ Home/Services (belum dibangun)** |

## Aturan tampilan (di kode, bukan di CMS)
- **Hero** = proyek dengan `showInHero` (urut `sortOrder`, maks. 5). Tidak ada yang dicentang → 3 proyek pertama.
- **Teaser Home** = proyek dengan `showOnHome` (maks. 6). Tidak ada yang dicentang → 4 proyek pertama.
- **Halaman Karya** = semua proyek, difilter per kategori; kategori tanpa proyek tidak muncul.
- **Halaman proyek** hanya menampilkan bagian yang ada isinya.
- **Sampul** = item media pertama. Tanpa media → artwork CSS sementara.
- `ambientColor` kosong/salah format → warna bawaan kategori.
- Proyek dengan kategori yang tidak dikenal dilewati (tidak merusak situs).

## Yang tetap di kode
Teks antarmuka (tombol, label, navigasi, aria), halaman Privacy, struktur Network (Union / Interactive / Foundation), warna dan tipografi, tata letak.

## Alur data
`Sanity (dokumen terbit)` → `scripts/fetch-content.mjs` (satu query GROQ, `api.sanity.io`, tanpa CDN agar selalu terbaru) → `src/content/snapshot.ts` → `src/data/projects.ts` & `src/content/site.ts` → komponen.
Draft tidak pernah ikut (butuh token; tidak dipakai).
