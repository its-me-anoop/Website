"use client";

import { packages } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { PackageCard } from "../ui/PackageCard";
import { ButtonLink, Container, SectionIntro } from "../ui/primitives";

/** Three packages on paper: two with a published figure, one quoted. */
export function PackagesTeaser() {
  return (
    <section id="packages" className="a-paper relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Packages"
            title={
              <>
                Three ways to <em>work together</em>.
              </>
            }
            copy="Published prices, plus VAT. Partnership is scoped after a short call, with a written quote within two working days."
          />
          <Reveal>
            <ButtonLink href="/packages" tone="ghost" arrow="right">
              Compare every feature
            </ButtonLink>
          </Reveal>
        </div>
        <ul className="mt-14 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
