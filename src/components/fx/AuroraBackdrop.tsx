"use client";

import { cn } from "@/lib/utils";

/**
 * The living backdrop every Aurora page shares.
 *
 * Five decorative layers, all `aria-hidden` and pointer-transparent:
 *
 *   1. a deep vertical wash so the fold is darkest at the top
 *   2. two blurred aurora fields drifting on long, offset loops
 *   3. an engineering grid, radially masked to a whisper
 *   4. a horizon glow anchoring the bottom of the viewport
 *   5. film grain, blended soft-light, to kill gradient banding
 *
 * Rendered `fixed` at the shell level so sections scroll *through* the
 * light rather than each carrying its own background. Under
 * `prefers-reduced-motion` the CSS drift animations collapse (see
 * globals.css) and the same composition renders perfectly still.
 */
export function AuroraBackdrop({
  className,
  intensity = "full",
}: {
  className?: string;
  /** `calm` dims the fields for content-dense inner pages. */
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
      {/* 1 — base wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#04090c_0%,#060d11_38%,#071317_72%,#04090c_100%)]" />

      {/* 2 — drifting aurora fields */}
      <div
        className={cn(
          "au-mesh au-drift-a absolute -inset-[22%] will-change-transform",
          dim ? "opacity-40" : "opacity-70"
        )}
      />
      <div
        className={cn(
          "au-mesh au-drift-b absolute -inset-[28%] will-change-transform",
          dim ? "opacity-25" : "opacity-45"
        )}
        style={{ animationDelay: "-14s" }}
      />

      {/* 3 — grid */}
      <div className={cn("au-grid absolute inset-0", dim && "opacity-60")} />

      {/* 4 — horizon */}
      <div
        className={cn(
          "au-horizon absolute inset-x-0 bottom-0 h-[46vh]",
          dim ? "opacity-40" : "opacity-70"
        )}
      />

      {/* 5 — vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_40%,transparent_38%,rgba(3,7,10,0.72)_100%)]" />
    </div>
  );
}
