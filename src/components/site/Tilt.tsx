import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Perspective tilt on fine pointers; flat on touch and reduced motion. */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });
  return (
    <div className={className} style={{ perspective: 1100 }}>
      <motion.div
        style={reduce ? {} : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => { px.set(0.5); py.set(0.5); }}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
