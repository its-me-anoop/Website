import type { Metadata } from "next";
import {
  PharmacyHoursTable,
  PharmacyMiniMap,
  PharmacyPageHero,
  PharmacyReviewDate,
  PharmacySection,
} from "@/components/demos/pharmacy/PharmacyShell";
import { loadPharmacyContent } from "@/lib/cms/pharmacy";

export const metadata: Metadata = { title: "Hours, find us & feedback" };

export default function ContactPage() {
  const { pharmacy, feedback } = loadPharmacyContent();

  return (
    <>
      <PharmacyPageHero
        title="Hours, find us & feedback"
        lede="When we're open, how to find us, and how to raise a concern if something isn't right."
      />

      <PharmacySection>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Opening times</h2>
            <div className="mt-4">
              <PharmacyHoursTable openingTimes={pharmacy.openingTimes} />
            </div>
            <p className="mt-3 max-w-[480px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
              {pharmacy.bankHolidayCopy}
            </p>
            {pharmacy.deliveryOffered ? (
              <p className="mt-4 max-w-[480px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
                {pharmacy.deliveryCopy}
              </p>
            ) : null}
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Find us</h2>
            <ul className="mt-4 space-y-2 text-base leading-relaxed">
              <li>
                <strong>Address:</strong>{" "}
                <span className="text-[var(--dph-ink-soft)]">{pharmacy.address}</span>
              </li>
              <li>
                <strong>Telephone:</strong>{" "}
                <a href={pharmacy.phoneHref} className="text-[var(--dph-green)] underline">
                  {pharmacy.phone}
                </a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${pharmacy.email}`}
                  className="text-[var(--dph-green)] underline"
                >
                  {pharmacy.email}
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <PharmacyMiniMap />
            </div>
          </div>
        </div>
      </PharmacySection>

      <div className="bg-[var(--dph-mint)]">
        <PharmacySection pad="spacious">
          <h2 className="text-2xl font-bold tracking-tight">Feedback & complaints</h2>
          <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
            {feedback.responseCommitment}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {feedback.howToRaise.map((step) => (
              <div key={step.title}>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-[var(--dph-ink-soft)]">
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </PharmacySection>
      </div>

      <PharmacySection>
        <h2 className="text-[20px] font-bold tracking-tight">
          NHS services we provide
        </h2>
        <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
          {feedback.nhsServiceComplaintsRoute}
        </p>

        <h2 className="mt-8 text-[20px] font-bold tracking-tight">
          Medicine-safety concerns
        </h2>
        <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
          {feedback.medicineSafetyCopy}
        </p>
        <PharmacyReviewDate reviewed={feedback.reviewed} />
      </PharmacySection>
    </>
  );
}
