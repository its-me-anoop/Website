"use client";

import { useEffect, useState } from "react";
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
 * plain enter animation gives each page a short rise. Disabled for
 * reduced-motion users, who get the content immediately.
 *
 * The rise is a CSS animation (`.route-enter` in globals.css) rather than a
 * motion component on purpose: an animated `transform` left on this wrapper
 * as an inline style makes it the containing block for every
 * `position: fixed` descendant, so the site nav would scroll away with the
 * page. A finished CSS animation leaves no such residue.
 *
 * This is also the single `LazyMotion` provider for the app: every page (and
 * its `m` components) renders inside it.
 *
 * Demo routes (`/demo/…`) opt out entirely: they showcase static-first
 * builds, so they render without the motion wrapper — content is visible
 * before hydration and the motion feature chunk never loads there.
 *
 * In-app navigations also get the flaps: five panels in the five service
 * colours cover the new page and turn away in 3D, one after another, like a
 * departure board. They never play on the first load (the server render and
 * hydration always omit them), so they cannot delay first paint, and CSS
 * removes them for reduced motion.
 */

const FLAPS = ["bg-s-cobalt", "bg-s-flame", "bg-s-sun", "bg-s-jade", "bg-s-pink"] as const;

/**
 * Client-only: flips once the first page has committed. It is written in an
 * effect, never during render: React can throw away and restart a render
 * (an interrupted hydration does), and a flag set by the first attempt
 * would make the retry render flaps the server never sent.
 */
let hasMounted = false;
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [flaps] = useState(() => typeof window !== "undefined" && hasMounted);
  useEffect(() => {
    hasMounted = true;
  }, []);

  if (pathname?.startsWith("/demo")) {
    return children;
  }

  return (
    <LazyMotion features={loadFeatures} strict>
      {/* Keep the SSR tree stable; CSS disables the reveal for reduced motion. */}
      <div className="route-enter">{children}</div>
      {flaps ? (
        <div aria-hidden="true" className="route-flaps">
          {FLAPS.map((colour, i) => (
            <span key={colour} className={colour} style={{ ["--i" as string]: i }} />
          ))}
        </div>
      ) : null}
    </LazyMotion>
  );
}
