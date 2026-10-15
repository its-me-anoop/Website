"use client";

import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Company chrome for product and case-study pages: the Flutterly nav and
 * footer around a page that keeps its own product palette. The nav stays
 * solid because these pages open on light canvases, and the founder
 * credit sits in the footer rather than the brand slot.
 */
export function ProductShell({ children, mainClassName }: { children: ReactNode; mainClassName?: string }) {
  return (
    <>
      <div className="aurora-chrome">
        <Nav solid />
      </div>
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <div className="aurora-chrome">
        <Footer credit={`Designed and built by ${site.founder}, founder of ${site.studio}.`} />
      </div>
    </>
  );
}
