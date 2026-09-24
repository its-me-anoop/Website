"use client";

import { Shell } from "../layout/Shell";
import { CtaBand } from "../layout/CtaBand";
import { Hero } from "./Hero";
import { Showcase } from "./Showcase";
import { Audiences } from "./Audiences";
import { About } from "./About";
import { Work } from "./Work";
import { Compare } from "./Compare";
import { Process } from "./Process";
import { PackagesTeaser } from "./PackagesTeaser";

/**
 * Signal homepage. Ink and paper bands alternate: the vision-lens hero,
 * the live sample sites, who it is for, the studio, the work index, the
 * anti-template table, the process, packages and the yellow closing band.
 */
export function Home() {
  return (
    <Shell>
      <Hero />
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
