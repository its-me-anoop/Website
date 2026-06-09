"use client";

import React from "react";
import { m as motion, useReducedMotion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  /** Slide-in direction for the reveal. */
  direction?: Direction;
  /** Seconds of delay before the reveal begins. */
  delay?: number;
  /** Distance travelled, in px. */
  distance?: number;
  /** Add blur-in for a softer, more premium entrance. */
  blur?: boolean;
  className?: string;
  /** Render as a different element (e.g. "li", "span"). */
  as?: "div" | "li" | "span" | "section";
}

/** Fixed map so motion props stay correctly typed (dynamic indexing widens to never). */
const motionTags = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
  section: motion.section,
} as const;

const offset = (d: Direction, dist: number) => {
  switch (d) {
    case "up":
      return { y: dist };
    case "down":
      return { y: -dist };
    case "left":
      return { x: dist };
    case "right":
      return { x: -dist };
    default:
      return {};
  }
};

/**
 * Scroll-triggered reveal wrapper. Animates once when the element enters the
 * viewport. Honours `prefers-reduced-motion` by rendering content statically.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  distance = 28,
  blur = false,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motionTags[as];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset(direction, distance),
      ...(blur ? { filter: "blur(10px)" } : {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(blur ? { filter: "blur(0px)" } : {}),
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (reduce) {
    return React.createElement(as, { className }, children);
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Container that staggers the reveal of its direct `<Reveal>` children.
 * Pair with `<Reveal>` children that omit their own `whileInView`.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18, mass: 0.7 },
  },
};
