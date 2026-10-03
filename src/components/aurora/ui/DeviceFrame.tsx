import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/*
 * Device frames for the sample-site captures. Both are plain CSS: no 3D
 * context, no blur layers and no per-frame work, so they cost nothing
 * on iOS Safari. The capture is never cropped: the iMac screen takes the
 * image's own aspect ratio, and the iPhone screen is a 390×844 box under
 * a drawn status bar.
 *
 * One `<figure role="img">` carries the description; the screenshot
 * inside is decorative. An empty `alt` makes the whole device decorative.
 */

const PHONE_SCREEN = 844 / 390;
/** Status bar, bezel and screen as fractions of the frame width. */
const PHONE = { bar: 0.15, pad: 0.036, radius: 0.17, screenRadius: 0.135 } as const;

/** Total rendered height of an iPhone frame at `width` CSS px. */
export function iphoneHeight(width: number): number {
  const screen = width - 2 * width * PHONE.pad;
  return Math.round(screen * PHONE_SCREEN + width * PHONE.bar + 2 * width * PHONE.pad);
}

function StatusBar({ width }: { width: number }) {
  const size = width * 0.05;
  return (
    <div
      data-status-bar
      aria-hidden="true"
      className="flex shrink-0 items-end justify-between bg-white font-semibold leading-none tracking-[-0.01em] text-[#111]"
      style={{
        height: width * PHONE.bar,
        padding: `0 ${width * 0.085}px ${width * 0.022}px`,
        fontSize: size,
        fontFamily: "var(--font-geist)",
      }}
    >
      <span>9:41</span>
      <span className="inline-flex items-center gap-[0.35em]">
        <svg viewBox="0 0 20 12" width="1.15em" height="0.7em" fill="currentColor">
          <rect x="0" y="8" width="3.5" height="4" rx="0.8" />
          <rect x="5.5" y="5.5" width="3.5" height="6.5" rx="0.8" />
          <rect x="11" y="3" width="3.5" height="9" rx="0.8" />
          <rect x="16.5" y="0" width="3.5" height="12" rx="0.8" />
        </svg>
        <svg viewBox="0 0 16 12" width="1em" height="0.75em" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M1.5 4.2a9.5 9.5 0 0 1 13 0M4 7a6 6 0 0 1 8 0M6.5 9.6a2.5 2.5 0 0 1 3 0" />
        </svg>
        <svg viewBox="0 0 27 12" width="1.6em" height="0.72em">
          <rect x="0.6" y="0.6" width="22" height="10.8" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
          <rect x="2.2" y="2.2" width="18.8" height="7.6" rx="1.8" fill="currentColor" />
          <path d="M24.2 4v4a2 2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

/**
 * An iPhone with a titanium-style rim, Dynamic Island, side buttons and
 * a drawn status bar above the capture. `width` sets everything else.
 */
export function IPhoneFrame({
  src,
  alt,
  width = 300,
  priority,
  float,
  className,
  style,
}: {
  src: string;
  /** Describes the screen; empty makes the device decorative. */
  alt: string;
  /** Rendered width in CSS px. */
  width?: number;
  priority?: boolean;
  /** Drift gently, like a phone held rather than placed. */
  float?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const pad = width * PHONE.pad;
  const button = (top: number, height: number, side: "left" | "right") => (
    <span
      aria-hidden
      className="absolute w-[3px] rounded-[2px] bg-[#3a302a]"
      style={{ top: width * top, height: width * height, [side]: -3 }}
    />
  );
  return (
    <figure
      {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
      className={cn("relative m-0 box-border shrink-0 bg-[#1c1715]", float && "a-float", className)}
      style={{
        width,
        height: iphoneHeight(width),
        padding: pad,
        borderRadius: width * PHONE.radius,
        boxShadow:
          "inset 0 0 0 1px #4a3f38, inset 0 0 0 3px #0a0806, inset 0 0 0 4px #2a231e, 0 50px 100px -40px rgba(0,0,0,0.9)",
        ...style,
      }}
    >
      {button(0.36, 0.1, "left")}
      {button(0.52, 0.2, "left")}
      {button(0.76, 0.2, "left")}
      {button(0.6, 0.3, "right")}
      <span
        aria-hidden
        className="absolute left-1/2 z-[2] -translate-x-1/2 rounded-full bg-black"
        style={{ top: width * 0.042, width: width * 0.3, height: width * 0.085 }}
      />
      <div
        className="flex h-full w-full flex-col overflow-hidden bg-white"
        style={{ borderRadius: width * PHONE.screenRadius }}
      >
        <StatusBar width={width} />
        <div className="relative w-full flex-1 bg-white">
          <Image src={src} alt="" fill priority={priority} sizes={`${width}px`} className="object-cover object-top" />
        </div>
      </div>
    </figure>
  );
}

/**
 * An iMac: thin silver bezel with a camera dot, a blank chin, neck and
 * foot. The screen takes the capture's aspect ratio so nothing is cut.
 */
export function IMacFrame({
  src,
  alt,
  width = 1440,
  height = 1000,
  priority,
  loading,
  sizes = "(min-width: 1024px) 760px, 92vw",
  className,
}: {
  src: string;
  /** Describes the screen; empty makes the device decorative. */
  alt: string;
  /** Intrinsic size of the capture, for the screen's aspect ratio. */
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: "eager" | "lazy";
  sizes?: string;
  className?: string;
}) {
  return (
    <figure
      {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
      className={cn("m-0 flex w-full flex-col items-center", className)}
    >
      <div className="relative w-full rounded-[16px_16px_12px_12px] border border-black/15 bg-[#e6e3dd] px-3 pt-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_50px_100px_-40px_rgba(0,0,0,0.7)]">
        <span
          aria-hidden
          className="absolute left-1/2 top-[5px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#1b1b1b] shadow-[inset_0_0_0_1px_#3a3a3a]"
        />
        <div
          data-screen
          className="relative overflow-hidden rounded-[6px] border border-[#111] bg-black"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <Image src={src} alt="" fill priority={priority} loading={loading} sizes={sizes} className="object-cover object-top" />
        </div>
        <div aria-hidden className="h-10 sm:h-14" />
      </div>
      <span aria-hidden className="h-10 w-[22%] max-w-[120px] border-x border-black/10 bg-[#d6d2cb] sm:h-16" />
      <span aria-hidden className="h-[10px] w-[44%] max-w-[240px] rounded-b-[10px] border border-t-0 border-black/15 bg-[#cdc9c1]" />
    </figure>
  );
}
