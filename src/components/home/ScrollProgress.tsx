"use client";

import { useEffect, useRef } from "react";

/** Hairline gradient bar pinned to the top, scrubbed by page scroll. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 [background:linear-gradient(90deg,#8B7CFF,#3DF2C4,#FF6FCB)]"
    />
  );
}
