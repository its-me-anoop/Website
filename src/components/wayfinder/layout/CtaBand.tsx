import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { AuditBar } from "../ui/AuditBar";
import { ButtonLink } from "../ui/Button";
import { Container, Heading } from "../ui/Type";

/**
 * The closing band on every marketing page: a full-width signal-yellow
 * board with a statement, the audit field, and the two human routes
 * (a call and an email). The booking page hides the link to itself.
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
    <section id={id} className="wf-on-sign scroll-mt-20 border-t-2 border-wf-ink bg-wf-sign text-wf-ink">
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="min-w-0">
          <Heading size="lg" className="max-w-[16ch]">
            {title}
          </Heading>
          <p className="wf-lead mt-6 max-w-[48ch] text-[18px] leading-[1.6]">{copy}</p>
        </div>
        <div className="min-w-0 lg:pt-3">
          <AuditBar hint="About sixty checks, scored and explained in plain English. Nothing you enter is stored." />
          <div className="mt-10 border-t-2 border-wf-ink pt-8">
            <p className="text-[16px] font-bold">{showBooking ? "Rather talk it through?" : "Rather write?"}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {showBooking ? (
                <ButtonLink href="/book" tone="ink">
                  Book a {site.booking.durationMinutes}-minute call
                </ButtonLink>
              ) : null}
              <ButtonLink href={`mailto:${site.email}`} tone="outline" arrow={false}>
                {site.email}
              </ButtonLink>
            </div>
            <p className="wf-lead mt-4 text-[14.5px]">A reply within one working day.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
