"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "../ui/primitives";
import "./interiors.css";

/** The masthead pairs the page title with its next action or a live work sample. */
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
  tone?: string;
  art?: ReactNode;
  after?: ReactNode;
}) {
  const introduction = (copy || children) && (
    <div className="inner-mast-intro">
      {copy && <div className="inner-mast-copy">{copy}</div>}
      {children && <div className="inner-mast-actions">{children}</div>}
    </div>
  );

  return (
    <section id="top" className={cn("inner-mast", tone)}>
      <Container className={cn("inner-mast-grid", art && "inner-mast-with-art")}>
        <div className="inner-mast-title">
          <p className="inner-kicker">{eyebrow}</p>
          <h1 className={cn("s-display inner-title", size === "lg" && "inner-title-compact")}>{title}</h1>
          {art && introduction}
        </div>
        {art ? <div className="inner-mast-art">{art}</div> : introduction}
      </Container>
      {after}
    </section>
  );
}
