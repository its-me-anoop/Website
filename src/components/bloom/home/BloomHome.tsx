"use client";

import { BloomShell } from "../BloomShell";
import { CtaBand } from "../CtaBand";
import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";
import { Suite } from "./Suite";
import { Sectors } from "./Sectors";
import { Compare } from "./Compare";
import { Audit } from "./Audit";
import { Work } from "./Work";
import { Why } from "./Why";
import { Process } from "./Process";
import { About } from "./About";

/**
 * "Bloom" homepage — a clean healthcare-service language: specialist
 * positioning up top, the service suite, GP and care-home sectors,
 * the anti-template comparison, the free audit offer, live work as
 * proof, then process, the founder and a single closing call to action.
 */
export function BloomHome() {
  return (
    <BloomShell>
      <Hero />
      <TrustBar />
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
    </BloomShell>
  );
}
