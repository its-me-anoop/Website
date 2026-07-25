"use client";

import { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Springy 3D tilt for hero artwork and device mock-ups. The pointer's
 * position inside the element maps to a small rotation on both axes and
 * a matching parallax on any child marked `data-tilt-layer`, which is
 * what sells the depth.
 *
 * Pointer-only by design: it needs no keyboard equivalent because it
 * conveys nothing — the content underneath is fully static and legible.
 */
export function Tilt({
  children,
  className,
  strength = 8,
  scale = 1.015,
}: {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the corners. */
  strength?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateX = useTransform(sy, [-0.5, 0.5], [strength, -strength]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-strength, strength]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className={cn("[perspective:1400px]", className)}>
      <m.div
        ref={ref}
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        whileHover={{ scale }}
        transition={{ duration: 0.4 }}
        onPointerMove={(event) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          px.set((event.clientX - rect.left) / rect.width - 0.5);
          py.set((event.clientY - rect.top) / rect.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        {children}
      </m.div>
    </div>
  );
}
