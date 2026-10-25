# Portofolio Naufal Kaffah

Website portofolio satu halaman dengan animasi scroll storytelling (HTML, CSS, JavaScript murni — tanpa framework, tanpa library, tanpa build step).
Bisa dibuka langsung dengan klik dua kali `index.html`, dan siap di-hosting gratis di Cloudflare Pages.

## Struktur folder

```
/index.html            ← seluruh isi halaman (Hero, About, Journey, Skills, Certifications, Contact)
/css/style.css         ← tampilan; warna ada di bagian paling atas (:root)
/js/main.js            ← fitur interaktif (mode gelap, ganti bahasa, menu HP, filter, modal, animasi scroll, jalur karier)
/js/projects.js        ← DATA PROYEK — file yang diedit untuk menambah karya (teks dalam dua bahasa)
/js/i18n.js            ← terjemahan Bahasa Indonesia untuk teks di index.html dan label tombol
/assets/img/           ← foto profil, favicon, gambar Open Graph
/assets/img/projects/  ← gambar proyek
/assets/cv.pdf         ← CV yang diunduh pengunjung
```

## Alamat situs

Alamat situs: <https://naufal-kaffah-digital-portofolio.nk02.workers.dev> (Cloudflare Workers, deploy otomatis dari branch `main`).
Alamat ini dipakai di 4 tag `<head>` `index.html` (canonical, og:url, og:image, twitter:image); ganti di sana jika alamatnya berubah.

Angka sorotan di bagian About (`5+` tahun, `5` peran, `5` sertifikat) diambil dari CV. Angka "Portfolio projects" dihitung otomatis dari jumlah proyek di `projects.js`.

## Mengganti foto profil

Foto saat ini: `assets/img/profile.png` — latar sudah dihapus (transparan), ukuran 520×792 px.
Di situs, panel biru lebih pendek dari foto, sehingga kepala keluar dari atas panel.

Untuk mengganti foto:
1. Siapkan foto setengah badan dengan **latar transparan** (PNG), rasio 520×792 (lebar × tinggi).
   Rambut sebaiknya ±3% dari atas gambar, dan badan sampai ke tepi bawah.
   Penghapus latar gratis: fitur "Remove background" di Canva atau remove.bg.
2. Simpan dengan nama `profile.png` di `assets/img/` (timpa file lama).
3. Jika file dihapus, panel biru otomatis menampilkan monogram "NK".

## Mengganti CV

Ganti file `assets/cv.pdf` dengan CV terbaru Anda. Nama file **harus tetap** `cv.pdf`.
(Saat ini berisi CV hasil konversi dari `Naufal_Kaffah_CV.docx`.)
Nama file saat diunduh pengunjung adalah `Naufal_Kaffah_CV.pdf`; untuk mengubahnya, edit atribut `download="..."` di `index.html` (ada 4 tombol).

## Menambah proyek baru

Buka `js/projects.js`. Setiap proyek adalah satu blok `{ ... }`. Salin blok terakhir, tempel di bawahnya, beri koma di antara blok, lalu ganti isinya:

```js
  {
    id: "sales-dashboard",                       // unik, tanpa spasi
    title: { en: "Sales Performance Dashboard", id: "Dashboard Kinerja Penjualan" },
    category: "Data & Analysis",                 // "AI & Automation" | "Data & Analysis" | "Content Design" (selalu bahasa Inggris)
    image: "assets/img/projects/sales-dashboard.jpg",
    imageAlt: { en: "Dashboard showing monthly sales by region", id: "Dashboard penjualan bulanan per wilayah" },
    summary: { en: "Two sentences for the card: problem, what you did, result.", id: "Dua kalimat untuk kartu: masalah, yang dilakukan, hasil." },
    problem: { en: "The challenge, shown in the modal.", id: "Tantangannya, tampil di modal." },
    approach: {
      en: ["Step one you took.", "Step two you took."],
      id: ["Langkah pertama.", "Langkah kedua."]
    },
    result: { en: "The outcome, with numbers where possible.", id: "Hasilnya, dengan angka bila ada." },
    tools: ["Google Sheets", "Looker Studio", { en: "Test design", id: "Desain pengujian" }],
    links: [{ label: { en: "View dashboard", id: "Lihat dashboard" }, url: "https://..." }]   // opsional, boleh dihapus
  }
```

Tips:
- Gambar proyek: rasio 16:10 (misalnya 1200×750 px), JPG/WebP, di bawah 250 KB. Simpan di `assets/img/projects/`.
  Jika gambar tidak ditemukan, kartu menampilkan ikon placeholder (situs tidak rusak).
