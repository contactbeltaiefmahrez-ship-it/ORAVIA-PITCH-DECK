/* ═══════════════════════════════════════════════════════════════════
   ORAVIA — investor deck
   No dependencies, no build step. Opens from the filesystem.

   Every diagram in this deck is generated SVG built from the clinical
   model below — nothing is a decorative placeholder. The one motif
   that recurs on every slide is the journey line: a single path in the
   atmosphere layer that redraws itself into a new shape each slide.

     01 helpers                     08 dental map        15 today UI
     02 clinical model              09 time machine      16 patient
     03 navigation + journey        10 voice             17 passport
     04 fragmentation               11 language          18 market
     05 leak funnel                 12 journey path      19 matrix
     06 insight chain               13 continuity pipe   20 tiers
     07 system net / engines        14 practice pulse    21 roadmap
   ═══════════════════════════════════════════════════════════════════ */

(function () {
"use strict";

/* ── 01 · HELPERS ─────────────────────────────────────────────────── */
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
const NS = "http://www.w3.org/2000/svg";
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function s(tag, attrs, parent) {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(n);
  return n;
}
function txt(parent, str, attrs) {
  const n = s("text", attrs, parent);
  n.textContent = str;
  return n;
}
function el(tag, cls, str) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (str != null) n.textContent = str;
  return n;
}

/* Catmull-Rom through the points, emitted as cubic beziers. Used for
   every flowing curve in the deck so they share one hand. */
function smooth(pts, tension) {
  const t = tension == null ? 0.4 : tension;
  if (pts.length < 2) return "";
  let d = "M" + pts[0][0] + " " + pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += "C" + (p1[0] + (p2[0] - p0[0]) * t / 3).toFixed(1) + " " + (p1[1] + (p2[1] - p0[1]) * t / 3).toFixed(1)
       + " " + (p2[0] - (p3[0] - p1[0]) * t / 3).toFixed(1) + " " + (p2[1] - (p3[1] - p1[1]) * t / 3).toFixed(1)
       + " " + p2[0] + " " + p2[1];
  }
  return d;
}

/* ── 02 · CLINICAL MODEL ──────────────────────────────────────────────
   Fictional demo data throughout. Colour never carries clinical
   meaning alone: every state ships a colour, a glyph and a label, and
   all three are rendered wherever a state appears.                    */

const STATE = {
  healthy:  { ar: "سليمة",        g: "·",  c: "#E4E0D6", ink: "#07070E" },
  restored: { ar: "ترميم قائم",   g: "R",  c: "#8B93AD", ink: "#07070E" },
  watch:    { ar: "تحت المراقبة", g: "M",  c: "#5FBFA5", ink: "#07070E" },
  caries:   { ar: "تسوّس",         g: "C",  c: "#E0A45C", ink: "#07070E" },
  deep:     { ar: "تسوّس عميق",    g: "C+", c: "#E8615A", ink: "#07070E" },
  /* the signature colour, reserved for one meaning: where the patient stands now */
  active:   { ar: "علاج جارٍ",     g: "→",  c: "#8B7BF7", ink: "#07070E" },
  crown:    { ar: "تاج",          g: "K",  c: "#B9C4DA", ink: "#07070E" },
  implant:  { ar: "زرعة",         g: "I",  c: "#7E93B8", ink: "#07070E" },
  missing:  { ar: "مفقودة",       g: "×",  c: "#221F38", ink: "#8B93AD" }
};

/* FDI notation: quadrant 1 upper-right, 2 upper-left, 3 lower-left,
   4 lower-right; 1–8 outward from the midline. */
const UP = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const LO = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

const KIND = n => {
  const p = n % 10;
  if (p <= 2) return { ar: "قاطعة", w: 15, h: 22 };
  if (p === 3) return { ar: "ناب",  w: 16, h: 24 };
  if (p <= 5) return { ar: "ضاحكة", w: 19, h: 22 };
  return { ar: "رحى", w: 23, h: 23 };
};
const ARCH = n => (n < 30 ? "علوية" : "سفلية");
const SIDE = n => ([1,4].indexOf(Math.floor(n/10)) >= 0 ? "يمنى" : "يسرى");

const PATIENT = { name: "أحمد بن علي", id: "ORA-P-004281" };

const CHART = {
  46:{st:"active",  case:"ORA-C-0042", dx:"تسوّس عميق", now:"علاج جذور — الحصة 3 من 4", next:"حشو الجذر", since:"04 سبتمبر 2026", n:3},
  16:{st:"caries",  case:"ORA-C-0051", dx:"تسوّس سطحي", now:"مخطّط له", next:"ترميم مركّب", since:"22 أوت 2026", n:0},
  36:{st:"restored",dx:"ترميم أملغم قديم", now:"مستقرّ", note:"رُمّم في 2019 لدى ممارس سابق. أُدرج في السجلّ عند أوّل زيارة."},
  47:{st:"restored",dx:"تسوّس مُعالَج", now:"مستقرّ", note:"ترميم مركّب، ماي 2025."},
  26:{st:"crown",   dx:"تاج خزفي", now:"مستقرّ", note:"رُكّب في 2022. مراجعة دورية."},
  38:{st:"missing", dx:"قُلعت", now:"غائبة", note:"قُلعت في 2021 — ضرس عقل منطمر."},
  28:{st:"missing", dx:"قُلعت", now:"غائبة", note:"قُلعت في 2021 — ضرس عقل منطمر."},
  24:{st:"watch",   dx:"شقّ مينائي", now:"مراقبة", note:"بلا أعراض. يُعاد تقييمه عند كلّ استدعاء."},
  31:{st:"watch",   dx:"انحسار لثوي طفيف", now:"مراقبة", note:"قياس دوري للجيب اللثوي."},
  17:{st:"implant", dx:"زرعة", now:"مندمجة", note:"وُضعت في 2023، التعويض مركّب."}
};

/* ── 03 · NAVIGATION + THE JOURNEY LINE ───────────────────────────────
   One path in the atmosphere layer. On every slide change it is given
   a new shape and redrawn, so the line reads as travelling through the
   deck rather than 22 unrelated backgrounds.                          */

const SHAPES = [
  [[1180,-40],[1010,180],[900,430],[840,690],[820,940]],              /* 01 descends, like a canal */
  [[1480,180],[1090,300],[700,250],[330,380],[-40,300]],              /* 02 scattered, wandering  */
  [[1480,120],[1080,300],[720,430],[380,600],[-40,760]],              /* 03 leaking away          */
  [[-40,470],[400,455],[760,455],[1120,450],[1480,440]],              /* 04 resolves to one line  */
  [[1480,300],[1140,430],[800,340],[460,470],[-40,380]],              /* 05 the chain             */
  [[720,120],[1060,290],[900,660],[520,660],[380,290],[720,120]],     /* 06 a closed system       */
  [[1240,-40],[1040,240],[880,480],[800,720],[790,940]],              /* 07 into the tooth        */
  [[-40,620],[300,380],[720,320],[1140,390],[1480,630]],              /* 08 the arch              */
  [[1480,540],[1100,470],[720,520],[340,450],[-40,500]],              /* 09 a timeline            */
  [[-40,450],[240,300],[480,600],[720,280],[960,620],[1200,400],[1480,470]], /* 10 a waveform  */
  [[1480,260],[1080,400],[840,300],[620,520],[300,420],[-40,540]],    /* 11 branching speech      */
  [[1480,660],[1120,340],[760,620],[400,320],[-40,600]],              /* 12 the S of a journey    */
  [[1480,420],[1100,440],[720,470],[340,440],[-40,460]],              /* 13 the pipeline          */
  [[720,150],[1020,330],[960,690],[620,740],[360,500],[540,210],[720,150]], /* 14 a pulse ring  */
  [[1420,-40],[1180,260],[880,480],[520,660],[160,940]],              /* 15 a working day         */
  [[900,-40],[840,240],[760,500],[720,740],[700,940]],                /* 16 vertical, personal    */
  [[-40,300],[380,180],[760,300],[1120,180],[1480,320]],              /* 17 two arcs, a handover  */
  [[820,-40],[760,220],[700,480],[660,720],[640,940]],                /* 18 north to south        */
  [[-40,760],[400,600],[760,420],[1120,240],[1480,90]],               /* 19 the diagonal          */
  [[-40,620],[400,560],[760,470],[1120,360],[1480,300]],              /* 20 climbing              */
  [[1480,700],[1080,600],[720,470],[360,330],[-40,180]],              /* 21 the road ahead        */
  [[720,940],[820,650],[760,420],[720,240],[720,60]]                  /* 22 returns to the mark   */
];

