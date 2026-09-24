"use client";

import { site } from "@/lib/site";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { ButtonLink, CheckItem, Container, Label } from "../ui/primitives";
import { CalEmbed } from "./CalEmbed";

const covered = [
  "What your organisation needs the website to do",
  "What is working and what is not on the site you have",
  "Which package fits, or whether you need one at all",
  "What happens next, in writing, if you want to go further",
] as const;

/**
 * Booking page: what the call covers, then the inline Cal.com booker.
 * The email route sits in the hero for anyone who would rather write.
 */
export function BookPage() {
  const { durationMinutes, url } = site.booking;
  return (
    <Shell>
      <PageHero
        label={`Discovery call, ${durationMinutes} minutes`}
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
            <p className="mt-4 text-[16.5px]">
              Rather write first? Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-s-on-ink underline decoration-s-signal decoration-2 underline-offset-4"
              >
                {site.email}
              </a>{" "}
              and you will hear back within one working day.
            </p>
          </>
        }
      >
        <Label className="text-s-on-ink-2">On the call</Label>
        <ul className="space-y-3">
          {covered.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
      </PageHero>

      <Container className="pb-24">
        <Reveal>
          <CalEmbed />
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          <ButtonLink href="/free-audit" tone="outline" size="sm">
            Prefer a free written audit first?
          </ButtonLink>
          <ButtonLink href={url} tone="link" external arrow="up" className="text-[16px]">
            Open on Cal.com
          </ButtonLink>
        </div>
      </Container>

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
