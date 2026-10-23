# Portofolio Naufal Kaffah

Website portofolio satu halaman bergaya 3D dengan animasi (HTML, CSS, JavaScript murni — tanpa framework, tanpa library, tanpa build step).
Bisa dibuka langsung dengan klik dua kali `index.html`, dan siap di-hosting gratis di Cloudflare Pages.

## Struktur folder

```
/index.html            ← seluruh isi halaman (teks About, Skills, Experience, Certifications, Contact)
/css/style.css         ← tampilan; warna ada di bagian paling atas (:root)
/js/main.js            ← fitur interaktif (mode gelap, menu HP, filter, modal, efek tilt 3D, animasi scroll)
/js/scene3d.js         ← globe jaringan 3D di bagian atas (hero)
/js/projects.js        ← DATA PROYEK — file yang diedit untuk menambah karya
/assets/img/           ← foto profil, favicon, gambar Open Graph
/assets/img/projects/  ← gambar proyek
/assets/cv.pdf         ← CV yang diunduh pengunjung
```

## Yang masih perlu Anda isi

Cari teks berikut (Ctrl+F) lalu ganti dengan data asli:

| Placeholder | Lokasi |
|---|---|
| `[YOUR LINKEDIN]` dan `https://www.linkedin.com/in/[YOUR-LINKEDIN]` | `index.html`, bagian Contact |
| `[YOUR METRIC]` (2×) | `index.html`, poin Marketing Administrator |
| `[YOUR METRIC]` (3×) | `js/projects.js`, kolom `result` |
| `naufal-kaffah.pages.dev` (3×) | `index.html`, bagian `<head>` — ganti jika alamat situs Anda berbeda |

Angka sorotan di bagian About (`5+`, `5`, `5`) diambil dari CV. Angka "Portfolio projects" dihitung otomatis dari jumlah proyek di `projects.js`.

## Mengganti foto profil

Foto saat ini: `assets/img/profile.png` — latar sudah dihapus (transparan), ukuran 480×558 px.
Di situs, bagian bawah foto mengikuti lengkung bola 3D dan kepala sedikit menyembul di atasnya.

Untuk mengganti foto:
1. Siapkan foto setengah badan dengan **latar transparan** (PNG), rasio 480×558 (lebar × tinggi).
   Posisikan rambut ±12% dari atas gambar dan mata ±35% dari atas, supaya kepala menyembul pas di atas bola.
   Penghapus latar gratis: fitur "Remove background" di Canva atau remove.bg.
2. Simpan dengan nama `profile.png` di `assets/img/` (timpa file lama).
3. Jika file dihapus, situs otomatis menampilkan bola monogram "NK".

## Mengganti CV

Ganti file `assets/cv.pdf` dengan CV terbaru Anda. Nama file **harus tetap** `cv.pdf`.
(Saat ini berisi CV hasil konversi dari `Naufal_Kaffah_CV.docx`.)
Nama file saat diunduh pengunjung adalah `Naufal_Kaffah_CV.pdf`; untuk mengubahnya, edit atribut `download="..."` di `index.html` (ada 3 tombol).

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

## Efek 3D & animasi

- **Globe 3D di hero** (`js/scene3d.js`): jaringan titik yang berputar mengelilingi foto, bisa diputar dengan cara di-drag, dan ikut miring mengikuti kursor.
  Label yang mengorbit (Data, AI & Automation, Business Dev, Operations) diatur di `index.html`, pada elemen `<span class="orbit__chip">`.
- **Kartu 3D** (tilt + kilau cahaya mengikuti kursor): elemen apa pun yang diberi atribut `data-tilt` akan ikut miring.
  Tambahkan `data-tilt-max="4"` untuk memperkecil kemiringan. Efek ini hanya aktif di perangkat dengan mouse/trackpad.
- **Cincin tools berputar** di bagian Skills: tambah atau hapus `<li>` di dalam `<ul class="tool-ring__track">`.
- **Animasi masuk saat scroll**: elemen dengan class `reveal` muncul dengan efek 3D. `style="--d:1"` memberi jeda bertahap.
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
   - **Project name**: `naufal-kaffah` → alamat situs menjadi `https://naufal-kaffah.pages.dev`
     (jika nama sudah dipakai orang lain, pilih nama lain dan sesuaikan placeholder di `<head>` `index.html`)
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

- Ganti semua `naufal-kaffah.pages.dev` di `<head>` `index.html` jika alamat Anda berbeda (agar gambar pratinjau tautan muncul saat dibagikan di WhatsApp/LinkedIn).
- Uji pratinjau tautan di <https://www.opengraph.xyz> atau LinkedIn Post Inspector.
- (Opsional) Domain sendiri: di proyek Cloudflare Pages → **Custom domains** → **Set up a custom domain**.
