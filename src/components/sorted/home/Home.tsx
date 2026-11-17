"use client";

import { Shell } from "../layout/Shell";
import { Hero } from "./Hero";
import { ClientLogos } from "./ClientLogos";
import { Services } from "./Services";
import { Work } from "./Work";
import { Audit } from "./Audit";
import { Studio } from "./Studio";
import { Process } from "./Process";
import { Contact } from "./Contact";

export function Home() {
  return (
    <Shell>
      <Hero />
      <Work />
      <ClientLogos />
      <Services />
      <Studio />
      <Process />
      <Audit />
      <Contact />
    </Shell>
  );
}
