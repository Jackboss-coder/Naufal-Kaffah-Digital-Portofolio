/*
  DATA PROYEK — satu-satunya file yang perlu diedit untuk menambah karya.

  Cara menambah proyek: salin satu blok { ... } di bawah, tempel di akhir daftar
  (jangan lupa koma pemisah), lalu ganti isinya. Kolom:

    id        : kode unik tanpa spasi, mis. "sales-dashboard"
    title     : judul proyek
    category  : salah satu dari "AI & Automation", "Data & Analysis", "Content Design"
                (kategori baru otomatis muncul sebagai tombol filter)
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
*/
window.PROJECTS = [
  {
    id: "ai-accounting-agents",
    title: "AI Accounting Agent System",
    category: "AI & Automation",
    image: "assets/img/projects/accounting/test-cover.png?v=2",
    imageAlt: "Stress-test results: 36 of 36 journal entries match the answer key, 9 of 9 planted faulty transactions caught, Rp 0 difference in the financial statements",
    summary:
      "Five Claude Code subagents that run bookkeeping from journal to financial statements. Tested on a fictional company: every figure matched an independent answer key, and 9 of 9 faulty transactions were caught.",
    problem:
      "Recording transactions, posting to the ledger, making adjustments and preparing reports by hand takes hours each period, and a single mistyped cell can silently break the statements. An AI bookkeeper is only useful if it can be proven right — and if it refuses bad data instead of guessing.",
    approach: [
      "Designed a clear division of work: people enter and verify source data, agents journalize, post and report.",
      "Built five specialised subagents — journal, ledger, adjustments, validation and reporting — each with its own rules and responsibilities.",
      "Set up a two-workbook contract: a 19-sheet input workbook that agents may only read, and a 10-sheet book workbook that only agents write.",
      "Added a validation step and automatic backups so every run can be checked and rolled back.",
      "Stress-tested the system with one month of a fictional coffee distributor (PKP, SAK EP): 42 source transactions, 9 of them deliberately wrong, plus month-end close and controller approval of adjusting entries.",
      "Wrote an independent answer key by hand and an automated comparison script, then sabotaged the books on purpose to test the validator."
    ],
    result:
      "36 of 36 journal entries, the trial balance (39 accounts), payables and receivables sub-ledgers and all four financial statements matched the answer key to the last rupiah, and 9 of 9 faulty transactions were rejected with the correct error code. The agents never modified the human input file. Testing also exposed 6 weaknesses — the most serious, a validator that missed a tampered adjusting entry — which I fixed and re-verified.",
    tools: ["Claude Code", "Subagents", "Python", "Excel", "Test design"],
    galleryTitle: "Test evidence",
    gallery: [
      {
        title: "Fictional-company stress test, October 2026",
        note: "rendered from the agents' own output files",
        wide: true,
        images: [
          { src: "assets/img/projects/accounting/test-exceptions.png", alt: "Table of 9 deliberately faulty transactions, each rejected by the agents with an error code such as ARI-01, REF-03 and DUP-01" },
          { src: "assets/img/projects/accounting/test-statements.png", alt: "Income statement and balance sheet produced by the agents: net revenue 132,000,000, net profit 23,022,500, total assets 800,805,000, balance check 0" },
          { src: "assets/img/projects/accounting/test-verification.png", alt: "Verification checklist: 7 of 7 comparisons against an independent answer key passed, plus a validator sabotage test before and after the fix" }
        ]
      }
    ]
  },
  {
    id: "canva-content-agents",
    title: "Canva Content Agents",
    category: "AI & Automation",
    image: "assets/img/projects/canva-content-agents.jpg",
    imageAlt: "Covers of three Instagram carousels made with the pipeline: workplace safety, IHSG market update and AI careers",
    summary:
      "Producing social media content consistently takes planning, writing, design and review. I set up a pipeline of Claude Code subagents connected to Canva, so every post moves from idea to reviewed design in one flow.",
    problem:
      "Content quality and brand consistency dropped whenever ideas, copy and design were handled ad hoc, and there was no fixed check before a post went out.",
    approach: [
      "Split the work into four subagents: content planner, copywriter, Canva editor and Canva reviewer.",
      "Connected the editor to Canva so approved copy is applied to designs without rewriting it.",
      "Wrote a shared style guide so layout, fonts and colours stay consistent across posts.",
      "Made review mandatory: the reviewer checks data accuracy, copy match, brand and layout before handover."
    ],
    result:
      "A consistent, repeatable content workflow with a built-in quality gate before anything is published. Posts produced so far: [YOUR METRIC].",
    tools: ["Claude Code", "Canva", "Canva MCP", "Prompt design"],
    gallery: [
      {
        title: "Workplace safety series — PT Citra Karsa Dinamika",
        note: "18-slide company content",
        url: "https://www.canva.com/design/DAHWeCl7ylI/xJgXg8E6N-heTmBC8rt4CQ/view",
        images: [
          { src: "assets/img/projects/canva/ckd-safety-1.jpg", alt: "Cover slide: Safety starts with your physical condition" },
          { src: "assets/img/projects/canva/ckd-safety-2.jpg", alt: "Safety series slide 2" },
          { src: "assets/img/projects/canva/ckd-safety-3.jpg", alt: "Safety series slide 3" }
        ]
      },
      {
        title: "IHSG market update carousel",
        note: "6 slides, session I recap",
        url: "https://www.canva.com/design/DAHYuPyWiOo/AoABMje2zuBusgjedrSrhg/view",
        images: [
          { src: "assets/img/projects/canva/ihsg-carousel-1.jpg", alt: "Cover slide: IHSG falls in the morning, turns green by midday" },
          { src: "assets/img/projects/canva/ihsg-carousel-2.jpg", alt: "IHSG carousel slide 2" },
          { src: "assets/img/projects/canva/ihsg-carousel-3.jpg", alt: "IHSG carousel slide 3" }
        ]
      },
      {
        title: "AI & robotics education carousel",
        note: "5 square slides",
        url: "https://www.canva.com/design/DAHX8jn-vK8/uvqbT2pOo86Oo3IcHNqxhA/view",
        images: [
          { src: "assets/img/projects/canva/ai-robotics-1.jpg", alt: "Cover slide: What to learn for the next five years in AI and robotics" },
          { src: "assets/img/projects/canva/ai-robotics-2.jpg", alt: "AI and robotics carousel slide 2" },
          { src: "assets/img/projects/canva/ai-robotics-3.jpg", alt: "AI and robotics carousel slide 3" }
        ]
      }
    ]
  },
  {
    id: "ai-agent-office",
    title: "AI Agent Office Visualization",
    category: "AI & Automation",
    image: "assets/img/projects/ai-agent-office.jpg",
    imageAlt: "3D yacht scene where labelled AI subagents work, rest and fish on deck, with an activity log beside it",
    video: {
      src: "assets/video/ai-agent-office.mp4",
      poster: "assets/video/ai-agent-office-poster.jpg",
      label: "Screen recording of the visualization running in demo mode",
      url: "https://www.canva.com/design/DAHY5S9mF4s/xfzfJbRMrVx1E3NxDQkUtg/view"
    },
    summary:
      "It is hard to see what AI subagents are doing while they work. I built a real-time isometric visualization where each subagent walks to its desk and starts typing the moment it receives a task.",
    problem:
      "Multi-agent work in Claude Code happens out of sight in the terminal, which makes it difficult to explain to others how the agents divide and hand over tasks.",
    approach: [
      "Mapped every subagent to a room by function: social media, trading, accounting and a manager's cabin for the main session.",
      "Used Claude Code hooks to stream agent activity to a small local Node.js server.",
      "Rendered the scene in the browser with Three.js, with idle behaviours between tasks and an activity log.",
      "Kept everything local: the server listens only on 127.0.0.1."
    ],
    result:
      "A live, visual explanation of how ten subagents and the main session collaborate — useful for demos and for explaining AI workflows to non-technical colleagues.",
    tools: ["Three.js", "Node.js", "JavaScript", "Claude Code hooks"]
  },
  {
    id: "idx-stock-screening",
    title: "Daily Stock Screening (IDX)",
    category: "Data & Analysis",
    image: "assets/img/projects/idx-stock-screening.svg",
    imageAlt: "Illustration of a candlestick chart with an upward trend",
    summary:
      "Finding swing-trading candidates on the Indonesia Stock Exchange each morning means reviewing far more data than one person can read before the open. I built a screening agent that scores stocks before the market opens and produces a ranked, ready-to-read report.",
    problem:
      "Manual screening is time-consuming and inconsistent: different days used different criteria, which made results hard to compare.",
    approach: [
      "Defined a fixed scoring model for 1–4 week swing trades: 50% technical, 25% narrative, 25% fundamental.",
      "Built a Claude Code subagent that screens either a given ticker list or the whole market.",
      "Standardised the output: ranking, score per pillar, entry area, price target and risk limit.",
      "Scheduled the run every morning before the market opens and saved each report for follow-up content."
    ],
    result:
      "A consistent daily shortlist with transparent scores, ready before the opening bell. For research and learning only — not investment advice; the agent never executes trades.",
    tools: ["Claude Code", "Web research", "Technical analysis", "PowerShell"]
  },
  {
    id: "bd-agent-team",
    title: "Business Development Agent Team",
    category: "AI & Automation",
    image: "assets/img/projects/bd-agents-cover.png",
    imageAlt: "Diagram of six AI subagents in two workflows: research (market-analyst, competitor-watch, opportunity-scout) and prospecting (prospect-hunter, deal-writer, deal-reviewer), ending with a human who sends",
    summary:
      "Six Claude Code subagents that take business development from market research to a client-ready draft. A read-only reviewer must approve every draft, and only a person ever sends it.",
    problem:
      "Business development mixes market research, prospecting and client writing. Done ad hoc, it produces market figures without sources, long unqualified lead lists, and proposals that promise discounts or results the company cannot back up.",
    approach: [
      "Split the work into two workflows that run alone or chained: Research (market-analyst and competitor-watch feeding opportunity-scout) and Prospecting (prospect-hunter, deal-writer, deal-reviewer).",
      "Built each agent on established frameworks: TAM/SAM/SOM, PESTEL and STP; Porter's Five Forces and 4P; VPC, BMC, SWOT and Ansoff; BANT and lead scoring; SPIN and MEDDIC.",
      "Added human checkpoints: the user chooses which opportunities and which prospects move forward.",
      "Made deal-reviewer a read-only gate that returns BLOCK / FIX / NOTE findings and a ready / not-ready verdict; the writer never reviews its own work.",
      "Set hard rules: agents never send anything, never invent names, numbers or case studies (unsourced figures are tagged as assumptions), and only use personal data allowed under Indonesia's Personal Data Protection Law.",
      "Gave every agent one shared company-context file — profile, ideal customer, prices, discount limits — so all six work from the same facts."
    ],
    result:
      "A repeatable path from market research to a reviewed, ready-to-send draft, with people kept in charge of every message, meeting and signature.",
    tools: ["Claude Code", "Subagents", "Web research", "Sales frameworks"]
  }
];
