"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { SignArrow } from "../ui/Arrow";
import { Container, SectionHead } from "../ui/Type";

function ProjectArt({ project, sizes, className }: { project: Project; sizes: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: project.tint }}>
      <Image
        src={project.image}
        alt=""
        fill
        sizes={sizes}
        className={project.fit === "contain" ? "object-contain p-6" : "object-cover object-top"}
      />
    </div>
  );
}

function ProjectRow({ project, index, onActive }: { project: Project; index: number; onActive: () => void }) {
  const external = !project.internal;
  const Anchor = external ? "a" : Link;
  return (
    <Anchor
      href={project.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-project-card
      onMouseEnter={onActive}
      onFocus={onActive}
      className="group grid gap-4 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-6 sm:py-7"
    >
      <ProjectArt
        project={project}
        sizes="92vw"
        className="aspect-[16/10] rounded-[8px] border-[1.5px] border-wf-line-2 lg:hidden"
      />
      <span className="wf-mono hidden pt-2 text-[13px] text-wf-muted sm:block" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="wf-label block text-wf-ink-soft">
          {project.type} · {project.year}
        </span>
        <span className="mt-2 block text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          <span className="bg-[linear-gradient(transparent_62%,var(--wf-sign)_62%,var(--wf-sign)_90%,transparent_90%)] bg-[length:0%_100%] bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_100%] group-focus-visible:bg-[length:100%_100%]">
            {project.name}
          </span>
        </span>
        <span className="mt-3 block max-w-[62ch] text-[16px] leading-[1.6] text-wf-ink-soft">{project.description}</span>
        <span className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-[4px] border-[1.5px] border-wf-line-2 px-2 py-0.5 text-[13px] text-wf-ink-soft">
              {tag}
            </span>
          ))}
        </span>
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </span>
      <span
        aria-hidden="true"
        className="hidden h-11 w-11 items-center justify-center rounded-[6px] border-2 border-wf-ink transition-colors group-hover:bg-wf-ink group-hover:text-wf-sign sm:flex"
      >
        <SignArrow dir={external ? "up-right" : "right"} size={19} />
      </span>
    </Anchor>
  );
}

/**
 * Selected work as a directory list. On wide screens a mounted display
 * beside the list shows whichever project is hovered or focused; on
 * phones each row carries its own picture. Every row is a real link, in
 * reading order.
 */
export function Work() {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <section id="work" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHead
          kicker="Selected work"
          title="Built, launched and still looked after."
          copy="Care providers, a housing organisation, a B2B supplier and two native iOS apps, all designed and engineered in the studio."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div aria-hidden="true" className="hidden lg:block">
            <div className="sticky top-28 rounded-[12px] bg-wf-ink p-2">
              <ProjectArt
                key={current.name}
                project={current}
                sizes="520px"
                className="aspect-[4/3] rounded-[7px]"
              />
              <p className="wf-label flex items-center justify-between px-2 pb-1 pt-3 text-wf-on-ink-soft">
                <span className="text-wf-on-ink">{current.name}</span>
                <span>
                  {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </p>
            </div>
          </div>
          <ol className="border-t-2 border-wf-ink">
            {projects.map((project, i) => (
              <li key={project.name} className="border-b-[1.5px] border-wf-line-2">
                <ProjectRow project={project} index={i} onActive={() => setActive(i)} />
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
