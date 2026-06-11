"use client";

import { useEffect, useRef } from "react";

/**
 * Counts from 0 to `target` (cubic ease-out, 1.5s) the first time it
 * scrolls into view. Server-renders the final value so SEO and
 * reduced-motion users always see the real number.
 */
export function Counter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.textContent = `0${suffix}`;
    let started = false;
    const cleanups: Array<() => void> = [];

    const start = () => {
      if (started) return;
      started = true;
      cleanups.forEach((fn) => fn());
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1500);
        el.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom >= 0) start();
    };

    if (typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(check, { threshold: 0.1 });
      io.observe(el);
      cleanups.push(() => io.disconnect());
    }
    window.addEventListener("scroll", check, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", check));
    let polls = 0;
    const fast = setInterval(() => {
      check();
      if (++polls > 16) clearInterval(fast);
    }, 300);
    cleanups.push(() => clearInterval(fast));
    check();

    return () => cleanups.forEach((fn) => fn());
  }, [target, suffix]);

  return (
    <span ref={ref}>
      {target}
      {suffix}
    </span>
  );
}
