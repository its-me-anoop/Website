"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/* Only a value that *opens* with digits animates: "5", "100%" and
   "1 day" count, while "WCAG 2.2 AA" is left alone. */
const LEADING_NUMBER = /^(\d+(?:\.\d+)?)([\s\S]*)$/;

/**
 * Counts a stat up to its final value the first time it scrolls into
 * view. Values that do not start with a number ("WCAG 2.2 AA") are
 * rendered verbatim, so the same component can drive a mixed stat row.
 *
 * The final string is always present in the DOM for assistive tech via
 * the `aria-label`; the animated digits are hidden from it.
 */
export function CountUp({
  value,
  duration = 1.5,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const match = value.match(LEADING_NUMBER);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const animates = target !== null && !reduce;

  const [counted, setCounted] = useState(`0${suffix}`);

  useEffect(() => {
    if (!animates || !inView) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      /* easeOutExpo — fast, then settles precisely on the value. */
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setCounted(`${(target! * eased).toFixed(decimals)}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animates, inView, target, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{animates ? counted : value}</span>
    </span>
  );
}
