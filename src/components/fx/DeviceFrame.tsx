"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Device frames.

   A screenshot floating in a rounded rectangle reads as "an image".
   The same screenshot inside a laptop reads as "a website someone
   is looking at" — which is the whole claim this site is making, so
   the work is shown on hardware.

   Both frames are drawn in CSS: no device mock-up PNGs to ship, no
   fixed raster width, and the aluminium re-tints with the ground it
   is dropped on. Every part of the chassis is decorative, so the
   whole shell is `aria-hidden` except the screenshot itself, which
   keeps its alt text.
   ───────────────────────────────────────────────────────────── */

type Shot = {
  src: string;
  /** Empty string marks the shot as decorative (a second, background device). */
  alt: string;
  /** Painted under the image while it loads, so no white flash on cream. */
  tint?: string;
  priority?: boolean;
  sizes?: string;
};

/* The two aluminium ramps. `light` is the natural silver against the
   cream page; `dark` is space grey, for the night bands. */
const shells = {
  light: {
    bezel: "bg-[#e6e0d8]",
    bezelEdge: "ring-[#cfc5b8]",
    screenSurround: "bg-[#1c1416]",
    base: "bg-[linear-gradient(180deg,#e6e0d8,#cbc1b4)]",
    baseEdge: "border-[#bdb2a3]",
    notch: "bg-[#1c1416]",
    foot: "bg-[#b9ad9e]",
    stand: "bg-[linear-gradient(180deg,#ded7cd,#c3b9ab)]",
    chin: "bg-[linear-gradient(180deg,#eae4dc,#d8d0c4)]",
    lip: "shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]",
  },
  dark: {
    bezel: "bg-[#3a2f31]",
    bezelEdge: "ring-[#4b3d40]",
    screenSurround: "bg-[#0d0709]",
    base: "bg-[linear-gradient(180deg,#3f3335,#241a1c)]",
    baseEdge: "border-[#4b3d40]",
    notch: "bg-[#0d0709]",
    foot: "bg-[#241a1c]",
    stand: "bg-[linear-gradient(180deg,#3a2f31,#261c1e)]",
    chin: "bg-[linear-gradient(180deg,#413436,#2c2124)]",
    lip: "shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]",
  },
} as const;

type Shell = keyof typeof shells;

