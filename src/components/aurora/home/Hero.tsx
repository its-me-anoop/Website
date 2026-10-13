"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heroCopy } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { EmberShader } from "../effects/EmberShader";
import { Container } from "../ui/primitives";

/** Client-only: true once the homepage has been shown in this tab. */
let introPlayed = false;

const delay = (seconds: number) => ({ ["--fx-d" as string]: `${seconds}s` }) as CSSProperties;

/**
 * The rebrand's opening: a short curtain with the butterfly lifts, the
 * hero opens out from a strip, frame lines draw in, the headline rises
 * line by line and fills from outline, and the real Flutterly
 * butterfly flaps in 3D over a slow ember shader.
 *
 * The curtain only plays on the first load of the page. Returning to
 * the homepage inside the site (where the route curtain already ran)
 * renders without it and builds straight away. The server render and
 * the first client render agree, so hydration stays clean.
 */
export function Hero() {
  const [first] = useState(() => typeof window === "undefined" || !introPlayed);
  useEffect(() => {
    introPlayed = true;
  }, []);

  return (
    <>
      {first ? (
        <div aria-hidden="true" className="fx-curtain" data-fx-curtain>
          <Image src="/flutterly-logo.png" alt="" width={92} height={92} priority />
          <div className="fx-curtain-bar">
            <span />
          </div>
        </div>
      ) : null}

      <section
        id="top"
        aria-labelledby="hero-title"
        className={cn("fx-open relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-a-void", !first && "fx-quick")}
      >
        <EmberShader className="-z-20" />
        {/* Scrims keep every line of hero text at AA over the brightest
            frame the shader can draw: from the left on wide screens,
            from the top where the text spans the full width. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,9,7,0.94)_0%,rgba(11,9,7,0.9)_62%,rgba(11,9,7,0.35)_100%)] lg:bg-[linear-gradient(90deg,rgba(11,9,7,0.96)_0%,rgba(11,9,7,0.9)_46%,rgba(11,9,7,0)_76%)]"
        />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="fx-dx absolute inset-x-6 top-[92px] h-px bg-a-ink/15" style={delay(0.75)} />
          <div className="fx-dx absolute inset-x-6 bottom-[72px] h-px bg-a-ink/15" style={delay(0.85)} />
          <div className="fx-dy absolute bottom-[72px] left-6 top-[92px] w-px bg-a-ink/15" style={delay(0.8)} />
          <div className="fx-dy absolute bottom-[72px] right-6 top-[92px] w-px bg-a-ink/15" style={delay(0.9)} />
          {[
            "left-[22px] top-[90px]",
            "right-[22px] top-[90px]",
            "bottom-[70px] left-[22px]",
            "bottom-[70px] right-[22px]",
          ].map((pos, i) => (
            <div key={pos} className={cn("fx-fade absolute h-[5px] w-[5px] bg-a-amber", pos)} style={delay(1.45 + i * 0.05)} />
          ))}
        </div>

        <Container className="relative flex flex-1 flex-wrap items-center gap-10 pb-32 pt-32 sm:pt-36 lg:flex-nowrap">
          <div className="flex min-w-0 flex-[1_1_560px] flex-col items-start gap-8">
            <h1
              id="hero-title"
              className="fx-h1-fill a-display text-[clamp(3.5rem,7vw,6.75rem)] leading-[0.92] tracking-[-0.045em] text-a-ink"
            >
              {heroCopy.lines.map((line, i) => (
                <span key={line}>
                  <span className="fx-line">
                    <span style={delay(0.6 + i * 0.1)}>{line}</span>
                  </span>{" "}
                </span>
              ))}
              <span className="fx-line">
                <span style={delay(0.8)} className="font-[family-name:var(--font-instrument)] font-normal italic tracking-[-0.015em] text-a-amber">
                  {heroCopy.emphasis}
                </span>
              </span>
            </h1>
            <p className="fx-fade max-w-[520px] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-a-ink-soft" style={delay(1.05)}>
              {heroCopy.copy}
            </p>
            <div className="fx-fade flex flex-wrap items-center gap-x-8 gap-y-4" style={delay(1.2)}>
              <Link
                href="/book"
                data-magnetic
                data-cursor="Book a call"
                className="inline-flex min-h-14 items-center gap-3 rounded-full bg-a-amber px-7 text-[17px] font-medium text-a-void transition-colors duration-300 hover:bg-a-ink"
              >
                Book a call
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="#work"
                data-cursor="See the work"
                className="fx-ul inline-flex min-h-11 items-center text-[17px] font-medium text-a-ink"
              >
                See the work
              </Link>
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_420px] items-center justify-center">
            <div className="fx-fly relative aspect-[684/520] w-[min(100%,540px)]">
              <div
                aria-hidden="true"
                className="absolute inset-[6%_10%] rounded-full bg-[radial-gradient(closest-side,rgba(255,176,32,0.26),rgba(255,176,32,0.08)_55%,rgba(255,176,32,0))]"
              />
              <div className="fx-bob absolute inset-0">
                <Image
                  src="/flutterly-logo.png"
                  alt="The Flutterly butterfly"
                  fill
                  priority
                  sizes="(min-width: 1024px) 540px, 90vw"
                  className="fx-wing-l object-contain [clip-path:inset(0_50%_0_0)]"
                />
                <Image
                  src="/flutterly-logo.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 540px, 90vw"
                  className="fx-wing-r object-contain [clip-path:inset(0_0_0_50%)]"
                />
              </div>
            </div>
          </div>
        </Container>

        <div
          className="fx-fade a-mono absolute inset-x-6 bottom-0 flex h-[72px] items-center justify-between gap-4 px-4 text-[11px] uppercase tracking-[0.12em] text-a-muted"
          style={delay(1.35)}
        >
          <span>{heroCopy.strip[0]}</span>
          <span className="hidden md:inline">{heroCopy.strip[1]}</span>
          <span className="hidden sm:inline">{heroCopy.strip[2]}</span>
        </div>
      </section>
    </>
  );
}
