"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { useMediaQuery, useMotionAllowed } from "../effects/hooks";
import { Container, Eyebrow, Display } from "../ui/primitives";

function WorkCard({ project, index }: { project: Project; index: number }) {
  const external = !project.internal;
  const Anchor = external ? "a" : Link;
  return (
    <Anchor
      href={project.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-project-card
      className="a-spot group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-a-line bg-a-night transition-colors hover:border-a-line-2"
    >
      <div
        className="relative aspect-[16/11] overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${project.tint}, #11141f 140%)` }}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 560px, 88vw"
          className={cn(
            "transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]",
            project.fit === "contain" ? "object-contain p-8" : "object-cover object-top"
          )}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-a-night via-transparent to-transparent" />
        <span className="a-mono absolute left-5 top-5 rounded-full bg-a-void/70 px-3 py-1 text-[11px] text-a-ink-soft backdrop-blur">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-a-lime text-a-void opacity-0 transition-[opacity,transform] duration-500 group-hover:rotate-45 group-hover:opacity-100"
        >
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="a-mono text-[11.5px] uppercase tracking-[0.14em] text-a-cyan">
          {project.type} · {project.year}
        </p>
        <h3 className="a-display mt-3 text-[30px]">{project.name}</h3>
        <p className="mt-3 line-clamp-3 text-[15px] leading-[1.6] text-a-ink-soft">{project.description}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-a-line px-2.5 py-1 text-[12px] text-a-muted">
              {tag}
            </li>
          ))}
        </ul>
        {external ? <span className="sr-only">(opens in a new tab)</span> : null}
      </div>
    </Anchor>
  );
}

/**
 * Selected work. On wide screens the section pins and the cards glide
 * sideways as the page scrolls; on phones, and for reduced motion, it
 * is a plain responsive grid. Either way the DOM order is the reading
 * order and every card is a real link.
 */
export function Work() {
  const ref = useRef<HTMLElement>(null);
  const wide = useMediaQuery("(min-width: 1024px)");
  const motion = useMotionAllowed();
  const pinned = wide && motion;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-62%"]);

  const heading = (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <Eyebrow>Selected work</Eyebrow>
        <Display size="xl" className="mt-6 max-w-[12ch]">
          Shipped, live and <em>looked after</em>.
        </Display>
      </div>
      <p className="max-w-[380px] text-[16px] leading-[1.65] text-a-ink-soft">
        Care providers, housing, B2B and two native iOS apps, all designed and engineered in the studio.
      </p>
    </div>
  );

  if (!pinned) {
    return (
      <section id="work" ref={ref} className="scroll-mt-24 py-24 sm:py-32">
        <Container>
          {heading}
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((p, i) => (
              <li key={p.name}>
                <WorkCard project={p} index={i} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    );
  }

  return (
    <section id="work" ref={ref} className="relative h-[300vh] scroll-mt-24">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <Container>{heading}</Container>
        <m.ul
          style={{ x }}
          onFocusCapture={(e) => {
            /* Keyboard users: bring the focused card into the pinned view
               by scrolling to the point where the track shows it. */
            const section = ref.current;
            const li = (e.target as HTMLElement).closest("li");
            if (!section || !li?.parentElement) return;
            const index = Array.from(li.parentElement.children).indexOf(li);
            const progress = 0.05 + 0.9 * (index / Math.max(projects.length - 1, 1));
            const top = section.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top + progress * (section.offsetHeight - window.innerHeight), behavior: "instant" });
          }}
          className="mt-14 flex w-max gap-6 pl-[max(2rem,calc((100vw-1320px)/2+2rem))] pr-[10vw]">
          {projects.map((p, i) => (
            <li key={p.name} className="w-[min(520px,40vw)] shrink-0">
              <WorkCard project={p} index={i} />
            </li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
