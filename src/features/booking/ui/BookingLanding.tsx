"use client";

import { CalendarCheck2, Clock3, Video } from "lucide-react";
import { site } from "@/lib/site";
import { BloomShell } from "@/components/bloom/BloomShell";
import { CtaBand } from "@/components/bloom/CtaBand";
import {
  BtnLink,
  CheckItem,
  Rise,
  RevealWords,
  SectionHead,
} from "@/components/bloom/primitives";
import { eventTypes } from "../core/config";

const reassurances = [
  "No cost and no obligation for any first call",
  "Video link sent by email once you book",
  "Times shown in your own timezone",
  "Reschedule any time by replying to the confirmation",
] as const;

/**
 * /book — choose a call type. Each card hands over to the scheduler at
 * /book/[eventType], which handles dates, times and details.
 */
export function BookingLanding() {
  return (
    <BloomShell>
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="bl-grid absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-16 pt-14 text-center sm:px-8 sm:pt-20">
          <Rise>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-bl-teal">
              Book a call
            </p>
          </Rise>
          <RevealWords
            as="h1"
            delay={0.08}
            className="mx-auto mt-4 max-w-[720px] text-[clamp(2.2rem,5.6vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.035em]"
            segments={[
              { text: "Pick a time," },
              { text: "skip the email tennis.", tone: "teal" },
            ]}
          />
          <Rise delay={0.2}>
            <p className="mx-auto mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-bl-ink-soft">
              Choose the kind of conversation you need and book it straight
              into {site.founder.split(" ")[0]}&rsquo;s diary. You&rsquo;ll get
              an instant confirmation and a calendar file for your own diary.
            </p>
          </Rise>
        </div>
      </section>

      <section className="border-t border-bl-line bg-bl-band-2">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
          <SectionHead
            eyebrow="Call types"
            title={[
              { text: "Three ways to start," },
              { text: "all of them free.", tone: "muted" },
            ]}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {eventTypes.map((eventType, i) => (
              <Rise key={eventType.id} delay={i * 0.08}>
                <article className="bl-card flex h-full flex-col rounded-[26px] border border-bl-line bg-bl-surface p-7 sm:p-8">
                  <div className="flex items-center gap-2 text-bl-teal">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-bl-teal-soft px-3 py-1 text-[12.5px] font-semibold">
                      <Clock3 size={13} aria-hidden />
                      {eventType.durationMinutes} min
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-bl-teal-soft px-3 py-1 text-[12.5px] font-semibold">
                      <Video size={13} aria-hidden />
                      Video call
                    </span>
                  </div>
                  <h3 className="mt-4 text-[19px] font-medium tracking-tight text-bl-ink">
                    {eventType.name}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-bl-ink-soft">
                    {eventType.description}
                  </p>
                  <ul className="mt-5 grid gap-3">
                    {eventType.agenda.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <BtnLink href={`/book/${eventType.id}`} tone="teal" arrow className="w-full">
                      Pick a time
                    </BtnLink>
                  </div>
                </article>
              </Rise>
            ))}
          </div>

          <Rise className="mx-auto mt-12 max-w-[720px]">
            <div className="rounded-[26px] border border-bl-line bg-bl-surface p-8 sm:p-9">
              <h2 className="flex items-center gap-2.5 text-[19px] font-medium tracking-tight text-bl-ink">
                <CalendarCheck2 size={20} aria-hidden className="text-bl-teal" />
                How booking works
              </h2>
              <ul className="mt-5 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                {reassurances.map((line) => (
                  <CheckItem key={line}>{line}</CheckItem>
                ))}
              </ul>
              <p className="mt-5 text-[13.5px] leading-relaxed text-bl-muted">
                Open times appear in the scheduler in your own timezone; when
                the diary is paused, none are shown. Prefer email — or no
                times suit? Write to{" "}
                <a className="font-medium text-bl-teal hover:text-bl-teal-hover" href={`mailto:${site.email}`}>
                  {site.email}
                </a>{" "}
                instead: both routes get the same attention.
              </p>
            </div>
          </Rise>
        </div>
      </section>

      <CtaBand
        title="Not sure which call fits?"
        copy="Start with the fifteen-minute intro call: if the conversation needs longer, the follow-up gets booked there and then."
        primaryLabel="Book an intro call"
        primaryHref="/book/intro-call"
        secondaryLabel="Get a free website audit"
        secondaryHref="/free-audit"
        id="contact"
      />
    </BloomShell>
  );
}
