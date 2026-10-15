import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { AuditBar, Container } from "../ui/primitives";

/**
 * The close: a glow that follows the pointer, one question, the booking
 * link, the email address, and the free website audit for anyone who
 * would rather start with a report.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-fx-glow
      className="fx-glow relative scroll-mt-24 overflow-hidden border-t border-a-line py-[clamp(100px,12vw,180px)]"
    >
      <Container className="flex flex-col gap-11">
        <h2
          id="contact-title"
          className="fx-wt a-display max-w-[1100px] text-[clamp(3.25rem,8.4vw,8.25rem)] leading-[0.9]"
          data-wf="H2 · Display 132 / 90"
        >
          Got something that needs <em>sorting?</em>
        </h2>
        <div className="flex flex-wrap items-center gap-x-11 gap-y-5">
          <Link
            href="/book"
            data-magnetic
            data-cursor="Book a call"
            className="inline-flex min-h-16 items-center gap-3 rounded-full bg-a-amber px-8 text-[18px] font-medium text-a-void transition-colors duration-300 hover:bg-a-ink"
          >
            Book a {site.booking.durationMinutes}-minute call
            <ArrowRight size={18} aria-hidden />
          </Link>
          <a
            href={`mailto:${site.email}`}
            data-cursor="Email Anoop"
            className="fx-ul tap-target a-display inline-flex items-center pb-1.5 text-[clamp(22px,2.4vw,34px)] font-medium tracking-[-0.02em] text-a-ink"
          >
            {site.email}
          </a>
        </div>
        <div className="flex flex-col gap-4 border-t border-a-line pt-10">
          <p className="max-w-[560px] text-[17px] leading-[1.6] text-a-ink-soft">
            Rather start with a report? Paste your website address for a free check of its accessibility, speed and
            search.
          </p>
          <AuditBar placeholder="yourbusiness.co.uk" />
        </div>
      </Container>
    </section>
  );
}
