# CMS + hosting — setup langkah demi langkah

> Dibuat: 24 Nov 2026 · untuk rilis v0.8 · bahasa: Indonesia

## Gambaran besar

```
Lo edit di Sanity Studio  ──Publish──▶  webhook  ──▶  Cloudflare Pages build
                                                         │  npm run build
                                                         │  1. ambil konten terbit dari Sanity  (scripts/fetch-content.mjs)
                                                         │  2. bangun situs
                                                         ▼
                                                    situs live (±1–3 menit)
```

| Bagian | Peran | Biaya |
|---|---|---|
| **GitHub** | Tempat **kode** (repo). *Bukan* hosting. GitHub Pages boleh dimatikan | gratis |
| **Sanity** | Tempat **konten** (proyek, teks Home/About, pengaturan) + Studio (halaman admin) | gratis (cek batas terbaru) |
| **Cloudflare Pages** | **Hosting** situs + build otomatis | gratis (cek batas terbaru) |

**Cara kerja konten:** konten diambil **saat build** dan disimpan sebagai `src/content/snapshot.ts` (bukan diambil browser tiap kali ada pengunjung). Akibatnya: situs cepat, tidak tergantung Sanity saat dibuka pengunjung, dan kalau Sanity sedang bermasalah situs tetap tampil memakai snapshot terakhir.

**Dua hal yang tidak diedit lewat CMS:** tata letak/desain dan teks antarmuka (tombol, label, navigasi). Itu tetap di kode (`src/i18n/dictionary.ts`).

---

## Bagian 1 — Pastikan situs jalan dulu (tanpa CMS)

1. Ekstrak ZIP ke root repo (timpa bila ditanya), lalu `npm install` (tidak ada dependency baru). Folder `studio-overlay/` belum dipakai sampai Bagian 2.
2. `npm run dev` → situs tampil seperti v0.7. Di terminal akan muncul:
   `[content] SANITY_PROJECT_ID is not set: using the committed snapshot` — itu normal.

## Bagian 2 — Buat project Sanity dan Studio (±30 menit)

1. Buat akun di **sanity.io** (login dengan Google atau GitHub).
2. Di **root repo** jalankan:
   ```bash
   npm create sanity@latest -- --dataset production --template clean --typescript --output-path studio
   ```
   Wizard akan: minta login → membuat **project baru** (namai "UNION STUDIO") → dataset `production` → TypeScript. Jika pilihan/flag berbeda, ikuti pertanyaannya; pilih **"Clean project, no predefined schema"** dan **TypeScript**. Package manager: npm.
