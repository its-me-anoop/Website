"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Cell = { level: "" | "l1" | "l2" | "l3" | "l4"; count: number };

function generateHeat(): { cells: Cell[]; total: number } {
  const total = 52 * 7;
  const cells: Cell[] = [];
  let count = 0;
  for (let i = 0; i < total; i++) {
    const week = Math.floor(i / 7);
    const boost = week > 8 ? 0.2 : 0;
    const r = Math.random() + boost;
    let level: Cell["level"] = "";
    let c = 0;
    if (r > 0.95) { level = "l4"; c = 5; }
    else if (r > 0.85) { level = "l3"; c = 3; }
    else if (r > 0.68) { level = "l2"; c = 2; }
    else if (r > 0.45) { level = "l1"; c = 1; }
    cells.push({ level, count: c });
    count += c;
  }
  return { cells, total: count };
}

const repos = [
  {
    slash: "flutterly/",
    name: "hydration-engine",
    desc: "On-device hydration model — ships inside Sipli.",
    lang: "Swift",
    langClass: "bg-[#f05138]",
    stars: 412,
    forks: 38,
  },
  {
    slash: "flutterly/",
    name: "nextjs-seo-kit",
    desc: "Structured-data helpers we use on every site.",
    lang: "TypeScript",
    langClass: "bg-[#3178c6]",
    stars: 289,
    forks: 24,
  },
  {
    slash: "flutterly/",
    name: "gesture-lab",
    desc: "Playground for SwiftUI/Flutter micro-interactions.",
    lang: "Dart",
    langClass: "bg-[#03589c]",
    stars: 176,
    forks: 11,
  },
  {
    slash: "flutterly/",
    name: "friday-ship",
    desc: "Tiny changelog generator — pings Slack each Friday.",
    lang: "JavaScript",
    langClass: "bg-[#f7df1e]",
    stars: 94,
    forks: 7,
  },
];

function Heatmap() {
  const [data, setData] = useState<{ cells: Cell[]; total: number } | null>(null);
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    setData(generateHeat());
  }, []);

  useEffect(() => {
    if (!data || !ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          let current = 0;
          const step = Math.max(1, Math.round(data.total / 50));
          const tick = () => {
            current += step;
            if (current >= data.total) {
              setShown(data.total);
              return;
            }
            setShown(current);
            requestAnimationFrame(tick);
          };
          tick();
          io.disconnect();
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [data]);

  const bg = (level: string) => {
    switch (level) {
      case "l4":
        return "bg-[var(--accent)] shadow-[0_0_8px_rgba(0,113,227,0.4)]";
      case "l3":
        return "bg-blue-500/75";
      case "l2":
        return "bg-blue-500/45";
      case "l1":
        return "bg-blue-500/20";
      default:
        return "bg-white/[0.03] hover:bg-white/[0.06] transition-colors";
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-[24px] border border-white/[0.04] bg-[#0a0a0a]/50 p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.08] hover:bg-[#0a0a0a]/70"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--accent)] font-semibold">
          @ its-me-anoop
        </span>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
          <div>
            Commits · ytd
            <motion.b 
              className="mt-1 block font-sans text-xl font-bold tracking-tight text-white normal-case"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {shown || "—"}
            </motion.b>
          </div>
          <div>
            Best streak
            <b className="mt-1 block font-sans text-xl font-bold tracking-tight text-white normal-case">
              27d
            </b>
          </div>
          <div>
            Repos
            <b className="mt-1 block font-sans text-xl font-bold tracking-tight text-white normal-case">
              12
            </b>
          </div>
        </div>
      </div>

      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: "repeat(52, 1fr)", aspectRatio: "52/7" }}
        aria-hidden="true"
      >
        {(data?.cells || []).map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: i * 0.002, 
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`aspect-square rounded-[2px] transition-all duration-300 ${bg(c.level)}`}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-12 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
        {[
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ].map((m, i) => (
          <motion.span 
            key={m}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.03 }}
          >
            {m}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 25,
    x: -10,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

/**
 * OpenSource section with fluid scroll animations and polished interactions.
 */
export function OpenSource() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="oss"
      className="relative border-t border-white/[0.04] bg-transparent py-[130px] text-white overflow-hidden"
    >
      {/* Background glow shadow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 bottom-0 h-[500px] w-[600px] rounded-full bg-blue-500/[0.03] blur-[150px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Section Header */}
        <motion.div 
          className="mb-16 grid items-end gap-10 md:grid-cols-2 md:gap-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.div 
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              № 04 · Open source
            </motion.div>
            <motion.h2 
              className="mt-3 font-sans text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em]"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              We ship in
              <br />
              <span className="text-zinc-500 font-light">public, too.</span>
            </motion.h2>
          </div>
          <motion.p 
            className="max-w-[420px] text-[15px] leading-[1.65] text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Small tools, experiments, and bits of client work that are safe to
            open up. Pull requests are welcome — so are issues, and so is silence.
          </motion.p>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col justify-start">
            <Heatmap />
          </div>

          <motion.div 
            className="flex flex-col gap-3"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {repos.map((r, index) => (
              <motion.div key={r.name} variants={itemVariants}>
                <Link
                  href="#"
                  className="group grid grid-cols-[1fr_auto] items-center gap-4 rounded-[20px] border border-white/[0.04] bg-[#0a0a0a]/50 px-5 py-4.5 backdrop-blur-xl transition-all duration-400 hover:-translate-y-1 hover:border-white/[0.08] hover:bg-[#0a0a0a]/80 hover:shadow-xl hover:shadow-black/20"
                >
                  <div>
                    <div className="font-mono text-[13px] text-zinc-300 font-semibold transition-colors duration-300 group-hover:text-white">
                      <span className="text-zinc-600 font-normal">{r.slash}</span>
                      {r.name}
                    </div>
                    <div className="mt-1 text-[13px] text-zinc-400 font-normal transition-colors duration-300 group-hover:text-zinc-300">
                      {r.desc}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                      <span className={`h-1.5 w-1.5 rounded-full ${r.langClass} transition-all duration-300 group-hover:shadow-[0_0_8px_currentColor]`} />
                      {r.lang}
                    </div>
                    <div className="mt-1 flex justify-end gap-3.5 font-mono text-[11px] text-zinc-500 font-medium transition-colors duration-300 group-hover:text-zinc-400">
                      <span className="flex items-center gap-0.5">★ {r.stars}</span>
                      <span className="flex items-center gap-0.5">↳ {r.forks}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
