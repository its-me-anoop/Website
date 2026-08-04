import type { Metadata } from "next";
import Link from "next/link";
import {
  DentalCategoryTag,
  DentalPageHero,
  DentalReviewDate,
  DentalSection,
} from "@/components/demos/dental/DentalShell";
import { loadDentalContent } from "@/lib/cms/dental";

export const metadata: Metadata = { title: "Treatments" };

export default function TreatmentsPage() {
  const { treatments } = loadDentalContent();

  return (
    <>
      <DentalPageHero
        title="Treatments"
        lede="NHS general dentistry, plus a small range of private treatment for when you want more choice. Every price is shown here — we never ask you to call for a quote."
      />

      <DentalSection>
        <div className="divide-y divide-[var(--ddt-line)]">
          {treatments.treatments.map((treatment) => (
            <article key={treatment.slug} id={treatment.slug} className="scroll-mt-24 py-8 first:pt-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight">{treatment.title}</h2>
                <DentalCategoryTag category={treatment.category} />
              </div>
              <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                {treatment.summary}
              </p>
              <div className="mt-4 grid gap-6 sm:grid-cols-[220px_1fr]">
                <div>
                  <p className="text-2xl font-bold tracking-tight">
                    {treatment.priceFrom === treatment.priceTo
                      ? treatment.priceFrom
                      : `${treatment.priceFrom} – ${treatment.priceTo}`}
                  </p>
                  {treatment.priceNote ? (
                    <p className="mt-1 text-sm text-[var(--ddt-ink-soft)]">{treatment.priceNote}</p>
                  ) : null}
                </div>
                <div>
                  <h3 className="text-lg font-bold">What happens</h3>
                  <p className="mt-1.5 max-w-[62ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                    {treatment.whatHappens}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-4 max-w-[70ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
          Want the NHS fee bands and full private price list side by side?
          See our{" "}
          <Link href="/demo/dental-practice/fees" className="text-[var(--ddt-petrol)] underline">
            fees page
          </Link>
          .
        </p>
        <DentalReviewDate reviewed={treatments.reviewed} />
      </DentalSection>
    </>
  );
}
