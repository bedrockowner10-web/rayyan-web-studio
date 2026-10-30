import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import type { Demo } from "@/data/projects";
import { Img } from "@/components/site/Img";
import { Reveal } from "@/components/site/Motion";

export function DemoSite({ d }: { d: Demo }) {
  const t = d.theme;
  const vars = {
    "--d-bg": t.bg, "--d-fg": t.fg, "--d-ac": t.accent, "--d-mu": t.muted, "--d-su": t.surface, "--d-af": t.accentFg, "--d-r": d.radius,
    fontFamily: `"${d.fonts.body}", sans-serif`,
  } as CSSProperties;
  const display: CSSProperties = { fontFamily: `"${d.fonts.display}", serif`, textTransform: d.fonts.upper ? "uppercase" : undefined };
  const [filter, setFilter] = useState(d.showcase.filters?.[0] ?? "All");
  const [sent, setSent] = useState(false);
  const items = d.showcase.items.filter((i) => !d.showcase.filters || filter === "All" || i.tag === filter);
  const btn = "inline-block px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-85 rounded-[var(--d-r)]";
  const dark = d.layout === "cinematic";

  return (
    <div style={vars} className="min-h-screen bg-[var(--d-bg)] text-[var(--d-fg)]">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-ink px-4 py-2 text-xs text-ivory">
        <span>Independent concept demo by Webs by Rayyan — not a commissioned client project.</span>
        <Link to="/work" className="underline underline-offset-4">← Back to studio</Link>
      </div>
      <header className={`z-20 flex items-center justify-between px-6 py-5 md:px-12 ${dark ? "absolute inset-x-0 top-8 text-ivory" : ""}`}>
        <span style={display} className="text-2xl">{d.name}</span>
        <nav className="hidden gap-8 text-sm md:flex">
          {d.nav.slice(0, 3).map((n, i) => <a key={n} href={["#intro", "#showcase", "#features"][i]} className="opacity-80 hover:opacity-100">{n}</a>)}
        </nav>
        <a href="#book" className={`${btn} bg-[var(--d-ac)] text-[var(--d-af)]`}>{d.nav[3]}</a>
      </header>

      {dark ? (
        <section className="relative flex min-h-[92vh] items-end overflow-hidden">
          <Img eager src={d.images[0]} alt={d.industry} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
          <div className="relative max-w-4xl px-6 pb-20 text-ivory md:px-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--d-ac)]">{d.hero.eyebrow}</p>
            <h1 style={display} className="mt-5 text-5xl leading-[0.95] md:text-8xl">{d.hero.title}</h1>
            <p className="mt-6 max-w-xl text-lg opacity-85">{d.hero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#book" className={`${btn} bg-[var(--d-ac)] text-[var(--d-af)]`}>{d.hero.cta}</a><a href="#showcase" className={`${btn} border border-current`}>{d.hero.cta2}</a></div>
          </div>
        </section>
      ) : d.layout === "centered" || d.layout === "saas" ? (
        <section className="px-6 pb-16 pt-14 text-center md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--d-mu)]">{d.hero.eyebrow}</p>
          <h1 style={display} className="mx-auto mt-6 max-w-4xl text-5xl leading-[1] md:text-8xl">{d.hero.title}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--d-mu)]">{d.hero.sub}</p>
          <div className="mt-8 flex justify-center gap-3"><a href="#book" className={`${btn} bg-[var(--d-ac)] text-[var(--d-af)]`}>{d.hero.cta}</a><a href="#showcase" className={`${btn} border border-current`}>{d.hero.cta2}</a></div>
          {d.layout === "saas" ? (
            <div className="mx-auto mt-16 max-w-5xl rounded-[var(--d-r)] border border-current/10 bg-[var(--d-su)] p-4 text-left shadow-2xl">
              <div className="grid gap-4 md:grid-cols-4">
                {["Active users", "Conversion", "Retention", "Sessions"].map((k, i) => (
                  <div key={k} className="rounded-[var(--d-r)] bg-[var(--d-bg)] p-4"><p className="text-xs text-[var(--d-mu)]">{k}</p><div className="mt-3 h-2 rounded bg-[var(--d-ac)]" style={{ width: `${40 + i * 15}%` }} /></div>
                ))}
              </div>
              <div className="mt-4 flex h-48 items-end gap-2 rounded-[var(--d-r)] bg-[var(--d-bg)] p-4">
                {[30, 45, 38, 60, 52, 70, 64, 80, 72, 90, 84, 95].map((h, i) => <div key={i} className="flex-1 rounded-t bg-[var(--d-ac)]" style={{ height: `${h}%`, opacity: 0.4 + i / 20 }} />)}
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-14 aspect-[16/7] max-w-6xl overflow-hidden" style={{ borderRadius: d.radius === "999px" ? "400px 400px 0 0" : d.radius }}>
              <Img eager src={d.images[0]} alt={d.industry} className="h-full w-full object-cover" />
            </div>
          )}
        </section>
      ) : d.layout === "bold" ? (
        <section className="overflow-hidden px-6 pt-10 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--d-ac)]">{d.hero.eyebrow}</p>
          <h1 style={display} className="relative z-10 mt-4 text-[17vw] leading-[0.82] md:text-[12vw]">{d.hero.title}</h1>
          <div className="-mt-[4vw] grid gap-6 md:grid-cols-[2fr_1fr]">
            <Img eager src={d.images[0]} alt={d.industry} className="aspect-[16/9] w-full object-cover rounded-[var(--d-r)]" />
            <div className="flex flex-col justify-end gap-6 pb-4"><p className="text-lg">{d.hero.sub}</p><a href="#book" className={`${btn} self-start bg-[var(--d-ac)] text-[var(--d-af)]`}>{d.hero.cta}</a></div>
          </div>
        </section>
      ) : (
        <section className={`grid gap-10 px-6 pb-16 pt-10 md:px-12 ${d.layout === "gallery" ? "" : "md:grid-cols-2 md:items-center"}`}>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--d-mu)]">{d.hero.eyebrow}</p>
            <h1 style={display} className={`mt-6 leading-[0.95] ${d.layout === "gallery" ? "max-w-5xl text-5xl md:text-8xl" : "text-5xl md:text-7xl"} ${d.fonts.italic ? "italic" : ""}`}>{d.hero.title}</h1>
            <p className="mt-6 max-w-lg text-lg text-[var(--d-mu)]">{d.hero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#book" className={`${btn} bg-[var(--d-ac)] text-[var(--d-af)]`}>{d.hero.cta}</a><a href="#showcase" className={`${btn} border border-current`}>{d.hero.cta2}</a></div>
          </div>
          {d.layout === "gallery" ? (
            <div className="grid grid-cols-3 gap-4">{d.images.slice(0, 3).map((s, i) => <Img key={s} eager src={s} alt="" className={`w-full object-cover rounded-[var(--d-r)] ${i === 1 ? "aspect-[3/4] translate-y-10" : "aspect-[3/4]"}`} />)}</div>
          ) : (
            <div className={`relative ${d.layout === "playful" ? "rotate-2" : ""}`}>
              <Img eager src={d.images[0]} alt={d.industry} className="aspect-[4/5] w-full object-cover rounded-[var(--d-r)]" />
              {d.layout === "playful" && <span className="absolute -left-4 top-8 -rotate-6 rounded-full bg-[var(--d-ac)] px-5 py-3 font-bold text-[var(--d-af)]">{d.hero.eyebrow}</span>}
            </div>
          )}
        </section>
      )}

      <section id="intro" className="grid gap-10 px-6 py-24 md:grid-cols-2 md:px-12">
        <Reveal><h2 style={display} className="text-4xl leading-tight md:text-6xl">{d.intro.title}</h2></Reveal>
        <Reveal delay={0.1}><p className="text-lg leading-relaxed text-[var(--d-mu)]">{d.intro.body}</p><Img src={d.images[1]} alt="" className="mt-8 aspect-[16/10] w-full object-cover rounded-[var(--d-r)]" /></Reveal>
      </section>

      <section id="features" className="bg-[var(--d-su)] px-6 py-24 md:px-12">
        <h2 style={display} className="text-3xl md:text-5xl">{d.features.title}</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {d.features.items.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.06} className="border-t border-current/20 pt-6">
              <span className="text-sm text-[var(--d-ac)]">0{i + 1}</span>
              <h3 style={display} className="mt-3 text-2xl">{f.t}</h3>
              <p className="mt-2 text-sm text-[var(--d-mu)]">{f.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="showcase" className="px-6 py-24 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 style={display} className="text-3xl md:text-5xl">{d.showcase.title}</h2>
          {d.showcase.filters && (
            <div className="flex flex-wrap gap-2">
              {d.showcase.filters.map((f) => (
                <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f} className={`border border-current/30 px-4 py-2 text-sm rounded-[var(--d-r)] ${filter === f ? "bg-[var(--d-ac)] text-[var(--d-af)]" : ""}`}>{f}</button>
              ))}
            </div>
          )}
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <article key={it.name + i} className="group">
              {d.showcase.filters && <div className="overflow-hidden rounded-[var(--d-r)]"><Img src={d.images[(i + 1) % d.images.length]} alt="" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>}
              <p className="mt-4 text-xs uppercase tracking-widest text-[var(--d-mu)]">{it.meta}</p>
              <h3 style={display} className="mt-1 text-2xl">{it.name}</h3>
              <p className="mt-1 text-sm text-[var(--d-mu)]">{it.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--d-ac)] px-6 py-24 text-center text-[var(--d-af)] md:px-12">
        <p style={display} className="mx-auto max-w-4xl text-3xl leading-tight md:text-5xl">“{d.statement}”</p>
      </section>

      <section id="book" className="grid gap-10 px-6 py-24 md:grid-cols-2 md:px-12">
        <div><h2 style={display} className="text-4xl md:text-6xl">{d.cta.title}</h2><p className="mt-4 text-[var(--d-mu)]">{d.cta.form} — demo form. Nothing is sent.</p></div>
        {sent ? (
          <p role="status" className="self-center text-lg">Thanks — this is a concept demo, so no request was sent.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (e.currentTarget.checkValidity()) setSent(true); }} className="grid gap-4">
            <input required placeholder="Name" aria-label="Name" className="border-b border-current/30 bg-transparent py-3 focus:outline-none" />
            <input required type="email" placeholder="Email" aria-label="Email" className="border-b border-current/30 bg-transparent py-3 focus:outline-none" />
            <button className={`${btn} mt-4 justify-self-start bg-[var(--d-ac)] text-[var(--d-af)]`}>{d.cta.button}</button>
          </form>
        )}
      </section>

      <footer className="border-t border-current/15 px-6 py-10 text-sm md:px-12">
        <div className="flex flex-wrap justify-between gap-4"><span style={display} className="text-xl">{d.name}</span><Link to="/work" className="underline underline-offset-4">Back to Webs by Rayyan</Link></div>
        <p className="mt-6 text-xs text-[var(--d-mu)]">Independent concept demo by Webs by Rayyan — not a commissioned client project. All names and content are fictional.</p>
      </footer>
    </div>
  );
}
