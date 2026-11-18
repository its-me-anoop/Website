import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./Frames";

/**
 * A sample site as a picture on the wall: its desktop capture pinned up
 * a couple of degrees off square, with the same site on a phone in
 * front of it. The picture straightens under the pointer (see `.shot`
 * in globals.css). `alt` describes the pair; empty makes the scene
 * decorative.
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
      style={{ "--tilt": "-2.5deg" } as CSSProperties}
    >
      <div className="shot-turn">
        <div className="shot-slab">
          <BrowserFrame src={image} alt="" url={url} priority={priority} loading={priority ? undefined : "eager"} />
        </div>
        {mobileImage ? (
          <div className="absolute bottom-[-9%] left-[-7%] hidden sm:block">
            <PhoneFrame src={mobileImage} alt="" width={132} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
