# Content inventory

Bahan apa yang sudah ada, seberapa kuat buktinya, dan apa yang masih kurang.
Sumber: handoff §10, §18 dan jawaban pemilik proyek (14 Nov 2026). Detail per proyek: `content/projects.md`.

## 1. Aturan klaim (dari handoff §18)

| Kelas | Arti | Boleh dipublikasi? |
|---|---|---|
| **A — Verified** | Ada bukti publik (halaman project, build, dokumen, persetujuan klien) | Ya |
| **B — User-confirmed** | Pemilik proyek bilang benar, belum ada bukti publik | Hati-hati, hanya jika disetujui |
| **C — Planned** | Rencana / aspirasi | Hanya sebagai arah ("sedang dikembangkan"), bukan kemampuan |
| **D — Unknown** | Belum jelas | Jangan |

Dilarang mengarang: nama klien, metrik/hasil, ukuran tim, hasil komersial, stack teknologi project, tanggal rilis, penghargaan, kemitraan.

## 2. Proyek yang boleh tampil (diputuskan)

| Proyek | Kategori (sementara) | Kelas | Yang masih dibutuhkan |
|---|---|---|---|
| Simlab Elektronik | AR Pembelajaran | B | Semua yang ada di `content/projects.md` |
| Interaksi Pecahan MTK | AR Pembelajaran | B | idem |
| Interaksi Peluang MTK | AR Pembelajaran | B | idem |
| Elektronika Listrik | AR Pembelajaran | B | idem |
| Dokter Gigi | AR Pembelajaran *(belum dikonfirmasi)* | B | idem + kategori |
| House Effect — filter TikTok AR | AR untuk Brand | B (prototipe) | idem; tautan efek bila ada; tandai "Prototipe" |
| Animal Chase | Game | C (sedang dikembangkan) | Screenshot/klip, pitch 1 kalimat, platform target |

**Tidak dipakai:** Project Radiant.

Pola yang terlihat: **5 dari 7 proyek adalah AR untuk pembelajaran.** Itu niche yang benar-benar terbukti, dan karena itu segmen utama situs = pendidikan/EdTech (lihat `roadmap.md` §1).

## 3. Bahan pendukung lain

| Bahan | Kelas | Catatan |
|---|---|---|
| Portofolio desain Behance | A | Pilih karya yang relevan; tautan |
| UNIICODE (komunitas game dev, 250+ anggota) | B | Butuh bukti publik sebelum dipakai di About |
| Kolaborasi dengan PT Agate International | B | **Izin menyebut nama** diperlukan; sebelum itu jangan dipublikasi |
| Pengalaman 3+ tahun Unity/C#; bahasa C#, Python, C++ | B | Boleh sebagai pernyataan di About dengan suara studio |
| Email `unionstudiosinteractive@gmail.com` | A | Email domain di Fase 2 |
| Nama pribadi, foto | — | **Tidak dipublikasi** (D7) |

## 4. Yang belum ada (dan menentukan hasil)

| Bahan | Kenapa penting untuk klien | Tindak lanjut |
|---|---|---|
| **Deskripsi dan media asli tiap proyek** | Saat ini semua halaman proyek berisi teks generik "deskripsi menyusul" dan artwork placeholder | Jalur B1, B2 |
| Studi kasus tertulis (masalah → pendekatan → hasil) | Klien mencari pembuktian, bukan galeri | Jalur B3 (2–3 proyek terkuat) |
| Testimoni | Kepercayaan | Tidak ada → jangan dikarang; minta dari klien/dosen/instansi bila ada |
| Cara kerja, proses, kebijakan revisi | Mengurangi rasa takut klien | Jalur B7 |
| Ukuran proyek (tanpa harga) | Menyaring lead | Jalur B7 |

## 5. Kebutuhan aset media

| Aset | Spesifikasi usulan | Dipakai di |
|---|---|---|
| Hero slide | Gambar 16:9 ≥1920 px, atau video 10–20 dtk, loop-able, muted, ≤ ~8 MB (batas file Cloudflare Pages 25 MB) + poster | Hero |
| Card Works | 3–4 gambar rasio 1.45:1 (≈1600×1100) per proyek; video opsional | Home, Works |
| Halaman proyek | Cover 16:8 + galeri 6–10 gambar + video penjelasan | Detail proyek |
| Logo | SVG putih, transparan (sudah: `brand/Web-Home-Logo.svg`) | Header, footer |

**Tip rekaman AR:** untuk proyek AR, bukti terbaik adalah video layar HP yang memperlihatkan objek 3D muncul di dunia nyata dan seseorang berinteraksi dengannya (20–40 detik), plus 3–4 tangkapan layar. Tandai bila bagian dari tugas kuliah/instansi.
