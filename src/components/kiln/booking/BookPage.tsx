"use client";

import { site } from "@/lib/site";
import { KilnShell } from "../KilnShell";
import { CtaBand } from "../CtaBand";
import { BtnLink, CheckItem, Display, Eyebrow, Rise } from "../primitives";
import { CalEmbed } from "./CalEmbed";

const covered = [
  "What your organisation needs the website to do",
  "What is working and what is not on the site you have",
  "Which package fits, or whether you need one at all",
  "What happens next, in writing, if you want to go further",
] as const;

/**
 * Booking page. A short serif introduction, then the inline Cal.com
 * booker. Everything the visitor needs to decide sits above the
 * calendar: how long, what it covers, no obligation, and the email
 * route for anyone who would rather not book.
 */
export function BookPage() {
  const { durationMinutes, url } = site.booking;
  return (
    <KilnShell>
      <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 text-center sm:px-8">
          <Rise>
            <Eyebrow className="text-k-muted">Discovery call · {durationMinutes} minutes</Eyebrow>
          </Rise>
          <Rise delay={0.06}>
            <Display as="h1" size="xl" className="mt-6 max-w-[16ch] text-k-ink">
              Book a short <em>discovery</em> call.
            </Display>
          </Rise>
          <Rise delay={0.14}>
            <p className="mx-auto mt-7 max-w-[600px] text-[17.5px] leading-[1.6] text-k-ink-soft">
              Fifteen minutes with {site.founder}, the person who designs and
              builds every Flutterly site. Pick a time that suits you and a
              video link arrives by email. No pitch, no obligation.
            </p>
          </Rise>
          <Rise delay={0.2}>
            <p className="mx-auto mt-4 max-w-[600px] text-[15.5px] leading-[1.6] text-k-muted">
              Rather write first? Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-k-ink underline decoration-k-line-2 underline-offset-4 transition-colors hover:decoration-k-ink"
              >
                {site.email}
              </a>{" "}
              and you will hear back within one working day.
            </p>
          </Rise>
        </div>

        <Rise delay={0.28} className="mx-auto mt-12 w-full max-w-[1120px] px-5 sm:mt-16 sm:px-8">
          <CalEmbed />
        </Rise>

        <div className="mx-auto mt-16 w-full max-w-[1280px] px-5 pb-24 sm:mt-20 sm:px-8 sm:pb-32">
          <div className="grid gap-10 border-t border-k-line pt-12 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
            <Rise>
              <Eyebrow className="text-k-muted">On the call</Eyebrow>
              <Display as="h2" size="md" className="mt-5 text-k-ink">
                Fifteen minutes, <em>plainly</em> spent.
              </Display>
            </Rise>
            <Rise delay={0.08}>
              <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {covered.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <BtnLink href="/free-audit" tone="butter" size="sm">
                  Prefer a free written audit first?
                </BtnLink>
                <BtnLink href={url} tone="ghost" size="sm" external arrow="up">
                  Open on Cal.com
                </BtnLink>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Not ready to talk? Start with a free <em>audit</em>.
          </>
        }
        copy="Paste your website address and Flutterly will send a written, scored review of what you have today. Yours to keep, whoever ends up making the fixes."
        id="contact"
        showBooking={false}
      />
    </KilnShell>
  );
}
