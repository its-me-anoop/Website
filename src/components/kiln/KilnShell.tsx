"use client";

import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Shared chrome for every Kiln marketing page: floating nav pill on
 * top, coal footer below, `.kiln-root` scoping the design language so
 * Porcelain case-study pages and the demo sites stay untouched.
 */
export function KilnShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="kiln-root min-h-screen bg-k-bone text-k-ink">
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