const slides = $$(".slide");
const jpath  = $("#journey");
const railEl = $("#rail");
let idx = 0;

slides.forEach((sl, i) => {
  const li = el("li", i === 0 ? "on" : "");
  const b  = el("button");
  b.type = "button";
  b.setAttribute("aria-label", (i + 1) + ". " + sl.dataset.t);
  b.addEventListener("click", () => go(i));
  li.appendChild(b);
  li.appendChild(el("span", null, sl.dataset.t));
  railEl.appendChild(li);
});
const railItems = $$("#rail li");
$("#hudAll").textContent = String(slides.length).padStart(2, "0");

/* Reset then restart the CSS animations inside a slide so every visit
   replays the composition rather than showing it already finished. */
function prime(slide) {
  $$("[data-draw]", slide).forEach(p => {
    let len = 1200;
    try { len = p.getTotalLength() || 1200; } catch (e) {}
    p.style.setProperty("--len", len.toFixed(0));
  });
  /* Every animation in the deck is scoped to `.slide.is-active`, so
     dropping and restoring that one class replays the whole
     composition without disturbing per-element inline delays. */
  slide.classList.remove("is-active");
  void slide.offsetWidth;
  slide.classList.add("is-active");
}

function drawJourney(i) {
  const d = smooth(SHAPES[i] || SHAPES[0], 0.42);
  jpath.setAttribute("d", d);
  if (REDUCED) { jpath.style.strokeDasharray = "none"; jpath.style.strokeDashoffset = 0; return; }
  const len = jpath.getTotalLength();
  jpath.style.transition = "none";
  jpath.style.strokeDasharray = len;
  jpath.style.strokeDashoffset = len;
  void jpath.getBoundingClientRect();
  jpath.style.transition = "stroke-dashoffset 2.4s cubic-bezier(.19,.72,.26,1)";
  jpath.style.strokeDashoffset = "0";
}

function go(n) {
  idx = Math.max(0, Math.min(slides.length - 1, n));
  slides.forEach((sl, i) => sl.classList.toggle("is-active", i === idx));
  railItems.forEach((r, i) => r.classList.toggle("on", i === idx));
  $("#hudNow").textContent = String(idx + 1).padStart(2, "0");
  $("#hudFill").style.inlineSize = ((idx + 1) / slides.length * 100) + "%";
  $("#prev").disabled = idx === 0;
  $("#next").disabled = idx === slides.length - 1;
  slides[idx].scrollTop = 0;
  prime(slides[idx]);
  drawJourney(idx);
  runCounters(slides[idx]);
  try { history.replaceState(null, "", "#s" + (idx + 1)); } catch (e) {}
}
const nextS = () => go(idx + 1), prevS = () => go(idx - 1);
$("#next").addEventListener("click", nextS);
$("#prev").addEventListener("click", prevS);

/* RTL: the deck reads right to left, so ArrowLeft advances. */
document.addEventListener("keydown", e => {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey) return;
  switch (e.key) {
    case "ArrowLeft": case "PageDown": nextS(); break;
    case "ArrowRight": case "PageUp":  prevS(); break;
    case " ": if (document.activeElement.tagName !== "BUTTON") { e.preventDefault(); nextS(); } break;
    case "Home": go(0); break;
    case "End":  go(slides.length - 1); break;
    case "p": case "P": case "f": case "F": present(); break;
    case "Escape": if (document.body.classList.contains("present")) present(); break;
    default: return;
  }
});
function present() {
  const on = document.body.classList.toggle("present");
  if (on && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(()=>{});
  else if (!on && document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(()=>{});
}
let tx = 0, ty = 0;
document.addEventListener("touchstart", e => { tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY; }, {passive:true});
document.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > 66 && Math.abs(dx) > Math.abs(dy) * 1.6) (dx < 0 ? nextS : prevS)();
}, {passive:true});
setTimeout(() => $("#tip").classList.add("gone"), 5600);

