# Spec halaman — Union Studio

**Tujuan situs:** mendapatkan klien freelance → `../roadmap.md`. Status semua spec: **DRAFT / Diusulkan**.

## Daftar halaman

| Halaman | URL (ID · EN usulan) | Fase | Spec |
|---|---|---|---|
| Home | `/` · `/en/` | 1 | `home.md` |
| Services | `/services` · `/en/services` | 1 | `services.md` |
| Works | `/work` · `/en/work` | 1 | `work.md` |
| Project detail | `/work/<slug>` · `/en/work/<slug>` | 1 | `work-detail.md` |
| About | `/about` · `/en/about` | 1 | `about.md` |
| Contact | `/contact` · `/en/contact` | 1 (email saja; brief form: 2) | `contact.md` |
| Privacy | `/privacy` · `/en/privacy` | 1 | `privacy.md` |
| 404 | — | 1 | Pesan singkat + tautan ke Home, Works, Contact |
| Halaman produk game | `/games/<slug>` | 4 | saat Animal Chase mendekati rilis |
| ~~Playground~~ | — | **dihapus** | keputusan pemilik proyek, 14 Nov 2026 |
| Devlog / News, Careers, Press kit, Terms | — | ditunda | lihat `roadmap.md` §3 |

Selama masih di GitHub Pages, URL memakai hash (`#/about`, `#/work`, `#/work/<slug>`). URL di tabel berlaku setelah Fase 2a.

## Template spec (dipakai setiap halaman)

```
# <Halaman> — spec
URL · Fase · Status spec
Tujuan
Audiens & niatnya
Aksi utama (CTA)
Section (urut)      → # | Section | Isi | Layout | Konten/data yang dibutuhkan
State               → kosong, loading, error
SEO                 → title, description, gambar share
Bilingual           → hal khusus ID/EN
Konten yang belum ada
Kriteria selesai
```
