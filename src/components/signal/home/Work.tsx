"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { Container, SectionIntro } from "../ui/primitives";

function Artwork({ project, sizes, className }: { project: Project; sizes: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[4px]", className)} style={{ background: project.tint }}>
      <Image
        src={project.image}
        alt=""
        fill
        sizes={sizes}
        className={project.fit === "contain" ? "object-contain p-8" : "object-cover object-top"}
      />
    </div>
  );
}

/**
 * Selected work as an index: one large row per project. On wide
 * screens a preview beside the list follows whichever row is hovered or
 * focused, wiping in from the top; on phones each row carries its own
 * image. Every row is a real link.
 */
export function Work() {
  const [current, setCurrent] = useState(0);

  return (
    <section id="work" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <SectionIntro
          label="Selected work"
          title={
            <>
              Shipped, live and <em>looked after</em>.
            </>
          }
          copy="Care providers, housing, B2B and two native iOS apps, all designed and engineered in the studio."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ol className="border-t border-s-line">
            {projects.map((p, i) => {
              const external = !p.internal;
              const Anchor = external ? "a" : Link;
              return (
                <li key={p.name} className="border-b border-s-line">
                  <Anchor
                    href={p.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    data-project-card
                    onPointerEnter={() => setCurrent(i)}
                    onFocus={() => setCurrent(i)}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-7"
                  >
                    <span className="text-[14px] tabular-nums text-s-on-ink-2">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span
                        className={cn(
                          "s-display block text-[clamp(2rem,4.4vw,3.6rem)] transition-colors",
                          current === i ? "text-s-on-ink" : "text-s-on-ink-2 group-hover:text-s-on-ink"
                        )}
                      >
                        {p.name}
                      </span>
                      <span className="mt-2 block text-[15.5px] text-s-on-ink-2">
                        {p.type} · {p.year}
                      </span>
                      <Artwork project={p} sizes="92vw" className="mt-5 aspect-[16/10] lg:hidden" />
                    </span>
                    <ArrowUpRight
                      size={26}
                      aria-hidden
                      className={cn(
                        "self-center transition-[transform,color]",
                        current === i ? "text-s-signal" : "text-s-on-ink-2",
                        "group-hover:-translate-y-1 group-hover:translate-x-1"
                      )}
                    />
                    {external ? <span className="sr-only">(opens in a new tab)</span> : null}
                  </Anchor>
                </li>
              );
            })}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5]">
                {projects.map((p, i) => (
                  <div
                    key={p.name}
                    aria-hidden="true"
                    className="absolute inset-0 transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)]"
                    style={{ clipPath: current === i ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", zIndex: current === i ? 1 : 0 }}
                  >
                    <Artwork project={p} sizes="520px" className="h-full w-full" />
                  </div>
                ))}
              </div>
              <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-s-on-ink-2">{projects[current].description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {projects[current].tags.map((tag) => (
                  <li key={tag} className="rounded-[3px] border border-s-line-2 px-2.5 py-1 text-[13.5px] text-s-on-ink-2">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
