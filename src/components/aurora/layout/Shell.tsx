"use client";

import type { ReactNode } from "react";
import { Cursor } from "../effects/Cursor";
import { ScrollProgress } from "../effects/Motion";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Shared chrome for every Aurora marketing page: scroll progress,
 * the pointer effects, the nav, the page and the footer. `.aurora-root` scopes the
 * language so case-study pages and demo sites are untouched.
 */
export function Shell({ children, mainClassName }: { children: ReactNode; mainClassName?: string }) {
  return (
    <div className="aurora-root min-h-screen overflow-x-clip">
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
