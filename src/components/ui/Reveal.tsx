"use client";

import { Reveal as FxReveal } from "@/components/fx";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  /**
   * Kept for the case-study call sites that still name a direction.
   * Everything now rises; a sideways entrance read as drift rather than
   * as arrival, and mixing the two down one page was noise.
   */
  direction?: Direction;
  /** Seconds of delay before the reveal begins. */
  delay?: number;
  /** Distance travelled, in px. */
  distance?: number;
  className?: string;
  /** Render as a different element (e.g. "li", "span"). */
  as?: "div" | "li" | "span" | "section";
}

/**
 * Scroll entrance for the two case-study pages.
 *
 * A thin adapter over the shared entrance in `@/components/fx`, which is
 * driven by a stylesheet rather than by a motion component. The version
 * this replaced set `opacity: 0` in its `initial` prop, and Framer
 * serialises that into the server-rendered HTML — so both case studies
 * shipped their content invisible and stayed that way until the async
 * motion chunk arrived. Now the markup is visible as served and the
 * animation is added on top where it can run.
 *
 * The old `blur` option is gone with it: an animated blur is the most
 * expensive thing to composite while scrolling, and it softened type
 * that should read as crisp.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 28,
  className,
  as = "div",
}: RevealProps) {
  return (
    <FxReveal delay={delay} y={distance} className={className} as={as}>
      {children}
    </FxReveal>
  );
}
