"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type RevealKind = "up" | "left" | "right" | "pop" | "word";

const HIDDEN_TRANSFORM: Record<RevealKind, string> = {
  up: "translateY(44px)",
  left: "translateX(-48px)",
  right: "translateX(48px)",
  pop: "translateY(26px) scale(.93)",
  word: "translateY(110%)",
};

const EASE = "cubic-bezier(.22,1.1,.36,1)";

/**
 * Blur-rise scroll reveal. Children are server-rendered fully visible
 * (SEO / no-JS safe); on mount they are hidden without a transition,
 * then released the moment they enter the viewport.
 *
 * IntersectionObserver is only a cheap wake-up — a position check on
 * mount, on scroll, and on a brief settle poll is the source of truth,
 * so content can never stay stuck hidden. Reduced-motion users skip
 * the choreography entirely.
 */
export function Reveal({
  kind = "up",
  delay = 0,
  className,
  as: Tag = "div",
  children,
}: {
  kind?: RevealKind;
  /** transition-delay in ms — staggers siblings revealed together */
  delay?: number;
  className?: string;
  /** wrapper element — use "span" inside headings/inline contexts */
  as?: "div" | "span";
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Hide with transitions off, flush, then arm the transition so the
    // SSR-visible -> hidden flip never animates (no fade-out flash).
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.filter = "blur(14px)";
    el.style.transform = HIDDEN_TRANSFORM[kind];
    el.style.willChange = "opacity, transform, filter";
    void el.offsetHeight;
    el.style.transition = `opacity 1s ${EASE}, transform 1s ${EASE}, filter 1s ${EASE}`;
    el.style.transitionDelay = `${delay}ms`;

    let revealed = false;
    const cleanups: Array<() => void> = [];
    const show = () => {
      if (revealed) return;
      revealed = true;
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      cleanups.forEach((fn) => fn());
      const t = setTimeout(() => {
        el.style.willChange = "";
      }, delay + 1100);
      cleanups.push(() => clearTimeout(t));
    };

    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom >= 0) show();
    };

    if (typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(check, {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px",
      });
      io.observe(el);
      cleanups.push(() => io.disconnect());
    }
    window.addEventListener("scroll", check, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", check));

    // Brief fast poll while fonts/layout settle, then a slow safety net.
    let polls = 0;
    const fast = setInterval(() => {
      check();
      if (++polls > 16) clearInterval(fast);
    }, 300);
    cleanups.push(() => clearInterval(fast));
    const slow = setInterval(check, 1200);
    cleanups.push(() => clearInterval(slow));
    check();

    return () => cleanups.forEach((fn) => fn());
  }, [kind, delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
