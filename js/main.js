(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

  /* ---------- Helpers ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }

  var FALLBACK_ICON =
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>';
  var ARROW_ICON =
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

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
      ph.setAttribute("aria-label", alt || "Project image placeholder");
      ph.innerHTML = FALLBACK_ICON;
      img.replaceWith(ph);
    });
    return img;
  }

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.querySelector(".theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  applyTheme(root.getAttribute("data-theme") || "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      storageSet("theme", next);
    });
  }

  // Follow system changes until the visitor picks a theme
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  var onSystemChange = function (e) {
    var saved = storageGet("theme");
    if (saved !== "light" && saved !== "dark") applyTheme(e.matches ? "dark" : "light");
  };
  if (systemDark.addEventListener) systemDark.addEventListener("change", onSystemChange);
  else if (systemDark.addListener) systemDark.addListener(onSystemChange);

  /* ---------- Mobile menu ---------- */
  var navToggle = document.querySelector(".nav__toggle");
  var navMenu = document.getElementById("nav-menu");

  function setMenu(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
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

  /* ---------- Hero name: split into letters for the 3D entrance ---------- */
  document.querySelectorAll("[data-split]").forEach(function (node) {
    var text = node.textContent.trim();
    node.setAttribute("aria-label", text);
    node.textContent = "";
    var i = 0;
    text.split(" ").forEach(function (word, w) {
      if (w > 0) node.appendChild(document.createTextNode(" "));
      var wordEl = el("span", "word");
      wordEl.setAttribute("aria-hidden", "true");
      word.split("").forEach(function (ch) {
        var c = el("span", "char", ch);
        c.style.setProperty("--i", i++);
        wordEl.appendChild(c);
      });
      node.appendChild(wordEl);
    });
  });

  /* ---------- Tool ring: spread items evenly around the circle ---------- */
  document.querySelectorAll(".tool-ring__track").forEach(function (track) {
    var items = track.children;
    track.style.setProperty("--n", items.length);
    Array.prototype.forEach.call(items, function (li, i) { li.style.setProperty("--i", i); });
  });

  /* ---------- 3D tilt ---------- */
  function bindTilt(node) {
    if (!finePointer.matches || reduceMotion.matches || node._tilt) return;
    node._tilt = true;
    var max = Number(node.dataset.tiltMax) || 9;

    node.addEventListener("pointermove", function (e) {
      var r = node.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      node.classList.add("is-tilting");
      node.style.setProperty("--rx", ((0.5 - py) * max).toFixed(2) + "deg");
      node.style.setProperty("--ry", ((px - 0.5) * max).toFixed(2) + "deg");
      node.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      node.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    });
    node.addEventListener("pointerleave", function () {
      node.classList.remove("is-tilting");
      node.style.setProperty("--rx", "0deg");
      node.style.setProperty("--ry", "0deg");
    });
  }

  document.querySelectorAll("[data-tilt]").forEach(bindTilt);

  /* ---------- Count-up numbers ---------- */
  function countUp(node) {
    var raw = node.textContent.trim();
    var match = raw.match(/^(\d+)(.*)$/);
    if (!match || reduceMotion.matches) return;
    var target = Number(match[1]), suffix = match[2];
    var start = null, duration = 1400;
    node.textContent = "0" + suffix;
    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      node.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = "IntersectionObserver" in window && !reduceMotion.matches
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll("[data-countup]").forEach(countUp);
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    : null;

  function observeReveal(nodes) {
    nodes.forEach(function (n) {
      if (revealObserver) revealObserver.observe(n);
      else n.classList.add("is-visible");
    });
  }

  /* ---------- Projects gallery ---------- */
  var grid = document.querySelector(".project-grid");
  var filtersWrap = document.querySelector(".filters");
  var CATEGORY_ORDER = ["AI & Automation", "Data & Analysis", "Content Design"];

  function renderCard(project, index) {
    var li = el("li", "reveal");
    li.dataset.category = project.category;
    li.style.setProperty("--d", index % 3);

    var card = el("article", "project-card");
    card.setAttribute("data-tilt", "");

    var media = el("div", "project-card__media");
    media.appendChild(imageWithFallback(project.image, project.imageAlt));
    card.appendChild(media);

    var body = el("div", "project-card__body");
    body.appendChild(el("p", "project-card__cat", project.category));

    var h3 = el("h3", "project-card__title");
    var open = el("button", "project-card__open", project.title);
    open.type = "button";
    open.setAttribute("aria-haspopup", "dialog");
    open.addEventListener("click", function () { openModal(index, open); });
    h3.appendChild(open);
    body.appendChild(h3);

    body.appendChild(el("p", "project-card__summary", project.summary));

    var tags = el("ul", "tags");
    tags.setAttribute("aria-label", "Tools");
    (project.tools || []).forEach(function (t) { tags.appendChild(el("li", "tag", t)); });
    body.appendChild(tags);

    var more = el("span", "project-card__more");
    more.setAttribute("aria-hidden", "true");
    more.innerHTML = "View details " + ARROW_ICON;
    body.appendChild(more);

    // The whole card opens the modal; the title button keeps it keyboard-accessible
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".project-card__open")) openModal(index, open);
    });

    card.appendChild(body);
    li.appendChild(card);
    return li;
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
      var btn = el("button", "filter-btn", cat);
      btn.type = "button";
      btn.dataset.filter = cat;
      btn.setAttribute("aria-pressed", String(cat === "All"));
      var c = el("span", "filter-btn__count", String(count));
      c.setAttribute("aria-hidden", "true");
      btn.appendChild(c);
      btn.addEventListener("click", function () { applyFilter(cat); });
      filtersWrap.appendChild(btn);
    });
  }

  var filterTimer;
  function applyFilter(cat) {
    filtersWrap.querySelectorAll(".filter-btn").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.filter === cat));
    });

    var items = Array.prototype.slice.call(grid.children);
    var match = function (li) { return cat === "All" || li.dataset.category === cat; };
    var delay = reduceMotion.matches ? 0 : 260;

    clearTimeout(filterTimer);
    items.forEach(function (li) {
      li.style.setProperty("--d", 0);
      li.classList.add("is-visible");
      if (!li.hidden && !match(li)) li.classList.add("is-hiding");
    });

    filterTimer = setTimeout(function () {
      items.forEach(function (li) {
        if (match(li)) {
          var wasHidden = li.hidden;
          li.hidden = false;
          if (wasHidden) {
            li.classList.add("is-hiding");
            void li.offsetWidth; // restart transition
          }
          li.classList.remove("is-hiding");
        } else {
          li.hidden = true;
          li.classList.remove("is-hiding");
        }
      });
    }, delay);
  }

  if (grid && filtersWrap) {
    projects.forEach(function (p, i) {
      var li = renderCard(p, i);
      grid.appendChild(li);
      bindTilt(li.firstChild);
    });
    renderFilters();
  }

  document.querySelectorAll('[data-count="projects"]').forEach(function (n) {
    n.textContent = String(projects.length);
  });

  observeReveal(Array.prototype.slice.call(document.querySelectorAll(".reveal")));

  /* ---------- Scroll-driven motion: progress bar, active link, timeline ---------- */
  var progressBar = document.querySelector(".scroll-progress");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var navSections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  var timeline = document.querySelector(".timeline");
  var timelineItems = timeline ? Array.prototype.slice.call(timeline.querySelectorAll(".timeline__item")) : [];
  var timelineBar = null;
  if (timeline) {
    timelineBar = el("span", "timeline__progress");
    timelineBar.setAttribute("aria-hidden", "true");
    timeline.insertBefore(timelineBar, timeline.firstChild);
  }

  function onScroll() {
    var doc = document.documentElement;
    var vh = window.innerHeight;
    var max = doc.scrollHeight - vh;

    if (progressBar) progressBar.style.setProperty("--progress", max > 0 ? (window.scrollY / max).toFixed(4) : 0);

    // Active nav link; the last section may never reach the line, so pick it once the page bottoms out
    var current = null;
    navSections.forEach(function (s) { if (s.getBoundingClientRect().top <= vh * 0.35) current = s; });
    if (window.scrollY >= max - 2) current = navSections[navSections.length - 1];
    navLinks.forEach(function (a) {
      var active = current && a.getAttribute("href") === "#" + current.id;
      a.classList.toggle("is-active", !!active);
      if (active) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });

    // Timeline line fills up to the reading line; passed items light up
    if (timeline) {
      var line = vh * 0.6;
      var r = timeline.getBoundingClientRect();
      var p = Math.max(0, Math.min(1, (line - r.top) / r.height));
      timelineBar.style.setProperty("--p", p.toFixed(4));
      timelineItems.forEach(function (item) {
        item.classList.toggle("is-passed", item.getBoundingClientRect().top + 28 <= line);
      });
    }
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

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
    media.appendChild(imageWithFallback(p.image, p.imageAlt));
    modalContent.appendChild(media);

    var body = el("div", "modal__body");
    body.appendChild(el("p", "project-card__cat", p.category));
    var title = el("h2", "modal__title", p.title);
    title.id = "modal-title";
    body.appendChild(title);

    if (p.problem) body.appendChild(section("The challenge", el("p", null, p.problem)));

    if (p.approach && p.approach.length) {
      var list = el("ul", "check-list");
      p.approach.forEach(function (step) { list.appendChild(el("li", null, step)); });
      body.appendChild(section("What I did", list));
    }

    if (p.result) body.appendChild(section("The result", el("p", null, p.result)));

    if (p.tools && p.tools.length) {
      var tags = el("ul", "tags");
      p.tools.forEach(function (t) { tags.appendChild(el("li", "tag", t)); });
      body.appendChild(section("Tools", tags));
    }

    if (p.links && p.links.length) {
      var links = el("div", "modal__links");
      p.links.forEach(function (l) {
        var a = el("a", "btn btn--ghost btn--sm", l.label);
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener";
        links.appendChild(a);
      });
      body.appendChild(section("Links", links));
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
      document.body.classList.remove("modal-open");
      if (lastTrigger) lastTrigger.focus();
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (n) {
    n.textContent = String(new Date().getFullYear());
  });
})();