function Screen({
  shot,
  className,
}: {
  shot: Shot;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-au-paper-3", className)}>
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={shot.sizes ?? "(max-width: 1024px) 92vw, 640px"}
        priority={shot.priority}
        className="object-cover object-top"
        style={shot.tint ? { backgroundColor: shot.tint } : undefined}
      />
      {/* The glass: a diagonal sheen and a darkening at the edges, both
          faint enough that the screenshot still reads at a glance. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_28%,transparent_52%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_58%,rgba(20,8,10,0.14)_100%)]"
      />
    </div>
  );
}

/**
 * A MacBook, open, seen straight on: lid, camera notch, hinge, and the
 * tapered base with its two feet.
 *
 * The screen keeps the 16:10 ratio of the real thing, which is also the
 * ratio every site screenshot on this site is captured at.
 */
export function MacBook({
  shot,
  shell = "light",
  className,
}: {
  shot: Shot;
  shell?: Shell;
  className?: string;
}) {
  const s = shells[shell];

  return (
    <figure className={cn("relative", className)}>
      {/* Lid */}
      <div
        className={cn(
          "relative rounded-[calc(var(--r-md)+4px)] p-[1.6%] ring-1 ring-inset",
          s.bezel,
          s.bezelEdge,
          s.lip
        )}
      >
        <div className={cn("relative rounded-[var(--r-xs)] p-[1.1%]", s.screenSurround)}>
          {/* Camera notch — the detail that reads "MacBook" instantly. */}
          <span
            aria-hidden
            className={cn(
              "absolute left-1/2 top-0 z-10 h-[2.6%] w-[16%] -translate-x-1/2 rounded-b-[6px]",
              s.notch
            )}
          />
          <Screen shot={shot} className="aspect-[16/10] rounded-[3px]" />
        </div>
      </div>

      {/* The base, seen edge-on: a shallow lip a little wider than the
          lid, with the finger recess notched out of the front. */}
      <div aria-hidden className="relative mx-[-2.6%]">
        <div
          className={cn(
            "relative h-[9px] rounded-b-[5px] border-x border-b sm:h-[11px]",
            s.base,
            s.baseEdge,
            s.lip
          )}
        >
          <span
            className={cn(
              "absolute left-1/2 top-0 h-[3px] w-[13%] -translate-x-1/2 rounded-b-[999px]",
              s.foot
            )}
          />
        </div>
      </div>

      {/* Contact shadow on the desk. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[4%] -bottom-[3%] h-[6%] rounded-[50%] bg-[rgba(20,8,10,0.28)] blur-xl"
      />
    </figure>
  );
}

/**
 * An iMac: a thin display with the chin below it, on the aluminium
 * stand. Deliberately squarer than the MacBook so the two read as
 * different machines when they sit together.
 */
export function IMac({
  shot,
  shell = "light",
  className,
}: {
  shot: Shot;
  shell?: Shell;
  className?: string;
}) {
  const s = shells[shell];

  return (
    <figure className={cn("relative", className)}>
      <div
        className={cn(
          "relative rounded-[calc(var(--r-sm)+2px)] ring-1 ring-inset",
          s.bezel,
          s.bezelEdge,
          s.lip
        )}
      >
        <div className={cn("m-[1.4%] rounded-[var(--r-xs)] p-[1%]", s.screenSurround)}>
          <Screen shot={shot} className="aspect-[16/10] rounded-[3px]" />
        </div>
        {/* The chin, with the Apple-less logo space left blank — this is
            a generic machine, not a branded one. */}
        <div
          className={cn(
            "flex h-[30px] items-center justify-center rounded-b-[calc(var(--r-sm)+2px)] sm:h-[38px]",
            s.chin
          )}
        >
          <span
            aria-hidden
            className={cn("h-[3px] w-[46px] rounded-full opacity-40", s.foot)}
          />
        </div>
      </div>

      {/* Stand: neck then foot. */}
      <div aria-hidden className="relative flex flex-col items-center">
        <div className={cn("h-[26px] w-[17%] sm:h-[34px]", s.stand)} />
        <div
          className={cn("h-[7px] w-[36%] rounded-[999px] sm:h-[8px]", s.foot, s.lip)}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] -bottom-[2%] h-[6%] rounded-[50%] bg-[rgba(20,8,10,0.3)] blur-xl"
      />
    </figure>
  );
}

/**
 * A phone, used where a mobile screenshot tells the story better than a
 * desktop one — the sector pages lead on "patients arrive on an old
 * phone", so the claim deserves the matching hardware.
 */
export function Phone({
  shot,
  shell = "dark",
  className,
}: {
  shot: Shot;
  shell?: Shell;
  className?: string;
}) {
  const s = shells[shell];

  return (
    <figure className={cn("relative", className)}>
      <div
        className={cn(
          "relative rounded-[16%/8%] p-[3.2%] ring-1 ring-inset",
          s.bezel,
          s.bezelEdge,
          s.lip
        )}
      >
        <div className={cn("relative rounded-[13%/6.6%] p-[1.6%]", s.screenSurround)}>
          <span
            aria-hidden
            className={cn(
              "absolute left-1/2 top-[2.2%] z-10 h-[2.4%] w-[30%] -translate-x-1/2 rounded-full",
              s.notch
            )}
          />
          <Screen shot={shot} className="aspect-[9/19.5] rounded-[11%/5.4%]" />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] -bottom-[2%] h-[5%] rounded-[50%] bg-[rgba(20,8,10,0.3)] blur-lg"
      />
    </figure>
  );
}
