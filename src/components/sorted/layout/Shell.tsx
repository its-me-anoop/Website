"use client";

import type { ReactNode } from "react";
import { DotTrail } from "../effects/DotTrail";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Shared chrome for every Rooms marketing page: the floating bar, the
 * page and the footer. `.s-root` scopes the language so case-study
 * pages and demo sites are untouched. The bar is a row of pills that
 * floats over the first room, so a page's opening section runs to the
 * top of the window and leaves room for it (`pt-28` or more). The
 * travelling dot (effects/DotTrail) is carried over all of it.
 */
export function Shell({ children, mainClassName }: { children: ReactNode; mainClassName?: string }) {
  return (
    <div className="s-root min-h-screen overflow-x-clip">
      <Nav />
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <Footer />
      <DotTrail />
    </div>
  );
}
