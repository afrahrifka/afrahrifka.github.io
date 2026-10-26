# Afrah Rifka Afifah — A Quiet Bloom

Portofolio personal bertema sakura dengan Vite, HTML, CSS, dan JavaScript. Konten merujuk pada `cv.md`; foto berasal dari `public/`. Ilustrasi sakura SVG tersimpan lokal di `public/decor/`.

## Menjalankan

```bash
npm install
npm run dev
```

## Build produksi

```bash
npm run build
npm run preview
```

Hasil build berada di `dist/`. Setiap push ke `main` otomatis membangun dan memublikasikan situs melalui GitHub Actions (`.github/workflows/deploy.yml`). Situs tersedia di https://afrahrifka.github.io/.

Kredensial lokal disimpan dalam `secret-github.txt` yang diabaikan Git. Jangan memasukkan token ke kode atau commit.

## Mengubah konten

- `index.html`: biodata, pengalaman, foto, kontak, dan struktur halaman.
- `style.css`: palet warna, tata letak responsif, dan animasi.
- `main.js`: parallax, filter galeri, detail pengalaman, serta menu ponsel.
- `public/cv.md`: salinan profil yang dapat diunduh. Sinkronkan dengan `cv.md` ketika biodata berubah.

Efek parallax dan kelopak otomatis dinonaktifkan ketika pengunjung mengaktifkan preferensi reduced motion. Font menggunakan Google Fonts dengan fallback font sistem.
