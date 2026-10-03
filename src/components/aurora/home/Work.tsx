"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { IMacFrame } from "../ui/DeviceFrame";
import { Container, Display, Eyebrow } from "../ui/primitives";

function anchorProps(project: Project) {
  return project.internal ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

/** The lead project: its website on an iMac, name and type beneath. */
function FeaturedWork({ project }: { project: Project }) {
  const Anchor = project.internal ? Link : "a";
  return (
    <Anchor
      href={project.href}
      {...anchorProps(project)}
      data-project-card
      className="group flex flex-col gap-5 rounded-[16px]"
    >
      <IMacFrame
        src={project.image}
        alt=""
        width={1920}
        height={1200}
        sizes="(min-width: 1024px) 720px, 92vw"
        className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
      />
      <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-2">
        <span className="flex flex-col gap-1">
          <span className="a-display text-[26px]">{project.name}</span>
          <span className="text-[15px] text-a-muted">
            {project.type} · {project.year}
          </span>
        </span>
        <span className="a-mono text-[11.5px] uppercase tracking-[0.12em] text-a-muted">{project.tags[2]}</span>
        {!project.internal ? <span className="sr-only">(opens in a new tab)</span> : null}
      </span>
    </Anchor>
  );
}

/** Every other project as a hairline row; app artwork sits in a small tile. */
function WorkRow({ project }: { project: Project }) {
  const Anchor = project.internal ? Link : "a";
  const Icon = project.internal ? ArrowRight : ArrowUpRight;
  return (
    <Anchor
      href={project.href}
      {...anchorProps(project)}
      data-project-card
      className="group flex items-center gap-5 border-b border-a-line py-5 pr-1 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-3"
    >
      <span
        className="relative hidden h-14 w-14 shrink-0 overflow-hidden rounded-[12px] sm:block"
        style={{ background: project.tint }}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="56px"
          className={project.fit === "contain" ? "object-contain p-2" : "object-cover object-top"}
        />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="a-display text-[22px] sm:text-[24px]">{project.name}</span>
        <span className="truncate text-[14.5px] text-a-muted">
          {project.type} · {project.year}
        </span>
      </span>
      <Icon
        size={18}
        aria-hidden
        className="shrink-0 text-a-ink-soft transition-transform duration-500 group-hover:translate-x-1 group-hover:text-a-amber"
      />
      {!project.internal ? <span className="sr-only">(opens in a new tab)</span> : null}
    </Anchor>
  );
}

/**
 * Selected work on night: the newest client site on an iMac, then the
 * rest as rows. DOM order is reading order and every item is a link.
 */
export function Work() {
  const [featured, ...rest] = projects;
  return (
    <section id="work" className="scroll-mt-24 bg-a-void pb-24 sm:pb-32">
      <Container>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <Display size="xl" className="mt-6 max-w-[12ch]">
              Shipped, live and <em>looked after</em>.
            </Display>
          </div>
          <p className="max-w-[380px] text-[16px] leading-[1.65] text-a-ink-soft">
            Care providers, housing, B2B and two native iOS apps, all designed and engineered in the studio.
          </p>
        </Reveal>
        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <Reveal>
            <FeaturedWork project={featured} />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="border-t border-a-line">
              {rest.map((p) => (
                <li key={p.name}>
                  <WorkRow project={p} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