- Kategori baru (misalnya `"Business Development"`) otomatis muncul sebagai tombol filter.
- Tulis versi `en` dan `id`, pakai kata kerja aktif dan angka hasil bila ada. Lihat bagian **Dua bahasa** di bawah.
- Periksa tanda koma dan tanda kutip. Jika galeri kosong setelah diedit, biasanya ada koma atau kutip yang hilang.

## Dua bahasa (English / Indonesia)

Situs tampil dalam bahasa Inggris atau Indonesia. Pengunjung menggantinya lewat tombol **EN / ID** di header (di samping tombol mode gelap), tanpa memuat ulang halaman.

- **Bahasa awal**: pilihan yang tersimpan; jika belum ada, bahasa browser (Indonesia → `id`, Inggris → `en`); selain itu bahasa Inggris.
- **Pilihan diingat** di `localStorage` (kunci `lang`), sama seperti mode gelap (`theme`).
- Atribut `lang` di `<html>`, judul tab, dan meta description ikut berganti.
- Tag Open Graph (`og:*`, pratinjau tautan WhatsApp/LinkedIn) tetap berbahasa Inggris, karena dibaca tanpa JavaScript.
- Teks berbahasa Inggris adalah sumbernya. Bila terjemahan Indonesia suatu teks tidak ada, versi Inggrisnya yang tampil.

### Teks di `index.html`

Teks Inggris ditulis langsung di `index.html`. Elemen yang diterjemahkan punya atribut:
- `data-i18n="kunci"` → isi elemen (boleh berisi `<br>`, `<strong>`, `&amp;`)
- `data-i18n-attr="atribut:kunci"` → isi atribut, mis. `alt:hero.portrait`, `aria-label:nav.label`, `content:meta.description`

Terjemahan Indonesianya ada di `js/i18n.js`, bagian `page.id`, dengan kunci yang sama.

**Menyunting** teks: ubah versi Inggris di `index.html`, lalu versi Indonesia di `js/i18n.js` (cari kuncinya dengan Ctrl+F).

**Menambah** teks baru, contoh:

```html
<p class="lead" data-i18n="contact.note">Usually replies within a day.</p>
```

```js
// js/i18n.js → page.id
"contact.note": "Biasanya membalas dalam sehari.",
```

Teks yang sama di kedua bahasa (nama orang, perusahaan, aplikasi, tanggal seperti "Jul 2026") tidak perlu kunci.

### Label tombol dan modal (`js/main.js`)

Label seperti "Read the story", "The challenge", "What I did", nama kategori filter, dan aria-label tombol ada di `js/i18n.js`, bagian `ui`. Isi `ui.en` dan `ui.id` dengan kunci yang sama.
Kategori baru di `projects.js` cukup diberi label dengan kunci `"cat.<nama kategori>"`, mis. `"cat.Business Development": "Business Development"`.

### Teks kartu proyek (`js/projects.js`)

Setiap kolom teks boleh berupa teks biasa (tampil sama di kedua bahasa) atau `{ en: "...", id: "..." }`.
Untuk daftar langkah (`approach`), isi `en` dan `id` dengan daftar yang urutan dan jumlahnya sama. Contoh lengkap ada di bagian **Menambah proyek baru**.
Ini berlaku juga untuk `galleryTitle`, `title`/`note` grup galeri, `alt` gambar galeri, `label` video, dan tag `tools`.

### Setelah mengubah file

Naikkan penanda versi `?v=...` di `index.html` (CSS dan ketiga file JS) agar pengunjung tidak mendapat campuran file lama dan baru.

## Menambah sertifikat

Di `index.html`, bagian `CERTIFICATIONS`, salin satu blok `<li class="cert reveal"> ... </li>` lalu ganti judul, penerbit, tanggal, dan nomor sertifikat.
Beri kunci `data-i18n` baru (mis. `cert6.title`) dan tambahkan terjemahannya di `js/i18n.js` (lihat **Dua bahasa**).

## Konsep & animasi scroll

Konsep: **"Grow it. Run it. Automate it."** — latar terang, navy sebagai aksen, tipografi raksasa, dan halaman yang bercerita saat di-scroll.

- **Hero**: motto muncul per baris; foto setengah layar dengan kepala keluar dari panel biru. Saat di-scroll, foto dan panel bergeser (parallax).
  Label melayang di sekitar foto diatur di `index.html`, pada elemen `<span class="portrait__tag">`.
