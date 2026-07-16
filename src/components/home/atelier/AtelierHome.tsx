"use client";

import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Trusted } from "./Trusted";
import { Showcase } from "./Showcase";
import { Statement } from "./Statement";
import { WorkCarousel } from "./WorkCarousel";
import { Vision } from "./Vision";
import { Stories } from "./Stories";
import { Community } from "./Community";
import { Ticker } from "./Ticker";
import { SplitCta } from "./SplitCta";
import { Footer } from "./Footer";

/**
 * "Atelier" homepage — a warm gallery language translated from the
 * reference motion study: cream canvas, oversized grotesque type with
 * staggered word reveals, fanned art cards with @handle chips, folder
 * tabs, marquee bands and pill chrome.
 */
export function AtelierHome() {
  return (
    <div className="atelier-root min-h-screen bg-at-canvas text-at-ink">
      <Nav />
      <main id="main">
        <Hero />
        <Trusted />
        <Showcase />
        <Statement />
        <WorkCarousel />
        <Vision />
        <Stories />
        <Community />
        <Ticker />
        <SplitCta />
      </main>
      <Footer />
    </div>
  );
}
