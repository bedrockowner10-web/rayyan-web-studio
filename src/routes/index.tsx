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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webs by Rayyan — Independent web design & development studio" },
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
      <section className="relative min-h-screen overflow-hidden pt-28">
        <div className={`${wrap} grid items-center gap-8 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[1.15fr_1fr]`}>
          <div className="relative z-10 py-10">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow flex items-center gap-3 text-muted-foreground">
              <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-primary opacity-60" /><span className="h-2 w-2 rounded-full bg-primary" /></span>
              {siteConfig.availability}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="mt-8 font-display text-[3.6rem] leading-[0.9] tracking-tight sm:text-7xl xl:text-[7.5rem]"
            >
              Digital experiences, <span className="italic text-brass-gradient">made to move</span> businesses.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Webs by Rayyan is an independent studio designing and building custom websites for brands that would rather stand out than blend in.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap gap-4">
              <Magnetic><Link to="/work" className="inline-flex items-center gap-2 rounded-full bg-brass-gradient px-7 py-4 font-medium text-primary-foreground shadow-brass">Explore the work <ArrowRight size={18} /></Link></Magnetic>
              <Link to="/contact" className="inline-flex items-center rounded-full border px-7 py-4 hover:border-primary">Start a project</Link>
            </motion.div>
          </div>
          <div className="relative h-[420px] sm:h-[520px] lg:h-[720px]"><Emblem /></div>
        </div>
      </section>

      <Marquee />

      <section className={`${wrap} py-32`}>
        <SectionHead eyebrow="Featured concepts" title={<>Work that does the <span className="italic">talking.</span></>} aside={<Link to="/work" className="link-underline text-primary">All 20 concepts →</Link>} />
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {featured.map((d, i) => <Reveal key={d.slug} delay={i * 0.08} className={i % 2 ? "md:mt-24" : ""}><ProjectCard d={d} index={i * 2 + 1} tall /></Reveal>)}
        </div>
      </section>

      <section className={`${wrap} pb-32`}>
        <SectionHead eyebrow="The concept library" title={<>20 concepts. <span className="italic text-brass-gradient">20 different worlds.</span></>} aside={<p className="max-w-xs text-sm text-muted-foreground">Each one is a live, independently navigable demo site — built to show range, not reuse a template.</p>} />
        <PortfolioGrid />
      </section>

      <section className={`${wrap} py-32`}>
        <SectionHead eyebrow="Services" title="Built around outcomes." aside={<Link to="/services" className="link-underline text-primary">Service details →</Link>} />
        <ServicesList />
      </section>

      <section className={`${wrap} grid gap-12 py-24 md:grid-cols-2`}>
        <Reveal><p className="eyebrow text-primary">The studio</p><h2 className="mt-5 font-display text-5xl leading-[0.95] md:text-7xl">Small studio. <span className="italic">Full attention.</span></h2></Reveal>
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
