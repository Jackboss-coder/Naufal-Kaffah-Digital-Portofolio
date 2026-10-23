# Portofolio Naufal Kaffah

Website portofolio satu halaman dengan animasi scroll storytelling (HTML, CSS, JavaScript murni — tanpa framework, tanpa library, tanpa build step).
Bisa dibuka langsung dengan klik dua kali `index.html`, dan siap di-hosting gratis di Cloudflare Pages.

## Struktur folder

```
/index.html            ← seluruh isi halaman (Hero, About, Journey, Skills, Certifications, Contact)
/css/style.css         ← tampilan; warna ada di bagian paling atas (:root)
/js/main.js            ← fitur interaktif (mode gelap, menu HP, filter, modal, animasi scroll, jalur karier)
/js/projects.js        ← DATA PROYEK — file yang diedit untuk menambah karya
/assets/img/           ← foto profil, favicon, gambar Open Graph
/assets/img/projects/  ← gambar proyek
/assets/cv.pdf         ← CV yang diunduh pengunjung
```

## Yang masih perlu Anda isi

Cari teks berikut (Ctrl+F) lalu ganti dengan data asli:

| Placeholder | Lokasi |
|---|---|
| `[YOUR METRIC]` (3×) | `js/projects.js`, kolom `result` |

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
    title: "Sales Performance Dashboard",
    category: "Data & Analysis",                 // "AI & Automation" | "Data & Analysis" | "Content Design"
    image: "assets/img/projects/sales-dashboard.jpg",
    imageAlt: "Dashboard showing monthly sales by region",
    summary: "Two sentences for the card: problem, what you did, result.",
    problem: "The challenge, shown in the modal.",
    approach: [
      "Step one you took.",
      "Step two you took."
    ],
    result: "The outcome, with numbers where possible.",
    tools: ["Google Sheets", "Looker Studio"],
    links: [{ label: "View dashboard", url: "https://..." }]   // opsional, boleh dihapus
  }
```

Tips:
- Gambar proyek: rasio 16:10 (misalnya 1200×750 px), JPG/WebP, di bawah 250 KB. Simpan di `assets/img/projects/`.
  Jika gambar tidak ditemukan, kartu menampilkan ikon placeholder (situs tidak rusak).
- Kategori baru (misalnya `"Business Development"`) otomatis muncul sebagai tombol filter.
- Tulis dalam Bahasa Inggris, pakai kata kerja aktif dan angka hasil bila ada.
- Periksa tanda koma dan tanda kutip. Jika galeri kosong setelah diedit, biasanya ada koma atau kutip yang hilang.

## Menambah sertifikat

Di `index.html`, bagian `CERTIFICATIONS`, salin satu blok `<li class="cert reveal"> ... </li>` lalu ganti judul, penerbit, tanggal, dan nomor sertifikat.

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
