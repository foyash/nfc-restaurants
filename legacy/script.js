/* =========================================================
   NFC Restaurants — interactions
   ========================================================= */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const STATIC = location.search.includes("static");
  if (!STATIC) document.documentElement.classList.add("js");
  else {
    document.documentElement.classList.add("static");
    document.documentElement.style.scrollBehavior = "auto";
  }

  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- nav ---- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
    });
    $$("#navLinks a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- reveal on scroll ---- */
  if (STATIC) {
    $$(".reveal").forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ---- force video autoplay (muted) ---- */
  function playVideos() {
    $$("video").forEach((v) => {
      v.muted = true;
      v.setAttribute("muted", "");
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    });
  }
  playVideos();
  window.addEventListener("load", playVideos);
  ["pointerdown", "touchstart", "keydown"].forEach((ev) =>
    window.addEventListener(ev, playVideos, { once: true, passive: true })
  );

  /* =========================================================
     CONFIGURATOR
     ========================================================= */
  const PRODUCTS = {
    menu:     { name: "NFC Menu Stand",             price: 45, shape: "menu",     tap: true },
    review:   { name: "Google Review Card",         price: 45, shape: "review",   tap: false },
    coaster:  { name: "Review Coasters & Stickers", price: 15, shape: "coaster",  tap: false },
    card:     { name: "NFC Business Card",           price: 15, shape: "card",     tap: false },
    keychain: { name: "NFC Keychain",                price: 20, shape: "keychain", tap: false },
  };
  const INTEREST = {
    menu: "NFC menu & order/pay",
    review: "Google review growth",
    coaster: "Google review growth",
    card: "Business cards / keychains",
    keychain: "Business cards / keychains",
  };

  const stage = $("#czStage");
  const prodBtns = $$("#czProds .cz-prod");
  const shapes = $$(".cz-shape");
  const czPrice = $("#czPrice");
  const czProdName = $("#czProdName");
  const tapGroup = $("#czTap") ? $("#czTap").closest(".cz__group") : null;
  const menuTitle = () => $('.cz-shape[data-shape="menu"] .cz-title');
  const menuSub = () => $('.cz-shape[data-shape="menu"] .cz-sub');
  let current = "menu";

  const TAP_TEXT = {
    menu:    { title: "View Our Menu", sub: "Order &amp; Pay" },
    review:  { title: "Rate Your Visit", sub: "Review us on Google" },
    pay:     { title: "Pay Your Bill", sub: "Fast &amp; contactless" },
    socials: { title: "Follow Us", sub: "Instagram &amp; more" },
  };

  function selectProduct(id) {
    if (!PRODUCTS[id]) return;
    current = id;
    const p = PRODUCTS[id];
    prodBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.prod === id));
    shapes.forEach((s) => s.classList.toggle("is-active", s.dataset.shape === p.shape));
    if (czPrice) czPrice.textContent = "$" + p.price;
    if (czProdName) czProdName.textContent = p.name;
    if (tapGroup) tapGroup.style.display = p.tap ? "" : "none";
  }
  prodBtns.forEach((b) =>
    b.addEventListener("click", () => selectProduct(b.dataset.prod))
  );

  // "Design yours" links in product cards
  $$("[data-design]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      selectProduct(el.dataset.design);
      $("#customize").scrollIntoView({ behavior: STATIC ? "auto" : "smooth" });
    })
  );

  /* ---- logo upload ---- */
  const logoInput = $("#czLogo");
  const uploadLabel = $("#czUploadLabel");
  const uploadTxt = $("#czUploadTxt");
  const removeBtn = $("#czRemove");
  const logoSlots = $$(".cz-logo");

  function setLogo(dataUrl) {
    logoSlots.forEach((slot) => {
      const img = slot.querySelector("img");
      if (img) img.src = dataUrl;
      slot.classList.add("has");
    });
    uploadLabel.classList.add("has");
    if (removeBtn) removeBtn.hidden = false;
  }
  function clearLogo() {
    logoSlots.forEach((slot) => {
      const img = slot.querySelector("img");
      if (img) img.removeAttribute("src");
      slot.classList.remove("has");
    });
    uploadLabel.classList.remove("has");
    if (removeBtn) removeBtn.hidden = true;
    if (logoInput) logoInput.value = "";
    if (uploadTxt) uploadTxt.innerHTML = "<b>Upload logo</b><small>PNG, JPG or SVG · transparent PNG looks best</small>";
  }
  if (logoInput) {
    logoInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (file.size > 6 * 1024 * 1024) {
        alert("Please choose an image under 6 MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogo(ev.target.result);
        if (uploadTxt) uploadTxt.innerHTML = "<b>" + file.name.replace(/</g, "") + "</b><small>Tap to change · looking good ✓</small>";
      };
      reader.readAsDataURL(file);
    });
  }
  if (removeBtn) removeBtn.addEventListener("click", clearLogo);

  /* ---- brand color ---- */
  function hexToRgb(h) { h = h.replace("#", ""); if (h.length === 3) h = h.split("").map((c) => c + c).join(""); return [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16)); }
  function toHex(rgb) { return "#" + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join(""); }
  function lum([r, g, b]) { return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; }
  function displayAccent(hex) {
    const rgb = hexToRgb(hex);
    if (lum(rgb) < 0.32) {
      // too dark for a dark board — lift toward light for legibility
      return toHex(rgb.map((v) => v + (255 - v) * 0.62));
    }
    return hex;
  }
  function setColor(hex) {
    document.documentElement.style.setProperty("--cz-accent", displayAccent(hex));
  }
  $$("#czSwatches .cz-sw").forEach((sw) =>
    sw.addEventListener("click", () => {
      $$("#czSwatches .cz-sw").forEach((s) => s.classList.remove("is-active"));
      sw.classList.add("is-active");
      setColor(sw.dataset.color);
      if (stage && !STATIC) stage.animate([{ transform: "scale(.99)" }, { transform: "scale(1)" }], { duration: 220, easing: "cubic-bezier(.4,.1,.2,1)" });
    })
  );

  /* ---- tap mode (menu stand only) ---- */
  $$("#czTap .cz-tap").forEach((seg) =>
    seg.addEventListener("click", () => {
      $$("#czTap .cz-tap").forEach((s) => s.classList.remove("is-active"));
      seg.classList.add("is-active");
      const t = TAP_TEXT[seg.dataset.mode];
      if (t && menuTitle() && menuSub()) {
        menuTitle().innerHTML = t.title;
        menuSub().innerHTML = t.sub;
      }
    })
  );

  /* ---- price actions -> prefill lead form ---- */
  const leadInterest = $("#leadInterest");
  function setInterest(val) {
    if (!leadInterest) return;
    const opt = [...leadInterest.options].find((o) => o.value === val);
    if (opt) leadInterest.value = val;
  }
  const czOrder = $("#czOrder");
  if (czOrder) czOrder.addEventListener("click", () => setInterest(INTEREST[current] || "Everything"));
  const czBulk = $("#czBulk");
  if (czBulk)
    czBulk.addEventListener("click", () => {
      setInterest("Bulk order (multiple items)");
      $("#contact").scrollIntoView({ behavior: STATIC ? "auto" : "smooth" });
    });

  // init
  setColor("#0071e3");
  selectProduct("menu");

  // preview helpers (for static screenshots): ?prod=coaster&demologo&color=%23e0400b
  if (STATIC) {
    const params = new URLSearchParams(location.search);
    if (params.get("prod")) selectProduct(params.get("prod"));
    if (params.get("color")) setColor(params.get("color"));
    if (params.has("demologo")) {
      const SAMPLE =
        "data:image/svg+xml," +
        encodeURIComponent(
          "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'><circle cx='28' cy='40' r='19' fill='none' stroke='#1d1d1f' stroke-width='3'/><text x='28' y='48' font-family='Georgia' font-size='22' text-anchor='middle' fill='#1d1d1f'>P</text><text x='58' y='48' font-family='Georgia' font-size='23' fill='#1d1d1f'>Palace</text></svg>"
        );
      setLogo(SAMPLE);
    }
  }

  /* ---- stat counters ---- */
  const counters = $$(".count");
  if (STATIC) {
    counters.forEach((el) => (el.textContent = el.dataset.to));
  } else {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target, to = +el.dataset.to, dur = 1400, t0 = performance.now();
          const tick = (t) => {
            const pr = Math.min((t - t0) / dur, 1);
            el.textContent = Math.round(to * (1 - Math.pow(1 - pr, 3)));
            if (pr < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          cio.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => cio.observe(c));
  }

  /* ---- single-open FAQ ---- */
  $$(".acc").forEach((d) =>
    d.addEventListener("toggle", () => {
      if (d.open) $$(".acc").forEach((o) => o !== d && (o.open = false));
    })
  );

  /* ---- lead form ---- */
  const form = $("#leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = $("#formNote");
      const data = Object.fromEntries(new FormData(form));
      if (!data.restaurant || !data.name || !data.email) {
        note.textContent = "Please fill in your restaurant, name and email.";
        note.classList.remove("ok");
        return;
      }
      note.textContent = "🎉 Thanks " + data.name.split(" ")[0] + "! We'll be in touch within 24 hours.";
      note.classList.add("ok");
      form.reset();
    });
  }

  /* ---- FAB ---- */
  const fab = $("#fab");
  if (fab) {
    const contact = $("#contact");
    window.addEventListener(
      "scroll",
      () => {
        let near = false;
        if (contact) {
          const r = contact.getBoundingClientRect();
          near = r.top < window.innerHeight && r.bottom > 0;
        }
        fab.classList.toggle("show", window.scrollY > 700 && !near);
      },
      { passive: true }
    );
  }
})();
