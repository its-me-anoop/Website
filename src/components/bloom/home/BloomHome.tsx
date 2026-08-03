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
 * Flutterly Limited homepage: commercial digital-delivery positioning,
 * full service architecture, healthcare specialisms, working proof,
 * process, leadership and one clear route into a project conversation.
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
        title="Make the next digital project easier to deliver"
        copy="Whether you need a healthcare website, a digital product, business email or campaign support, start with the outcome and the current setup. Flutterly will turn it into a clear next step."
        secondaryLabel="Start with a website audit"
        id="contact"
      />
    </BloomShell>
  );
}
