import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjectNames, featuredWork, projects, samples } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { WireframeMedia } from "../effects/Wireframe";
import { Container } from "../ui/primitives";

type Tile = (typeof featuredWork)[number];

const isExternal = (href: string) => href.startsWith("http");

/** The artwork inside each tile, drawn from real captures. */
function TileMedia({ tile }: { tile: Tile }) {
  switch (tile.key) {
    case "samples":
      return (
        <div className="fx-par absolute inset-0 bg-a-deep">
          <Image
            src="/demos/gp-home.png"
            alt="Willowbrook Surgery sample site, home page"
            width={1440}
            height={1000}
            sizes="(min-width: 960px) 52vw, 80vw"
            className="fx-zoom absolute left-[6%] top-[9%] h-auto w-[72%] rounded-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          />
          <Image
            src="/demos/care-home.png"
            alt="Oakfield House sample site, home page"
            width={1440}
            height={1000}
            sizes="(min-width: 960px) 36vw, 56vw"
            className="fx-zoom absolute bottom-[8%] right-[5%] h-auto w-1/2 rounded-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
          />
        </div>
      );
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
    case "pembroke":
      return (
        <div className="fx-par absolute inset-0 bg-a-deep">
          <Image
            src="/project-pembroke.png"
            alt="Pembroke Care website, home page"
            fill
            sizes="(min-width: 960px) 52vw, 92vw"
            className="fx-zoom object-cover object-top"
          />
        </div>
      );
  }
}

function WorkTile({ tile }: { tile: Tile }) {
  const external = isExternal(tile.href);
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const project = projects.find((p) => p.name === tile.title);
  return (
    <article
      className={cn(
        "fx-tile flex min-w-0 flex-col gap-5",
        tile.span === "wide" ? "lg:col-span-7" : "lg:col-span-5"
      )}
      data-project-card={project ? "" : undefined}
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
 * Shipped, live and looked after: four large tiles that build from a
 * wireframe as they scroll in, every sample site one click away, then
 * the rest of the work as a plain list.
 */
export function Work() {
  const more = projects.filter((p) => !(featuredProjectNames as readonly string[]).includes(p.name));
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
            Client websites, apps we build and run ourselves, and the sample sites that show what a practice or care
            home gets.
          </p>
        </div>

        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
          {featuredWork.map((tile) => (
            <WorkTile key={tile.key} tile={tile} />
          ))}
        </div>

        <nav aria-label="Sample sites" className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-a-line pt-6">
          <span className="a-mono text-[11px] uppercase tracking-[0.12em] text-a-muted">All five sample sites</span>
          {samples.map((s) => (
            <Link key={s.slug} href={s.href} data-cursor={s.tab} className="fx-ul inline-flex min-h-11 items-center text-[15px] text-a-ink">
              {s.name}
            </Link>
          ))}
        </nav>

        <div>
          <h3 className="a-mono text-[11px] font-medium uppercase tracking-[0.12em] text-a-muted">More work</h3>
          <ul className="mt-4 border-t border-a-line">
            {more.map((p) => {
              const external = !p.internal;
              return (
                <li key={p.name} data-project-card className="border-b border-a-line">
                  <Link
                    href={p.href}
                    data-cursor={external ? `Visit ${p.name}` : `${p.name} case study`}
                    className="group grid min-h-16 items-center gap-x-8 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto]"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="a-display text-[24px] tracking-[-0.03em] transition-colors group-hover:text-a-amber">
                      {p.name}
                    </span>
                    <span className="text-[15px] text-a-ink-soft">{p.type}</span>
                    <span className="a-mono flex items-center gap-3 text-[12px] text-a-muted">
                      {p.year}
                      <ArrowUpRight size={18} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      {external ? <span className="sr-only">(opens in a new tab)</span> : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
