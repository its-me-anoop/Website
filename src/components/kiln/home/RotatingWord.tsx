"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { heroAudiences } from "../data";
import { EASE } from "../primitives";
import { useHeroReducedMotion } from "./useHeroReducedMotion";

/**
 * The cycling audience word in the hero headline. Each word slides in
 * from below as the previous one lifts away, and takes its own glaze.
 *
 * Accessibility: assistive tech reads a single static word (the first
 * entry); the animated copy is hidden from the accessibility tree so the
 * heading's name never changes. Reduced motion shows the static word.
 */
export function RotatingWord({ interval = 2600, paused = false }: { interval?: number; paused?: boolean }) {
  const reduce = useHeroReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce !== false || paused) return;
    const id = window.setInterval(() => {
      /* Don't advance in a background tab; resume in step when visible. */
      if (document.visibilityState !== "visible") return;
      setIndex((i) => (i + 1) % heroAudiences.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduce, paused, interval]);

  const current = heroAudiences[reduce ? 0 : index];

  return (
    <>
      <span className="sr-only">{heroAudiences[0].word}</span>
      <span
        aria-hidden
        className="relative inline-grid whitespace-nowrap align-baseline"
      >
        {reduce ? <em style={{ color: `var(--hero-word-color, ${current.color})` }}>{current.word}</em> : <AnimatePresence mode="wait" initial={false}>
          <m.em
            key={current.word}
            className="[grid-area:1/1] will-change-transform"
            style={{ color: `var(--hero-word-color, ${current.color})` }}
            initial={{ y: "0.5em", opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } }}
            /* Short, quick exit so the leaving word never reads over the
               line above it. */
            exit={{ y: "-0.3em", opacity: 0, transition: { duration: 0.32, ease: EASE } }}
          >
            {current.word}
          </m.em>
        </AnimatePresence>}
      </span>
    </>
  );
}
