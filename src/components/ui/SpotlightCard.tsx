"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type HTMLMotionProps,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  children:
    | React.ReactNode
    | ((p: {
        /** Parallax offsets (px) tracking the cursor, for layered art. */
        px: MotionValue<number>;
        py: MotionValue<number>;
      }) => React.ReactNode);
  /** Colour of the cursor-tracking spotlight glow. */
  glow?: string;
  /** Max 3D tilt in degrees (0 disables tilt). */
  tilt?: number;
  /** Parallax travel in px exposed to render-prop children. */
  parallax?: number;
  interactive?: boolean;
}

/**
 * Surface card with three layered interactions:
 *   1. a cursor-tracking radial spotlight,
 *   2. spring-damped 3D tilt toward the pointer, and
 *   3. parallax offsets exposed to render-prop children for floating art.
 * All effects collapse gracefully under `prefers-reduced-motion`.
 */
export function SpotlightCard({
  className,
  children,
  glow = "var(--signal-faint)",
  tilt = 4,
  parallax = 12,
  interactive = true,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { damping: 28, stiffness: 180, mass: 0.5 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  const rotateX = useTransform(sy, [0, 1], [tilt, -tilt]);
  const rotateY = useTransform(sx, [0, 1], [-tilt, tilt]);
  const px = useTransform(sx, [0, 1], [-parallax, parallax]);
  const py = useTransform(sy, [0, 1], [-parallax, parallax]);

  const off = !interactive || reduce;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (off || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setCoords({ x: e.clientX - r.left, y: e.clientY - r.top });
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => !off && setHovered(true)}
      onMouseLeave={() => {
        if (off) return;
        setHovered(false);
        mx.set(0.5);
        my.set(0.5);
      }}
      style={
        off
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
            }
      }
      whileHover={off ? undefined : { y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface/60 p-6 backdrop-blur-xl transition-colors duration-500 hover:border-line-2",
        className
      )}
      {...props}
    >
      {!off && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, ${glow}, transparent 65%)`,
          }}
        />
      )}
      {typeof children === "function" ? children({ px, py }) : children}
    </motion.div>
  );
}
