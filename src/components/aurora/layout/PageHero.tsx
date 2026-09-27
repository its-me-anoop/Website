"use client";

import type { ReactNode } from "react";
import { AuroraCanvas } from "../effects/AuroraCanvas";
import { Embers } from "../effects/Embers";
import { useMotionAllowed } from "../effects/hooks";
import { Container, Display, Eyebrow } from "../ui/primitives";

/**
 * Opening band for inner pages: the same live aurora as the homepage,
 * a word-by-word h1, supporting copy and whatever actions the page
 * passes in. Content below the fold starts on the night canvas.
 */
export function PageHero({
  eyebrow,
  title,
  copy,
  children,
  size = "xl",
  after,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  children?: ReactNode;
  size?: "hero" | "xl" | "lg";
  /** Full-width content under the centred block (e.g. a screenshot). */
  after?: ReactNode;
}) {
  const motion = useMotionAllowed();
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-a-void">
        <div className="a-blobs opacity-80">
          <span />
          <span />
          <span />
        </div>
        <AuroraCanvas reduced={!motion} className="opacity-80" />
        <Embers enabled={motion} className="opacity-70" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(11,9,7,0.6), transparent 100%)" }}
        />
        <div className="a-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-a-void" />
      </div>
      <Container className="flex flex-col items-center pb-20 pt-36 text-center sm:pb-28 sm:pt-44">
        <Eyebrow className="a-fade-up">{eyebrow}</Eyebrow>
        <Display as="h1" size={size} split delay={0} className="mt-7 max-w-[17ch]">
          {title}
        </Display>
        {copy ? (
          <div
            className="a-fade-up mx-auto mt-8 max-w-[640px] text-[17px] leading-[1.65] text-a-ink-soft sm:text-[18.5px]"
            style={{ ["--d" as string]: "200ms" }}
          >
            {copy}
          </div>
        ) : null}
        {children ? (
          <div className="a-fade-up mt-10 flex w-full flex-col items-center" style={{ ["--d" as string]: "280ms" }}>
            {children}
          </div>
        ) : null}
      </Container>
      {after}
    </section>
  );
}
