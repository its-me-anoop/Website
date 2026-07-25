"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { Parallax, Reveal, TextReveal, Tilt } from "@/components/fx";
import { Btn, Eyebrow, Section } from "../primitives";

export function About() {
  return (
    <Section id="about" className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
      <Parallax distance={40} className="mx-auto w-full max-w-[380px]">
        <Tilt strength={6}>
          <div className="relative">
            <span
              aria-hidden
              className="absolute -inset-6 rounded-[40px] bg-[conic-gradient(from_120deg,rgba(47,216,173,0.35),rgba(92,178,255,0.25),rgba(164,140,255,0.3),rgba(47,216,173,0.35))] opacity-45 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[28px] border border-white/12">
              <Image
                src="/anoop-jose.jpg"
                alt="Anoop Jose, founder of Flutterly"
                width={760}
                height={950}
                sizes="(max-width: 1024px) 80vw, 380px"
                className="h-auto w-full object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(4,9,12,0.7)_100%)]"
              />
            </div>
            <p className="au-glass-strong absolute -bottom-5 left-5 rounded-2xl px-5 py-3 text-[13.5px] font-medium text-au-ink [transform:translateZ(45px)]">
              {site.founder}
              <span className="au-mono ml-2 text-[11px] uppercase tracking-[0.16em] text-au-teal">
                Founder
              </span>
            </p>
          </div>
        </Tilt>
      </Parallax>

      <div>
        <Reveal>
          <Eyebrow>About the studio</Eyebrow>
        </Reveal>
        <TextReveal
          as="h2"
          delay={0.06}
          className="mt-5 max-w-[600px] text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.035em]"
          segments={[
            { text: "The person you brief" },
            { text: "is the person who builds.", tone: "gradient" },
          ]}
        />
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-[560px] text-[16.5px] leading-relaxed text-au-ink-2">
            Flutterly is the independent studio of {site.founder} — a designer
            and engineer in Reading, UK. No account managers, no hand-offs, no
            outsourcing: every website and app is designed, built and supported
            by the same pair of hands.
          </p>
          <p className="mt-4 max-w-[560px] text-[16.5px] leading-relaxed text-au-ink-2">
            That matters most in healthcare, where a website is often the first
            —&nbsp;and sometimes the only — way a patient or family reaches you.
            It has to work for everyone, every time.
          </p>
        </Reveal>
        <Reveal delay={0.26} className="mt-9 flex flex-wrap gap-3">
          <Btn href={`mailto:${site.email}`} tone="primary" arrow>
            Email {site.founder.split(" ")[0]}
          </Btn>
          <Btn href={site.social.linkedin} tone="glass" external>
            LinkedIn
          </Btn>
        </Reveal>
      </div>
    </Section>
  );
}
