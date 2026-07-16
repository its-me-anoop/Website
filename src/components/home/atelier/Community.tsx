"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { wallRowBottom, wallRowTop } from "./data";
import { RevealWords, Rise } from "./primitives";

function WallRow({
  tiles,
  reverse,
}: {
  tiles: typeof wallRowTop | typeof wallRowBottom;
  reverse?: boolean;
}) {
  return (
    <div className="edge-mask overflow-hidden">
      <div
        className={`${reverse ? "animate-marquee-rev" : "animate-marquee"} flex w-max gap-5 [--marquee-duration:56s]`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex gap-5">
            {tiles.map((tile, i) => (
              <div
                key={`${tile.src}-${i}`}
                className={`relative h-[110px] w-[92px] shrink-0 overflow-hidden rounded-2xl sm:h-[128px] sm:w-[106px] ${
                  i % 2 === 0 ? "translate-y-3 rotate-[2deg]" : "-translate-y-1 rotate-[-2deg]"
                }`}
                style={{ backgroundColor: tile.tint }}
              >
                <Image
                  src={tile.src}
                  alt={copy === 0 ? tile.alt : ""}
                  fill
                  sizes="106px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Community() {
  return (
    <section
      aria-label="Products people live with"
      className="mx-auto w-full max-w-[1240px] px-0 py-20"
    >
      <WallRow tiles={wallRowTop} />

      <div className="mx-auto max-w-[640px] px-5 py-14 text-center sm:px-8">
        <Sparkles size={18} aria-hidden className="mx-auto mb-6 text-at-ink" />
        <RevealWords
          as="h2"
          className="text-[clamp(2.1rem,5.2vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.035em]"
          segments={[{ text: "Made for the people who use them." }]}
        />
        <Rise delay={0.2}>
          <p className="mx-auto mt-4 max-w-[420px] text-[14.5px] leading-relaxed text-at-ink-soft">
            Health, family, care and commerce — products built for the humans
            on the other side of the screen.
          </p>
        </Rise>
      </div>

      <WallRow tiles={wallRowBottom} reverse />
    </section>
  );
}
