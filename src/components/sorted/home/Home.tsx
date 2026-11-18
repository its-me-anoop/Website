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
 * media and SEO, as a walk through eight rooms. A cobalt wall for the
 * opening, paper for the clients, the dark room for the services, ochre
 * for the work, lilac for the audit, sun for the studio, mint for the
 * process and vermilion for the close.
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
