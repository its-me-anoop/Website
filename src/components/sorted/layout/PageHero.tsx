"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SlabStack } from "../ui/SlabStack";
import { Container, Display, Eyebrow } from "../ui/primitives";

/**
 * Opening band for inner pages. Words on the left: a label, an h1 that
 * turns up word by word, supporting copy and whatever actions the page
 * passes in. On the right, something in 3D: by default the stack of
 * slabs, or whatever the page passes as `art`. `tone` colours the band
 * (a service page takes its service's colour).
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
    <section id="top" className={cn(tone, "relative isolate overflow-hidden border-b-2 border-s-rule")}>
      <Container
        className={cn(
          "grid items-center gap-x-10 gap-y-6 pb-14 pt-12 sm:pb-20 sm:pt-16",
          hasArt && "lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
        )}
      >
        <div className="min-w-0">
          <Eyebrow className="s-rise">{eyebrow}</Eyebrow>
          <Display as="h1" size={size} split delay={60} className="mt-6 max-w-[18ch]">
            {title}
          </Display>
          {copy ? (
            <div
              className="s-rise mt-7 max-w-[640px] text-[17.5px] leading-[1.6] text-s-ink-soft sm:text-[19px]"
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
          <div className="mx-auto w-full max-w-[300px] max-lg:order-first max-lg:hidden lg:max-w-[440px]">{art ?? <SlabStack />}</div>
        ) : null}
      </Container>
      {after}
    </section>
  );
}
