import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/site/Shell";
import { PortfolioGrid } from "@/components/site/PortfolioGrid";
import { CTABand } from "@/components/site/Sections";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — 20 concept demos · Webs by Rayyan" },
      { name: "description", content: "Browse 20 live concept websites across hospitality, property, e-commerce, technology and more." },
      { property: "og:title", content: "Work — 20 concept demos · Webs by Rayyan" },
      { property: "og:description", content: "Twenty distinct, live concept websites. Filter by industry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Shell>
      <PageHeader eyebrow="Work" title={<>20 concepts. <span className="italic text-brand-gradient">20 different worlds.</span></>} intro="Independent concept demos, each designed as if for a separate client brief. Open any one to explore a live site." />
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10"><PortfolioGrid /></section>
      <CTABand />
    </Shell>
  ),
});
