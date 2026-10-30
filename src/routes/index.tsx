import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { Emblem } from "@/components/site/Emblem";
import { Magnetic, Reveal } from "@/components/site/Motion";
import { CTABand, Marquee, ProcessSteps, SectionHead, ServicesList } from "@/components/site/Sections";
import { PortfolioGrid } from "@/components/site/PortfolioGrid";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ContactForm } from "@/components/site/ContactForm";
import { demos, featuredSlugs } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { Img } from "@/components/site/Img";
import type { ReactNode } from "react";

function FloatCard({ children, className, delay }: { children: ReactNode; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
      transition={{ opacity: { delay }, scale: { delay }, y: { delay, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      className={`glass absolute z-10 rounded-2xl border px-4 py-3 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webs by Rayyan — Web experiences, built to stand out" },
      { name: "description", content: "Distinctive, conversion-focused custom websites for ambitious businesses. Explore 20 live concept demos." },
      { property: "og:title", content: "Webs by Rayyan — Digital experiences, made to move businesses" },
      { property: "og:description", content: "Custom websites for brands that want to stand out. Explore 20 live concept demos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const wrap = "mx-auto max-w-[1400px] px-6 md:px-10";

function Home() {
  const featured = featuredSlugs.map((s) => demos.find((d) => d.slug === s)!);
  return (
    <Shell>
      <section className="relative overflow-hidden pt-28">
        <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-cyan/30 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-10 h-[34rem] w-[34rem] rounded-full bg-violet/20 blur-3xl" />
        <div className={`${wrap} relative grid items-center gap-4 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[1.05fr_1fr]`}>
          <div className="relative z-10 order-2 pb-10 lg:order-1 lg:py-10">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium">
              <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-lime opacity-80" /><span className="h-2 w-2 rounded-full bg-primary" /></span>
              {siteConfig.availability}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
              className="mt-7 font-display text-[3.3rem] font-bold leading-[0.92] tracking-tight sm:text-7xl xl:text-[6.6rem]"
            >
              Web experiences, <span className="text-brand-gradient">built to stand out.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Webs by Rayyan is an independent studio designing and building custom websites for businesses that would rather stand out than blend in.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-9 flex flex-wrap gap-3">
              <Magnetic><Link to="/work" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">Explore the work <ArrowRight size={18} /></Link></Magnetic>
              <Link to="/contact" className="glass inline-flex items-center rounded-full border px-7 py-4 font-semibold hover:border-primary">Start a project</Link>
            </motion.div>
          </div>
          <div className="relative order-1 h-[380px] sm:h-[500px] lg:order-2 lg:h-[680px]">
            <Emblem />
            <FloatCard className="left-0 top-[8%] hidden sm:block" delay={0.6}>
              <p className="eyebrow text-muted-foreground">Now building</p>
              <p className="mt-1 font-display text-lg font-semibold">20 live concepts</p>
              <div className="mt-2 flex -space-x-2">{featured.slice(0, 4).map((d) => <span key={d.slug} className="h-6 w-6 rounded-full border-2 border-card" style={{ background: d.theme.accent }} />)}</div>
            </FloatCard>
            <FloatCard className="bottom-[10%] right-0" delay={0.8}>
              <p className="flex items-center gap-2 text-sm font-semibold"><span className="h-2.5 w-2.5 rounded-full bg-lime" /> Design · Build · Launch</p>
            </FloatCard>
            <FloatCard className="bottom-[22%] left-[4%] hidden lg:block" delay={1}>
              <div className="flex gap-1.5">{["bg-cobalt", "bg-azure", "bg-cyan", "bg-violet", "bg-lime"].map((c) => <span key={c} className={`h-5 w-5 rounded-md ${c}`} />)}</div>
            </FloatCard>
          </div>
        </div>
      </section>

      <section className={`${wrap} pb-8`}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4" style={{ perspective: 1200 }}>
          {demos.slice(0, 8).filter((_, i) => i % 2 === 0).map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.08}>
              <Link to="/demos/$slug" params={{ slug: d.slug }} className="group block overflow-hidden rounded-3xl border bg-card p-2 shadow-elegant transition-transform duration-500 hover:-translate-y-2" style={{ transform: `rotate(${[-3, 2, -2, 3][i]}deg)` }}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl" style={{ background: d.theme.bg, color: d.theme.fg }}>
                  <Img src={d.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-x-3 bottom-3 rounded-xl px-3 py-2 text-sm font-semibold" style={{ background: d.theme.accent, color: d.theme.accentFg }}>{d.name}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee />

      <section className={`${wrap} py-32`}>
        <SectionHead eyebrow="Featured concepts" title={<>Work that does the <span className="text-brand-gradient">talking.</span></>} aside={<Link to="/work" className="link-underline text-primary">All 20 concepts →</Link>} />
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {featured.map((d, i) => <Reveal key={d.slug} delay={i * 0.08} className={i % 2 ? "md:mt-24" : ""}><ProjectCard d={d} index={i * 2 + 1} tall /></Reveal>)}
        </div>
      </section>

      <section className={`${wrap} pb-32`}>
        <SectionHead eyebrow="The concept library" title={<>20 concepts. <span className="text-brand-gradient">20 different worlds.</span></>} aside={<p className="max-w-xs text-sm text-muted-foreground">Each one is a live, independently navigable demo site — built to show range, not reuse a template.</p>} />
        <PortfolioGrid />
      </section>

      <section className={`${wrap} py-32`}>
        <SectionHead eyebrow="Services" title="Built around outcomes." aside={<Link to="/services" className="link-underline text-primary">Service details →</Link>} />
        <ServicesList />
      </section>

      <section className={`${wrap} grid gap-12 py-24 md:grid-cols-2`}>
        <Reveal><p className="eyebrow text-primary">The studio</p><h2 className="mt-5 font-display text-5xl leading-[0.95] md:text-7xl">Small studio. <span className="text-brand-gradient">Full attention.</span></h2></Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>Webs by Rayyan is an independent practice led by Rayyan, a designer and developer. Every project is handled directly — from first call to launch — so nothing gets lost in hand-offs.</p>
          <p>The aim is simple: websites that look distinctive, load fast, and make it easy for the right customers to say yes.</p>
          <Link to="/about" className="link-underline inline-block text-primary">More about the studio →</Link>
        </Reveal>
      </section>

      <section id="process" className={`${wrap} scroll-mt-24 py-24`}>
        <SectionHead eyebrow="Process" title="Five steps, no surprises." />
        <ProcessSteps />
      </section>

      <CTABand />

      <section className={`${wrap} grid gap-16 pb-32 lg:grid-cols-[1fr_1.4fr]`}>
        <div><p className="eyebrow text-primary">Inquiry</p><h2 className="mt-5 font-display text-5xl">Tell me about your project.</h2><p className="mt-5 text-muted-foreground">Share a few details and I'll reply with next steps.</p></div>
        <ContactForm />
      </section>
    </Shell>
  );
}
