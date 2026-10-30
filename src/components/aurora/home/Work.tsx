"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredWork } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { nextTabIndex } from "../ui/tabs";
import { Container } from "../ui/primitives";

type Tile = (typeof featuredWork)[number];

const isExternal = (href: string) => href.startsWith("http");

/** A live site's home page, filling the tile from the top. */
function SiteShot({ image }: { image: { src: string; alt: string } }) {
  return (
    <div className="absolute inset-0 bg-a-deep">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 960px) 60vw, 92vw"
        className="object-cover object-left-top"
      />
    </div>
  );
}

/** The artwork inside each tile, drawn from real captures. */
function TileMedia({ tile }: { tile: Tile }) {
  switch (tile.key) {
    case "sipli":
      return (
        <div className="absolute inset-0 bg-[#d9e2e6]">
          <div className="absolute inset-0 flex justify-center pt-[8%]">
            <Image
              src="/projects/sipli/dashboard.png"
              alt="Sipli on iPhone: today's hydration dashboard"
              width={1284}
              height={2778}
              sizes="(min-width: 960px) 20vw, 50vw"
              className="h-full w-auto rounded-2xl shadow-[0_30px_60px_rgba(23,20,15,0.25)]"
            />
          </div>
          <Image
            src="/projects/sipli/app-icon.png"
            alt=""
            width={52}
            height={52}
            className="absolute left-5 top-5 rounded-xl shadow-[0_6px_16px_rgba(23,20,15,0.18)]"
          />
        </div>
      );
    case "lifeline":
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(70%_80%_at_50%_60%,#f7c66b,#f2a93b_70%)]">
          <Image
            src="/projects/little-lifeline/app-icon.png"
            alt="Little Lifeline app icon"
            width={512}
            height={512}
            sizes="(min-width: 960px) 18vw, 50vw"
            className="w-[46%] rounded-[22%] shadow-[0_30px_60px_rgba(23,20,15,0.28)]"
          />
        </div>
      );
    case "artling":
      return (
        <div className="absolute inset-0 flex items-end justify-center bg-[#ede1cd]">
          <Image
            src="/projects/artling/fox-painter.png"
            alt="Little Artist's fox painter mascot"
            width={600}
            height={840}
            sizes="(min-width: 960px) 24vw, 60vw"
            className="h-[92%] w-auto"
          />
        </div>
      );
    default:
      return <SiteShot image={tile.image} />;
  }
}

/** A compact project showroom: evidence and a next step stay together. */
export function Work() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const next = nextTabIndex(event.key, active, featuredWork.length);
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 bg-a-void py-[clamp(72px,8vw,120px)]">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="a-mono mb-5 text-xs uppercase tracking-[0.12em] text-a-muted">The project room / Real work</p>
            <h2 id="work-title" className="a-display max-w-[780px] text-[clamp(2.6rem,5.6vw,5.25rem)] leading-[0.95]">
              Shipped, live and <em>looked after.</em>
            </h2>
          </div>
          <p className="max-w-[340px] text-[17px] leading-relaxed text-a-ink-soft">
            Find something like your next project. Explore the work, then let’s talk about yours.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div role="tablist" aria-label="Explore Flutterly projects" className="grid grid-cols-2 content-start gap-2 lg:grid-cols-1">
            {featuredWork.map((tile, index) => (
              <button
                key={tile.key}
                ref={(element) => { tabs.current[index] = element; }}
                id={`work-tab-${tile.key}`}
                role="tab"
                type="button"
                aria-selected={active === index}
                aria-controls={`work-panel-${tile.key}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={onKeyDown}
                className={cn(
                  "group flex min-h-[68px] cursor-pointer items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-a-amber active:scale-[0.99]",
                  active === index ? "border-a-amber bg-a-amber text-a-void" : "border-a-line-2 bg-a-deep text-a-ink hover:border-a-ink-soft hover:bg-a-night"
                )}
              >
                <span>
                  <span className="block text-[15px] font-medium">{tile.title}</span>
                  <span className={cn("mt-1 block text-xs", active === index ? "text-a-void" : "text-a-muted")}>
                    {isExternal(tile.href) ? "Client website" : "Our own app"}
                  </span>
                </span>
                <ArrowRight className="shrink-0" size={16} aria-hidden />
              </button>
            ))}
          </div>
          <div className="min-w-0">
            {featuredWork.map((tile, index) => {
              const external = isExternal(tile.href);
              return (
                <article key={tile.key} id={`work-panel-${tile.key}`} role="tabpanel" aria-labelledby={`work-tab-${tile.key}`} tabIndex={0} hidden={active !== index} data-project-card className="a-paper overflow-hidden rounded-[20px] border border-a-line-2 bg-a-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-a-amber">
                  <div className="relative h-[clamp(260px,32vw,420px)] overflow-hidden" aria-label={`${tile.title} project preview`}>
                    <TileMedia tile={tile} />
                  </div>
                  <div className="grid gap-7 p-6 sm:p-8 xl:grid-cols-[1fr_260px] xl:items-end">
                    <div>
                      <p className="a-mono mb-3 text-[11px] uppercase tracking-[0.1em] text-a-muted">{tile.eyebrow}</p>
                      <h3 className="a-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight text-a-ink">{tile.title}</h3>
                      <p className="mt-3 max-w-[540px] text-base leading-relaxed text-a-ink-soft">{tile.copy}</p>
                      <Link href={tile.href} {...(external ? {target: "_blank", rel: "noopener noreferrer"} : {})} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-a-ink underline decoration-a-line-2 underline-offset-4 hover:decoration-current">
                        {tile.linkLabel}
                        <ArrowUpRight size={16} aria-hidden />
                        {external && <span className="sr-only"> (opens in a new tab)</span>}
                      </Link>
                    </div>
                    <div className="border-t border-a-line-2 pt-5 xl:border-t-0 xl:pt-0">
                      <p className="mb-3 text-sm leading-relaxed text-a-ink-soft">{external ? "Have a website project in mind?" : "Have an app idea of your own?"}</p>
                      <Link href="/book" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-a-amber px-5 text-[15px] font-medium text-a-void transition-colors hover:bg-a-gold active:scale-[0.99]">
                        Talk about your project <ArrowRight size={16} aria-hidden />
                      </Link>
                      <Link href={external ? "/services/websites" : "/services/apps"} className="mt-2 flex min-h-11 items-center justify-center text-sm text-a-ink underline underline-offset-4 hover:text-a-ink-soft">
                        {external ? "Explore website services" : "Explore app services"}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <noscript><p className="mt-5 text-a-ink-soft">Explore all projects through the Work links in the footer.</p></noscript>
      </Container>
    </section>
  );
}
