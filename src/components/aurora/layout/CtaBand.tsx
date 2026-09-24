"use client";

import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Reveal } from "../effects/Motion";
import { AuditBar, ButtonLink, Container, Display } from "../ui/primitives";

/**
 * Closing band on every marketing page: an aurora-lit glass panel
 * with a statement, the audit bar, then a booking link and a direct
 * email. The booking page hides the link to itself.
 */
export function CtaBand({
  title,
  copy,
  id,
  showBooking = true,
}: {
  title: ReactNode;
  copy: string;
  id?: string;
  showBooking?: boolean;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] border border-a-line-2 bg-a-night px-6 py-20 text-center sm:px-12 sm:py-28">
            <div aria-hidden className="a-blobs opacity-70">
              <span />
              <span />
              <span />
            </div>
            <div aria-hidden className="a-grid absolute inset-0 opacity-60" />
            <div className="relative mx-auto flex max-w-[820px] flex-col items-center">
              <Display size="lg">{title}</Display>
              <p className="mx-auto mt-6 max-w-[580px] text-[17px] leading-[1.65] text-a-ink-soft">{copy}</p>
              <AuditBar className="mt-10" align="center" />
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[15px] text-a-ink-soft">
                <span>{showBooking ? "Or talk it through:" : "Or write directly:"}</span>
                {showBooking ? (
                  <ButtonLink href="/book" tone="glass" size="sm" arrow="right">
                    Book a {site.booking.durationMinutes}-minute call
                  </ButtonLink>
                ) : null}
                <ButtonLink href={`mailto:${site.email}`} tone="outline" size="sm">
                  {site.email}
                </ButtonLink>
                <span className="w-full text-[13.5px] text-a-muted sm:w-auto">A reply within one working day.</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
