"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  /** Seconds for one full loop. Higher = slower. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Seamless, CSS-driven horizontal marquee. The content is duplicated so the
 * loop is continuous; edges are softened with `.edge-mask`. The animation is
 * paused automatically under `prefers-reduced-motion` (see globals.css).
 */
export function Marquee({
  children,
  duration = 48,
  reverse = false,
  className,
}: MarqueeProps) {
  return (
    <div className={cn("edge-mask relative overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee gap-3 will-change-transform"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 gap-3" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 gap-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
