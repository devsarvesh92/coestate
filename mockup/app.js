/* CoEstate mockup interactions: mobile nav, lead capture, toast.
   In the real build these submissions go to Supabase via a Server Action.
   Here we save them to localStorage so you can see the captured data. */

// ---- Mobile nav toggle ----
function toggleNav() {
  document.querySelector(".nav").classList.toggle("open");
}

// ---- Toast ----
function showToast(message, type = "success") {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    document.body.appendChild(toast);
  }
  toast.className = "toast " + type;
  toast.innerHTML =
    '<span class="toast-ico">' +
    svgIcon(type === "error" ? "close" : "check") +
    '</span><span class="toast-msg"></span>';
  toast.querySelector(".toast-msg").textContent = message;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 3800);
}

// ---- Lead capture ----
function saveLead(lead) {
  const leads = JSON.parse(localStorage.getItem("coestate_leads") || "[]");
  lead.created_at = new Date().toISOString();
  leads.push(lead);
  localStorage.setItem("coestate_leads", JSON.stringify(leads));
  console.log("Captured lead (will go to Supabase in the real build):", lead);
  return leads.length;
}

function validateField(field) {
  const input = field.querySelector("input, select, textarea");
  if (!input) return true;
  let ok = input.value.trim() !== "";
  if (ok && input.type === "email") {
    ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
  }
  field.classList.toggle("invalid", !ok);
  return ok;
}

function handleLeadForm(form, type) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = form.querySelectorAll(".field[data-required]");
    let valid = true;
    fields.forEach((f) => {
      if (!validateField(f)) valid = false;
    });
    if (!valid) {
      showToast("Please fill in the highlighted fields.", "error");
      return;
    }
    const data = { type };
    new FormData(form).forEach((v, k) => (data[k] = v));
    saveLead(data);
    form.reset();
    const first = (data.name || "").trim().split(/\s+/)[0];
    showToast(`Thanks${first ? ", " + first : ""}! Our team will reach out shortly.`);
  });

  form.querySelectorAll(".field[data-required] input, .field[data-required] select, .field[data-required] textarea")
    .forEach((input) => {
      input.addEventListener("input", () => validateField(input.closest(".field")));
    });
}

// ---- Brik stepper ----
function step(delta) {
  const el = document.getElementById("brikCount");
  if (!el) return;
  let n = parseInt(el.textContent, 10) + delta;
  n = Math.max(1, Math.min(7, n));
  el.textContent = n;
  const per = 600000;
  const fees = 25000 + 18000 + 4500;
  const total = n * per + fees;
  const totalEl = document.getElementById("brikTotal");
  const priceEl = document.getElementById("brikLinePrice");
  const labelEl = document.getElementById("brikCountLabel");
  if (priceEl) priceEl.textContent = "₹" + (n * per).toLocaleString("en-IN");
  if (totalEl) totalEl.textContent = "₹" + total.toLocaleString("en-IN");
  if (labelEl) labelEl.textContent = n;
}

