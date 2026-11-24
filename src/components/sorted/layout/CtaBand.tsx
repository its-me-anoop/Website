"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "../effects/Motion";
import { Floor, Porthole } from "../ui/Room";
import { AuditBar, ButtonLink, Container, Display, Eyebrow } from "../ui/primitives";

/**
 * Closing room on every marketing page: a cobalt wall with a pink
 * porthole, the question on the left and, on a paper card, the two
 * ways to start: the audit bar, then a direct email. The paper floor
 * runs into the footer. Pages whose visitors may not have a website to
 * audit pass `audit="link"` to turn the bar into a small cross-link.
 */
export function CtaBand({
  title,
  copy,
  id,
  audit = "bar",
}: {
  title: ReactNode;
  copy: string;
  id?: string;
  audit?: "bar" | "link";
}) {
  return (
    <section id={id} className="tone-cobalt relative isolate scroll-mt-20 overflow-hidden">
      <Porthole colour="var(--s-pink)" className="bottom-[-18%] right-[-8%] w-[min(62vw,720px)]" />
      <Container className="grid items-center gap-12 py-20 sm:py-28 wide:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] wide:gap-16">
        <Reveal>
          <Eyebrow>Start here</Eyebrow>
          <Display size="xl" className="mt-6">
            {title}
          </Display>
          <p className="mt-7 max-w-[560px] text-[18px] leading-[1.55] text-s-ink-soft sm:text-[20px]">{copy}</p>
        </Reveal>

        <Reveal delay={0.1} turn={1} className="tone-white rounded-[28px] p-6 sm:p-9">
          {audit === "bar" ? (
            <>
              <p className="s-label text-[13.5px] text-s-muted">&gt; Free and instant. No sign-up.</p>
              <AuditBar className="mt-4 max-w-none" />
              <div className="my-6 flex items-center gap-3" aria-hidden>
                <span className="h-[1.5px] flex-1 bg-s-line" />
                <span className="s-label text-[13px] text-s-muted">or</span>
                <span className="h-[1.5px] flex-1 bg-s-line" />
              </div>
            </>
          ) : null}
          <p className="text-[17px] font-semibold text-s-ink">Talk it through:</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-4">
            <ButtonLink href={`mailto:${site.email}`} tone={audit === "bar" ? "navy" : "primary"} arrow="right" dot>
              {site.email}
            </ButtonLink>
          </div>
          <p className="mt-4 text-[14px] text-s-muted">A reply within one working day.</p>
          {audit === "link" ? (
            <p className="mt-5 border-t-[1.5px] border-s-line pt-5 text-[15px] text-s-ink-soft">
              Have a website too?{" "}
              <Link href="/free-audit" className="font-semibold text-s-ink underline decoration-s-accent decoration-2 underline-offset-4">
                Get a free website audit
              </Link>
              .
            </p>
          ) : null}
        </Reveal>
      </Container>
      <Floor colour="paper" className="[--floor-h:clamp(36px,5vw,72px)]" />
    </section>
  );
}
