# Works — spec

**URL:** `/work` (sekarang `#/work`) · **Fase:** 1 · **Status spec:** Diputuskan (struktur) · kerangka sudah dibangun

**Tujuan:** menjadi katalog *lengkap* dari semua yang pernah dibuat, dan mengarahkan ke halaman proyek lalu ke inquiry.
**Audiens & niat:** calon klien yang ingin melihat bukti sebelum menghubungi — biasanya setelah melihat 4 proyek di Home.
**Aksi utama:** buka halaman proyek. **Sekunder:** Contact (section di bawah halaman).

## Peran Works vs Home

| | Home (teaser) | Works (katalog) |
|---|---|---|
| Jumlah | 4 proyek terpilih | Semua (saat ini 7) |
| Filter | Tidak | Ya, per kategori |
| Tujuan | Menggoda, membangun minat | Membuktikan, memudahkan membandingkan |
| Urutan | Dipilih pemilik (`featured`) | Urutan di `projects.ts` |

## Section

| # | Section | Isi | Layout | Status |
|---|---|---|---|---|
| 1 | Header | Judul "Proyek yang telah kami buat" + 1 kalimat | Teks besar di latar navy | ada |
| 2 | **Filter** | Semua · AR Pembelajaran · AR untuk Brand · Game. **Hanya kategori yang punya proyek** | Pill | ada |
| 3 | **Grid** | Card: carousel media (≤4), judul, kategori, status | 2 kolom desktop, 1 kolom mobile | ada |
| 4 | Contact | "Punya ide?" | Penuh lebar | ada (section global) |

## Kategori (usulan D12)
| Kategori | Proyek saat ini |
|---|---|
| AR Pembelajaran | Simlab Elektronik, Interaksi Pecahan MTK, Interaksi Peluang MTK, Elektronika Listrik, Dokter Gigi* |
| AR untuk Brand | House Effect (filter TikTok AR) |
| Game | Animal Chase |

\* belum dikonfirmasi (P2).
Kategori mengikuti *apa yang dibeli klien*, bukan teknologi yang dipakai.

## Aturan
- Hanya proyek dengan izin tampil. **Tidak ada kartu "placeholder" yang tersisa saat Fase 1 selesai.**
- Label jujur per proyek: *Portofolio · Prototipe · Dalam pengembangan*; "Proyek klien"/"Proyek mandiri" hanya jika dikonfirmasi (P4).
- Tag industri disimpan sebagai metadata untuk masa depan; belum ditampilkan.
- Belum perlu "featured besar" sampai ada media asli yang kuat.

## State
- Kategori tanpa proyek → tidak muncul sebagai filter
- Loading (setelah CMS) → skeleton card
- Hanya 1–2 proyek → tetap layak; tidak ada slot kosong

## SEO · Bilingual
Title: "Karya — UNION STUDIO". Nama proyek tidak diterjemahkan; ringkasan dan label diterjemahkan.

## Kriteria selesai
≥4 proyek dengan media dan deskripsi asli · filter berfungsi · setiap card membuka halaman proyek · tidak ada teks generik.