3. Catat **Project ID** (muncul di wizard, atau di https://www.sanity.io/manage).
4. **Salin isi `studio-overlay/` ke `studio/`**, timpa file yang ada (di ZIP v0.8, folder ini bernama `studio-overlay` supaya tidak bentrok dengan scaffold). Dari root repo, PowerShell:
   ```powershell
   Copy-Item -Recurse -Force studio-overlay\* studio\
   Remove-Item -Recurse -Force studio-overlay
   ```
   (macOS/Linux: `cp -R studio-overlay/. studio/ && rm -rf studio-overlay`.) Ini mengganti `studio/sanity.config.ts` dan menambah `structure.ts`, `schemaTypes/`, `seed/`, `README.md`.
5. Di folder `studio/`: salin `.env.example` → `.env`, isi `SANITY_STUDIO_PROJECT_ID=<project id lo>`.
6. Impor konten awal (7 proyek + teks Home/About) **sekali saja**:
   ```bash
   cd studio
   npx sanity dataset import seed/seed.ndjson production --missing
   ```
   `--missing` = tidak menimpa dokumen yang sudah ada, jadi aman kalau tidak sengaja diulang.
7. `npm run dev` (di `studio/`) → buka **http://localhost:3333** → login. Menu kiri: *Pengaturan situs, Halaman Home, Halaman About, Proyek, Layanan, FAQ*.
8. **Latihan end-to-end dengan satu proyek:** buka satu proyek → tab *Media* → unggah 1 gambar → **Publish**.

## Bagian 3 — Sambungkan situs ke Sanity (lokal)

1. Di **root repo** (bukan `studio/`), buat file `.env.local`:
   ```
   SANITY_PROJECT_ID=<project id lo>
   SANITY_DATASET=production
   ```
   (`.env.local` sudah di-`.gitignore`; jangan di-commit.)
2. `npm run dev`. Terminal harus menampilkan `[content] Sanity OK: 7 projects …`. Buka situs: gambar yang lo unggah muncul sebagai sampul proyek itu.
3. File `src/content/snapshot.ts` ikut berubah. **Commit file ini** (ini cadangan konten terbit).
4. Konten hanya diambil **saat server dev/build dimulai**. Setelah edit di Studio: restart `npm run dev`, atau jalankan `node scripts/fetch-content.mjs`.

Selama masih di GitHub Pages (belum pindah): untuk menerbitkan perubahan konten, jalankan langkah 2, commit `snapshot.ts`, lalu push.

## Bagian 4 — Deploy Studio (supaya bisa edit dari mana saja)

```bash
cd studio
npx sanity deploy
```
Pilih nama (mis. `union-studio`) → Studio live di `https://union-studio.sanity.studio`. Undang editor lain lewat https://www.sanity.io/manage → project → Members.

## Bagian 5 — Hosting di Cloudflare Pages

> **Soal "jangan dari GitHub":** GitHub tetap dipakai sebagai **sumber kode** supaya Cloudflare bisa membangun ulang otomatis tiap konten dipublikasikan. Yang di-*host* oleh Cloudflare, bukan GitHub Pages. Kalau lo benar-benar tidak mau Git: ada "Direct Upload", tapi build otomatis dari CMS tidak bisa — lo harus build lokal dan upload manual setiap ada perubahan konten. Tidak disarankan.

1. Buat akun **Cloudflare** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pilih repo ini.
2. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: kosong
3. **Environment variables** (Production):

   | Nama | Nilai | Fungsi |
   |---|---|---|
   | `NODE_VERSION` | `20` | Versi Node untuk build |
   | `VITE_BASE_PATH` | `/` | Situs di root domain (bukan sub-path GitHub Pages) |
   | `SANITY_PROJECT_ID` | project id | Ambil konten |
   | `SANITY_DATASET` | `production` | |
   | `CONTENT_STRICT` | `1` | **Gagalkan build** kalau Sanity tidak terjangkau, daripada menerbitkan konten lama diam-diam |
4. **Save and Deploy** → situs live di `https://<nama>.pages.dev`. (Hash route `#/work` jalan tanpa konfigurasi tambahan.)
5. **Deploy hook:** project → *Settings* → *Builds* → *Deploy hooks* → *Add* (nama `sanity-publish`, branch `main`) → salin URL-nya.
6. **Webhook Sanity:** https://www.sanity.io/manage → project → *API* → *Webhooks* → *Create webhook*:
   - Name: `Rebuild situs` · URL: URL deploy hook · Dataset: `production`
   - Trigger on: *Create, Update, Delete*
   - Filter: `_type in ["project","siteSettings","homePage","aboutPage","service","faq"]`
   - HTTP method: POST · Projection: kosong · Enabled
   > Jika menu webhook tidak tersedia di paket lo, cek dashboard; cadangannya: tekan **Retry deployment** / push commit kosong di Cloudflare setelah mempublikasikan konten.
7. **Uji:** edit satu teks di Studio → Publish → di Cloudflare muncul build baru → 1–3 menit kemudian situs berubah.
8. Setelah Cloudflare beres, **matikan GitHub Pages** (repo → Settings → Pages) dan boleh menonaktifkan `.github/workflows/deploy.yml`.
9. Domain: Pages → *Custom domains* (nanti, saat domain siap). Setelah itu email domain.

---

## Pemakaian sehari-hari

### Menambah proyek
Studio → **Proyek** → **Create** →
1. **Dasar:** judul, slug (otomatis; **jangan diubah setelah terbit**), kategori, status, jenis proyek (isi hanya jika pasti), ringkasan satu kalimat (ID wajib, EN opsional), tahun, platform, alat, peran.
2. **Media:** unggah gambar/video. **Item pertama = sampul** kartu dan bagian atas halaman proyek. Geser untuk mengubah urutan.
3. **Studi kasus** (opsional): tantangan / pendekatan / hasil. Bagian kosong tidak tampil.
4. **Tampilan di situs:** centang *hero* (3 proyek disarankan) dan/atau *Karya pilihan Home* (4), isi *Urutan tampil* (10, 20, 30…).
5. **Publish.** Tunggu 1–3 menit.

### Aturan media
- Gambar: landscape, lebar ≥ 1600 px. Situs meminta ukuran yang sesuai dari CDN Sanity otomatis.
- Video: MP4 (H.264), 10–40 detik, ≤ ~8 MB, wajib ada gambar sampul (poster).
- Video panjang/berat: unggah ke YouTube lalu masukkan sebagai **Tautan** di proyek.

### Menyembunyikan / menghapus
**Unpublish** = hilang dari situs, tetap tersimpan sebagai draft. Cocok untuk proyek yang belum siap.

### Terjemahan
Indonesia wajib. English opsional: kalau kosong, situs menampilkan teks Indonesia.

---

## Hal yang perlu diwaspadai

| Hal | Penjelasan |
|---|---|
| **Dataset publik** | Di paket gratis, semua dokumen yang **dipublikasikan** bisa dibaca siapa pun lewat API. **Jangan** menaruh data rahasia (nama klien yang di bawah NDA, catatan internal, harga). Draft tidak publik. |
| **Tiap Publish = 1 build** | Jatah build gratis Cloudflare terbatas per bulan. Rapikan beberapa edit lalu Publish sekaligus, jangan Publish berkali-kali untuk satu perubahan kecil. |
| **Ubah schema** | Menambah field = aman. Mengganti nama/menghapus field = perlu migrasi data; minta dibantu dulu. |
| **Cadangan** | Dua lapis: `src/content/snapshot.ts` di Git (konten terbit) dan ekspor Sanity (`cd studio && npx sanity dataset export production`) tiap bulan. |
| **Batas gratis berubah** | Cek lagi halaman harga Cloudflare Pages dan Sanity sebelum bergantung pada angka tertentu. |

## Troubleshooting

| Gejala | Penyebab umum |
|---|---|
| Build gagal: `SANITY_PROJECT_ID is not set (CONTENT_STRICT is on)` | Variabel belum diisi di Cloudflare |
| Build gagal: `the dataset has no published projects` | Belum ada proyek yang di-**Publish** (draft tidak dihitung) |
| Perubahan tidak muncul di situs | Belum di-Publish; webhook belum jalan (lihat tab *Deployments* di Cloudflare); atau cache browser |
| Gambar tidak muncul | Gambar belum diunggah/dipublikasikan di proyek itu |
| Warna hex ditolak | Format `#RRGGBB`, contoh `#5f86a8` |
