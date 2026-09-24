"use client";

import type { ReactNode } from "react";
import { Container, Display, Label } from "../ui/primitives";

/**
 * Opening band for inner pages: label, a large left-aligned headline
 * that rises in, supporting copy and the page's actions, over a rule.
 */
export function PageHero({
  label,
  title,
  copy,
  children,
  size = "xl",
  after,
}: {
  label: string;
  title: ReactNode;
  copy?: ReactNode;
  children?: ReactNode;
  size?: "hero" | "xl" | "lg";
  /** Full-width content under the text block (e.g. a screenshot). */
  after?: ReactNode;
}) {
  return (
    <section id="top" className="relative">
      <Container className="pb-16 pt-32 sm:pb-24 sm:pt-44">
        <Label className="s-fade-in text-s-on-ink-2">{label}</Label>
        <Display as="h1" size={size} rise className="mt-6 max-w-[18ch]">
          {title}
        </Display>
        <div className="mt-10 grid gap-10 border-t border-s-line pt-10 lg:grid-cols-[1fr_auto] lg:items-start">
          {copy ? (
            <div
              className="s-fade-in max-w-[640px] text-[18px] leading-[1.6] text-s-on-ink-2 sm:text-[19px]"
              style={{ ["--d" as string]: "250ms" }}
            >
              {copy}
            </div>
          ) : (
            <span />
          )}
          {children ? (
            <div className="s-fade-in flex flex-col gap-4 lg:min-w-[420px]" style={{ ["--d" as string]: "350ms" }}>
              {children}
            </div>
          ) : null}
        </div>
      </Container>
      {after}
    </section>
  );
}
