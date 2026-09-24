"use client";

import { packages } from "@/lib/marketing/content";
import { PackageCard } from "../ui/PackageCard";
import { ButtonLink, Container, SectionIntro } from "../ui/primitives";

export function PackagesTeaser() {
  return (
    <section id="packages" className="scroll-mt-16 border-t border-s-line py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            label="Packages"
            title={
              <>
                Three ways to <em>work together</em>.
              </>
            }
            copy="Published prices, plus VAT. Partnership is scoped after a short call, with a written quote within two working days."
          />
          <ButtonLink href="/packages" tone="link" arrow="right" className="shrink-0 text-[17px]">
            Compare the packages in detail
          </ButtonLink>
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
