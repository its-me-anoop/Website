"use client";

import Link from "next/link";
import { projects } from "@/lib/marketing/content";
import { AuditBar, ButtonLink, Container, Display } from "../ui/primitives";
import { VisionLens } from "./VisionLens";

/**
 * Opening: a large, plain headline and the audit bar, under a lens that
 * shows the same page through blurred vision, cataracts, glare or no
 * colour. The studio's argument, made by the page itself.
 */
export function Hero() {
  const clients = projects.filter((p) => !p.internal).map((p) => p.name);

  return (
    <section id="top" className="relative">
      <Container className="pb-16 pt-28 sm:pt-36">
        <Link
          href="/leaving-msw"
          className="s-fade-in inline-block border-b border-s-line-2 pb-1 text-[15px] text-s-on-ink-2 transition-colors hover:border-s-signal hover:text-s-on-ink"
        >
          Leaving My Surgery Website? Read about Clear Path.
        </Link>

        <VisionLens className="mt-10">
          <Display as="h1" size="hero" rise className="max-w-[15ch]">
            Websites that <em>every patient</em> can use.
          </Display>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <p
              className="s-fade-in max-w-[560px] text-[19px] leading-[1.6] text-s-on-ink-2 sm:text-[21px]"
              style={{ ["--d" as string]: "300ms" }}
            >
              Flutterly designs and builds websites for GP practices, care homes and clinics. Custom-coded in Reading,
              accessible to WCAG 2.2 AA, and looked after by the person who built them.
            </p>
            <div className="s-fade-in" style={{ ["--d" as string]: "420ms" }}>
              <AuditBar />
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ButtonLink href="/book" tone="outline" arrow="right">
                  Book a call
                </ButtonLink>
                <ButtonLink href="#services" tone="link">
                  See the sample sites
                </ButtonLink>
              </div>
            </div>
          </div>
        </VisionLens>

        <p className="mt-16 text-[15px] leading-[1.7] text-s-on-ink-2">
          <span className="s-label mr-3 text-s-on-ink">Built for</span>
          {clients.join(" · ")}
        </p>
      </Container>
    </section>
  );
}
