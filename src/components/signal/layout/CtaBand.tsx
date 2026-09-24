"use client";

import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Reveal } from "../effects/Motion";
import { AuditBar, ButtonLink, Container } from "../ui/primitives";

/**
 * Closing band on every marketing page: a full-width signal-yellow
 * panel with ink type, the audit bar and a booking link. The booking
 * page hides the link to itself.
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
    <section id={id} className="scroll-mt-20 bg-s-signal text-s-ink">
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
        <Reveal>
          {/* Emphasis on yellow would vanish, so the title renders plain here. */}
          <h2 className="s-display text-[clamp(2.4rem,5.4vw,4.8rem)] [&_em]:!bg-none [&_em]:!p-0 [&_em]:underline [&_em]:decoration-[0.08em] [&_em]:underline-offset-[0.12em]">
            {title}
          </h2>
          <p className="mt-6 max-w-[560px] text-[18px] leading-[1.6] text-s-ink/80">{copy}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <AuditBar onPaper />
          <div className="mt-8 flex flex-wrap items-center gap-3 text-[16px]">
            {showBooking ? (
              <ButtonLink href="/book" tone="ink" arrow="right">
                Book a {site.booking.durationMinutes}-minute call
              </ButtonLink>
            ) : null}
            <ButtonLink href={`mailto:${site.email}`} tone="outline-paper">
              {site.email}
            </ButtonLink>
          </div>
          <p className="mt-4 text-[14.5px] text-s-ink/75">A reply within one working day.</p>
        </Reveal>
      </Container>
    </section>
  );
}