/* Numbers count only when their slide is reached, and only once. */
function runCounters(slide) {
  $$("[data-count]", slide).forEach(n => {
    if (n.dataset.done) return;
    n.dataset.done = "1";
    const target = parseFloat(n.dataset.count), dec = parseInt(n.dataset.dec || "0", 10);
    if (REDUCED) { n.textContent = target.toFixed(dec); return; }
    const t0 = performance.now(), dur = 1300;
    (function step(t) {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      n.textContent = (target * eased).toFixed(dec);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  });
}

/* ── 04 · FRAGMENTATION  ·  slide 02 ─────────────────────────────────
   Sources of truth scattered across a field, drifting apart. Positions
   are irregular on purpose — a tidy grid would read as organised, and
   the point is that nothing here is organised.                        */

const SHARDS = [
  { t: "الرزنامة",        x: 6,  y: 12, dx: "-16px", dy: "-12px", d: .1 },
  { t: "ملاحظات ورقية",   x: 70, y: 6,  dx: "18px",  dy: "-14px", d: .22 },
  { t: "صور داخل الفم",   x: 82, y: 40, dx: "22px",  dy: "8px",   d: .34 },
  { t: "أشعّة",           x: 2,  y: 46, dx: "-20px", dy: "6px",   d: .46 },
  { t: "واتساب",          x: 74, y: 76, dx: "16px",  dy: "18px",  d: .58 },
  { t: "جدول Excel",      x: 10, y: 82, dx: "-14px", dy: "16px",  d: .7 },
  { t: "ذاكرة الطبيب",    x: 40, y: 92, dx: "0px",   dy: "20px",  d: .82 },
  { t: "دفتر المواعيد",   x: 44, y: 2,  dx: "2px",   dy: "-18px", d: .94 }
];
(function fragments() {
  const f = $("#fragField");
  SHARDS.forEach(sh => {
    const n = el("span", "shard", sh.t);
    n.style.insetInlineStart = sh.x + "%";
    n.style.insetBlockStart  = sh.y + "%";
    n.style.setProperty("--dx", sh.dx);
    n.style.setProperty("--dy", sh.dy);
    n.style.animationDelay = sh.d + "s, " + (sh.d + 1.6) + "s";
    f.appendChild(n);
  });
})();

/* ── 05 · LEAK FUNNEL  ·  slide 03 ───────────────────────────────────
   Flows right to left, following the Arabic reading direction.        */

(function funnel() {
  const svg = $("#funnel"), W = 720, H = 320;
  const stages = [
    { t: "تشخيص",        h: 190 },
    { t: "قبول الخطّة",   h: 168 },
    { t: "بدء العلاج",    h: 140 },
    { t: "إكمال العلاج",  h: 96  },
    { t: "متابعة",       h: 62  }
  ];
  const x0 = 690, x1 = 40, mid = 132, seg = (x0 - x1) / (stages.length - 1);

  /* funnel body */
  const top = [], bot = [];
  stages.forEach((st, i) => {
    const x = x0 - i * seg;
    top.push([x, mid - st.h / 2]);
    bot.push([x, mid + st.h / 2]);
  });
  s("path", { class: "pp-body", d: smooth(top, .35) + " L" + bot[bot.length-1][0] + " " + bot[bot.length-1][1] +
              " " + smooth(bot.slice().reverse(), .35).replace(/^M[^C]*/, "") + " Z" }, svg);

  /* the cohort still flowing */
  s("path", { class: "pp-flow", d: smooth(stages.map((st,i)=>[x0 - i*seg, mid]), .35), "data-draw": "", style: "--d:.3s" }, svg);

  stages.forEach((st, i) => {
    const x = x0 - i * seg;
    s("line", { x1: x, y1: mid - st.h/2, x2: x, y2: mid + st.h/2, stroke: "rgba(163,166,190,.16)", "stroke-width": 1 }, svg);
    txt(svg, st.t, { class: "pp-stage", x: x, y: mid - st.h/2 - 14 });
  });

  /* what leaks out between stages */
  const leaks = [
    { i: 0.5, n: 3 }, { i: 1.5, n: 5 }, { i: 2.5, n: 8 }, { i: 3.5, n: 4 }
  ];
  leaks.forEach(lk => {
    const x = x0 - lk.i * seg;
    const h = (stages[Math.floor(lk.i)].h + stages[Math.ceil(lk.i)].h) / 2;
    for (let k = 0; k < lk.n; k++) {
      const dx = x + (Math.random() - .5) * 46;
      const dy = mid + h / 2 + 16 + Math.random() * 96;
      const c = s("circle", { class: "pp-drop", cx: dx.toFixed(1), cy: dy.toFixed(1),
                              r: (1.6 + Math.random() * 1.7).toFixed(1) }, svg);
      c.style.animationDelay = (1 + k * .06 + lk.i * .22) + "s";
    }
  });
  txt(svg, "التسرّب لا يُسجَّل في أيّ مكان", { class: "pp-td", x: 360, y: H - 10, "text-anchor": "middle" });
})();

/* ── 06 · INSIGHT CHAIN  ·  slide 04 ─────────────────────────────────
   The near-empty slide. One line draws, six nodes land on it, then the
   two-beat headline. Right to left.                                   */

(function insightChain() {
  const g = $("#ichain"), W = 960, y = 62;
  const names = ["المريض","الحالة","السن","الحصة","الدليل","الخطوة القادمة"];
  const x0 = 890, x1 = 70, step = (x0 - x1) / (names.length - 1);

  s("path", { class: "ic-line", d: "M" + x1 + " " + y + " L" + x0 + " " + y,
              "data-draw": "", style: "--d:.25s", filter: "url(#jglow)" }, g);

  names.forEach((nm, i) => {
    const x = x0 - i * step, last = i === names.length - 1;
    const node = s("g", { class: "ic-node" }, g);
    node.style.animationDelay = (0.85 + i * 0.14) + "s";
    if (last) s("circle", { cx: x, cy: y, r: 12, fill: "#7C6BF5", opacity: .16 }, node);
    s("circle", { class: "ic-dot", cx: x, cy: y, r: last ? 5.5 : 3.6,
                  style: last ? "filter:drop-shadow(0 0 9px #7C6BF5)" : "" }, node);
    txt(node, nm, { class: "ic-txt" + (last ? " ic-txt--now" : ""), x: x, y: y + 30 });
  });
})();

/* ── 07 · SYSTEM NET  ·  slide 05  and  ENGINES  ·  slide 06 ─────── */

(function systemNet() {
  const svg = $("#sysnet"), W = 1060;
  const nodes = [
    { ar: "المريض",         en: "PATIENT"  },
    { ar: "الحالة العلاجية", en: "CASE"     },
    { ar: "السن",           en: "TOOTH"    },
    { ar: "الحصة",          en: "SESSION"  },
    { ar: "الدليل",         en: "EVIDENCE" },
    { ar: "الخطوة القادمة", en: "NEXT STEP" }
  ];
  const x0 = 950, x1 = 110, step = (x0 - x1) / (nodes.length - 1);
  const pts = nodes.map((n, i) => [x0 - i * step, 150 + (i % 2 ? 46 : -22)]);

  s("path", { class: "sn-link", d: smooth(pts, .45) }, svg);
  s("path", { class: "sn-flow", d: smooth(pts, .45), "data-draw": "", style: "--d:.35s" }, svg);

  nodes.forEach((n, i) => {
    const [x, y] = pts[i], last = i === nodes.length - 1;
    const g = s("g", { class: "sn-node" + (last ? " now" : "") }, svg);
    g.style.animationDelay = (0.5 + i * 0.13) + "s";
    /* hexagon: a data-node form, not a rounded card */
    const r = 44, hex = [];
    for (let k = 0; k < 6; k++) {
      const a = Math.PI / 6 + k * Math.PI / 3;
      hex.push((x + r * Math.cos(a)).toFixed(1) + "," + (y + r * Math.sin(a)).toFixed(1));
    }
    if (last) s("circle", { cx: x, cy: y, r: 58, fill: "#7C6BF5", opacity: .1 }, g);
    s("polygon", { class: "sn-hex", points: hex.join(" ") }, g);
    txt(g, n.ar, { class: "sn-ar", x: x, y: y + 2 });
    txt(g, n.en, { class: "sn-en", x: x, y: y + 66 });
  });
})();

const ENGINES = [
  { n: "01", ar: "الذاكرة السنّية",     q: "ماذا حدث؟",
    d: "كلّ حدث سريري قابل للتتبّع. السجلّ لا يُمحى عند التعديل — تُضاف نسخة جديدة ويبقى ما سبق مقروءًا. السن كائن يعيش أطول من الحالة ومن الطبيب ومن البرمجية." },
  { n: "02", ar: "رحلة العلاج",        q: "أين نحن الآن؟",
    d: "للحالة مراحل صريحة، ومرحلة جارية، ونسبة إنجاز، ومهلة سريرية لكلّ مرحلة. «أين وصلنا» يصبح استعلامًا لا محاولة تذكّر." },
  { n: "03", ar: "استمرارية المريض",   q: "ما الخطوة القادمة؟",
    d: "كشف من انقطع عن العلاج وتحويله إلى مهمّة لها مالك وتاريخ استحقاق ونتيجة. الإشعار ليس مخرجًا؛ العمل المنجَز هو المخرَج." },
  { n: "04", ar: "ذكاء العيادة",       q: "ماذا يجري في عيادتي؟",
    d: "لوحة تجيب أوّلًا عن «ما الذي يستدعي انتباهي اليوم؟» قبل أن تعرض أيّ إحصائية. مؤشّر واحد تُحاسَب عليه: نسبة اكتمال العلاجات." }
];

(function engines() {
  const svg = $("#corenet"), cx = 430, cy = 240, R = 168;
  const read = $("#coreRead");

  s("circle", { cx: cx, cy: cy, r: 96, fill: "#7C6BF5", opacity: .1, filter: "url(#soft)" }, svg);
  s("circle", { cx: cx, cy: cy, r: 62, fill: "rgba(18,16,31,.92)", stroke: "#7C6BF5", "stroke-width": 1.2 }, svg);
  const useMark = s("use", { href: "#oravia-mark", x: cx - 17, y: cy - 30 }, svg);
  useMark.style.color = "#F3F0EA";
  txt(svg, "ORAVIA", { x: cx, y: cy + 40, "text-anchor": "middle", fill: "#6E7191",
                        "font-family": "IBM Plex Sans, sans-serif", "font-size": 10, "letter-spacing": ".22em" });

  const angles = [-Math.PI/2 - 0.62, -Math.PI/2 + 0.62, Math.PI/2 - 0.62, Math.PI/2 + 0.62];
  ENGINES.forEach((eng, i) => {
    const a = angles[i], x = cx + R * Math.cos(a) * 1.55, y = cy + R * Math.sin(a);
    const g = s("g", { class: "eg", tabindex: "0", role: "button",
                       "aria-label": eng.ar + " — " + eng.q }, svg);
    const vx = x - cx, vy = y - cy, L = Math.hypot(vx, vy) || 1;
    s("line", { class: "eg-spoke", x1: cx + 64 * vx / L, y1: cy + 64 * vy / L,
                x2: x - 62 * vx / L, y2: y - 62 * vy / L }, g);
    s("circle", { class: "eg-ring", cx: x, cy: y, r: 62 }, g);
    txt(g, eng.n,  { class: "eg-num", x: x, y: y - 10 });
    txt(g, eng.ar, { class: "eg-lb",  x: x, y: y + 12 });

    const show = () => {
      $$(".eg", svg).forEach(o => o.classList.remove("on"));
      g.classList.add("on");
      read.textContent = "";
      read.appendChild(el("p", "q", eng.q));
      read.appendChild(el("h3", null, eng.ar));
      read.appendChild(el("p", null, eng.d));
    };
    g.addEventListener("mouseenter", show);
    g.addEventListener("click", show);
    g.addEventListener("focus", show);
    if (i === 0) show();
  });
})();

/* ── 08 · TOOTH TIMELINE  ·  slide 07 ────────────────────────────── */

const HISTORY = [
  { d: "14 مارس 2026",   w: "تشخيص: تسوّس عميق",       t: "فحص · صورة شعاعية ذروية" },
  { d: "04 سبتمبر 2026", w: "فتح وتنظيف اللبّ",         t: "الحصة 1 · د. سلمى بن عمّار" },
  { d: "08 سبتمبر 2026", w: "تحضير القناة",             t: "الحصة 2 · حشو مؤقّت" },
  { d: "12 سبتمبر 2026", w: "حساسية خفيفة مبلّغ عنها",   t: "ملاحظة سريرية", now: 1 },
  { d: "الخطوة القادمة", w: "حشو الجذر",                t: "الحصة 3 · 45 دقيقة", next: 1 },
  { d: "بعدها",          w: "تحضير التاج وتركيبه",       t: "الحصة 4", next: 1 }
];
(function timeline() {
  const box = $("#tline");
  HISTORY.forEach((r, i) => {
    const row = el("div", "tl" + (r.now ? " now" : "") + (r.next ? " next" : ""));
    row.style.animationDelay = (0.45 + i * 0.1) + "s";
    row.appendChild(el("span", "tl__d", r.d));
    const w = el("span", "tl__w", r.w);
    w.appendChild(el("span", "tl__t", r.t));
    row.appendChild(w);
    box.appendChild(row);
  });
})();

/* ── 09 · LIVING DENTAL MAP  ·  slide 08 ─────────────────────────────
   Sampled by arc length rather than by angle: equal angular steps on
   an ellipse bunch points where the curve is tightest, which would
   stack the molars on top of each other at the back of the arch.
   The arch keeps clinical orientation regardless of text direction —
   it is anatomy, not text, and must not mirror with RTL.             */

function archPts(codes, cx, cy, rx, ry, down) {
  const N = 900, p = [], cum = [0];
  for (let i = 0; i <= N; i++) {
    const a = Math.PI + (i / N) * Math.PI;
    p.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a) * (down ? -1 : 1), a]);
    if (i > 0) cum.push(cum[i-1] + Math.hypot(p[i][0]-p[i-1][0], p[i][1]-p[i-1][1]));
  }
  const total = cum[N];
  return codes.map((code, k) => {
    const target = (k / (codes.length - 1)) * total;
    let i = 0; while (i < N && cum[i] < target) i++;
    const q = p[i], dx = q[0]-cx, dy = q[1]-cy, L = Math.hypot(dx,dy) || 1;
    /* scale gives depth: teeth toward the back of the mouth sit further away */
    const depth = 0.93 + 0.11 * (1 - Math.abs(k - (codes.length-1)/2) / ((codes.length-1)/2));
    return { code, x: q[0], y: q[1], rot: q[2]*180/Math.PI + 90, nx: dx/L, ny: dy/L, k: depth };
  });
}

