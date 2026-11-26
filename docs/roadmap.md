# UNION STUDIO — Roadmap (Fase 0)

> **Status:** DRAFT untuk disetujui · diperbarui 14 Nov 2026
> **Fungsi dokumen:** menjawab tiga pertanyaan yang selama ini belum terjawab — *situs ini untuk apa, scope-nya sampai mana, dan kapan dianggap selesai.*
> Keputusan terkait ada di `decisions.md`, bahan konten di `content-inventory.md`, spec tiap halaman di `pages/`.

---

## 1. Tujuan

**Tujuan utama (diputuskan):** mendapatkan **klien freelance** untuk pengembangan AR, aplikasi Unity, dan pengalaman interaktif.

Tujuan lain (portfolio untuk lamaran kerja, kredibilitas brand UNION) **tidak boleh mengorbankan tujuan utama**. Kalau ada konflik, klien menang.

Uji setiap halaman, fitur, dan efek dengan satu pertanyaan:
> *Apakah ini membantu calon klien memutuskan untuk menghubungi kita?*
Kalau tidak, ditunda.

### Siapa pengunjung yang kita incar
Disusun menurut **bukti yang benar-benar ada di portofolio** (bukan sekadar segmen yang menarik di atas kertas):

| Segmen | Bukti di portofolio | Prioritas |
|---|---|---|
| Sekolah, kampus, tim e-learning, startup EdTech | 5 proyek AR pembelajaran: Simlab Elektronik, Interaksi Pecahan MTK, Interaksi Peluang MTK, Elektronika Listrik, Dokter Gigi* | **Utama** |
| Brand & agensi (kampanye AR / media sosial) | 1 prototipe filter TikTok AR (House Effect) | Kedua |
| Museum / wisata, pelatihan korporat | Belum ada | Terbuka, **tanpa klaim** di situs |

\* Kategori Dokter Gigi sementara; belum dikonfirmasi (lihat `content/projects.md`).

Mayoritas berbahasa Indonesia → **Indonesia dulu, Inggris untuk marketplace dan klien luar negeri.**

### Ujian 30 detik
Pengunjung datang dari email outreach, profil marketplace, atau LinkedIn. Dalam 30 detik ia harus bisa menjawab:
1. Apa yang studio ini kerjakan?
2. Untuk siapa?
3. Apa buktinya (bukan klaim)?
4. Bagaimana cara memulai?

Kalau salah satu tidak terjawab, situsnya belum selesai — seberapa bagus pun animasinya.

---

## 2. Ukuran sukses (diputuskan, 14 Nov 2026)

| Jenis | Ukuran | Target |
|---|---|---|
| Aktivitas | Outreach terkirim per minggu | 10–20 (dari catatan akuisisi) |
| Hasil utama | **Interaksi** dengan calon klien per bulan | **4 per bulan** |
| Hasil akhir | **Klien** (proyek berbayar, atau proyek studi kasus/diskon yang disepakati) per bulan | **1 per bulan** |

**Definisi "interaksi" (usulan — konfirmasi):** percakapan dua arah dengan calon klien, yaitu inquiry yang masuk atau balasan outreach yang berlanjut menjadi diskusi. Satu orang dihitung sekali per bulan.

- **Pelacakan:** kolom "Dari mana Anda mengenal kami?" di form (Fase 2), parameter UTM di link outreach (`?utm_source=email-kampus`), analytics yang ramah privasi.
- **Tinjauan akhir tiap bulan:**
  - Interaksi <4 padahal outreach sudah 40+ → masalahnya di **pesan/penawaran outreach atau bukti di situs**.
  - Interaksi ≥4 tapi klien 0 selama 2–3 bulan → masalahnya di **proposal, konversi diskusi → kesepakatan**, bukan di situs.
- Target ini berlaku **setelah** situs dan outreach berjalan; selama Fase 1, ukuran yang dipakai adalah checklist "Fase 1 selesai".

---

## 3. Scope

**Masuk (Fase 1, situs Union Studio):**
Home · Services · Works + Project detail · About · Contact (email saja) · Privacy · 404 · dua bahasa (ID/EN)

**Keluar (sengaja ditunda):**

