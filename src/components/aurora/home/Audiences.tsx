"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { personas } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Container, SectionIntro } from "../ui/primitives";

/**
 * Who it is for: five numbered paper cards, then an ink card for
 * everyone else that leads to a conversation.
 */
export function Audiences() {
  return (
    <section id="who" className="a-paper-2 relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionIntro
          eyebrow="Who it is for"
          title={
            <>
              Built for the people who <em>answer the phone</em>.
            </>
          }
          copy="Every sector gets a site shaped around the questions its visitors actually arrive with."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((p, i) => (
            <Reveal as="li" key={p.who} delay={i * 0.06} className="h-full">
              <article className="a-card a-card-hover flex h-full flex-col gap-4 rounded-[20px] p-7">
                <span className="a-mono text-[12px] tracking-[0.1em] text-a-gold">0{i + 1}</span>
                <h3 className="a-display text-[26px]">{p.who}</h3>
                <p className="text-[15.5px] leading-[1.6] text-a-ink-soft">{p.statement}</p>
              </article>
            </Reveal>
          ))}
          <Reveal as="li" delay={personas.length * 0.06} className="h-full">
            <Link
              href="#contact"
              className="a-on-ink a-card group flex h-full flex-col justify-between gap-6 rounded-[20px] border-transparent p-7"
            >
              <span className="a-mono text-[12px] uppercase tracking-[0.1em] text-a-amber">Something else?</span>
              <span className="a-display text-[26px]">
                A product idea, a housing provider, a charity. Start with a conversation.
              </span>
              <span className="inline-flex items-center gap-2 text-[15.5px] text-a-amber">
                Book a call
                <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}
