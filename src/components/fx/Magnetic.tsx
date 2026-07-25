"use client";

import { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A magnetic hover: the wrapped element leans a few pixels towards the
 * pointer while it is over (or just around) it, then springs home.
 * Applied to primary buttons, where it makes the target feel eager
 * without ever moving it far enough to be hard to hit.
 */
export function Magnetic({
  children,
  className,
  pull = 0.28,
  max = 10,
}: {
  children: React.ReactNode;
  className?: string;
  /** Fraction of the pointer offset that is followed. */
  pull?: number;
  /** Hard cap on the displacement, in pixels. */
  max?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 20, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  if (reduce) return <span className={cn("inline-flex", className)}>{children}</span>;

  return (
    <m.span
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        x.set(Math.max(-max, Math.min(max, dx * pull)));
        y.set(Math.max(-max, Math.min(max, dy * pull)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}
