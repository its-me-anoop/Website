"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { samples } from "@/lib/marketing/content";
import { EmberGlow } from "../effects/Motion";
import { IMacFrame } from "../ui/DeviceFrame";
import { AuditBar, ButtonLink, Container, Display } from "../ui/primitives";

const facts = [
  { value: "WCAG 2.2 AA", label: "Designed in on every build" },
  { value: "About 60 checks", label: "In the free instant audit" },
  { value: "One person", label: "Designs, builds and supports it" },
  { value: "From £995", label: "Published starting price, plus VAT" },
] as const;

/**
 * Opening: a two-column night hero. Left, the word-by-word headline,
 * the audit bar as the primary action and the booking link. Right, the
 * Willowbrook sample on an iMac. One ember glow breathes beneath; the
 * fact strip closes the fold.
 */
export function Hero() {
  const gp = samples[0];
  return (
    <section id="top" className="relative isolate overflow-hidden bg-a-void pb-16 pt-28 sm:pt-32 lg:pb-20">
      <EmberGlow className="-z-10" />

      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col items-start gap-8">
          <Link
            href="/leaving-msw"
            className="a-fade-up group inline-flex items-center gap-3 rounded-full border border-a-line-2 py-1.5 pl-1.5 pr-4 text-[13.5px] text-a-ink-soft transition-colors hover:border-a-ink/60 hover:text-a-ink"
          >
            <span className="a-mono rounded-full bg-a-amber px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-a-void">
              New
            </span>
            <span>
              Leaving My Surgery Website?
              <span className="sr-only sm:not-sr-only"> Meet Clear Path</span>
            </span>
            <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Display as="h1" size="hero" split delay={0} className="max-w-[14ch]">
            Healthcare websites that <em>answer first.</em>
          </Display>

          <p
            className="a-fade-up max-w-[56ch] text-[17px] leading-[1.65] text-a-ink-soft sm:text-[19px]"
            style={{ ["--d" as string]: "250ms" }}
          >
            Flutterly designs and builds websites for GP practices, care homes and clinics. Custom-coded in Reading,
            accessible to WCAG 2.2 AA, and looked after by the person who built them.
          </p>

          <div className="a-fade-up flex w-full flex-col items-start gap-5" style={{ ["--d" as string]: "320ms" }}>
            <AuditBar hint="Free instant audit: about sixty checks, nothing stored." />
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="/book" tone="outline" size="sm" arrow="right" magnetic>
                Book a call
              </ButtonLink>
              <ButtonLink href="#services" tone="ghost" size="sm">
                See the five sample sites
              </ButtonLink>
            </div>
          </div>
        </div>

        <figure className="a-fade-up relative m-0 lg:pl-6" style={{ ["--d" as string]: "200ms" }}>
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(255,138,42,0.2) 0%, rgba(11,9,7,0) 70%)" }}
          />
          <Link href={gp.href} className="relative block rounded-[16px]" aria-label={`Open the ${gp.name} sample website`}>
            <IMacFrame src={gp.image} alt="" priority sizes="(min-width: 1024px) 640px, 92vw" />
          </Link>
          <figcaption className="a-mono absolute left-0 top-0 -translate-y-1/2 rounded-full border border-a-line-2 bg-a-void px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-a-ink-soft">
            Sample · {gp.name}
          </figcaption>
        </figure>
      </Container>

      <Container className="mt-16">
        <dl style={{ ["--d" as string]: "420ms" }} className="a-fade-up grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-a-line bg-a-line lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.value} className="flex flex-col gap-1 bg-a-void px-5 py-5 sm:px-7">
              <dt className="order-2 text-[13.5px] leading-snug text-a-muted">{fact.label}</dt>
              <dd className="a-display order-1 text-[clamp(1.35rem,2.4vw,1.9rem)]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
