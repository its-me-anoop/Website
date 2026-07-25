"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, useSpotlight } from "@/components/fx";
import { projects } from "../data";
import { Section, SectionHead } from "../primitives";

function WorkCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const onPointerMove = useSpotlight();
  const external = !project.internal;
  const feature = index < 2;

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <span
          aria-hidden
          className="absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_45%,rgba(6,13,17,0.85)_100%)]"
        />
        <Image
          src={project.image}
          alt={`${project.name} — ${project.type}`}
          fill
          sizes={feature ? "(max-width: 1024px) 92vw, 560px" : "(max-width: 1024px) 92vw, 300px"}
          className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          style={{ backgroundColor: project.tint }}
        />
        {project.status ? (
          <span className="absolute left-4 top-4 z-20 rounded-full border border-au-amber/30 bg-[#0a1014]/80 px-3 py-1 text-[11.5px] font-medium text-au-amber backdrop-blur-md">
            {project.status}
          </span>
        ) : null}
      </div>

      <div className="relative flex grow flex-col p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[19px] font-medium tracking-tight text-au-ink">
            {project.name}
          </h3>
          <span className="au-mono shrink-0 text-[11px] uppercase tracking-[0.14em] text-au-muted">
            {project.type} · {project.year}
          </span>
        </div>
        <p className="mt-2.5 text-[14px] leading-relaxed text-au-ink-3">
          {project.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <ul className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[11.5px] font-medium text-au-ink-3"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-au-teal transition-all duration-500 group-hover:border-au-teal/40 group-hover:bg-au-teal group-hover:text-au-teal-ink"
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </>
  );

  const className =
    "au-glass au-spot group relative flex h-full flex-col overflow-hidden rounded-[26px] transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-white/22";

  return (
    <Reveal
      delay={(index % 3) * 0.08}
      className={feature ? "lg:col-span-6" : "lg:col-span-3"}
    >
      {external ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          data-project-card
          onPointerMove={onPointerMove}
          className={className}
        >
          {inner}
        </a>
      ) : (
        <Link
          href={project.href}
          data-project-card
          onPointerMove={onPointerMove}
          className={className}
        >
          {inner}
        </Link>
      )}
    </Reveal>
  );
}

/**
 * Proof. Six live products and client sites, the first two given the
 * wide slots. Each card is one link — the whole surface is the target.
 */
export function Work() {
  return (
    <Section id="work">
      <SectionHead
        eyebrow="Selected work"
        title={[
          { text: "Live products." },
          { text: "Real organisations.", tone: "muted" },
        ]}
        copy="Client sites you can visit today and products you can download — the evidence behind every promise on this page."
      />
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
        {projects.map((project, i) => (
          <WorkCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
