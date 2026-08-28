import type { Metadata } from "next";
import {
  DentalAction,
  DentalPageHero,
  DentalReviewDate,
  DentalSection,
  DentalTriageCard,
} from "@/components/demos/dental/DentalShell";
import { loadDentalContent } from "@/lib/cms/dental";

export const metadata: Metadata = { title: "Urgent & out-of-hours care" };

export default function UrgentPage() {
  const { urgent, practice } = loadDentalContent();

  return (
    <>
      <DentalPageHero
        title="Urgent & out-of-hours care"
        lede="If you're in dental pain, start here — most problems can be seen the same day."
        crumb="Urgent care"
      />

      <DentalSection>
        <h2 className="sr-only">What to do right now</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          <DentalTriageCard variant="same-day" title="Call us — same-day slots">
            <p>{urgent.sameDayPolicy}</p>
            <p className="mt-3">
              <a
                href={practice.emergencyPhoneHref}
                className="font-semibold text-[var(--ddt-petrol)] underline"
              >
                Call {practice.emergencyPhone}
              </a>
            </p>
          </DentalTriageCard>

          <DentalTriageCard variant="closed" title="We're closed — call NHS 111">
            <p>{urgent.whenWeAreClosed}</p>
            <p className="mt-3">
              <a
                href="https://111.nhs.uk/"
                className="font-semibold text-[var(--ddt-petrol)] underline"
              >
                Get help from NHS 111
              </a>
            </p>
          </DentalTriageCard>

          <DentalTriageCard variant="emergency" title="Call 999 or go to A&E now if:">
            <ul className="space-y-1.5">
              {urgent.goToAeIf.map((flag) => (
                <li key={flag}>{flag}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm">
              These are not dental problems a dentist can treat safely — go
              straight to A&E, not the surgery.
            </p>
          </DentalTriageCard>
        </div>
      </DentalSection>

      <div className="bg-[var(--ddt-sand)]">
        <DentalSection pad="spacious">
          <h2 className="text-2xl font-bold tracking-tight">What an urgent visit costs</h2>
          <div className="mt-5 flex flex-wrap items-center gap-6">
            <p className="text-3xl font-bold tracking-tight">{urgent.urgentBandPrice}</p>
            <p className="max-w-[60ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
              An NHS urgent appointment covers an examination and, if we can
              treat you the same day, the treatment needed to relieve pain or
              infection — one charge, whatever we do.
            </p>
          </div>
          <div className="mt-6">
            <DentalAction href={practice.emergencyPhoneHref}>
              Call to book an urgent slot
            </DentalAction>
          </div>
        </DentalSection>
      </div>

      <DentalSection>
        <DentalReviewDate reviewed={urgent.reviewed} />
      </DentalSection>
    </>
  );
}
