"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked parallax. The wrapped content drifts by `distance`
 * pixels across the element's whole pass through the viewport, softened
 * by a spring so fast scrolling never feels twitchy.
 *
 * Positive `distance` moves the layer *down* as you scroll (i.e. it
 * lags behind, reading as further away).
 */
export function Parallax({
  children,
  className,
  distance = 60,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  as?: "div" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);
  const y = useSpring(raw, { stiffness: 120, damping: 26, mass: 0.4 });

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <m.div style={{ y }}>{children}</m.div>
    </div>
  );
}
