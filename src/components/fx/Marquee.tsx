"use client";

import { cn } from "@/lib/utils";

/** Copies of the row laid side by side. See the note on the component. */
const COPIES = 4;

/**
 * An endless horizontal band. The row is repeated side by side and each
 * copy travels exactly its own width, so as the first clears the left
 * edge the next arrives in its place and the loop is seamless. Every
 * copy after the first is hidden from assistive tech, so the list is
 * announced once. Edges dissolve into the canvas via a mask rather than
 * a hard cut.
 *
 * Four copies, not two. The band only stays full while the content
 * remaining after a full translation still covers the container —
 * `(copies - 1) x copyWidth >= containerWidth`. These bands are
 * full-bleed, and the shortest of them (four client wordmarks) is about
 * 914px, so two copies left a growing hole on the right of any display
 * wider than ~1829px — which is to say most desktops. Three would clear
 * 1920; four clears 2560 and costs a handful of spans.
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
      {Array.from({ length: COPIES }, (_, copy) => (
        <div
          key={copy}
          {...(copy > 0 ? { "aria-hidden": true } : {})}
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
