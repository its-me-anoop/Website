"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/site";
import { samples } from "@/lib/marketing/content";
import { ScrollTilt } from "../effects/Motion";
import { useMotionAllowed } from "../effects/hooks";
import { BrowserFrame, Container } from "../ui/primitives";

const chips = [
  { text: "Appointments in one tap", pos: "left-[-2%] top-[18%]", speed: -80 },
  { text: "NHS App signposting", pos: "right-[-3%] top-[8%]", speed: -140 },
  { text: "AA contrast on every pair", pos: "left-[6%] bottom-[10%]", speed: -40 },
  { text: "Static-first, fast on 3G", pos: "right-[4%] bottom-[22%]", speed: -110 },
] as const;

function Chip({ text, pos, speed }: (typeof chips)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const motion = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  return (
    <m.div
      ref={ref}
      style={motion ? { y } : undefined}
      className={`a-glass absolute z-10 hidden items-center gap-2.5 rounded-full px-4 py-2.5 text-[13.5px] text-a-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] md:flex ${pos}`}
    >
      <span aria-hidden className="h-2 w-2 rounded-full bg-a-lime shadow-[0_0_10px_2px_rgba(212,255,79,0.6)]" />
      {text}
    </m.div>
  );
}

/**
 * A raked 3D plane of the GP sample site that stands up as it scrolls
 * into view, with glass callouts drifting at different depths.
 */
export function Showreel() {
  const gp = samples[0];
  return (
    <section aria-label="Willowbrook Surgery sample site preview" className="relative -mt-4 pb-12 sm:pb-20">
      <Container className="relative max-w-[1180px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[10%] top-[20%] h-[60%] rounded-full opacity-60 blur-[100px]"
          style={{ background: "linear-gradient(90deg,#6d5bff,#1fb8c9,#a6d93a)" }}
        />
        <ScrollTilt>
          <a href={gp.href} aria-label={`Open the ${gp.name} sample website`} className="relative block rounded-[22px]">
            <BrowserFrame src={gp.image} alt={gp.imageAlt} url={`${site.domain}${gp.href}`} sizes="(min-width: 1180px) 1140px, 94vw" />
          </a>
        </ScrollTilt>
        {chips.map((chip) => (
          <Chip key={chip.text} {...chip} />
        ))}
      </Container>
    </section>
  );
}
