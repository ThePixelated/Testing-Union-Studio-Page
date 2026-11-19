# Lembar proyek

Isi lembar ini untuk setiap proyek. **Hanya tulis yang benar dan boleh dipublikasi.** Kosongkan yang belum pasti — halaman proyek otomatis menyembunyikan bagian yang kosong. Boleh juga dijawab langsung di chat dengan Claude; nanti dimasukkan ke `src/data/projects.ts`.

## Template (per proyek)

| Field | Isi |
|---|---|
| Judul tampil | |
| Kategori | AR Pembelajaran / AR untuk Brand / Game |
| Jenis | Proyek **klien** / **mandiri** (termasuk tugas kuliah) |
| Boleh menyebut nama klien/institusi? | Ya (nama: …) / Tidak |
| Tahun | |
| Platform | Android / iOS / WebAR / TikTok / … |
| Alat | (hanya yang benar-benar dipakai) |
| Peran | Apa yang **lo** kerjakan (jangan klaim kerja tim) |
| Ringkasan 1 kalimat (ID + EN) | |
| Tantangan (opsional) | Masalah/tujuan proyek |
| Pendekatan (opsional) | Cara menyelesaikan, keputusan penting |
| Hasil (opsional) | **Hanya yang bisa dibuktikan.** Kalau tidak ada: tulis "yang dipelajari" |
| Tautan (opsional) | Build, video, repo, efek TikTok |
| Media yang tersedia | gambar / video / rekaman layar |
| Izin tampil | Ya / Tidak / Perlu tanya |

## Proyek (yang sudah diketahui)

| Proyek | Kategori | Jenis | Tahun | Peran | Alat | Ringkasan | Media | Izin |
|---|---|---|---|---|---|---|---|---|
| Simlab Elektronik | AR Pembelajaran | ? | ? | ? | ? | ? | ? | ✓ boleh tampil |
| Interaksi Pecahan MTK | AR Pembelajaran | ? | ? | ? | ? | ? | ? | ✓ |
| Interaksi Peluang MTK | AR Pembelajaran | ? | ? | ? | ? | ? | ? | ✓ |
| Elektronika Listrik | AR Pembelajaran | ? | ? | ? | ? | ? | ? | ✓ |
| Dokter Gigi | **? (konfirmasi)** | ? | ? | ? | ? | ? | ? | ✓ |
| House Effect (filter TikTok AR) | AR untuk Brand | Prototipe | ? | ? | ? | ? | ? | ✓ |
| Animal Chase | Game | Mandiri (orisinal), sedang dikembangkan | ? | ? | ? | "Game independen yang sedang dalam pengembangan" | ? | ✓ |

`?` = belum diketahui. Jangan ditebak.

## Cara mengisi `src/data/projects.ts`
Field opsional yang sudah didukung: `summary`, `origin` (`'client'` / `'self-initiated'`), `role`, `year`, `platform`, `tools`, `links`, `story` (`challenge` / `approach` / `result`), dan `slides` (gambar/video). Halaman proyek hanya menampilkan yang ada isinya.
