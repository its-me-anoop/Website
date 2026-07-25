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
 * The workhorse surface of the Aurum system: card stock. An opaque
 * warm fill, a cocoa hairline, a lit top lip and a soft warm shadow.
 * Hover lifts it three pixels and tints both the edge and the shadow
 * with whatever accent the card set on `--au-brand`.
 *
 * Every value comes from a token, so dropping the same plate inside a
 * `.au-night` band inverts it with no variant class.
 */
export function Plate({
  children,
  className,
  as: Tag = "div",
  interactive = true,
  strong = false,
  brand,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
  /** Adds the pointer spotlight and the hover lift. */
  interactive?: boolean;
  /** Heavier edge and shadow, for hero and featured cards. */
  strong?: boolean;
  /** The accent this card tints its hover glow and spotlight with. */
  brand?: string;
}) {
  const onPointerMove = useSpotlight();

  return (
    <Tag
      {...(interactive ? { onPointerMove } : {})}
      {...(brand
        ? { style: { ["--au-brand" as string]: brand } }
        : {})}
      className={cn(
        "group relative overflow-hidden rounded-[var(--r-xl)]",
        strong ? "au-plate-strong" : "au-plate",
        interactive && "au-spot au-lift",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * A plate crowned by the three-colour rule — reserved for the one
 * featured item on a page (the popular package, the closing call to
 * action). The rule is a decorative sibling layer, so it never
 * affects layout.
 */
export function RuleCard({
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
    <div
      className={cn(
        "au-plate-strong relative overflow-hidden rounded-[var(--r-2xl)]",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[4px] bg-[image:var(--au-rule)]"
      />
      <div
        onPointerMove={onPointerMove}
        className={cn("au-spot relative", innerClassName)}
      >
        {children}
      </div>
    </div>
  );
}
