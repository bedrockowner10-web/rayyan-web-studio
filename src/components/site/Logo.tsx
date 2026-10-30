import { useId } from "react";

/** WB monogram — the W's final stroke becomes the B's stem. */
export function Monogram({ className = "h-7 w-auto" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 96 60" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="96" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="oklch(0.52 0.24 264)" />
          <stop offset="0.45" stopColor="oklch(0.68 0.17 240)" />
          <stop offset="0.7" stopColor="oklch(0.82 0.14 205)" />
          <stop offset="1" stopColor="oklch(0.6 0.24 295)" />
        </linearGradient>
      </defs>
      <g stroke={`url(#g${id})`} strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M4 8 L18 52 L32 18 L46 52 L58 8" />
        <path d="M58 6 V54 M58 8 H74 a11 11 0 0 1 0 22 H58 M58 30 H77 a11 11 0 0 1 0 22 H58" />
      </g>
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-3">
      <Monogram />
      <span className="font-display text-xl font-bold leading-none tracking-tight">
        Webs <span className="font-normal text-muted-foreground">by</span> Rayyan
      </span>
    </span>
  );
}
