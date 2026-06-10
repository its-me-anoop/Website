"use client";

import React from "react";
import { m as motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: React.ReactNode;
  /** Seconds before the line starts rising. */
  delay?: number;
  /** Animate on mount (hero) instead of on scroll into view. */
  onMount?: boolean;
  className?: string;
}

/**
 * The signature Noir display entrance: a line of text rises out of an
 * overflow-clipped mask. The *mask* is the observed element — the inner
 * line starts translated outside it, and a clipped element never
 * intersects, so observing the child directly would never fire.
 * Renders statically for reduced-motion users.
 */
export function RevealText({
  children,
  delay = 0,
  onMount = false,
  className,
}: RevealTextProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={cn("block", className)}>{children}</span>;
  }

  const line: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.span
      className={cn("block overflow-hidden", className)}
      initial="hidden"
      {...(onMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, margin: "-10% 0px" } })}
    >
      <motion.span variants={line} className="block will-change-transform">
        {children}
      </motion.span>
    </motion.span>
  );
}
