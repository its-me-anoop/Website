"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const DESKTOP_WIDTH = 1280;

/**
 * A real, working sample site in a frame, rendered at desktop width and
 * scaled to fit. The screenshot shows until the page has loaded. Only
 * one is mounted at a time, and only when it scrolls near the viewport.
 */
export function LiveSite({
  href,
  title,
  poster,
  className,
}: {
  href: string;
  title: string;
  poster: string;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / DESKTOP_WIDTH));
    ro.observe(box);
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), {
      rootMargin: "400px 0px",
    });
    io.observe(box);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className={cn("relative aspect-[1280/860] overflow-hidden rounded-[4px] border border-s-line bg-white", className)}
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 820px, 92vw"
        className={cn("object-cover object-top transition-opacity duration-500", loaded && "opacity-0")}
      />
      {near ? (
        <iframe
          src={href}
          title={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="absolute left-0 top-0 origin-top-left border-0"
          style={{
            width: DESKTOP_WIDTH,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
          }}
        />
      ) : null}
    </div>
  );
}
