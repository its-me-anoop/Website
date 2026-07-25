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
              className="absolute -inset-5 rounded-[var(--r-2xl)] bg-[conic-gradient(from_120deg,rgba(27,143,161,0.35),rgba(232,154,42,0.3),rgba(199,62,111,0.3),rgba(27,143,161,0.35))] opacity-40 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[var(--r-xl)] border border-au-line-2 shadow-[var(--shadow-lg)]">
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
                className="absolute inset-x-0 bottom-0 h-[3px] bg-[image:var(--au-rule)]"
              />
            </div>
            <p className="au-plate-strong absolute -bottom-5 left-5 rounded-[var(--r-sm)] px-5 py-3 text-[13.5px] font-semibold text-au-ink [transform:translateZ(45px)]">
              {site.founder}
              <span className="au-label ml-2.5 text-[10px] text-au-teal-deep">
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
          className="au-display mt-5 max-w-[600px] text-[clamp(2.1rem,4.8vw,3.6rem)]"
          segments={[
            { text: "The person you brief is" },
            { text: "the person who builds.", tone: "muted" },
          ]}
        />
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-au-ink-2">
            Flutterly is the independent studio of {site.founder} — a designer
            and engineer in Reading, UK. No account managers, no hand-offs, no
            outsourcing: every website and app is designed, built and supported
            by the same pair of hands.
          </p>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.6] text-au-ink-2">
            That matters most in healthcare, where a website is often the first
            —&nbsp;and sometimes the only — way a patient or family reaches you.
            It has to work for everyone, every time.
          </p>
        </Reveal>
        <Reveal delay={0.26} className="mt-9 flex flex-wrap gap-3">
          <Btn href={`mailto:${site.email}`} tone="primary" arrow>
            Email {site.founder.split(" ")[0]}
          </Btn>
          <Btn href={site.social.linkedin} tone="plate" external>
            LinkedIn
          </Btn>
        </Reveal>
      </div>
    </Section>
  );
}
