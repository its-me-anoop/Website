"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-screen brand wipe on first paint: holds for 850ms, slides up
 * over 1s, then unmounts. Skipped for reduced motion; a <noscript>
 * rule keeps it from trapping no-JS visitors.
 */
export function IntroWipe() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No wipe for reduced motion — drop the overlay on the spot.
      if (el) el.style.display = "none";
      return;
    }
    const t1 = setTimeout(() => {
      if (el) el.style.transform = "translateY(-100%)";
    }, 850);
    const t2 = setTimeout(() => setGone(true), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <>
      <noscript>
        <style>{`[data-intro-wipe]{display:none}`}</style>
      </noscript>
      <div
        ref={ref}
        data-intro-wipe
        aria-hidden
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3.5 bg-obsidian transition-transform duration-1000 ease-[cubic-bezier(.76,0,.24,1)]"
      >
        <div className="font-syne text-[34px] font-extrabold tracking-[-1px] text-frost">
          Flutterly<span className="text-mint">*</span>
        </div>
        <div className="font-jb text-[11px] uppercase tracking-[0.3em] text-frost/40">
          Product studio — Reading, UK
        </div>
      </div>
    </>
  );
}
