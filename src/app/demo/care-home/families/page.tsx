import type { Metadata } from "next";
import {
  CareButton,
  CareHeading,
  CarePageHero,
  CareSection,
} from "@/components/demos/care/CareShell";
import { faqs, familySteps } from "@/components/demos/care/data";

export const metadata: Metadata = { title: "For families" };

export default function FamiliesPage() {
  return (
    <>
      <CarePageHero
        eyebrow="For families"
        title="Choosing care is hard. The facts shouldn't be."
        lede="Everything a family needs to decide — how moving in works, what it costs, and the questions everyone asks — answered plainly on one page."
      />

      <CareSection>
        <CareHeading eyebrow="How it works">
          From first call to feeling at home
        </CareHeading>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {familySteps.map((step) => (
            <li
              key={step.title}
              className="rounded-3xl border border-[var(--dch-line)] bg-[var(--dch-surface)] p-6"
            >
              <h3 className="dch-display text-[17px] font-bold text-[var(--dch-terra)]">
                {step.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--dch-soft)]">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>
      </CareSection>

      <div className="bg-[var(--dch-surface)]">
        <CareSection>
          <CareHeading eyebrow="Questions families ask">
            Asked and answered, honestly
          </CareHeading>
          <div className="mt-8 max-w-[760px] divide-y divide-[var(--dch-line)] rounded-3xl border border-[var(--dch-line)] bg-[var(--dch-canvas)]">
            {faqs.map((faq) => (
              <details key={faq.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-[var(--dch-ink)] [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    aria-hidden
                    className="text-[20px] leading-none text-[var(--dch-terra)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[620px] text-[15px] leading-relaxed text-[var(--dch-soft)]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </CareSection>
      </div>

      <CareSection>
        <div className="rounded-3xl bg-[var(--dch-cream)] p-8 sm:p-10">
          <CareHeading eyebrow="Paying for care">
            Clear fees, published like they should be
          </CareHeading>
          <p className="mt-4 max-w-[640px] text-[15.5px] leading-relaxed text-[var(--dch-soft)]">
            Residential care at Oakfield starts from £1,350 per week, dementia
            care from £1,495, and respite stays from £1,400. One weekly fee
            covers everything day to day — care, meals, laundry, activities and
            trips. The only extras are personal ones, like hairdressing and
            chiropody, always agreed in advance.
          </p>
          <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[var(--dch-soft)]">
            If care may be funded by the local authority or NHS, we will help
            you understand the process before any decision is made.
          </p>
          <div className="mt-6">
            <CareButton href="/demo/care-home/contact">
              Talk it through with Sarah
            </CareButton>
          </div>
        </div>
      </CareSection>
    </>
  );
}
