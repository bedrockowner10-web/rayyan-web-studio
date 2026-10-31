import { Component, lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Monogram } from "./Logo";

const Emblem3D = lazy(() => import("./Emblem3D"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    const context = c.getContext("webgl2") || c.getContext("webgl");
    const supported = !!context && !context.isContextLost();
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return supported;
  } catch {
    return false;
  }
}

/** Catch both lazy-import failures and Canvas renderer initialization failures. */
class EmblemErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch() {
    this.props.onError();
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** CSS fallback: layered, lit SVG mark with a metallic sheen. */
export function EmblemFallback() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <div className="absolute aspect-square w-[78%] rounded-full border-2 border-dashed border-primary/25" />
      <div className="absolute aspect-square w-[60%] rounded-full bg-glow blur-2xl" />
      <div className="relative w-[58%] animate-float-slow motion-reduce:animate-none drop-shadow-[0_30px_40px_oklch(0.5_0.22_264/0.35)]">
        <Monogram className="h-auto w-full" />
      </div>
    </div>
  );
}

export function Emblem() {
  const reduce = !!useReducedMotion();
  const [use3D, setUse3D] = useState<boolean | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const onReady = useCallback(() => {
    setStatus((current) => current === "loading" ? "ready" : current);
  }, []);
  const onError = useCallback(() => setStatus("failed"), []);
  useEffect(() => {
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 2;
    setUse3D(hasWebGL() && !lowPower);
  }, []);
  return (
    <div className="relative h-full w-full" aria-label="Webs by Rayyan WB emblem" role="img" data-scene-ready={status === "ready" ? "" : undefined}>
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${status === "ready" ? "opacity-0" : "opacity-100"}`}>
        <EmblemFallback />
      </div>
      {use3D && status !== "failed" && (
        <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${status === "ready" ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <EmblemErrorBoundary onError={onError}>
            <Suspense fallback={null}>
              <Emblem3D reduce={reduce} onReady={onReady} onError={onError} />
            </Suspense>
          </EmblemErrorBoundary>
        </div>
      )}
    </div>
  );
}
