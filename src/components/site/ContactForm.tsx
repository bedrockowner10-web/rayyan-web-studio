import { useState } from "react";
import { z } from "zod";
import { Check, Copy } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const projectTypes = ["New website", "E-commerce store", "Landing page", "Redesign", "Something else"];

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  business: z.string().trim().max(120).optional().default(""),
  type: z.string().min(1, "Choose a project type"),
  budget: z.string().min(1, "Choose a budget range"),
  message: z.string().trim().min(10, "A sentence or two helps (10+ characters)").max(2000),
});
type Inquiry = z.infer<typeof inquirySchema>;

export function buildMailto(d: Inquiry) {
  const body = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Business: ${d.business || "—"}`,
    `Project type: ${d.type}`,
    `Budget: ${siteConfig.currencySymbol}${d.budget} (${siteConfig.currency})`,
    "",
    d.message,
  ].join("\n");
  return {
    href: `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Project inquiry — ${d.business || d.name}`)}&body=${encodeURIComponent(body)}`,
    body,
  };
}

const field = "w-full border-b bg-transparent py-3 text-base placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ href: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const r = inquirySchema.safeParse(raw);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] ??= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const m = buildMailto(r.data);
    setDone(m);
    window.location.href = m.href;
  };

  if (done)
    return (
      <div className="border p-8 md:p-10" role="status">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><Check /></div>
        <h3 className="mt-6 font-display text-4xl">Almost there.</h3>
        <p className="mt-3 max-w-md text-muted-foreground">
          Your email app should have opened with your inquiry ready to send. Your message is not sent until you press send there.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={done.href} className="rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground">Open email again</a>
          <button
            onClick={async () => { await navigator.clipboard.writeText(done.body); setCopied(true); }}
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm"
          >
            <Copy size={14} /> {copied ? "Copied" : `Copy message for ${siteConfig.email}`}
          </button>
          <button onClick={() => setDone(null)} className="link-underline px-2 text-sm text-muted-foreground">Edit inquiry</button>
        </div>
      </div>
    );

  const Err = ({ k }: { k: string }) =>
    errors[k] ? <p id={`${k}-err`} className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 md:grid-cols-2">
      {[
        { k: "name", label: "Your name", type: "text", auto: "name" },
        { k: "email", label: "Email", type: "email", auto: "email" },
      ].map((f) => (
        <label key={f.k} className="block">
          <span className="eyebrow text-muted-foreground">{f.label} *</span>
          <input name={f.k} type={f.type} autoComplete={f.auto} className={cn(field, errors[f.k] && "border-destructive")} aria-invalid={!!errors[f.k]} aria-describedby={`${f.k}-err`} />
          <Err k={f.k} />
        </label>
      ))}
      <label className="block md:col-span-2">
        <span className="eyebrow text-muted-foreground">Business</span>
        <input name="business" autoComplete="organization" className={field} placeholder="Company or project name" />
      </label>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Project type *</span>
        <select name="type" defaultValue="" className={cn(field, "bg-background", errors.type && "border-destructive")} aria-invalid={!!errors.type}>
          <option value="" disabled>Select…</option>
          {projectTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
        <Err k="type" />
      </label>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Budget ({siteConfig.currency}) *</span>
        <select name="budget" defaultValue="" className={cn(field, "bg-background", errors.budget && "border-destructive")} aria-invalid={!!errors.budget}>
          <option value="" disabled>Select…</option>
          {siteConfig.budgets.map((b) => <option key={b} value={b}>{b === "Not sure yet" ? b : `${siteConfig.currencySymbol}${b}`}</option>)}
        </select>
        <Err k="budget" />
      </label>
      <label className="block md:col-span-2">
        <span className="eyebrow text-muted-foreground">Tell me about the project *</span>
        <textarea name="message" rows={5} className={cn(field, "resize-none", errors["message"] && "border-destructive")} placeholder="Goals, timeline, links you like…" aria-invalid={!!errors["message"]} />
        <Err k="message" />
      </label>
      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="max-w-sm text-xs text-muted-foreground">Submitting opens your email app with the inquiry prefilled, addressed to {siteConfig.email}.</p>
        <button type="submit" className="rounded-full bg-brand-gradient px-8 py-4 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
          Send inquiry
        </button>
      </div>
    </form>
  );
}