| Ditunda | Alasan |
|---|---|
| 7 situs UNION lainnya (Union, Interactive, Foundation, Atelier, Media Works, Lab, Academia) | Fokus Studio dulu. Unit yang belum beroperasi tetap "Soon" (aturan klaim jujur, handoff §2.3) |
| Careers | Studio solo, tidak merekrut. Handoff melarang mengklaim karyawan/tim |
| News / Devlog | Halaman basi merusak kredibilitas. Dibuka saat ada komitmen posting |
| CMS (Sanity) | Masuk Fase 3, setelah konten dan content model stabil |
| E-commerce, akun pengguna, sistem booking | Tidak membantu tujuan utama |
| Playground (demo interaktif di Home) | Dihapus atas keputusan pemilik proyek (14 Nov 2026); bukti kemampuan sekarang = proyek AR di Works |
| WhatsApp, harga di situs | Keputusan pemilik: kontak lewat email; harga "hubungi untuk diskusi" |
| Halaman per-industri (mis. `/ar-untuk-museum`) | Bagus untuk SEO, tapi butuh studi kasus dulu. Kandidat Fase 4 |

---

## 4. Fase

| Fase | Isi | Status |
|---|---|---|
| **0** | Arah, scope, spec halaman | **sedang dikerjakan** (dokumen ini) |
| **1** | Prototype → siap tampil | berjalan; shell dan hero selesai |
| **2** | Deploy + infrastruktur (Cloudflare, domain, email, URL asli, SEO, form) | belum mulai |
| **3** | CMS (Sanity) | **dimulai lebih awal (v0.8)**: skema, Studio, pipeline build selesai; menunggu akun Sanity dan pengisian konten oleh pemilik |
| **4** | Launch + iterasi berdasarkan angka | belum mulai |
| **5** | Ekosistem UNION (paket bersama, guideline, situs lain) | belum mulai |

### Fase 1 — tiga jalur paralel

**Jalur A — Struktur & kode** (Claude + lo)

| # | Tugas | Ukuran* |
|---|---|---|
| A1 | Spec halaman disetujui (`pages/`) | S |
| A2 | Home: susun ulang urutan section, tambah "Untuk siapa", "Cara kerja", FAQ | M |
| A3 | Halaman Services | M |
| A4 | Halaman Works + filter + template Project detail | L |
| A5 | Halaman Contact (email + template pesan) | S |
| A6 | Halaman Privacy + 404 | S |
| A7 | About dengan konten asli | S |
| A8 | QA: mobile, keyboard, kontras, performa, ID/EN lengkap | M |

**Jalur B — Konten** (lo; Claude membantu menulis) — **ini jalur kritis**

| # | Tugas | Ukuran* |
|---|---|---|
| B1 | Lengkapi lembar tiap proyek di `content/projects.md` (7 proyek): kategori, klien atau mandiri, tahun, peran, alat, satu kalimat ringkasan, izin tampil | M |
| B2 | **Media per proyek**: 3–6 gambar + 1 video 20–40 detik (rekaman layar/AR yang sedang dipakai) | L |
| B3 | **Studi kasus tertulis** (masalah → pendekatan → hasil, hanya yang benar) untuk 2–3 proyek terkuat | M |
| B4 | Pilih 3 proyek untuk hero carousel dan 4 untuk teaser Home | S |
| B5 | Teks studio (tanpa nama pribadi/foto): cerita singkat, cara kerja | S |
| B6 | Copy final ID + EN per halaman | M |
| B7 | FAQ, "Cara kerja", ukuran proyek tanpa harga ("hubungi untuk diskusi") | M |

**Jalur C — Go-to-market ringan** (jalan **sekarang**, tidak menunggu situs)

| # | Tugas | Ukuran* |
|---|---|---|
| C1 | Profil Sribulancer / Projects.co.id / Upwork / LinkedIn dengan positioning yang sama | M |
| C2 | Daftar 30 target (per segmen) | M |
| C3 | Template email outreach ID/EN, menaut ke Behance/itch.io dulu, ke situs nanti | S |

\* S ≈ ≤½ hari · M ≈ 1–2 hari · L ≈ 3+ hari kerja fokus. Estimasi kasar; sesuaikan dengan jam kerja per minggu.

> **Catatan:** situs **bukan prasyarat** untuk mulai mencari klien. Behance dan itch.io sudah bisa dipakai hari ini. Jalur C jalan duluan; situs memperkuatnya, bukan menggantikannya.

**Progres Jalur A (per v0.7):** selesai: shell (header, Network, bahasa), hero, kartu carousel, halaman About (kerangka), **Works + Project detail (kerangka)**, dua bahasa. Belum: A2 Home restructure, A3 Services, A5 Contact, A6 Privacy dan 404, A7 isi About, A8 QA.

