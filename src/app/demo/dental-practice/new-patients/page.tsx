import type { Metadata } from "next";
import {
  DentalAction,
  DentalPageHero,
  DentalReviewDate,
  DentalSection,
} from "@/components/demos/dental/DentalShell";
import { loadDentalContent } from "@/lib/cms/dental";

export const metadata: Metadata = { title: "New patients" };

export default function NewPatientsPage() {
  const { newPatients, practice } = loadDentalContent();

  return (
    <>
      <DentalPageHero
        title="New patients"
        lede="Joining is straightforward, whether you want NHS care, private care, or a mix of both."
        crumb="New patients"
      />

      <DentalSection className="max-w-[900px]">
        <h2 className="text-2xl font-bold tracking-tight">Your first steps with us</h2>
        <ol className="mt-5 divide-y divide-[var(--ddt-line)]">
          {newPatients.journeySteps.map((step, i) => (
            <li key={step.title} className="flex gap-5 py-6 first:pt-0 last:pb-0">
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--ddt-petrol)] text-lg font-bold text-white"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="pt-1 text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 max-w-[62ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                  {step.copy}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <DentalAction href={practice.phoneHref}>Call to register</DentalAction>
        </div>
      </DentalSection>

      <div className="bg-[var(--ddt-sand)]">
        <DentalSection pad="spacious" className="max-w-[900px]">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">What to bring</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                {newPatients.whatToBring.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="mt-1.5 h-3.5 w-3.5 shrink-0 fill-none stroke-[var(--ddt-petrol)] stroke-[2.5]"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-[var(--ddt-line)] bg-[var(--ddt-surface)] p-6">
              <h2 className="text-xl font-bold tracking-tight">{newPatients.newPatientOffer.title}</h2>
              <p className="mt-1 text-3xl font-bold tracking-tight">
                {newPatients.newPatientOffer.price}
              </p>
              <ul className="mt-4 space-y-1.5 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                {newPatients.newPatientOffer.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[var(--ddt-ink-soft)]">
                Registering as an NHS patient instead? Your first check-up is
                charged at the standard NHS Band 1 rate.
              </p>
            </div>
          </div>
        </DentalSection>
      </div>

      <DentalSection className="max-w-[900px]">
        <h2 className="text-2xl font-bold tracking-tight">Nervous about the dentist?</h2>
        <p className="mt-3 max-w-[65ch] text-lg leading-relaxed text-[var(--ddt-ink-soft)]">
          {newPatients.nervousPatients.intro}
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {newPatients.nervousPatients.accommodations.map((accommodation) => (
            <div
              key={accommodation}
              className="rounded-md border border-[var(--ddt-line)] bg-[var(--ddt-surface)] p-5"
            >
              <p className="text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                {accommodation}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
          {newPatients.nervousPatients.sedationCopy}
        </p>
        <DentalReviewDate reviewed={newPatients.reviewed} />
      </DentalSection>
    </>
  );
}
