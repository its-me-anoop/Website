"use client";

import type { ReactNode } from "react";
import { EmberGlow } from "../effects/Motion";
import { Container, Display, Eyebrow } from "../ui/primitives";

/**
 * Opening band for inner pages: the night canvas lit by one breathing
 * ember glow, a word-by-word h1, supporting copy and whatever actions
 * the page passes in. Content below the fold starts on the night canvas.
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
  return (
    <section id="top" className="relative isolate overflow-hidden bg-a-void">
      <EmberGlow className="-z-10" />
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
