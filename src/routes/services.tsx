import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/site/Shell";
import { CTABand, ProcessSteps, SectionHead, ServicesList } from "@/components/site/Sections";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Webs by Rayyan" },
      { name: "description", content: "Custom website design, development, e-commerce, landing pages, and redesign & optimisation." },
      { property: "og:title", content: "Services — Webs by Rayyan" },
      { property: "og:description", content: "Design and development services focused on outcomes, not buzzwords." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Shell>
      <PageHeader eyebrow="Services" title={<>Everything a great website <span className="italic">needs.</span></>} intro="Design, build and launch — handled by one person, end to end. Pick a single service or bring it all together." />
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10"><ServicesList detailed /></section>
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10"><SectionHead eyebrow="Workflow" title="How projects run." /><ProcessSteps /></section>
      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:grid-cols-[1fr_1.5fr] md:px-10">
        <h2 className="font-display text-5xl">Questions, answered.</h2>
        <Accordion type="single" collapsible>
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-display text-xl">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <CTABand />
    </Shell>
  ),
});
