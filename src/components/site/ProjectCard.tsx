import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Demo } from "@/data/projects";
import { Img } from "./Img";
import { Tilt } from "./Tilt";

/** Five rotating compositions so no two neighbouring thumbnails look alike. */
function Preview({ d, variant }: { d: Demo; variant: number }) {
  const style = {
    background: d.theme.bg,
    color: d.theme.fg,
    fontFamily: `"${d.fonts.display}", serif`,
  } as const;
  const zoom = "transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]";
  switch (variant % 5) {
    case 0:
      return (
        <div className="relative h-full overflow-hidden" style={style}>
          <Img src={d.images[0]} alt="" className={`h-full w-full object-cover ${zoom}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
          <span className="absolute bottom-5 left-5 text-3xl text-ivory">{d.name}</span>
        </div>
      );
    case 1:
      return (
        <div className="grid h-full grid-cols-2" style={style}>
          <div className="flex flex-col justify-between p-5">
            <span className="text-xs uppercase tracking-widest opacity-70">{d.nav[0]}</span>
            <span className="text-2xl leading-tight">{d.hero.title}</span>
          </div>
          <div className="overflow-hidden"><Img src={d.images[1]} alt="" className={`h-full w-full object-cover ${zoom}`} /></div>
        </div>
      );
    case 2:
      return (
        <div className="relative h-full p-6" style={style}>
          <div className="h-full overflow-hidden" style={{ borderRadius: d.radius === "999px" ? "200px 200px 0 0" : d.radius }}>
            <Img src={d.images[2]} alt="" className={`h-full w-full object-cover ${zoom}`} />
          </div>
          <span className="absolute left-9 top-9 rounded-full px-3 py-1 text-xs" style={{ background: d.theme.accent, color: d.theme.accentFg }}>{d.name}</span>
        </div>
      );
    case 3:
      return (
        <div className="relative flex h-full flex-col justify-end overflow-hidden p-6" style={style}>
          <span className={`text-[4.5rem] leading-[0.85] ${d.fonts.upper ? "uppercase" : ""}`} style={{ color: d.theme.accent }}>{d.name}</span>
          <div className="absolute right-6 top-6 h-[45%] w-[40%] overflow-hidden">
            <Img src={d.images[0]} alt="" className={`h-full w-full object-cover ${zoom}`} />
          </div>
        </div>
      );
    default:
      return (
        <div className="relative h-full overflow-hidden" style={style}>
          <Img src={d.images[3] ?? d.images[0]} alt="" className={`h-full w-full object-cover grayscale ${zoom}`} />
          <div className="absolute inset-0 mix-blend-multiply" style={{ background: d.theme.accent, opacity: 0.55 }} />
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-4xl text-ivory">{d.name}</span>
        </div>
      );
  }
}

export function ProjectCard({ d, index, tall }: { d: Demo; index: number; tall?: boolean }) {
  return (
    <Tilt>
      <Link
        to="/demos/$slug"
        params={{ slug: d.slug }}
        className="group block rounded-[1.6rem] border bg-card p-2.5 shadow-elegant transition-shadow duration-500 focus-visible:outline-offset-8"
        style={{ boxShadow: `0 30px 60px -30px color-mix(in oklab, ${d.theme.accent} 55%, transparent)` }}
        aria-label={`Open ${d.name} concept demo — ${d.industry}`}
      >
        <div className="overflow-hidden rounded-[1.2rem] border">
          <div className="flex items-center gap-1.5 border-b bg-secondary px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-destructive/70" /><span className="h-2 w-2 rounded-full bg-lime" /><span className="h-2 w-2 rounded-full bg-cyan" />
            <span className="ml-2 truncate rounded-full bg-card px-3 py-0.5 font-mono text-[0.6rem] text-muted-foreground">{d.slug}.concept</span>
          </div>
          <div className={`relative ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`} style={{ transform: "translateZ(30px)" }}>
            <Preview d={d} variant={index} />
            <span className="absolute right-3 top-3 rounded-full glass px-2.5 py-1 eyebrow text-[0.6rem] text-foreground">Concept</span>
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 px-3 pb-3 pt-4">
          <div>
            <p className="eyebrow flex items-center gap-2 text-muted-foreground"><span className="h-2 w-2 rounded-full" style={{ background: d.theme.accent }} />{d.num} · {d.industry}</p>
            <h3 className="mt-2 font-display text-2xl">{d.name}</h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">{d.blurb}</p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-all group-hover:bg-brand-gradient group-hover:text-primary-foreground group-hover:rotate-45"><ArrowUpRight size={18} /></span>
        </div>
      </Link>
    </Tilt>
  );
}
