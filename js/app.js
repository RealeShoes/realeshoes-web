/* Realeshoes — catálogo, filtros y carrusel. Los productos se cargan en js/productos.js */
(function () {
  "use strict";

  /* ---------- configuración ---------- */
  var WA = "5491156640318";          // número de WhatsApp, sin + ni espacios
  var CATS = {
    zapatillas: { label: "Zapatillas" },
    botines:    { label: "Botines" }
  };

  var items = (window.PRODUCTOS || []).map(function (p) {
    return {
      id: p.codigo || "", cat: CATS[p.seccion] ? p.seccion : "zapatillas",
      brand: p.marca || "", model: p.modelo || "", sizes: p.talle || "",
      list: Number(p.precioLista) || null, off: Number(p.descuento) || 0,
      tag: p.etiqueta || "", photo: p.foto || "", sold: !!p.vendido
    };
  });

  var ui = { cat: routeCat(), brand: "Todas", size: "Todos", sort: "dest", avail: false };

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function money(n) { if (n == null || n === "" || isNaN(n)) return ""; return "$ " + Math.round(Number(n)).toLocaleString("es-AR"); }
  function finalPrice(it) { if (!it.list) return null; return Math.round(it.list * (1 - Math.min(Math.max(it.off, 0), 95) / 100)); }
  function filled(it) { return !!(it.model || it.brand || it.photo || it.list); }
  function routeCat() { var h = (location.hash || "").replace("#", ""); return CATS[h] ? h : "zapatillas"; }
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  /* "42" → ["42"] · "40, 41" → ["40","41"] · "40 al 43" o "40-43" → ["40","41","42","43"] */
  function parseSizes(str) {
    var s = String(str || "").replace(/,/g, "."), out = [];
    var range = s.match(/(\d+(?:\.\d)?)\s*(?:al|a|-|–)\s*(\d+(?:\.\d)?)/i);
    if (range) { var a = parseFloat(range[1]), b = parseFloat(range[2]); if (b > a && b - a <= 15) { for (var n = a; n <= b; n++) out.push(String(n)); return out; } }
    (s.match(/\d+(?:\.5)?/g) || []).forEach(function (n) { if (out.indexOf(n) < 0) out.push(n); });
    return out;
  }
  function waLink(text) { return "https://wa.me/" + WA + (text ? "?text=" + encodeURIComponent(text) : ""); }
  function maxOff() { var m = 0; items.forEach(function (it) { if (filled(it) && !it.sold && it.list && it.off > m) m = it.off; }); return Math.round(m); }

  var I = {
    wa: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z"/></svg>',
<<<<<<< HEAD
=======
    zoom: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/></svg>',
>>>>>>> 3cded1db02b0c7f585f99c3bb9d19e7cae5f1d0f
    shoe: '<svg width="56" height="32" viewBox="0 0 44 26" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 20c0-6 2-12 6-14l6 5c3 2 7 3 12 3 6 0 12 2 14 6v3H2z"/><path d="M2 23h40"/><path d="M14 11l3-3M17 13l3-3M20 14l3-3"/></svg>'
  };

  /* ---------- carrusel ---------- */
  var track = document.getElementById("track"), dots = document.getElementById("dots"), cur = 0, timer = null, paused = false;
  function go(i) { var n = track.children.length; cur = (i + n) % n; track.scrollTo({ left: cur * track.clientWidth }); paintDots(); }
  function paintDots() {
    Array.prototype.forEach.call(dots.children, function (d, i) { d.setAttribute("aria-current", i === cur ? "true" : "false"); });
    dots.style.color = (cur === 0 || cur === 2) ? "#fff" : "#111";
  }
  function startAuto() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(function () { if (!paused && !document.hidden) go(cur + 1); }, 5500);
  }
  (function initCarousel() {
    var t = null, promo = track.parentNode;
    track.addEventListener("scroll", function () {
      clearTimeout(t);
      t = setTimeout(function () { var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); if (i !== cur) { cur = i; paintDots(); } }, 80);
    }, { passive: true });
    promo.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") paused = true; });
    promo.addEventListener("pointerleave", function () { paused = false; });
    promo.addEventListener("touchstart", function () { paused = true; clearTimeout(promo._r); }, { passive: true });
    promo.addEventListener("touchend", function () { promo._r = setTimeout(function () { paused = false; }, 6000); }, { passive: true });
    promo.addEventListener("focusin", function () { paused = true; });
    promo.addEventListener("focusout", function () { paused = false; });
    promo.addEventListener("click", function (e) {
      var d = e.target.closest("[data-dot]"); if (d) { go(+d.dataset.dot); return; }
      var s = e.target.closest("[data-step]"); if (s) go(cur + +s.dataset.step);
    });
    window.addEventListener("resize", function () { track.scrollLeft = cur * track.clientWidth; });
    paintDots(); startAuto();
  })();

  /* ---------- catálogo ---------- */
  function inCat() { return items.filter(function (it) { return it.cat === ui.cat; }); }
  function visible() {
    var list = inCat().filter(filled);
    if (ui.brand !== "Todas") list = list.filter(function (it) { return it.brand.trim().toLowerCase() === ui.brand.toLowerCase(); });
    if (ui.size !== "Todos") list = list.filter(function (it) { return parseSizes(it.sizes).indexOf(ui.size) > -1; });
    if (ui.avail) list = list.filter(function (it) { return !it.sold; });
    var fp = finalPrice;
    if (ui.sort === "asc") list.sort(function (a, b) { return (fp(a) == null ? 1e15 : fp(a)) - (fp(b) == null ? 1e15 : fp(b)); });
    if (ui.sort === "desc") list.sort(function (a, b) { return (fp(b) || -1) - (fp(a) || -1); });
    if (ui.sort === "off") list.sort(function (a, b) { return b.off - a.off; });
    if (ui.sort === "dest") list.sort(function (a, b) { return (a.sold ? 1 : 0) - (b.sold ? 1 : 0); });
    return list;
  }
  function brandsIn() {
    var seen = {}, out = [];
    inCat().forEach(function (it) { var b = it.brand.trim(); if (filled(it) && b && !seen[b.toLowerCase()]) { seen[b.toLowerCase()] = 1; out.push(b); } });
    return out.sort();
  }

  function sizesIn() {
    var all = [];
    inCat().forEach(function (it) { if (filled(it) && !it.sold) parseSizes(it.sizes).forEach(function (z) { if (all.indexOf(z) < 0) all.push(z); }); });
    return all.sort(function (a, b) { return parseFloat(a) - parseFloat(b); });
  }

  function card(it) {
    var fin = finalPrice(it), off = Math.round(it.off), hasOff = off > 0 && it.list;
    var name = (it.brand + " " + it.model).trim() || CATS[it.cat].label;
    var tag = it.sold ? '<p class="tag gray">Vendido</p>' : (it.tag ? '<p class="tag">' + esc(it.tag) + '</p>' : (hasOff ? '<p class="tag">Oferta</p>' : ''));
    var msg = "Hola Realeshoes! Quiero consultar por este par:\n"
      + "• Código: " + it.id + "\n"
      + "• " + CATS[it.cat].label + ": " + name + "\n"
      + (it.sizes ? "• Talle: " + it.sizes + "\n" : "")
      + (fin ? "• Precio: " + money(fin) + (hasOff ? " (" + off + "% off)" : "") + "\n" : "")
      + "¿Está disponible?";
    return '<article class="card' + (it.sold ? ' sold' : '') + '">'
<<<<<<< HEAD
      + '<div class="ph">' + (it.photo ? '<img src="' + esc(it.photo) + '" alt="' + esc(name) + '" loading="lazy">' : '<div class="empty">' + I.shoe + 'Foto próximamente</div>')
=======
      + '<div class="ph"' + (it.photo ? ' data-zoom="' + esc(it.id) + '" role="button" tabindex="0" aria-label="Ampliar foto de ' + esc(name) + '"' : '') + '>' + (it.photo ? '<img src="' + esc(it.photo) + '" alt="' + esc(name) + '" loading="lazy"><span class="zoomhint" aria-hidden="true">' + I.zoom + '</span>' : '<div class="empty">' + I.shoe + 'Foto próximamente</div>')
>>>>>>> 3cded1db02b0c7f585f99c3bb9d19e7cae5f1d0f
      + (hasOff && !it.sold ? '<span class="badge">-' + off + '%</span>' : '') + '</div>'
      + '<div class="info">' + tag
      + '<h3 class="name">' + esc(it.model || name) + '</h3>'
      + '<p class="sub">' + esc(it.brand || CATS[it.cat].label) + ' · <b>Talle ' + esc(it.sizes || "a consultar") + '</b></p>'
      + '<p class="prices">' + (hasOff ? '<s>' + money(it.list) + '</s>' : '') + '<b>' + (fin ? money(fin) : 'Consultar precio') + '</b></p>'
      + (hasOff ? '<p class="off">' + off + '% de descuento</p>' : '')
      + '<span class="grow"></span>'
      + (it.sold ? '<span class="ask off2">Sin stock</span>' : '<a class="ask" href="' + waLink(msg) + '" target="_blank" rel="noopener">' + I.wa + 'Consultar</a>')
      + '</div></article>';
  }

  function render() {
    var list = visible(), nF = inCat().filter(filled).length, lab = CATS[ui.cat].label;
    var h = '<div class="cat-head"><h2>' + lab + '</h2><span class="n">' + list.length + ' ' + (list.length === 1 ? 'resultado' : 'resultados') + '</span></div>';
    if (nF) {
      var sizes = sizesIn(), any = ui.brand !== "Todas" || ui.size !== "Todos" || ui.avail;
      h += '<div class="filters">'
        + '<div class="frow"><span>Marca</span><div class="chips">' + ["Todas"].concat(brandsIn()).map(function (b) { return '<button class="chip" type="button" data-brand="' + esc(b) + '" aria-pressed="' + (ui.brand === b) + '">' + esc(b) + '</button>'; }).join('') + '</div></div>'
        + (sizes.length ? '<div class="frow"><span>Talle</span><div class="chips">' + ["Todos"].concat(sizes).map(function (z) { return '<button class="chip size" type="button" data-size="' + esc(z) + '" aria-pressed="' + (ui.size === z) + '">' + esc(z) + '</button>'; }).join('') + '</div></div>' : '')
        + '<div class="fbar"><select class="sel" id="sort" aria-label="Ordenar">'
        + [["dest", "Destacados"], ["off", "Mayor descuento"], ["asc", "Menor precio"], ["desc", "Mayor precio"]].map(function (o) { return '<option value="' + o[0] + '"' + (ui.sort === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('')
        + '</select>'
        + '<label class="check"><input type="checkbox" id="avail"' + (ui.avail ? ' checked' : '') + '> Solo disponibles</label>'
        + (any ? '<button class="clear" type="button" data-clear>Limpiar filtros</button>' : '')
        + '</div></div>';
    }
    h += '<div class="grid">';
    if (list.length) h += list.map(card).join('');
    else if (nF) h += '<div class="none"><h3>No hay pares con ese filtro</h3><p>Probá con otro talle u otra marca.</p><button class="pill dark" type="button" data-clear>Limpiar filtros</button></div>';
    else h += '<div class="none"><h3>Pronto vas a ver ' + lab.toLowerCase() + ' acá</h3><p>Estamos cargando el stock. Consultanos qué modelos y talles tenemos.</p><a class="pill dark" href="' + waLink("Hola Realeshoes! ¿Qué " + lab.toLowerCase() + " tienen disponibles?") + '" target="_blank" rel="noopener">' + I.wa + 'Consultar por WhatsApp</a></div>';
    h += '</div>';

    var box = document.getElementById("cat");
    var f = document.activeElement && box.contains(document.activeElement) ? document.activeElement.id : null;
    var sel = f && document.activeElement.selectionStart;
    box.innerHTML = h;
    if (f) { var el = document.getElementById(f); if (el) { el.focus({ preventScroll: true }); try { if (sel != null) el.setSelectionRange(sel, sel); } catch (e) {} } }
    chrome();
  }

  function chrome() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-nav]"), function (a) { a.setAttribute("aria-current", a.dataset.nav === ui.cat ? "page" : "false"); });
    Object.keys(CATS).forEach(function (k) {
      var n = items.filter(function (it) { return it.cat === k && filled(it) && !it.sold; }).length;
      Array.prototype.forEach.call(document.querySelectorAll('[data-count="' + k + '"]'), function (s) { s.textContent = n ? "(" + n + ")" : ""; });
    });
    var m = maxOff(), st = document.getElementById("sale-title");
    if (st) st.textContent = m > 0 ? "Hasta " + m + "% off" : "Precios de oferta";
  }

  /* ---------- eventos ---------- */
  var app = document.body;
  app.addEventListener("input", function (e) { if (e.target.id === "sp-q") searchRender(); });
  app.addEventListener("change", function (e) {
    if (e.target.id === "sort") { ui.sort = e.target.value; render(); }
    if (e.target.id === "avail") { ui.avail = e.target.checked; render(); }
  });
  app.addEventListener("click", function (e) {
    var a = e.target.closest("[data-go]");
    if (a && a.dataset.go === "sale") { ui.sort = "off"; if (routeCat() === ui.cat) { render(); } }
    var b = e.target.closest("[data-brand]");
    if (b) { ui.brand = b.dataset.brand; render(); return; }
    var z = e.target.closest("[data-size]");
    if (z) { ui.size = z.dataset.size; render(); return; }
    if (e.target.closest("[data-clear]")) { ui.brand = "Todas"; ui.size = "Todos"; ui.avail = false; render(); return; }
    var sg = e.target.closest("[data-sugg]");
    if (sg) { qIn.value = sg.dataset.sugg; searchRender(); qIn.focus(); return; }
    if (e.target.closest("#open-search")) { openSearch(); return; }
    if (e.target.closest("#close-search")) { closeSearch(); return; }
<<<<<<< HEAD
=======
    var zt = e.target.closest("[data-zoom]");
    if (zt && !e.target.closest(".ask")) { openZoom(zt.dataset.zoom, zt); return; }
>>>>>>> 3cded1db02b0c7f585f99c3bb9d19e7cae5f1d0f
  });
  window.addEventListener("hashchange", function () {
    if ((location.hash || "") === "#envios") return;
    var c = routeCat();
    if (c !== ui.cat) { ui.cat = c; ui.brand = "Todas"; ui.size = "Todos"; }
    render();
    var el = document.getElementById("catalogo"); if (el && location.hash) el.scrollIntoView({ block: "start" });
  });

  /* ---------- buscador (lupa) ---------- */
  var panel = document.getElementById("search-panel"), qIn = document.getElementById("sp-q"), res = document.getElementById("sp-results"), opener = document.getElementById("open-search");
  function openSearch() {
    panel.hidden = false; document.body.classList.add("sp-open"); opener.setAttribute("aria-expanded", "true");
    searchRender(); setTimeout(function () { qIn.focus(); }, 30);
  }
  function closeSearch() {
    panel.hidden = true; document.body.classList.remove("sp-open"); opener.setAttribute("aria-expanded", "false"); opener.focus();
  }
  function searchRender() {
    var words = norm(qIn.value).split(/\s+/).filter(Boolean);
    var pool = items.filter(filled);
    if (!words.length) {
      var brands = [], seen = {};
      pool.forEach(function (it) { var b = it.brand.trim(); if (b && !seen[b.toLowerCase()]) { seen[b.toLowerCase()] = 1; brands.push(b); } });
      res.innerHTML = '<p class="sp-hint">Escribí un modelo, una marca, un talle o el código del par (por ejemplo Z07).</p>'
        + (brands.length ? '<div class="sp-sugg">' + brands.sort().map(function (b) { return '<button class="chip" type="button" data-sugg="' + esc(b) + '">' + esc(b) + '</button>'; }).join('') + '</div>' : '');
      return;
    }
    var hits = pool.filter(function (it) {
      var hay = norm([it.brand, it.model, it.id, CATS[it.cat].label, it.tag].join(" ")), sz = parseSizes(it.sizes);
      return words.every(function (w) { return hay.indexOf(w) > -1 || sz.indexOf(w) > -1 || (w === "oferta" && it.off > 0); });
    });
    hits.sort(function (a, b) { return (a.sold ? 1 : 0) - (b.sold ? 1 : 0); });
    if (!hits.length) {
      res.innerHTML = '<div class="none"><h3>No encontramos “' + esc(qIn.value.trim()) + '”</h3><p>Puede que lo tengamos sin cargar todavía. Consultanos por WhatsApp.</p><a class="pill dark" href="' + waLink("Hola Realeshoes! ¿Tienen " + qIn.value.trim() + "?") + '" target="_blank" rel="noopener">' + I.wa + 'Consultar</a></div>';
      return;
    }
    var h = '<p class="sp-hint">' + hits.length + (hits.length === 1 ? ' par encontrado' : ' pares encontrados') + '</p>';
    Object.keys(CATS).forEach(function (k) {
      var g = hits.filter(function (it) { return it.cat === k; });
      if (g.length) h += '<h2 class="sp-sec">' + CATS[k].label + '</h2><div class="grid">' + g.map(card).join('') + '</div>';
    });
    res.innerHTML = h;
  }
  document.addEventListener("keydown", function (e) {
<<<<<<< HEAD
=======
    if (e.key === "Escape" && !lb.hidden) { closeZoom(); return; }
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-zoom]")) { e.preventDefault(); openZoom(e.target.dataset.zoom, e.target); return; }
>>>>>>> 3cded1db02b0c7f585f99c3bb9d19e7cae5f1d0f
    if (e.key === "Escape" && !panel.hidden) closeSearch();
    if (e.key === "/" && panel.hidden && !/input|select|textarea/i.test((document.activeElement || {}).tagName || "")) { e.preventDefault(); openSearch(); }
  });
  qIn.addEventListener("keydown", function (e) { if (e.key === "Enter") qIn.blur(); });