- **About**: kalimat besar yang kata-katanya "terisi warna" saat di-scroll. Ubah teksnya langsung di elemen `<p class="statement__text">`.
- **Journey**: jalur karier yang tergambar saat di-scroll; tiap pekerjaan adalah satu `<li class="stop">` di `index.html`.
  Jalur dibuat otomatis mengikuti jumlah perhentian, jadi Anda cukup menambah, menghapus, atau mengubah urutan `<li class="stop">`.
  Class tambahan: `stop--branch` (jalur paralel, mis. kuliah), `stop--now` (pekerjaan sekarang), `stop--next` (ajakan di akhir).
- **Lab**: kartu proyek bertumpuk dari `js/projects.js`; kartu sebelumnya mengecil saat kartu berikutnya menutupinya.
- **Skills**: tiga kata kerja (Grow / Run / Automate) dan teks berjalan yang makin cepat saat di-scroll. Daftar tools teks berjalan ada di `<div class="marquee">`.
- **Animasi masuk saat scroll**: elemen dengan class `reveal`. `style="--d:1"` memberi jeda bertahap.
- Semua animasi otomatis dimatikan bagi pengunjung yang mengaktifkan pengaturan "kurangi gerakan" (reduce motion) di perangkatnya.
- Gambar proyek bawaan berupa ilustrasi isometrik (SVG) di `assets/img/projects/`. Ganti dengan screenshot asli jika sudah ada.

## Mengubah warna

Semua warna ada di awal `css/style.css`:
- `:root { ... }` → mode terang
- `:root[data-theme="dark"] { ... }` → mode gelap

## Melihat situs di komputer

Cukup klik dua kali `index.html`. Situs berjalan tanpa server karena data proyek tidak di-fetch.

---

## Deploy ke Cloudflare Pages (gratis)

Setelah langkah ini selesai, setiap kali Anda `git push`, situs otomatis diperbarui.

### 1. Buat repository di GitHub

1. Masuk ke <https://github.com> (buat akun jika belum punya).
2. Klik tombol **+** di kanan atas → **New repository**.
3. Isi **Repository name**, misalnya `portfolio`.
4. Pilih **Public** (atau Private — Cloudflare Pages mendukung keduanya).
5. **Jangan** centang "Add a README", ".gitignore", atau "license" (repository harus kosong).
6. Klik **Create repository**. Salin URL yang muncul, misalnya `https://github.com/USERNAME/portfolio.git`.

### 2. Hubungkan folder ini ke GitHub

Repository git lokal dan commit awal sudah dibuat. Buka terminal di folder `portfolio`, lalu jalankan
(ganti `USERNAME` dengan username GitHub Anda):

```bash
git remote add origin https://github.com/USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

Saat pertama kali push, Windows akan meminta login GitHub lewat browser. Ikuti saja.

### 3. Hubungkan ke Cloudflare Pages

1. Masuk ke <https://dash.cloudflare.com> (buat akun gratis jika belum punya).
2. Di menu kiri pilih **Workers & Pages** → **Create** → tab **Pages** → **Connect to Git**.
3. Klik **Connect GitHub**, izinkan Cloudflare mengakses repository `portfolio`.
4. Pilih repository `portfolio` → **Begin setup**.
5. Isi pengaturan build:
   - **Project name**: nama proyek menentukan alamat situs
     (situs ini sekarang ada di `https://naufal-kaffah-digital-portofolio.nk02.workers.dev`; jika alamatnya berubah, sesuaikan 4 tag di `<head>` `index.html`)
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: *(kosongkan)*
   - **Build output directory**: `/`
6. Klik **Save and Deploy**. Tunggu sekitar 1 menit sampai muncul tautan `*.pages.dev`.

### 4. Memperbarui situs

Setiap kali Anda mengubah file:

```bash
git add .
git commit -m "Tambah proyek baru"
git push
```

Cloudflare Pages otomatis membangun ulang situs dalam sekitar 1 menit.

### 5. Setelah online

- Pastikan 4 tag alamat di `<head>` `index.html` memakai alamat situs yang aktif (agar gambar pratinjau tautan muncul saat dibagikan di WhatsApp/LinkedIn).
- Uji pratinjau tautan di <https://www.opengraph.xyz> atau LinkedIn Post Inspector.
- (Opsional) Domain sendiri: di proyek Cloudflare Pages → **Custom domains** → **Set up a custom domain**.
