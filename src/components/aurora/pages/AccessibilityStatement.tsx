"use client";

import type { ReactNode } from "react";
import { Reveal } from "../effects/Motion";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { Container } from "../ui/primitives";

/**
 * Accessibility statement layout. The route owns the words (so the
 * statement is reviewed in one place); this component owns the look.
 */
export function AccessibilityStatement({
  description,
  sections,
  reviewed,
}: {
  description: string;
  sections: readonly { title: string; body: ReactNode }[];
  reviewed: string;
}) {
  return (
    <Shell>
      <PageHero
        eyebrow="Accessibility"
        size="lg"
        title={
          <>
            Accessibility <em>statement</em>
          </>
        }
        copy={<p>{description}</p>}
      />
      <Container className="max-w-[980px] pb-28">
        <div className="grid gap-4">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.05}>
              <section className="a-glass a-spot grid gap-4 rounded-[26px] p-7 sm:p-9 md:grid-cols-[minmax(0,240px)_1fr] md:gap-10">
                <h2 className="a-display text-[24px]">{section.title}</h2>
                <div className="max-w-[62ch] text-[16px] leading-[1.7] text-a-ink-soft">{section.body}</div>
              </section>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-[13.5px] text-a-muted">This statement was last reviewed in {reviewed}.</p>
      </Container>
    </Shell>
  );
}
