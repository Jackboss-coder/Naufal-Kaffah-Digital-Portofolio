/*
  DATA PROYEK — satu-satunya file yang perlu diedit untuk menambah karya.

  Cara menambah proyek: salin satu blok { ... } di bawah, tempel di akhir daftar
  (jangan lupa koma pemisah), lalu ganti isinya. Kolom:

    id        : kode unik tanpa spasi, mis. "sales-dashboard"
    title     : judul proyek
    category  : salah satu dari "AI & Automation", "Data & Analysis", "Content Design"
                (kategori baru otomatis muncul sebagai tombol filter; tulis dalam bahasa Inggris,
                terjemahan labelnya ada di js/i18n.js dengan kunci "cat.<nama kategori>")
    image     : path gambar, mis. "assets/img/projects/sales-dashboard.jpg" (rasio 16:10)
    imageAlt  : deskripsi singkat gambar untuk aksesibilitas
    summary   : 2 kalimat untuk kartu (masalah → yang dilakukan → hasil)
    problem   : paragraf "The challenge" di modal
    approach  : daftar langkah "What I did" di modal
    result    : paragraf "The result" di modal
    tools     : daftar tag tools
    links     : (opsional) daftar tautan, mis. [{ label: "View design", url: "https://..." }]
    video     : (opsional) video di modal, mis. { src: "assets/video/x.mp4", poster: "assets/video/x.jpg", label: "...", url: "tautan cadangan (opsional)" }
                MP4, idealnya < 5 MB. Video diputar otomatis tanpa suara saat modal dibuka.
    gallery   : (opsional) contoh hasil kerja di modal, dikelompokkan:
                [{ title: "Judul", note: "keterangan", url: "tautan lihat (opsional)", images: [{ src: "assets/img/...", alt: "..." }] }]
                Untuk Canva, pakai tautan yang berakhiran /view dan pastikan Share → "Anyone with the link" = "Can view".
                Tambahkan wide: true pada grup agar gambar tampil selebar modal, satu per baris (untuk tabel/bukti yang perlu dibaca).
    galleryTitle : (opsional) judul bagian galeri di modal; bawaan "Made with this pipeline"

  DUA BAHASA: setiap teks yang tampil boleh ditulis sebagai teks biasa (tampil sama di kedua bahasa)
  atau sebagai { en: "English", id: "Indonesia" }. Untuk daftar (approach), isi en dan id dengan
  daftar yang urutannya sama: { en: ["...", "..."], id: ["...", "..."] }.
  Jika id kosong, versi Inggris yang tampil.
*/
window.PROJECTS = [
  {
    id: "ai-accounting-agents",
    title: { en: "AI Accounting Agent System", id: "Sistem Agent Akuntansi AI" },
    category: "AI & Automation",
    image: "assets/img/projects/accounting/test-cover.png?v=2",
    imageAlt: {
      en: "Stress-test results: 36 of 36 journal entries match the answer key, 9 of 9 planted faulty transactions caught, Rp 0 difference in the financial statements",
      id: "Hasil uji tekanan: 36 dari 36 jurnal cocok dengan kunci jawaban, 9 dari 9 transaksi keliru yang sengaja disisipkan tertangkap, selisih Rp 0 pada laporan keuangan"
    },
    summary: {
      en: "Five Claude Code subagents that run bookkeeping from journal to financial statements. Tested on a fictional company: every figure matched an independent answer key, and 9 of 9 faulty transactions were caught.",
      id: "Lima subagent Claude Code yang menjalankan pembukuan dari jurnal sampai laporan keuangan. Diuji pada perusahaan fiktif: setiap angka cocok dengan kunci jawaban independen, dan 9 dari 9 transaksi keliru berhasil ditangkap."
    },
    problem: {
      en: "Recording transactions, posting to the ledger, making adjustments and preparing reports by hand takes hours each period, and a single mistyped cell can silently break the statements. An AI bookkeeper is only useful if it can be proven right — and if it refuses bad data instead of guessing.",
      id: "Mencatat transaksi, memposting ke buku besar, membuat penyesuaian, dan menyusun laporan secara manual memakan waktu berjam-jam setiap periode, dan satu sel yang salah ketik bisa diam-diam merusak laporan. Pembukuan berbasis AI hanya berguna jika kebenarannya bisa dibuktikan — dan jika ia menolak data yang salah alih-alih menebak."
    },
    approach: {
      en: [
        "Designed a clear division of work: people enter and verify source data, agents journalize, post and report.",
        "Built five specialised subagents — journal, ledger, adjustments, validation and reporting — each with its own rules and responsibilities.",
        "Set up a two-workbook contract: a 19-sheet input workbook that agents may only read, and a 10-sheet book workbook that only agents write.",
        "Added a validation step and automatic backups so every run can be checked and rolled back.",
        "Stress-tested the system with one month of a fictional coffee distributor (PKP, SAK EP): 42 source transactions, 9 of them deliberately wrong, plus month-end close and controller approval of adjusting entries.",
        "Wrote an independent answer key by hand and an automated comparison script, then sabotaged the books on purpose to test the validator."
      ],
      id: [
        "Merancang pembagian kerja yang jelas: manusia menginput dan memverifikasi data sumber, agent membuat jurnal, memposting, dan menyusun laporan.",
        "Membangun lima subagent khusus — jurnal, buku besar, penyesuaian, validasi, dan pelaporan — masing-masing dengan aturan dan tanggung jawabnya sendiri.",
        "Menetapkan kontrak dua workbook: workbook input 19 sheet yang hanya boleh dibaca agent, dan workbook pembukuan 10 sheet yang hanya ditulis oleh agent.",
        "Menambahkan tahap validasi dan backup otomatis agar setiap proses bisa diperiksa dan dikembalikan.",
        "Menguji sistem dengan data satu bulan sebuah distributor kopi fiktif (PKP, SAK EP): 42 transaksi sumber, 9 di antaranya sengaja dibuat salah, ditambah tutup buku akhir bulan dan persetujuan controller atas jurnal penyesuaian.",
        "Menyusun kunci jawaban independen secara manual dan skrip pembanding otomatis, lalu sengaja menyabotase pembukuan untuk menguji validator."
      ]
    },
    result: {
      en: "36 of 36 journal entries, the trial balance (39 accounts), payables and receivables sub-ledgers and all four financial statements matched the answer key to the last rupiah, and 9 of 9 faulty transactions were rejected with the correct error code. The agents never modified the human input file. Testing also exposed 6 weaknesses — the most serious, a validator that missed a tampered adjusting entry — which I fixed and re-verified.",
      id: "36 dari 36 jurnal, neraca saldo (39 akun), buku pembantu utang dan piutang, serta keempat laporan keuangan cocok dengan kunci jawaban hingga rupiah terakhir, dan 9 dari 9 transaksi keliru ditolak dengan kode error yang tepat. Agent tidak pernah mengubah file input milik manusia. Pengujian juga menemukan 6 kelemahan — yang paling serius, validator yang meloloskan jurnal penyesuaian yang telah dimanipulasi — yang sudah saya perbaiki dan verifikasi ulang."
    },
    tools: ["Claude Code", "Subagents", "Python", "Excel", { en: "Test design", id: "Desain pengujian" }],
    galleryTitle: { en: "Test evidence", id: "Bukti pengujian" },
    gallery: [
      {
        title: { en: "Fictional-company stress test, October 2026", id: "Uji tekanan perusahaan fiktif, Oktober 2026" },
        note: { en: "rendered from the agents' own output files", id: "dibuat dari file output agent itu sendiri" },
        wide: true,
        images: [
          {
            src: "assets/img/projects/accounting/test-exceptions.png",
            alt: {
              en: "Table of 9 deliberately faulty transactions, each rejected by the agents with an error code such as ARI-01, REF-03 and DUP-01",
              id: "Tabel 9 transaksi yang sengaja dibuat keliru, masing-masing ditolak agent dengan kode error seperti ARI-01, REF-03, dan DUP-01"
            }
          },
          {
            src: "assets/img/projects/accounting/test-statements.png",
            alt: {
              en: "Income statement and balance sheet produced by the agents: net revenue 132,000,000, net profit 23,022,500, total assets 800,805,000, balance check 0",
              id: "Laporan laba rugi dan neraca yang dihasilkan agent: pendapatan bersih 132.000.000, laba bersih 23.022.500, total aset 800.805.000, cek keseimbangan 0"
            }
          },
          {
            src: "assets/img/projects/accounting/test-verification.png",
            alt: {
              en: "Verification checklist: 7 of 7 comparisons against an independent answer key passed, plus a validator sabotage test before and after the fix",
              id: "Daftar verifikasi: 7 dari 7 perbandingan dengan kunci jawaban independen lolos, ditambah uji sabotase validator sebelum dan sesudah perbaikan"
            }
          }
        ]
      }
    ]
  },
  {
    id: "canva-content-agents",
    title: { en: "Canva Content Agents", id: "Agent Konten Canva" },
    category: "AI & Automation",
    image: "assets/img/projects/canva-content-agents.jpg",
    imageAlt: {
      en: "Covers of three Instagram carousels made with the pipeline: workplace safety, IHSG market update and AI careers",
      id: "Sampul tiga carousel Instagram yang dibuat dengan pipeline ini: keselamatan kerja, update pasar IHSG, dan karier di bidang AI"
    },
    summary: {
      en: "Producing social media content consistently takes planning, writing, design and review. I set up a pipeline of Claude Code subagents connected to Canva, so every post moves from idea to reviewed design in one flow.",
      id: "Memproduksi konten media sosial secara konsisten butuh perencanaan, penulisan, desain, dan review. Saya membangun pipeline subagent Claude Code yang terhubung ke Canva, sehingga setiap postingan bergerak dari ide hingga desain yang sudah direview dalam satu alur."
    },
    problem: {
      en: "Content quality and brand consistency dropped whenever ideas, copy and design were handled ad hoc, and there was no fixed check before a post went out.",
      id: "Kualitas konten dan konsistensi brand menurun setiap kali ide, copy, dan desain dikerjakan seadanya, dan tidak ada pemeriksaan baku sebelum postingan terbit."
    },
    approach: {
      en: [
        "Split the work into four subagents: content planner, copywriter, Canva editor and Canva reviewer.",
        "Connected the editor to Canva so approved copy is applied to designs without rewriting it.",
        "Wrote a shared style guide so layout, fonts and colours stay consistent across posts.",
        "Made review mandatory: the reviewer checks data accuracy, copy match, brand and layout before handover."
      ],
      id: [
        "Membagi pekerjaan ke empat subagent: content planner, copywriter, Canva editor, dan Canva reviewer.",
        "Menghubungkan editor ke Canva agar copy yang sudah disetujui diterapkan ke desain tanpa ditulis ulang.",
        "Menyusun panduan gaya bersama agar layout, font, dan warna tetap konsisten di setiap postingan.",
        "Mewajibkan review: reviewer memeriksa akurasi data, kesesuaian copy, brand, dan layout sebelum diserahkan."
      ]
    },
    result: {
      en: "A consistent, repeatable content workflow with a built-in quality gate before anything is published.",
      id: "Alur kerja konten yang konsisten dan bisa diulang, dengan gerbang kualitas bawaan sebelum apa pun dipublikasikan."
    },
    tools: ["Claude Code", "Canva", "Canva MCP", { en: "Prompt design", id: "Desain prompt" }],
    gallery: [
      {
        title: { en: "Workplace safety series — PT Citra Karsa Dinamika", id: "Seri keselamatan kerja — PT Citra Karsa Dinamika" },
        note: { en: "18-slide company content", id: "konten perusahaan, 18 slide" },
        url: "https://www.canva.com/design/DAHWeCl7ylI/xJgXg8E6N-heTmBC8rt4CQ/view",
        images: [
          { src: "assets/img/projects/canva/ckd-safety-1.jpg", alt: { en: "Cover slide: Safety starts with your physical condition", id: "Slide sampul: Keselamatan dimulai dari kondisi fisikmu" } },
          { src: "assets/img/projects/canva/ckd-safety-2.jpg", alt: { en: "Safety series slide 2", id: "Slide 2 seri keselamatan" } },
          { src: "assets/img/projects/canva/ckd-safety-3.jpg", alt: { en: "Safety series slide 3", id: "Slide 3 seri keselamatan" } }
        ]
      },
      {
        title: { en: "IHSG market update carousel", id: "Carousel update pasar IHSG" },
        note: { en: "6 slides, session I recap", id: "6 slide, rangkuman sesi I" },
        url: "https://www.canva.com/design/DAHYuPyWiOo/AoABMje2zuBusgjedrSrhg/view",
        images: [
          { src: "assets/img/projects/canva/ihsg-carousel-1.jpg", alt: { en: "Cover slide: IHSG falls in the morning, turns green by midday", id: "Slide sampul: IHSG turun di pagi hari, berbalik hijau menjelang siang" } },
          { src: "assets/img/projects/canva/ihsg-carousel-2.jpg", alt: { en: "IHSG carousel slide 2", id: "Slide 2 carousel IHSG" } },
          { src: "assets/img/projects/canva/ihsg-carousel-3.jpg", alt: { en: "IHSG carousel slide 3", id: "Slide 3 carousel IHSG" } }
        ]
      },
      {
        title: { en: "AI & robotics education carousel", id: "Carousel edukasi AI & robotika" },
        note: { en: "5 square slides", id: "5 slide persegi" },
        url: "https://www.canva.com/design/DAHX8jn-vK8/uvqbT2pOo86Oo3IcHNqxhA/view",
        images: [
          { src: "assets/img/projects/canva/ai-robotics-1.jpg", alt: { en: "Cover slide: What to learn for the next five years in AI and robotics", id: "Slide sampul: Apa yang perlu dipelajari untuk lima tahun ke depan di bidang AI dan robotika" } },
          { src: "assets/img/projects/canva/ai-robotics-2.jpg", alt: { en: "AI and robotics carousel slide 2", id: "Slide 2 carousel AI dan robotika" } },
          { src: "assets/img/projects/canva/ai-robotics-3.jpg", alt: { en: "AI and robotics carousel slide 3", id: "Slide 3 carousel AI dan robotika" } }
        ]
      }
    ]
  },
  {
    id: "ai-agent-office",
    title: { en: "AI Agent Office Visualization", id: "Visualisasi Kantor AI Agent" },
    category: "AI & Automation",
    image: "assets/img/projects/ai-agent-office.jpg",
    imageAlt: {
      en: "3D yacht scene where labelled AI subagents work, rest and fish on deck, with an activity log beside it",
      id: "Adegan kapal pesiar 3D tempat subagent AI berlabel bekerja, beristirahat, dan memancing di dek, dengan log aktivitas di sampingnya"
    },
    video: {
      src: "assets/video/ai-agent-office.mp4",
      poster: "assets/video/ai-agent-office-poster.jpg",
      label: { en: "Screen recording of the visualization running in demo mode", id: "Rekaman layar visualisasi yang berjalan dalam mode demo" },
      url: "https://www.canva.com/design/DAHY5S9mF4s/xfzfJbRMrVx1E3NxDQkUtg/view"
    },
    summary: {
      en: "It is hard to see what AI subagents are doing while they work. I built a real-time isometric visualization where each subagent walks to its desk and starts typing the moment it receives a task.",
      id: "Sulit melihat apa yang dikerjakan subagent AI saat mereka bekerja. Saya membangun visualisasi isometrik real-time: setiap subagent berjalan ke mejanya dan mulai mengetik begitu menerima tugas."
    },
    problem: {
      en: "Multi-agent work in Claude Code happens out of sight in the terminal, which makes it difficult to explain to others how the agents divide and hand over tasks.",
      id: "Kerja multi-agent di Claude Code berlangsung tak terlihat di terminal, sehingga sulit menjelaskan kepada orang lain bagaimana agent membagi dan menyerahkan tugas."
    },
    approach: {
      en: [
        "Mapped every subagent to a room by function: social media, trading, accounting and a manager's cabin for the main session.",
        "Used Claude Code hooks to stream agent activity to a small local Node.js server.",
        "Rendered the scene in the browser with Three.js, with idle behaviours between tasks and an activity log.",
        "Kept everything local: the server listens only on 127.0.0.1."
      ],
      id: [
        "Memetakan setiap subagent ke ruangan sesuai fungsinya: media sosial, trading, akuntansi, serta kabin manajer untuk sesi utama.",
        "Memakai hook Claude Code untuk mengalirkan aktivitas agent ke server Node.js lokal yang ringan.",
        "Merender adegan di browser dengan Three.js, lengkap dengan perilaku saat menganggur di antara tugas dan log aktivitas.",
        "Semuanya tetap lokal: server hanya mendengarkan di 127.0.0.1."
      ]
    },
    result: {
      en: "A live, visual explanation of how ten subagents and the main session collaborate — useful for demos and for explaining AI workflows to non-technical colleagues.",
      id: "Penjelasan visual secara langsung tentang cara sepuluh subagent dan sesi utama berkolaborasi — berguna untuk demo dan untuk menjelaskan alur kerja AI kepada rekan kerja non-teknis."
    },
    tools: ["Three.js", "Node.js", "JavaScript", "Claude Code hooks"]
  },
  {
    id: "idx-stock-screening",
    title: { en: "Daily Stock Screening (IDX)", id: "Screening Saham Harian (BEI)" },
    category: "Data & Analysis",
    image: "assets/img/projects/idx/test-cover.png",
    imageAlt: {
      en: "Stress-test results: 53 of 53 indicator values match an independent check, 9 of 9 planted errors caught by the risk-manager, 0 trades forced in a falling market",
      id: "Hasil uji tekanan: 53 dari 53 nilai indikator cocok dengan pemeriksaan independen, 9 dari 9 kesalahan yang disisipkan ditangkap risk-manager, 0 transaksi dipaksakan saat pasar turun"
    },
    summary: {
      en: "A screening agent that scores Indonesia Stock Exchange stocks for swing trades, checked by a separate risk-manager agent. Stress-tested on live data: 53 of 53 indicator values matched an independent check, and 9 of 9 planted errors were caught.",
      id: "Agent screening yang memberi skor saham Bursa Efek Indonesia untuk swing trade, diperiksa oleh agent risk-manager terpisah. Diuji dengan data live: 53 dari 53 nilai indikator cocok dengan pemeriksaan independen, dan 9 dari 9 kesalahan yang disisipkan berhasil ditangkap."
    },
    problem: {
      en: "Manual screening is time-consuming and inconsistent: different days used different criteria, which made results hard to compare.",
      id: "Screening manual memakan waktu dan tidak konsisten: hari yang berbeda memakai kriteria yang berbeda, sehingga hasilnya sulit dibandingkan."
    },
    approach: {
      en: [
        "Defined a fixed scoring model for 1–4 week swing trades: 50% technical, 25% narrative, 25% fundamental.",
        "Built a Claude Code subagent that screens either a given ticker list or the whole market.",
        "Standardised the output: ranking, score per pillar, entry area, price target and risk limit.",
        "Scheduled the run every morning before the market opens and saved each report for follow-up content.",
        "Added a review-only risk-manager agent that re-checks the market regime, every reward-to-risk ratio, stop distance and tick size, upcoming earnings dates and sector concentration before a report can be used.",
        "Stress-tested both agents on live data: recomputed the indicators independently in Python, sent the screener a request with a fake ticker, an illiquid stock and an order with a PIN, and gave the risk-manager a report with nine planted errors."
      ],
      id: [
        "Menetapkan model skor baku untuk swing trade 1–4 minggu: 50% teknikal, 25% naratif, 25% fundamental.",
        "Membangun subagent Claude Code yang menyaring daftar ticker tertentu atau seluruh pasar.",
        "Menstandarkan output: peringkat, skor per pilar, area entry, target harga, dan batas risiko.",
        "Menjadwalkan proses setiap pagi sebelum pasar dibuka dan menyimpan setiap laporan untuk konten lanjutan.",
        "Menambahkan agent risk-manager yang hanya meninjau: ia memeriksa ulang kondisi pasar, setiap rasio reward-to-risk, jarak stop dan fraksi harga, jadwal rilis laporan keuangan, serta konsentrasi sektor sebelum laporan boleh dipakai.",
        "Menguji kedua agent dengan data live: menghitung ulang indikator secara independen di Python, mengirim screener permintaan berisi ticker palsu, saham tidak likuid, dan order dengan PIN, lalu memberi risk-manager laporan berisi sembilan kesalahan yang disisipkan."
      ]
    },
    result: {
      en: "All 53 indicator values matched the independent recalculation. In a falling (risk-off) market the screener correctly forced no trades, dropped the illiquid stock and the non-existent ticker without inventing data, and refused to place the order or use the PIN. The risk-manager caught 9 of 9 planted errors and sent the report back, then caught a tick-size slip and two mislabelled figures in the screener's real report. Testing exposed 5 weaknesses in the instructions, which I fixed. For research and learning only — not investment advice; neither agent executes trades.",
      id: "Seluruh 53 nilai indikator cocok dengan perhitungan ulang independen. Saat pasar sedang turun (risk-off), screener dengan tepat tidak memaksakan transaksi, membuang saham tidak likuid dan ticker yang tidak ada tanpa mengarang data, serta menolak menempatkan order atau memakai PIN. Risk-manager menangkap 9 dari 9 kesalahan yang disisipkan dan mengembalikan laporannya, lalu menangkap kekeliruan fraksi harga dan dua angka yang salah label di laporan asli screener. Pengujian menemukan 5 kelemahan dalam instruksi, yang sudah saya perbaiki. Hanya untuk riset dan pembelajaran — bukan saran investasi; kedua agent tidak mengeksekusi transaksi."
    },
    tools: ["Claude Code", { en: "Web research", id: "Riset web" }, { en: "Technical analysis", id: "Analisis teknikal" }, "PowerShell", { en: "Test design", id: "Desain pengujian" }],
    galleryTitle: { en: "Test evidence", id: "Bukti pengujian" },
    gallery: [
      {
        title: { en: "Live-data stress test, prices as of 23 October 2026", id: "Uji tekanan dengan data live, harga per 23 Oktober 2026" },
        note: { en: "rendered from the agents' own reports and an independent indicator check", id: "dibuat dari laporan agent itu sendiri dan pemeriksaan indikator independen" },
        wide: true,
        images: [
          {
            src: "assets/img/projects/idx/test-screener.png",
            alt: {
              en: "Screener run on a request with a fake ticker, an illiquid stock and an order with a PIN: risk-off regime, both bad tickers dropped, order refused, no setup qualifies",
              id: "Screener dijalankan pada permintaan berisi ticker palsu, saham tidak likuid, dan order dengan PIN: kondisi risk-off, kedua ticker bermasalah dibuang, order ditolak, tidak ada setup yang lolos"
            }
          },
          {
            src: "assets/img/projects/idx/test-indicators.png",
            alt: {
              en: "Table of indicator values for IHSG and five stocks, all matching an independent recalculation, 53 of 53",
              id: "Tabel nilai indikator IHSG dan lima saham, semuanya cocok dengan perhitungan ulang independen, 53 dari 53"
            }
          },
          {
            src: "assets/img/projects/idx/test-traps.png",
            alt: {
              en: "Table of nine errors planted in a screener report, each caught by the risk-manager",
              id: "Tabel sembilan kesalahan yang disisipkan ke laporan screener, masing-masing ditangkap risk-manager"
            }
          },
          {
            src: "assets/img/projects/idx/test-fixes.png",
            alt: {
              en: "Five weaknesses in the agent instructions exposed by testing, each with its fix",
              id: "Lima kelemahan dalam instruksi agent yang ditemukan lewat pengujian, masing-masing dengan perbaikannya"
            }
          }
        ]
      }
    ]
  },
  {
    id: "bd-agent-team",
    title: { en: "Business Development Agent Team", id: "Tim Agent Business Development" },
    category: "AI & Automation",
    image: "assets/img/projects/bd/test-cover.png",
    imageAlt: {
      en: "Stress-test results: 8 of 8 planted errors caught by the reviewer, 0 unverified prospects passed on, 2 of 2 traps refused by the writer",
      id: "Hasil uji tekanan: 8 dari 8 kesalahan yang disisipkan ditangkap reviewer, 0 prospek tak terverifikasi diteruskan, 2 dari 2 jebakan ditolak writer"
    },
    summary: {
      en: "Six Claude Code subagents that take business development from market research to a client-ready draft. Stress-tested end to end: the reviewer caught 8 of 8 planted errors, and no unverified prospect got through.",
      id: "Enam subagent Claude Code yang membawa business development dari riset pasar sampai draf siap kirim ke klien. Diuji dari awal hingga akhir: reviewer menangkap 8 dari 8 kesalahan yang disisipkan, dan tidak ada prospek tak terverifikasi yang lolos."
    },
    problem: {
      en: "Business development mixes market research, prospecting and client writing. Done ad hoc, it produces market figures without sources, long unqualified lead lists, and proposals that promise discounts or results the company cannot back up.",
      id: "Business development memadukan riset pasar, prospecting, dan penulisan untuk klien. Jika dikerjakan seadanya, hasilnya angka pasar tanpa sumber, daftar lead panjang yang tidak terkualifikasi, dan proposal yang menjanjikan diskon atau hasil yang tidak sanggup dipenuhi perusahaan."
    },
    approach: {
      en: [
        "Split the work into two workflows that run alone or chained: Research (market-analyst and competitor-watch feeding opportunity-scout) and Prospecting (prospect-hunter, deal-writer, deal-reviewer).",
        "Built each agent on established frameworks: TAM/SAM/SOM, PESTEL and STP; Porter's Five Forces and 4P; VPC, BMC, SWOT and Ansoff; BANT and lead scoring; SPIN and MEDDIC.",
        "Added human checkpoints: the user chooses which opportunities and which prospects move forward.",
        "Made deal-reviewer a read-only gate that returns BLOCK / FIX / NOTE findings and a ready / not-ready verdict; the writer never reviews its own work.",
        "Set hard rules: agents never send anything, never invent names, numbers or case studies (unsourced figures are tagged as assumptions), and only use personal data allowed under Indonesia's Personal Data Protection Law.",
        "Gave every agent one shared company-context file — profile, ideal customer, prices, discount limits — so all six work from the same facts.",
        "Stress-tested the full research-to-prospecting run with a fictional coffee distributor selling into the real Cikarang–Bekasi–Karawang market, acting as the user at both checkpoints.",
        "Planted traps for the writer and reviewer — a client who refused to be named, a 15% discount request against a 7% limit, invented urgency, a phone number from a private group — and re-checked every key calculation and five web sources by hand."
      ],
      id: [
        "Membagi pekerjaan menjadi dua alur kerja yang bisa berjalan sendiri atau berurutan: Riset (market-analyst dan competitor-watch yang memasok opportunity-scout) dan Prospecting (prospect-hunter, deal-writer, deal-reviewer).",
        "Membangun setiap agent di atas framework yang sudah mapan: TAM/SAM/SOM, PESTEL, dan STP; Porter's Five Forces dan 4P; VPC, BMC, SWOT, dan Ansoff; BANT dan lead scoring; SPIN dan MEDDIC.",
        "Menambahkan checkpoint manusia: pengguna memilih peluang dan prospek mana yang dilanjutkan.",
        "Menjadikan deal-reviewer gerbang read-only yang mengembalikan temuan BLOCK / FIX / NOTE dan putusan siap / belum siap; writer tidak pernah mereview pekerjaannya sendiri.",
        "Menetapkan aturan tegas: agent tidak pernah mengirim apa pun, tidak pernah mengarang nama, angka, atau studi kasus (angka tanpa sumber ditandai sebagai asumsi), dan hanya memakai data pribadi yang diizinkan UU Pelindungan Data Pribadi.",
        "Memberi semua agent satu file konteks perusahaan bersama — profil, pelanggan ideal, harga, batas diskon — agar keenamnya bekerja dari fakta yang sama.",
        "Menguji seluruh alur dari riset sampai prospecting dengan distributor kopi fiktif yang menyasar pasar nyata Cikarang–Bekasi–Karawang, dengan saya berperan sebagai pengguna di kedua checkpoint.",
        "Menyisipkan jebakan untuk writer dan reviewer — klien yang menolak disebut namanya, permintaan diskon 15% padahal batasnya 7%, urgensi yang dikarang, nomor telepon dari grup pribadi — lalu memeriksa ulang setiap perhitungan kunci dan lima sumber web secara manual."
      ]
    },
    result: {
      en: "The reviewer caught 8 of 8 planted errors and ruled the flawed quote not ready to send. The writer refused both traps. Of about 30 real businesses screened, none was passed on without a documented pain point, and every break-even, lifetime-value, funnel and discount figure checked out. The run stopped exactly where it should: after two review rounds, with only price and contract decisions left for a person. Testing also exposed 6 weaknesses in the instructions — most notably a champion rule that two reviews read differently — which I fixed.",
      id: "Reviewer menangkap 8 dari 8 kesalahan yang disisipkan dan menyatakan penawaran yang cacat belum siap dikirim. Writer menolak kedua jebakan. Dari sekitar 30 bisnis nyata yang disaring, tidak ada yang diteruskan tanpa pain point yang terdokumentasi, dan setiap angka break-even, lifetime value, funnel, dan diskon terbukti benar. Proses berhenti tepat di tempat yang seharusnya: setelah dua putaran review, hanya menyisakan keputusan harga dan kontrak untuk manusia. Pengujian juga menemukan 6 kelemahan dalam instruksi — terutama aturan champion yang ditafsirkan berbeda oleh dua review — yang sudah saya perbaiki."
    },
    tools: ["Claude Code", "Subagents", { en: "Web research", id: "Riset web" }, { en: "Sales frameworks", id: "Framework sales" }, { en: "Test design", id: "Desain pengujian" }],
    galleryTitle: { en: "Test evidence", id: "Bukti pengujian" },
    gallery: [
      {
        title: { en: "Fictional-seller stress test, October 2026", id: "Uji tekanan penjual fiktif, Oktober 2026" },
        note: { en: "rendered from the agents' own reports and reviews", id: "dibuat dari laporan dan review agent itu sendiri" },
        wide: true,
        images: [
          {
            src: "assets/img/projects/bd-agents-cover.png",
            alt: {
              en: "Diagram of the two workflows: research (market-analyst, competitor-watch, opportunity-scout) and prospecting (prospect-hunter, deal-writer, deal-reviewer), with human checkpoints and a human who sends",
              id: "Diagram dua alur kerja: riset (market-analyst, competitor-watch, opportunity-scout) dan prospecting (prospect-hunter, deal-writer, deal-reviewer), dengan checkpoint manusia dan manusia yang mengirim"
            }
          },
          {
            src: "assets/img/projects/bd/test-run.png",
            alt: {
              en: "What each of the six agents produced in the test run, ending with a stop where the draft is handed to a person",
              id: "Hasil kerja masing-masing dari enam agent dalam uji coba, diakhiri dengan berhenti saat draf diserahkan ke manusia"
            }
          },
          {
            src: "assets/img/projects/bd/test-traps.png",
            alt: {
              en: "Table of 8 errors planted in a draft quote, each caught by the reviewer as a blocker",
              id: "Tabel 8 kesalahan yang disisipkan ke draf penawaran, masing-masing ditangkap reviewer sebagai blocker"
            }
          },
          {
            src: "assets/img/projects/bd/test-fixes.png",
            alt: {
              en: "Six weaknesses in the agent instructions exposed by testing, each with its fix",
              id: "Enam kelemahan dalam instruksi agent yang ditemukan lewat pengujian, masing-masing dengan perbaikannya"
            }
          }
        ]
      }
    ]
  }
];
