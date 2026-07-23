"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data";
import { Rise, SectionHead } from "../primitives";

function WorkCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const external = !project.internal;
  return (
    <Rise delay={(index % 3) * 0.08} className={index < 2 ? "lg:col-span-6" : "lg:col-span-3"}>
      <a
        href={project.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-project-card
        className="group bl-card flex h-full flex-col overflow-hidden rounded-[26px] border border-bl-line bg-bl-surface transition-transform duration-300 hover:-translate-y-1"
      >
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{ backgroundColor: project.tint }}
        >
          <Image
            src={project.image}
            alt={`${project.name} — ${project.type}`}
            fill
            sizes="(max-width: 1024px) 92vw, 560px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {project.status ? (
            <span className="absolute left-3 top-3 rounded-full bg-bl-amber px-3 py-1 text-[12px] font-semibold text-white shadow-[0_8px_20px_-10px_rgba(11,47,40,0.5)]">
              {project.status}
            </span>
          ) : null}
        </div>
        <div className="flex grow flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[19px] font-medium tracking-tight text-bl-ink">
              {project.name}
            </h3>
            <span className="text-[12.5px] font-medium text-bl-muted">
              {project.type} · {project.year}
            </span>
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-bl-ink-soft">
            {project.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-5">
            <ul className="flex flex-wrap gap-2">
              {project.tags.slice(0, 2).map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-bl-band px-3 py-1 text-[12px] font-medium text-bl-ink-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bl-teal-soft text-bl-teal transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} aria-hidden />
            </span>
          </div>
        </div>
      </a>
    </Rise>
  );
}

export function Work() {
  return (
    <section id="work" className="border-t border-bl-line bg-bl-band-2">
      <div className="mx-auto w-full max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          eyebrow="Selected work"
          title={[
            { text: "Live products." },
            { text: "Real organisations.", tone: "muted" },
          ]}
          copy="Client sites you can visit today and products you can download — the evidence behind every promise on this page."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {projects.map((project, i) => (
            <WorkCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
