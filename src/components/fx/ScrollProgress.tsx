"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline aurora gradient across the very top of the viewport that
 * fills as the page scrolls. Purely ambient — `aria-hidden`, and the
 * spring is skipped entirely for reduced-motion users (the bar still
 * tracks position, it just does not overshoot).
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[200] h-[2px] origin-left bg-[linear-gradient(90deg,#2fd8ad,#5ce6d5_28%,#5cb2ff_62%,#a48cff)]"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
