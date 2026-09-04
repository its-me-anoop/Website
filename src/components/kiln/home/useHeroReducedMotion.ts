"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => null;

/** Keep SSR and hydration identical; motion starts only after the
 * browser preference is known. Also responds to live preference changes. */
export function useHeroReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
