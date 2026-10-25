/*
  TERJEMAHAN — English (sumber) dan Bahasa Indonesia.

  ui   : label yang dibuat oleh js/main.js (tombol, judul bagian modal, filter, aria-label).
         Isi keduanya: en dan id, dengan kunci yang sama.
  page : terjemahan Indonesia untuk teks di index.html.
         Teks Inggrisnya TIDAK ditulis di sini: teks Inggris dibaca langsung dari index.html.
         Setiap elemen yang bisa diterjemahkan punya atribut data-i18n="kunci" (isi elemen)
         atau data-i18n-attr="atribut:kunci" (mis. alt, aria-label, content), dan kunci itu
         dicari di page.id. Kunci yang tidak ada di page.id tetap tampil dalam bahasa Inggris.
         Boleh memakai HTML sederhana (<br>, <strong>, &amp;) seperti di index.html.

  Teks kartu proyek ada di js/projects.js (kolom berbentuk { en: "...", id: "..." }).
*/
window.I18N = {
  ui: {
    en: {
      "lang.switch": "Switch language to Bahasa Indonesia",
      "theme.toDark": "Switch to dark mode",
      "theme.toLight": "Switch to light mode",
      "menu.open": "Open menu",
      "menu.close": "Close menu",
      "filter.all": "All",
      "cat.AI & Automation": "AI & Automation",
      "cat.Data & Analysis": "Data & Analysis",
      "cat.Content Design": "Content Design",
      "card.video": "Video demo",
      "card.more": "Read the story",
      "card.tools": "Tools",
      "img.placeholder": "Project image placeholder",
      "modal.challenge": "The challenge",
      "modal.approach": "What I did",
      "modal.result": "The result",
      "modal.tools": "Tools",
      "modal.gallery": "Made with this pipeline",
      "modal.links": "Links",
      "modal.video": "{title} video",
      "modal.watch": "Video not playing? Watch it on Canva",
      "modal.viewCanva": "View full design on Canva",
      "modal.viewCanvaLabel": "View {title} on Canva (opens in a new tab)"
    },
    id: {
      "lang.switch": "Ganti bahasa ke English",
      "theme.toDark": "Beralih ke mode gelap",
      "theme.toLight": "Beralih ke mode terang",
      "menu.open": "Buka menu",
      "menu.close": "Tutup menu",
      "filter.all": "Semua",
      "cat.AI & Automation": "AI & Otomasi",
      "cat.Data & Analysis": "Data & Analisis",
      "cat.Content Design": "Desain Konten",
      "card.video": "Demo video",
      "card.more": "Baca ceritanya",
      "card.tools": "Alat yang dipakai",
      "img.placeholder": "Gambar proyek tidak tersedia",
      "modal.challenge": "Tantangannya",
      "modal.approach": "Yang saya lakukan",
      "modal.result": "Hasilnya",
      "modal.tools": "Alat yang dipakai",
      "modal.gallery": "Dibuat dengan pipeline ini",
      "modal.links": "Tautan",
      "modal.video": "Video {title}",
      "modal.watch": "Video tidak berputar? Tonton di Canva",
      "modal.viewCanva": "Lihat desain lengkap di Canva",
      "modal.viewCanvaLabel": "Lihat {title} di Canva (terbuka di tab baru)"
    }
  },

  page: {
    id: {
      /* Head */
      "meta.title": "Naufal Kaffah — Business Development & Operasional",
      "meta.description": "Naufal Kaffah — profesional Business Development & Operasional yang berbasis di Cikarang, Indonesia. Kembangkan. Jalankan. Otomatiskan.",

      /* Header */
      "skip": "Langsung ke konten",
      "nav.label": "Utama",
      "nav.brand": "Naufal Kaffah, kembali ke atas",
      "nav.about": "Tentang",
      "nav.journey": "Perjalanan",
      "nav.lab": "Lab",
      "nav.skills": "Keahlian",
      "nav.contact": "Kontak",
      "cv.download": "Unduh CV",

      /* Hero */
      "hero.status": "Terbuka untuk posisi Business Development &amp; staf",
      "motto.1": "Kembangkan.",
      "motto.2": "Jalankan.",
      "motto.3": "Otomatiskan.",
      "hero.role": "Business Development &amp; Operasional",
      "hero.pitch": "Saya menemukan peluang, menjaga operasional tetap berjalan, dan memakai data serta AI untuk mengotomatiskan pekerjaan yang memperlambat tim.",
      "hero.cta": "Lihat perjalanan saya",
      "hero.portrait": "Potret Naufal Kaffah",
      "hero.tag1": "<strong>5+</strong> tahun pengalaman",
      "hero.tag2": "<span class=\"status-dot\"></span> Membangun AI agent",
      "hero.scroll": "Gulir",

      /* About */
      "about.eyebrow": "Tentang",
      "about.text": "Saya Naufal — lulusan Sarjana Manajemen yang empat tahun mengajar, lalu bekerja di bidang sales, quality control, dan business development. Kini saya menangani administrasi marketing di PT Citra Karsa Dinamika dan membangun agent Claude Code yang mengambil alih pekerjaan berulang. Saya mengembangkan bisnis, menjaganya tetap berjalan, dan mengotomatiskan hal yang memperlambatnya.",
      "stats.label": "Sorotan",
      "stats.years": "Tahun pengalaman kerja",
      "stats.roles": "Peran berbeda",
      "stats.projects": "Proyek portofolio",
      "stats.certs": "Sertifikasi",
      "orgs.label": "Tempat saya bekerja &amp; belajar",

      /* Journey */
      "journey.eyebrow": "Perjalanan",
      "journey.title": "Dari ruang kelas<br>ke dunia bisnis.",
      "journey.lead": "Lima peran, satu arah. Setiap perhentian menambah keahlian yang masih saya pakai hingga kini.",
      "j1.logo": "Logo Sari Roti (PT Nippon Indosari Corpindo)",
      "j1.text": "Memenuhi target penjualan harian, menjaga ketersediaan produk di toko ritel, serta berkoordinasi dengan pelanggan dan tim distribusi.",
      "j1.carry": "<span>Bekal yang dibawa</span> Target · Pelanggan · Distribusi",
      "j2.logo1": "Logo Yayasan Al-Azhar",
      "j2.logo2": "Logo Perguruan Al Islamiyah Jakarta",
      "j2.role": "Guru",
      "j2.text": "Merancang materi dan program pembelajaran, menganalisis hasil belajar untuk memperbaiki cara mengajar, serta menyusun laporan administrasi.",
      "j2.carry": "<span>Bekal yang dibawa</span> Menjelaskan · Perencanaan · Pelaporan",
      "j3.logo": "Logo Universitas Terbuka",
      "j3.date": "Agu 2022 – Agu 2026 · Jalur paralel",
      "j3.role": "Sarjana Manajemen",
      "j3.org": "Fakultas Ekonomi dan Bisnis, Universitas Terbuka",
      "j3.text": "Kuliah sambil bekerja. IPK 3,18 / 4,00. Anggota Divisi Medis, Mapala Universitas Terbuka.",
      "j3.carry": "<span>Bekal yang dibawa</span> Manajemen · Akuntansi · Disiplin",
      "j4.logo": "Logo Starion (PT Starion Wooin)",
      "j4.date": "Nov 2025 – Des 2025",
      "j4.text": "Memantau proses produksi dan produk akhir sesuai SOP, mencatat ketidaksesuaian, dan mengoordinasikan tindakan perbaikan.",
      "j4.carry": "<span>Bekal yang dibawa</span> SOP · Inspeksi · Tindak lanjut",
      "j5.logo": "Logo Tempat Belajar",
      "j5.date": "Feb 2026 – Mei 2026",
      "j5.org": "Tempat Belajar · Magang jarak jauh",
      "j5.text": "Meriset peluang pasar, menyusun daftar prospek dan strategi kemitraan, serta menyiapkan presentasi yang persuasif.",
      "j5.carry": "<span>Bekal yang dibawa</span> Riset · Prospecting · Pitching",
      "j6.node": "Kini",
      "j6.logo": "Logo PT Citra Karsa Dinamika",
      "j6.date": "Jul 2026 – Sekarang",
      "j6.p1": "Menginput 200+ data marketing setiap bulan dan membuat dashboard visualisasi data.",
      "j6.p2": "Mengarsipkan dan mengirim dokumen marketing tepat waktu, sehingga setiap berkas mudah dilacak.",
      "j6.p3": "Mengoordinasikan dukungan administrasi untuk tim marketing agar setiap permintaan cepat ditangani.",
      "j6.carry": "<span>Bekal yang dibawa</span> Data · Dokumen · Koordinasi",
      "j7.node": "Lanjut",
      "j7.date": "Perhentian berikutnya",
      "j7.role": "Business Development, di tim Anda.",
      "j7.text": "Membawa semua bekal di atas ke posisi Business Development atau staf, tempat saya bisa mengembangkan bisnis dan menjaganya tetap berjalan.",
      "j7.cta": "Mari berbincang",

      /* Lab */
      "lab.eyebrow": "Lab",
      "lab.title": "AI, data &amp;<br>riset pasar.",
      "lab.lead": "Proyek tempat saya menguji sejauh mana AI dan otomasi bisa membantu pekerjaan bisnis sehari-hari. Pilih kartu untuk membaca cerita lengkapnya.",
      "lab.filters": "Saring proyek berdasarkan kategori",

      /* Skills */
      "skills.eyebrow": "Keahlian",
      "skills.title": "Yang saya kerjakan,<br>dalam tiga kata kerja.",
      "verb1.word": "Kembangkan",
      "verb1.i1": "Riset pasar",
      "verb1.i2": "Pemetaan mitra &amp; prospek",
      "verb1.i3": "Presentasi &amp; proposal",
      "verb1.i4": "Sales &amp; CRM",
      "verb1.i5": "Negosiasi &amp; public speaking",
      "verb2.word": "Jalankan",
      "verb2.sub": "Operasional &amp; Administrasi",
      "verb2.i1": "Input &amp; pengelolaan data",
      "verb2.i2": "Pengarsipan &amp; pengiriman dokumen",
      "verb2.i3": "Koordinasi lintas tim",
      "verb2.i4": "Pelaporan",
      "verb2.i5": "Administrasi inventaris &amp; QC",
      "verb3.word": "Otomatiskan",
      "verb3.sub": "Tools &amp; Teknologi",
      "verb3.i3": "Otomasi alur kerja AI",
      "verb3.i5": "Microsoft Office &amp; visualisasi data",
      "apps.title": "Aplikasi yang saya pakai",
      "apps.office": "Office &amp; produktivitas",
      "apps.design": "Desain &amp; video",
      "apps.ai": "Asisten &amp; agent AI",
      "apps.collab": "Kolaborasi",
      "marquee.research": "Riset Pasar",
      "marquee.dataviz": "Visualisasi Data",
      "marquee.automation": "Otomasi AI",

      /* Certifications */
      "certs.title": "Sertifikasi &amp; pelatihan",
      "cert1.title": "Akuntansi Excel — Nilai A",
      "cert2.title": "Administrasi Gudang &amp; Operasional Inventaris",
      "cert3.title": "Bootcamp Business Development",
      "cert3.date": "Feb–Mei 2026",
      "cert3.id": "Program 8 minggu",
      "cert4.title": "Webinar Public Speaking",
      "cert5.title": "Program Kemahiran Bahasa Inggris — Nilai B",
      "cert5.date": "Okt 2025",
      "cert5.id": "180 sesi",
      "languages": "<strong>Bahasa</strong> Indonesia (bahasa ibu) · Inggris (menengah) · Arab (menengah)",

      /* Contact & footer */
      "contact.eyebrow": "Kontak",
      "contact.title": "Mari tumbuh<br>bersama.",
      "contact.lead": "Terbuka untuk posisi Business Development dan staf.",
      "footer.motto": "Kembangkan. Jalankan. Otomatiskan.",
      "footer.built": "Dibuat dengan Claude Code",
      "modal.close": "Tutup detail proyek"
    }
  }
};
