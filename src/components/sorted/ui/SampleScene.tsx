import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./Frames";

/**
 * A sample site as an object: its desktop capture on a slab turned in
 * 3D, with the same site on a phone standing in front of it. The slab
 * squares up under the pointer (see `.shot` in globals.css). `alt`
 * describes the pair; empty makes the scene decorative.
 */
export function SampleScene({
  image,
  mobileImage,
  url,
  alt = "",
  priority,
  className,
}: {
  image: string;
  mobileImage?: string;
  url?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
      data-scene="sample"
      className={cn("shot relative pr-[5%]", mobileImage && "pb-8 pl-6 sm:pl-12", className)}
      style={{ "--turn-y": "-13deg" } as CSSProperties}
    >
      <div className="shot-turn">
        <div className="slab shot-slab" style={{ "--edge": "#d6d5ca", "--edge-2": "#9b9a8e" } as CSSProperties}>
          <BrowserFrame src={image} alt="" url={url} priority={priority} loading={priority ? undefined : "eager"} />
        </div>
        {mobileImage ? (
          <div className="absolute bottom-[-9%] left-[-7%] hidden sm:block" style={{ transform: "translateZ(70px)" }}>
            <PhoneFrame src={mobileImage} alt="" width={132} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
