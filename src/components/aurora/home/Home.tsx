"use client";

import { Shell } from "../layout/Shell";
import { CtaBand } from "../layout/CtaBand";
import { Hero } from "./Hero";
import { Ticker } from "./Ticker";
import { Showcase } from "./Showcase";
import { Audiences } from "./Audiences";
import { About } from "./About";
import { Work } from "./Work";
import { Compare } from "./Compare";
import { Process } from "./Process";
import { PackagesTeaser } from "./PackagesTeaser";

/**
 * Homepage in the Ember rhythm: night for the opening, the studio and
 * the close; warm paper for everything a practice manager reads
 * carefully (the sample sites, who it is for, the comparison, the
 * process and the prices).
 */
export function Home() {
  return (
    <Shell>
      <Hero />
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
