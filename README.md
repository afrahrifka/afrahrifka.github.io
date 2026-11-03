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

- `content.json`: seluruh tulisan portofolio dalam Bahasa Indonesia dan English, deskripsi foto, tautan, serta detail cerita. Admin mengubah isi dari formulir; struktur halaman tetap berada di kode.
- `index.html`: struktur dan tata letak halaman.
- `style.css`: palet warna, tata letak responsif, dan animasi.
- `main.js`: menampilkan isi dari `content.json`, parallax, filter galeri, dan menu ponsel.
- `public/cv.md`: salinan profil panjang. Sinkronkan dengan `cv.md` ketika biodata berubah.
- `public/cv.pdf`: berkas yang diunduh dari tombol CV.
- `public/cv-legal.pdf`: CV legal singkat alternatif. Sumbernya ada di `scripts/build_cv.py`.

Panel admin menyediakan formulir per bagian, pilihan Bahasa Indonesia/English, pencarian isi, penggantian foto, dan unggah CV. Tombol **Simpan** memperbarui `content.json`, membuat commit, lalu menjalankan `push-github.sh`.

Pilihan bahasa Indonesia/English tersedia di header. Bahasa yang dipilih disimpan di browser pengunjung.

Efek parallax dan kelopak otomatis dinonaktifkan ketika pengunjung mengaktifkan preferensi reduced motion. Font menggunakan Google Fonts dengan fallback font sistem.
