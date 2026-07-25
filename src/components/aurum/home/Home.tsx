"use client";

import { Shell } from "../Shell";
import { CtaBand } from "../CtaBand";
import { Hero } from "./Hero";
import { TrustBand } from "./TrustBand";
import { Suite } from "./Suite";
import { Sectors } from "./Sectors";
import { Compare } from "./Compare";
import { Audit } from "./Audit";
import { Work } from "./Work";
import { Why } from "./Why";
import { Process } from "./Process";
import { About } from "./About";

/**
 * The Aurum homepage, and the rhythm the rest of the site follows:
 *
 *   night fold → cream (trust, suite) → tinted band (sectors) →
 *   cream (comparison, audit) → tinted band (work) → cream (why) →
 *   night interlude (process) → cream (founder) → warm closing band
 *
 * Two inversions, never adjacent, each sealed by the three-colour rule.
 */
export function Home() {
  return (
    <Shell>
      <Hero />
      <TrustBand />
      <Suite />
      <Sectors />
      <Compare />
      <Audit />
      <Work />
      <Why />
      <Process />
      <About />
      <CtaBand
        title="Ready to give the people you serve a better experience?"
        copy="Whether it is a practice website, a care home or a product idea — start with a conversation, or a free written audit of what you have today."
        id="contact"
      />
    </Shell>
  );
}
