"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

/** Live media-query match; false during SSR and in environments without matchMedia. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) =>
      typeof window !== "undefined" && typeof window.matchMedia === "function" ? subscribeMedia(query)(onChange) : () => {},
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => (typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(query).matches : false),
    () => false
  );
}

/**
 * Whether decorative motion may run. Reduced-motion users get the
 * still version. The server render and the hydration pass both read
 * false, so markup always matches; motion arms right after hydration.
 */
export function useMotionAllowed() {
  return useMediaQuery("(prefers-reduced-motion: no-preference)");
}
