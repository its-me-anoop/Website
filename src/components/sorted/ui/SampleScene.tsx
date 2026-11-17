import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./Frames";

/** A legible pair of desktop and mobile captures from the working sample. */
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
      className={cn("inner-sample", mobileImage && "inner-sample-with-phone", className)}
    >
      <BrowserFrame src={image} alt="" url={url} priority={priority} />
      {mobileImage && (
        <div className="inner-sample-phone">
          <PhoneFrame src={mobileImage} alt="" width={112} priority={priority} />
        </div>
      )}
    </div>
  );
}