function drawTooth(parent, t, st, opts) {
  const o = opts || {}, S = STATE[st], k = KIND(t.code);
  const w = k.w * t.k, h = k.h * t.k;
  const g = s("g", { class: "tooth", "data-fdi": t.code, tabindex: o.flat ? null : "0",
                     role: o.flat ? null : "button",
                     "aria-label": "السن " + t.code + " — " + S.ar }, parent);
  const tr = "rotate(" + t.rot.toFixed(1) + " " + t.x.toFixed(1) + " " + t.y.toFixed(1) + ")";

  s("rect", { class: "tooth__ring", x: t.x - w/2 - 4, y: t.y - h/2 - 4,
              width: w + 8, height: h + 8, rx: 8, transform: tr }, g);
  s("rect", { class: "tooth__b", x: t.x - w/2, y: t.y - h/2, width: w, height: h, rx: 5,
              fill: S.c, transform: tr }, g);
  /* specular highlight along the occlusal third — the cheapest honest
     way to give a flat shape a lit surface */
  s("ellipse", { class: "tooth__hl", cx: t.x, cy: t.y - h * 0.26, rx: w * 0.32, ry: h * 0.13,
                 transform: tr, opacity: st === "missing" ? 0 : .22 }, g);
  if (S.g !== "·") txt(g, S.g, { class: "tooth__g", x: t.x, y: t.y + 3.2, fill: S.ink, transform: tr });
  txt(g, t.code, { class: "tooth__n", x: t.x + t.nx * 22, y: t.y + t.ny * 22 + 3.4 });
  return g;
}

let selected = 46;

(function dentalMap() {
  const svg = $("#arch");
  const teeth = archPts(UP, 350, 180, 280, 110, false).concat(archPts(LO, 350, 225, 280, 115, true));

  /* soft cast shadow so the arch sits in the environment, not on it */
  s("ellipse", { class: "arch-shadow", cx: 350, cy: 210, rx: 300, ry: 150,
                 filter: "url(#soft)", opacity: .45 }, svg);

  teeth.forEach(t => {
    const st = (CHART[t.code] && CHART[t.code].st) || "healthy";
    const g = drawTooth(svg, t, st);
    g.addEventListener("click", () => pick(t.code));
    g.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(t.code); return; }
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault(); e.stopPropagation();      /* keep the deck still */
        const all = UP.concat(LO), i = all.indexOf(t.code);
        const nx = all[(i + (e.key === "ArrowLeft" ? 1 : -1) + all.length) % all.length];
        const node = $('.tooth[data-fdi="' + nx + '"]', svg);
        if (node) { node.focus(); pick(nx); }
      }
    });
  });

  const lg = $("#legend");
  ["healthy","restored","watch","caries","deep","active","crown","implant","missing"].forEach(k => {
    const li = el("li"), sw = el("i", null, STATE[k].g === "·" ? "" : STATE[k].g);
    sw.style.background = STATE[k].c;
    if (k === "missing") sw.style.color = STATE[k].ink;
    li.appendChild(sw);
    li.appendChild(document.createTextNode(STATE[k].ar));
    lg.appendChild(li);
  });

  pick(46);
})();

function pick(code) {
  selected = code;
  $$(".tooth", $("#arch")).forEach(t => t.classList.toggle("sel", +t.dataset.fdi === code));

  const rec = CHART[code], st = (rec && rec.st) || "healthy", k = KIND(code), p = $("#tpanel");
  p.textContent = "";
  p.appendChild(el("p", "tp__fdi", String(code)));
  p.appendChild(el("p", "tp__nm", k.ar + " " + ARCH(code) + " " + SIDE(code) + " · FDI " + code));

  const pill = el("span", "tp__st");
  pill.style.borderColor = STATE[st].c; pill.style.color = STATE[st].c;
  const dot = el("i"); dot.style.background = STATE[st].c;
  pill.appendChild(dot);
  pill.appendChild(el("b", null, STATE[st].g));
  pill.appendChild(document.createTextNode(STATE[st].ar));
  p.appendChild(pill);

  if (!rec) {
    p.appendChild(el("p", "tp__e", "لا يوجد سجلّ سريري على هذه السن. غياب الحدث معلومة أيضًا: السن دخلت النظام سليمة، والتاريخ يبدأ من هنا."));
    return;
  }
  const rows = el("div", "tp__rows");
  const add = (kk, vv, cls) => {
    const r = el("div", "tp__r");
    r.appendChild(el("span", "tp__k", kk));
    r.appendChild(el("span", cls || "", vv));
    rows.appendChild(r);
  };
  add("التشخيص", rec.dx);
  add("الحالة الآن", rec.now);
  if (rec.next)  add("الخطوة القادمة", rec.next, "tp__v--next");
  if (rec.case)  add("الحالة العلاجية", rec.case);
  if (rec.since) add("بدأت في", rec.since);
  if (rec.n)     add("الحصص", rec.n + " مسجّلة");
  if (rec.note)  add("ملاحظة", rec.note);
  p.appendChild(rows);
}

/* ── 10 · TIME MACHINE  ·  slide 09 ──────────────────────────────────
   The same mandibular arch, re-coloured across four years. Fills
   transition rather than swap, so the change reads as evolution.     */

const TM = {
  2024: { st: { 36:"restored", 47:"watch" },
          cap: "السن <b>46</b> سليمة. ترميم قديم على 36 أُدرج في السجلّ عند أوّل زيارة، و47 تحت المراقبة." },
  2025: { st: { 36:"restored", 47:"caries", 46:"caries" },
          cap: "تسوّس يظهر على <b>46</b> و47. من هنا تبدأ الساعة السريرية — لا الرزنامة." },
  2026: { st: { 36:"restored", 47:"restored", 46:"active", 31:"watch" },
          cap: "<b>46</b> في علاج جذور، الحصة 3 من 4. 47 رُمّمت. البنفسجي يعني شيئًا واحدًا: هنا يقف المريض الآن." },
  2027: { st: { 36:"restored", 47:"restored", 46:"crown", 31:"watch" },
          cap: "<b>46</b> تُوّجت والحالة أُغلقت. القصّة كاملة محفوظة على السن نفسها، لا على ذاكرة أحد." }
};
const YEARS = [2024, 2025, 2026, 2027];
let tmTeeth = [];

(function timeMachine() {
  const track = $("#tmTrack");
  YEARS.forEach(y => {
    const b = el("button", "tm__y", String(y));
    b.type = "button"; b.dataset.y = y;
    b.setAttribute("aria-pressed", String(y === 2026));
    b.addEventListener("click", () => year(y));
    track.appendChild(b);
  });

  const svg = $("#tmArch");
  s("ellipse", { class: "arch-shadow", cx: 350, cy: 120, rx: 290, ry: 92, filter: "url(#soft)", opacity: .4 }, svg);
  /* lower arch only: the story lives on teeth 46, 47, 36 */
  tmTeeth = archPts(LO, 350, 108, 275, 104, true);
  tmTeeth.forEach(t => {
    const g = drawTooth(svg, t, "healthy", { flat: true });
    g.classList.add("tm-t");
    g.dataset.fdi = t.code;
  });
  year(2026);
})();

