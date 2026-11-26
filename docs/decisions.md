# Decision log

Status: **Diputuskan** (eksplisit dari pemilik proyek atau handoff) · **Diusulkan** (rekomendasi Claude, menunggu konfirmasi) · **Terbuka** (belum dijawab).
Terakhir diperbarui: 14 Nov 2026.

| ID | Keputusan | Status | Catatan |
|---|---|---|---|
| D1 | Tujuan utama situs: **mencari klien freelance** | Diputuskan | Portfolio lamaran kerja dan brand UNION nomor dua |
| D2 | Fokus **Union Studio** dulu; 7 situs lain ditunda | Diputuskan | Nama unit dikonfirmasi: Union Interactive, Union Lab |
| D3 | Stack React + TypeScript + Vite; GitHub Pages sementara → Cloudflare Pages; arah CMS: Sanity | Diputuskan (handoff) | **Waktu** CMS: Diusulkan Fase 3 |
| D4 | Bahasa: Indonesia default, ada Inggris; switch di navbar; deteksi region lewat time zone | Diputuskan | |
| D5 | URL per bahasa: Indonesia di root, Inggris di `/en/…` + `hreflang` | Diusulkan | Dikerjakan di Fase 2a |
| D6 | Palette `#16264D / #FFFFFF / #323232 / #000000`; font semua Alan Sans | Diputuskan | |
| D7 | Nama publik: **hanya "UNION STUDIO"** (tanpa nama pribadi/foto) | Diputuskan | About ditulis dengan suara studio |
| D8 | **Playground dihapus** | Diputuskan | Section dan link navbar sudah dihapus (v0.7) |
| D9 | **Project Radiant tidak dipakai** di situs | Diputuskan | Sudah dihapus dari data (v0.7) |
| D10 | Proyek yang tampil: Dokter Gigi, Simlab Elektronik, Animal Chase, Interaksi Peluang MTK, Interaksi Pecahan MTK, Elektronika Listrik, Filter TikTok AR "House Effect" | Diputuskan | Detail tiap proyek: `content/projects.md` |
| D11 | **Struktur Works:** Home = teaser 4 proyek + "Lihat semua karya"; `/work` = katalog lengkap + filter; `/work/<slug>` = halaman proyek | Diputuskan (14 Nov) | Dibangun v0.7 |
| D12 | Kategori Works: **AR Pembelajaran · AR untuk Brand · Game** | Diusulkan | Filter hanya menampilkan kategori yang punya proyek |
| D13 | Kontak **hanya email** (tanpa WhatsApp); balasan maks. 2 hari kerja | Diputuskan | Sanggup menepati |
| D14 | **Tidak menampilkan harga**; "hubungi untuk diskusi" | Diputuskan | Ukuran proyek tanpa Rupiah boleh dipakai di Services |
| D15 | Domain belum siap; email sementara `unionstudiosinteractive@gmail.com` | Diputuskan | Email domain di Fase 2 |
| D16 | Ukuran sukses: **1 klien/bulan, 4 interaksi/bulan** | Diputuskan | Definisi "interaksi": lihat `roadmap.md` §2 (usulan) |
| D17 | Segmen utama = **pendidikan/EdTech** (sesuai bukti portofolio); brand/agensi kedua; museum & korporat tanpa klaim | Diusulkan | Hero dan Services mengikuti ini |
| D18 | Navbar: Works · About · Contact (+ Network, bahasa, CTA); Services ditambah saat halamannya jadi; Career dan News tidak masuk | Diusulkan | |
| D19 | Animal Chase = halaman proyek biasa sampai dekat rilis | Diusulkan | |
| D20 | Hanya klaim *Verified* / *User-confirmed* yang dipublikasikan | Diputuskan (handoff) | |
| D21 | **CMS (Sanity) dimulai sekarang**, bukan menunggu semua halaman jadi | Diputuskan (24 Nov) | Pemilik yang akan mengisi konten; struktur sudah cukup jelas. Risiko schema berubah dimitigasi: field opsional, fallback ke teks bawaan |
| D22 | Dua bahasa dengan **field-level localization** (`{id, en}` dalam satu dokumen; ID wajib, EN opsional → fallback ke ID) | Diputuskan | Lihat `cms/content-model.md` |
| D23 | Konten diambil **saat build** (snapshot), bukan oleh browser; publish memicu build lewat webhook; snapshot di-commit sebagai cadangan | Diputuskan | Cepat, murah, tidak bergantung pada API saat pengunjung membuka situs |
| D24 | Hosting: **Cloudflare Pages terhubung ke repo GitHub**; GitHub hanya sumber kode; GitHub Pages dimatikan setelahnya | Diputuskan | |
| D25 | Teks antarmuka dan tata letak tetap di kode; yang masuk CMS: proyek, teks Home/About, pengaturan kontak | Diputuskan | |
| D26 | Form kontak: **opsi 3** (email + template pesan) untuk sekarang | Diputuskan (24 Nov) | |
| D27 | Isi deskripsi proyek dan konten lain diisi sendiri oleh pemilik lewat Studio | Diputuskan | Menggantikan lembar `content/projects.md` sebagai tempat isi |

## Pertanyaan terbuka

| ID | Pertanyaan | Mempengaruhi |
|---|---|---|
| P1 | Isi lembar tiap proyek di `content/projects.md` (kategori, klien/mandiri, tahun, peran, alat, ringkasan 1 kalimat, izin) | Works, detail proyek, hero |
| P2 | Dokter Gigi: apakah ini AR untuk pembelajaran (seperti 4 proyek lain), atau kategori lain? | Kategori |
| P3 | Pilih **3 proyek untuk hero** dan **4 untuk teaser Home** (sementara: Simlab Elektronik, Interaksi Pecahan MTK, House Effect di hero; + Animal Chase di teaser) | Home |
| P4 | Setiap proyek: karya **klien** atau **mandiri/kuliah**? Boleh menyebut nama klien/institusi? | Label kejujuran, About |
| P5 | Setuju definisi "interaksi" di `roadmap.md` §2? | KPI |
| ~~P6~~ | ~~Layanan form~~ → diputuskan opsi 3 (D26) | — |

### Penjelasan P6 (dulu Q7): "layanan form"
Situs ini statis (file HTML/JS di Cloudflare), jadi **tidak punya server** yang bisa menerima isi form dan mengirimnya ke email lo. Form berstruktur butuh "penerima". Opsi:
1. **Cloudflare Pages Function** — potongan kode kecil di Cloudflare yang menerima kiriman form lalu meneruskannya ke email. Satu tempat dengan hosting, tapi kita yang menulis dan merawat kodenya (termasuk anti-spam).
2. **Layanan form gratis pihak ketiga** (sejenis Formspree/Web3Forms) — tinggal arahkan form ke alamat layanan mereka, mereka kirim ke email lo. Lebih cepat, tapi data lewat pihak ketiga (harus disebut di Privacy Policy) dan ada batas kiriman gratis yang perlu dicek saat itu.
3. **Tanpa form** — pakai tombol email + template pesan (Fase 1). Cukup untuk target awal 4 interaksi/bulan.

**Saran:** tetap opsi 3 sampai interaksi mulai masuk; putuskan opsi 1 atau 2 di Fase 2 setelah domain dan email siap.
