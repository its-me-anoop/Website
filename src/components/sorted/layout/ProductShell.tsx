"use client";

import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Company chrome for product and case-study pages: the Flutterly bar
 * and footer around a page that keeps its own product palette. The
 * founder credit sits in the footer rather than the brand slot.
 */
export function ProductShell({ children, mainClassName }: { children: ReactNode; mainClassName?: string }) {
  return (
    <>
      <div className="s-chrome">
        <Nav />
      </div>
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <div className="s-chrome">
        <Footer credit={`Designed and built by ${site.founder}, founder of ${site.studio}.`} />
      </div>
    </>
  );
}
