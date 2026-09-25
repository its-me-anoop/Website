import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

/**
 * Shared chrome for every Wayfinder marketing page: the sticky sign-bar
 * nav, the page, and the footer. `.wayfinder-root` scopes the language
 * so case-study pages and demo sites are untouched.
 */
export function Shell({ children, mainClassName }: { children: ReactNode; mainClassName?: string }) {
  return (
    <div className="wayfinder-root min-h-screen overflow-x-clip">
      <Nav />
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
