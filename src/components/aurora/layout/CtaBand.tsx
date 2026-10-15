"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { EmberGlow, Reveal } from "../effects/Motion";
import { AuditBar, ButtonLink, Container, Display, Eyebrow } from "../ui/primitives";

/**
 * Closing band on every marketing page: night canvas, one ember glow
 * from above, a statement, the audit bar, then a booking link and a
 * direct email. The booking page hides the link to itself. Pages whose
 * visitors may not have a website to audit pass `audit="link"` to turn
 * the bar into a small cross-link.
 */
export function CtaBand({
  title,
  copy,
  id,
  showBooking = true,
  audit = "bar",
}: {
  title: ReactNode;
  copy: string;
  id?: string;
  showBooking?: boolean;
  audit?: "bar" | "link";
}) {
  return (
    <section id={id} className="relative isolate scroll-mt-24 overflow-hidden border-t border-a-line bg-a-void py-28 sm:py-36">
      <EmberGlow position="top" className="-z-10" />
      <Container>
        <Reveal className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <Eyebrow>Start here</Eyebrow>
          <Display size="xl" className="mt-7">
            {title}
          </Display>
          <p className="mx-auto mt-7 max-w-[600px] text-[17.5px] leading-[1.65] text-a-ink-soft sm:text-[19px]">{copy}</p>
          {audit === "bar" ? <AuditBar className="mt-10" align="center" /> : null}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[15px] text-a-ink-soft">
            <span>{showBooking ? "Or talk it through:" : "Or write directly:"}</span>
            {showBooking ? (
              <ButtonLink href="/book" tone="outline" size="sm" arrow="right">
                Book a {site.booking.durationMinutes}-minute call
              </ButtonLink>
            ) : null}
            <ButtonLink href={`mailto:${site.email}`} tone="ghost" size="sm">
              {site.email}
            </ButtonLink>
            <span className="w-full text-[13.5px] text-a-muted sm:w-auto">A reply within one working day.</span>
          </div>
          {audit === "link" ? (
            <p className="mt-6 text-[14.5px] text-a-muted">
              Have a website too?{" "}
              <Link
                href="/free-audit"
                className="text-a-ink-soft underline decoration-a-line-2 underline-offset-4 transition-colors hover:text-a-ink hover:decoration-a-amber"
              >
                Get a free website audit
              </Link>
              .
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
