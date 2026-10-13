"use client";

import { Shell } from "../layout/Shell";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Work } from "./Work";
import { Studio } from "./Studio";
import { Process } from "./Process";
import { Contact } from "./Contact";

/**
 * The rebranded homepage: one studio for websites, apps, IT support,
 * social media and SEO. Night for the opening, the work and the close;
 * paper for the services, the studio and the process. Sections build
 * from a wireframe as they scroll in (see the `fx-` rules in
 * globals.css).
 */
export function Home() {
  return (
    <Shell>
      <Hero />
      <Services />
      <Work />
      <Studio />
      <Process />
      <Contact />
    </Shell>
  );
}
