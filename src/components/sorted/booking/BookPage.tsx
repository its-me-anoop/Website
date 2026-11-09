"use client";

import { site } from "@/lib/site";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { SlabStack } from "../ui/SlabStack";
import { ButtonLink, CheckItem, Container, Display, Eyebrow } from "../ui/primitives";
import { CalEmbed } from "./CalEmbed";

const covered = [
  "What you want to improve or build",
  "What you already have and what is getting in the way",
  "The scope, priorities and budget to consider",
  "The next step, in writing, if you want to go further",
] as const;

/**
 * Booking page: a short introduction on flame, then the inline Cal.com
 * booker on a white sheet. Everything needed to decide sits above the
 * calendar, including the email route for anyone who would rather not
 * book.
 */
export function BookPage() {
  const { durationMinutes, url } = site.booking;

  return (
    <Shell>
      <PageHero
        eyebrow={`Discovery call · ${durationMinutes} minutes`}
        tone="tone-flame"
        art={<SlabStack order={["navy", "pink", "jade", "sun", "cobalt", "white"]} />}
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
            <p className="mt-4 text-[16px]">
              Rather write first? Email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-s-ink underline decoration-2 underline-offset-4">
                {site.email}
              </a>{" "}
              and you will hear back within one working day.
            </p>
          </>
        }
      />

      <div className="tone-chalk s-dots py-14 sm:py-20">
        <Container className="max-w-[1120px]">
          <Reveal turn={18}>
            <CalEmbed />
            <p className="mx-auto mt-5 max-w-[640px] rounded-[12px] border-[1.5px] border-s-line-2 bg-white px-5 py-4 text-center text-[16px] leading-snug text-s-ink-soft">
              No suitable time? Email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-s-ink underline decoration-s-accent decoration-2 underline-offset-4">
                {site.email}
              </a>{" "}
              with a little about your project.
            </p>
          </Reveal>
        </Container>
      </div>

      <section className="tone-white border-t-2 border-s-navy py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
          <Reveal turn={0}>
            <Eyebrow>On the call</Eyebrow>
            <Display size="md" className="mt-5">
              Fifteen minutes, <em>plainly</em> spent.
            </Display>
          </Reveal>
          <Reveal turn={0} delay={0.08}>
            <ul className="grid gap-x-8 border-t-2 border-s-navy sm:grid-cols-2">
              {covered.map((item) => (
                <CheckItem key={item} className="border-b-[1.5px] border-s-line-2 py-4">
                  {item}
                </CheckItem>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/free-audit" tone="plain" size="sm" className="border-2 border-s-navy [--key-edge:var(--s-navy)]">
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
