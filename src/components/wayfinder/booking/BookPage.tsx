import { site } from "@/lib/site";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { CheckItem } from "../ui/Bits";
import { ButtonLink } from "../ui/Button";
import { Container, SectionHead } from "../ui/Type";
import { CalEmbed } from "./CalEmbed";

const covered = [
  "What your organisation needs the website to do",
  "What is working and what is not on the site you have",
  "Which package fits, or whether you need one at all",
  "What happens next, in writing, if you want to go further",
] as const;

/**
 * Booking page: a short introduction, then the inline Cal.com booker in
 * a plain plate. Everything needed to decide sits above the calendar,
 * including the email route for anyone who would rather not book.
 */
export function BookPage() {
  const { durationMinutes, url } = site.booking;
  return (
    <Shell>
      <PageHero
        kicker={`Discovery call · ${durationMinutes} minutes`}
        title={
          <>
            Book a short <mark className="wf-mark">discovery</mark> call.
          </>
        }
        copy={
          <>
            <p>
              Fifteen minutes with {site.founder}, the person who designs and builds every Flutterly site. Pick a time
              that suits you and a video link arrives by email. No pitch, no obligation.
            </p>
            <p className="mt-4 text-[16.5px]">
              Rather write first? Email{" "}
              <a href={`mailto:${site.email}`} className="wf-link font-bold text-wf-ink">
                {site.email}
              </a>{" "}
              and you will hear back within one working day.
            </p>
          </>
        }
      />

      <Container className="max-w-[1120px] py-14 sm:py-16">
        <CalEmbed />
      </Container>

      <section className="border-t-2 border-wf-ink bg-wf-paper-2 py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <SectionHead
            kicker="On the call"
            size="md"
            title={
              <>
                Fifteen minutes, <mark className="wf-mark">plainly</mark> spent.
              </>
            }
          />
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {covered.map((item) => (
                <CheckItem key={item} className="wf-plate p-5">
                  {item}
                </CheckItem>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <ButtonLink href="/free-audit" tone="outline" size="sm">
                Prefer a free written audit first?
              </ButtonLink>
              <ButtonLink href={url} tone="text" size="sm" external arrow="up-right">
                Open on Cal.com
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Not ready to talk? Start with a free <mark className="wf-mark">audit.</mark>
          </>
        }
        copy="Paste your website address and Flutterly will send a written, scored review of what you have today. Yours to keep, whoever ends up making the fixes."
        id="contact"
        showBooking={false}
      />
    </Shell>
  );
}
