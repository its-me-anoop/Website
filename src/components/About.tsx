"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const meta = [
  { k: "Founded", v: "2024" },
  { k: "Based", v: "Reading, UK" },
  { k: "Headcount", v: "1 + friends" },
  { k: "Reply time", v: "Within a day" },
];

/**
 * About section (Studio) completely redesigned for the Apple Pro ecosystem aesthetic.
 * Adheres strictly to the premium obsidian dark mode guidelines.
 */
export default function About() {
  return (
    <section
      id="studio"
      className="relative border-t border-white/5 bg-transparent py-[120px] text-white overflow-hidden"
    >
      {/* Background ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[130px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Section Header */}
        <div className="mb-16 grid items-end gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
              № 05 · The studio
            </div>
            <h2 className="mt-3 font-sans text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
              One person,{" "}
              <span className="text-zinc-500 font-light block md:inline">
                a few trusted collaborators,
              </span>{" "}
              a short client list.
            </h2>
          </div>
          <p className="max-w-[420px] text-[15px] leading-[1.6] text-zinc-400">
            Flutterly is a UK-registered product studio, founded in 2024 after a
            decade of shipping inside larger teams.
          </p>
        </div>

        {/* Body grid */}
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24 items-start">
          {/* Studio Narrative & Stats */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <blockquote className="relative m-0 border-l-2 border-[var(--accent)] pl-6 font-sans text-[clamp(20px,2.8vw,32px)] font-bold italic leading-[1.3] tracking-tight text-white">
                <span className="text-zinc-500 leading-normal">“</span>I started Flutterly because I was tired of handing off work to people who didn’t care about it as much as I did. So I stopped handing it off.
              </blockquote>

              <div className="mt-8 max-w-[480px] text-[15px] leading-[1.7] text-zinc-400 space-y-4">
                <p className="m-0">
                  We’re small on purpose. We take on a handful of engagements a year so we can write the code, draw the pixels, and answer the email — usually in that order.
                </p>
                <p className="m-0">
                  We’re at our best with founders sketching the first version, teams redesigning something their users secretly hate, and companies who want a partner — not a vendor — for the long run.
                </p>
              </div>
            </div>

            {/* Spec Sheet Meta Grid */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/5 pt-8 md:grid-cols-4">
              {meta.map((m) => (
                <div
                  key={m.k}
                  className="group flex flex-col gap-1.5 transition-all duration-300 hover:translate-y-[-1px]"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
                    {m.k}
                  </span>
                  <span className="font-sans text-[16px] font-bold text-zinc-200 tracking-tight transition-colors group-hover:text-white">
                    {m.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait Framed Showcase */}
          <motion.figure
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative m-0 overflow-hidden rounded-[24px] border border-white/5 bg-[#09090b]/80 shadow-2xl group"
            style={{
              aspectRatio: "4/5",
            }}
          >
            <Image
              src="/anoop-jose.jpg"
              alt="Portrait of Anoop Jose"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover transition-transform duration-700 group-hover:scale-102"
              priority
            />
            {/* Elegant dark gradient overlay for figure caption */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]"
            />
            <figcaption className="absolute inset-x-6 bottom-6 z-[2] text-white">
              <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-400 font-bold">
                Founder · Lead Engineer
              </div>
              <div className="mt-1 font-sans text-2xl font-bold tracking-tight">
                Anoop Jose
              </div>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