function year(y) {
  $$(".tm__y").forEach(b => {
    const on = +b.dataset.y === y;
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", String(on));
  });
  const states = TM[y].st;
  $$(".tm-t", $("#tmArch")).forEach(g => {
    const code = +g.dataset.fdi, st = states[code] || "healthy", S = STATE[st];
    const body = $(".tooth__b", g), glyph = $(".tooth__g", g), hl = $(".tooth__hl", g);
    body.setAttribute("fill", S.c);
    if (hl) hl.setAttribute("opacity", st === "missing" ? 0 : .22);
    if (glyph) glyph.remove();
    if (S.g !== "·") {
      const t = tmTeeth.filter(x => x.code === code)[0];
      txt(g, S.g, { class: "tooth__g", x: t.x, y: t.y + 3.2, fill: S.ink,
                    transform: "rotate(" + t.rot.toFixed(1) + " " + t.x.toFixed(1) + " " + t.y.toFixed(1) + ")" });
    }
    g.setAttribute("aria-label", "السن " + code + " — " + S.ar);
  });
  $("#tmCap").innerHTML = TM[y].cap;
}

/* ── 11 · VOICE  ·  slide 10 ─────────────────────────────────────────
   Authentic chairside code-switching: Tunisian Arabic carrying French
   dental terminology. The architecture must not assume English.      */

const SAID = 'الـ 46 كمّلنا فيها <span class="lat">canal preparation</span>، حطّينا <span class="lat">obturation provisoire</span>، المريض عندو <span class="lat">sensibilité légère</span>، الحصّة الجاية نعملو <span class="lat">l\'obturation</span>.';

const SLOTS = [
  { k: "السن",            v: '46 <span class="lat">(FDI)</span> — الرحى الأولى السفلى اليمنى' },
  { k: "الإجراء",         v: 'تحضير القناة <span class="lat">· canal preparation</span>' },
  { k: "الحالة",          v: "مكتمل" },
  { k: "ترميم مؤقّت",     v: 'نعم <span class="lat">· obturation provisoire</span>' },
  { k: "عَرَض مبلَّغ عنه", v: 'حساسية خفيفة <span class="lat">· sensibilité légère</span>' },
  { k: "الخطوة القادمة",  v: 'حشو الجذر <span class="lat">· obturation</span>', next: 1 },
  { k: "مستوى الثقة",     v: "مرتفع — مفردات مغلقة (~500 مصطلح)، بنية خانات ثابتة" }
];

const WAVE_N = 110;
(function voice() {
  const svg = $("#wave"), W = 900, H = 130, mid = H / 2;
  const bw = W / WAVE_N;
  for (let i = 0; i < WAVE_N; i++) {
    /* a speech-shaped envelope, not random noise */
    const env = Math.sin((i / WAVE_N) * Math.PI) * (0.55 + 0.45 * Math.sin(i * 0.7) * Math.sin(i * 0.23));
    const h = Math.max(3, Math.abs(env) * (H * 0.78));
    s("rect", { class: "wv", x: (i * bw + bw * 0.22).toFixed(1), y: (mid - h/2).toFixed(1),
                width: (bw * 0.5).toFixed(1), height: h.toFixed(1), rx: 1 }, svg);
  }

  const btn = $("#vrun"), out = $("#said"), slots = $("#slots"),
        gate = $("#gate"), done = $("#gdone");
  let timers = [];
  const bars = $$(".wv", svg);

  function reset() {
    timers.forEach(clearTimeout); timers = [];
    out.innerHTML = ""; slots.textContent = "";
    gate.hidden = true; done.hidden = true;
    bars.forEach(b => b.classList.remove("lit"));
    $("#gedit").disabled = false; $("#gedit").textContent = "تعديل";
    btn.disabled = false; btn.textContent = "شغّل المثال";
  }

  function run() {
    reset();
    btn.disabled = true; btn.textContent = "جارٍ الاستماع…";
    const parts = SAID.match(/<span class="lat">.*?<\/span>|./g) || [];

    if (REDUCED) { out.innerHTML = SAID; bars.forEach(b => b.classList.add("lit"));
                   btn.textContent = "أعد التشغيل"; btn.disabled = false; reveal(); return; }

    let i = 0;
    (function type() {
      if (i >= parts.length) {
        out.innerHTML = SAID;
        btn.textContent = "أعد التشغيل"; btn.disabled = false;
        reveal(); return;
      }
      out.innerHTML = parts.slice(0, ++i).join("") + '<span class="caret"></span>';
      const lit = Math.floor((i / parts.length) * bars.length);
      for (let k = 0; k < lit; k++) bars[k].classList.add("lit");
      timers.push(setTimeout(type, 32));
    })();
  }

  function reveal() {
    SLOTS.forEach((sl, n) => timers.push(setTimeout(() => {
      const d = el("div", "slot" + (sl.next ? " slot--next" : ""));
      d.appendChild(el("dt", null, sl.k));
      const dd = el("dd"); dd.innerHTML = sl.v; d.appendChild(dd);
      slots.appendChild(d);
      if (n === SLOTS.length - 1) gate.hidden = false;
    }, n * 200)));
  }

  btn.addEventListener("click", run);
  $("#gedit").addEventListener("click", () => {
    const dd = $$(".slot dd", slots)[4];
    if (dd) { dd.innerHTML = 'حساسية خفيفة عند البرودة <span class="lat">· sensibilité au froid</span>';
              dd.style.color = "#A98BFF"; }
    $("#gedit").textContent = "عُدّل بواسطة الطبيب"; $("#gedit").disabled = true;
  });
  $("#gok").addEventListener("click", () => { gate.hidden = true; done.hidden = false; });
})();

/* ── 12 · TUNISIAN DENTAL SPEECH  ·  slide 11 ────────────────────── */

const TOKENS = [
  { raw: "نعمل",      lat: 0, role: "فعل إجرائي",       out: "نيّة إجراء" },
  { raw: "obturation",lat: 1, role: "مصطلح فرنسي",      out: "الإجراء: حشو الجذر" },
  { raw: "46",        lat: 1, role: "رقم FDI",          out: "السن: الرحى الأولى السفلى اليمنى" },
  { raw: "وبعدها",    lat: 0, role: "رابط زمني",        out: "تسلسل: الخطوة التالية" },
  { raw: "couronne",  lat: 1, role: "مصطلح فرنسي",      out: "المرحلة القادمة: تاج" }
];
(function language() {
  const box = $("#tokens");
  TOKENS.forEach((t, i) => {
    const n = el("div", "tok");
    n.style.animationDelay = (0.3 + i * 0.11) + "s";
    n.appendChild(el("p", "tok__ar", t.role));
    const raw = el("p", "tok__raw" + (t.lat ? " lat" : ""), t.raw);
    if (t.lat) raw.setAttribute("dir", "ltr");
    n.appendChild(raw);
    n.appendChild(el("p", "tok__out", t.out));
    box.appendChild(n);
  });
})();

/* ── 13 · TREATMENT JOURNEY  ·  slide 12 ─────────────────────────────
   A curved path, flowing right to left. The violet stage is the one
   the patient is standing on.                                        */

const STAGES = [
  { n: "التشخيص",        d: "14 مارس",    s: "done" },
  { n: "خطّة العلاج",     d: "14 مارس",    s: "done" },
  { n: "فتح وتنظيف",     d: "04 سبتمبر", s: "done" },
  { n: "تحضير القناة",   d: "08 سبتمبر", s: "done" },
  { n: "حشو الجذر",      d: "مستحقّة",    s: "now"  },
  { n: "تحضير التاج",    d: "—",         s: "todo" },
  { n: "تركيب التاج",    d: "—",         s: "todo" }
];
(function journeyPath() {
  const svg = $("#jpath"), x0 = 1040, x1 = 80, step = (x0 - x1) / (STAGES.length - 1);
  const pts = STAGES.map((st, i) => [x0 - i * step, 150 + Math.sin(i * 0.9) * 52]);

  s("path", { class: "jp-track", d: smooth(pts, .42) }, svg);
  const nowIdx = STAGES.map(x => x.s).indexOf("now");
  s("path", { class: "jp-done", d: smooth(pts.slice(0, nowIdx + 1), .42),
              "data-draw": "", style: "--d:.3s" }, svg);

  STAGES.forEach((st, i) => {
    const [x, y] = pts[i];
    const g = s("g", { class: "jp-st " + st.s }, svg);
    g.style.animationDelay = (0.45 + i * 0.1) + "s";
    if (st.s === "now") s("circle", { class: "jp-halo", cx: x, cy: y, r: 14 }, g);
    s("circle", { class: "jp-dot", cx: x, cy: y, r: st.s === "now" ? 8 : 6 }, g);
    if (st.s === "done") txt(g, "✓", { x: x, y: y + 3.4, "text-anchor": "middle",
                                        fill: "#07070E", "font-size": 8, "font-weight": 700 });
    const up = i % 2 === 0;
    txt(g, st.n, { class: "jp-lb", x: x, y: y + (up ? -26 : 36) });
    txt(g, st.d, { class: "jp-dt", x: x, y: y + (up ? -44 : 52) });
  });
})();

