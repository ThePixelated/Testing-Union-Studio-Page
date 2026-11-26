# UNION STUDIO — Sanity Studio

Halaman admin konten. Cara pasang dan pakai: **`../docs/cms/setup.md`**. Model konten: **`../docs/cms/content-model.md`**.

Ringkas:
1. Scaffold dulu: `npm create sanity@latest -- --dataset production --template clean --typescript --output-path studio` (dari root repo)
2. Salin isi `studio-overlay/` ke `studio/` (timpa), lalu hapus `studio-overlay/`
3. `cp .env.example .env` lalu isi `SANITY_STUDIO_PROJECT_ID`
4. `npx sanity dataset import seed/seed.ndjson production --missing` (sekali saja)
5. `npm run dev` → http://localhost:3333
