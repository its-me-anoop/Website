"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { AuditBar, ButtonLink, Container, Display } from "../ui/primitives";

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
    <section id={id} className="studio-cta tone-sky scroll-mt-20">
      <Container className="studio-cta-inner">
        <div>
          <Display size="xl">{title}</Display>
          <p className="studio-cta-copy">{copy}</p>
        </div>
        <div className="studio-cta-options">
          {audit === "bar" && <AuditBar label="Your website address" hint="Get your free audit. No sign-up needed." />}
          <div className="studio-cta-contact">
            {showBooking && (
              <ButtonLink href="/book" tone="navy" arrow="up">Book a {site.booking.durationMinutes}-minute call</ButtonLink>
            )}
            <ButtonLink href={`mailto:${site.email}`} tone="ghost">{site.email}</ButtonLink>
          </div>
          <p className="studio-cta-response">A reply within one working day.</p>
          {audit === "link" && (
            <Link href="/free-audit" className="studio-audit-link">Get a free website audit</Link>
          )}
        </div>
      </Container>
    </section>
  );
}
