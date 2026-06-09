"use client";

import React, { useRef } from "react";
import {
  m as motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type HTMLMotionProps,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface LiftCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children:
    | React.ReactNode
    | ((p: {
        /** Parallax offsets (px) tracking the cursor, for layered art. */
        px: MotionValue<number>;
        py: MotionValue<number>;
      }) => React.ReactNode);
  /** Max 3D tilt in degrees (0 disables tilt). */
  tilt?: number;
  /** Parallax travel in px exposed to render-prop children. */
  parallax?: number;
  interactive?: boolean;
}

/**
 * The standard surface card: white, hairline-edged, with a soft shadow
 * lift on hover, a whisper of spring-damped 3D tilt toward the pointer,
 * and parallax offsets exposed to render-prop children for floating art.
 * Everything collapses gracefully under `prefers-reduced-motion`.
 */
export function LiftCard({
  className,
  children,
  tilt = 2.5,
  parallax = 10,
  interactive = true,
  ...props
}: LiftCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { damping: 30, stiffness: 160, mass: 0.5 };
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
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        if (off) return;
        mx.set(0.5);
        my.set(0.5);
      }}
      style={
        off
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1400,
              transformStyle: "preserve-3d",
            }
      }
      whileHover={off ? undefined : { y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.16)]",
        className
      )}
      {...props}
    >
      {typeof children === "function" ? children({ px, py }) : children}
    </motion.div>
  );
}
