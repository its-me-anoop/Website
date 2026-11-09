import Image from "next/image";
import { cn } from "@/lib/utils";

/*
 * Frames for captures of real sites. Both are drawn flat: a window bar
 * and a rule, nothing photographic. On their own they create no 3D
 * context; the scenes that turn them (`.shot`, the sample-site stage)
 * wrap them in a slab. The capture is never cropped sideways: the
 * browser screen takes the image's own aspect ratio and the phone
 * screen is a 390×844 box.
 *
 * One `<figure role="img">` carries the description; the screenshot
 * inside is decorative. An empty `alt` makes the whole frame decorative.
 */

const PHONE_SCREEN = 844 / 390;

/** Rendered height of a phone frame at `width` CSS px. */
export function phoneHeight(width: number): number {
  const bezel = Math.round(width * 0.045);
  return Math.round((width - bezel * 2) * PHONE_SCREEN + bezel * 2);
}

/** A browser window: three marks, the address, and the capture. */
export function BrowserFrame({
  src,
  alt,
  url,
  width = 1440,
  height = 1000,
  priority,
  loading,
  sizes = "(min-width: 1024px) 760px, 92vw",
  className,
}: {
  src: string;
  /** Describes the screen; empty makes the frame decorative. */
  alt: string;
  /** Address shown in the bar. */
  url?: string;
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
      className={cn("m-0 w-full min-w-0 overflow-hidden rounded-[10px] border-2 border-s-navy bg-white", className)}
    >
      <div data-browser-bar aria-hidden="true" className="flex h-8 min-w-0 items-center gap-1.5 overflow-hidden border-b-2 border-s-navy bg-s-chalk px-3">
        <span className="h-2.5 w-2.5 rounded-[2px] bg-s-flame" />
        <span className="h-2.5 w-2.5 rounded-[2px] bg-s-sun" />
        <span className="h-2.5 w-2.5 rounded-[2px] bg-s-jade" />
        {url ? (
          <span className="s-label ml-2 min-w-0 truncate text-[11.5px] normal-case tracking-[0.02em] text-[#343a5a]">{url}</span>
        ) : null}
      </div>
      <div data-screen className="relative bg-s-chalk-2" style={{ aspectRatio: `${width} / ${height}` }}>
        <Image src={src} alt="" fill priority={priority} loading={loading} sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}

/** A phone: a navy body, a speaker slot, and the first screen of the site. */
export function PhoneFrame({
  src,
  alt,
  width = 220,
  priority,
  className,
}: {
  src: string;
  /** Describes the screen; empty makes the frame decorative. */
  alt: string;
  /** Rendered width in CSS px. */
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  const bezel = Math.round(width * 0.045);
  return (
    <figure
      {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
      className={cn("relative m-0 box-border shrink-0 bg-s-navy", className)}
      style={{ width, height: phoneHeight(width), padding: bezel, borderRadius: width * 0.13 }}
    >
      <span
        aria-hidden
        className="absolute left-1/2 z-[2] -translate-x-1/2 rounded-full bg-s-navy"
        style={{ top: bezel + width * 0.03, width: width * 0.26, height: width * 0.06 }}
      />
      <div data-screen className="relative h-full w-full overflow-hidden bg-white" style={{ borderRadius: width * 0.09 }}>
        <Image src={src} alt="" fill priority={priority} sizes={`${width}px`} className="object-cover object-top" />
      </div>
    </figure>
  );
}
