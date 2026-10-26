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

Hasil build berada di `dist/`. Setiap push ke `main` memperbarui GitHub Pages. Workflow build juga menyertakan direktori `public/` di dalam hasil build. Situs tersedia di https://afrahrifka.github.io/.

Untuk mengirim pembaruan dari CLI:

```bash
git add .
git commit -m "Update portfolio website"
git push origin main
```

Periksa status deployment di tab **Actions** repository. Jangan menambahkan token ke perintah Git; gunakan autentikasi GitHub CLI (`gh auth login`) atau SSH.

Kredensial lokal disimpan dalam `secret-github.txt` yang diabaikan Git. Jangan memasukkan token ke kode atau commit.

## Mengubah konten

- `index.html`: biodata, pengalaman, foto, kontak, dan struktur halaman.
- `style.css`: palet warna, tata letak responsif, dan animasi.
- `main.js`: parallax, filter galeri, detail pengalaman, serta menu ponsel.
- `public/cv.md`: salinan profil panjang. Sinkronkan dengan `cv.md` ketika biodata berubah.
- `public/cv.pdf`: berkas yang diunduh dari tombol CV.
- `public/cv-legal.pdf`: CV legal singkat alternatif. Sumbernya ada di `scripts/build_cv.py`.

Pilihan bahasa Indonesia/English tersedia di header. Bahasa yang dipilih disimpan di browser pengunjung.

Efek parallax dan kelopak otomatis dinonaktifkan ketika pengunjung mengaktifkan preferensi reduced motion. Font menggunakan Google Fonts dengan fallback font sistem.
