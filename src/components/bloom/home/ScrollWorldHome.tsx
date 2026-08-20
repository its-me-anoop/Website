"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { mountScrollWorld } from "@/lib/scroll-world/engine.js";
import { flutterlyWorld } from "@/lib/scroll-world/config";

const THEME = {
  "--sw-bg": "#EEF4F0",
  "--sw-ink": "#16332C",
  "--sw-ink-soft": "#4A645C",
  "--sw-accent": "#0E7A6B",
  "--sw-font-display": '"Archivo Variable", "Archivo", ui-sans-serif, sans-serif',
  "--sw-font-body":
    '"Atkinson Hyperlegible Next Variable", "Atkinson Hyperlegible", ui-sans-serif, sans-serif',
} as CSSProperties;

/**
 * Cinematic scroll-scrubbed homepage. Replaces the static Bloom stacking
 * layout with the portable scroll-world engine. Inner marketing routes
 * keep BloomShell.
 */
export function ScrollWorldHome() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    mountScrollWorld(el, flutterlyWorld);
    return () => {
      el.replaceChildren();
      document.getElementById("sw-css")?.remove();
    };
  }, []);

  return (
    <>
      <a
        href="#world"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-[var(--bl-pine)] focus:px-4 focus:py-2 focus:text-[var(--bl-pine-ink)]"
      >
        Skip to experience
      </a>
      <div ref={ref} id="world" className="sw-host" style={THEME} />
    </>
  );
}
