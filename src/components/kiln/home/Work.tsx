"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data";
import { Display, Eyebrow, Rise, Tag } from "../primitives";
import { cn } from "@/lib/utils";

function WorkTile({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const external = !project.internal;
  const wide = index < 2;
  const contain = project.fit === "contain";
  return (
    <Rise
      as="li"
      delay={(index % 4) * 0.06}
      className={cn(wide ? "lg:col-span-6" : "lg:col-span-3")}
    >
      <a
        href={project.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-project-card
        className="group block rounded-[14px] focus-visible:outline-offset-4"
      >
        <span
          className={cn(
            "relative block overflow-hidden rounded-[14px] ring-1 ring-k-line",
            wide ? "aspect-[16/10]" : "aspect-[4/3]"
          )}
          style={{ backgroundColor: project.tint }}
        >
          <Image
            src={project.image}
            alt={`${project.name}: ${project.type}`}
            fill
            sizes={wide ? "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 620px" : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px"}
            className={cn(
              "transition-transform duration-700 ease-out group-hover:scale-[1.03]",
              contain ? "object-contain object-bottom p-5 pb-0" : "object-cover object-top"
            )}
          />
          {project.status ? (
            <Tag tone="butter" className="absolute left-3 top-3">
              {project.status}
            </Tag>
          ) : null}
        </span>
        <span className="mt-4 flex items-start justify-between gap-4">
          <span>
            <span className="k-display block text-[22px] text-k-ink">{project.name}</span>
            <span className="mt-1 block text-[13.5px] text-k-muted">
              {project.type} · {project.year}
            </span>
          </span>
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-k-line-2 text-k-ink transition-[transform,background-color,color] duration-300 group-hover:bg-k-coal group-hover:text-k-coal-ink group-hover:rotate-45">
            <ArrowUpRight size={15} aria-hidden />
          </span>
        </span>
        <span className="mt-2 block max-w-[52ch] text-[14.5px] leading-[1.55] text-k-ink-soft">
          {project.description}
        </span>
      </a>
    </Rise>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-k-line">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <Rise className="max-w-[640px]">
            <Eyebrow className="text-k-muted">Selected work</Eyebrow>
            <Display as="h2" size="lg" className="mt-5 text-k-ink">
              Live client sites and shipped products.
            </Display>
          </Rise>
          <Rise delay={0.08}>
            <p className="max-w-[360px] text-[15px] leading-[1.55] text-k-ink-soft sm:text-[15.5px] sm:text-right">
              Sites you can visit today and apps you can download. The evidence
              behind every promise on this page.
            </p>
          </Rise>
        </div>
        <ul className="mt-12 grid gap-x-5 gap-y-12 sm:mt-14 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-12">
          {projects.map((project, i) => (
            <WorkTile key={project.name} project={project} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
