"use client";

import { useState } from "react";
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
 *
 * In-app navigations also get a curtain: a dark panel and an amber panel
 * lift away in turn to reveal the new page. It never plays on the first
 * load (the server render and hydration always omit it), so it cannot
 * delay first paint, and CSS removes it for reduced motion.
 */

/** Client-only: flips once the first page has mounted. */
let hasMounted = false;
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [curtain] = useState(() => {
    if (typeof window === "undefined") return false;
    const show = hasMounted;
    hasMounted = true;
    return show;
  });

  if (pathname?.startsWith("/demo")) {
    return children;
  }

  return (
    <LazyMotion features={loadFeatures} strict>
      {/* Keep the SSR tree stable; CSS disables the reveal for reduced motion. */}
      <div className="route-enter">{children}</div>
      {curtain ? (
        <div aria-hidden="true" className="route-curtain">
          <span />
          <span />
        </div>
      ) : null}
    </LazyMotion>
  );
}
