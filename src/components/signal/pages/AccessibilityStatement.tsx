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
        label="Accessibility"
        size="lg"
        title={
          <>
            Accessibility <em>statement</em>
          </>
        }
        copy={<p>{description}</p>}
      />
      <Container className="pb-28">
        <div className="border-t border-s-line">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.04}>
              <section className="grid gap-4 border-b border-s-line py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
                <h2 className="s-display text-[28px]">{section.title}</h2>
                <div className="max-w-[62ch] text-[18px] leading-[1.65] text-s-on-ink-2">{section.body}</div>
              </section>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-[15px] text-s-on-ink-2">This statement was last reviewed in {reviewed}.</p>
      </Container>
    </Shell>
  );
}
