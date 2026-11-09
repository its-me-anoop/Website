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

/**
 * The homepage: one studio for websites, apps, IT support, social
 * media and SEO. Cobalt for the opening, chalk for the clients, the
 * card index and the studio, navy for the work, sky for the audit, sun
 * for the process and flame for the close.
 */
export function Home() {
  return (
    <Shell>
      <Hero />
      <ClientLogos />
      <Services />
      <Work />
      <Audit />
      <Studio />
      <Process />
      <Contact />
    </Shell>
  );
}
