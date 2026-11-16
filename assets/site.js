/* EcoSeed shared components: header, footer, image slots, team cards, timeline, toggles, slider. */
(function () {
  "use strict";
  var S = window.SITE || {};

  var ICONS = {
    site: '<path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/>',
    seed: '<path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14z"/><path d="M5 19c3-4 6-7 10-9"/>',
    drone: '<circle cx="12" cy="12" r="2.5"/><path d="M9.8 10.2 6.5 6.5M14.2 10.2l3.3-3.7M9.8 13.8l-3.3 3.7M14.2 13.8l3.3 3.7"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>',
    monitor: '<path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"/><circle cx="12" cy="12" r="2.5"/>',
    flower: '<circle cx="12" cy="12" r="2"/><path d="M12 10c-2-3-2-6 0-7 2 1 2 4 0 7zM12 14c2 3 2 6 0 7-2-1-2-4 0-7zM10 12c-3 2-6 2-7 0 1-2 4-2 7 0zM14 12c3-2 6-2 7 0-1 2-4 2-7 0z"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.2c3 .2 5 2.2 5 5.3"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 15h9"/>',
    ruler: '<path d="M3 16 16 3l5 5L8 21z"/><path d="M7 12l2 2M10 9l2 2M13 6l2 2"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-5M12 16V8M16 16v-8"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    spark: '<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
    leaf: '<path d="M20 4C9 4 4 9 4 15a5 5 0 0 0 5 5c6 0 11-5 11-16z"/><path d="M4 21c3-6 7-10 12-13"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/>',
    video: '<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
    fun: '<circle cx="12" cy="12" r="9"/><path d="M8 14c1 2 2.4 3 4 3s3-1 4-3M9 9.5h.01M15 9.5h.01"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[name] || "") + "</svg>";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var PAGES = [
    ["index.html", "Home", "home"],
    ["about.html", "About Us", "about"],
    ["problem.html", "The Problem", "problem"],
    ["solution.html", "Our Solution", "solution"],
    ["prototype.html", "Prototype & Testing", "prototype"],
    ["research.html", "Research & Impact", "research"],
    ["contact.html", "Contact", "contact"]
  ];
  var main = document.querySelector("main[data-page]");
  var current = main ? main.getAttribute("data-page") : "";

  /* Header */
  var h = document.getElementById("site-header");
  if (h) {
    var links = PAGES.map(function (p) {
      return '<a href="' + p[0] + '"' + (p[2] === current ? ' aria-current="page"' : "") + ">" + esc(p[1]) + "</a>";
    }).join("");
    h.innerHTML =
      '<header class="site-header"><div class="container header-inner">' +
      '<a class="brand" href="index.html" aria-label="EcoSeed home"><span class="brand-mark">' + icon("seed") + "</span>EcoSeed</a>" +
      '<span class="status-pill" title="EcoSeed is a student prototype, not a finished product">Prototype stage</span>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span data-ic>' + icon("menu") + '</span><span>Menu</span></button>' +
      '<nav class="nav" id="site-nav" aria-label="Main">' + links + "</nav></div></header>";
    var btn = h.querySelector(".nav-toggle"), nav = h.querySelector(".nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.querySelector("[data-ic]").innerHTML = icon(open ? "close" : "menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { btn.click(); btn.focus(); }
    });
  }

  /* Footer */
  var f = document.getElementById("site-footer");
  if (f) {
    var soc = (S.social || []).map(function (s) {
      return s.url
        ? '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + "</a></li>"
        : '<li><span class="link-off" title="Not set yet. Add the URL in assets/config.js">' + esc(s.label) + " (not set)</span></li>";
    }).join("");
    var mail = S.contactEmail
      ? '<li><a href="mailto:' + esc(S.contactEmail) + '">' + esc(S.contactEmail) + "</a></li>"
      : '<li><span class="link-off" title="Add a shared team or school email in assets/config.js">Team email (not set)</span></li>';
    f.innerHTML =
      '<footer class="site-footer"><div class="container"><div class="footer-grid">' +
      '<div><a class="brand" href="index.html"><span class="brand-mark">' + icon("seed") + "</span>EcoSeed</a>" +
      '<p class="footer-title">EcoSeed — A FIRST LEGO League BIOGLOW Innovation Project</p>' +
      "<p>Developed by a student robotics team in Western Australia.</p></div>" +
      "<div><h4>Explore</h4><ul>" + PAGES.map(function (p) { return '<li><a href="' + p[0] + '">' + esc(p[1]) + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h4>Connect</h4><ul>" + mail + soc + "</ul></div></div>" +
      '<div class="footer-bottom"><span>EcoSeed is a prototype-stage student project. It is not a company or a commercial service.</span>' +
      "<span>No personal student contact details are published on this site.</span></div></div></footer>";
  }

  /* Icons in markup: <span data-icon="seed"></span> */
  document.querySelectorAll("[data-icon]").forEach(function (el) { el.innerHTML = icon(el.getAttribute("data-icon")); });

  /* Image slots */
  document.querySelectorAll("[data-slot]").forEach(function (el) {
    var key = el.getAttribute("data-slot");
    var src = S.images && S.images[key];
    var label = el.getAttribute("data-label") || "Image";
    var alt = (S.imageAlt && S.imageAlt[key]) || el.getAttribute("data-alt") || label;
    var cap = el.getAttribute("data-caption");
    function placeholder() {
      el.classList.remove("filled");
      el.innerHTML = '<div class="slot-ph">' + icon("image") + "<strong>" + esc(label) + "</strong><span>Placeholder. Add the real image path in</span><code>assets/config.js → images." + esc(key) + "</code></div>" + (cap ? '<span class="slot-cap">' + esc(cap) + "</span>" : "");
    }
    if (src) {
      var img = new Image();
      img.alt = alt; img.loading = "lazy"; img.decoding = "async";
      img.onerror = placeholder;
      img.src = src;
      el.classList.add("filled");
      el.innerHTML = "";
      el.appendChild(img);
      if (cap) { var c = document.createElement("span"); c.className = "slot-cap"; c.textContent = cap; el.appendChild(c); }
    } else { placeholder(); }
  });

  /* Team cards */
  var tg = document.querySelector("[data-render='team']");
  if (tg) {
    tg.innerHTML = (S.team || []).map(function (m) {
      var av = m.photo
        ? '<div class="avatar filled"><img src="' + esc(m.photo) + '" alt="' + esc(m.name) + '" loading="lazy"></div>'
        : '<div class="avatar" title="Photo placeholder">' + icon("person") + "</div>";
      return '<article class="card team-card flat">' + av + "<h3>" + esc(m.name) + '</h3><p class="role">' + esc(m.role) + "</p></article>";
    }).join("");
  }

  /* Timeline */
  document.querySelectorAll("[data-render='timeline']").forEach(function (ol) {
    ol.innerHTML = (S.timeline || []).map(function (t) {
      return '<li><span class="when">' + esc(t.when) + "</span><h3>" + esc(t.title) + "</h3><p>" + esc(t.text) + "</p></li>";
    }).join("");
  });

  /* Progress */
  document.querySelectorAll("[data-render='progress']").forEach(function (ul) {
    var names = { done: "Done", now: "In progress", next: "Up next", "": "Set status" };
    ul.innerHTML = (S.progress || []).map(function (p) {
      var st = p.state || "";
      return "<li><strong>" + esc(p.label) + '</strong><span class="state ' + (st || "unset") + '">' + names[st] + "</span></li>";
    }).join("");
  });

  /* Indicators */
  document.querySelectorAll("[data-render='indicators']").forEach(function (box) {
    box.innerHTML = (S.indicators || []).map(function (i) {
      var has = i.value !== null && i.value !== undefined && i.value !== "";
      return '<div class="stat"><div class="num' + (has ? "" : " empty") + '">' + (has ? esc(i.value) : "—") + '</div><div class="lab">' + esc(i.label) + (has ? "" : ' <span class="tag tag-example">Add figure</span>') + "</div></div>";
    }).join("");
  });

  /* Config tokens in text: <span data-cfg="teamName"></span> */
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = S[el.getAttribute("data-cfg")];
    el.textContent = v || "[Not set]";
    if (!v || /^\[/.test(v)) el.classList.add("ph");
  });

  /* Video link */
  var vl = document.querySelector("[data-video]");
  if (vl) {
    if (S.videoUrl) {
      vl.innerHTML = '<a class="btn btn-primary" href="' + esc(S.videoUrl) + '" target="_blank" rel="noopener noreferrer">Watch the demonstration video</a>';
    } else {
      vl.innerHTML = '<span class="tag tag-example">Video not added yet</span> <span class="muted small">Set <code>videoUrl</code> in assets/config.js.</span>';
    }
  }

  /* Toggle groups: buttons with data-target switch panels */
  document.querySelectorAll("[data-toggle-group]").forEach(function (g) {
    var btns = g.querySelectorAll("button[data-target]");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (o) {
          var on = o === b;
          o.setAttribute("aria-pressed", on ? "true" : "false");
          var p = document.getElementById(o.getAttribute("data-target"));
          if (p) p.hidden = !on;
        });
      });
    });
  });

  /* Before/after slider */
  document.querySelectorAll(".compare").forEach(function (c) {
    var r = c.querySelector("input[type=range]");
    function set() { c.style.setProperty("--pos", r.value + "%"); r.setAttribute("aria-valuetext", r.value + " percent restored view"); }
    r.addEventListener("input", set); set();
  });

  /* Reveal on scroll (content stays visible; only a small shift is animated) */
  var rv = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && rv.length) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add("in"); }); }
})();
