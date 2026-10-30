import { lazy, Suspense, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Monogram } from "./Logo";

const Emblem3D = lazy(() => import("./Emblem3D"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** CSS fallback: layered, lit SVG mark with a metallic sheen. */
export function EmblemFallback() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <div className="absolute aspect-square w-[78%] rounded-full border border-primary/25" />
      <div className="absolute aspect-square w-[60%] rounded-full bg-glow blur-2xl" />
      <div className="relative w-[58%] animate-float-slow drop-shadow-[0_30px_40px_oklch(0_0_0/0.6)]">
        <Monogram className="h-auto w-full" />
      </div>
    </div>
  );
}

export function Emblem() {
  const reduce = !!useReducedMotion();
  const [use3D, setUse3D] = useState<boolean | null>(null);
  useEffect(() => {
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 2;
    setUse3D(hasWebGL() && !lowPower);
  }, []);
  return (
    <div className="relative h-full w-full" aria-label="Webs by Rayyan WB emblem" role="img">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      {use3D ? (
        <Suspense fallback={<EmblemFallback />}>
          <Emblem3D reduce={reduce} />
        </Suspense>
      ) : (
        <EmblemFallback />
      )}
    </div>
  );
}
