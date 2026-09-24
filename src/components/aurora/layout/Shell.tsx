"use client";

import type { ReactNode } from "react";
import { CursorGlow, SpotlightTracker } from "../effects/Pointer";
import { ScrollProgress } from "../effects/Motion";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Shared chrome for every Aurora marketing page: scroll progress,
 * floating nav, the page, the footer, and the page-wide effects
 * (film grain, cursor light, card spotlights). `.aurora-root` scopes
 * the language so case-study pages and demo sites are untouched.
 */
export function Shell({ children, mainClassName }: { children: ReactNode; mainClassName?: string }) {
  return (
    <div className="aurora-root min-h-screen overflow-x-clip">
      <ScrollProgress />
      <Nav />
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <Footer />
      <div aria-hidden className="a-grain" />
      <CursorGlow />
      <SpotlightTracker />
    </div>
  );
}
