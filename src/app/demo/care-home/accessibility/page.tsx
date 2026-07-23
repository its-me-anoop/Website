import type { Metadata } from "next";
import {
  CarePageHero,
  CareSection,
} from "@/components/demos/care/CareShell";
import { home } from "@/components/demos/care/data";

export const metadata: Metadata = { title: "Accessibility statement" };

export default function CareAccessibilityPage() {
  return (
    <>
      <CarePageHero
        eyebrow="Accessibility"
        title="A website every relative can use"
        lede="Many of our visitors are in their seventies and eighties, browsing on a tablet late at night. This website is designed for exactly that."
      />

      <CareSection className="max-w-[820px]">
        <div className="space-y-7 text-[15.5px] leading-relaxed text-[var(--dch-soft)]">
          <section>
            <h2 className="dch-display text-[20px] font-bold text-[var(--dch-ink)]">
              Our commitment
            </h2>
            <p className="mt-2">
              {home.name}&rsquo;s website aims to meet the Web Content
              Accessibility Guidelines (WCAG) 2.2 at level AA.
            </p>
          </section>
          <section>
            <h2 className="dch-display text-[20px] font-bold text-[var(--dch-ink)]">
              What that means in practice
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Comfortable text sizes and strong colour contrast throughout</li>
              <li>Every page works with a keyboard alone, with a visible focus style</li>
              <li>Plain-English content, structured with clear headings</li>
              <li>Works with screen readers and text magnification</li>
              <li>Fast to load, even on a slow connection</li>
            </ul>
          </section>
          <section>
            <h2 className="dch-display text-[20px] font-bold text-[var(--dch-ink)]">
              Something not working?
            </h2>
            <p className="mt-2">
              Tell us on{" "}
              <a href={home.phoneHref} className="font-semibold text-[var(--dch-terra)] underline underline-offset-2">
                {home.phone}
              </a>{" "}
              and we will fix it — and help you with whatever you were trying
              to do in the meantime.
            </p>
          </section>
          <p className="border-t border-[var(--dch-line)] pt-5 text-[13.5px]">
            This statement is part of a sample website built by Flutterly and
            was last reviewed in July 2026.
          </p>
        </div>
      </CareSection>
    </>
  );
}
