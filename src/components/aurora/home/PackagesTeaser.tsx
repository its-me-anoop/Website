"use client";

import { packages } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { PackageCard } from "../ui/PackageCard";
import { ButtonLink, Container, SectionIntro } from "../ui/primitives";

export function PackagesTeaser() {
  return (
    <section id="packages" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[500px] max-w-[1000px] rounded-full opacity-30 blur-[140px]"
        style={{ background: "linear-gradient(90deg,#6d5bff,#1fb8c9)" }}
      />
      <Container className="relative">
        <SectionIntro
          align="center"
          eyebrow="Packages"
          title={
            <>
              Three ways to <em>work together</em>.
            </>
          }
          copy="Published prices, plus VAT. Partnership is scoped after a short call, with a written quote within two working days."
        />
        <ul className="mt-14 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </ul>
        <Reveal className="mt-10 text-center">
          <ButtonLink href="/packages" tone="glass" arrow="right">
            Compare the packages in detail
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
