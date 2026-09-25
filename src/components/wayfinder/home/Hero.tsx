import { heroSigns } from "@/lib/marketing/content";
import { AuditBar } from "../ui/AuditBar";
import { ButtonLink } from "../ui/Button";
import { Container, Heading, Kicker } from "../ui/Type";
import { Fingerpost } from "./Fingerpost";

const facts = [
  { label: "Accessibility", value: "WCAG 2.2 AA", note: "Designed in on every build" },
  { label: "Instant audit", value: "~60 checks", note: "Free, in a few seconds" },
  { label: "Who builds it", value: "One person", note: "Brief, build and support" },
  { label: "Packages from", value: "£995", note: "Published prices, plus VAT" },
] as const;

/**
 * The opening: what Flutterly does, in one line, beside a fingerpost
 * whose arms go to real pages on the five sample sites. The audit field
 * is the main action; a plain fact strip closes the band.
 */
export function Hero() {
  return (
    <section id="top" className="border-b-2 border-wf-ink">
      <Container className="grid gap-14 pb-12 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10 lg:pb-16 lg:pt-16">
        <div className="min-w-0">
          <Kicker className="wf-settle">Websites for GP practices, care homes and clinics</Kicker>
          <Heading as="h1" size="hero" className="wf-settle mt-7">
            Websites that answer <mark className="wf-mark">before the phone rings.</mark>
          </Heading>
          <p
            className="wf-settle wf-lead mt-7 max-w-[56ch] text-[18px] leading-[1.6] sm:text-[20px]"
            style={{ ["--d" as string]: "80ms" }}
          >
            Patients, families and customers each arrive with one question. Flutterly designs and builds websites
            that answer it on the first screen. Custom-coded in Reading, accessible to WCAG&nbsp;2.2&nbsp;AA, and looked
            after by the person who built them.
          </p>
          <div className="wf-settle mt-9" style={{ ["--d" as string]: "140ms" }}>
            <AuditBar />
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              <ButtonLink href="/book" tone="text">
                Book a call
              </ButtonLink>
              <ButtonLink href="#services" tone="text" arrow="down">
                Try the sample sites
              </ButtonLink>
            </div>
          </div>
        </div>

        <Fingerpost
          signs={heroSigns}
          label="Signs to pages on the sample sites"
          caption="Every arm leads to a real page on one of the five sample sites."
          className="mx-auto w-full max-w-[560px] lg:pt-6"
        />
      </Container>

      <Container>
        <dl className="grid grid-cols-2 border-t-2 border-wf-ink lg:grid-cols-4">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={
                "flex flex-col py-5 pr-4 sm:py-6 " +
                (i % 2 === 1 ? "border-l-[1.5px] border-wf-line-2 pl-4 sm:pl-6 " : "") +
                (i === 2 ? "border-t-[1.5px] border-wf-line-2 lg:border-l-[1.5px] lg:border-t-0 lg:pl-6 " : "") +
                (i === 3 ? "border-t-[1.5px] border-wf-line-2 lg:border-t-0 " : "")
              }
            >
              <dt className="wf-label text-wf-muted">{fact.label}</dt>
              <dd className="mt-2">
                <span className="block text-[clamp(1.4rem,2.3vw,2rem)] font-extrabold leading-none tracking-[-0.03em]">
                  {fact.value}
                </span>
                <span className="mt-1.5 block text-[14.5px] text-wf-ink-soft">{fact.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
