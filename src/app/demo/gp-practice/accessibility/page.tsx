import type { Metadata } from "next";
import { GpPageHero, GpSection } from "@/components/demos/gp/GpShell";
import { practice } from "@/components/demos/gp/data";

export const metadata: Metadata = { title: "Accessibility statement" };

export default function GpAccessibilityPage() {
  return (
    <>
      <GpPageHero
        title="Accessibility statement"
        lede="This website is designed so every patient can use it — whatever device, connection or assistive technology they rely on."
      />

      <GpSection className="max-w-[820px]">
        <div className="space-y-7 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          <section>
            <h2 className="text-[20px] font-bold tracking-tight text-[var(--dgp-ink)]">
              Our commitment
            </h2>
            <p className="mt-2">
              {practice.name}&rsquo;s website aims to meet the Web Content
              Accessibility Guidelines (WCAG) 2.2 at level AA, in line with the
              Public Sector Bodies (Websites and Mobile Applications) (No.&nbsp;2)
              Accessibility Regulations 2018.
            </p>
          </section>
          <section>
            <h2 className="text-[20px] font-bold tracking-tight text-[var(--dgp-ink)]">
              What that means for you
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Every page works with a keyboard alone, with a clear focus indicator</li>
              <li>Text and background colours meet AA contrast standards</li>
              <li>Content is written in plain English and structured with headings</li>
              <li>The site works with screen readers and text magnification</li>
              <li>Pages load quickly, even on a slow mobile connection</li>
            </ul>
          </section>
          <section>
            <h2 className="text-[20px] font-bold tracking-tight text-[var(--dgp-ink)]">
              Tell us if something isn&rsquo;t working
            </h2>
            <p className="mt-2">
              If any part of this website is difficult to use with assistive
              technology, please tell reception on{" "}
              <a href={practice.phoneHref} className="text-[var(--dgp-blue)] underline">
                {practice.phone}
              </a>{" "}
              and it will be treated as a fault to fix, not feedback to file.
            </p>
          </section>
          <p className="border-t border-[var(--dgp-line)] pt-5 text-sm">
            This statement is part of a sample website built by Flutterly and
            was last reviewed in July 2026.
          </p>
        </div>
      </GpSection>
    </>
  );
}
