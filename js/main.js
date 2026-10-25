(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

  /* ---------- Helpers ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }

  var FALLBACK_ICON =
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>';
  var ARROW_ICON =
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- Language: English is the source, Indonesian comes from js/i18n.js ---------- */
  var I18N = window.I18N || {};
  var UI = I18N.ui || {};
  var PAGE_ID = (I18N.page && I18N.page.id) || {};
  var lang = root.getAttribute("lang") === "id" ? "id" : "en";
  var langBtn = document.querySelector(".lang-toggle");
  var pageEn = {}; // English text of index.html, keyed by data-i18n / data-i18n-attr

  // Label used by this script; falls back to English, then to the given fallback or the key
  function t(key, fallback) {
    var own = UI[lang] || {}, en = UI.en || {};
    if (own[key] != null) return own[key];
    if (en[key] != null) return en[key];
    return fallback != null ? fallback : key;
  }

  // Project fields are plain values or { en, id }
  function tr(value) {
    if (value && typeof value === "object" && !Array.isArray(value) && "en" in value) {
      return value[lang] != null && value[lang] !== "" ? value[lang] : value.en;
    }
    return value;
  }

  function attrPairs(node) {
    return node.getAttribute("data-i18n-attr").split(";").map(function (pair) {
      var i = pair.indexOf(":");
      return { attr: pair.slice(0, i).trim(), key: pair.slice(i + 1).trim() };
    });
  }

  // Remember the English text before anything is translated
  document.querySelectorAll("[data-i18n]").forEach(function (node) {
    var key = node.getAttribute("data-i18n");
    if (!(key in pageEn)) pageEn[key] = node.tagName === "TITLE" ? node.textContent : node.innerHTML;
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(function (node) {
    attrPairs(node).forEach(function (p) {
      if (!(p.key in pageEn)) pageEn[p.key] = node.getAttribute(p.attr) || "";
    });
  });

  function pageText(key) {
    return lang === "id" && PAGE_ID[key] != null ? PAGE_ID[key] : pageEn[key];
  }

  function translatePage() {
    root.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var text = pageText(node.getAttribute("data-i18n"));
      if (text == null) return;
      if (node.tagName === "TITLE") node.textContent = text;
      else if (node.innerHTML !== text) node.innerHTML = text;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (node) {
      attrPairs(node).forEach(function (p) {
        var text = pageText(p.key);
        if (text != null) node.setAttribute(p.attr, text);
      });
    });
    if (langBtn) langBtn.setAttribute("aria-label", t("lang.switch"));
  }

  translatePage();

  // Replace a broken project image with a neutral placeholder
  function imageWithFallback(src, alt) {
    var img = el("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 800;
    img.height = 500;
    img.addEventListener("error", function () {
      var ph = el("div", "media-fallback");
      ph.setAttribute("role", "img");
      ph.setAttribute("aria-label", alt || t("img.placeholder"));
      ph.innerHTML = FALLBACK_ICON;
      img.replaceWith(ph);
    });
    return img;
  }

  /* ---------- Theme toggle (light by default) ---------- */
  var themeBtn = document.querySelector(".theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeBtn) themeBtn.setAttribute("aria-label", t(theme === "dark" ? "theme.toLight" : "theme.toDark"));
  }

  applyTheme(root.getAttribute("data-theme") || "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      storageSet("theme", next);
    });
  }

  /* ---------- Mobile menu ---------- */
  var navToggle = document.querySelector(".nav__toggle");
  var navMenu = document.getElementById("nav-menu");

  function setMenu(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", t(open ? "menu.close" : "menu.open"));
    navMenu.classList.toggle("is-open", open);
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      setMenu(navToggle.getAttribute("aria-expanded") !== "true");
    });
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        navToggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (navToggle.getAttribute("aria-expanded") === "true" && !e.target.closest(".nav")) setMenu(false);
    });
    window.matchMedia("(min-width: 900px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- About statement: wrap words so they can fill in ---------- */
  var statement = document.querySelector("[data-words]");
  var statementWords = [];

  function wrapWords() {
    if (!statement) return;
    var words = statement.textContent.trim().split(/\s+/);
    statement.textContent = "";
    statementWords = [];
    words.forEach(function (w, i) {
      var span = el("span", "w", w);
      statement.appendChild(span);
      if (i < words.length - 1) statement.appendChild(document.createTextNode(" "));
      statementWords.push(span);
    });
  }

  wrapWords();

  /* ---------- Count-up numbers ---------- */
  function countUp(node) {
    var match = node.textContent.trim().match(/^(\d+)(.*)$/);
    if (!match || reduceMotion) return;
    var target = Number(match[1]), suffix = match[2];
    var start = null;
    node.textContent = "0" + suffix;
    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / 1400, 1);
      node.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = "IntersectionObserver" in window && !reduceMotion
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll("[data-countup]").forEach(countUp);
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 })
    : null;

  function observeReveal(nodes) {
    nodes.forEach(function (n) {
      if (revealObserver) revealObserver.observe(n);
      else n.classList.add("is-visible");
    });
  }

  /* ---------- Lab: stacking project cards ---------- */
  var stack = document.querySelector(".stack");
  var filtersWrap = document.querySelector(".filters");
  var CATEGORY_ORDER = ["AI & Automation", "Data & Analysis", "Content Design"];
  var stackItems = [];

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function categoryLabel(cat) { return t("cat." + cat, cat); }

  function renderCard(project, index) {
    var li = el("li", "stack__item");
    li.dataset.category = project.category;

    var card = el("article", "stack-card");

    var media = el("div", "stack-card__media");
    media.appendChild(imageWithFallback(project.image, tr(project.imageAlt)));
    if (project.video) {
      var badge = el("span", "stack-card__badge");
      badge.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg> ';
      badge.appendChild(document.createTextNode(t("card.video")));
      media.appendChild(badge);
    }
    card.appendChild(media);

    var body = el("div", "stack-card__body");
    body.appendChild(el("p", "stack-card__index", pad(index + 1) + " / " + pad(projects.length)));
    body.appendChild(el("p", "stack-card__cat", categoryLabel(project.category)));

    var h3 = el("h3", "stack-card__title");
    var open = el("button", "stack-card__open", tr(project.title));
    open.type = "button";
    open.setAttribute("aria-haspopup", "dialog");
    open.addEventListener("click", function () { openModal(index, open); });
    h3.appendChild(open);
    body.appendChild(h3);

    body.appendChild(el("p", "stack-card__summary", tr(project.summary)));

    var tags = el("ul", "tags");
    tags.setAttribute("aria-label", t("card.tools"));
    (project.tools || []).forEach(function (tool) { tags.appendChild(el("li", "tag", tr(tool))); });
    body.appendChild(tags);

    var more = el("span", "stack-card__more");
    more.setAttribute("aria-hidden", "true");
    more.textContent = t("card.more") + " ";
    more.insertAdjacentHTML("beforeend", ARROW_ICON);
    body.appendChild(more);

    // The whole card opens the modal; the title button keeps it keyboard-accessible
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".stack-card__open")) openModal(index, open);
    });

    card.appendChild(body);
    li.appendChild(card);
    return li;
  }

  // Sticky offsets follow the visible order so the stack stays tidy after filtering
  function indexStack() {
    var i = 0;
    stackItems.forEach(function (li) {
      if (!li.hidden) li.style.setProperty("--i", i++);
    });
  }

  function renderFilters() {
    var cats = [];
    projects.forEach(function (p) { if (cats.indexOf(p.category) === -1) cats.push(p.category); });
    cats.sort(function (a, b) {
      var ia = CATEGORY_ORDER.indexOf(a), ib = CATEGORY_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    ["All"].concat(cats).forEach(function (cat) {
      var count = cat === "All" ? projects.length : projects.filter(function (p) { return p.category === cat; }).length;
      var btn = el("button", "filter-btn", cat === "All" ? t("filter.all") : categoryLabel(cat));
      btn.type = "button";
      btn.dataset.filter = cat;
      btn.setAttribute("aria-pressed", String(cat === activeFilter));
      var c = el("span", "filter-btn__count", String(count));
      c.setAttribute("aria-hidden", "true");
      btn.appendChild(c);
      btn.addEventListener("click", function () { applyFilter(cat); });
      filtersWrap.appendChild(btn);
    });
  }

  var filterTimer;
  var activeFilter = "All";
  function applyFilter(cat) {
    activeFilter = cat;
    filtersWrap.querySelectorAll(".filter-btn").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.filter === cat));
    });
    clearTimeout(filterTimer);
    stack.classList.add("is-filtering");
    filterTimer = setTimeout(function () {
      stackItems.forEach(function (li) { li.hidden = !(cat === "All" || li.dataset.category === cat); });
      indexStack();
      stack.classList.remove("is-filtering");
      update();
    }, reduceMotion ? 0 : 300);
  }

  // Also called after a language switch; keeps the active filter
  function renderProjects() {
    if (!stack || !filtersWrap) return;
    stack.textContent = "";
    filtersWrap.textContent = "";
    stackItems = [];
    projects.forEach(function (p, i) {
      var li = renderCard(p, i);
      li.hidden = !(activeFilter === "All" || p.category === activeFilter);
      stack.appendChild(li);
      stackItems.push(li);
    });
    indexStack();
    renderFilters();
  }

  renderProjects();

  document.querySelectorAll('[data-count="projects"]').forEach(function (n) {
    n.textContent = String(projects.length);
  });

  observeReveal(Array.prototype.slice.call(document.querySelectorAll(".reveal")));

  /* ---------- Journey: road through the stations ---------- */
  var map = document.querySelector(".journey__map");
  var svg = map ? map.querySelector(".journey__svg") : null;
  var road = svg ? svg.querySelector(".journey__road") : null;
  var lane = svg ? svg.querySelector(".journey__lane") : null;
  var progressPath = svg ? svg.querySelector(".journey__progress") : null;
  var stops = map ? Array.prototype.slice.call(map.querySelectorAll(".stop")) : [];
  var journey = { points: [], lengths: [], total: 0 };

  function buildRoad() {
    if (!map || !stops.length) return;
    var base = map.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + base.width + " " + base.height);

    var pts = stops.map(function (s) {
      var r = s.querySelector(".stop__node").getBoundingClientRect();
      return { x: r.left + r.width / 2 - base.left, y: r.top + r.height / 2 - base.top };
    });
    // Start a little above the first stop and run past the last one
    var start = { x: pts[0].x, y: Math.max(0, pts[0].y - 120) };
    var end = { x: pts[pts.length - 1].x, y: pts[pts.length - 1].y + 80 };
    var all = [start].concat(pts, [end]);

    var d = "M" + all[0].x + "," + all[0].y;
    var lengths = [0];
    var measure = document.createElementNS("http://www.w3.org/2000/svg", "path");
    for (var i = 1; i < all.length; i++) {
      var a = all[i - 1], b = all[i], my = (a.y + b.y) / 2;
      var seg = " C" + a.x + "," + my + " " + b.x + "," + my + " " + b.x + "," + b.y;
      d += seg;
      measure.setAttribute("d", d);
      lengths.push(measure.getTotalLength());
    }

    road.setAttribute("d", d);
    lane.setAttribute("d", d);
    progressPath.setAttribute("d", d);
    journey.points = all;
    journey.lengths = lengths;
    journey.total = lengths[lengths.length - 1];
    progressPath.style.strokeDasharray = journey.total + " " + journey.total;
  }

  function updateJourney(vh) {
    if (!journey.total) return;
    var base = map.getBoundingClientRect();
    var line = vh * 0.62 - base.top; // the "reading line" in map coordinates
    var pts = journey.points, lens = journey.lengths;
    var len;
    if (reduceMotion) {
      len = journey.total;
    } else if (line <= pts[0].y) {
      len = 0;
    } else if (line >= pts[pts.length - 1].y) {
      len = journey.total;
    } else {
      for (var i = 1; i < pts.length; i++) {
        if (line <= pts[i].y) {
          var f = (line - pts[i - 1].y) / (pts[i].y - pts[i - 1].y);
          len = lens[i - 1] + f * (lens[i] - lens[i - 1]);
          break;
        }
      }
    }
    progressPath.style.strokeDashoffset = String(journey.total - len);
    stops.forEach(function (s, idx) {
      if (reduceMotion || pts[idx + 1].y <= line) s.classList.add("is-reached");
      else s.classList.remove("is-reached");
    });
  }

  /* ---------- Marquee: speed follows scroll velocity ---------- */
  // Repeat the track until the row is at least twice the viewport width, so it can loop seamlessly
  function fillMarquee(m) {
    var copies = m.row.children.length;
    while (m.row.scrollWidth < window.innerWidth * 2 + m.track.offsetWidth && copies < 12) {
      m.row.appendChild(m.track.cloneNode(true));
      copies++;
    }
  }

  var marqueeRows = Array.prototype.slice.call(document.querySelectorAll(".marquee__row")).map(function (row) {
    var m = { row: row, track: row.querySelector(".marquee__track"), dir: Number(row.dataset.speed) || 1, x: 0 };
    fillMarquee(m);
    return m;
  });
  var marqueeVisible = false;
  var scrollVelocity = 0;
  var lastScrollY = window.scrollY;

  function marqueeFrame() {
    if (!marqueeVisible || reduceMotion) return;
    var boost = 1 + Math.min(Math.abs(scrollVelocity) * 0.08, 6);
    marqueeRows.forEach(function (m) {
      var w = m.track.offsetWidth;
      m.x -= 0.6 * boost * m.dir;
      if (m.x <= -w) m.x += w;
      if (m.x > 0) m.x -= w;
      m.row.style.transform = "translate3d(" + m.x.toFixed(1) + "px,0,0)";
    });
    scrollVelocity *= 0.9;
    requestAnimationFrame(marqueeFrame);
  }

  var marquee = document.querySelector(".marquee");
  if (marquee && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      var was = marqueeVisible;
      marqueeVisible = entries[0].isIntersecting;
      if (marqueeVisible && !was) requestAnimationFrame(marqueeFrame);
    }).observe(marquee);
  }

  /* ---------- Hero: pointer parallax on the floating tags ---------- */
  var hero = document.querySelector(".hero");
  var tags = Array.prototype.slice.call(document.querySelectorAll(".portrait__tag"));
  if (hero && finePointer && !reduceMotion) {
    hero.addEventListener("pointermove", function (e) {
      var nx = e.clientX / window.innerWidth - 0.5;
      var ny = e.clientY / window.innerHeight - 0.5;
      tags.forEach(function (t) {
        var depth = Number(t.dataset.depth) || 10;
        t.style.setProperty("--tx", (nx * depth).toFixed(1) + "px");
        t.style.setProperty("--ty", (ny * depth).toFixed(1) + "px");
      });
    });
  }

  /* ---------- Scroll-driven updates ---------- */
  var progressBar = document.querySelector(".scroll-progress");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var navSections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);
  var statementPin = document.querySelector(".statement__pin");

  function update() {
    var vh = window.innerHeight;
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - vh;

    scrollVelocity = y - lastScrollY;
    lastScrollY = y;

    if (progressBar) progressBar.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);

    // Active nav link
    var current = null;
    navSections.forEach(function (s) { if (s.getBoundingClientRect().top <= vh * 0.35) current = s; });
    if (y >= max - 2) current = navSections[navSections.length - 1];
    navLinks.forEach(function (a) {
      var active = current && a.getAttribute("href") === "#" + current.id;
      a.classList.toggle("is-active", !!active);
      if (active) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });

    if (reduceMotion) { updateJourney(vh); return; }

    // Hero parallax: 0 at the top, 1 once the hero has scrolled away
    if (hero) hero.style.setProperty("--hp", clamp(y / (hero.offsetHeight || vh), 0, 1).toFixed(3));

    // Statement words fill in while the block is pinned
    if (statementPin && statementWords.length) {
      var r = statementPin.getBoundingClientRect();
      var p = clamp((-r.top + vh * 0.25) / (r.height - vh * 0.6), 0, 1);
      var n = statementWords.length;
      statementWords.forEach(function (w, i) {
        var o = clamp(p * (n + 6) - i, 0, 1);
        w.style.setProperty("--o", (0.14 + o * 0.86).toFixed(2));
      });
    }

    updateJourney(vh);

    // Stacking cards: each card shrinks and dims as the next one slides over it
    var visible = stackItems.filter(function (li) { return !li.hidden; });
    visible.forEach(function (li, i) {
      var card = li.firstChild;
      var next = visible[i + 1];
      var s = 1, b = 1;
      if (next) {
        var top = li.getBoundingClientRect().top;
        var nextTop = next.getBoundingClientRect().top;
        var h = li.offsetHeight || 1;
        var overlap = clamp(1 - (nextTop - top) / h, 0, 1);
        s = 1 - overlap * 0.07;
        b = 1 - overlap * 0.12;
      }
      card.style.setProperty("--s", s.toFixed(4));
      card.style.setProperty("--b", b.toFixed(3));
    });
  }

  var ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { update(); ticking = false; });
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", function () { buildRoad(); requestUpdate(); });
  if ("ResizeObserver" in window && map) new ResizeObserver(function () { buildRoad(); requestUpdate(); }).observe(map);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { buildRoad(); update(); });
  buildRoad();
  update();

  /* ---------- Project modal ---------- */
  var modal = document.getElementById("project-modal");
  var modalContent = modal ? modal.querySelector(".modal__content") : null;
  var lastTrigger = null;

  function section(title, contentNode) {
    var s = el("section", "modal__section");
    s.appendChild(el("h3", null, title));
    s.appendChild(contentNode);
    return s;
  }

  function openModal(index, trigger) {
    var p = projects[index];
    if (!p || !modal || modal.hasAttribute("open")) return;
    lastTrigger = trigger || null;
    modalContent.textContent = "";

    var media = el("div", "modal__media");
    if (p.video && p.video.src) {
      // Muted, looping demo; autoplay only when the visitor allows motion
      media.classList.add("modal__media--video");
      var video = el("video");
      video.src = p.video.src;
      if (p.video.poster) video.poster = p.video.poster;
      video.muted = true;
      video.loop = true;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      var videoLabel = tr(p.video.label) || t("modal.video").replace("{title}", tr(p.title));
      video.setAttribute("aria-label", videoLabel);
      if (!reduceMotion) video.autoplay = true;
      // If the browser can't play it, show the still frame instead
      video.addEventListener("error", function () {
        if (p.video.poster) video.replaceWith(imageWithFallback(p.video.poster, videoLabel));
      });
      media.appendChild(video);
    } else {
      media.appendChild(imageWithFallback(p.image, tr(p.imageAlt)));
    }
    modalContent.appendChild(media);

    if (p.video && p.video.url) {
      var watch = el("a", "modal__watch", t("modal.watch") + " ");
      watch.href = p.video.url;
      watch.target = "_blank";
      watch.rel = "noopener";
      watch.insertAdjacentHTML("beforeend", ARROW_ICON);
      modalContent.appendChild(watch);
    }

    var body = el("div", "modal__body");
    body.appendChild(el("p", "modal__cat", categoryLabel(p.category)));
    var title = el("h2", "modal__title", tr(p.title));
    title.id = "modal-title";
    body.appendChild(title);

    if (p.problem) body.appendChild(section(t("modal.challenge"), el("p", null, tr(p.problem))));

    var steps = tr(p.approach);
    if (steps && steps.length) {
      var list = el("ol", "modal__steps");
      steps.forEach(function (step) { list.appendChild(el("li", null, step)); });
      body.appendChild(section(t("modal.approach"), list));
    }

    if (p.result) body.appendChild(section(t("modal.result"), el("p", null, tr(p.result))));

    if (p.tools && p.tools.length) {
      var tagList = el("ul", "tags");
      p.tools.forEach(function (tool) { tagList.appendChild(el("li", "tag", tr(tool))); });
      body.appendChild(section(t("modal.tools"), tagList));
    }

    if (p.gallery && p.gallery.length) {
      var gallery = el("div", "gallery");
      p.gallery.forEach(function (group) {
        var g = el("figure", "gallery__group");
        var strip = el("div", group.wide ? "gallery__strip gallery__strip--wide" : "gallery__strip");
        (group.images || []).forEach(function (im) {
          var img = el("img");
          img.src = im.src;
          img.alt = tr(im.alt) || "";
          img.loading = "lazy";
          img.decoding = "async";
          strip.appendChild(img);
        });
        g.appendChild(strip);
        var cap = el("figcaption", "gallery__caption");
        var groupTitle = tr(group.title);
        cap.appendChild(el("strong", null, groupTitle));
        if (group.note) cap.appendChild(el("span", null, tr(group.note)));
        if (group.url) {
          var view = el("a", "gallery__link", t("modal.viewCanva") + " ");
          view.href = group.url;
          view.target = "_blank";
          view.rel = "noopener";
          view.insertAdjacentHTML("beforeend", ARROW_ICON);
          view.setAttribute("aria-label", t("modal.viewCanvaLabel").replace("{title}", groupTitle));
          cap.appendChild(view);
        }
        g.appendChild(cap);
        gallery.appendChild(g);
      });
      body.appendChild(section(tr(p.galleryTitle) || t("modal.gallery"), gallery));
    }

    if (p.links && p.links.length) {
      var links = el("div", "modal__links");
      p.links.forEach(function (l) {
        var a = el("a", "btn btn--ghost btn--sm", tr(l.label));
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener";
        links.appendChild(a);
      });
      body.appendChild(section(t("modal.links"), links));
    }

    modalContent.appendChild(body);

    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal__inner").scrollTop = 0;
    modal.querySelector(".modal__close").focus();
  }

  function closeModal() {
    if (!modal || !modal.hasAttribute("open")) return;
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
      modal.dispatchEvent(new Event("close"));
    }
  }

  if (modal) {
    modal.querySelector(".modal__close").addEventListener("click", closeModal);

    // .modal__inner fills the dialog, so a click whose target is the dialog itself hit the backdrop
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });

    // Esc is handled natively by <dialog>; this covers browsers without it
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.hasAttribute("open") && typeof modal.showModal !== "function") closeModal();
    });

    modal.addEventListener("close", function () {
      modal.querySelectorAll("video").forEach(function (v) { v.pause(); });
      document.body.classList.remove("modal-open");
      if (lastTrigger) lastTrigger.focus();
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (n) {
    n.textContent = String(new Date().getFullYear());
  });

  /* ---------- Language toggle (EN / ID), no reload ---------- */
  function setLang(next) {
    lang = next;
    translatePage();
    wrapWords();
    applyTheme(root.getAttribute("data-theme") || "light");
    if (navToggle) navToggle.setAttribute("aria-label", t(navToggle.getAttribute("aria-expanded") === "true" ? "menu.close" : "menu.open"));
    renderProjects();
    marqueeRows.forEach(fillMarquee);
    buildRoad();
    update();
  }

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var next = lang === "en" ? "id" : "en";
      setLang(next);
      storageSet("lang", next);
    });
  }

  root.classList.remove("lang-pending");
})();