// ---- SVG icon set (Lucide-style stroke icons) ----
const ICONS = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  umbrella: '<path d="M22 12a10.06 10.06 0 0 0-20 0Z"/><path d="M12 12v8a2 2 0 0 0 4 0"/><path d="M12 2v1"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/>',
  building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  trees: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z"/>',
  bed: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
  wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.86a10 10 0 0 1 14 0"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/>',
  chef: '<path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" x2="18" y1="17" y2="17"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  sliders: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  sofa: '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/><path d="M4 18v2"/><path d="M20 18v2"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  trending: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  pool: '<path d="M2 12h20"/><path d="M5 12V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v14"/><path d="M15 12V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v14"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
};
function svgIcon(name, filled) {
  const fill = filled ? "currentColor" : "none";
  return `<svg viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;
}
function renderIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = svgIcon(el.getAttribute("data-icon"), el.hasAttribute("data-filled"));
  });
}

// ---- Wishlist heart toggle ----
function initHearts() {
  document.querySelectorAll(".heart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const on = btn.classList.toggle("saved");
      btn.innerHTML = svgIcon("heart", on);
    });
  });
}

// ---- Card image carousels ----
function initCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((track) => {
    const imgs = track.querySelectorAll("img");
    if (imgs.length < 2) return;
    let idx = 0;
    const wrap = track.parentElement;

    const prev = document.createElement("button");
    prev.className = "cz prev";
    prev.type = "button";
    prev.innerHTML = svgIcon("chevronLeft");
    const next = document.createElement("button");
    next.className = "cz next";
    next.type = "button";
    next.innerHTML = svgIcon("chevronRight");

    const dots = document.createElement("div");
    dots.className = "dots";
    imgs.forEach((_, i) => {
      const d = document.createElement("span");
      d.className = "dot" + (i === 0 ? " active" : "");
      dots.appendChild(d);
    });

    function go(n) {
      idx = (n + imgs.length) % imgs.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.querySelectorAll(".dot").forEach((d, i) =>
        d.classList.toggle("active", i === idx)
      );
    }
    prev.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      go(idx - 1);
    });
    next.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      go(idx + 1);
    });
    wrap.appendChild(prev);
    wrap.appendChild(next);
    wrap.appendChild(dots);
  });
}

// ---- Hero search -> listings ----
function goSearch(e) {
  e.preventDefault();
  const params = new URLSearchParams();
  const where = (document.getElementById("heroWhere")?.value || "").trim();
  const when = document.getElementById("heroWhen")?.value || "";
  const shares = document.getElementById("heroShares")?.value || "";
  if (where) params.set("q", where);
  if (when) params.set("when", when);
  if (shares) params.set("shares", shares);
  const qs = params.toString();
  window.location = "properties.html" + (qs ? "?" + qs : "");
}

// ---- Destination type-ahead ----
const DESTINATIONS = [
  "Alibaug, Maharashtra",
  "Anjuna, Goa",
  "Kasauli, Himachal Pradesh",
  "Manali, Himachal Pradesh",
  "Mukteshwar, Uttarakhand",
  "Naukuchiatal, Uttarakhand",
  "Pondicherry",
  "Varkala, Kerala",
  "Goa",
  "Himachal Pradesh",
  "Uttarakhand",
  "Kerala",
  "Maharashtra",
];

function makeTypeahead(input, onPick) {
  if (!input) return;
  const parent =
    input.closest(".search-seg") || input.closest(".search-input") || input.parentElement;
  if (parent && getComputedStyle(parent).position === "static") parent.style.position = "relative";
  const box = document.createElement("div");
  box.className = "typeahead";
  parent.appendChild(box);

  function render(list) {
    if (!list.length) {
      box.classList.remove("open");
      box.innerHTML = "";
      return;
    }
    box.innerHTML = list
      .map(
        (d) =>
          '<div class="ta-item" data-val="' +
          d +
          '"><span class="ta-ico">' +
          svgIcon("pin") +
          "</span><span>" +
          d +
          "</span></div>"
      )
      .join("");
    box.querySelectorAll(".ta-item").forEach((it) => {
      it.addEventListener("mousedown", (e) => {
        e.preventDefault();
        input.value = it.getAttribute("data-val");
        box.classList.remove("open");
        if (onPick) onPick(input.value);
      });
    });
    box.classList.add("open");
  }

  function update() {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      box.classList.remove("open");
      return;
    }
    render(DESTINATIONS.filter((d) => d.toLowerCase().includes(q)).slice(0, 6));
  }

  input.addEventListener("input", update);
  input.addEventListener("focus", update);
  input.addEventListener("blur", () => setTimeout(() => box.classList.remove("open"), 130));
}

// ---- Hero background crossfade (subtle, text stays fixed) ----
function initHeroSlides() {
  const wrap = document.getElementById("heroSlides");
  if (!wrap) return;
  const slides = Array.from(wrap.querySelectorAll(".hero-slide"));
  if (slides.length < 2) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove("active");
    i = (i + 1) % slides.length;
    slides[i].classList.add("active");
  }, 6000);
}

// ---- Hero search popovers: custom calendar + shares stepper ----
function initHeroSearch() {
  const whenSeg = document.getElementById("whenSeg");
  const sharesSeg = document.getElementById("sharesSeg");
  if (!whenSeg && !sharesSeg) return;
  const whenPop = document.getElementById("whenPop");
  const sharesPop = document.getElementById("sharesPop");

  function closeAll() {
    whenPop && whenPop.classList.remove("open");
    sharesPop && sharesPop.classList.remove("open");
  }

  if (whenSeg) {
    whenSeg.addEventListener("click", (e) => {
      if (whenPop.contains(e.target)) return;
      const willOpen = !whenPop.classList.contains("open");
      closeAll();
      if (willOpen) whenPop.classList.add("open");
      e.stopPropagation();
    });
  }
  if (sharesSeg) {
    sharesSeg.addEventListener("click", (e) => {
      if (sharesPop.contains(e.target)) return;
      const willOpen = !sharesPop.classList.contains("open");
      closeAll();
      if (willOpen) sharesPop.classList.add("open");
      e.stopPropagation();
    });
  }
  document.addEventListener("click", (e) => {
    const inWhen = whenSeg && whenSeg.contains(e.target);
    const inShares = sharesSeg && sharesSeg.contains(e.target);
    if (!inWhen && !inShares) closeAll();
  });

  // ----- Calendar -----
  if (whenPop) {
    const view = new Date();
    view.setDate(1);
    let selected = null;
    const fmt = (iso) =>
      new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

    function render() {
      const y = view.getFullYear();
      const m = view.getMonth();
      const firstDow = new Date(y, m, 1).getDay();
      const days = new Date(y, m + 1, 0).getDate();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let html =
        '<div class="cal"><div class="cal-head">' +
        '<button type="button" class="cal-nav" data-dir="-1">&lsaquo;</button>' +
        '<div class="cal-title">' +
        view.toLocaleDateString("en-US", { month: "long", year: "numeric" }) +
        '</div><button type="button" class="cal-nav" data-dir="1">&rsaquo;</button>' +
        '</div><div class="cal-grid">';
      ["S", "M", "T", "W", "T", "F", "S"].forEach((d) => (html += '<span class="cal-dow">' + d + "</span>"));
      for (let i = 0; i < firstDow; i++) html += '<span class="cal-day empty"></span>';
      for (let d = 1; d <= days; d++) {
        const date = new Date(y, m, d);
        const iso = y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
        const cls = (date < today ? " muted" : "") + (selected === iso ? " selected" : "");
        html += '<button type="button" class="cal-day' + cls + '" data-iso="' + iso + '">' + d + "</button>";
      }
      html += "</div></div>";
      whenPop.innerHTML = html;
      whenPop.querySelectorAll(".cal-nav").forEach((b) =>
        b.addEventListener("click", (e) => {
          e.stopPropagation();
          view.setMonth(view.getMonth() + parseInt(b.dataset.dir, 10));
          render();
        })
      );
      whenPop.querySelectorAll(".cal-day[data-iso]").forEach((b) =>
        b.addEventListener("click", (e) => {
          e.stopPropagation();
          selected = b.dataset.iso;
          document.getElementById("heroWhen").value = selected;
          const disp = document.getElementById("whenDisplay");
          disp.textContent = fmt(selected);
          disp.classList.remove("is-empty");
          render();
          whenPop.classList.remove("open");
        })
      );
    }
    render();
  }

  // ----- Where type-ahead -----
  makeTypeahead(document.getElementById("heroWhere"));

  // ----- Shares stepper -----
  const sharesNum = document.getElementById("sharesNum");
  if (sharesNum) {
    let shares = 1;
    let touched = false;
    const display = document.getElementById("sharesDisplay");
    const hidden = document.getElementById("heroShares");
    function update() {
      sharesNum.textContent = shares;
      if (touched) {
        hidden.value = shares;
        display.textContent = shares + (shares === 1 ? " share" : " shares");
        display.classList.remove("is-empty");
      }
    }
    document.getElementById("sharesPlus").addEventListener("click", (e) => {
      e.stopPropagation();
      touched = true;
      shares = Math.min(11, shares + 1);
      update();
    });
    document.getElementById("sharesMinus").addEventListener("click", (e) => {
      e.stopPropagation();
      touched = true;
      shares = Math.max(1, shares - 1);
      update();
    });
  }
}

// ---- Listings: category + price + text filtering ----
function initListings() {
  const grid = document.getElementById("cardsGrid");
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll(".card"));
  const searchInput = document.getElementById("searchInput");
  const countEl = document.getElementById("resultsCount");
  const noRes = document.getElementById("noResults");
  const cats = Array.from(document.querySelectorAll(".cat"));
  const filterBtn = document.getElementById("filterBtn");
  const filterPanel = document.getElementById("filterPanel");

  let activeCat = "all";
  let priceFilter = "any";

  function priceMatch(raw) {
    const p = parseFloat(raw);
    if (priceFilter === "lt6") return p < 6;
    if (priceFilter === "6to8") return p >= 6 && p <= 8;
    if (priceFilter === "gt8") return p > 8;
    return true;
  }

  function apply() {
    const q = (searchInput?.value || "").trim().toLowerCase();
    let shown = 0;
    cards.forEach((c) => {
      const cat = c.getAttribute("data-cat") || "";
      const name = c.getAttribute("data-name") || "";
      const okCat = activeCat === "all" || cat.split(" ").includes(activeCat);
      const okSearch = !q || name.includes(q);
      const okPrice = priceMatch(c.getAttribute("data-price"));
      const show = okCat && okSearch && okPrice;
      c.classList.toggle("hidden", !show);
      if (show) shown++;
    });
    if (countEl) countEl.textContent = shown + (shown === 1 ? " home" : " homes");
    if (noRes) noRes.classList.toggle("show", shown === 0);
  }

  cats.forEach((cat) => {
    cat.addEventListener("click", () => {
      cats.forEach((c) => c.classList.remove("active"));
      cat.classList.add("active");
      activeCat = cat.getAttribute("data-filter");
      apply();
    });
  });

  if (searchInput) searchInput.addEventListener("input", apply);
  makeTypeahead(searchInput, () => apply());

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      filterPanel.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!filterPanel.contains(e.target) && e.target !== filterBtn) {
        filterPanel.classList.remove("open");
      }
    });
    filterPanel.querySelectorAll('input[name="price"]').forEach((r) => {
      r.addEventListener("change", () => {
        priceFilter = r.value;
        apply();
      });
    });
  }

  const params = new URLSearchParams(location.search);
  const q = params.get("q");
  if (q && searchInput) searchInput.value = q;

  const when = params.get("when");
  const shares = params.get("shares");
  const bits = [];
  if (shares) bits.push(shares + (shares === "1" ? " share" : " shares"));
  if (when) {
    const d = new Date(when);
    if (!isNaN(d)) {
      bits.push(
        "stay from " +
          d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      );
    }
  }
  if (bits.length) {
    const note = document.createElement("div");
    note.className = "search-context";
    note.textContent = "Your search: " + bits.join(" \u00b7 ");
    const controls = document.querySelector(".listing-controls");
    if (controls) controls.parentNode.insertBefore(note, controls);
  }

  apply();
}

// ---- Wire up on load ----
document.addEventListener("DOMContentLoaded", () => {
  renderIcons();
  initHearts();
  initCarousels();
  initHeroSlides();
  initHeroSearch();
  initListings();
  const enquiry = document.getElementById("enquiryForm");
  if (enquiry) handleLeadForm(enquiry, "enquiry");
  const booking = document.getElementById("bookingForm");
  if (booking) handleLeadForm(booking, "booking");
  const reserve = document.getElementById("reserveForm");
  if (reserve) handleLeadForm(reserve, "reservation");
});
