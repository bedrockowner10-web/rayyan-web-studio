import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { services, process } from "@/data/services";
import { Reveal, Magnetic } from "./Motion";
import { isPlaceholderWhatsApp, siteConfig, whatsappUrl } from "@/config/site";

export function Marquee() {
  const items = ["Strategy", "Art Direction", "Design", "Development", "E-commerce", "Experience", "Motion", "Optimisation"];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y py-6" aria-label="Capabilities">
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-4xl font-semibold text-foreground/85 md:text-5xl" aria-hidden={i >= items.length}>
            {t} <span className="text-brand-gradient">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SectionHead({ eyebrow, title, aside }: { eyebrow: string; title: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
      <Reveal>
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">{title}</h2>
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}

export function ServicesList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="border-t">
      {services.map((s, i) => (
        <li key={s.id} id={s.id} className="scroll-mt-28 border-b">
          <Reveal delay={i * 0.04}>
            <div className="group grid gap-6 py-10 md:grid-cols-[80px_1.1fr_1.4fr] md:py-12">
              <span className="eyebrow pt-3 text-muted-foreground">0{i + 1}</span>
              <h3 className="font-display text-4xl leading-tight transition-colors group-hover:text-primary md:text-5xl">{s.title}</h3>
              <div>
                <p className="text-lg leading-relaxed text-foreground/85">{s.outcome}</p>
                {detailed && (
                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <p className="eyebrow text-primary">Deliverables</p>
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {s.deliverables.map((d) => <li key={d} className="flex gap-3"><span className="text-primary">—</span>{d}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="eyebrow text-primary">Ideal for</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.ideal}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function ProcessSteps() {
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {process.map((p, i) => (
        <li key={p.n} className="rounded-3xl border bg-card shadow-elegant transition-transform duration-500 hover:-translate-y-2">
          <Reveal delay={i * 0.08} className="flex h-full flex-col p-7 transition-colors ">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gradient font-mono text-xs text-primary-foreground">{p.n}</span>
            <h3 className="mt-14 font-display text-3xl">{p.t}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function WhatsAppButton() {
  if (isPlaceholderWhatsApp())
    return (
      <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm hover:border-primary">
        <MessageCircle size={16} /> WhatsApp coming soon — use the form
      </Link>
    );
  return (
    <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm hover:border-primary">
      <MessageCircle size={16} /> Message on WhatsApp
    </a>
  );
}

export function CTABand() {
  return (
    <section className="px-4 py-24 md:px-8">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-brand-gradient px-6 py-24 text-center text-primary-foreground shadow-glow">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-violet/50 blur-3xl" />
      <div className="relative">
        <Reveal>
          <p className="eyebrow">{siteConfig.availability}</p>
          <h2 className="mx-auto mt-6 max-w-5xl font-display text-6xl leading-[0.92] tracking-tight md:text-[7rem]">
            Have a project in mind? <span className="text-lime">Let's make it happen.</span>
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-card px-8 py-4 font-semibold text-primary shadow-elegant">
                Start a project <ArrowRight size={18} />
              </Link>
            </Magnetic>
            <WhatsAppButton />
          </div>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
