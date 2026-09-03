"use client";

import { usePathname } from "next/navigation";
import { LazyMotion, useReducedMotion } from "framer-motion";

/**
 * Loads the Framer Motion feature set as a separate async chunk (see
 * `@/lib/motion-features`) so it stays off the initial bundle.
 */
const loadFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

/**
 * Route transition wrapper. `template.tsx` re-mounts on every navigation, so a
 * plain enter animation gives each page a soft blur-and-rise reveal. Disabled
 * for reduced-motion users, who get the content immediately.
 *
 * The reveal is a CSS animation (`.route-enter` in globals.css) rather than a
 * motion component on purpose: an animated `filter`/`transform` left on this
 * wrapper as an inline style — even `blur(0px)` — makes it the containing
 * block for every `position: fixed` descendant, so the site nav would scroll
 * away with the page. A finished CSS animation leaves no such residue.
 *
 * This is also the single `LazyMotion` provider for the app: every page (and
 * its `m` components) renders inside it.
 *
 * Demo routes (`/demo/…`) opt out entirely: they showcase static-first
 * builds, so they render without the motion wrapper — content is visible
 * before hydration and the motion feature chunk never loads there.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();

  if (pathname?.startsWith("/demo")) {
    return children;
  }

  return (
    <LazyMotion features={loadFeatures} strict>
      {reduce ? children : <div className="route-enter">{children}</div>}
    </LazyMotion>
  );
}
