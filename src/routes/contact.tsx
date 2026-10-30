import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/site/Shell";
import { ContactForm } from "@/components/site/ContactForm";
import { WhatsAppButton } from "@/components/site/Sections";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start a project — Webs by Rayyan" },
      { name: "description", content: "Have a project in mind? Send an inquiry to Webs by Rayyan." },
      { property: "og:title", content: "Start a project — Webs by Rayyan" },
      { property: "og:description", content: "Have a project in mind? Let's make it happen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Shell>
      <PageHeader eyebrow="Contact" title={<>Have a project in mind? <span className="italic text-brand-gradient">Let's make it happen.</span></>} />
      <section className="mx-auto grid max-w-[1400px] gap-16 px-6 pb-32 md:px-10 lg:grid-cols-[1fr_1.6fr]">
        <aside className="space-y-10">
          <div><p className="eyebrow text-muted-foreground">Email</p><a href={`mailto:${siteConfig.email}`} className="link-underline mt-3 inline-block font-display text-3xl">{siteConfig.email}</a></div>
          <div><p className="eyebrow text-muted-foreground">Chat</p><div className="mt-3"><WhatsAppButton /></div></div>
          <div><p className="eyebrow text-muted-foreground">Status</p><p className="mt-3">{siteConfig.availability}</p></div>
        </aside>
        <ContactForm />
      </section>
    </Shell>
  ),
});
