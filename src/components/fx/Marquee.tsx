"use client";

import { cn } from "@/lib/utils";

/**
 * An endless horizontal band. The row is rendered twice and translated
 * by exactly -50%, so the loop is seamless; the duplicate is hidden from
 * assistive tech to avoid reading the list twice. Edges dissolve into
 * the canvas via a mask rather than a hard cut.
 */
export function Marquee({
  children,
  duration = 44,
  reverse = false,
  className,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  /** Seconds for one full pass. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("au-edge-mask group relative flex overflow-hidden", className)}
    >
      {[false, true].map((clone) => (
        <div
          key={String(clone)}
          {...(clone ? { "aria-hidden": true } : {})}
          className={cn(
            "animate-marquee flex shrink-0 items-center will-change-transform",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{
            ["--marquee-duration" as string]: `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
