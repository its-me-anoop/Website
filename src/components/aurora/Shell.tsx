"use client";

import { AuroraBackdrop, ScrollProgress } from "@/components/fx";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Shared chrome for every Flutterly-branded page.
 *
 * The backdrop is mounted once, `fixed`, behind everything — so every
 * section scrolls through one continuous field of light instead of
 * carrying its own background. `.aurora-root` scopes the design
 * language, keeping it out of the two demo client sites.
 */
export function Shell({
  children,
  intensity = "full",
}: {
  children: React.ReactNode;
  intensity?: "full" | "calm";
}) {
  return (
    <div className="aurora-root relative min-h-screen overflow-x-clip">
      <AuroraBackdrop intensity={intensity} />
      <ScrollProgress />
      <div className="relative z-10">
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
