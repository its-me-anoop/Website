"use client";

import { site } from "@/lib/site";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { ButtonLink, CheckItem, Container, Display, Eyebrow } from "../ui/primitives";
import { CalEmbed } from "./CalEmbed";

const covered = [
  "What your organisation needs the website to do",
  "What is working and what is not on the site you have",
  "Which package fits, or whether you need one at all",
  "What happens next, in writing, if you want to go further",
] as const;

/**
 * Booking page: a short introduction, then the inline Cal.com booker
 * in a glass frame. Everything needed to decide sits above the
 * calendar, including the email route for anyone who would rather
 * not book.
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
              Fifteen minutes with {site.founder}, the person who designs and builds every Flutterly site. Pick a
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
        <Reveal>
          <CalEmbed />
        </Reveal>
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
                Prefer a free written audit first?
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
        copy="Paste your website address and Flutterly will send a written, scored review of what you have today. Yours to keep, whoever ends up making the fixes."
        id="contact"
        showBooking={false}
      />
    </Shell>
  );
}
