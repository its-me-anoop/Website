"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * Tracks the pointer inside an element and writes its position to the
 * `--mx` / `--my` custom properties, which `.au-spot` reads to paint a
 * radial highlight. Written straight to the style attribute — no state,
 * so pointer movement never triggers a React render.
 */
export function useSpotlight() {
  return useCallback((event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    target.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);
}

/**
 * The workhorse surface of the Aurora system: a frosted pane with a
 * gradient hairline, an inner top highlight and a spotlight that
 * follows the pointer. Hover lifts it a hair and warms the edge.
 */
export function GlassCard({
  children,
  className,
  as: Tag = "div",
  interactive = true,
  strong = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
  /** Adds the pointer spotlight and hover lift. */
  interactive?: boolean;
  /** Brighter fill, for hero and featured cards. */
  strong?: boolean;
}) {
  const onPointerMove = useSpotlight();

  return (
    <Tag
      {...(interactive ? { onPointerMove } : {})}
      className={cn(
        "group relative overflow-hidden rounded-[26px]",
        strong ? "au-glass-strong" : "au-glass",
        interactive &&
          "au-spot transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-white/20",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * A card wrapped in a slowly rotating conic beam — reserved for the one
 * featured item on a page (the popular package, the primary CTA card).
 * The beam is a decorative sibling layer, so it never affects layout.
 */
export function BeamCard({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  const onPointerMove = useSpotlight();

  return (
    <div className={cn("relative rounded-[28px] p-px", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
      >
        <div className="animate-spin-slow absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0%,rgba(47,216,173,0.9)_12%,rgba(92,178,255,0.7)_22%,transparent_38%,transparent_100%)] opacity-70" />
      </div>
      <div
        onPointerMove={onPointerMove}
        className={cn(
          "au-spot relative overflow-hidden rounded-[27px] bg-[#08131a]/92 backdrop-blur-xl",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
