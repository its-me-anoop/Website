"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Magnetic hover: within a 220px radius the element is pulled toward
 * the cursor, easing off with distance. Skipped for reduced motion.
 */
export function MagneticCta({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 220) {
        const pull = (220 - dist) / 220;
        el.style.transform = `translate(${dx * pull * 0.28}px, ${dy * pull * 0.28}px)`;
      } else {
        el.style.transform = "translate(0, 0)";
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