/* ── 14 · CONTINUITY PIPELINE  ·  slide 13 ───────────────────────────
   Patients flow right to left; some fall out; each dropout becomes a
   task with an owner. Data, then action.                             */

const TASKS = [
  { at: 1, lvl: "عاجل",       c: "#E8615A", who: "أحمد بن علي",    id: "ORA-P-004281",
    why: "الحالة 0042 تجاوزت المهلة السريرية بـ 6 أيام", act: "الطبيب · اليوم", urgent: 1 },
  { at: 2, lvl: "متابعة",     c: "#E0A45C", who: "ليلى الطرابلسي", id: "ORA-P-003914",
    why: "اكتملت الحصة 2، ولم تُحجز الحصة 3 منذ 18 يومًا", act: "السكرتارية · اليوم" },
  { at: 3, lvl: "قرار معلّق",  c: "#A3A6BE", who: "سنية بن رمضان", id: "ORA-P-002877",
    why: "قبلت خطّة العلاج ولم تبدأ منذ 41 يومًا", act: "السكرتارية · هذا الأسبوع" },
  { at: 4, lvl: "استدعاء",    c: "#5FBFA5", who: "فوزي العياري",   id: "ORA-P-001456",
    why: "استدعاء دوري مستحقّ منذ 3 أشهر", act: "قائمة الاستدعاء" }
];
(function pipeline() {
  const svg = $("#pipe"), W = 1120;
  const stages = ["موعد","علاج","الحصة التالية","إكمال","استدعاء"];
  const x0 = 1050, x1 = 90, seg = (x0 - x1) / (stages.length - 1), y = 92, h = 74;

  s("rect", { class: "pp-body", x: x1 - 30, y: y - h/2, width: (x0 - x1) + 60, height: h, rx: h/2 }, svg);
  s("path", { class: "pp-flow", d: "M" + (x0 + 20) + " " + y + " L" + (x1 - 20) + " " + y,
              "data-draw": "", style: "--d:.25s" }, svg);

  stages.forEach((st, i) => {
    const x = x0 - i * seg;
    s("circle", { cx: x, cy: y, r: 5, fill: "#12101F", stroke: "rgba(163,166,190,.3)", "stroke-width": 1.2 }, svg);
    txt(svg, st, { class: "pp-stage", x: x, y: y - 32 });
  });

  const BW = 320, BH = 48;
  TASKS.forEach((t, i) => {
    const x = x0 - (t.at - .5) * seg;
    const bx = Math.min(W - BW - 20, Math.max(20, x - BW / 2));
    const by = 186 + i * 62, cxb = bx + BW / 2;

    /* the dropout, and the line the system throws after it */
    const drop = s("circle", { class: "pp-drop", cx: x, cy: y + h/2 + 11, r: 3.6 }, svg);
    drop.style.fill = t.c;
    drop.style.animationDelay = (0.5 + i * 0.12) + "s";
    const catcher = s("path", { class: "pp-catch",
      d: "M" + x + " " + (y + h/2 + 15) + " C" + x + " " + (by - 34) + " " + cxb + " " + (by - 40) + " " + cxb + " " + (by - BH/2) }, svg);
    catcher.style.stroke = t.c;

    const g = s("g", { class: "pp-task" + (t.urgent ? " urgent" : "") }, svg);
    g.style.animationDelay = (0.75 + i * 0.14) + "s";
    s("rect", { x: bx, y: by - BH/2, width: BW, height: BH, rx: 6 }, g);
    const bar = s("rect", { x: bx + BW - 4, y: by - BH/2, width: 4, height: BH, rx: 2 }, g);
    bar.style.fill = t.c; bar.style.stroke = "none";

    /* one centred line carrying name and priority together */
    const l1 = s("text", { class: "pp-tl", x: cxb, y: by - 3, "text-anchor": "middle" }, g);
    const a = s("tspan", null, l1); a.textContent = t.who;
    const b = s("tspan", { "font-size": "10.5" }, l1); b.textContent = "  ·  " + t.lvl + " · " + t.act;
    b.style.fill = t.c;
    txt(g, t.why, { class: "pp-td", x: cxb, y: by + 14, "text-anchor": "middle" });
  });
})();

/* ── 15 · PRACTICE PULSE  ·  slide 14 ────────────────────────────── */

