"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealTag = "div" | "li" | "section" | "article" | "figure";

/**
 * Rises into place the first time it scrolls into view.
 *
 * Content is never hidden by the server render: an element only waits
 * (`data-reveal="wait"`) when, after hydration, it starts below the fold
 * and motion is allowed. Anything already on screen, any visitor who
 * prefers reduced motion and anyone without JavaScript sees it at once.
 * The attribute is set on the DOM node directly, so React never
 * re-renders for it.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
  id,
}: {
  as?: RevealTag;
  /** Stagger, in milliseconds. */
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || typeof window.matchMedia !== "function") return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "wait";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.dataset.reveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  const style = delay ? ({ ["--reveal-delay" as string]: `${delay}ms` } as CSSProperties) : undefined;
  return (
    <Tag
      id={id}
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
