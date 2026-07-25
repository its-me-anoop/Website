"use client";

import { usePathname } from "next/navigation";
import { LazyMotion } from "framer-motion";

/**
 * Loads the Framer Motion feature set as a separate async chunk (see
 * `@/lib/motion-features`) so it stays off the initial bundle.
 */
const loadFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

/**
 * Route transition wrapper. `template.tsx` re-mounts on every navigation, so a
 * plain enter animation gives each page a soft rise.
 *
 * The entrance is a CSS keyframe, not a motion component, and that is
 * load-bearing. Framer serialises a component's `initial` state into the
 * server-rendered HTML, so animating this wrapper meant shipping
 * `<div style="opacity:0">` around the entire page and holding first paint
 * until the async motion chunk had downloaded, parsed and hydrated — on a
 * throttled connection, several seconds of blank cream. A keyframe runs off
 * the stylesheet, so the page paints immediately and animates if it can.
 *
 * The keyframe deliberately has no fill mode: once it finishes, the wrapper
 * carries no transform, so it stops being the containing block for the fixed
 * paper backdrop and the scroll-progress rail. `prefers-reduced-motion` and
 * the no-JavaScript case are both handled in the stylesheet, before paint,
 * rather than after hydration (see globals.css, "Scroll entrances").
 *
 * This is still the single `LazyMotion` provider for the app: the pointer and
 * scroll effects that remain — Tilt, Magnetic, Parallax, the progress rail —
 * all render their `m` components inside it.
 *
 * Demo routes (`/demo/…`) opt out entirely: they showcase static-first
 * builds, so they render without the wrapper and the motion feature chunk
 * never loads there.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/demo")) {
    return children;
  }

  return (
    <LazyMotion features={loadFeatures} strict>
      <div className="au-page-in">{children}</div>
    </LazyMotion>
  );
}
