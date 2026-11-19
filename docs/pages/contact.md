# Contact — spec

**URL:** `/contact` · **Fase:** 1 (sederhana) → 2 (brief form) · **Status spec:** Diusulkan
*Catatan: section Contact juga ada di bagian bawah Home dan About; halaman ini versi lengkapnya.*

**Tujuan:** mengubah minat menjadi percakapan dengan hambatan serendah mungkin — dan mengumpulkan informasi cukup untuk menilai kecocokan.
**Audiens & niat:** calon klien yang siap bertanya.
**Aksi utama:** mengirim pesan.

## Fase 1 — tanpa backend

| # | Section | Isi |
|---|---|---|
| 1 | Header | "Ceritakan proyek Anda" |
| 2 | **Kontak langsung** | Email `unionstudiosinteractive@gmail.com` (**tanpa WhatsApp**, D13) + janji "balasan maksimal 2 hari kerja" |
| 3 | **Panduan isi pesan** | Daftar singkat: tujuan proyek · target pengguna · perangkat (Android/iOS/WebAR) · perkiraan anggaran · tenggat · contoh referensi. Tombol "Salin template pesan" |
| 4 | Yang bisa diharapkan | Langkah setelah pesan masuk: balasan → panggilan singkat → proposal |

## Fase 2 — brief form
Field: nama · email · organisasi · jenis proyek (dropdown sesuai Services) · rentang anggaran (opsi disesuaikan; "belum tahu" selalu ada) · tenggat · deskripsi · **"Dari mana Anda mengenal kami?"** (untuk mengukur sumber).
- Anti-spam (honeypot/Turnstile), pesan sukses jelas, salinan dikirim ke email pengirim
- Opsi layanan: lihat penjelasan P6 di `../decisions.md` — verifikasi batas gratis sebelum memilih
- Data minimal dikumpulkan; tautan ke Privacy

## State
Berhasil · gagal (tampilkan email langsung sebagai cadangan) · sedang mengirim.

## Bilingual
Dua versi template pesan (ID/EN).

## Kriteria selesai
Fase 1: tombol email dan template pesan teruji dari mobile dan desktop. Fase 2: form terkirim ke inbox, atribusi sumber tercatat.
