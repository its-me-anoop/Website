"use client";

import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Shared chrome for every Sorted marketing page: the bar, the page and
 * the footer. `.s-root` scopes the language so case-study pages and
 * demo sites are untouched. The bar is fixed and 64px tall, so the page
 * starts below it.
 */
export function Shell({ children, mainClassName }: { children: ReactNode; mainClassName?: string }) {
  return (
    <div className="s-root min-h-screen overflow-x-clip">
      <Nav />
      <main id="main" className={mainClassName ? `pt-16 ${mainClassName}` : "pt-16"}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
