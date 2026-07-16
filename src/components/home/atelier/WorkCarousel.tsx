"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { site } from "@/lib/site";
import { projects } from "./data";
import { ArrowButton, Eyebrow, Pill, RevealWords, Rise } from "./primitives";

export function WorkCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth, 640), behavior: "smooth" });
  };

  return (
    <section id="work" className="mx-auto w-full max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-14">
        {/* Heading column */}
        <div>
          <Eyebrow className="mb-5">
            Get more <span className="text-at-violet">closer</span>
          </Eyebrow>
          <RevealWords
            as="h2"
            className="text-[clamp(2.2rem,5.4vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.035em]"
            segments={[{ text: "Work with a point of view." }]}
          />
          <Rise delay={0.15}>
            <p className="mt-5 max-w-[330px] text-[14.5px] leading-relaxed text-at-ink-soft">
              A mix of owned products and client work — every one of them
              designed, engineered and shipped by the same pair of hands.
            </p>
          </Rise>
          <Rise delay={0.25} className="mt-8 flex items-center gap-3">
            <Pill href={site.social.github} tone="violet" external>
              View all on GitHub <ArrowUpRight size={15} aria-hidden />
            </Pill>
          </Rise>

          <div className="mt-10 hidden gap-2 lg:flex">
            <ArrowButton direction="prev" label="Scroll work backwards" onClick={() => nudge(-1)} />
            <ArrowButton direction="next" label="Scroll work forwards" onClick={() => nudge(1)} />
          </div>
        </div>

        {/* Track */}
        <div className="min-w-0">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project) => {
              const Tag = project.internal ? Link : "a";
              return (
                <Tag
                  key={project.name}
                  href={project.href}
                  {...(project.internal
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  className="group w-[240px] shrink-0 snap-start sm:w-[270px]"
                >
                  <div
                    className="relative h-[300px] overflow-hidden rounded-3xl sm:h-[330px]"
                    style={{ backgroundColor: project.tint }}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.name} — ${project.type}`}
                      fill
                      sizes="270px"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-at-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight size={15} aria-hidden />
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3 px-1">
                    <h3 className="text-[16.5px] font-medium tracking-tight text-at-ink">
                      {project.name}
                    </h3>
                    <span className="whitespace-nowrap text-[12.5px] text-at-muted">
                      {project.type} · {project.year}
                    </span>
                  </div>
                  <p className="mt-1.5 px-1 text-[13.5px] leading-relaxed text-at-ink-soft">
                    {project.description}
                  </p>
                </Tag>
              );
            })}

            {/* Start-yours card */}
            <a
              href={`mailto:${site.email}`}
              className="group flex w-[240px] shrink-0 snap-start flex-col sm:w-[270px]"
            >
              <div className="flex h-[300px] flex-col items-center justify-center gap-4 rounded-3xl bg-at-dark text-at-dark-ink sm:h-[330px]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:rotate-90">
                  <Plus size={22} aria-hidden />
                </span>
                <span className="max-w-[170px] text-center text-[15px] font-medium leading-snug">
                  Your product could be next
                </span>
              </div>
              <div className="mt-4 px-1 text-[13.5px] text-at-ink-soft">
                Start a conversation → {site.email}
              </div>
            </a>
          </div>

          {/* Progress rail */}
          <div className="mt-4 flex items-center gap-6">
            <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-at-line-2">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-at-ink transition-[width] duration-150"
                style={{ width: `${Math.max(12, progress * 100)}%` }}
              />
            </div>
            <div className="flex gap-2 lg:hidden">
              <ArrowButton direction="prev" label="Scroll work backwards" onClick={() => nudge(-1)} />
              <ArrowButton direction="next" label="Scroll work forwards" onClick={() => nudge(1)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
