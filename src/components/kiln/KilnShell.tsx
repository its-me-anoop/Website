"use client";

import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Shared chrome for every Kiln marketing page: floating nav pill on
 * top, coal footer below, `.kiln-root` scoping the design language so
 * Porcelain case-study pages and the demo sites stay untouched.
 */
export function KilnShell({ children, mainClassName }: { children: React.ReactNode; mainClassName?: string }) {
  return (
    <div className="kiln-root min-h-screen bg-k-bone text-k-ink">
      <Nav />
      <main id="main" className={mainClassName}>{children}</main>
      <Footer />
    </div>
  );
}
