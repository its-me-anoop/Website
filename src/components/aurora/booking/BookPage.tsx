"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { site } from "@/lib/site";
import { quoteBookingLine, quoteCalNote, quotePathById, type QuotePath } from "@/lib/marketing/quote";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { ButtonLink, CheckItem, Container, Display, Eyebrow } from "../ui/primitives";
import { CalEmbed } from "./CalEmbed";

const covered = [
  "What you want to improve or build",
  "What you already have and what is getting in the way",
  "The scope, priorities and budget to consider",
  "The next step, in writing, if you want to go further",
] as const;

/**
 * The figure the visitor already chose, or the published range when
 * they came straight to the calendar. Sits on paper so it reads as a
 * written price, not another line of night-hero copy.
 */
function BookingPrice({ path }: { path: QuotePath | undefined }) {
  return (
    <aside className="a-paper mx-auto mb-6 max-w-[760px] rounded-[22px] px-5 py-4 text-[15.5px] leading-[1.6] text-a-ink sm:px-6">
      <p>{quoteBookingLine(path)}</p>
      <p className="mt-2">
        <Link href="/packages" className="underline decoration-a-line-2 underline-offset-4 hover:decoration-[#b4421a]">
          Compare the packages
        </Link>
        <span aria-hidden="true"> · </span>
        <Link href="/#figure" className="underline decoration-a-line-2 underline-offset-4 hover:decoration-[#b4421a]">
          {path ? "Choose a different figure" : "Pick a figure for your organisation"}
        </Link>
      </p>
    </aside>
  );
}

function BookingBody() {
  const path = quotePathById(useSearchParams().get("for"));
  return (
    <>
      <BookingPrice path={path} />
      <Reveal>
        <CalEmbed notes={path ? quoteCalNote(path) : undefined} />
        <p className="a-glass mx-auto mt-4 max-w-[640px] rounded-[18px] px-5 py-4 text-center text-[15.5px] leading-snug text-a-ink-soft">
          No suitable time? Email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-a-ink underline decoration-a-amber underline-offset-4 transition-colors hover:text-a-amber"
          >
            {site.email}
          </a>{" "}
          with a little about your project.
        </p>
      </Reveal>
    </>
  );
}

/**
 * Booking page: a short introduction, then the inline Cal.com booker
 * in a glass frame. The published website price sits above the calendar,
 * including the figure chosen on the homepage when one was.
 */
export function BookPage() {
  const { durationMinutes, url } = site.booking;
  return (
    <Shell>
      <PageHero
        eyebrow={`Discovery call · ${durationMinutes} minutes`}
        title={
          <>
            Book a short <em>discovery</em> call.
          </>
        }
        copy={
          <>
            <p>
              Fifteen minutes with {site.founder}, the person behind Flutterly. Tell me what you need help with: a
              website, an app, IT support, social media or search. We&rsquo;ll work out a sensible next step. Pick a
              time that suits you and a video link arrives by email. No pitch, no obligation.
            </p>
            <p className="mt-4 text-[15.5px] text-a-muted">
              Rather write first? Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-a-ink underline decoration-a-line-2 underline-offset-4 transition-colors hover:decoration-a-amber"
              >
                {site.email}
              </a>{" "}
              and you will hear back within one working day.
            </p>
          </>
        }
      />

      <Container className="-mt-6 max-w-[1120px]">
        <Suspense fallback={<BookingPrice path={undefined} />}>
          <BookingBody />
        </Suspense>
      </Container>

      <section className="py-24 sm:py-32">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>On the call</Eyebrow>
            <Display size="md" className="mt-5">
              Fifteen minutes, <em>plainly</em> spent.
            </Display>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {covered.map((item) => (
                <CheckItem key={item} className="a-glass rounded-[18px] p-5">
                  {item}
                </CheckItem>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/free-audit" tone="glass" size="sm">
                Prefer a free website audit first?
              </ButtonLink>
              <ButtonLink href={url} tone="ghost" size="sm" external arrow="up">
                Open on Cal.com
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Not ready to talk? Start with a free <em>audit</em>.
          </>
        }
        copy="Paste your website address for an instant report, then request a free written review if you'd like a second look. Yours to keep, whoever ends up making the fixes."
        id="contact"
        showBooking={false}
      />
    </Shell>
  );
}
