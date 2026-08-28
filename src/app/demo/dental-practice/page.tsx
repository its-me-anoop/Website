import Link from "next/link";
import {
  DentalAction,
  DentalCard,
  DentalMiniMap,
  DentalSection,
  DentalUrgentCallout,
} from "@/components/demos/dental/DentalShell";
import { loadDentalContent } from "@/lib/cms/dental";

export default function DentalDemoHome() {
  const { practice, feesNhs, treatments, urgent } = loadDentalContent();

  return (
    <>
      {/* Hero */}
      <div className="border-b border-[var(--ddt-line)] bg-[var(--ddt-sand)]">
        <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="max-w-[720px] text-[clamp(2rem,5vw,3.1rem)] font-bold leading-[1.08] tracking-tight">
              {practice.strap}
            </h1>
            <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-[var(--ddt-ink-soft)]">
              {practice.nhsAndPrivate}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <DentalAction href={practice.phoneHref}>
                Call to book: {practice.phone}
              </DentalAction>
              <Link
                href="/demo/dental-practice/fees"
                className="text-base font-semibold text-[var(--ddt-petrol)] underline underline-offset-2"
              >
                See our fees first
              </Link>
            </div>
          </div>
          <div className="hidden rounded-md border border-[var(--ddt-line)] bg-[var(--ddt-surface)] p-6 lg:block">
            <p className="text-sm font-semibold uppercase tracking-[0.06em] text-[var(--ddt-ink-soft)]">
              Today
            </p>
            <p className="mt-2 text-lg font-bold leading-snug">
              {practice.acceptingNhsPatients
                ? "Welcoming new NHS and private patients"
                : "Welcoming new private patients"}
            </p>
            <p className="mt-2 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
              {practice.weekdayHours.map((segment, index) => (
                <span key={segment.label}>
                  {index > 0 ? <br /> : null}
                  {segment.label}: {segment.hours}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Urgent above the fold */}
      <DentalSection pad="normal">
        <DentalUrgentCallout
          title="In pain today?"
          action={
            <Link
              href="/demo/dental-practice/urgent"
              className="inline-block rounded-md bg-[var(--ddt-urgent)] px-5 py-2.5 text-base font-semibold text-white hover:opacity-90"
            >
              Read our urgent care page
            </Link>
          }
        >
          {urgent.sameDayPolicy}
        </DentalUrgentCallout>
      </DentalSection>

      {/* Fees preview */}
      <div className="bg-[var(--ddt-sand)]">
        <DentalSection pad="spacious">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">NHS charges, in full</h2>
              <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                Every NHS course of treatment falls into one of three bands.
                Correct as of {feesNhs.effectiveFromDisplay}.
              </p>
            </div>
            <Link
              href="/demo/dental-practice/fees"
              className="text-base font-semibold text-[var(--ddt-petrol)] underline underline-offset-2"
            >
              Full fees, private prices and the rules
            </Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {feesNhs.bands.map((band) => (
              <div
                key={band.band}
                className="rounded-md border border-[var(--ddt-line)] bg-[var(--ddt-surface)] p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.06em] text-[var(--ddt-ink-soft)]">
                  {band.band}
                </p>
                <p className="mt-1 text-3xl font-bold tracking-tight">{band.price}</p>
                <p className="mt-2 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                  {band.covers}
                </p>
              </div>
            ))}
          </div>
        </DentalSection>
      </div>

      {/* Treatments teaser */}
      <DentalSection pad="spacious">
        <h2 className="text-2xl font-bold tracking-tight">Popular treatments</h2>
        <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
          Every treatment is priced in full on its own page — we never ask you
          to call for a quote.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.treatments.slice(0, 3).map((treatment) => (
            <DentalCard
              key={treatment.slug}
              title={treatment.title}
              copy={`${treatment.priceFrom === treatment.priceTo ? treatment.priceFrom : `${treatment.priceFrom} to ${treatment.priceTo}`} — ${treatment.summary}`}
              href={`/demo/dental-practice/treatments#${treatment.slug}`}
            />
          ))}
        </div>
      </DentalSection>

      {/* Trust row */}
      <div className="border-y border-[var(--ddt-line)] bg-[var(--ddt-petrol-tint)]">
        <DentalSection pad="normal">
          <div className="flex flex-col divide-y divide-[var(--ddt-line)]/70 sm:flex-row sm:divide-x sm:divide-y-0">
            <p className="max-w-[32ch] py-3 text-base leading-relaxed text-[var(--ddt-ink)] sm:py-0 sm:pr-8">
              Regulated by the General Dental Council. Every dentist here
              publishes their GDC number —{" "}
              <Link href="/demo/dental-practice/about" className="underline">
                see our team
              </Link>
              .
            </p>
            <p className="max-w-[32ch] py-3 text-base leading-relaxed text-[var(--ddt-ink)] sm:py-0 sm:px-8">
              {practice.cqc.ratingText} ({practice.cqc.sampleNote})
            </p>
            <p className="max-w-[32ch] py-3 text-base leading-relaxed text-[var(--ddt-ink)] sm:py-0 sm:pl-8">
              Prices you can see before you book — NHS bands and private
              from–to ranges, published on this site.
            </p>
          </div>
        </DentalSection>
      </div>

      {/* Find us */}
      <DentalSection pad="spacious">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Find us</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
              {practice.address}
            </p>
            <ul className="mt-4 space-y-1.5 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
              {practice.access.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <DentalMiniMap />
        </div>
      </DentalSection>

      {/* Closing CTA */}
      <div className="bg-[var(--ddt-ink)] text-white">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-6 px-4 py-10 sm:px-6">
          <div>
            <h2 className="text-xl font-bold">New to the practice?</h2>
            <p className="mt-1.5 max-w-[52ch] text-base leading-relaxed text-white/75">
              Register in a few minutes and we will take it from there.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/demo/dental-practice/new-patients"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-[var(--ddt-ink)] hover:bg-white/90"
            >
              How to register
            </Link>
            <a
              href={practice.phoneHref}
              className="rounded-md border border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
            >
              Call {practice.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
