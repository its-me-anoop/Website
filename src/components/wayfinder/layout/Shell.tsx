import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

/**
 * Shared chrome for every Wayfinder marketing page: the sticky sign-bar
 * nav, the page, and the footer. `.wayfinder-root` scopes the language
 * so case-study pages and demo sites are untouched.
 *
 * The root deliberately clips no overflow. iOS Safari only moves a
 * sticky header on its fast scrolling path when no ancestor clips
 * overflow; with one, the header is repositioned on the main thread and
 * jitters while the page scrolls. The layout is built not to overflow
 * sideways instead (checked by the browser workflow at every route).
 */
export function Shell({ children, mainClassName }: { children: ReactNode; mainClassName?: string }) {
  return (
    <div className="wayfinder-root min-h-screen">
      <Nav />
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
