# Project detail (studi kasus) — spec

**URL:** `/work/<slug>` (sekarang `#/work/<slug>`) · **Fase:** 1 · **Status spec:** Diusulkan · **kerangka sudah dibangun**

**Tujuan:** meyakinkan calon klien bahwa studio bisa menyelesaikan masalah serupa.
**Audiens & niat:** klien yang sudah tertarik dan menilai kedalaman kerja.
**Aksi utama:** "Butuh yang serupa? Ceritakan proyek Anda" → Contact.

## Section

| # | Section | Isi | Layout |
|---|---|---|---|
| 1 | Hero media | Gambar/video utama + judul + label status | Lebar penuh |
| 2 | **Ringkasan** | Peran · tahun · platform · tools · status · durasi (hanya yang benar) | Panel samping |
| 3 | **Tantangan** | Masalah/tujuan proyek | Teks |
| 4 | **Pendekatan** | Proses, keputusan teknis penting | Teks + gambar |
| 5 | **Solusi** | Fitur/hasil utama | Teks + galeri |
| 6 | **Hasil / pelajaran** | **Hasil terukur hanya jika benar-benar ada.** Jika tidak: tulis "yang kami pelajari" | Teks |
| 7 | Galeri / video | 6–10 gambar, video penjelasan | Grid |
| 8 | Tautan | Video, build, efek TikTok, repo (jika ada) | Tombol |
| 9 | Project berikutnya | 1–2 project lain | Card |
| 10 | CTA | "Butuh yang serupa?" | Penuh lebar |

## Aturan
- Tandai **"Proyek mandiri (self-initiated)"** bila bukan karya klien — kejujuran meningkatkan kepercayaan.
- Jangan sebut klien, angka, atau dampak yang tidak bisa dibuktikan.
- Peran jelas ("saya mengerjakan X") — jangan mengklaim pekerjaan tim.

## Data (sudah didukung di `src/data/projects.ts`)
Wajib: `slug`, `title`, `category`, `status`, `ambient`, `artwork`, `slides`. Opsional (bagian halaman hanya tampil jika terisi): `summary`, `origin` (klien/mandiri), `role`, `year`, `platform`, `tools`, `links`, `story` (`challenge`/`approach`/`result`), media di `slides`. Nanti dipetakan ke "Suggested Project fields" Sanity (handoff §9).

## State
Slug tidak ditemukan → 404 · media gagal dimuat → fallback gambar poster.

## Kriteria selesai
Template dipakai oleh ≥2 project asli; semua section yang tidak ada datanya **tidak dirender** (tidak ada kotak kosong).
