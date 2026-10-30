import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="grain min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <Cursor />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-40 md:px-10 md:pt-48">
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[700px] bg-glow" />
      <div className="relative mx-auto max-w-[1400px]">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.95] tracking-tight md:text-8xl">{title}</h1>
        {intro && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}
