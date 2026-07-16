"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { showcaseSlides } from "./data";
import {
  ArrowButton,
  EASE,
  Eyebrow,
  HandleChip,
  RevealWords,
  Rise,
} from "./primitives";

/* Variant functions re-resolve with the presence context's fresh
   `custom` when a slide exits, so reversing direction animates the
   outgoing slide to the correct side (a plain exit object would replay
   the direction captured at the slide's last render). */
const slideVariants = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
};

export function Showcase() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const slide = showcaseSlides[index];

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + showcaseSlides.length) % showcaseSlides.length);
  };

  const CtaTag = slide.project.internal ? Link : "a";

  return (
    <section id="featured" className="mx-auto w-full max-w-[1240px] px-5 py-14 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow className="mb-5">Featured work · Studio of Anoop Jose</Eyebrow>
          <RevealWords
            as="h2"
            className="max-w-[560px] text-[clamp(2.2rem,5.4vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.035em]"
            segments={[{ text: "Gateway to serious products." }]}
          />
        </div>
        <HandleChip handle="@anoop" tone="dark" className="mb-2 mr-4 hidden sm:inline-flex" />
      </div>

      <Rise delay={0.15} className="relative mt-10">
        <div
          className="relative h-[clamp(340px,52vw,560px)] overflow-hidden rounded-[32px]"
          aria-live="polite"
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <m.div
              key={slide.project.name}
              className="absolute inset-0"
              style={{ backgroundColor: slide.panel }}
              custom={direction}
              variants={slideVariants}
              initial={reduce ? false : "enter"}
              animate={reduce ? { x: 0, opacity: 1 } : "center"}
              exit={reduce ? { opacity: 0 } : "exit"}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="liquid absolute left-6 top-6 z-10 max-w-[calc(100%-7rem)] truncate rounded-full px-4 py-1.5 text-[12.5px] font-medium">
                {slide.eyebrow}
              </div>

              <div className="absolute inset-0 flex items-center justify-center p-10 sm:p-14">
                <div className="relative h-full w-full max-w-[760px]">
                  <Image
                    src={slide.project.image}
                    alt={`${slide.project.name} — ${slide.project.type}`}
                    fill
                    sizes="(max-width: 1240px) 90vw, 760px"
                    className="object-contain drop-shadow-[0_30px_50px_rgba(34,33,31,0.25)]"
                  />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
                <CtaTag
                  href={slide.project.href}
                  {...(slide.project.internal
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  className="liquid rounded-full px-5 py-2.5 text-[13.5px] font-medium transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {slide.cta}
                </CtaTag>
                <span className="hidden text-[13px] font-medium text-at-ink/70 sm:block">
                  {slide.project.name} · {slide.project.year}
                </span>
              </div>
            </m.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="absolute right-7 top-7 z-10 flex items-center gap-1.5">
            {showcaseSlides.map((s, i) => (
              <button
                key={s.project.name}
                type="button"
                aria-label={`Show ${s.project.name}`}
                aria-current={i === index}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={
                  i === index
                    ? "h-2 w-5 rounded-full bg-at-ink/80 transition-all"
                    : "h-2 w-2 rounded-full bg-at-ink/30 transition-all hover:bg-at-ink/50"
                }
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="absolute bottom-6 right-6 z-10 flex gap-2">
            <ArrowButton direction="prev" label="Previous project" onClick={() => go(-1)} />
            <ArrowButton direction="next" label="Next project" onClick={() => go(1)} />
          </div>
        </div>
      </Rise>
    </section>
  );
}
