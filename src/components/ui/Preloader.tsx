"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m as motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "noir-preloader-shown";

/**
 * Cinematic page loader: a counter sweeps 0→100, then the black curtain
 * lifts to reveal the page. Shown once per session, skipped entirely for
 * reduced-motion users, and always finished in ~1.2s so it never gates
 * content for long (the page renders beneath it throughout).
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable → still show once */
    }
    const DURATION = 900;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) {
        start = now;
        setShow(true);
      }
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out so the count rushes early and settles late
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[300] flex items-end justify-between bg-night px-[var(--gutter)] pb-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-night-ink/50">
            Anoop Jose · Portfolio
          </span>
          <span className="font-display text-[clamp(64px,12vw,140px)] font-semibold leading-none tracking-[-0.04em] text-night-ink tabular-nums">
            {count}
            <span className="text-accent">%</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
