import type { Metadata } from "next";
import Link from "next/link";
import {
  PharmacyPageHero,
  PharmacyReviewDate,
  PharmacySection,
} from "@/components/demos/pharmacy/PharmacyShell";
import { loadPharmacyContent } from "@/lib/cms/pharmacy";

export const metadata: Metadata = { title: "NHS Pharmacy First" };

export default function PharmacyFirstPage() {
  const { pharmacyFirst } = loadPharmacyContent();

  return (
    <>
      <PharmacyPageHero title="NHS Pharmacy First" lede={pharmacyFirst.intro} />

      <PharmacySection>
        <div className="rounded-xl border border-[var(--dph-green)] bg-[var(--dph-green-tint)] p-5">
          <p className="text-base font-semibold text-[var(--dph-green-deep)]">
            {pharmacyFirst.freeOnNhsCopy}
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-bold tracking-tight">
          The seven conditions we treat
        </h2>
        <div
          tabIndex={0}
          role="region"
          aria-label="Pharmacy First conditions and ages"
          className="mt-4 overflow-x-auto"
        >
          <table className="w-full min-w-[560px] border-collapse text-base">
            <caption className="sr-only">
              Pharmacy First conditions treated at Willowbrook Pharmacy, with age
              eligibility and what to expect
            </caption>
            <thead>
              <tr className="border-b-2 border-[var(--dph-line)]">
                <th scope="col" className="py-2 pr-4 text-left text-sm font-semibold text-[var(--dph-ink-soft)]">
                  Condition
                </th>
                <th scope="col" className="py-2 pr-4 text-left text-sm font-semibold text-[var(--dph-ink-soft)]">
                  Who it&rsquo;s for
                </th>
                <th scope="col" className="py-2 text-left text-sm font-semibold text-[var(--dph-ink-soft)]">
                  What to expect
                </th>
              </tr>
            </thead>
            <tbody>
              {pharmacyFirst.conditions.map((condition) => (
                <tr key={condition.condition} className="border-b border-[var(--dph-line)]">
                  <th scope="row" className="py-3 pr-4 text-left align-top font-semibold">
                    {condition.condition}
                    <span className="mt-0.5 block text-sm font-normal text-[var(--dph-ink-soft)]">
                      {condition.plainName}
                    </span>
                  </th>
                  <td className="py-3 pr-4 align-top text-[var(--dph-ink-soft)]">
                    {condition.ages}
                  </td>
                  <td className="py-3 align-top text-[var(--dph-ink-soft)]">{condition.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-[var(--dph-ink-soft)]">
          {pharmacyFirst.reviewedPathwaysNote}
        </p>
      </PharmacySection>

      <div className="bg-[var(--dph-mint)]">
        <PharmacySection pad="spacious">
          <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
          <ol className="mt-6 grid gap-8 sm:grid-cols-3">
            {pharmacyFirst.howItWorks.map((step, i) => (
              <li key={step.title}>
                <span className="text-sm font-bold text-[var(--dph-green)]">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-[var(--dph-ink-soft)]">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
        </PharmacySection>
      </div>

      <PharmacySection>
        <h2 className="text-2xl font-bold tracking-tight">How you can reach us</h2>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-[var(--dph-ink-soft)]">
          {pharmacyFirst.referralRoutes.map((route) => (
            <li key={route}>{route}</li>
          ))}
        </ul>
        <p className="mt-4 max-w-[680px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
          Your GP at{" "}
          <Link href="/demo/gp-practice" className="text-[var(--dph-green)] underline">
            Willowbrook Surgery
          </Link>{" "}
          can point you our way too — we work closely together, being two
          doors apart.
        </p>
        <PharmacyReviewDate reviewed={pharmacyFirst.reviewed} />
      </PharmacySection>
    </>
  );
}
