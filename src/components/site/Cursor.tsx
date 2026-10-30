import { useEffect, useRef, useState } from "react";

/** Desktop-only custom cursor. Touch devices and reduced-motion keep the native cursor. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    let rx = 0, ry = 0, mx = 0, my = 0, raf = 0;
    const move = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target as HTMLElement;
      const hot = !!t.closest("a, button, [role=button], input, textarea, select, label");
      ring.current?.setAttribute("data-hot", String(hot));
    };
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div ref={dot} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-primary" />
      <div
        ref={ring}
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-primary/50 transition-[width,height,margin,background-color] duration-300 data-[hot=true]:-left-8 data-[hot=true]:-top-8 data-[hot=true]:h-16 data-[hot=true]:w-16 data-[hot=true]:bg-primary/10"
      />
    </div>
  );
}
