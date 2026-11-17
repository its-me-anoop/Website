"use client";

import type { ReactNode } from "react";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { Container } from "../ui/primitives";

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
      <PageHero eyebrow="Accessibility" size="lg" title={<>Accessibility <em>statement.</em></>} copy={<p>{description}</p>} />
      <div className="tone-white">
        <Container className="inner-document">
          <nav aria-label="Statement contents">
            <p className="inner-kicker">On this page</p>
            <ul className="mt-4">
              {sections.map((section, i) => (
                <li key={section.title}><a href={`#statement-${i + 1}`}>{section.title}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            {sections.map((section, i) => (
              <section key={section.title} id={`statement-${i + 1}`}>
                <h2 className="s-display">{section.title}</h2>
                <div className="text-s-ink-soft">{section.body}</div>
              </section>
            ))}
            <p className="mt-8 text-sm text-s-muted">Last reviewed in {reviewed}.</p>
          </div>
        </Container>
      </div>
    </Shell>
  );
}
