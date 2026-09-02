"use client";

import { KilnShell } from "../KilnShell";
import { CtaBand } from "../CtaBand";
import { Hero } from "./Hero";
import { Ticker } from "./Ticker";
import { Showcase } from "./Showcase";
import { Personas } from "./Personas";
import { Statement } from "./Statement";
import { Work } from "./Work";
import { Compare } from "./Compare";
import { Process } from "./Process";
import { PackagesTeaser } from "./PackagesTeaser";

/**
 * Kiln homepage. Bone canvas: the hero with its fanned strip of
 * finished sites, a ticker, the five-sector showcase, who it is for,
 * the studio statement under a bitten photograph, selected work and
 * the anti-template table. Then one long coal band: process,
 * packages and the closing call to action.
 */
export function KilnHome() {
  return (
    <KilnShell>
      <Hero />
      <Ticker />
      <Showcase />
      <Personas />
      <Statement />
      <Work />
      <Compare />
      <div className="on-coal bg-k-coal text-k-coal-ink">
        <Process />
        <PackagesTeaser />
        <CtaBand
          id="contact"
          title={
            <>
              Ready to give the people you serve a better <em>front door</em>?
            </>
          }
          copy="A practice website, a care home, a clinic or a product idea: start with a conversation, or a free written audit of what you have today."
        />
      </div>
    </KilnShell>
  );
}
