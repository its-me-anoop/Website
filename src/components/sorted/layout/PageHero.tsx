"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Floor, type FloorColour } from "../ui/Room";
import { SlabStack } from "../ui/SlabStack";
import { Container, Display, Eyebrow } from "../ui/primitives";

/** The floor each wall stands on. */
const floorFor: Record<string, FloorColour> = {
  "tone-chalk": "pink",
  "tone-white": "pink",
  "tone-sky": "tomato",
  "tone-cobalt": "paper",
  "tone-navy": "pink",
  "tone-flame": "cobalt",
  "tone-sun": "bottle",
  "tone-jade": "tomato",
  "tone-pink": "bottle",
  "tone-ochre": "paper",
};

/**
 * Opening room for inner pages. Words on the wall: a label, an h1 that
 * rises word by word, supporting copy and whatever actions the page
 * passes in. On the right, something standing on the floor: by default
 * the stack of slabs, or whatever the page passes as `art`. `tone`
 * colours the wall (a service page takes its service's colour) and
 * picks the floor that goes with it. The room runs to the top of the
 * window, under the floating bar.
 */
export function PageHero({
  eyebrow,
  title,
  copy,
  children,
  size = "xl",
  tone = "tone-chalk",
  art,
  after,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  children?: ReactNode;
  size?: "hero" | "xl" | "lg";
  /** A `tone-*` class. */
  tone?: string;
  /** Replaces the slab stack; `null` leaves the words the full width. */
  art?: ReactNode;
  /** Full-width content under the opening block (e.g. a screenshot). */
  after?: ReactNode;
}) {
  const hasArt = art !== null;
  return (
    <section id="top" className={cn(tone, "relative isolate overflow-hidden")}>
      <Container
        className={cn(
          "grid items-end gap-x-10 gap-y-6 pb-14 pt-28 sm:pb-20 sm:pt-40",
          hasArt && "lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
        )}
      >
        <div className="min-w-0">
          <Eyebrow className="s-rise">{eyebrow}</Eyebrow>
          <Display as="h1" size={size} split delay={60} className="mt-6 max-w-[17ch]">
            {title}
          </Display>
          {copy ? (
            <div
              className="s-rise mt-8 max-w-[640px] text-[18px] leading-[1.55] text-s-ink-soft sm:text-[20px]"
              style={{ ["--d" as string]: "260ms" }}
            >
              {copy}
            </div>
          ) : null}
          {children ? (
            <div className="s-rise mt-9 flex w-full flex-col items-start" style={{ ["--d" as string]: "340ms" }}>
              {children}
            </div>
          ) : null}
        </div>
        {hasArt ? (
          <div className="relative z-10 mx-auto w-full max-w-[300px] max-lg:order-first max-lg:hidden lg:-mb-[clamp(72px,9vw,150px)] lg:max-w-[440px]">
            {art ?? <SlabStack />}
          </div>
        ) : null}
      </Container>
      {after}
      <Floor colour={floorFor[tone] ?? "pink"} />
    </section>
  );
}
