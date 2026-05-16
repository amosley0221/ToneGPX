/* Portfolio — dark luxury minimalist, page-based */
const { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } = React;

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Websites", "Dashboards", "Graphic", "Identity"];

const PROJECTS = [
  {
    id: "vantage", title: "Vantage", subtitle: "Financial intelligence dashboard",
    cat: "Dashboards", year: "2025", role: "Product Design", client: "Vantage Capital",
    tags: ["Data viz", "Dark UI", "Web app"],
    blurb: "A trading intelligence surface for institutional desks. Designed dense data layouts that breathe — clarity over chrome.",
    deliverables: ["UX architecture", "20+ screens", "Component library", "Motion specs"],
    palette: ["#0c0d10", "#171a1f", "#e7e3da", "#c79a5b"],
  },
  {
    id: "marrow", title: "Marrow", subtitle: "Editorial publication",
    cat: "Websites", year: "2025", role: "Art Direction · Web", client: "Marrow Mag",
    tags: ["Editorial", "Typography", "CMS"],
    blurb: "A long-read publication for design criticism. Built around generous typography and confident silence.",
    deliverables: ["Brand system", "Site design", "CMS integration"],
    palette: ["#100f0d", "#1a1a18", "#f0ece1", "#a8896b"],
  },
  {
    id: "halen", title: "Halen Atelier", subtitle: "Architecture studio",
    cat: "Websites", year: "2024", role: "Web Design", client: "Halen Atelier",
    tags: ["Portfolio", "Webflow", "Motion"],
    blurb: "Portfolio for a contemporary architecture studio. Spaces speak first; type stays out of the way.",
    deliverables: ["Information architecture", "Visual design", "Motion direction"],
    palette: ["#0a0a0a", "#1c1c1c", "#dcd6c8", "#7a8a78"],
  },
  {
    id: "obsidian", title: "Obsidian OS", subtitle: "Internal operations console",
    cat: "Dashboards", year: "2024", role: "Lead Designer", client: "Obsidian Labs",
    tags: ["Internal tools", "Workflows", "Design system"],
    blurb: "An ops console replacing a sprawl of spreadsheets. Reduced average task time by 41%.",
    deliverables: ["Research", "Design system", "60+ screens"],
    palette: ["#0b0d0e", "#16181b", "#e6e4df", "#bc7a4a"],
  },
  {
    id: "linnea", title: "Linnea", subtitle: "Skincare brand identity",
    cat: "Identity", year: "2024", role: "Identity", client: "Linnea Apothecary",
    tags: ["Wordmark", "Packaging", "Print"],
    blurb: "Restrained botanical identity. A wordmark that wears well across glass, paper and pixel.",
    deliverables: ["Wordmark", "Packaging", "Stationery", "Guidelines"],
    palette: ["#0d0c0a", "#1f1c17", "#ebe4d3", "#9f7e54"],
  },
  {
    id: "field-notes", title: "Field Notes", subtitle: "Print + digital zine",
    cat: "Graphic", year: "2023", role: "Graphic Design", client: "Self-initiated",
    tags: ["Print", "Layout", "Typography"],
    blurb: "A quarterly print zine on the craft of design. Editorial layouts that reward slow reading.",
    deliverables: ["Editorial design", "4 issues", "Typesetting"],
    palette: ["#0e0e0e", "#1a1a1a", "#ece6d6", "#b5895c"],
  },
  {
    id: "atlas", title: "Atlas", subtitle: "Logistics control room",
    cat: "Dashboards", year: "2023", role: "Senior Designer", client: "Atlas Freight",
    tags: ["Maps", "Realtime", "B2B"],
    blurb: "A realtime fleet view for dispatchers running thousands of moves a day. Every pixel earns its place.",
    deliverables: ["Discovery", "Design system", "Map UX", "Engineering handoff"],
    palette: ["#0a0c0f", "#15191e", "#e3e1da", "#8aa6c8"],
  },
  {
    id: "north-mark", title: "Northmark", subtitle: "Investment firm site",
    cat: "Websites", year: "2023", role: "Web Design", client: "Northmark Partners",
    tags: ["Marketing site", "Finance", "Brand"],
    blurb: "Quiet authority for a multi-stage investor. The site does the talking; the work speaks louder.",
    deliverables: ["Site design", "CMS", "Launch"],
    palette: ["#0c0c0c", "#181818", "#e9e6dd", "#a68b65"],
  },
  {
    id: "kindred", title: "Kindred", subtitle: "Poster series",
    cat: "Graphic", year: "2023", role: "Graphic Design", client: "Kindred Festival",
    tags: ["Posters", "Type", "Print"],
    blurb: "A set of seven posters for a music festival. Built from a single grid and a single voice.",
    deliverables: ["Poster system", "Wayfinding", "Merch"],
    palette: ["#0a0a0a", "#1a1a1a", "#ece6d6", "#c97a5a"],
  },
];

const PAGES = [
  { id: "home",    label: "Home",    num: "00" },
  { id: "work",    label: "Work",    num: "01" },
  { id: "index",   label: "Index",   num: "02" },
  { id: "about",   label: "About",   num: "03" },
  { id: "contact", label: "Contact", num: "04" },
];

