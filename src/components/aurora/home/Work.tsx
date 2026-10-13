import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredWork } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { WireframeMedia } from "../effects/Wireframe";
import { Container } from "../ui/primitives";

type Tile = (typeof featuredWork)[number];

const isExternal = (href: string) => href.startsWith("http");

const spanClass: Record<Tile["span"], string> = {
  wide: "lg:col-span-7",
  narrow: "lg:col-span-5",
  full: "lg:col-span-12",
};

/** A live site's home page, filling the tile from the top. */
function SiteShot({ image }: { image: { src: string; alt: string } }) {
  return (
    <div className="fx-par absolute inset-0 bg-a-deep">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 960px) 60vw, 92vw"
        className="fx-zoom object-cover object-left-top"
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
          <div className="fx-par absolute inset-0 flex justify-center pt-[8%]">
            <Image
              src="/projects/sipli/dashboard.png"
              alt="Sipli on iPhone: today's hydration dashboard"
              width={1284}
              height={2778}
              sizes="(min-width: 960px) 20vw, 50vw"
              className="fx-zoom h-full w-auto rounded-2xl shadow-[0_30px_60px_rgba(23,20,15,0.25)]"
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
            className="fx-zoom fx-par w-[46%] rounded-[22%] shadow-[0_30px_60px_rgba(23,20,15,0.28)]"
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
            className="fx-zoom fx-par h-[92%] w-auto"
          />
        </div>
      );
    default:
      return <SiteShot image={tile.image} />;
  }
}

function WorkTile({ tile }: { tile: Tile }) {
  const external = isExternal(tile.href);
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <article
      className={cn(
        "fx-tile flex min-w-0 flex-col gap-5",
        spanClass[tile.span]
      )}
      data-project-card
    >
      <Link href={tile.href} data-cursor={tile.cursor} tabIndex={-1} aria-hidden="true" {...linkProps}>
        <WireframeMedia
          sketch={tile.sketch}
          label={tile.sketchLabel}
          labelSide={tile.sketch === "phone" ? "right" : "left"}
          className="h-[clamp(340px,36vw,540px)] rounded-[18px] text-a-ink/35"
        >
          <TileMedia tile={tile} />
        </WireframeMedia>
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2">
          <span className="fx-wp a-mono text-[11px] uppercase tracking-[0.12em] text-a-muted">{tile.eyebrow}</span>
          <h3 className="fx-wt a-display text-[30px] leading-[1.1] tracking-[-0.03em]">{tile.title}</h3>
          <p className="fx-wp text-[16px] leading-[1.6] text-a-ink-soft">{tile.copy}</p>
        </div>
        <Link
          href={tile.href}
          data-cursor={tile.cursor}
          className="fx-ul inline-flex min-h-11 items-center gap-1 font-medium text-a-amber"
          {...linkProps}
        >
          {tile.linkLabel}
          {external ? <ArrowUpRight size={16} aria-hidden /> : null}
          {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </Link>
      </div>
    </article>
  );
}

/**
 * Shipped, live and looked after: every client site and app as a tile
 * that builds from a wireframe as it scrolls in.
 */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="fx-grid scroll-mt-24 bg-a-void py-[clamp(88px,10vw,152px)]">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <h2
            id="work-title"
            className="fx-wt a-display max-w-[820px] text-[clamp(2.6rem,5.6vw,5.25rem)] leading-[0.95]"
            data-wf="H2 · Display 84 / 95"
          >
            Shipped, live and <em>looked after.</em>
          </h2>
          <p className="fx-wp max-w-[380px] text-[17px] leading-[1.6] text-a-ink-soft">
            Websites for care providers, housing and suppliers, and the apps we build and run ourselves.
          </p>
        </div>

        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
          {featuredWork.map((tile) => (
            <WorkTile key={tile.key} tile={tile} />
          ))}
        </div>
      </Container>
    </section>
  );
}
