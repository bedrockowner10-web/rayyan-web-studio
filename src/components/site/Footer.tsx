import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Logo";
import { navLinks, siteConfig } from "@/config/site";

export function Footer() {
  const socials = Object.entries(siteConfig.socials).filter(([, url]) => url);
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-[2fr_1fr_1fr] md:px-10">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            An independent studio designing and building distinctive, conversion-focused websites for ambitious businesses.
          </p>
          <a href={`mailto:${siteConfig.email}`} className="link-underline mt-6 inline-block font-display text-2xl">
            {siteConfig.email}
          </a>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">Navigate</p>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} hash={"hash" in l ? l.hash : undefined} className="link-underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">Elsewhere</p>
          <ul className="mt-5 space-y-3 text-sm">
            {socials.length ? (
              socials.map(([k, url]) => (
                <li key={k}>
                  <a href={url} target="_blank" rel="noreferrer" className="link-underline capitalize">{k}</a>
                </li>
              ))
            ) : (
              <li><Link to="/contact" className="link-underline">Contact the studio</Link></li>
            )}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-2 border-t px-6 py-6 text-xs text-muted-foreground md:flex-row md:px-10">
        <p>© {new Date().getFullYear()} Webs by Rayyan. All rights reserved.</p>
        <p>Concept projects shown are independent demos, not commissioned client work.</p>
      </div>
    </footer>
  );
}
