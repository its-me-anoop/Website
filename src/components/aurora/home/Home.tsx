"use client";

import { Shell } from "../layout/Shell";
import { CtaBand } from "../layout/CtaBand";
import { Hero } from "./Hero";
import { Showreel } from "./Showreel";
import { Ticker } from "./Ticker";
import { Showcase } from "./Showcase";
import { Audiences } from "./Audiences";
import { About } from "./About";
import { Work } from "./Work";
import { Compare } from "./Compare";
import { Process } from "./Process";
import { PackagesTeaser } from "./PackagesTeaser";

/**
 * Aurora homepage: aurora hero, a raked showreel that stands up on
 * scroll, the client ticker, the five-sector showcase, who it is for,
 * the studio statement, pinned horizontal work, the anti-template
 * table, the process rail, packages and the closing band.
 */
export function Home() {
  return (
    <Shell>
      <Hero />
      <Showreel />
      <Ticker />
      <Showcase />
      <Audiences />
      <About />
      <Work />
      <Compare />
      <Process />
      <PackagesTeaser />
      <CtaBand
        id="contact"
        title={
          <>
            Ready to give the people you serve a better <em>front door</em>?
          </>
        }
        copy="A GP practice website, a care home website or a product idea: start with a conversation, or a free written audit of what you have today."
      />
    </Shell>
  );
}
