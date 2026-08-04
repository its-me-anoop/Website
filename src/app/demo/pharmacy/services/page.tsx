import type { Metadata } from "next";
import {
  PharmacyFundingBadge,
  PharmacyPageHero,
  PharmacyReviewDate,
  PharmacySection,
} from "@/components/demos/pharmacy/PharmacyShell";
import { loadPharmacyContent } from "@/lib/cms/pharmacy";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  const { services } = loadPharmacyContent();

  return (
    <>
      <PharmacyPageHero
        title="Services"
        lede="Every service here is marked NHS (free) or Private (paid), so you always know what — if anything — it costs before you ask."
      />

      <PharmacySection>
        <div className="grid gap-5 sm:grid-cols-2">
          {services.services.map((service) => (
            <div
              key={service.slug}
              id={service.slug}
              className="scroll-mt-6 rounded-xl border border-[var(--dph-line)] bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-lg font-bold leading-snug">{service.title}</h3>
                <PharmacyFundingBadge funding={service.funding} />
              </div>
              <p className="mt-2 text-base leading-relaxed text-[var(--dph-ink-soft)]">
                {service.summary}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--dph-ink-soft)]">
                {service.walkIn ? <li>Walk in — no booking needed</li> : <li>Ask us to book you in</li>}
                {service.usesConsultationRoom ? <li>In our private consultation room</li> : null}
                {service.seasonal ? <li>Seasonal availability</li> : null}
              </ul>
              <details className="mt-3 group">
                <summary className="cursor-pointer text-base font-semibold text-[var(--dph-green)] underline-offset-2 hover:underline [&::-webkit-details-marker]:hidden">
                  More about this service
                </summary>
                <p className="mt-2 text-base leading-relaxed text-[var(--dph-ink-soft)]">
                  {service.details}
                </p>
              </details>
            </div>
          ))}
        </div>
        <PharmacyReviewDate reviewed={services.reviewed} />
      </PharmacySection>
    </>
  );
}
