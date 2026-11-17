import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredWork } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "../ui/Frames";
import { Container, Eyebrow } from "../ui/primitives";

type Tile = (typeof featuredWork)[number];

const isExternal = (href: string) => href.startsWith("http");
const host = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const spanClass: Record<Tile["span"], string> = {
  wide: "lg:col-span-7",
  narrow: "lg:col-span-5",
};

/** A slab that carries a capture; `left` shows its left side instead of its right. */
function Slab({ children, left, className, edge }: { children: ReactNode; left: boolean; className?: string; edge: string }) {
  return (
    <div className={cn("shot-turn", className)}>
      <div
        className="slab shot-slab"
        data-edge={left ? "left" : undefined}
        style={{ "--edge": edge, "--edge-2": `color-mix(in srgb, ${edge} 72%, #000)` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

/** The artwork on each tile, drawn from real captures and set on a slab that turns. */
function TileMedia({ tile, left }: { tile: Tile; left: boolean }) {
  switch (tile.key) {
    case "sipli":
      /* Simulator captures from an iPhone Duo: the open inner display, with the cover screen in front. */
      return (
        <div className="shot-turn relative h-[84%]">
          <div
            className="slab shot-slab h-full"
            data-edge={left ? "left" : undefined}
            style={{ "--edge": "#3a4270", "--edge-2": "#1d2550" } as CSSProperties}
          >
            <Image
              src="/images/sipli/duo/inner-home.webp"
              alt="Sipli on the inner display of an iPhone Duo: today's bottle, weekly quests and the hydration coach"
              width={1100}
              height={1564}
              sizes="280px"
              className="block h-full w-auto rounded-[14px] border-[5px] border-[#0b1026]"
            />
          </div>
          <Image
            src="/images/sipli/duo/outer-today.webp"
            alt=""
            width={800}
            height={1164}
            sizes="130px"
            className="absolute bottom-[-6%] right-[-22%] h-[56%] w-auto rounded-[10px] border-[4px] border-[#0b1026]"
            style={{ transform: "translateZ(60px)" }}
          />
        </div>
      );
    case "lifeline":
      return (
        <Slab left={left} edge="#b9781c" className="w-[min(46%,210px)]">
          <Image
            src="/projects/little-lifeline/app-icon.png"
            alt="Little Lifeline app icon"
            width={512}
            height={512}
            sizes="210px"
            className="block h-auto w-full"
          />
        </Slab>
      );
    case "streetcrew":
      return (
        <Slab left={left} edge="#ff5c1f" className="w-[min(46%,210px)]">
          <Image
            src="/projects/streetcrew/app-icon.png"
            alt="StreetCrew app icon: an orange route drawn across a street grid"
            width={512}
            height={512}
            sizes="210px"
            className="block h-auto w-full"
          />
        </Slab>
      );
    case "bible":
      return (
        <Slab left={left} edge="#4d121a" className="w-[min(44%,200px)]">
          <Image
            src="/projects/catholic-bible/cover.svg"
            alt="Catholic Bible, Catholic Public Domain Version"
            width={600}
            height={800}
            unoptimized
            className="block h-auto w-full"
          />
        </Slab>
      );
    case "artling":
      return (
        <Slab left={left} edge="#b9a988" className="w-[min(58%,250px)] bg-[#ede1cd]">
          <Image
            src="/projects/artling/fox-painter.png"
            alt="Little Artist's fox painter mascot"
            width={600}
            height={840}
            sizes="250px"
            className="block h-auto w-full"
          />
        </Slab>
      );
    default:
      return (
        <Slab left={left} edge="#d6d5ca" className="w-[84%]">
          <BrowserFrame
            src={tile.image.src}
            alt={tile.image.alt}
            url={isExternal(tile.href) ? host(tile.href) : undefined}
            width={1920}
            height={1200}
            sizes="(min-width: 1024px) 56vw, 80vw"
          />
        </Slab>
      );
  }
}

const kindClass: Record<Tile["kind"], string> = {
  Website: "bg-s-cobalt text-white",
  App: "bg-s-flame text-s-navy",
  "Web app": "bg-s-jade text-s-navy",
};

function WorkTile({ tile, index }: { tile: Tile; index: number }) {
  const external = isExternal(tile.href);
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const left = index % 2 === 1;
  return (
    <article className={cn("flex min-w-0 flex-col", spanClass[tile.span])} data-project-card>
      <Link
        href={tile.href}
        tabIndex={-1}
        aria-hidden="true"
        className="shot s-dots flex h-[clamp(300px,34vw,470px)] items-center justify-center overflow-hidden rounded-[14px] border-[1.5px] border-s-line-2 bg-s-navy-2"
        style={{ "--turn-y": left ? "12deg" : "-12deg" } as CSSProperties}
        {...linkProps}
      >
        <TileMedia tile={tile} left={left} />
      </Link>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2.5">
          <span className="flex flex-wrap items-center gap-2.5">
            <span className={cn("s-label rounded-[5px] px-2 py-1 text-[12px] leading-none", kindClass[tile.kind])}>{tile.kind}</span>
            <span className="s-label text-[12.5px] text-s-muted">{tile.eyebrow}</span>
          </span>
          <h3 className="s-display text-[clamp(1.6rem,2.4vw,2.1rem)]">{tile.title}</h3>
          <p className="max-w-[560px] text-[16.5px] leading-[1.55] text-s-ink-soft">{tile.copy}</p>
        </div>
        <Link href={tile.href} className="s-ul inline-flex min-h-11 items-center gap-1 font-semibold text-s-accent" {...linkProps}>
          {tile.linkLabel}
          {external ? <ArrowUpRight size={17} strokeWidth={2.4} aria-hidden /> : null}
          {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </Link>
      </div>
    </article>
  );
}

/**
 * Shipped, live and looked after: every client site and app on navy,
 * each capture on a slab that comes round to face you as it scrolls in
 * and squares up under the pointer.
 */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="tone-navy scroll-mt-20 py-[clamp(72px,9vw,136px)]">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div>
            <Eyebrow>Work</Eyebrow>
            <h2 id="work-title" className="s-display mt-5 max-w-[860px] text-[clamp(2.4rem,5.4vw,4.9rem)]">
              Shipped, live and <em>looked after.</em>
            </h2>
          </div>
          <p className="max-w-[400px] text-[17.5px] leading-[1.55] text-s-ink-soft">
            Websites for care providers, housing and suppliers, and the apps we build and run ourselves.
          </p>
        </div>
        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
          {featuredWork.map((tile, i) => (
            <WorkTile key={tile.key} tile={tile} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
