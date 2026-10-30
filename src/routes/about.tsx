import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/site/Shell";
import { CTABand, ProcessSteps, SectionHead } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Motion";

const values = [
  { t: "Distinct over default", d: "Templates have their place. This studio exists for businesses that need to look like themselves." },
  { t: "Clarity is a feature", d: "Clear scopes, clear pricing and plain-English updates throughout the project." },
  { t: "Built to last", d: "Fast, accessible code and content you can manage after launch." },
  { t: "Business first", d: "Every design decision is measured against what it does for your customers." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the studio — Webs by Rayyan" },
      { name: "description", content: "An independent web design and development studio led by Rayyan." },
      { property: "og:title", content: "About — Webs by Rayyan" },
      { property: "og:description", content: "The story, approach and values behind Webs by Rayyan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Shell>
      <PageHeader eyebrow="About" title={<>An independent studio with <span className="italic text-brand-gradient">one standard.</span></>} intro="Webs by Rayyan is run by Rayyan — a designer and developer who works directly with every client, from first conversation to launch." />
      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-2 md:px-10">
        <Reveal><h2 className="font-display text-4xl md:text-5xl">Why the studio exists</h2></Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>Too many good businesses sit behind websites that look like everyone else's. The studio was started to close that gap — pairing editorial-quality design with solid, modern engineering.</p>
          <p>Rather than lean on borrowed credentials, the work on this site is the proof: twenty independent concept demos, each built for a different industry and audience.</p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <SectionHead eyebrow="Values" title="What guides the work." />
        <div className="grid gap-px border bg-border md:grid-cols-4">
          {values.map((v, i) => <Reveal key={v.t} delay={i * 0.06} className="bg-background p-8"><h3 className="font-display text-3xl">{v.t}</h3><p className="mt-4 text-sm text-muted-foreground">{v.d}</p></Reveal>)}
        </div>
      </section>
      <section id="process" className="mx-auto max-w-[1400px] scroll-mt-24 px-6 py-24 md:px-10"><SectionHead eyebrow="Process" title="Five steps, no surprises." /><ProcessSteps /></section>
      <CTABand />
    </Shell>
  ),
});
