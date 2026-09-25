import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A screenshot mounted in a flat ink bezel, like a display screen on a
 * wall, with the page address along the top. The address bar contains
 * its own inline size, so a long URL truncates instead of widening a
 * grid column past the viewport.
 */
export function ScreenFrame({
  src,
  alt,
  url,
  priority,
  loading,
  className,
  sizes = "(min-width: 1024px) 760px, 92vw",
}: {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={cn("rounded-[12px] bg-wf-ink p-[6px] sm:p-2", className)}>
      <div className="flex items-center gap-3 px-2 pb-2 pt-1 [contain:inline-size] sm:pb-2.5">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="h-2 w-2 rounded-full bg-wf-sign" />
          <span className="h-2 w-2 rounded-full bg-wf-on-ink/30" />
          <span className="h-2 w-2 rounded-full bg-wf-on-ink/30" />
        </span>
        <span className="wf-mono min-w-0 truncate text-[11.5px] text-wf-on-ink-soft">{url}</span>
      </div>
      <div className="relative aspect-[1440/1000] overflow-hidden rounded-[7px] bg-wf-paper-2">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={loading}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}

/** A flat phone: an ink body, a slim bezel and the first screen of a sample site. */
export function PhoneFrame({
  src,
  alt = "",
  width = 220,
  className,
}: {
  src: string;
  alt?: string;
  width?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("rounded-[34px] bg-wf-ink p-[7px] shadow-[0_24px_50px_-24px_rgba(20,23,27,0.55)]", className)}
      style={{ width }}
    >
      <div className="relative aspect-[390/844] overflow-hidden rounded-[27px] bg-wf-paper-2">
        <Image src={src} alt={alt} fill sizes={`${width}px`} className="object-cover object-top" />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-wf-ink"
        />
      </div>
    </div>
  );
}
