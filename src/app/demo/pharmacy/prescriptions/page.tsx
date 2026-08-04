import type { Metadata } from "next";
import Link from "next/link";
import {
  PharmacyInset,
  PharmacyPageHero,
  PharmacyReviewDate,
  PharmacySection,
} from "@/components/demos/pharmacy/PharmacyShell";
import { loadPharmacyContent } from "@/lib/cms/pharmacy";

export const metadata: Metadata = { title: "Repeat prescriptions" };

export default function PrescriptionsPage() {
  const { prescriptions } = loadPharmacyContent();

  return (
    <>
      <PharmacyPageHero
        title="Repeat prescriptions"
        lede="Nominate us once and every future repeat comes straight to us — no forms, no phone calls."
      />

      <PharmacySection>
        <h2 className="text-2xl font-bold tracking-tight">
          Nominate us in the NHS App
        </h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2">
          {prescriptions.nhsAppSteps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--dph-green)] text-base font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-[var(--dph-ink-soft)]">
                  {step.copy}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </PharmacySection>

      <div className="bg-[var(--dph-mint)]">
        <PharmacySection pad="spacious">
          <h2 className="text-2xl font-bold tracking-tight">Other ways to order</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {prescriptions.otherWaysToOrder.map((way) => (
              <div key={way.title}>
                <h3 className="text-lg font-bold">{way.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-[var(--dph-ink-soft)]">
                  {way.copy}
                </p>
              </div>
            ))}
          </div>
        </PharmacySection>
      </div>

      <PharmacySection>
        <div className="grid gap-6 sm:grid-cols-2">
          <PharmacyInset>{prescriptions.readyTimescaleCopy}</PharmacyInset>
          <PharmacyInset>{prescriptions.deliveryCopy}</PharmacyInset>
        </div>

        <h2 className="mt-10 text-2xl font-bold tracking-tight">
          Run out unexpectedly?
        </h2>
        <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
          {prescriptions.emergencySupplyCopy}{" "}
          <Link
            href="/demo/pharmacy/services#emergency-supply-of-medicines"
            className="text-[var(--dph-green)] underline"
          >
            More about emergency supply
          </Link>
          .
        </p>
        <PharmacyReviewDate reviewed={prescriptions.reviewed} />
      </PharmacySection>
    </>
  );
}
