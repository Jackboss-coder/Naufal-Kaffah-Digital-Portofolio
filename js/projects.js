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
    image: "assets/img/projects/idx/test-cover.png",
    imageAlt: "Stress-test results: 53 of 53 indicator values match an independent check, 9 of 9 planted errors caught by the risk-manager, 0 trades forced in a falling market",
    summary:
      "A screening agent that scores Indonesia Stock Exchange stocks for swing trades, checked by a separate risk-manager agent. Stress-tested on live data: 53 of 53 indicator values matched an independent check, and 9 of 9 planted errors were caught.",
    problem:
      "Manual screening is time-consuming and inconsistent: different days used different criteria, which made results hard to compare.",
    approach: [
      "Defined a fixed scoring model for 1–4 week swing trades: 50% technical, 25% narrative, 25% fundamental.",
      "Built a Claude Code subagent that screens either a given ticker list or the whole market.",
      "Standardised the output: ranking, score per pillar, entry area, price target and risk limit.",
      "Scheduled the run every morning before the market opens and saved each report for follow-up content.",
      "Added a review-only risk-manager agent that re-checks the market regime, every reward-to-risk ratio, stop distance and tick size, upcoming earnings dates and sector concentration before a report can be used.",
      "Stress-tested both agents on live data: recomputed the indicators independently in Python, sent the screener a request with a fake ticker, an illiquid stock and an order with a PIN, and gave the risk-manager a report with nine planted errors."
    ],
    result:
      "All 53 indicator values matched the independent recalculation. In a falling (risk-off) market the screener correctly forced no trades, dropped the illiquid stock and the non-existent ticker without inventing data, and refused to place the order or use the PIN. The risk-manager caught 9 of 9 planted errors and sent the report back, then caught a tick-size slip and two mislabelled figures in the screener's real report. Testing exposed 5 weaknesses in the instructions, which I fixed. For research and learning only — not investment advice; neither agent executes trades.",
    tools: ["Claude Code", "Web research", "Technical analysis", "PowerShell", "Test design"],
    galleryTitle: "Test evidence",
    gallery: [
      {
        title: "Live-data stress test, prices as of 23 October 2026",
        note: "rendered from the agents' own reports and an independent indicator check",
        wide: true,
        images: [
          { src: "assets/img/projects/idx/test-screener.png", alt: "Screener run on a request with a fake ticker, an illiquid stock and an order with a PIN: risk-off regime, both bad tickers dropped, order refused, no setup qualifies" },
          { src: "assets/img/projects/idx/test-indicators.png", alt: "Table of indicator values for IHSG and five stocks, all matching an independent recalculation, 53 of 53" },
          { src: "assets/img/projects/idx/test-traps.png", alt: "Table of nine errors planted in a screener report, each caught by the risk-manager" },
          { src: "assets/img/projects/idx/test-fixes.png", alt: "Five weaknesses in the agent instructions exposed by testing, each with its fix" }
        ]
      }
    ]
  },
  {
    id: "bd-agent-team",
    title: "Business Development Agent Team",
    category: "AI & Automation",
    image: "assets/img/projects/bd/test-cover.png",
    imageAlt: "Stress-test results: 8 of 8 planted errors caught by the reviewer, 0 unverified prospects passed on, 2 of 2 traps refused by the writer",
    summary:
      "Six Claude Code subagents that take business development from market research to a client-ready draft. Stress-tested end to end: the reviewer caught 8 of 8 planted errors, and no unverified prospect got through.",
    problem:
      "Business development mixes market research, prospecting and client writing. Done ad hoc, it produces market figures without sources, long unqualified lead lists, and proposals that promise discounts or results the company cannot back up.",
    approach: [
      "Split the work into two workflows that run alone or chained: Research (market-analyst and competitor-watch feeding opportunity-scout) and Prospecting (prospect-hunter, deal-writer, deal-reviewer).",
      "Built each agent on established frameworks: TAM/SAM/SOM, PESTEL and STP; Porter's Five Forces and 4P; VPC, BMC, SWOT and Ansoff; BANT and lead scoring; SPIN and MEDDIC.",
      "Added human checkpoints: the user chooses which opportunities and which prospects move forward.",
      "Made deal-reviewer a read-only gate that returns BLOCK / FIX / NOTE findings and a ready / not-ready verdict; the writer never reviews its own work.",
      "Set hard rules: agents never send anything, never invent names, numbers or case studies (unsourced figures are tagged as assumptions), and only use personal data allowed under Indonesia's Personal Data Protection Law.",
      "Gave every agent one shared company-context file — profile, ideal customer, prices, discount limits — so all six work from the same facts.",
      "Stress-tested the full research-to-prospecting run with a fictional coffee distributor selling into the real Cikarang–Bekasi–Karawang market, acting as the user at both checkpoints.",
      "Planted traps for the writer and reviewer — a client who refused to be named, a 15% discount request against a 7% limit, invented urgency, a phone number from a private group — and re-checked every key calculation and five web sources by hand."
    ],
    result:
      "The reviewer caught 8 of 8 planted errors and ruled the flawed quote not ready to send. The writer refused both traps. Of about 30 real businesses screened, none was passed on without a documented pain point, and every break-even, lifetime-value, funnel and discount figure checked out. The run stopped exactly where it should: after two review rounds, with only price and contract decisions left for a person. Testing also exposed 6 weaknesses in the instructions — most notably a champion rule that two reviews read differently — which I fixed.",
    tools: ["Claude Code", "Subagents", "Web research", "Sales frameworks", "Test design"],
    galleryTitle: "Test evidence",
    gallery: [
      {
        title: "Fictional-seller stress test, October 2026",
        note: "rendered from the agents' own reports and reviews",
        wide: true,
        images: [
          { src: "assets/img/projects/bd-agents-cover.png", alt: "Diagram of the two workflows: research (market-analyst, competitor-watch, opportunity-scout) and prospecting (prospect-hunter, deal-writer, deal-reviewer), with human checkpoints and a human who sends" },
          { src: "assets/img/projects/bd/test-run.png", alt: "What each of the six agents produced in the test run, ending with a stop where the draft is handed to a person" },
          { src: "assets/img/projects/bd/test-traps.png", alt: "Table of 8 errors planted in a draft quote, each caught by the reviewer as a blocker" },
          { src: "assets/img/projects/bd/test-fixes.png", alt: "Six weaknesses in the agent instructions exposed by testing, each with its fix" }
        ]
      }
    ]
  }
];
