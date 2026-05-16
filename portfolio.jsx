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
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      setProgress(p);
      setPct(String(Math.round(p * 100)).padStart(2, "0"));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
              <Placeholder project={p} idx={0} ratio={view === "mosaic" && i % 5 === 0 ? "16 / 9" : "4 / 3"} dense={p.cat === "Dashboards"} />
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
              <Placeholder project={p} idx={0} ratio="4 / 3" />
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
          <Placeholder project={project} idx={0} ratio="16 / 9" dense={project.cat === "Dashboards"} />
        </div>

        <section className="cs__row">
          <div className="cs__rowtxt">
            <span className="mono dim">01 — Approach</span>
            <h3 className="serif">Start by removing.</h3>
            <p>Every project begins with subtraction. We mapped the core decisions a user makes in a session and built outward from there — instead of starting with the chrome and decorating inward.</p>
          </div>
          <div className="cs__rowimg">
            <Placeholder project={project} idx={1} ratio="4 / 3" />
          </div>
        </section>

        <section className="cs__doubles">
          <Placeholder project={project} idx={2} ratio="4 / 5" />
          <Placeholder project={project} idx={3} ratio="4 / 5" dense />
        </section>

        <section className="cs__row cs__row--rev">
          <div className="cs__rowimg">
            <Placeholder project={project} idx={4} ratio="4 / 3" dense={project.cat === "Dashboards"} />
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
  useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === "__activate_edit_mode") setVisible(false);
      else if (t === "__deactivate_edit_mode") setVisible(true);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);
  if (!visible) return null;
  return (
    <button
      className="twk-launcher"
      onClick={() => window.postMessage({ type: "__activate_edit_mode" }, "*")}
      aria-label="Open Tweaks"
      data-cursor="link"
    >
      <span className="twk-launcher__dot" />
      <span className="mono">Tweaks</span>
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
          options={[{label:"Ink",value:"ink"},{label:"Charcoal",value:"char"},{label:"Off-black",value:"off"}]}
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
      <TweakSection title="Interface">
        <TweakRadio label="Grid density" value={String(t.density)}
          options={[{label:"Loose",value:"1"},{label:"Default",value:"2"},{label:"Dense",value:"3"}]}
          onChange={(v) => setTweak("density", Number(v))} />
        <TweakToggle label="Custom cursor" checked={t.cursor} onChange={(v) => setTweak("cursor", v)} />
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
    const bgMap = { ink: "#0a0a0c", char: "#101012", off: "#0e0d0a" };
    root.style.setProperty("--bg", bgMap[tweaks.bg] || "#0a0a0c");
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
