"use client";

import { Building2, HeartHandshake, Pill, Smile, Stethoscope } from "lucide-react";
import { personas } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { Reveal } from "../effects/Motion";
import { Container, SectionIntro } from "../ui/primitives";

const icons = [Stethoscope, HeartHandshake, Smile, Pill, Building2] as const;
const layout = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "",
  "",
  "md:col-span-2",
] as const;
const glow = [
  "rgba(255,122,26,0.35)",
  "rgba(255,194,74,0.3)",
  "rgba(255,176,32,0.25)",
  "rgba(232,64,31,0.3)",
  "rgba(255,90,54,0.25)",
] as const;

/** Who it is for, as a bento of spotlight cards. The first card leads. */
export function Audiences() {
  return (
    <section id="who" className="relative scroll-mt-24 py-24 sm:py-32">
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
        <ul className="mt-14 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-4">
          {personas.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={p.who} delay={i * 0.06} className={cn("h-full", layout[i])}>
                <article className="a-glass a-spot group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-50 blur-[70px] transition-opacity duration-700 group-hover:opacity-90"
                    style={{ background: glow[i] }}
                  />
                  <span
                    aria-hidden
                    className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-a-line-2 bg-white/5 text-a-ink"
                  >
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <div className="relative mt-10">
                    <h3 className={cn("a-display", i === 0 ? "text-[clamp(2rem,3.4vw,3rem)]" : "text-[26px]")}>{p.who}</h3>
                    <p
                      className={cn(
                        "mt-3 leading-[1.6] text-a-ink-soft",
                        i === 0 ? "max-w-[46ch] text-[17px]" : "text-[15px]"
                      )}
                    >
                      {p.statement}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
