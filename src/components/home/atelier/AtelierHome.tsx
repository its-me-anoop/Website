"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
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
  /* One visible switch pauses every marquee / drift animation on the
     page — the WCAG 2.2.2 mechanism for auto-moving content. */
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="atelier-root min-h-screen bg-at-canvas text-at-ink"
      data-marquees={paused ? "paused" : undefined}
    >
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

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={
          paused ? "Resume background animations" : "Pause background animations"
        }
        className="liquid fixed bottom-5 right-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
      >
        {paused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}
      </button>
    </div>
  );
}
