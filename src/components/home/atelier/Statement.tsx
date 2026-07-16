"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HandleChip, RevealWords } from "./primitives";

const clusterArt = [
  { src: "/abstract-greenmead.png", alt: "" },
  { src: "/projects/artling/fox-painter.png", alt: "" },
  { src: "/abstract-jjpaper.png", alt: "" },
  { src: "/images/sipli-mascot.png", alt: "" },
  { src: "/abstract-sandbourne.png", alt: "" },
] as const;

/** Final fan pose per card (index 2 is the anchor). */
const pose = [
  { rotate: -16, x: -150, y: 16 },
  { rotate: -8, x: -75, y: 4 },
  { rotate: 0, x: 0, y: 0 },
  { rotate: 8, x: 75, y: 6 },
  { rotate: 16, x: 150, y: 18 },
] as const;

function ClusterCard({
  index,
  progress,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const rotate = useTransform(progress, [0, 1], [0, pose[index].rotate]);
  const x = useTransform(progress, [0, 1], [0, pose[index].x]);
  const y = useTransform(progress, [0, 1], [0, pose[index].y]);
  const art = clusterArt[index];

  return (
    <m.div
      className="absolute left-1/2 top-0 h-[150px] w-[112px] -translate-x-1/2 overflow-hidden rounded-2xl bg-at-surface shadow-[0_24px_48px_-20px_rgba(34,33,31,0.45)] sm:h-[186px] sm:w-[140px]"
      style={{ rotate, x, y, zIndex: 10 - Math.abs(index - 2) }}
    >
      <Image src={art.src} alt={art.alt} fill sizes="140px" className="object-cover" />
    </m.div>
  );
}

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center 60%"],
  });

  return (
    <section
      ref={ref}
      aria-label="What Flutterly does"
      className="mx-auto w-full max-w-[1100px] px-5 pb-28 pt-16 text-center sm:px-8"
    >
      {/* Fanned art cluster */}
      <div className="relative mx-auto mb-12 h-[190px] w-full max-w-[560px] sm:h-[230px]">
        <HandleChip
          handle="@founders"
          tone="dark"
          className="animate-at-drift absolute -left-2 top-2 z-20 sm:left-6"
        />
        <HandleChip
          handle="@teams"
          tone="violet"
          className="animate-at-drift absolute -right-2 top-8 z-20 rotate-[6deg] [animation-delay:1.1s] sm:right-6"
        />
        {clusterArt.map((_, i) =>
          reduce ? (
            <div
              key={i}
              className="absolute left-1/2 top-0 h-[150px] w-[112px] -translate-x-1/2 overflow-hidden rounded-2xl bg-at-surface shadow-[0_24px_48px_-20px_rgba(34,33,31,0.45)] sm:h-[186px] sm:w-[140px]"
              style={{
                transform: `translateX(calc(-50% + ${pose[i].x}px)) translateY(${pose[i].y}px) rotate(${pose[i].rotate}deg)`,
                zIndex: 10 - Math.abs(i - 2),
              }}
            >
              <Image
                src={clusterArt[i].src}
                alt=""
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>
          ) : (
            <ClusterCard key={i} index={i} progress={scrollYProgress} />
          )
        )}
      </div>

      <RevealWords
        as="p"
        className="mx-auto max-w-[900px] text-[clamp(1.7rem,4.6vw,3rem)] font-medium leading-[1.18] tracking-[-0.03em]"
        stagger={0.035}
        segments={[
          { text: "Whether you're launching a first product" },
          { text: "/ or refining one in flight —" },
          { text: "Flutterly connects strategy, design & code.", tone: "muted" },
        ]}
      />
    </section>
  );
}
