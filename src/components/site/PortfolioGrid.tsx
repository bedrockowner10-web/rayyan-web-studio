import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { categories, demos, type Category } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

export function PortfolioGrid() {
  const [cat, setCat] = useState<"All" | Category>("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return demos.filter(
      (d) =>
        (cat === "All" || d.category === cat) &&
        (!s || `${d.name} ${d.industry} ${d.blurb} ${d.category}`.toLowerCase().includes(s)),
    );
  }, [cat, q]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-y py-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const count = c === "All" ? demos.length : demos.filter((d) => d.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-foreground/40",
                )}
              >
                {c} <span className="ml-1 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Search concepts</span>
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by industry or name"
            className="w-full rounded-full border bg-transparent py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </label>
      </div>
      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        Showing {list.length} of {demos.length} concepts
      </p>
      <motion.div layout className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((d, i) => (
            <motion.div
              key={d.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04 }}
            >
              <ProjectCard d={d} index={demos.indexOf(d)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-display text-3xl">No concepts match that search.</p>
          <button onClick={() => { setQ(""); setCat("All"); }} className="link-underline mt-4 text-primary">Clear filters</button>
        </div>
      )}
    </div>
  );
}
