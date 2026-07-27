"use client";

import { usePathname } from "next/navigation";
import { LazyMotion, m, useReducedMotion } from "framer-motion";

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
      {reduce ? (
        children
      ) : (
        <m.div
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </m.div>
      )}
    </LazyMotion>
  );
}
