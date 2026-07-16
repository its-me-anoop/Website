"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
  Brush,
  Layers,
  PenTool,
  Pencil,
  Plus,
  Shapes,
  Sparkles,
  SwatchBook,
  Eye,
} from "lucide-react";
import { site } from "@/lib/site";
import { folderTabs } from "./data";
import { EASE, RevealWords, Rise } from "./primitives";

const doodles = [
  { Icon: Brush, x: "6%", y: "8%", r: -12 },
  { Icon: PenTool, x: "1%", y: "48%", r: 8 },
  { Icon: SwatchBook, x: "22%", y: "42%", r: -6 },
  { Icon: Sparkles, x: "42%", y: "52%", r: 10 },
  { Icon: Pencil, x: "12%", y: "78%", r: 14 },
  { Icon: Layers, x: "30%", y: "80%", r: -8 },
  { Icon: Shapes, x: "52%", y: "76%", r: 6 },
] as const;

export function Vision() {
  const [active, setActive] = useState<(typeof folderTabs)[number]["id"]>("apps");
  const reduce = useReducedMotion();
  const tab = folderTabs.find((t) => t.id === active) ?? folderTabs[0];

  return (
    <section
      aria-label="Studio vision and work browser"
      className="mx-auto grid w-full max-w-[1240px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10"
    >
      {/* Vision copy + doodles */}
      <div className="relative">
        <Eye size={20} aria-hidden className="mb-8 text-at-ink" />
        <RevealWords
          as="h2"
          className="max-w-[440px] text-[clamp(2.1rem,5vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.035em]"
          segments={[
            { text: "Our vision" },
            { text: "for any product.", tone: "muted" },
          ]}
        />
        <Rise delay={0.15}>
          <p className="mt-5 max-w-[420px] text-[14.5px] leading-relaxed text-at-ink-soft">
            Every product tells a story. Flutterly keeps product, design and
            engineering context in one head, so ideas keep their shape from
            first sketch to the store.
          </p>
        </Rise>
        <Rise delay={0.25}>
          <a
            href="#about"
            className="liquid mt-6 inline-flex rounded-full px-4 py-2 text-[13.5px] font-medium transition-transform duration-300 hover:-translate-y-0.5"
          >
            Read more
          </a>
        </Rise>

        <div className="relative mt-10 h-[190px] max-w-[420px]" aria-hidden>
          {doodles.map(({ Icon, x, y, r }, i) => (
            <m.span
              key={i}
              className="absolute text-at-ink"
              style={{ left: x, top: y, rotate: r }}
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
            >
              <Icon size={34} strokeWidth={1.4} />
            </m.span>
          ))}
        </div>
      </div>

      {/* Folder-tab browser */}
      <div>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-end gap-2" role="tablist" aria-label="Browse work by platform">
            {folderTabs.map((t) => {
              const selected = t.id === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`folder-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`folder-panel-${t.id}`}
                  onClick={() => setActive(t.id)}
                  className={
                    selected
                      ? "relative rounded-t-2xl bg-at-dark px-6 pb-3 pt-3 text-[15px] font-medium text-at-dark-ink"
                      : "relative rounded-t-2xl px-6 pb-3 pt-3 text-[15px] font-medium text-at-ink-soft transition-colors hover:text-at-ink"
                  }
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <a
            href={`mailto:${site.email}`}
            className="liquid mb-2 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Plus size={14} aria-hidden /> Start yours
          </a>
        </div>

        <div
          role="tabpanel"
          id={`folder-panel-${tab.id}`}
          aria-labelledby={`folder-tab-${tab.id}`}
          className="overflow-hidden rounded-3xl rounded-tl-none bg-at-dark p-3"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={tab.id}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {tab.tiles.map((tile) => (
                <div
                  key={tile.src}
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl"
                  style={{ backgroundColor: tile.tint }}
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 640px) 45vw, 220px"
                    className="object-cover"
                  />
                </div>
              ))}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
