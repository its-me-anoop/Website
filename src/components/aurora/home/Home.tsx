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
 * The Aurora homepage. Specialist positioning at the fold, the service
 * suite, the two healthcare sectors, one bright interlude for the
 * anti-template comparison, the free audit offer, live work as proof,
 * then process, the founder, and a single closing call to action.
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
