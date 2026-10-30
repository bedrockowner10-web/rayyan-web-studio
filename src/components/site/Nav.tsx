import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Logo";
import { Magnetic } from "./Motion";
import { navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "glass border-b py-3" : "py-6")}>
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10" aria-label="Main">
        <Link to="/" aria-label="Webs by Rayyan — home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>
        <ul className="hidden items-center gap-9 text-sm lg:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                hash={"hash" in l ? l.hash : undefined}
                className="link-underline pb-1 text-foreground/80 hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: true, includeHash: true }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Magnetic>
            <Link
              to="/contact"
              className="hidden rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] sm:inline-block"
            >
              Start a project
            </Link>
          </Magnetic>
          <button
            className="grid h-11 w-11 place-items-center rounded-full border lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[72px] z-40 bg-background px-6 pt-10 lg:hidden"
          >
            <ul className="space-y-2">
              {navLinks.map((l, i) => (
                <motion.li key={l.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}>
                  <Link
                    to={l.to}
                    hash={"hash" in l ? l.hash : undefined}
                    onClick={() => setOpen(false)}
                    className="block border-b py-4 font-display text-4xl"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-10 inline-block rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground"
            >
              Start a project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
