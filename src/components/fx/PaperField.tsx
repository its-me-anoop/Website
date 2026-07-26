"use client";

import { cn } from "@/lib/utils";

/**
 * The living ground every Aurum page shares.
 *
 * Four decorative layers, all `aria-hidden` and pointer-transparent:
 *
 *   1. the cream base, warmest at the top of the page
 *   2. two blurred colour washes — amber high-left, rose and teal
 *      below — drifting on long, offset loops
 *   3. an engineering grid, radially masked to a whisper
 *   4. paper tooth, blended multiply, to kill gradient banding
 *
 * Rendered `fixed` at the shell level so sections scroll *through* the
 * light rather than each carrying its own background. The night bands
 * that sit on top are opaque, so they simply cover it. Under
 * `prefers-reduced-motion` the CSS drift animations collapse (see
 * globals.css) and the same composition renders perfectly still.
 */
export function PaperField({
  className,
  intensity = "full",
}: {
  className?: string;
  /** `calm` dims the washes for content-dense inner pages. */
  intensity?: "full" | "calm";
}) {
  const dim = intensity === "calm";

  return (
    <div
      aria-hidden
      className={cn(
        "au-grain pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className
      )}
    >
      {/* 1 — base */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffaf0_0%,#fdf6ec_42%,#faeedf_100%)]" />

      {/* 2 — drifting washes.
          No `filter: blur()` here, deliberately. These are two layers
          larger than the viewport, sitting `fixed` behind a page that
          scrolls through them, so a runtime blur has to be re-composited
          on every scroll frame and never gets cached. Measured on the
          homepage it was the single most expensive thing on the site by
          a distance: median frame 65ms with it, 10ms without, and 68% of
          frames over 32ms versus none. The softness is baked into the
          gradient stops in `.au-wash` instead — a blurred radial
          gradient is just a wider radial gradient, and this one costs
          nothing to paint. */}
      <div
        className={cn(
          "au-wash au-drift-a absolute -inset-[18%] will-change-transform",
          dim ? "opacity-45" : "opacity-90"
        )}
      />
      <div
        className={cn(
          "au-wash au-wash-b au-drift-b absolute -inset-[26%] will-change-transform",
          dim ? "opacity-30" : "opacity-55"
        )}
        style={{ animationDelay: "-16s" }}
      />

      {/* 3 — grid */}
      <div className={cn("au-grid absolute inset-0", dim && "opacity-60")} />

      {/* 4 — edge vignette, warm rather than black */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_38%,transparent_46%,rgba(82,50,42,0.07)_100%)]" />
    </div>
  );
}