// ─── Placeholder ────────────────────────────────────────────────────────────
function Placeholder({ project, idx = 0, label, ratio = "4 / 3", dense = false }) {
  const hue = useMemo(() => {
    let h = 0;
    for (let i = 0; i < project.id.length; i++) h = (h * 31 + project.id.charCodeAt(i)) | 0;
    return Math.abs(h);
  }, [project.id]);
  const a = project.palette[1];
  const b = project.palette[0];
  const tone = project.palette[3];
  const stripe = (hue + idx) % 4;
  const angle = 20 + ((hue + idx * 7) % 50);
  const bg =
    stripe === 0
      ? `repeating-linear-gradient(${angle}deg, ${a} 0 22px, ${b} 22px 44px)`
      : stripe === 1
      ? `linear-gradient(180deg, ${a}, ${b} 70%)`
      : stripe === 2
      ? `radial-gradient(120% 80% at 30% 20%, ${a} 0%, ${b} 70%)`
      : `repeating-linear-gradient(${angle + 90}deg, ${a} 0 2px, transparent 2px 14px), linear-gradient(180deg, ${b}, ${a})`;
  return (
    <div className="ph" style={{ background: bg, aspectRatio: ratio }}>
      <div className="ph-frame" />
      <div className="ph-meta">
        <span className="mono">{label || `${project.title.toUpperCase()} / ${String(idx + 1).padStart(2, "0")}`}</span>
        <span className="mono dim">{project.cat.toUpperCase()}</span>
      </div>
      <div className="ph-mark" style={{ color: tone }}>
        <span className="serif">{project.title[0]}</span>
      </div>
      {dense && (
        <div className="ph-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="ph-bar" style={{ height: `${20 + ((hue + i * 13) % 60)}%`, background: tone, opacity: 0.18 + (i % 3) * 0.08 }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Project mockups ───────────────────────────────────────────────────────
const MOCKUPS = {
  vantage: ([bg, surf, ink, tone]) => (
    <div className="mk-dash">
      <div className="mk-row mk-dash__bar" style={{ color: ink, borderColor: surf }}>
        <div className="mk-row" style={{ gap: "1.6cqw" }}>
          <span className="mk-mark" style={{ fontSize: "4.4cqw" }}>V</span>
          <span className="mk-mono mk-dim">Equity desk · Live</span>
        </div>
        <span className="mk-mono mk-dim">16:42 UTC</span>
      </div>
      <div className="mk-dash__grid">
        <div className="mk-pnl mk-dash__chart" style={{ background: surf, color: ink }}>
          <div className="mk-row mk-mono">
            <span>SPY · 1D</span>
            <span style={{ color: tone }}>+0.42%</span>
          </div>
          <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="mk-grow">
            <line x1="0" y1="58" x2="200" y2="58" stroke={ink} strokeOpacity="0.12" strokeDasharray="2 3" />
            {Array.from({ length: 28 }).map((_, i) => {
              const x = 4 + i * 7;
              const up = ((i * 7 + 1) % 5) > 2;
              const y1 = 14 + ((i * 13) % 28);
              const y2 = y1 + 6 + ((i * 9) % 22);
              return (
                <g key={i}>
                  <line x1={x} y1={y1 - 5} x2={x} y2={y2 + 5} stroke={up ? tone : ink} strokeWidth="0.6" opacity={up ? 0.7 : 0.4} />
                  <rect x={x - 1.7} y={y1} width="3.4" height={y2 - y1} fill={up ? tone : ink} fillOpacity={up ? 0.9 : 0.55} />
                </g>
              );
            })}
          </svg>
        </div>
        <div className="mk-dash__stats">
          {[["NAV", "+2.4", "%", 1], ["VOL", "184", "K", 0], ["IV", "12.6", "", 0], ["β", "0.92", "", 0]].map(([k, v, u, hot]) => (
            <div key={k} className="mk-pnl mk-dash__stat" style={{ background: surf, color: ink }}>
              <span className="mk-mono mk-dim">{k}</span>
              <span className="mk-mark mk-dash__statv" style={{ color: hot ? tone : ink }}>
                {v}<i className="mk-mono mk-dash__unit">{u}</i>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mk-dash__rows" style={{ color: ink }}>
        {["AAPL", "MSFT", "NVDA", "TSLA", "META"].map((t, i) => {
          const up = i % 2 === 0;
          const pts = Array.from({ length: 18 }).map((_, j) => `${j * 3.4},${8 + Math.sin((i + 1) * j * 0.55 + 0.4) * 4.5}`).join(" ");
          return (
            <div key={t} className="mk-dash__row" style={{ borderColor: surf }}>
              <span className="mk-mono">{t}</span>
              <svg viewBox="0 0 60 16" preserveAspectRatio="none" className="mk-dash__spark">
                <polyline points={pts} stroke={up ? tone : ink} strokeOpacity="0.8" strokeWidth="0.9" fill="none" />
              </svg>
              <span className="mk-mono" style={{ color: up ? tone : ink, opacity: up ? 1 : 0.55 }}>
                {up ? "+" : "−"}{(i * 0.18 + 0.31).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  ),

  marrow: ([bg, surf, ink, tone]) => (
    <div className="mk-mag" style={{ color: ink }}>
      <div className="mk-row mk-mag__bar">
        <span className="mk-mark mk-mag__brand">Marrow</span>
        <div className="mk-row mk-mono mk-dim" style={{ gap: "2.4cqw" }}>
          <span>Essays</span><span>Interviews</span><span>Archive</span>
        </div>
        <span className="mk-mono mk-dim">Issue 14</span>
      </div>
      <div className="mk-mag__hd">
        <span className="mk-mono mk-dim">— Long read · 12 min</span>
        <h4 className="mk-mark mk-mag__h" style={{ color: ink }}>
          On the <em style={{ color: tone, fontStyle: "italic" }}>quiet</em><br />act of editing.
        </h4>
        <span className="mk-mono mk-dim">By Camille Mercer · Photography by N. Falk</span>
      </div>
      <div className="mk-mag__cols" style={{ color: ink }}>
        {[0, 1, 2].map((c) => (
          <div key={c} className="mk-mag__col">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mk-mag__line" style={{ background: ink, width: `${68 + ((i + c) * 11) % 32}%` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  ),

  halen: ([bg, surf, ink, tone]) => (
    <div className="mk-arch" style={{ color: ink }}>
      <div className="mk-row mk-arch__bar">
        <span className="mk-mark mk-arch__brand">HALEN</span>
        <div className="mk-row mk-mono mk-dim" style={{ gap: "2cqw" }}>
          <span>Studio</span><span>Projects</span><span>Press</span><span>Contact</span>
        </div>
      </div>
      <div className="mk-arch__stage">
        <svg viewBox="0 0 200 110" preserveAspectRatio="xMidYMax meet" className="mk-arch__svg">
          <rect x="0" y="92" width="200" height="18" fill={surf} />
          <rect x="38" y="44" width="56" height="48" fill={surf} stroke={ink} strokeOpacity="0.15" />
          <rect x="94" y="28" width="44" height="64" fill={surf} stroke={ink} strokeOpacity="0.2" />
          <rect x="138" y="58" width="38" height="34" fill={surf} stroke={ink} strokeOpacity="0.15" />
          <polygon points="38,44 66,30 94,44" fill={tone} fillOpacity="0.55" />
          <polygon points="94,28 116,14 138,28" fill={tone} fillOpacity="0.4" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={"a" + i} x={44 + i * 8} y="56" width="3" height="6" fill={bg} opacity="0.6" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={"b" + i} x={100 + i * 7} y="42" width="3" height="6" fill={bg} opacity="0.6" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={"c" + i} x={100 + i * 7} y="58" width="3" height="6" fill={bg} opacity="0.6" />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <rect key={"d" + i} x={144 + i * 7} y="68" width="3" height="6" fill={bg} opacity="0.6" />
          ))}
        </svg>
      </div>
      <div className="mk-row mk-arch__cap mk-mono mk-dim">
        <span>Casa Ourique — 2024</span>
        <span>Lisbon · PT</span>
      </div>
    </div>
  ),

  obsidian: ([bg, surf, ink, tone]) => (
    <div className="mk-ops" style={{ color: ink }}>
      <aside className="mk-ops__side" style={{ background: surf }}>
        <span className="mk-mark mk-ops__brand">◆</span>
        {["Inbox", "Orders", "Routing", "Audit", "Team", "Reports"].map((l, i) => (
          <div key={l} className="mk-row mk-ops__nav" style={{ opacity: i === 1 ? 1 : 0.5 }}>
            <span className="mk-ops__dot" style={{ background: i === 1 ? tone : ink, opacity: i === 1 ? 1 : 0.35 }} />
            <span className="mk-mono">{l}</span>
          </div>
        ))}
      </aside>
      <div className="mk-ops__main">
        <div className="mk-row mk-ops__top">
          <span className="mk-mark mk-ops__title">Orders <span className="mk-dim">/ Today</span></span>
          <div className="mk-row mk-mono mk-dim" style={{ gap: "1.4cqw" }}>
            <span>Filter</span><span>Export</span>
          </div>
        </div>
        <div className="mk-ops__table" style={{ borderColor: surf }}>
          <div className="mk-ops__hdr mk-mono mk-dim">
            <span>ID</span><span>Customer</span><span>Stage</span><span>Value</span>
          </div>
          {[
            ["OB-2041", "Mercer & Co.", "Packing", tone],
            ["OB-2042", "Studio Brackish", "Routed", ink],
            ["OB-2043", "Verre", "Quoted", ink],
            ["OB-2044", "Linnea Apo.", "Held", tone],
            ["OB-2045", "Northmark", "Routed", ink],
          ].map(([id, who, stage, c], i) => (
            <div key={id} className="mk-ops__row" style={{ borderColor: surf }}>
              <span className="mk-mono">{id}</span>
              <span>{who}</span>
              <span className="mk-ops__pill" style={{ borderColor: c, color: c, opacity: c === tone ? 1 : 0.7 }}>{stage}</span>
              <span className="mk-mono">${(i + 1) * 1240}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  linnea: ([bg, surf, ink, tone]) => (
    <div className="mk-brand" style={{ color: ink, background: `radial-gradient(120% 80% at 50% 0%, ${surf} 0%, ${bg} 70%)` }}>
      <div className="mk-mono mk-dim mk-brand__eyebrow">— Apothecary · est. 2018</div>
      <div className="mk-brand__shelf">
        {[0, 1, 2].map((i) => (
          <div key={i} className="mk-brand__bottle">
            <div className="mk-brand__neck" style={{ background: surf, borderColor: ink }} />
            <div className="mk-brand__body" style={{ background: i === 1 ? tone : surf, borderColor: ink }}>
              <span className="mk-mono mk-brand__lbl" style={{ color: i === 1 ? bg : ink }}>
                {["No. 01", "No. 02", "No. 03"][i]}
              </span>
              <span className="mk-mark mk-brand__num" style={{ color: i === 1 ? bg : ink }}>L</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mk-brand__sig">
        <h4 className="mk-mark mk-brand__mark">Linnea</h4>
        <span className="mk-mono mk-dim">Botanical · Cold-pressed · Lisboa</span>
      </div>
    </div>
  ),

  "field-notes": ([bg, surf, ink, tone]) => (
    <div className="mk-zine" style={{ color: ink }}>
      <div className="mk-zine__spread" style={{ background: surf }}>
        <div className="mk-zine__page">
          <span className="mk-mono mk-dim">Issue 04 · Spring</span>
          <h4 className="mk-mark mk-zine__h"><em style={{ fontStyle: "italic", color: tone }}>On</em><br />slow looking.</h4>
          <div className="mk-zine__lines">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="mk-zine__line" style={{ background: ink, width: `${74 + (i * 7) % 24}%` }} />
            ))}
          </div>
        </div>
        <div className="mk-zine__fold" style={{ background: bg }} />
        <div className="mk-zine__page mk-zine__page--r">
          <div className="mk-zine__photo" style={{ background: bg, borderColor: ink }}>
            <span className="mk-mark mk-zine__photo-n" style={{ color: tone }}>04</span>
          </div>
          <span className="mk-mono mk-dim">Plate I — Riverbed, 06:14</span>
          <div className="mk-zine__cols">
            {[0, 1].map((c) => (
              <div key={c} className="mk-zine__col">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="mk-zine__line" style={{ background: ink, width: `${70 + ((i + c) * 9) % 28}%` }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mk-row mk-zine__cap mk-mono mk-dim">
        <span>Field Notes — Quarterly</span>
        <span>p. 24 / 25</span>
      </div>
    </div>
  ),

  atlas: ([bg, surf, ink, tone]) => (
    <div className="mk-map" style={{ color: ink }}>
      <div className="mk-map__view" style={{ background: surf }}>
        <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" className="mk-map__svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke={ink} strokeOpacity="0.06" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="200" height="140" fill="url(#grid)" />
          <path d="M0,80 Q40,40 90,70 T200,50" stroke={ink} strokeOpacity="0.15" strokeWidth="0.6" fill="none" />
          <path d="M0,110 Q60,90 120,100 T200,90" stroke={ink} strokeOpacity="0.15" strokeWidth="0.6" fill="none" />
          <path d="M20,130 Q70,60 150,100" stroke={tone} strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
          <path d="M30,30 Q90,80 170,40" stroke={tone} strokeWidth="1.2" strokeDasharray="3 2" fill="none" opacity="0.7" />
          {[[20, 130], [90, 92], [150, 100], [30, 30], [170, 40], [120, 60]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="2.5" fill={tone} />
              <circle cx={x} cy={y} r="6" fill="none" stroke={tone} strokeOpacity="0.35" />
            </g>
          ))}
          <text x="6" y="12" fill={ink} fontSize="5" opacity="0.4" fontFamily="monospace">38.72°N · 9.13°W</text>
        </svg>
      </div>
      <aside className="mk-map__side">
        <div className="mk-row mk-map__sidehd">
          <span className="mk-mark">Atlas</span>
          <span className="mk-mono mk-dim">Live · 1,284</span>
        </div>
        {[["MX-901", "Lisboa → Porto", "On time"], ["MX-902", "Setúbal → Évora", "Loading"], ["MX-903", "Faro → Madrid", "Delay 12m"]].map(([id, leg, st], i) => (
          <div key={id} className="mk-map__ship" style={{ background: surf, borderColor: bg }}>
            <div className="mk-row">
              <span className="mk-mono">{id}</span>
              <span className="mk-map__pill mk-mono" style={{ background: i === 2 ? tone : "transparent", color: i === 2 ? bg : ink, borderColor: ink }}>
                {st}
              </span>
            </div>
            <span className="mk-map__leg">{leg}</span>
            <div className="mk-map__bar" style={{ background: bg }}>
              <span style={{ background: tone, width: `${30 + i * 25}%` }} />
            </div>
          </div>
        ))}
      </aside>
    </div>
  ),

  "north-mark": ([bg, surf, ink, tone]) => (
    <div className="mk-firm" style={{ color: ink }}>
      <div className="mk-row mk-firm__bar">
        <span className="mk-mark mk-firm__brand">Northmark</span>
        <div className="mk-row mk-mono mk-dim" style={{ gap: "2.2cqw" }}>
          <span>Thesis</span><span>Portfolio</span><span>People</span><span>Letters</span>
        </div>
        <span className="mk-mono mk-firm__pill" style={{ borderColor: ink }}>Investors · log in</span>
      </div>
      <div className="mk-firm__hero">
        <span className="mk-mono mk-dim">— Vol. IX · Annual letter</span>
        <h4 className="mk-mark mk-firm__h">
          We back <em style={{ fontStyle: "italic", color: tone }}>quiet</em> companies<br />for a long time.
        </h4>
        <span className="mk-mark mk-firm__sub" style={{ color: ink, opacity: 0.7 }}>
          A multi-stage partnership for founders building durable infrastructure.
        </span>
      </div>
      <div className="mk-firm__ticker">
        {["AUM $1.4B", "Founded 2011", "27 portfolio", "9 exits", "Lisbon · NYC"].map((t, i) => (
          <span key={t} className="mk-mono mk-firm__t" style={{ borderColor: surf, opacity: 0.75 }}>{t}</span>
        ))}
      </div>
    </div>
  ),

  kindred: ([bg, surf, ink, tone]) => (
    <div className="mk-poster">
      {[
        { label: "01", title: "Kindred", sub: "Vol. I", bg: tone, ink: bg, accent: ink },
        { label: "02", title: "Kindred", sub: "Vol. II", bg: surf, ink: ink, accent: tone },
        { label: "03", title: "Kindred", sub: "Vol. III", bg: ink, ink: bg, accent: tone },
      ].map((p, i) => (
        <div key={i} className="mk-poster__p" style={{ background: p.bg, color: p.ink }}>
          <div className="mk-row mk-poster__hd">
            <span className="mk-mono">{p.label}</span>
            <span className="mk-mono" style={{ color: p.accent }}>— Kindred fest</span>
          </div>
          <div className="mk-poster__big">
            <span className="mk-mark mk-poster__title">{p.title}</span>
            <span className="mk-mono mk-poster__sub" style={{ color: p.accent }}>{p.sub}</span>
          </div>
          <div className="mk-poster__rule" style={{ background: p.ink, opacity: 0.4 }} />
          <div className="mk-poster__feet mk-mono">
            <span>27 → 29 Jun</span>
            <span>Tapada · Lisboa</span>
          </div>
        </div>
      ))}
    </div>
  ),
};

// Supporting case-study shots (idx 1..4). Each project shows a different
// facet of the same product/brand so the case study reads like a real
// portfolio entry, not five copies of the hero.
const SHOTS = {
  vantage: {
    1: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--cols2" style={{ color: ink }}>
        <div className="mk-shot__panel" style={{ background: surf }}>
          <span className="mk-shot__lbl">Order ticket · SPY</span>
          <div className="mk-shot__seg" style={{ background: bg }}>
            <span className="mk-shot__segBtn mk-shot__segBtn--on" style={{ background: tone, color: bg }}>Buy</span>
            <span className="mk-shot__segBtn">Sell</span>
          </div>
          {[["Limit", "412.80"], ["Qty", "2,400"], ["Stop", "408.50"]].map(([k, v]) => (
            <div key={k} className="mk-shot__field"><span className="mk-shot__lbl">{k}</span><span className="mk-mark mk-shot__fv">{v}</span></div>
          ))}
          <div className="mk-shot__btn" style={{ background: tone, color: bg }}>Submit order</div>
        </div>
        <div className="mk-shot__panel" style={{ background: surf }}>
          <span className="mk-shot__lbl">Depth · book</span>
          <div className="mk-shot__book">
            {[8, 6, 4, 2].map((d, i) => (
              <div key={"a" + i} className="mk-shot__bookrow">
                <span className="mk-mono mk-dim">412.{String(84 - i).padStart(2, "0")}</span>
                <div className="mk-shot__bookbar" style={{ background: ink, opacity: 0.22, width: `${10 + d * 6}%` }} />
                <span className="mk-mono mk-dim">{d * 200}</span>
              </div>
            ))}
            <div className="mk-shot__spread">
              <span className="mk-mono mk-dim">SPREAD · 0.02</span>
            </div>
            {[2, 4, 6, 8].map((d, i) => (
              <div key={"b" + i} className="mk-shot__bookrow">
                <span className="mk-mono" style={{ color: tone }}>412.{String(80 - i).padStart(2, "0")}</span>
                <div className="mk-shot__bookbar" style={{ background: tone, opacity: 0.55, width: `${10 + d * 6}%` }} />
                <span className="mk-mono">{d * 180}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    2: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink }}>
        <span className="mk-shot__lbl">Risk · End of day</span>
        <h3 className="mk-shot__bigh" style={{ color: tone }}>+2.4%</h3>
        <span className="mk-mono mk-dim">VaR (95%) · last 30 days</span>
        <div className="mk-shot__chartbars">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{ height: `${30 + ((i * 17) % 60)}%`, background: i === 22 ? tone : ink, opacity: i === 22 ? 1 : 0.32 }} />
          ))}
        </div>
        <div className="mk-shot__rows">
          {[["Exposure", "$184.2M"], ["Net delta", "+0.62"], ["Hedge ratio", "0.78"], ["Stress −5%", "−$8.4M"]].map(([k, v]) => (
            <div key={k} className="mk-shot__row">
              <span className="mk-shot__lbl">{k}</span>
              <span className="mk-mark mk-shot__rowv">{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    3: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink }}>
        <div className="mk-shot__hd">
          <span className="mk-shot__lbl">Watchlist · Sector tech</span>
          <span className="mk-mono mk-dim">12 / 28</span>
        </div>
        <div className="mk-shot__list">
          {["AAPL", "MSFT", "NVDA", "TSLA", "META", "GOOG", "AMZN", "ADBE", "CRM", "ORCL", "INTC", "AMD"].map((t, i) => {
            const up = (i + 1) % 3 !== 0;
            const pts = Array.from({ length: 16 }).map((_, j) => `${j * 3.4},${8 + Math.sin((i + 1) * j * 0.5 + 0.3) * 4.5}`).join(" ");
            return (
              <div key={t} className="mk-shot__listrow">
                <span className="mk-mono">{t}</span>
                <span className="mk-mark mk-shot__listprice">{(180 + i * 23).toFixed(2)}</span>
                <svg viewBox="0 0 60 16" preserveAspectRatio="none" className="mk-shot__listspark">
                  <polyline points={pts} stroke={up ? tone : ink} strokeOpacity="0.75" strokeWidth="0.8" fill="none" />
                </svg>
                <span className="mk-mono mk-shot__listpct" style={{ color: up ? tone : ink, opacity: up ? 1 : 0.55 }}>
                  {up ? "+" : "−"}{(0.2 + i * 0.13).toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    ),
    4: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--phonewrap">
        <div className="mk-shot__phone" style={{ background: bg, color: ink, borderColor: "color-mix(in oklab, currentColor 22%, transparent)" }}>
          <div className="mk-shot__phoneNotch" />
          <div className="mk-row mk-shot__phoneBar">
            <span className="mk-mark mk-shot__phoneBrand">V</span>
            <span className="mk-mono mk-dim">Positions</span>
            <span className="mk-mono mk-dim">···</span>
          </div>
          <div className="mk-shot__phoneStat">
            <span className="mk-shot__lbl">Total P/L</span>
            <span className="mk-mark mk-shot__phoneBig" style={{ color: tone }}>+$24,180</span>
            <span className="mk-mono mk-dim">+2.4% today</span>
          </div>
          <div className="mk-shot__phoneList">
            {["AAPL", "NVDA", "MSFT", "TSLA", "META"].map((t, i) => {
              const up = i % 2 === 0;
              return (
                <div key={t} className="mk-shot__phoneRow">
                  <span className="mk-mono">{t}</span>
                  <span className="mk-mono" style={{ color: up ? tone : ink, opacity: up ? 1 : 0.55 }}>
                    {up ? "+" : "−"}{(0.3 + i * 0.4).toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),
  },

  marrow: {
    1: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "4cqw 5cqw" }}>
        <span className="mk-shot__lbl">Long read · Vol. III</span>
        <h3 className="mk-shot__bigh" style={{ fontSize: "9cqw" }}>
          The <em style={{ fontStyle: "italic", color: tone }}>quiet</em><br />act of editing.
        </h3>
        <span className="mk-mono mk-dim">By Camille Mercer · 12 min read</span>
        <div className="mk-shot__lines">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} className="mk-shot__line" style={{ background: ink, width: `${70 + (i * 11) % 30}%` }} />
          ))}
        </div>
      </div>
    ),
    2: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--cover" style={{ color: ink, background: surf }}>
        <div className="mk-shot__coverHd">
          <span className="mk-mark mk-shot__coverBrand"><em style={{ fontStyle: "italic" }}>Marrow</em></span>
          <span className="mk-mono mk-dim">Vol. 14 · Spring</span>
        </div>
        <div className="mk-shot__coverBody">
          <span className="mk-mono mk-dim">Inside —</span>
          <h3 className="mk-shot__coverTitle">
            On <em style={{ fontStyle: "italic", color: tone }}>silence</em><br />in the studio.
          </h3>
          <span className="mk-mono mk-dim">+ five essays, three interviews, an archive.</span>
        </div>
        <div className="mk-shot__coverFt mk-mono mk-dim">
          <span>€14 / Quarterly</span>
          <span>ISSN 2766-1413</span>
        </div>
      </div>
    ),
    3: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <span className="mk-shot__lbl">Type · Display set</span>
        <div className="mk-shot__specBig">
          <span className="mk-mark" style={{ fontSize: "44cqw", lineHeight: 0.82, color: tone }}>M</span>
        </div>
        <div className="mk-shot__rows">
          {[["72 / Display", "Marrow"], ["48 / Subhead", "Marrow"], ["28 / Body", "Marrow"], ["14 / Caption", "Marrow"]].map(([k, v]) => (
            <div key={k} className="mk-shot__row">
              <span className="mk-shot__lbl">{k}</span>
              <span className="mk-mark mk-shot__rowv" style={{ fontStyle: "italic" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    4: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--phonewrap">
        <div className="mk-shot__phone" style={{ background: bg, color: ink, borderColor: "color-mix(in oklab, currentColor 22%, transparent)" }}>
          <div className="mk-shot__phoneNotch" />
          <div className="mk-row mk-shot__phoneBar">
            <span className="mk-mark" style={{ fontSize: "2.6cqw", fontStyle: "italic" }}>Marrow</span>
            <span className="mk-mono mk-dim">Issue 14</span>
          </div>
          <div className="mk-shot__phoneArticle">
            <span className="mk-mono mk-dim">— Long read</span>
            <h4 className="mk-shot__phoneArt-h">On the <em style={{ color: tone, fontStyle: "italic" }}>quiet</em> act<br />of editing.</h4>
            <div className="mk-shot__phoneArt-lines">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} style={{ background: ink, opacity: 0.45, height: "0.6cqw", borderRadius: "0.2cqw", width: `${72 + (i * 9) % 26}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },

  halen: {
    1: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3.4cqw" }}>
        <div className="mk-row" style={{ paddingBottom: "1.4cqw", borderBottom: "1px solid color-mix(in oklab, currentColor 12%, transparent)" }}>
          <span className="mk-mark" style={{ fontSize: "2.6cqw", letterSpacing: "0.4cqw" }}>HALEN</span>
          <span className="mk-mono mk-dim">Projects / 04</span>
        </div>
        <span className="mk-mono mk-dim">— Casa Ourique · Lisbon · 2024</span>
        <h3 className="mk-shot__bigh" style={{ fontSize: "7cqw" }}>A house built<br />around <em style={{ fontStyle: "italic", color: tone }}>silence</em>.</h3>
        <div className="mk-shot__halenScene" style={{ background: surf }}>
          <svg viewBox="0 0 200 80" preserveAspectRatio="xMidYMax meet" className="mk-arch__svg">
            <rect x="0" y="64" width="200" height="16" fill={bg} />
            <rect x="20" y="20" width="76" height="44" fill={bg} stroke={ink} strokeOpacity="0.18" />
            <rect x="96" y="32" width="60" height="32" fill={bg} stroke={ink} strokeOpacity="0.14" />
            <polygon points="20,20 58,4 96,20" fill={tone} fillOpacity="0.5" />
            {Array.from({ length: 7 }).map((_, i) => (<rect key={i} x={28 + i * 9} y="34" width="3" height="6" fill={surf} />))}
            {Array.from({ length: 4 }).map((_, i) => (<rect key={"r" + i} x={104 + i * 12} y="44" width="4" height="6" fill={surf} />))}
          </svg>
        </div>
      </div>
    ),
    2: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3.4cqw" }}>
        <span className="mk-shot__lbl">Index of projects</span>
        <div className="mk-shot__index">
          {[
            ["01", "Casa Ourique", "Lisbon", "2024"],
            ["02", "Pavilion N", "Sintra", "2023"],
            ["03", "House on a Slope", "Cascais", "2022"],
            ["04", "Atrium 11", "Porto", "2022"],
            ["05", "Reading Room", "Évora", "2021"],
            ["06", "Stair Study", "Lisbon", "2021"],
            ["07", "Library Pavilion", "Madrid", "2020"],
          ].map(([n, name, place, year]) => (
            <div key={n} className="mk-shot__indexRow">
              <span className="mk-mono mk-dim">{n}</span>
              <span className="mk-mark" style={{ fontSize: "2.6cqw" }}>{name}</span>
              <span className="mk-mono mk-dim">{place}</span>
              <span className="mk-mono">{year}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    3: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3.4cqw" }}>
        <span className="mk-shot__lbl">Studio</span>
        <h3 className="mk-shot__bigh" style={{ fontSize: "6.8cqw" }}>
          We design<br /><em style={{ fontStyle: "italic", color: tone }}>quiet</em> buildings<br />for long lives.
        </h3>
        <div className="mk-shot__halenAbout">
          <div className="mk-shot__halenPortrait" style={{ background: surf, borderColor: "color-mix(in oklab, currentColor 14%, transparent)" }}>
            <span className="mk-mono mk-dim">HALEN · 2008 — present</span>
          </div>
          <div className="mk-shot__lines">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mk-shot__line" style={{ background: ink, width: `${74 + (i * 7) % 24}%` }} />
            ))}
          </div>
        </div>
      </div>
    ),
    4: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3.4cqw" }}>
        <span className="mk-shot__lbl">Plan · Casa Ourique / GF</span>
        <div className="mk-shot__plan" style={{ background: surf }}>
          <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet" className="mk-arch__svg">
            <rect x="10" y="10" width="180" height="110" fill="none" stroke={ink} strokeOpacity="0.5" strokeWidth="0.8" />
            <line x1="100" y1="10" x2="100" y2="80" stroke={ink} strokeOpacity="0.3" strokeWidth="0.5" />
            <line x1="10" y1="80" x2="190" y2="80" stroke={ink} strokeOpacity="0.3" strokeWidth="0.5" />
            <line x1="100" y1="80" x2="100" y2="120" stroke={ink} strokeOpacity="0.3" strokeWidth="0.5" />
            <rect x="40" y="32" width="20" height="10" fill={tone} fillOpacity="0.6" />
            <rect x="130" y="32" width="20" height="10" fill={tone} fillOpacity="0.6" />
            <circle cx="50" cy="100" r="10" fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="0.6" />
            <text x="20" y="76" fontSize="6" fill={ink} opacity="0.6" fontFamily="monospace">LIVING</text>
            <text x="115" y="76" fontSize="6" fill={ink} opacity="0.6" fontFamily="monospace">STUDY</text>
            <text x="20" y="116" fontSize="6" fill={ink} opacity="0.6" fontFamily="monospace">PATIO</text>
          </svg>
        </div>
        <div className="mk-row mk-mono mk-dim">
          <span>Scale 1:200</span>
          <span>180 m²</span>
        </div>
      </div>
    ),
  },

  obsidian: {
    1: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <div className="mk-row mk-shot__hd">
          <span className="mk-shot__lbl">Routing board</span>
          <span className="mk-mono mk-dim">42 active · 3 lanes</span>
        </div>
        <div className="mk-shot__kb">
          {[
            ["Inbox", 4, ink],
            ["Routing", 3, tone],
            ["Delivered", 5, ink],
          ].map(([lane, n, accent], li) => (
            <div key={lane} className="mk-shot__kbCol">
              <div className="mk-shot__kbHd"><span>{lane}</span><span>{n}</span></div>
              {Array.from({ length: n }).map((_, i) => (
                <div key={i} className="mk-shot__kbCard" style={{ background: surf, borderLeft: `2px solid ${accent}` }}>
                  <span className="mk-mono mk-dim">OB-20{li * 4 + i + 41}</span>
                  <span>{["Mercer & Co.", "Studio Brackish", "Verre", "Linnea Apo.", "Northmark", "Field Notes"][((li + i) * 2) % 6]}</span>
                  <span className="mk-mono" style={{ color: accent, opacity: accent === tone ? 1 : 0.5 }}>${(i + li + 1) * 480}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    2: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <div className="mk-row" style={{ paddingBottom: "1.4cqw", borderBottom: "1px solid color-mix(in oklab, currentColor 12%, transparent)" }}>
          <span className="mk-shot__lbl">Order · OB-2041</span>
          <span className="mk-mono mk-shot__pill" style={{ color: tone, borderColor: tone }}>Packing</span>
        </div>
        <h3 className="mk-shot__bigh" style={{ fontSize: "5.2cqw" }}>Mercer & Co.</h3>
        <span className="mk-mono mk-dim">Routed via Lisbon → Cascais</span>
        <div className="mk-shot__rows">
          {[["Items", "8"], ["Weight", "12.4 kg"], ["Value", "$3,840"], ["Carrier", "MX-902"], ["ETA", "Wed 14:20"]].map(([k, v]) => (
            <div key={k} className="mk-shot__row">
              <span className="mk-shot__lbl">{k}</span>
              <span className="mk-mark mk-shot__rowv">{v}</span>
            </div>
          ))}
        </div>
        <div className="mk-shot__btn" style={{ background: ink, color: bg, marginTop: "auto" }}>Open routing →</div>
      </div>
    ),
    3: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <span className="mk-shot__lbl">Audit · last 24h</span>
        <div className="mk-shot__audit">
          {[
            ["09:14", "OB-2041 quoted", "Held"],
            ["09:22", "OB-2042 routed", null],
            ["09:38", "OB-2043 packed", null],
            ["10:02", "OB-2041 held", "Tone"],
            ["10:14", "OB-2042 dispatched", null],
            ["10:31", "OB-2044 quoted", null],
            ["11:02", "OB-2041 released", "Tone"],
            ["11:18", "OB-2045 routed", null],
            ["12:04", "OB-2043 delivered", null],
            ["12:46", "OB-2044 dispatched", null],
          ].map(([t, ev, mark], i) => (
            <div key={i} className="mk-shot__auditRow">
              <span className="mk-mono mk-dim">{t}</span>
              <span className="mk-shot__auditDot" style={{ background: mark === "Tone" ? tone : ink, opacity: mark === "Tone" ? 1 : 0.35 }} />
              <span>{ev}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    4: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--phonewrap">
        <div className="mk-shot__phone" style={{ background: bg, color: ink, borderColor: "color-mix(in oklab, currentColor 22%, transparent)" }}>
          <div className="mk-shot__phoneNotch" />
          <div className="mk-row mk-shot__phoneBar">
            <span className="mk-mark mk-shot__phoneBrand">◆</span>
            <span className="mk-mono mk-dim">Inbox</span>
            <span className="mk-mono mk-dim">5</span>
          </div>
          <div className="mk-shot__phoneList">
            {[
              ["OB-2041", "Mercer & Co.", "Packing", true],
              ["OB-2042", "Brackish", "Routed", false],
              ["OB-2043", "Verre", "Quoted", false],
              ["OB-2044", "Linnea", "Held", true],
              ["OB-2045", "Northmark", "Routed", false],
            ].map(([id, who, st, hot]) => (
              <div key={id} className="mk-shot__phoneObsRow">
                <div>
                  <div className="mk-mono mk-dim mk-shot__phoneObsId">{id}</div>
                  <div>{who}</div>
                </div>
                <span className="mk-mono mk-shot__pill" style={{ color: hot ? tone : ink, borderColor: hot ? tone : "color-mix(in oklab, currentColor 30%, transparent)" }}>{st}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  linnea: {
    1: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, background: `radial-gradient(120% 80% at 50% 0%, ${surf} 0%, ${bg} 70%)`, padding: "3cqw", alignItems: "center" }}>
        <span className="mk-mono mk-dim">— Label · 01</span>
        <div className="mk-shot__linneaBottle" style={{ background: tone, borderColor: ink }}>
          <span className="mk-mono mk-shot__linneaLbl" style={{ color: bg }}>No. 01</span>
          <span className="mk-mark mk-shot__linneaName" style={{ color: bg }}>Linnea</span>
          <span className="mk-mono mk-shot__linneaSub" style={{ color: bg }}>Botanical serum<br />30 ml · 1 fl oz</span>
          <div className="mk-shot__linneaRule" style={{ background: bg }} />
          <span className="mk-mono mk-shot__linneaIng" style={{ color: bg }}>Rosehip · Calendula · Squalane</span>
        </div>
        <span className="mk-mono mk-dim">Lisboa · cold-pressed</span>
      </div>
    ),
    2: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3.6cqw", alignItems: "center" }}>
        <span className="mk-mark mk-shot__bigh" style={{ fontSize: "12cqw", letterSpacing: "-0.02em", marginTop: "auto" }}>Linnea</span>
        <span className="mk-mono mk-dim" style={{ letterSpacing: "0.4cqw" }}>APOTHECARY</span>
        <div className="mk-shot__linneaMark" style={{ background: tone }}>
          <span className="mk-mark" style={{ color: bg, fontSize: "10cqw" }}>L</span>
        </div>
        <div className="mk-shot__rows" style={{ width: "100%", marginTop: "auto" }}>
          {[["Wordmark", "Fraunces Italic"], ["Color", "Bone · Tone"], ["Origin", "Lisboa · 2018"]].map(([k, v]) => (
            <div key={k} className="mk-shot__row">
              <span className="mk-shot__lbl">{k}</span>
              <span className="mk-mark mk-shot__rowv">{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    3: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <span className="mk-shot__lbl">Set · Three formulations</span>
        <div className="mk-shot__linneaShelf">
          {[
            { name: "01 Serum", body: surf, sub: "Day" },
            { name: "02 Balm", body: tone, sub: "Night" },
            { name: "03 Mist", body: surf, sub: "Tonic" },
          ].map((p, i) => (
            <div key={i} className="mk-shot__linneaSet">
              <div className="mk-shot__linneaSetBottle" style={{ background: p.body, borderColor: "color-mix(in oklab, currentColor 25%, transparent)" }}>
                <span className="mk-mark" style={{ color: p.body === tone ? bg : ink, fontSize: "5cqw" }}>L</span>
              </div>
              <span className="mk-mark mk-shot__linneaSetName">{p.name}</span>
              <span className="mk-mono mk-dim">{p.sub}</span>
            </div>
          ))}
        </div>
        <div className="mk-shot__rows" style={{ marginTop: "1.4cqw" }}>
          {[["Set price", "€84"], ["Volume", "3 × 30 ml"]].map(([k, v]) => (
            <div key={k} className="mk-shot__row"><span className="mk-shot__lbl">{k}</span><span className="mk-mark mk-shot__rowv">{v}</span></div>
          ))}
        </div>
      </div>
    ),
    4: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--cols2" style={{ color: ink, gap: "2cqw" }}>
        <div className="mk-shot__panel" style={{ background: surf, padding: "2.6cqw" }}>
          <span className="mk-shot__lbl">Business card · front</span>
          <div className="mk-shot__card" style={{ background: bg, borderColor: "color-mix(in oklab, currentColor 14%, transparent)", flex: 1 }}>
            <span className="mk-mark mk-shot__cardName">Linnea</span>
            <span className="mk-mono mk-dim">Apothecary · est. 2018</span>
          </div>
        </div>
        <div className="mk-shot__panel" style={{ background: surf, padding: "2.6cqw" }}>
          <span className="mk-shot__lbl">Card · back</span>
          <div className="mk-shot__card" style={{ background: tone, color: bg, flex: 1 }}>
            <div className="mk-shot__cardMeta"><span>hello@linnea.pt</span><span>+351 21 123 45</span><span>Rua dos Anjos · Lisboa</span></div>
            <span className="mk-mark" style={{ fontSize: "8cqw", alignSelf: "end" }}>L</span>
          </div>
        </div>
      </div>
    ),
  },

  "field-notes": {
    1: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <div className="mk-shot__zinePage" style={{ background: surf }}>
          <div className="mk-row mk-mono mk-dim">
            <span>FIELD NOTES — IV</span>
            <span>p. 12</span>
          </div>
          <h3 className="mk-shot__zineH"><em style={{ fontStyle: "italic", color: tone }}>On</em><br />slow looking.</h3>
          <span className="mk-mono mk-dim">An essay by Mercer · plate by N. Falk</span>
          <div className="mk-shot__zineFlow">
            <div className="mk-shot__zineCol">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="mk-shot__line" style={{ background: ink, width: `${72 + (i * 7) % 26}%` }} />
              ))}
            </div>
            <div className="mk-shot__zineCol">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="mk-shot__line" style={{ background: ink, width: `${68 + (i * 11) % 30}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    2: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--cover" style={{ color: ink, background: surf }}>
        <div className="mk-shot__coverHd">
          <span className="mk-mark mk-shot__coverBrand">Field Notes</span>
          <span className="mk-mono mk-dim">№ 04</span>
        </div>
        <div className="mk-shot__coverBody">
          <span className="mk-mark" style={{ fontSize: "26cqw", color: tone, lineHeight: 0.85 }}>04</span>
          <span className="mk-mono mk-dim">Spring · Plate I — Riverbed</span>
        </div>
        <div className="mk-shot__coverFt mk-mono mk-dim">
          <span>A quarterly</span>
          <span>€12</span>
        </div>
      </div>
    ),
    3: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <span className="mk-shot__lbl">Drop cap · specimen</span>
        <div className="mk-shot__dropcap">
          <span className="mk-mark mk-shot__dropcapLetter" style={{ color: tone }}>O</span>
          <div className="mk-shot__lines mk-shot__dropcapLines">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="mk-shot__line" style={{ background: ink, width: `${64 + (i * 9) % 32}%` }} />
            ))}
          </div>
        </div>
        <div className="mk-shot__rows" style={{ marginTop: "auto" }}>
          {[["Body", "EB Garamond / 11"], ["Caption", "Geist Mono / 9"], ["Lead", "EB Garamond Italic"]].map(([k, v]) => (
            <div key={k} className="mk-shot__row"><span className="mk-shot__lbl">{k}</span><span className="mk-mark mk-shot__rowv">{v}</span></div>
          ))}
        </div>
      </div>
    ),
    4: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <span className="mk-shot__lbl">Back issues · 2022 — 2024</span>
        <div className="mk-shot__issueGrid">
          {[
            ["01", "Origins", surf],
            ["02", "Field", surf],
            ["03", "Studio", tone],
            ["04", "Slow", surf],
            ["05", "Quiet", surf],
            ["06", "Edge", surf],
          ].map(([n, name, body]) => (
            <div key={n} className="mk-shot__issue" style={{ background: body, color: body === tone ? bg : ink }}>
              <span className="mk-mono mk-dim">№ {n}</span>
              <span className="mk-mark mk-shot__issueName">{name}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  atlas: {
    1: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <div className="mk-row" style={{ paddingBottom: "1.4cqw", borderBottom: "1px solid color-mix(in oklab, currentColor 12%, transparent)" }}>
          <span className="mk-shot__lbl">Route · MX-902 · live</span>
          <span className="mk-mono" style={{ color: tone }}>+8m</span>
        </div>
        <div className="mk-shot__route" style={{ background: surf }}>
          <svg viewBox="0 0 200 70" preserveAspectRatio="none" className="mk-arch__svg">
            <path d="M10,55 Q60,15 120,40 T190,20" stroke={tone} strokeWidth="1.4" fill="none" strokeDasharray="3 2" />
            {[[10, 55], [60, 30], [120, 40], [190, 20]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="3" fill={tone} />
                <circle cx={x} cy={y} r="8" fill="none" stroke={tone} strokeOpacity="0.35" />
              </g>
            ))}
          </svg>
        </div>
        <div className="mk-shot__rows">
          {[
            ["Lisboa · 06:14", "Departed"],
            ["Setúbal · 07:42", "Stopped 12m"],
            ["Évora · 09:05", "In transit"],
            ["Faro · 11:30 ETA", "—"],
          ].map(([k, v]) => (
            <div key={k} className="mk-shot__row">
              <span><span className="mk-mark" style={{ fontSize: "2.4cqw" }}>{k.split("·")[0]}</span><span className="mk-mono mk-dim"> · {k.split("·")[1]}</span></span>
              <span className="mk-mono mk-dim">{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    2: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <div className="mk-row" style={{ paddingBottom: "1.4cqw", borderBottom: "1px solid color-mix(in oklab, currentColor 12%, transparent)" }}>
          <span className="mk-shot__lbl">Shipment · MX-902</span>
          <span className="mk-mono mk-shot__pill" style={{ color: tone, borderColor: tone }}>Delay 12m</span>
        </div>
        <h3 className="mk-shot__bigh" style={{ fontSize: "5.4cqw" }}>Setúbal<br />→ Évora</h3>
        <span className="mk-mono mk-dim">Carrier · Mercer Freight</span>
        <div className="mk-shot__rows">
          {[["Container", "C-44128"], ["Weight", "8.4 t"], ["Items", "1,204"], ["Driver", "P. Almeida"], ["Last ping", "2m ago"]].map(([k, v]) => (
            <div key={k} className="mk-shot__row"><span className="mk-shot__lbl">{k}</span><span className="mk-mark mk-shot__rowv">{v}</span></div>
          ))}
        </div>
        <div className="mk-shot__progress" style={{ background: "color-mix(in oklab, currentColor 10%, transparent)" }}>
          <span style={{ background: tone, width: "62%" }} />
        </div>
      </div>
    ),
    3: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <span className="mk-shot__lbl">Network · last 7 days</span>
        <h3 className="mk-shot__bigh" style={{ color: tone }}>98.4%</h3>
        <span className="mk-mono mk-dim">on-time delivery</span>
        <div className="mk-shot__chartbars">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} style={{ height: `${50 + ((i * 13) % 48)}%`, background: (i + 1) % 7 === 0 ? tone : ink, opacity: (i + 1) % 7 === 0 ? 1 : 0.35 }} />
          ))}
        </div>
        <div className="mk-shot__rows">
          {[["Total moves", "1,284"], ["Avg dwell", "14 min"], ["Fleet utilisation", "78%"], ["Incidents", "2"]].map(([k, v]) => (
            <div key={k} className="mk-shot__row"><span className="mk-shot__lbl">{k}</span><span className="mk-mark mk-shot__rowv">{v}</span></div>
          ))}
        </div>
      </div>
    ),
    4: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--phonewrap">
        <div className="mk-shot__phone" style={{ background: bg, color: ink, borderColor: "color-mix(in oklab, currentColor 22%, transparent)" }}>
          <div className="mk-shot__phoneNotch" />
          <div className="mk-row mk-shot__phoneBar">
            <span className="mk-mark mk-shot__phoneBrand">Atlas</span>
            <span className="mk-mono mk-dim">1,284</span>
          </div>
          <div style={{ padding: "1.6cqw 2.4cqw" }}>
            <div className="mk-shot__phoneMapMini" style={{ background: surf }}>
              <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                <path d="M5,50 Q30,20 60,30 T95,15" stroke={tone} strokeWidth="1.2" strokeDasharray="2 1.5" fill="none" />
                {[[5, 50], [30, 30], [60, 30], [95, 15]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2" fill={tone} />
                ))}
              </svg>
            </div>
          </div>
          <div style={{ padding: "0 2.4cqw" }}>
            {[
              ["MX-902", "Lisboa → Évora", true],
              ["MX-903", "Faro → Madrid", false],
              ["MX-904", "Porto → Vigo", false],
            ].map(([id, leg, hot]) => (
              <div key={id} style={{ padding: "1.2cqw 0", borderBottom: "1px solid color-mix(in oklab, currentColor 8%, transparent)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.8cqw" }}>
                  <span className="mk-mono">{id}</span>
                  <span className="mk-mono" style={{ color: hot ? tone : ink, opacity: hot ? 1 : 0.55 }}>{hot ? "Delay" : "On time"}</span>
                </div>
                <span className="mk-mono mk-dim" style={{ fontSize: "1.6cqw" }}>{leg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  "north-mark": {
    1: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <div className="mk-row" style={{ paddingBottom: "1.4cqw", borderBottom: "1px solid color-mix(in oklab, currentColor 12%, transparent)" }}>
          <span className="mk-shot__lbl">Portfolio · Vol. IX</span>
          <span className="mk-mono mk-dim">27 companies</span>
        </div>
        <div className="mk-shot__firmGrid">
          {["Mercer", "Vantage", "Atlas", "Halen", "Verre", "Brackish", "Linnea", "Marrow", "Field", "Obsidian", "Kindred", "Pavilion"].map((n, i) => (
            <div key={n} className="mk-shot__firmCard" style={{ background: surf }}>
              <span className="mk-mark mk-shot__firmName">{n}</span>
              <span className="mk-mono mk-dim">{["Seed", "A", "B", "Seed", "B", "A", "Seed", "A", "Seed", "B", "Seed", "A"][i]} · 20{(20 + (i % 5))}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    2: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--cover" style={{ color: ink }}>
        <div className="mk-shot__coverHd">
          <span className="mk-mark mk-shot__coverBrand">Northmark</span>
          <span className="mk-mono mk-dim">2026</span>
        </div>
        <div className="mk-shot__coverBody">
          <span className="mk-mono mk-dim">— Annual letter · Vol. IX</span>
          <h3 className="mk-shot__coverTitle">
            On the<br /><em style={{ fontStyle: "italic", color: tone }}>long</em><br />time.
          </h3>
          <span className="mk-mono mk-dim">Sixty-eight pages · partners' note</span>
        </div>
        <div className="mk-shot__coverFt mk-mono mk-dim">
          <span>For investors only</span>
          <span>NM · IX</span>
        </div>
      </div>
    ),
    3: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <span className="mk-shot__lbl">By the numbers · 2026</span>
        <div className="mk-shot__statsGrid">
          {[["$1.4B", "AUM"], ["27", "Portfolio"], ["9", "Exits"], ["3.2×", "Median return"]].map(([n, l], i) => (
            <div key={i} className="mk-shot__bigFact">
              <span className="mk-mark mk-shot__bigFactN" style={{ color: i === 0 || i === 3 ? tone : ink }}>{n}</span>
              <span className="mk-shot__lbl">{l}</span>
            </div>
          ))}
        </div>
        <div className="mk-shot__rows" style={{ marginTop: "auto" }}>
          {[["Founded", "2011"], ["Offices", "Lisbon · NYC"], ["Cheque size", "$1 — 20M"], ["Stages", "Seed → C"]].map(([k, v]) => (
            <div key={k} className="mk-shot__row"><span className="mk-shot__lbl">{k}</span><span className="mk-mark mk-shot__rowv">{v}</span></div>
          ))}
        </div>
      </div>
    ),
    4: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--phonewrap">
        <div className="mk-shot__phone" style={{ background: bg, color: ink, borderColor: "color-mix(in oklab, currentColor 22%, transparent)" }}>
          <div className="mk-shot__phoneNotch" />
          <div className="mk-row mk-shot__phoneBar">
            <span className="mk-mark mk-shot__phoneBrand">Northmark</span>
            <span className="mk-mono mk-dim">≡</span>
          </div>
          <div style={{ padding: "3cqw 2.4cqw 2cqw" }}>
            <span className="mk-mono mk-dim" style={{ fontSize: "1.6cqw" }}>— Vol. IX</span>
            <h4 className="mk-mark" style={{ fontSize: "6.4cqw", lineHeight: 0.96, margin: "1cqw 0" }}>
              We back<br /><em style={{ fontStyle: "italic", color: tone }}>quiet</em><br />companies.
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8cqw", marginTop: "2cqw" }}>
              {["AUM $1.4B", "27 portfolio", "9 exits"].map((t) => (
                <span key={t} className="mk-mono" style={{ padding: "0.6cqw 1.2cqw", border: "1px solid color-mix(in oklab, currentColor 18%, transparent)", borderRadius: "99cqw", fontSize: "1.5cqw" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },

  kindred: {
    1: ([bg, surf, ink, tone]) => (
      <div className="mk-shot" style={{ padding: 0 }}>
        <div className="mk-shot__posterWide" style={{ background: tone, color: bg }}>
          <div className="mk-row" style={{ padding: "3cqw 4cqw" }}>
            <span className="mk-mono">№ 01</span>
            <span className="mk-mono">Kindred · Tapada · 2026</span>
          </div>
          <div className="mk-shot__posterWideBody">
            <span className="mk-mark mk-shot__posterWideH">Kindred</span>
            <span className="mk-mark mk-shot__posterWideSub" style={{ color: ink }}><em style={{ fontStyle: "italic" }}>Vol. I</em></span>
          </div>
          <div className="mk-row mk-mono" style={{ padding: "3cqw 4cqw", borderTop: "1px solid color-mix(in oklab, currentColor 25%, transparent)" }}>
            <span>27 → 29 Jun</span>
            <span>40 acts · 3 stages</span>
            <span>Lisboa, PT</span>
          </div>
        </div>
      </div>
    ),
    2: ([bg, surf, ink, tone]) => (
      <div className="mk-shot" style={{ padding: "3cqw", display: "flex", justifyContent: "center" }}>
        <div className="mk-shot__posterTall" style={{ background: ink, color: bg }}>
          <div className="mk-row mk-mono" style={{ padding: "2cqw 3cqw" }}>
            <span style={{ color: tone }}>№ 02</span>
            <span>K · F · 26</span>
          </div>
          <div className="mk-shot__posterTallBody">
            <span className="mk-mark mk-shot__posterTallH" style={{ color: tone }}>Kin<br />dred</span>
          </div>
          <div className="mk-shot__posterTallFt">
            <div className="mk-row mk-mono" style={{ borderTop: "1px solid color-mix(in oklab, currentColor 25%, transparent)", padding: "1.6cqw 0" }}>
              <span>Vol. II</span>
              <span>Night sets</span>
            </div>
            <div className="mk-mono mk-shot__posterTallActs">
              {["Nala R.", "Verre", "P. Mercer", "Brackish", "Linnea", "+ 22"].map((a) => (<span key={a}>{a}</span>))}
            </div>
          </div>
        </div>
      </div>
    ),
    3: ([bg, surf, ink, tone]) => (
      <div className="mk-shot mk-shot--col" style={{ color: ink, padding: "3cqw" }}>
        <span className="mk-shot__lbl">Type · Display set</span>
        <div className="mk-shot__specBig">
          <span className="mk-mark" style={{ fontSize: "44cqw", lineHeight: 0.82, color: tone }}>K</span>
        </div>
        <div className="mk-shot__rows">
          {[["72 / Poster", "Kindred"], ["48 / Banner", "Kindred"], ["28 / Body", "Kindred"], ["12 / Caption", "Kindred"]].map(([k, v]) => (
            <div key={k} className="mk-shot__row"><span className="mk-shot__lbl">{k}</span><span className="mk-mark mk-shot__rowv">{v}</span></div>
          ))}
        </div>
      </div>
    ),
    4: ([bg, surf, ink, tone]) => (
      <div className="mk-shot" style={{ padding: "3cqw" }}>
        <div className="mk-shot__pasteup" style={{ background: surf }}>
          {[
            { t: "Kindred", n: "01", body: tone, ink: bg, r: -2 },
            { t: "Kindred", n: "02", body: ink, ink: bg, r: 1 },
            { t: "Kindred", n: "03", body: surf, ink: ink, r: -1 },
            { t: "Kindred", n: "04", body: tone, ink: bg, r: 2 },
            { t: "Kindred", n: "05", body: bg, ink: ink, r: -1.5 },
            { t: "Kindred", n: "06", body: surf, ink: tone, r: 1.5 },
          ].map((p, i) => (
            <div key={i} className="mk-shot__pasteupP" style={{ background: p.body, color: p.ink, transform: `rotate(${p.r}deg)`, gridColumn: `span ${i % 4 === 0 ? 2 : 1}` }}>
              <span className="mk-mono mk-shot__pasteupN">№ {p.n}</span>
              <span className="mk-mark mk-shot__pasteupT">{p.t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

function Mockup({ project, ratio = "4 / 3", idx = 0 }) {
  if (idx === 0) {
    const render = MOCKUPS[project.id];
    if (!render) return <Placeholder project={project} idx={0} ratio={ratio} />;
    return (
      <div className={`mk mk--${project.id}`} style={{ aspectRatio: ratio, background: project.palette[0] }}>
        {render(project.palette)}
      </div>
    );
  }
  const render = SHOTS[project.id]?.[idx];
  if (!render) return <Placeholder project={project} idx={idx} ratio={ratio} />;
  return (
    <div className={`mk mk--${project.id} mk--shot${idx}`} style={{ aspectRatio: ratio, background: project.palette[0] }}>
      {render(project.palette)}
    </div>
  );
}

// ─── Custom cursor ─────────────────────────────────────────────────────────
function Cursor({ enabled }) {
  const dot = useRef(null);
  const ring = useRef(null);
  const [variant, setVariant] = useState("default"); // default | link | view | drag
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let raf;
    let dx = window.innerWidth / 2, dy = window.innerHeight / 2;
    let rx = dx, ry = dy;
    let tx = dx, ty = dy;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (hidden) setHidden(false);
      // Variant detection
      const el = e.target.closest("[data-cursor], a, button, .card, .idx__row, .chip, .contact__link, input, textarea");
      if (!el) { setVariant("default"); return; }
      const v = el.getAttribute("data-cursor");
      if (v) setVariant(v);
      else if (el.matches("input, textarea")) setVariant("text");
      else if (el.matches(".card, .idx__row")) setVariant("view");
      else setVariant("link");
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => { if (ring.current) ring.current.classList.add("cur--down"); };
    const onUp   = () => { if (ring.current) ring.current.classList.remove("cur--down"); };

    const tick = () => {
      dx = tx; dy = ty;
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (dot.current)  dot.current.style.transform  = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, hidden]);

  if (!enabled) return null;

  const label =
    variant === "view"  ? "View"  :
    variant === "drag"  ? "Drag"  :
    variant === "close" ? "Close" : "";

  return (
    <>
      <div ref={dot} className={`cur-dot ${hidden ? "is-hidden" : ""}`} aria-hidden="true" />
      <div ref={ring} className={`cur-ring cur--${variant} ${hidden ? "is-hidden" : ""}`} aria-hidden="true">
        {label && <span className="mono">{label}</span>}
      </div>
    </>
  );
}

// ─── Custom scrollbar / page progress rail ────────────────────────────────
function ScrollRail({ targetRef, page, totalPages }) {
  const [progress, setProgress] = useState(0);
  const [pct, setPct] = useState("0");
  useEffect(() => {
    const el = targetRef?.current || document.scrollingElement;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      setProgress(p);
      setPct(String(Math.round(p * 100)).padStart(2, "0"));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    el.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [targetRef, page]);

  return (
    <aside className="rail" aria-hidden="true">
      <div className="rail__top mono dim">
        <span>{PAGES[page]?.num || "00"}</span>
        <span>/</span>
        <span>{String(totalPages - 1).padStart(2, "0")}</span>
      </div>
      <div className="rail__track">
        <div className="rail__fill" style={{ height: `${progress * 100}%` }} />
        <div className="rail__thumb" style={{ top: `calc(${progress * 100}% - 18px)` }} />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rail__tick" style={{ top: `${(i + 1) * 11.5}%` }} />
        ))}
      </div>
      <div className="rail__bot mono dim">
        <span>{pct}</span>
        <span>%</span>
      </div>
    </aside>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav({ page, onNav }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const opts = { timeZone: "Europe/Lisbon", hour: "2-digit", minute: "2-digit", hour12: false };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d));
    };
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="nav">
      <a className="nav__mark" href="#home" onClick={(e) => { e.preventDefault(); onNav("home"); }} data-cursor="link">
        <span className="serif">Iris&nbsp;Wynn</span>
        <span className="mono dim">— Independent designer</span>
      </a>
      <div className="nav__links">
        {PAGES.map((p) => (
          <button
            key={p.id}
            className={`nav__link ${page === p.id ? "is-active" : ""}`}
            onClick={() => onNav(p.id)}
            data-cursor="link"
          >
            <span className="mono nav__num">{p.num}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>
      <div className="nav__meta">
        <span className="mono dim nav__time">LIS — {time}</span>
        <span className="nav__status">
          <span className="dot" />
          <span className="mono">Available Q3</span>
        </span>
      </div>
    </nav>
  );
}

// ─── Page: Home ─────────────────────────────────────────────────────────────
function HomePage({ onNav }) {
  return (
    <div className="page page--home">
      <div className="page__grid" aria-hidden="true" />
      <div className="home__top mono dim">
        <span>Index № 014</span>
        <span>Portfolio · 2023 / 2026</span>
        <span>Lisbon · PT</span>
      </div>

      <div className="home__body">
        <p className="home__eyebrow mono dim">— Portfolio of Iris Wynn</p>
        <h1 className="home__title">
          <span>Designing quiet,</span>
          <span><em>considered</em> interfaces</span>
          <span>for ambitious teams.</span>
        </h1>
      </div>

      <div className="home__foot">
        <div className="home__meta">
          <div><span className="mono dim">Practice</span><span>Product · Brand · Editorial</span></div>
          <div><span className="mono dim">Based</span><span>Lisbon · Working worldwide</span></div>
          <div><span className="mono dim">Selected</span><span>9 projects · 5 disciplines</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Work ─────────────────────────────────────────────────────────────
function WorkPage({ onOpen, density }) {
  const [cat, setCat] = useState("All");
  const [view, setView] = useState("grid");
  const filtered = useMemo(() => (cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === cat)), [cat]);
  return (
    <div className="page">
      <div className="page__head">
        <span className="mono dim">§ 01 — Selected work</span>
        <h2 className="page__title">Selected work</h2>
        <p className="page__lede">A catalogue of recent engagements across product, brand, and editorial.</p>
      </div>

      <div className="work__bar">
        <div className="chips">
          {CATEGORIES.map((c) => (
            <button key={c} className={`chip ${cat === c ? "is-active" : ""}`} onClick={() => setCat(c)} data-cursor="link">
              <span>{c}</span>
              <span className="mono dim">{c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c).length}</span>
            </button>
          ))}
        </div>
        <div className="view">
          <button className={`view__btn ${view === "grid" ? "is-active" : ""}`} onClick={() => setView("grid")} aria-label="Grid" data-cursor="link">
            <svg viewBox="0 0 16 16" width="14" height="14"><rect x="1" y="1" width="6" height="6" /><rect x="9" y="1" width="6" height="6" /><rect x="1" y="9" width="6" height="6" /><rect x="9" y="9" width="6" height="6" /></svg>
          </button>
          <button className={`view__btn ${view === "mosaic" ? "is-active" : ""}`} onClick={() => setView("mosaic")} aria-label="Mosaic" data-cursor="link">
            <svg viewBox="0 0 16 16" width="14" height="14"><rect x="1" y="1" width="9" height="9" /><rect x="12" y="1" width="3" height="3" /><rect x="12" y="6" width="3" height="9" /><rect x="1" y="12" width="9" height="3" /></svg>
          </button>
        </div>
      </div>

      <div className={`work__grid work__grid--${view} work__grid--d${density}`}>
        {filtered.map((p, i) => (
          <article
            key={p.id}
            className={`card ${view === "mosaic" && i % 5 === 0 ? "card--wide" : ""}`}
            onClick={() => onOpen(p.id)}
            data-cursor="view"
            style={{ "--accent-card": p.palette[3] }}
          >
            <div className="card__media">
              <Mockup project={p} ratio={view === "mosaic" && i % 5 === 0 ? "16 / 9" : "4 / 3"} />
            </div>
            <div className="card__meta">
              <div className="card__title-row">
                <h3 className="serif">{p.title}</h3>
                <span className="mono dim">{p.year}</span>
              </div>
              <p className="card__sub">{p.subtitle}</p>
              <div className="card__tags">
                {p.tags.map((t) => <span key={t} className="tag mono">{t}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ─── Page: Index ────────────────────────────────────────────────────────────
function IndexPage({ onOpen }) {
  const [hover, setHover] = useState(null);
  return (
    <div className="page">
      <div className="page__head">
        <span className="mono dim">§ 02 — The index</span>
        <h2 className="page__title">The index</h2>
        <p className="page__lede">All work in chronological order. Hover a row to preview; click to open.</p>
      </div>

      <ul className="idx__list" onMouseLeave={() => setHover(null)}>
        <li className="idx__row idx__row--head mono dim">
          <span>№</span>
          <span>Project</span>
          <span>Discipline</span>
          <span>Client</span>
          <span>Year</span>
          <span></span>
        </li>
        {PROJECTS.map((p, i) => (
          <li
            key={p.id}
            className={`idx__row ${hover === p.id ? "is-hover" : ""}`}
            onMouseEnter={() => setHover(p.id)}
            onClick={() => onOpen(p.id)}
            data-cursor="view"
          >
            <span className="mono dim">{String(i + 1).padStart(3, "0")}</span>
            <span className="idx__title">
              <span className="serif">{p.title}</span>
              <span className="dim"> — {p.subtitle}</span>
            </span>
            <span className="mono">{p.cat}</span>
            <span className="mono dim">{p.client}</span>
            <span className="mono">{p.year}</span>
            <span className="idx__arrow" aria-hidden="true">↗</span>
            <div className="idx__peek" aria-hidden="true">
              <Mockup project={p} ratio="4 / 3" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Page: About ────────────────────────────────────────────────────────────
function AboutPage() {
  const facts = [["09", "Years practicing"], ["42", "Shipped projects"], ["11", "Industries"], ["3", "Continents"]];
  const clients = ["Vantage Capital", "Atlas Freight", "Halen Atelier", "Obsidian Labs", "Northmark", "Linnea", "Marrow", "Kindred Festival", "Field Notes", "Mercer & Co.", "Studio Brackish", "Verre"];
  return (
    <div className="page">
      <div className="page__head">
        <span className="mono dim">§ 03 — About the practice</span>
        <h2 className="page__title">About</h2>
        <p className="page__lede">A solo practice. Sometimes a small team. Always considered.</p>
      </div>

      <div className="about__grid">
        <div className="about__col">
          <p className="about__lede">
            I&apos;m <em>Iris Wynn</em>, an independent designer working at the intersection of product, brand and editorial. I help ambitious teams ship interfaces that feel <em>inevitable</em>.
          </p>
          <p className="about__body">
            The practice is small on purpose. Most engagements run six to twelve weeks and start with a week of listening. I work closely with founders, product leads and engineering — often pairing in the codebase to make sure the design survives contact with reality.
          </p>
          <div className="about__list">
            <div><span className="mono dim">Discipline</span><span>Product design, brand systems, editorial design, art direction</span></div>
            <div><span className="mono dim">Tools</span><span>Figma, Linear, an unreasonable amount of paper</span></div>
            <div><span className="mono dim">Stack</span><span>React, Next, Tailwind, Webflow, Framer</span></div>
            <div><span className="mono dim">Speaks</span><span>English, Portuguese, working French</span></div>
          </div>
        </div>
        <aside className="about__side">
          <div className="about__facts">
            {facts.map(([n, l]) => (
              <div className="fact" key={l}>
                <span className="fact__n serif">{n}</span>
                <span className="fact__l mono dim">{l}</span>
              </div>
            ))}
          </div>
          <div className="about__clients">
            <span className="mono dim">Trusted by</span>
            <ul>
              {clients.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── Page: Contact ──────────────────────────────────────────────────────────
function ContactPage() {
  const [val, setVal] = useState({ name: "", email: "", brief: "" });
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!val.email) return;
    setSent(true);
  };
  return (
    <div className="page">
      <div className="page__head">
        <span className="mono dim">§ 04 — Start a conversation</span>
        <h2 className="page__title">Get in touch</h2>
        <p className="page__lede">Currently booking projects for Q3 2026.</p>
      </div>

      <div className="contact__grid">
        <div className="contact__copy">
          <p className="contact__lede serif">
            Tell me about the project. I&apos;ll come back within two business days with thoughts, references, and a proposed shape.
          </p>
          <div className="contact__links">
            <a href="mailto:hello@iriswynn.studio" className="contact__link" data-cursor="link">
              <span className="mono dim">Email</span>
              <span>hello@iriswynn.studio</span>
              <span className="contact__arrow">↗</span>
            </a>
            <a href="#" className="contact__link" data-cursor="link">
              <span className="mono dim">Are.na</span>
              <span>@iriswynn</span>
              <span className="contact__arrow">↗</span>
            </a>
            <a href="#" className="contact__link" data-cursor="link">
              <span className="mono dim">Read</span>
              <span>Notes — a slow journal</span>
              <span className="contact__arrow">↗</span>
            </a>
          </div>
        </div>

        <form className="contact__form" onSubmit={submit}>
          {sent ? (
            <div className="contact__sent">
              <span className="mono dim">— Received</span>
              <p className="serif">Thanks, {val.name || "friend"}. I&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <>
              <label className="field">
                <span className="mono dim">Your name</span>
                <input value={val.name} onChange={(e) => setVal({ ...val, name: e.target.value })} placeholder="Camille Mercer" />
              </label>
              <label className="field">
                <span className="mono dim">Email</span>
                <input type="email" required value={val.email} onChange={(e) => setVal({ ...val, email: e.target.value })} placeholder="you@studio.com" />
              </label>
              <label className="field">
                <span className="mono dim">A few lines on the project</span>
                <textarea rows={5} value={val.brief} onChange={(e) => setVal({ ...val, brief: e.target.value })} placeholder="What are you building, who is it for, and when do you need to ship?" />
              </label>
              <div className="contact__submit">
                <button type="submit" className="btn-primary" data-cursor="link">
                  <span>Send brief</span>
                  <span className="mono">↵</span>
                </button>
                <span className="mono dim">By sending, you agree to my keeping a copy of this message.</span>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

// ─── Case study overlay ────────────────────────────────────────────────────
function CaseStudy({ project, onClose, onNav }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, onNav]);

  if (!project) return null;

  return (
    <div className="cs" role="dialog" aria-modal="true">
      <div className="cs__scrim" onClick={onClose} data-cursor="close" />
      <div className="cs__sheet">
        <div className="cs__bar mono">
          <button className="cs__close" onClick={onClose} data-cursor="link"><span>Close</span><span>✕</span></button>
          <div className="cs__nav">
            <button onClick={() => onNav(-1)} aria-label="Previous" data-cursor="link">← Prev</button>
            <span className="dim">·</span>
            <button onClick={() => onNav(1)} aria-label="Next" data-cursor="link">Next →</button>
          </div>
        </div>

        <header className="cs__head">
          <span className="mono dim">{project.cat} — {project.year}</span>
          <h2 className="cs__title serif">{project.title}</h2>
          <p className="cs__sub">{project.subtitle}</p>
          <p className="cs__blurb">{project.blurb}</p>

          <dl className="cs__facts">
            <div><dt className="mono dim">Client</dt><dd>{project.client}</dd></div>
            <div><dt className="mono dim">Role</dt><dd>{project.role}</dd></div>
            <div><dt className="mono dim">Year</dt><dd>{project.year}</dd></div>
            <div><dt className="mono dim">Deliverables</dt><dd>{project.deliverables.join(", ")}</dd></div>
          </dl>
        </header>

        <div className="cs__hero">
          <Mockup project={project} ratio="16 / 9" />
        </div>

        <section className="cs__row">
          <div className="cs__rowtxt">
            <span className="mono dim">01 — Approach</span>
            <h3 className="serif">Start by removing.</h3>
            <p>Every project begins with subtraction. We mapped the core decisions a user makes in a session and built outward from there — instead of starting with the chrome and decorating inward.</p>
          </div>
          <div className="cs__rowimg">
            <Mockup project={project} idx={1} ratio="4 / 3" />
          </div>
        </section>

        <section className="cs__doubles">
          <Mockup project={project} idx={2} ratio="4 / 5" />
          <Mockup project={project} idx={3} ratio="4 / 5" />
        </section>

        <section className="cs__row cs__row--rev">
          <div className="cs__rowimg">
            <Mockup project={project} idx={4} ratio="4 / 3" />
          </div>
          <div className="cs__rowtxt">
            <span className="mono dim">02 — System</span>
            <h3 className="serif">A small set of parts, in service of a confident voice.</h3>
            <p>A trimmed component library, a strict spacing scale, two typefaces. The system holds the work, never performs over it.</p>
          </div>
        </section>

        <section className="cs__palette">
          <span className="mono dim">Palette</span>
          <div className="cs__swatches">
            {project.palette.map((c, i) => (
              <div key={c} className="sw">
                <div className="sw__chip" style={{ background: c }} />
                <span className="mono">{c.toUpperCase()}</span>
                <span className="mono dim">{["Ink", "Char", "Bone", "Tone"][i]}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="cs__foot">
          <button className="cs__next" onClick={() => onNav(1)} data-cursor="view">
            <span className="mono dim">Next project</span>
            <span className="serif cs__next-title">{nextOf(project.id).title}</span>
            <span className="mono">{nextOf(project.id).subtitle} →</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

function nextOf(id) {
  const i = PROJECTS.findIndex((p) => p.id === id);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

// ─── Tweaks launcher ────────────────────────────────────────────────────────
function TweaksLauncher() {
  const [visible, setVisible] = useState(true);
  const [overFoot, setOverFoot] = useState(false);

  useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === "__activate_edit_mode") setVisible(false);
      // __deactivate_edit_mode only fires when the design-tool host echoes it.
      // The panel's own X button posts __edit_mode_dismissed instead, so we
      // listen for both to make sure the launcher returns when the panel closes.
      else if (t === "__deactivate_edit_mode" || t === "__edit_mode_dismissed") setVisible(true);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Hide the launcher when the page-nav footer (prev / next buttons) is in
  // view — otherwise the dot overlaps the "Work →" / "← Home" buttons in the
  // bottom-right corner. Re-attach on a small interval because the .stage
  // (and the .stage__foot inside it) gets re-created on every page change.
  useEffect(() => {
    let observer = null;
    let target = null;
    const attach = () => {
      const foot = document.querySelector(".stage__foot");
      if (foot === target) return;
      if (observer) observer.disconnect();
      target = foot;
      if (!foot) { setOverFoot(false); return; }
      observer = new IntersectionObserver(
        ([entry]) => setOverFoot(entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(foot);
    };
    attach();
    const interval = setInterval(attach, 400);
    return () => {
      if (observer) observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;
  return (
    <button
      className={`twk-launcher ${overFoot ? "is-tucked" : ""}`}
      onClick={() => window.postMessage({ type: "__activate_edit_mode" }, "*")}
      aria-label="Open Tweaks"
      data-cursor="link"
      aria-hidden={overFoot}
    >
      <span className="twk-launcher__dot" />
    </button>
  );
}

function PortfolioTweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Tone">
        <TweakColor label="Accent" value={t.accent}
          options={["#c79a5b", "#a68b65", "#8aa6c8", "#9f7e54", "#c97a5a", "#7a8a78"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Background" value={t.bg}
          options={[{label:"Ink",value:"ink"},{label:"Bone",value:"light"}]}
          onChange={(v) => setTweak("bg", v)} />
      </TweakSection>
      <TweakSection title="Type">
        <TweakSelect label="Display" value={t.display}
          options={[{label:"Instrument Serif",value:"Instrument Serif"},{label:"Fraunces",value:"Fraunces"},{label:"EB Garamond",value:"EB Garamond"}]}
          onChange={(v) => setTweak("display", v)} />
        <TweakSelect label="UI" value={t.ui}
          options={[{label:"Geist",value:"Geist"},{label:"Inter",value:"Inter"},{label:"Helvetica",value:"Helvetica"}]}
          onChange={(v) => setTweak("ui", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────
function App() {
  const [tweaks, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const [page, setPage] = useState("home");
  const [openId, setOpenId] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const scrollRef = useRef(null);

  // Apply CSS vars from tweaks
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", tweaks.accent);
    root.style.setProperty("--font-display", `"${tweaks.display}", "Iowan Old Style", Georgia, serif`);
    root.style.setProperty("--font-ui", `"${tweaks.ui}", system-ui, sans-serif`);
    root.classList.toggle("theme--light", tweaks.bg === "light");
  }, [tweaks]);

  // Page change handler — with transition
  const onNav = useCallback((id) => {
    if (id === page) {
      if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setTransitioning(true);
    setTimeout(() => {
      setPage(id);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      setTransitioning(false);
    }, 380);
  }, [page]);

  // Keyboard nav between pages
  useEffect(() => {
    const onKey = (e) => {
      if (openId) return;
      if (e.target.matches("input, textarea")) return;
      const i = PAGES.findIndex((p) => p.id === page);
      if ((e.key === "ArrowRight" || e.key === "PageDown") && i < PAGES.length - 1) onNav(PAGES[i + 1].id);
      if ((e.key === "ArrowLeft"  || e.key === "PageUp")  && i > 0)                  onNav(PAGES[i - 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, onNav, openId]);

  const project = openId ? PROJECTS.find((p) => p.id === openId) : null;
  const navProject = (dir) => {
    const i = PROJECTS.findIndex((p) => p.id === openId);
    const nxt = PROJECTS[(i + dir + PROJECTS.length) % PROJECTS.length];
    setOpenId(nxt.id);
  };

  const renderPage = () => {
    switch (page) {
      case "home":    return <HomePage onNav={onNav} />;
      case "work":    return <WorkPage onOpen={setOpenId} density={tweaks.density} />;
      case "index":   return <IndexPage onOpen={setOpenId} />;
      case "about":   return <AboutPage />;
      case "contact": return <ContactPage />;
      default:        return <HomePage onNav={onNav} />;
    }
  };

  const pageIdx = PAGES.findIndex((p) => p.id === page);

  return (
    <>
      <Cursor enabled={tweaks.cursor} />
      <Nav page={page} onNav={onNav} />

      <div className={`stage ${transitioning ? "is-trans" : ""}`} ref={scrollRef} key={page}>
        {renderPage()}
        <div className="stage__foot">
          <button className="stage__prev mono" onClick={() => onNav(PAGES[Math.max(0, pageIdx - 1)].id)} disabled={pageIdx === 0} data-cursor="link">
            ← {PAGES[Math.max(0, pageIdx - 1)].label}
          </button>
          <span className="mono dim">{PAGES[pageIdx]?.num} / {String(PAGES.length - 1).padStart(2, "0")}</span>
          <button className="stage__next mono" onClick={() => onNav(PAGES[Math.min(PAGES.length - 1, pageIdx + 1)].id)} disabled={pageIdx === PAGES.length - 1} data-cursor="link">
            {PAGES[Math.min(PAGES.length - 1, pageIdx + 1)].label} →
          </button>
        </div>
      </div>

      <ScrollRail targetRef={scrollRef} page={pageIdx} totalPages={PAGES.length} />

      <CaseStudy project={project} onClose={() => setOpenId(null)} onNav={navProject} />
      <PortfolioTweaks t={tweaks} setTweak={setTweak} />
      <TweaksLauncher />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
