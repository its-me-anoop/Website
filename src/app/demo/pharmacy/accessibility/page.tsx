import type { Metadata } from "next";
import {
  PharmacyPageHero,
  PharmacyReviewDate,
  PharmacySection,
} from "@/components/demos/pharmacy/PharmacyShell";
import { loadPharmacyContent } from "@/lib/cms/pharmacy";

export const metadata: Metadata = { title: "Accessibility statement" };

function StatementSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[20px] font-bold tracking-tight text-[var(--dph-ink)]">
        {title}
      </h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

export default function PharmacyAccessibilityPage() {
  const { accessibility, pharmacy } = loadPharmacyContent();

  return (
    <>
      <PharmacyPageHero
        title="Accessibility statement"
        lede="This website is designed so every patient can use it — whatever device, connection or assistive technology they rely on."
      />

      <PharmacySection className="max-w-[820px]">
        <div className="space-y-8 text-base leading-relaxed text-[var(--dph-ink-soft)]">
          <StatementSection title="Compliance status">
            <p>{accessibility.compliance}</p>
          </StatementSection>

          <StatementSection title="What that means for you">
            <ul className="list-disc space-y-1.5 pl-5">
              {accessibility.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </StatementSection>

          <StatementSection title="Content that is not fully accessible">
            <ul className="list-disc space-y-1.5 pl-5">
              {accessibility.nonAccessible.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </StatementSection>

          <StatementSection title="How this statement was prepared">
            <p>{accessibility.testing}</p>
          </StatementSection>

          <StatementSection title="Tell us if something isn't working">
            <p>{accessibility.reporting.copy}</p>
            <p>
              Email{" "}
              <a
                href={`mailto:${accessibility.reporting.email}`}
                className="text-[var(--dph-green)] underline"
              >
                {accessibility.reporting.email}
              </a>{" "}
              or call us on{" "}
              <a href={pharmacy.phoneHref} className="text-[var(--dph-green)] underline">
                {pharmacy.phone}
              </a>
              .
            </p>
          </StatementSection>

          <StatementSection title="Enforcement procedure">
            <p>{accessibility.enforcement}</p>
          </StatementSection>

          <StatementSection title="Content we do not control">
            <p>{accessibility.thirdParty}</p>
          </StatementSection>

          <StatementSection title="Why there is no accessibility toolbar">
            <p>{accessibility.noOverlay}</p>
          </StatementSection>

          <p className="border-t border-[var(--dph-line)] pt-5 text-sm">
            This statement is part of a sample website built by Flutterly.
          </p>
        </div>
        <PharmacyReviewDate reviewed={accessibility.reviewed} />
      </PharmacySection>
    </>
  );
}
