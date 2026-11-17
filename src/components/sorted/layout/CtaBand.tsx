"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "../effects/Motion";
import { AuditBar, ButtonLink, Container, Display, Eyebrow } from "../ui/primitives";

/**
 * Closing band on every marketing page: a cobalt field with the
 * question on the left and, on a white card that tips into place, the
 * two ways to start: the audit bar, then a booking key and a direct
 * email. The booking page hides the link to itself. Pages whose
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
    <section id={id} className="tone-cobalt relative isolate scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal turn={0}>
          <Eyebrow>Start here</Eyebrow>
          <Display size="xl" className="mt-6">
            {title}
          </Display>
          <p className="mt-7 max-w-[560px] text-[17.5px] leading-[1.6] text-s-ink-soft sm:text-[19px]">{copy}</p>
        </Reveal>

        <Reveal delay={0.1} className="tone-white rounded-[16px] border-2 border-s-rule p-6 shadow-[0_8px_0_0_var(--s-rule)] sm:p-8">
          {audit === "bar" ? (
            <>
              <p className="s-label text-[13px] text-s-muted">Free and instant. No sign-up.</p>
              <AuditBar className="mt-4 max-w-none" />
              <div className="my-6 flex items-center gap-3" aria-hidden>
                <span className="h-[2px] flex-1 bg-s-line" />
                <span className="s-label text-[12px] text-s-muted">or</span>
                <span className="h-[2px] flex-1 bg-s-line" />
              </div>
            </>
          ) : null}
          <p className="text-[16.5px] font-semibold text-s-ink">{showBooking ? "Talk it through:" : "Write directly:"}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-4">
            {showBooking ? (
              <ButtonLink href="/book" tone={audit === "bar" ? "navy" : "primary"} arrow="right">
                Book a {site.booking.durationMinutes}-minute call
              </ButtonLink>
            ) : null}
            <ButtonLink href={`mailto:${site.email}`} tone="ghost">
              {site.email}
            </ButtonLink>
          </div>
          <p className="mt-4 text-[14px] text-s-muted">A reply within one working day.</p>
          {audit === "link" ? (
            <p className="mt-5 border-t-[1.5px] border-s-line pt-5 text-[15px] text-s-ink-soft">
              Have a website too?{" "}
              <Link href="/free-audit" className="font-semibold text-s-ink underline decoration-s-accent decoration-2 underline-offset-4">
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
