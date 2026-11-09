"use client";

import type { ReactNode } from "react";
import { Reveal } from "../effects/Motion";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { Container } from "../ui/primitives";

/**
 * Accessibility statement layout. The route owns the words (so the
 * statement is reviewed in one place); this component owns the look:
 * a plain numbered document, one ruled row per section.
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
      <div className="tone-white">
        <Container className="max-w-[1080px] py-16 sm:py-24">
          <div className="border-t-2 border-s-rule">
            {sections.map((section, i) => (
              <Reveal key={section.title} turn={0} delay={i * 0.04}>
                <section className="grid gap-4 border-b-[1.5px] border-s-line-2 py-8 md:grid-cols-[3rem_minmax(0,260px)_1fr] md:gap-8">
                  <span aria-hidden className="s-label s-num pt-1.5 text-[13px] text-s-accent">
                    0{i + 1}
                  </span>
                  <h2 className="s-display text-[24px]">{section.title}</h2>
                  <div className="max-w-[62ch] text-[16.5px] leading-[1.65] text-s-ink-soft">{section.body}</div>
                </section>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[14.5px] text-s-muted">This statement was last reviewed in {reviewed}.</p>
        </Container>
      </div>
    </Shell>
  );
}
