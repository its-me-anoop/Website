import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredWork } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "../ui/Frames";
import { Floor } from "../ui/Room";
import { Container, Eyebrow } from "../ui/primitives";

type Tile = (typeof featuredWork)[number];

const isExternal = (href: string) => href.startsWith("http");
const host = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const spanClass: Record<Tile["span"], string> = {
  wide: "lg:col-span-7",
  narrow: "lg:col-span-5",
};

/** The mat behind each picture, in wall colours, in tile order. */
const mats = ["var(--s-cobalt)", "var(--s-pink)", "var(--s-sky)", "var(--s-jade)", "var(--s-sun)", "var(--s-tomato)"] as const;

/** A picture pinned to the mat: it hangs a little off square and straightens under the pointer. */
function Pin({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("shot-turn", className)}>
      <div className="shot-slab">{children}</div>
    </div>
  );
}

/** The artwork on each tile, drawn from real captures. */
function TileMedia({ tile }: { tile: Tile }) {
  switch (tile.key) {
    case "sipli":
      /* Simulator captures from an iPhone Duo: the open inner display, with the cover screen in front. */
      return (
        <div className="shot-turn relative h-[84%]">
          <div className="shot-slab h-full">
            <Image
              src="/images/sipli/duo/inner-home.webp"
              alt="Sipli on the inner display of an iPhone Duo: today's bottle, weekly quests and the hydration coach"
              width={1100}
              height={1564}
              sizes="280px"
              className="block h-full w-auto rounded-[24px] border-[5px] border-[#201e1f]"
            />
            <Image
              src="/images/sipli/duo/outer-today.webp"
              alt=""
              width={800}
              height={1164}
              sizes="130px"
              className="absolute bottom-[-6%] right-[-22%] h-[56%] w-auto rounded-[24px] border-[4px] border-[#201e1f]"
            />
          </div>
        </div>
      );
    case "lifeline":
      return (
        <Pin className="w-[min(46%,210px)]">
          <Image
            src="/projects/little-lifeline/app-icon.png"
            alt="Little Lifeline app icon"
            width={512}
            height={512}
            sizes="210px"
            className="block h-auto w-full rounded-[22%]"
          />
        </Pin>
      );
    case "streetcrew":
      return (
        <Pin className="w-[min(46%,210px)]">
          <Image
            src="/projects/streetcrew/app-icon.png"
            alt="StreetCrew app icon: an orange route drawn across a street grid"
            width={512}
            height={512}
            sizes="210px"
            className="block h-auto w-full rounded-[22%]"
          />
        </Pin>
      );
    case "bible":
      return (
        <Pin className="w-[min(44%,200px)]">
          <Image
            src="/projects/catholic-bible/cover.svg"
            alt="Catholic Bible, Catholic Public Domain Version"
            width={600}
            height={800}
            unoptimized
            className="block h-auto w-full"
          />
        </Pin>
      );
    case "artling":
      return (
        <Pin className="w-[min(58%,250px)] overflow-hidden rounded-[24px] bg-[#ede1cd]">
          <Image
            src="/projects/artling/fox-painter.png"
            alt="Little Artist's fox painter mascot"
            width={600}
            height={840}
            sizes="250px"
            className="block h-auto w-full"
          />
        </Pin>
      );
    default:
      return (
        <Pin className="w-[86%]">
          <BrowserFrame
            src={tile.image.src}
            alt={tile.image.alt}
            url={isExternal(tile.href) ? host(tile.href) : undefined}
            width={1920}
            height={1200}
            sizes="(min-width: 1024px) 56vw, 80vw"
          />
        </Pin>
      );
  }
}

const kindClass: Record<Tile["kind"], string> = {
  Website: "bg-s-cobalt text-s-chalk",
  App: "bg-s-flame text-s-navy",
  "Web app": "bg-s-jade text-s-navy",
};

function WorkTile({ tile, index }: { tile: Tile; index: number }) {
  const external = isExternal(tile.href);
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const left = index % 2 === 1;
  return (
    <article className={cn("tone-white flex min-w-0 flex-col rounded-[24px] p-3 pb-7 sm:p-4 sm:pb-8", spanClass[tile.span])} data-project-card>
      <Link
        href={tile.href}
        tabIndex={-1}
        aria-hidden="true"
        className="shot flex h-[clamp(280px,32vw,450px)] items-center justify-center overflow-hidden rounded-[24px]"
        style={{ "--tilt": left ? "2.2deg" : "-2.2deg", background: mats[index % mats.length] } as CSSProperties}
        {...linkProps}
      >
        <TileMedia tile={tile} />
      </Link>
      <div className="mt-5 flex flex-wrap items-start justify-between gap-x-6 gap-y-3 px-1.5 sm:px-2">
        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2.5">
          <span className="flex flex-wrap items-center gap-2.5">
            <span aria-hidden className="s-mark s-num text-[30px] leading-none">
              {index + 1}
            </span>
            <span className={cn("s-label rounded-full px-2.5 py-1 text-[12.5px] leading-none", kindClass[tile.kind])}>{tile.kind}</span>
            <span className="s-label text-[13px] text-s-muted">{tile.eyebrow}</span>
          </span>
          <h3 className="s-display text-[clamp(1.7rem,2.6vw,2.3rem)]">{tile.title}</h3>
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
 * Shipped, live and looked after: every client site and app as a card
 * on the ochre wall, like prints laid out on a table. Each picture sits
 * on a mat in one of the wall colours, a degree or two off square, and
 * straightens under the pointer. The room ends on a bottle-green floor.
 */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="tone-ochre relative isolate scroll-mt-20">
      <Container className="flex flex-col gap-14 pb-[clamp(56px,7vw,104px)] pt-[clamp(80px,10vw,152px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div>
            <Eyebrow>Work</Eyebrow>
            <h2 id="work-title" className="s-display mt-5 max-w-[900px] text-[clamp(2.6rem,6.4vw,6rem)]">
              Shipped, live and <em>looked after.</em>
            </h2>
          </div>
          <p className="max-w-[400px] text-[18px] leading-[1.5] text-s-ink-soft">
            Websites for care providers, housing and suppliers, and the apps we build and run ourselves.
          </p>
        </div>
        <div className="grid gap-x-5 gap-y-5 lg:grid-cols-12">
          {featuredWork.map((tile, i) => (
            <WorkTile key={tile.key} tile={tile} index={i} />
          ))}
        </div>
      </Container>
      <Floor colour="bottle" />
    </section>
  );
}
