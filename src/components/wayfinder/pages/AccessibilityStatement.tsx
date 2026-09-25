import type { ReactNode } from "react";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { Container } from "../ui/Type";

/**
 * Accessibility statement layout. The route owns the words (so the
 * statement is reviewed in one place); this component owns the look:
 * a plain document, each section a ruled row.
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
        kicker="Accessibility"
        size="lg"
        title={
          <>
            Accessibility <mark className="wf-mark">statement</mark>
          </>
        }
        copy={<p>{description}</p>}
      />
      <Container className="max-w-[1080px] py-16 sm:py-20">
        <div className="border-t-2 border-wf-ink">
          {sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-4 border-b-[1.5px] border-wf-line-2 py-8 md:grid-cols-[minmax(0,260px)_1fr] md:gap-10"
            >
              <h2 className="text-[22px] font-extrabold tracking-[-0.02em]">{section.title}</h2>
              <div className="max-w-[64ch] space-y-4 text-[17px] leading-[1.7] text-wf-ink-soft [&_a]:font-bold [&_a]:text-wf-ink [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-4 [&_li]:ml-5 [&_ul]:list-disc">
                {section.body}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-8 text-[15px] text-wf-muted">This statement was last reviewed in {reviewed}.</p>
      </Container>
    </Shell>
  );
}
