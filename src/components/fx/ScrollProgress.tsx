"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * The three-colour rule, drawn as a hairline across the very top of
 * the viewport, filling as the page scrolls. Purely ambient —
 * `aria-hidden`, and the spring is skipped entirely for reduced-motion
 * users (the bar still tracks position, it just does not overshoot).
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
      className="fixed inset-x-0 top-0 z-[200] h-[3px] origin-left bg-[image:var(--au-rule)]"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
