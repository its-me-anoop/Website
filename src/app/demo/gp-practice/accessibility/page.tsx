import type { Metadata } from "next";
import {
  GpPageHero,
  GpReviewDate,
  GpSection,
} from "@/components/demos/gp/GpShell";
import { loadGpContent } from "@/lib/cms";

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
      <h2 className="text-[20px] font-bold tracking-tight text-[var(--dgp-ink)]">
        {title}
      </h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

export default function GpAccessibilityPage() {
  const { accessibility, practice } = loadGpContent();

  return (
    <>
      <GpPageHero
        title="Accessibility statement"
        lede="This website is designed so every patient can use it — whatever device, connection or assistive technology they rely on."
      />

      <GpSection className="max-w-[820px]">
        <div className="space-y-8 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
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
                className="text-[var(--dgp-blue)] underline"
              >
                {accessibility.reporting.email}
              </a>{" "}
              or call reception on{" "}
              <a href={practice.phoneHref} className="text-[var(--dgp-blue)] underline">
                {practice.phone}
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

          <p className="border-t border-[var(--dgp-line)] pt-5 text-sm">
            This statement is part of a sample website built by Flutterly.
          </p>
        </div>
        <GpReviewDate reviewed={accessibility.reviewed} />
      </GpSection>
    </>
  );
}