<<<<<<< HEAD
=======
  /* ---------- zoom de fotos (tipo Mercado Libre) ---------- */
  var lb = document.createElement("div");
  lb.className = "lb"; lb.hidden = true;
  lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Foto ampliada");
  lb.innerHTML = '<div class="lb-top"><span class="lb-code"></span><button class="lb-x" type="button" aria-label="Cerrar">&times;</button></div>'
    + '<div class="lb-stage"><img class="lb-img" alt=""></div>'
    + '<p class="lb-hint"></p>'
    + '<div class="lb-info"></div>';
  document.body.appendChild(lb);
  var stage = lb.querySelector(".lb-stage"), zimg = lb.querySelector(".lb-img"), lastFocus = null;
  var fine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var Z = { s: 1, x: 0, y: 0 }, MAX = 4, ptrs = {}, pinch = null, drag = null, lastTap = 0;

  function apply(anim) {
    zimg.style.transition = anim ? "transform .2s ease" : "none";
    zimg.style.transform = "translate(" + Z.x + "px," + Z.y + "px) scale(" + Z.s + ")";
    stage.classList.toggle("zoomed", Z.s > 1.01);
  }
  function clamp() {
    var r = stage.getBoundingClientRect(), mx = (r.width * (Z.s - 1)) / 2, my = (r.height * (Z.s - 1)) / 2;
    Z.x = Math.max(-mx, Math.min(mx, Z.x)); Z.y = Math.max(-my, Math.min(my, Z.y));
  }
  function zoomAt(s, cx, cy) {            // cx, cy: punto relativo al centro del escenario
    s = Math.max(1, Math.min(MAX, s));
    var k = s / Z.s; Z.x = cx - (cx - Z.x) * k; Z.y = cy - (cy - Z.y) * k; Z.s = s;
    if (s === 1) { Z.x = 0; Z.y = 0; }
    clamp();
  }
  function rel(e) { var r = stage.getBoundingClientRect(); return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2, w: r.width, h: r.height }; }
  function reset() { Z = { s: 1, x: 0, y: 0 }; apply(false); }

  function openZoom(id, from) {
    var it = items.filter(function (x) { return x.id === id; })[0]; if (!it || !it.photo) return;
    var fin = finalPrice(it), off = Math.round(it.off), hasOff = off > 0 && it.list;
    var name = (it.brand + " " + it.model).trim();
    lastFocus = from || document.activeElement;
    zimg.src = it.photo; zimg.alt = name;
    lb.querySelector(".lb-code").textContent = CATS[it.cat].label + " · Código " + it.id;
    lb.querySelector(".lb-hint").textContent = fine ? "Pasá el mouse sobre la foto para ver los detalles" : "Tocá dos veces o pellizcá para hacer zoom";
    var msg = "Hola Realeshoes! Quiero consultar por este par:\n• Código: " + it.id + "\n• " + CATS[it.cat].label + ": " + name + "\n"
      + (it.sizes ? "• Talle: " + it.sizes + "\n" : "") + (fin ? "• Precio: " + money(fin) + (hasOff ? " (" + off + "% off)" : "") + "\n" : "") + "¿Está disponible?";
    lb.querySelector(".lb-info").innerHTML = '<div class="lb-txt"><b>' + esc(name || CATS[it.cat].label) + '</b><span>Talle ' + esc(it.sizes || "a consultar") + ' · '
      + (hasOff ? '<s>' + money(it.list) + '</s> ' : '') + '<strong>' + (fin ? money(fin) : 'Consultar precio') + '</strong>' + (hasOff ? ' <em>' + off + '% OFF</em>' : '') + '</span></div>'
      + (it.sold ? '<span class="ask off2">Sin stock</span>' : '<a class="ask" href="' + waLink(msg) + '" target="_blank" rel="noopener">' + I.wa + 'Consultar</a>');
    reset(); lb.hidden = false; document.body.classList.add("sp-open");
    lb.querySelector(".lb-x").focus();
  }
  function closeZoom() {
    lb.hidden = true; reset();
    if (panel.hidden) document.body.classList.remove("sp-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  lb.addEventListener("click", function (e) { if (e.target.closest(".lb-x") || e.target === lb) closeZoom(); });

  /* Compu: lupa que sigue al mouse */
  stage.addEventListener("mousemove", function (e) {
    if (!fine) return;
    var p = rel(e); Z.s = 2.5; Z.x = -p.x * 1.5; Z.y = -p.y * 1.5; clamp(); apply(false);
  });
  stage.addEventListener("mouseleave", function () { if (fine) { reset(); } });

  /* Celular: doble toque, pellizco y arrastre */
  stage.addEventListener("pointerdown", function (e) {
    if (fine) return;
    stage.setPointerCapture(e.pointerId); ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(ptrs);
    if (ids.length === 2) {
      var a = ptrs[ids[0]], b = ptrs[ids[1]];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: Z.s }; drag = null;
    } else if (ids.length === 1) {
      var now = Date.now();
      if (now - lastTap < 300) { var p = rel(e); zoomAt(Z.s > 1.01 ? 1 : 2.5, p.x, p.y); apply(true); lastTap = 0; drag = null; return; }
      lastTap = now; drag = { x: e.clientX, y: e.clientY, tx: Z.x, ty: Z.y };
    }
  });
  stage.addEventListener("pointermove", function (e) {
    if (fine || !ptrs[e.pointerId]) return;
    ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(ptrs);
    if (pinch && ids.length === 2) {
      var a = ptrs[ids[0]], b = ptrs[ids[1]], r = stage.getBoundingClientRect();
      var cx = (a.x + b.x) / 2 - r.left - r.width / 2, cy = (a.y + b.y) / 2 - r.top - r.height / 2;
      zoomAt(pinch.s * Math.hypot(a.x - b.x, a.y - b.y) / pinch.d, cx, cy); apply(false);
    } else if (drag && Z.s > 1.01) {
      Z.x = drag.tx + (e.clientX - drag.x); Z.y = drag.ty + (e.clientY - drag.y); clamp(); apply(false);
    }
  });
  function up(e) { delete ptrs[e.pointerId]; if (Object.keys(ptrs).length < 2) pinch = null; if (!Object.keys(ptrs).length) drag = null; }
  stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
  window.addEventListener("resize", function () { if (!lb.hidden) { clamp(); apply(false); } });

>>>>>>> 3cded1db02b0c7f585f99c3bb9d19e7cae5f1d0f
  render();
})();