const KPI = 71;
const METRICS = [
  { k: "علاجات متوقّفة",        v: "12",         d: "−7 عن الشهر الفارط", c: "up" },
  { k: "معدّل عدم الحضور",      v: "9%",         d: "−3 نقاط",            c: "up" },
  { k: "الحصص لكلّ حالة",       v: "3.4",        d: "مستقرّ",              c: "flat" },
  { k: "الامتثال للاستدعاء",    v: "62%",        d: "+11 نقطة",           c: "up" },
  { k: "قيمة العلاجات المعلّقة", v: "18,400 د.ت", d: "قابلة للاسترجاع",     c: "flat" },
  { k: "مرضى أُعيد تنشيطهم",    v: "23",         d: "هذا الفصل",          c: "up" }
];
(function pulse() {
  const svg = $("#gauge"), cx = 170, cy = 170, R = 132;
  const defs = s("defs", null, svg);
  const gr = s("linearGradient", { id: "ggrad", x1: "0", y1: "1", x2: "1", y2: "0" }, defs);
  s("stop", { offset: "0%",  "stop-color": "#7C6BF5" }, gr);
  s("stop", { offset: "60%", "stop-color": "#A98BFF" }, gr);
  s("stop", { offset: "100%","stop-color": "#4DD6E8" }, gr);

  /* 270° arc opening at the bottom */
  const A0 = Math.PI * 0.75, SPAN = Math.PI * 1.5;
  const pt = a => [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  const arc = (from, to) => {
    const p0 = pt(from), p1 = pt(to);
    return "M" + p0[0].toFixed(1) + " " + p0[1].toFixed(1) +
           "A" + R + " " + R + " 0 " + ((to - from) > Math.PI ? 1 : 0) + " 1 " + p1[0].toFixed(1) + " " + p1[1].toFixed(1);
  };
  s("path", { class: "g-track", d: arc(A0, A0 + SPAN) }, svg);
  s("path", { class: "g-fill",  d: arc(A0, A0 + SPAN * (KPI/100)), "data-draw": "", style: "--d:.45s" }, svg);

  /* ticks: six months of history, the lit ones already achieved */
  for (let i = 0; i < 48; i++) {
    const a = A0 + (i / 47) * SPAN, r0 = R - 16, r1 = R - 24;
    const lit = (i / 47) * 100 <= KPI;
    s("line", { class: "g-tick" + (lit ? " lit" : ""),
                x1: (cx + r0*Math.cos(a)).toFixed(1), y1: (cy + r0*Math.sin(a)).toFixed(1),
                x2: (cx + r1*Math.cos(a)).toFixed(1), y2: (cy + r1*Math.sin(a)).toFixed(1),
                opacity: lit ? .55 : .3 }, svg);
  }
  const ring = $("#pulseRing");
  METRICS.forEach(m => {
    const li = el("li", "pm");
    li.appendChild(el("p", "pm__k", m.k));
    li.appendChild(el("p", "pm__v", m.v));
    li.appendChild(el("p", "pm__d " + m.c, m.d));
    ring.appendChild(li);
  });

  /* the headline number counts up on arrival */
  const pv = $("#pv");
  pv.dataset.count = KPI;
  pv.setAttribute("data-count", KPI);
})();

/* ── 16 · TODAY  ·  slide 15 ─────────────────────────────────────────
   The product surface itself. Real spacing, real hierarchy, real
   clinical data — a screen that could ship.                          */

const TODAY = [
  { t: "08:30", nm: "أحمد بن علي", meta: 'السن <span class="fdi">46</span> · الحصة 3 من 4 · حشو الجذر',
    chip: "متأخّرة 6 أيام", c: "#E8615A", alert: 1 },
  { t: "09:15", nm: "مريم الشابّي", meta: "مريضة جديدة · ألم أسفل يمين",
    chip: "تقييم أوّل", c: "#A3A6BE" },
  { t: "10:00", nm: "ياسين المؤدّب", meta: 'السن <span class="fdi">26</span> · تركيب التاج',
    chip: "إغلاق حالة", c: "#5FBFA5" },
  { t: "11:00", nm: "سامي بن حسن", meta: 'السن <span class="fdi">37</span> · علاج متوقّف منذ 28 يومًا',
    chip: "استئناف", c: "#E0A45C" },
  { t: "14:30", nm: "نور الهدى قرمازي", meta: 'السن <span class="fdi">16</span> · ترميم مركّب',
    chip: "حصة وحيدة", c: "#A3A6BE" }
];
(function todayUI() {
  const ui = $("#uiToday");
  const bar = el("div", "ui__bar");
  const dots = el("div", "ui__dots");
  for (let i = 0; i < 3; i++) dots.appendChild(el("i"));
  bar.appendChild(dots);
  bar.appendChild(el("span", "ui__ttl", "ORAVIA · شاشة اليوم · عيادة د. سلمى بن عمّار"));
  ui.appendChild(bar);

  const head = el("div", "ui__head");
  const h1 = el("h3", "ui__h1");
  h1.innerHTML = 'اليوم · <b>8</b> مرضى';
  head.appendChild(h1);
  head.appendChild(el("span", "ui__date", "الخميس 03 سبتمبر 2026"));
  ui.appendChild(head);

  TODAY.forEach(r => {
    const row = el("div", "ui__row" + (r.alert ? " alert" : ""));
    row.appendChild(el("span", "ui__t", r.t));
    const mid = el("div");
    mid.appendChild(el("p", "ui__nm", r.nm));
    const m = el("p", "ui__meta"); m.innerHTML = r.meta; mid.appendChild(m);
    row.appendChild(mid);
    const chip = el("span", "ui__chip", r.chip);
    chip.style.borderColor = r.c; chip.style.color = r.c;
    row.appendChild(chip);
    ui.appendChild(row);
  });

  const brief = el("div", "ui__brief");
  brief.appendChild(el("p", "ui__bl", "الموجز السريري · أحمد بن علي · 08:30"));
  const grid = el("div", "ui__bg");
  [["آخر زيارة","12 سبتمبر · تحضير القناة"],
   ["الحالة الآن","علاج جذور — جارٍ"],
   ["عَرَض مبلَّغ عنه","حساسية خفيفة"],
   ["الخطوة اليوم","حشو الجذر · 45 دقيقة"],
   ["حالات مفتوحة أخرى","16 — تسوّس سطحي"],
   ["تنبيه","المهلة السريرية تجاوزت 14 يومًا"]].forEach(p => {
    const i = el("div", "ui__bi", p[1]);
    i.insertBefore(el("span", null, p[0]), i.firstChild);
    grid.appendChild(i);
  });
  brief.appendChild(grid);
  ui.appendChild(brief);
})();

/* ── 17 · PATIENT SURFACE  ·  slide 16 ───────────────────────────── */

(function patientUI() {
  const g = $("#uiPatient");
  g.appendChild(el("p", "gl__hi", "أهلًا أحمد"));

  const cur = el("div");
  cur.appendChild(el("p", "gl__k", "علاجك الحالي"));
  cur.appendChild(el("p", "gl__v", "السن 46 — علاج جذور"));
  const bar = el("div", "gl__bar"); const fill = el("i");
  fill.style.inlineSize = "75%"; bar.appendChild(fill); cur.appendChild(bar);
  cur.appendChild(el("p", "gl__p", "3 من 4 حصص"));
  g.appendChild(cur);

  const nx = el("div", "gl__next");
  nx.appendChild(el("p", "gl__k", "الخطوة القادمة"));
  nx.appendChild(el("p", "gl__v", "حشو الجذر"));
  nx.appendChild(el("p", "gl__when", "الثلاثاء 15 سبتمبر · 15:30 · 45 دقيقة"));
  g.appendChild(nx);

  g.appendChild(el("p", "gl__note", "تأجيل هذه الحصة يُبقي القناة مفتوحة. يُنصح بعدم تجاوز أسبوعين."));
})();

/* ── 18 · DENTAL PASSPORT  ·  slide 17 ───────────────────────────── */

const PASS = [
  { f: "16", st: "caries",   h: "تسوّس سطحي · مخطّط للترميم" },
  { f: "26", st: "crown",    h: "تاج خزفي · 2022 · مستقرّ" },
  { f: "36", st: "restored", h: "ترميم أملغم · 2019 · ممارس سابق" },
  { f: "46", st: "active",   h: "علاج جذور · جارٍ · الحصة 3 من 4" }
];
(function passport() {
  const card = $("#passCard");
  const top = el("div", "pc__top");
  const L = el("div");
  L.appendChild(el("p", "pc__lb", "ORAVIA DENTAL PASSPORT"));
  const id = el("p", "pc__id", PATIENT.id); id.setAttribute("dir", "ltr");
  L.appendChild(id);
  L.appendChild(el("p", "pc__nm", PATIENT.name));
  top.appendChild(L);
  const mk = document.createElementNS(NS, "svg");
  mk.setAttribute("viewBox", "0 0 34 46"); mk.setAttribute("width", "26"); mk.setAttribute("height", "35");
  mk.style.color = "#F3F0EA";
  s("use", { href: "#oravia-mark" }, mk);
  top.appendChild(mk);
  card.appendChild(top);

  const teeth = el("div", "pc__teeth");
  PASS.forEach(p => {
    const d = el("div", "pt");
    const f = el("p", "pt__f", p.f); f.setAttribute("dir", "ltr");
    d.appendChild(f);
    const st = el("p", "pt__s");
    const i = el("i"); i.style.background = STATE[p.st].c;
    st.appendChild(i);
    st.appendChild(document.createTextNode(STATE[p.st].g + " " + STATE[p.st].ar));
    d.appendChild(st);
    d.appendChild(el("p", "pt__h", p.h));
    teeth.appendChild(d);
  });
  card.appendChild(teeth);

  /* consent flow — the patient is the grantor, always */
  const svg = $("#consent");
  const CX = 210, BW = 210, BH = 52;
  const boxes = [
    { y: 4,   t: "المريض",           s: "مالك الإذن، دائمًا", key: 1 },
    { y: 88,  t: "إذن محدّد النطاق",  s: "نطاق · مدّة · سحب" },
    { y: 172, t: "طبيب جديد",        s: "وصول جزئي ومؤقّت" }
  ];
  boxes.forEach((b, i) => {
    const g = s("g", null, svg);
    s("rect", { class: "cs-box" + (b.key ? " key" : ""), x: CX - BW/2, y: b.y,
                width: BW, height: BH, rx: 7 }, g);
    txt(g, b.t, { class: "cs-t", x: CX, y: b.y + 23 });
    txt(g, b.s, { class: "cs-s", x: CX, y: b.y + 40 });
    if (i < boxes.length - 1) {
      const y0 = b.y + BH, y1 = b.y + BH + 24;
      s("path", { class: "cs-arrow", d: "M" + CX + " " + y0 + " L" + CX + " " + y1 }, svg);
      s("path", { class: "cs-arrow", d: "M" + (CX - 4) + " " + (y1 - 6) + " L" + CX + " " + y1 + " L" + (CX + 4) + " " + (y1 - 6) }, svg);
    }
  });
  txt(svg, "السحب فوري وكامل", { class: "cs-s", x: CX, y: 242 });
})();

/* ── 19 · MARKET  ·  slide 18 ────────────────────────────────────────
   A stylised Tunisia. Deliberately schematic rather than a precise
   cartographic outline — it carries the centres of private practice,
   not geography.                                                     */

const TN_PATH = "M110 11 L118 17 L127 35 L139 30 L161 24 L152 45 L144 55 L153 82 L165 107 " +
                "L150 130 L128 161 L140 179 L169 202 L182 249 L104 333 L84 247 L44 186 " +
                "L34 168 L36 154 L50 118 L52 109 L50 73 L48 51 L70 30 L92 20 Z";
const CITIES = [
  { n: "تونس",   x: 127, y: 36,  r: 8 },
  { n: "صفاقس",  x: 150, y: 129, r: 6.4 },
  { n: "سوسة",   x: 150, y: 76,  r: 5.6 },
  { n: "نابل",   x: 150, y: 46,  r: 4.4 },
  { n: "بنزرت",  x: 118, y: 18,  r: 4 },
  { n: "المنستير",x: 154, y: 84,  r: 4 },
  { n: "القيروان",x: 133, y: 92,  r: 3.6 },
  { n: "قابس",   x: 128, y: 163, r: 3.6 }
];
const TAM = [
  { k: "TAM", v: "أطباء الأسنان الممارسون في تونس", n: "≈ 4,500 مسجّل بالعمادة · ≈ 3,000 بالقطاع الخاص",
    s: "تصريح د. شكيب عيّاد، رئيس العمادة الوطنية لأطباء الأسنان — L'Économiste Maghrébin، مارس 2016" },
  { k: "SAM", v: "العيادات الخاصة القادرة على تبنّي حلّ سحابي مدفوع", n: "فرضية قيد الاختبار",
    s: "تُشتقّ من كثافة تونس الكبرى وصفاقس وسوسة، بعد تثبيت الرقم المرجعي" },
  { k: "SOM", v: "هدف السنتين الأوليَين", n: "فرضية قيد الاختبار",
    s: "يُبنى انطلاقًا من معدّل التحويل الفعلي في مجموعة التجريب الأولى" }
];
(function market() {
  const svg = $("#tnmap");
  s("path", { class: "tn-shape", d: TN_PATH, "data-draw": "", style: "--d:.3s" }, svg);
  CITIES.forEach((c, i) => {
    const g = s("g", { class: "tn-node" }, svg);
    g.style.animationDelay = (0.7 + i * 0.09) + "s";
    s("circle", { class: "tn-halo", cx: c.x, cy: c.y, r: c.r * 2.2 }, g);
    s("circle", { class: "tn-city", cx: c.x, cy: c.y, r: c.r * 0.42 }, g);
    txt(g, c.n, { class: "tn-lb", x: c.x + c.r + 4, y: c.y + 3 });
  });

  const list = $("#tam");
  TAM.forEach(t => {
    const li = el("li");
    li.appendChild(el("span", "tam__k", t.k));
    li.appendChild(el("span", "tam__v", t.v));
    li.appendChild(el("span", "tam__n", t.n));
    li.appendChild(el("span", "tam__s", t.s));
    list.appendChild(li);
  });
})();

/* ── 20 · POSITIONING MATRIX  ·  slide 19 ────────────────────────────
   A diagram in fixed orientation, so physical coordinates on purpose:
   right = deep Tunisian localisation, top = journey intelligence.    */

const PLAYERS = [
  { n: "ORAVIA",       x: .74, y: .16, us: 1 },
  { n: "DoliDentiste", x: .78, y: .76 },
  { n: "Dentisys",     x: .66, y: .85 },
  { n: "ClinicFlow",   x: .55, y: .70 },
  { n: "Visiodent",    x: .20, y: .78 }
];
(function matrix() {
  const svg = $("#mtx"), P = 54, W = 520, H = 470, w = W - P*2, h = H - P*2 - 20;

  s("rect", { class: "mx-quad", x: P + w/2, y: P, width: w/2, height: h/2 }, svg);
  for (let i = 1; i < 4; i++) {
    s("line", { class: "mx-grid", x1: P + (w/4)*i, y1: P, x2: P + (w/4)*i, y2: P + h }, svg);
    s("line", { class: "mx-grid", x1: P, y1: P + (h/4)*i, x2: P + w, y2: P + (h/4)*i }, svg);
  }
  s("rect", { x: P, y: P, width: w, height: h, fill: "none", stroke: "rgba(163,166,190,.14)", "stroke-width": 1, rx: 4 }, svg);
  s("line", { class: "mx-axis", x1: P, y1: P + h/2, x2: P + w, y2: P + h/2 }, svg);
  s("line", { class: "mx-axis", x1: P + w/2, y1: P, x2: P + w/2, y2: P + h }, svg);

  txt(svg, "ذكاء رحلة العلاج", { class: "mx-lb", x: P + w/2, y: P - 16, "text-anchor": "middle" });
  txt(svg, "إدارة العيادة",   { class: "mx-lb", x: P + w/2, y: P + h + 24, "text-anchor": "middle" });
  txt(svg, "توطين تونسي عميق", { class: "mx-lb", x: P + w * 0.79, y: P + h + 30, "text-anchor": "middle" });
  txt(svg, "حلّ عام",          { class: "mx-lb", x: P + w * 0.13, y: P + h + 30, "text-anchor": "middle" });

  PLAYERS.forEach((p, i) => {
    const x = P + p.x * w, y = P + p.y * h;
    const g = s("g", { class: "mx-p" + (p.us ? " mx-us" : "") }, svg);
    g.style.animationDelay = (0.5 + i * 0.12) + "s";
    if (p.us) s("circle", { cx: x, cy: y, r: 20, fill: "#7C6BF5", opacity: .14 }, g);
    s("circle", { class: "mx-dot", cx: x, cy: y, r: p.us ? 6 : 4 }, g);
    const t = txt(g, p.n, { class: "mx-nm", x: x, y: y - 14, "text-anchor": "middle" });
    t.setAttribute("dir", "ltr");
  });
})();

/* ── 21 · TIERS  ·  slide 20 ─────────────────────────────────────── */

const TIERS = [
  { n: "Solo", w: "طبيب واحد، دون سكرتارية",
    f: "المحرّكان الأول والثاني · المخطّط السنّي · الحالات العلاجية · الجدول الزمني", e: "الأساس السريري كاملًا" },
  { n: "Professional", w: "طبيب مع سكرتارية", mid: 1,
    f: "يضيف محرّك الاستمرارية · قوائم المهامّ · شاشة اليوم · لوحة الانتباه", e: "هنا تُستعاد العلاجات المتوقّفة" },
  { n: "Clinic", w: "عدّة أطباء وكراسي",
    f: "يضيف الأدوار المتقدّمة · ذكاء العيادة الكامل · استغلال الكراسي", e: "للعيادات متعدّدة الممارسين" }
];
(function tiers() {
  const box = $("#tiers");
  TIERS.forEach(t => {
    const a = el("article", "tier" + (t.mid ? " tier--mid" : ""));
    const h = el("h3", null, t.n); h.setAttribute("dir", "ltr");
    a.appendChild(h);
    a.appendChild(el("p", "tier__w", t.w));
    a.appendChild(el("p", "tier__f", t.f));
    a.appendChild(el("p", "tier__e", t.e));
    box.appendChild(a);
  });
})();

/* ── 22 · ROADMAP  ·  slide 21 ───────────────────────────────────── */

const ROAD = [
  { ph: "NOW",    ar: "الآن", items: ["السجلّ السريري الأساسي","رحلة العلاج","الاستمرارية","ذكاء العيادة"] },
  { ph: "NEXT",   ar: "التالي", items: ["التجسيم ثلاثي الأبعاد","الالتقاط الصوتي","بوّابة المريض"] },
  { ph: "FUTURE", ar: "لاحقًا", items: ["الجواز السنّي","ذكاء متقدّم","تعدّد العيادات","التوسّع الإقليمي"], future: 1 }
];
(function roadmap() {
  const svg = $("#road"), pts = [[990,210],[640,150],[290,110],[40,74]];
  s("path", { class: "rd-line", d: smooth(pts, .45), "data-draw": "", style: "--d:.25s" }, svg);

  ROAD.forEach((ph, i) => {
    const [x, y] = pts[i];
    const g = s("g", { class: "rd-g" }, svg);
    g.style.animationDelay = (0.6 + i * 0.22) + "s";
    if (!ph.future) s("circle", { cx: x, cy: y, r: 15, fill: "#7C6BF5", opacity: .16 }, g);
    s("circle", { class: "rd-node" + (ph.future ? " future" : ""), cx: x, cy: y, r: 6 }, g);
    txt(g, ph.ph, { class: "rd-ph" + (ph.future ? " future" : ""), x: x, y: y - 26, "text-anchor": "middle" });
    txt(g, ph.ar, { class: "rd-it", x: x, y: y + 32, "text-anchor": "middle" });
    ph.items.forEach((it, k) => {
      txt(g, it, { class: "rd-it", x: x, y: y + 58 + k * 23, "text-anchor": "middle",
                   opacity: ph.future ? .62 : 1 }, g);
    });
  });
})();

/* ── BOOT ─────────────────────────────────────────────────────────── */
const hash = parseInt((location.hash || "").replace("#s", ""), 10);
go(isNaN(hash) ? 0 : hash - 1);

})();
