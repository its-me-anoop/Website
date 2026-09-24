"use client";

import { personas } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Container, SectionIntro } from "../ui/primitives";

/** Who it is for: one row per audience, name left, what changes for them right. */
export function Audiences() {
  return (
    <section id="who" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <SectionIntro
          label="Who it is for"
          title={
            <>
              For the people who <em>answer the phone</em>.
            </>
          }
          copy="Every sector gets a site shaped around the questions its visitors actually arrive with."
        />
        <ul className="mt-14 border-t border-s-line">
          {personas.map((p, i) => (
            <Reveal
              as="li"
              key={p.who}
              delay={i * 0.04}
              className="grid gap-3 border-b border-s-line py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10"
            >
              <h3 className="s-display text-[clamp(1.7rem,3vw,2.4rem)]">{p.who}</h3>
              <p className="max-w-[60ch] text-[18px] leading-[1.6] text-s-on-ink-2 md:pt-1">{p.statement}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
