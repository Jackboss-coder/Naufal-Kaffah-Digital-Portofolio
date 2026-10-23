/*
  Hero 3D scene: a rotating network globe around the profile photo, drawn on two
  canvases (behind and in front of the photo) so the photo sits inside the globe.
  Plain Canvas 2D with a small perspective projection — no libraries, works from file://.
*/
(function () {
  "use strict";

  var wrap = document.querySelector(".orbit");
  if (!wrap) return;

  var back = wrap.querySelector(".orbit__canvas--back");
  var front = wrap.querySelector(".orbit__canvas--front");
  var bctx = back && back.getContext("2d");
  var fctx = front && front.getContext("2d");
  if (!bctx || !fctx) return;

  var root = document.documentElement;
  var hero = wrap.closest(".hero") || wrap;
  var avatar = wrap.querySelector(".orbit__avatar");
  var chips = Array.prototype.slice.call(wrap.querySelectorAll(".orbit__chip"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Geometry ---------- */
  var small = window.innerWidth < 640;
  var N = small ? 170 : 280;
  var pts = [];
  var golden = Math.PI * (3 - Math.sqrt(5));
  for (var i = 0; i < N; i++) {
    var y = 1 - (i / (N - 1)) * 2;
    var r = Math.sqrt(1 - y * y);
    var th = golden * i;
    pts.push({
      x: Math.cos(th) * r, y: y, z: Math.sin(th) * r,
      hub: Math.random() < 0.07,
      phase: Math.random() * Math.PI * 2,
      sx: 0, sy: 0, sz: 0, s: 1
    });
  }

  // Connect near neighbours, at most 3 links per point for a light network
  var spacing = Math.sqrt((4 * Math.PI) / N);
  var maxD2 = Math.pow(spacing * 1.35, 2);
  var degree = new Array(N).fill(0);
  var edges = [];
  var adj = pts.map(function () { return []; });
  for (var a = 0; a < N; a++) {
    for (var b = a + 1; b < N; b++) {
      if (degree[a] >= 3 || degree[b] >= 3) continue;
      var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y, dz = pts[a].z - pts[b].z;
      if (dx * dx + dy * dy + dz * dz < maxD2) {
        adj[a].push(edges.length); adj[b].push(edges.length);
        edges.push([a, b]);
        degree[a]++; degree[b]++;
      }
    }
  }

  // Data packets travelling along the network
  var packets = [];
  for (var p = 0; p < (small ? 8 : 14); p++) {
    packets.push({ e: (Math.random() * edges.length) | 0, t: Math.random(), dir: 1, v: 0.35 + Math.random() * 0.4 });
  }

  // Orbit rings (tilt around X, roll around Z) and the label chips riding on them
  var rings = [
    { radius: 1.24, tiltX: 1.18, rollZ: 0.32, speed: 0.22 },
    { radius: 1.36, tiltX: 1.32, rollZ: -0.5, speed: -0.16 }
  ];
  chips.forEach(function (chip, idx) {
    chip._ring = rings[Number(chip.dataset.ring) || 0];
    chip._angle = (Number(chip.dataset.angle) || idx * 90) * Math.PI / 180;
  });

  /* ---------- State ---------- */
  var W = 0, H = 0, R = 0, cx = 0, cy = 0, avatarR = 0, dpr = 1;
  var rotY = 0.6, spin = 0, ringTime = 0;
  var tiltX = -0.28, tiltTarget = -0.28, yawOffset = 0, yawTarget = 0;
  var colors = {};
  var running = false, visible = true, last = 0;

  function readColors() {
    var cs = getComputedStyle(root);
    colors.dot = cs.getPropertyValue("--globe-dot").trim() || "147,180,232";
    colors.hub = cs.getPropertyValue("--globe-hub").trim() || "96,165,250";
  }

  function resize() {
    var rect = wrap.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    [back, front].forEach(function (c) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    });
    bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W / 2; cy = H / 2;
    R = Math.min(W, H) * 0.36;
    avatarR = avatar ? avatar.getBoundingClientRect().width / 2 : R * 0.6;
  }

  /* ---------- Projection ---------- */
  var CAM = 3.4;
  var cosY, sinY, cosX, sinX;

  function setRotation(yaw, pitch) {
    cosY = Math.cos(yaw); sinY = Math.sin(yaw);
    cosX = Math.cos(pitch); sinX = Math.sin(pitch);
  }

  function project(x, y, z, out) {
    var x1 = x * cosY + z * sinY;
    var z1 = -x * sinY + z * cosY;
    var y2 = y * cosX - z1 * sinX;
    var z2 = y * sinX + z1 * cosX;
    var s = CAM / (CAM - z2);
    out.sx = cx + x1 * R * s;
    out.sy = cy + y2 * R * s;
    out.sz = z2;
    out.s = s;
    return out;
  }

  // Front elements fade where they cross the photo, so the face stays readable
  function frontFade(x, y) {
    var d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
    var f = (d - avatarR * 0.55) / (avatarR * 0.6);
    return f < 0.12 ? 0.12 : f > 1 ? 1 : f;
  }

  var tmp = { sx: 0, sy: 0, sz: 0, s: 1 };
  var ringPt = { x: 0, y: 0, z: 0 };

  function ringPoint(ring, angle) {
    var x = Math.cos(angle) * ring.radius, y = 0, z = Math.sin(angle) * ring.radius;
    var y1 = y * Math.cos(ring.tiltX) - z * Math.sin(ring.tiltX);
    var z1 = y * Math.sin(ring.tiltX) + z * Math.cos(ring.tiltX);
    var x2 = x * Math.cos(ring.rollZ) - y1 * Math.sin(ring.rollZ);
    var y2 = x * Math.sin(ring.rollZ) + y1 * Math.cos(ring.rollZ);
    ringPt.x = x2; ringPt.y = y2; ringPt.z = z1;
    return ringPt;
  }

  /* ---------- Render ---------- */
  function draw(time) {
    bctx.clearRect(0, 0, W, H);
    fctx.clearRect(0, 0, W, H);

    // Globe rotates; rings only follow the pointer tilt, so chips keep their own orbit
    setRotation(rotY + yawOffset, tiltX);
    for (var i = 0; i < N; i++) {
      var pt = pts[i];
      project(pt.x, pt.y, pt.z, pt);
    }

    // Edges
    bctx.lineWidth = fctx.lineWidth = 1;
    for (var e = 0; e < edges.length; e++) {
      var p1 = pts[edges[e][0]], p2 = pts[edges[e][1]];
      var z = (p1.sz + p2.sz) / 2;
      var depth = (z + 1) / 2;
      if (z < 0) {
        bctx.strokeStyle = "rgba(" + colors.dot + "," + (0.05 + depth * 0.18).toFixed(3) + ")";
        bctx.beginPath(); bctx.moveTo(p1.sx, p1.sy); bctx.lineTo(p2.sx, p2.sy); bctx.stroke();
      } else {
        var fa = (0.18 + depth * 0.3) * frontFade((p1.sx + p2.sx) / 2, (p1.sy + p2.sy) / 2);
        fctx.strokeStyle = "rgba(" + colors.dot + "," + fa.toFixed(3) + ")";
        fctx.beginPath(); fctx.moveTo(p1.sx, p1.sy); fctx.lineTo(p2.sx, p2.sy); fctx.stroke();
      }
    }

    // Points
    for (var j = 0; j < N; j++) {
      var q = pts[j];
      var dpt = (q.sz + 1) / 2;
      var ctx = q.sz < 0 ? bctx : fctx;
      var alpha = q.sz < 0 ? 0.12 + dpt * 0.4 : (0.45 + dpt * 0.55) * frontFade(q.sx, q.sy);
      var size = (q.hub ? 2.4 : 1.4) * q.s;
      if (q.hub) {
        var pulse = 0.5 + 0.5 * Math.sin(time * 0.002 + q.phase);
        ctx.fillStyle = "rgba(" + colors.hub + "," + (alpha * 0.25 * pulse).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(q.sx, q.sy, size * (2.6 + pulse * 2), 0, 6.283); ctx.fill();
        ctx.fillStyle = "rgba(" + colors.hub + "," + alpha.toFixed(3) + ")";
      } else {
        ctx.fillStyle = "rgba(" + colors.dot + "," + alpha.toFixed(3) + ")";
      }
      ctx.beginPath(); ctx.arc(q.sx, q.sy, size, 0, 6.283); ctx.fill();
    }

    // Packets
    for (var k = 0; k < packets.length; k++) {
      var pk = packets[k];
      var ea = pts[edges[pk.e][0]], eb = pts[edges[pk.e][1]];
      var t = pk.dir > 0 ? pk.t : 1 - pk.t;
      var px = ea.sx + (eb.sx - ea.sx) * t, py = ea.sy + (eb.sy - ea.sy) * t;
      var pz = ea.sz + (eb.sz - ea.sz) * t;
      var pc = pz < 0 ? bctx : fctx;
      var pa = pz < 0 ? 0.35 : 0.95 * frontFade(px, py);
      pc.fillStyle = "rgba(" + colors.hub + "," + (pa * 0.3).toFixed(3) + ")";
      pc.beginPath(); pc.arc(px, py, 5, 0, 6.283); pc.fill();
      pc.fillStyle = "rgba(" + colors.hub + "," + pa.toFixed(3) + ")";
      pc.beginPath(); pc.arc(px, py, 2, 0, 6.283); pc.fill();
    }

    // Orbit rings, split into the halves behind and in front of the photo
    setRotation(yawOffset, tiltX + 0.28);
    rings.forEach(function (ring) {
      var steps = 120, prev = null;
      for (var s = 0; s <= steps; s++) {
        var rp = ringPoint(ring, (s / steps) * 6.283);
        project(rp.x, rp.y, rp.z, tmp);
        var cur = { x: tmp.sx, y: tmp.sy, z: tmp.sz };
        if (prev) {
          var mz = (prev.z + cur.z) / 2;
          var c = mz < 0 ? bctx : fctx;
          var ra = mz < 0 ? 0.12 : 0.32 * frontFade(cur.x, cur.y);
          c.strokeStyle = "rgba(" + colors.dot + "," + ra.toFixed(3) + ")";
          c.setLineDash([3, 5]);
          c.beginPath(); c.moveTo(prev.x, prev.y); c.lineTo(cur.x, cur.y); c.stroke();
          c.setLineDash([]);
        }
        prev = cur;
      }
    });

    // Chips (HTML labels) ride on the rings
    chips.forEach(function (chip) {
      var ring = chip._ring;
      var rp = ringPoint(ring, chip._angle + ringTime * ring.speed);
      project(rp.x, rp.y, rp.z, tmp);
      var depth = (tmp.sz + 1.4) / 2.8;
      chip.style.transform = "translate3d(" + tmp.sx.toFixed(1) + "px," + tmp.sy.toFixed(1) + "px,0) translate(-50%,-50%) scale(" + (0.78 + depth * 0.3).toFixed(3) + ")";
      chip.style.opacity = (0.4 + depth * 0.6).toFixed(2);
      chip.style.zIndex = tmp.sz < 0 ? 2 : 5;
      chip.classList.toggle("is-back", tmp.sz < 0);
    });
  }

  function step(now) {
    if (!running) return;
    var dt = Math.min((now - (last || now)) / 1000, 0.05);
    last = now;

    spin *= Math.pow(0.08, dt);
    rotY += (0.14 + spin) * dt;
    ringTime += dt;
    tiltX += (tiltTarget - tiltX) * Math.min(dt * 3, 1);
    yawOffset += (yawTarget - yawOffset) * Math.min(dt * 3, 1);

    for (var k = 0; k < packets.length; k++) {
      var pk = packets[k];
      pk.t += pk.v * dt;
      if (pk.t >= 1) {
        // Hop to a neighbouring edge from the node we arrived at
        var node = edges[pk.e][pk.dir > 0 ? 1 : 0];
        var options = adj[node];
        var next = options[(Math.random() * options.length) | 0];
        pk.dir = edges[next][0] === node ? 1 : -1;
        pk.e = next;
        pk.t = 0;
      }
    }

    draw(now);
    requestAnimationFrame(step);
  }

  function start() {
    if (running || reduce.matches || !visible || document.hidden) return;
    running = true;
    last = 0;
    requestAnimationFrame(step);
  }

  function stop() { running = false; }

  function renderStill() {
    draw(performance.now());
  }

  /* ---------- Interaction ---------- */
  hero.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    var rect = wrap.getBoundingClientRect();
    var nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    var ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    yawTarget = Math.max(-1, Math.min(1, nx)) * 0.35;
    tiltTarget = -0.28 + Math.max(-1, Math.min(1, ny)) * 0.25;
  });
  hero.addEventListener("pointerleave", function () { yawTarget = 0; tiltTarget = -0.28; });

  // Drag (or swipe sideways) to spin the globe
  var dragX = null;
  wrap.addEventListener("pointerdown", function (e) { dragX = e.clientX; });
  window.addEventListener("pointermove", function (e) {
    if (dragX === null) return;
    spin += (e.clientX - dragX) * 0.02;
    spin = Math.max(-4, Math.min(4, spin));
    dragX = e.clientX;
  });
  window.addEventListener("pointerup", function () { dragX = null; });
  window.addEventListener("pointercancel", function () { dragX = null; });

  /* ---------- Lifecycle ---------- */
  readColors();
  resize();
  renderStill();

  if ("ResizeObserver" in window) {
    new ResizeObserver(function () { resize(); if (!running) renderStill(); }).observe(wrap);
  } else {
    window.addEventListener("resize", function () { resize(); if (!running) renderStill(); });
  }

  new MutationObserver(function () { readColors(); if (!running) renderStill(); })
    .observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(wrap);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  var onMotionPref = function () { if (reduce.matches) { stop(); renderStill(); } else start(); };
  if (reduce.addEventListener) reduce.addEventListener("change", onMotionPref);

  start();
})();
