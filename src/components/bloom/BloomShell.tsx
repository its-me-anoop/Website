"use client";

import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Shared chrome for every Bloom marketing page — sticky nav on top,
 * pine footer below, `.bloom-root` scoping the design language so
 * Porcelain case-study pages stay untouched.
 */
export function BloomShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bloom-root min-h-screen bg-bl-canvas text-bl-ink">
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