### Urutan yang disarankan (2 minggu pertama)
1. **Hari 1–2:** jawab pertanyaan terbuka di `decisions.md` (terutama lembar proyek B1).
2. **Mulai B2 (kumpulkan media)** untuk 3 proyek terkuat dulu — jalur terpanjang, menentukan jadwal.
3. Paralel: C1–C3 (mulai outreach dengan Behance), lalu A2/A5/A6 (kode kecil).
4. **Setelah spec disetujui, kerjakan Fase 2a** (Cloudflare Pages + URL asli) *sebelum* A3, supaya Services langsung dibangun di URL final.

### Definisi "Fase 1 selesai"
- [ ] Semua halaman Fase 1 ada dan berisi konten asli — tidak ada teks "Replace this copy" atau placeholder
- [ ] Minimal **4 proyek dengan media asli** dan deskripsi yang ditulis pemilik (bukan teks generik "deskripsi menyusul"), dan **2 studi kasus tertulis**
- [ ] Ujian 30 detik: dari 5 orang non-teknis, ≥4 menjawab benar ketiga pertanyaan pertama (apa, untuk siapa, bagaimana mulai)
- [ ] Jalur kontak bekerja ujung ke ujung (tombol email dan template pesan teruji)
- [ ] ID dan EN lengkap di semua halaman
- [ ] Lolos tes keyboard dan `prefers-reduced-motion`; layar 360 px aman
- [ ] Performa mobile baik (Lighthouse ≥90 untuk performance dan accessibility)
- [ ] Semua klaim di situs terklasifikasi *Verified* atau *User-confirmed* (`content-inventory.md`)

---

## 5. Fase berikutnya (ringkas)

| Fase | Tujuan | Selesai kalau | Kendala utama |
|---|---|---|---|
| **2** Deploy | Situs di alamat sungguhan, dasar teknis benar | Live di domain sendiri; push → deploy otomatis; email domain jalan; form kontak (Fase 2) hidup; sitemap + meta dasar | Domain belum diputuskan; batas Cloudflare Pages gratis (file 25 MB — video besar harus dikompres/di luar Pages); hash route → URL asli; SEO untuk SPA (prerender) |
| **3** CMS | Update konten tanpa menyentuh kode | Tambah project dua bahasa lewat Studio, live dalam menit | Content model baru stabil setelah Fase 1; lokalisasi; preview draft; tiap publish = 1 build |
| **4** Launch | Pakai situs untuk benar-benar mencari klien | Angka di §2 mulai terukur; ada 1 studi kasus tambahan | Konsistensi outreach; waktu |
| **5** Ekosistem | Situs UNION lain dengan upaya jauh lebih kecil | Paket bersama + guideline UNION diekstrak dari Studio; Union hub live | Jangan membangun situs untuk unit yang belum ada |

**CMS:** keputusan arah = Sanity (handoff). Saat masuk Fase 3, syarat mulai: content model stabil lewat konten asli, ada konten yang sering berubah, dan butuh update tanpa deploy ulang. Alternatif yang dipertimbangkan: tetap data file di repo, CMS berbasis Git (Keystatic/Decap).

---

## 6. Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Proyek AR melibatkan pihak lain (klien/instansi/dosen) → izin dan atribusi | Reputasi, hubungan | Catat status "klien atau mandiri" dan izin tampil per proyek (`content/projects.md`); jangan sebut nama pihak lain tanpa izin |
| Bukti terbatas pada satu niche (AR pembelajaran) | Sulit menarik segmen lain | Fokus niche itu dulu; segmen lain "terbuka" tanpa klaim |
| Scope creep (efek/halaman baru terus) | Tidak pernah selesai | Setiap tambahan harus lulus uji §1 dan masuk `decisions.md` |
| Copy dua bahasa = kerja dobel | Terlambat | Tulis ID dulu, EN menyusul; Claude membantu draf |
| Waktu terbagi (kuliah, lamaran kerja, situs) | Fase molor | Jalur C tetap jalan walau situs tertunda; kerjakan jalur B sebelum polish kode |
| Gmail sebagai email bisnis | Kurang kredibel di mata korporat | Email domain di Fase 2 |
| Status masih individu/freelancer | Klaim berlebihan = risiko reputasi/hukum | Aturan klaim (`content-inventory.md` §1); bahasa jujur: "studio independen" |
| Batas layanan gratis berubah | Biaya tak terduga | Cek ulang sebelum Fase 2 dan 3 |
| Penawaran (bukan situs) yang lemah | Situs bagus, tidak ada inquiry | Tinjauan 2 mingguan (§2) memisahkan masalah penawaran vs situs |
