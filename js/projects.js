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
    gallery   : (opsional) contoh hasil kerja di modal, dikelompokkan:
                [{ title: "Judul", note: "keterangan", url: "tautan lihat (opsional)", images: [{ src: "assets/img/...", alt: "..." }] }]
                Untuk Canva, pakai tautan yang berakhiran /view dan pastikan Share → "Anyone with the link" = "Can view".
*/
window.PROJECTS = [
  {
    id: "ai-accounting-agents",
    title: "AI Accounting Agent System",
    category: "AI & Automation",
    image: "assets/img/projects/ai-accounting-agents.svg",
    imageAlt: "Illustration of a ledger table with a verification check mark",
    summary:
      "Manual bookkeeping in spreadsheets is slow and easy to get wrong. I built a team of five Claude Code subagents that runs the cycle from general journal to financial statements while staff only input and verify.",
    problem:
      "Recording transactions, posting to the ledger, making adjustments and preparing reports by hand takes hours each period, and a single mistyped cell can silently break the statements.",
    approach: [
      "Designed a clear division of work: people enter and verify source data, agents journalize, post and report.",
      "Built five specialised subagents — journal, ledger, adjustments, validation and reporting — each with its own rules and responsibilities.",
      "Set up a two-workbook contract: a 19-sheet input workbook that agents may only read, and a 10-sheet book workbook that only agents write.",
      "Added a validation step and automatic backups so every run can be checked and rolled back."
    ],
    result:
      "A repeatable, semi-automated bookkeeping flow from general journal to financial statements, with human approval kept at every critical decision. Time saved per closing: [YOUR METRIC].",
    tools: ["Claude Code", "Subagents", "Python", "Excel"]
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
    image: "assets/img/projects/ai-agent-office.svg",
    imageAlt: "Isometric illustration of office desks on a grid",
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
    id: "idx-market-carousel",
    title: "IDX Market Instagram Carousel",
    category: "Content Design",
    image: "assets/img/projects/idx-market-carousel.svg",
    imageAlt: "Illustration of stacked Instagram carousel slides with a line chart",
    summary:
      "Market updates go stale within hours, so a static post is outdated by the close. I designed an Instagram carousel on the Jakarta Composite Index (IHSG) that is updated from intraday figures to closing data.",
    problem:
      "Followers need a quick, accurate read on the market, but rebuilding a carousel from scratch for every update is slow and risks inconsistent design.",
    approach: [
      "Designed a compact 5–6 slide layout where every slide carries real information — no filler slides.",
      "Built the carousel in Canva with a fixed grid, fonts and colour system.",
      "Updated index levels, movers and context from intraday to closing data on the same design.",
      "Checked every figure against the source before publishing."
    ],
    result:
      "A reusable market carousel template that can be refreshed quickly while keeping data accurate and the brand consistent. Reach or engagement: [YOUR METRIC].",
    tools: ["Canva", "Claude Code", "Market data", "Copywriting"]
  }
];
