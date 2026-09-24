"use client";

import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Shared chrome for every Signal marketing page. `.signal-root` scopes
 * the language so case-study pages and demo sites are untouched.
 */
export function Shell({ children, mainClassName }: { children: ReactNode; mainClassName?: string }) {
  return (
    <div className="signal-root min-h-screen overflow-x-clip">
      <Nav />
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
