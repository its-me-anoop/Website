import type { Metadata } from "next";
import {
  DentalInset,
  DentalPageHero,
  DentalReviewDate,
  DentalSection,
} from "@/components/demos/dental/DentalShell";
import { loadDentalContent } from "@/lib/cms/dental";

export const metadata: Metadata = { title: "Fees" };

export default function FeesPage() {
  const { feesNhs, feesPrivate } = loadDentalContent();

  return (
    <>
      <DentalPageHero
        title="Fees"
        lede="Every price on this page is what you pay — nothing is quoted only in the surgery. NHS charges are set nationally; private prices are ours, shown as ranges because the work varies from patient to patient."
      />

      {/* NHS charges */}
      <DentalSection>
        <h2 className="text-2xl font-bold tracking-tight">NHS charges</h2>
        <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
          Correct as of {feesNhs.effectiveFromDisplay}. {feesNhs.englandOnlyNote}
        </p>

        <div
          tabIndex={0}
          role="region"
          aria-label="NHS dental charge bands"
          className="mt-6 overflow-x-auto"
        >
          <table className="w-full min-w-[560px] border-collapse text-base">
            <caption className="sr-only">
              NHS dental charge bands, correct as of {feesNhs.effectiveFromDisplay}
            </caption>
            <thead>
              <tr className="border-b border-[var(--ddt-line)] text-left text-sm uppercase tracking-[0.04em] text-[var(--ddt-ink-soft)]">
                <th scope="col" className="py-2.5 pr-4 font-semibold">
                  Band
                </th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">
                  What it covers
                </th>
                <th scope="col" className="py-2.5 font-semibold">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {feesNhs.bands.map((band) => (
                <tr key={band.band} className="border-b border-[var(--ddt-line)]">
                  <th scope="row" className="py-3 pr-4 text-left font-semibold">
                    {band.band}
                  </th>
                  <td className="py-3 pr-4 text-[var(--ddt-ink-soft)]">{band.covers}</td>
                  <td className="py-3 whitespace-nowrap text-lg font-bold">{band.price}</td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="py-3 pr-4 text-left font-semibold">
                  Urgent (same-day) appointment
                </th>
                <td className="py-3 pr-4 text-[var(--ddt-ink-soft)]">
                  An examination and, if needed, treatment to relieve pain or infection.
                </td>
                <td className="py-3 whitespace-nowrap text-lg font-bold">
                  {feesNhs.urgentPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {feesNhs.rules.map((rule) => (
            <div key={rule.title}>
              <h3 className="text-lg font-bold">{rule.title}</h3>
              <p className="mt-1.5 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                {rule.copy}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold">Always free, whatever else you&rsquo;re having done</h3>
          <ul className="mt-2 grid gap-1.5 text-base leading-relaxed text-[var(--ddt-ink-soft)] sm:grid-cols-2">
            {feesNhs.alwaysFreeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <DentalInset>
          <p>{feesNhs.exemptionsSummary}</p>
          <p className="mt-2">
            <a href={feesNhs.exemptionsLink} className="font-semibold text-[var(--ddt-petrol)] underline">
              Check NHS dental cost exemptions on NHS.uk
            </a>
          </p>
        </DentalInset>
      </DentalSection>

      {/* Private fees */}
      <div className="bg-[var(--ddt-sand)]">
        <DentalSection pad="spacious">
          <h2 className="text-2xl font-bold tracking-tight">Private fees</h2>
          <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
            Private prices are shown as ranges because treatment varies from
            patient to patient. We agree the exact price with you in writing
            before any private treatment starts.
          </p>

          <div
            tabIndex={0}
            role="region"
            aria-label="Private treatment price ranges"
            className="mt-6 overflow-x-auto"
          >
            <table className="w-full min-w-[560px] border-collapse text-base">
              <caption className="sr-only">Private treatment price ranges</caption>
              <thead>
                <tr className="border-b border-[var(--ddt-line)] text-left text-sm uppercase tracking-[0.04em] text-[var(--ddt-ink-soft)]">
                  <th scope="col" className="py-2.5 pr-4 font-semibold">
                    Treatment
                  </th>
                  <th scope="col" className="py-2.5 pr-4 font-semibold">
                    Price range
                  </th>
                  <th scope="col" className="py-2.5 font-semibold">
                    What changes the price
                  </th>
                </tr>
              </thead>
              <tbody>
                {feesPrivate.items.map((item) => (
                  <tr key={item.treatment} className="border-b border-[var(--ddt-line)]">
                    <th scope="row" className="py-3 pr-4 text-left font-semibold">
                      {item.treatment}
                    </th>
                    <td className="py-3 pr-4 whitespace-nowrap text-lg font-bold">
                      {item.priceFrom} – {item.priceTo}
                    </td>
                    <td className="py-3 text-[var(--ddt-ink-soft)]">{item.note ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-[70ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
            {feesPrivate.guaranteeCopy}
          </p>
          {feesPrivate.planCopy ? (
            <p className="mt-4 max-w-[70ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
              {feesPrivate.planCopy}
            </p>
          ) : null}
        </DentalSection>
      </div>

      <DentalSection>
        <DentalReviewDate reviewed={feesNhs.reviewed} />
      </DentalSection>
    </>
  );
}
