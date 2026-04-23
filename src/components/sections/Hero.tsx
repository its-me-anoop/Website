"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const ledger = [
  { k: "Studio", v: "Flutterly Ltd" },
  { k: "Est.", v: "Reading, UK · 2024" },
  { k: "On the bench", v: "Sipli 3.0" },
];

const cards = [
  {
    tag: "Sandbourne",
    idx: "03 / 05",
    year: "2024",
    variant: "c1",
    src: "/abstract-sandbourne.png",
    alt: "Sandbourne — abstract brand study",
    darkText: true,
  },
  {
    tag: "Sipli",
    idx: "01 / 05",
    year: "2026",
    variant: "c2",
    src: "/images/sipli/iphone/01-hero-1320x2868.png",
    alt: "Sipli 3.0 — hydration dashboard on iPhone",
    darkText: false,
  },
  {
    tag: "Greenmead",
    idx: "02 / 05",
    year: "2024",
    variant: "c3",
    src: "/abstract-greenmead.png",
    alt: "Greenmead — abstract brand study",
    darkText: true,
  },
] as const;

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const hero = heroRef.current;
    if (!cv || !hero) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let mouseX = 0.5, mouseY = 0.3, tMouseX = 0.5, tMouseY = 0.3;
    let t = 0;
    let running = true;
    let raf = 0;
    const hueBase = 23;
    const intensity = 0.7;

    const resize = () => {
      const r = hero.getBoundingClientRect();
      W = Math.floor(r.width);
      H = Math.floor(r.height);
      cv.width = W * DPR;
      cv.height = H * DPR;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      tMouseX = (e.clientX - r.left) / r.width;
      tMouseY = (e.clientY - r.top) / r.height;
    };
    const onLeave = () => {
      tMouseX = 0.5;
      tMouseY = 0.3;
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const r = hero.getBoundingClientRect();
      tMouseX = (touch.clientX - r.left) / r.width;
      tMouseY = (touch.clientY - r.top) / r.height;
    };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    hero.addEventListener("touchmove", onTouch, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (running = e.isIntersecting)),
      { threshold: 0 }
    );
    io.observe(hero);

    const hsla = (h: number, s: number, l: number, a: number) =>
      `hsla(${h} ${s}% ${l}% / ${a})`;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!running || W === 0 || H === 0) return;
      t += 0.006;
      mouseX += (tMouseX - mouseX) * 0.08;
      mouseY += (tMouseY - mouseY) * 0.08;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(245,239,228,0.18)";
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "multiply";

      const cx = mouseX * W;
      const cy = mouseY * H;

      // warm sun
      const r1 = 360 + Math.sin(t * 0.7) * 40;
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r1);
      g1.addColorStop(0, hsla(hueBase, 85, 62, 0.35 * intensity));
      g1.addColorStop(0.5, hsla(hueBase, 85, 60, 0.14 * intensity));
      g1.addColorStop(1, hsla(hueBase, 80, 55, 0));
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      // cool echo
      const ox = W * (0.9 - mouseX * 0.8) + Math.cos(t) * 60;
      const oy = H * (0.9 - mouseY * 0.6) + Math.sin(t * 1.3) * 40;
      const r2 = 300 + Math.cos(t * 0.5) * 50;
      const g2 = ctx.createRadialGradient(ox, oy, 0, ox, oy, r2);
      const h2 = (hueBase + 170) % 360;
      g2.addColorStop(0, hsla(h2, 45, 38, 0.2 * intensity));
      g2.addColorStop(1, hsla(h2, 45, 38, 0));
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // drifting blobs
      for (let i = 0; i < 4; i++) {
        const a = i * 1.6 + t * 0.4;
        const x = W * 0.5 + Math.cos(a) * W * 0.35 + (mouseX - 0.5) * 60 * (i + 1);
        const y = H * 0.55 + Math.sin(a * 1.1) * H * 0.28 + (mouseY - 0.5) * 40 * (i + 1);
        const r = 160 + i * 30;
        const gi = ctx.createRadialGradient(x, y, 0, x, y, r);
        const hh = (hueBase + i * 10) % 360;
        gi.addColorStop(0, hsla(hh, 75, 62, 0.1 * intensity));
        gi.addColorStop(1, hsla(hh, 75, 62, 0));
        ctx.fillStyle = gi;
        ctx.fillRect(0, 0, W, H);
      }

      // flow streaks
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = hsla(hueBase, 50, 35, 0.06 * intensity);
      ctx.lineWidth = 1;
      const step = 54;
      ctx.beginPath();
      for (let x = 0; x < W; x += step) {
        for (let y = 0; y < H; y += step) {
          const dx = x - cx;
          const dy = y - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const ang = Math.atan2(dy, dx) + Math.sin(d * 0.003 - t) * 0.8 + t * 0.3;
          const len = 22 + Math.sin(d * 0.01 - t * 1.2) * 10;
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
        }
      }
      ctx.stroke();
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      hero.removeEventListener("touchmove", onTouch);
      io.disconnect();
    };
  }, []);

  return (
    <header
      ref={heroRef}
      id="top"
      className="relative min-h-screen overflow-hidden bg-[var(--paper)] pb-10 pt-[120px] isolate"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />
      {/* radial gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(1200px 600px at 110% 10%, rgba(209,74,31,.08), transparent 60%), radial-gradient(900px 500px at -10% 90%, rgba(13,107,92,.07), transparent 60%)",
        }}
      />
      {/* noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-50 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.08  0 0 0 0 0.07  0 0 0 0 0.06  0 0 0 .4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Ledger */}
        <div className="mb-12 grid grid-cols-2 gap-5 border-b border-[var(--rule)] pb-5 pt-3 md:mb-16 md:grid-cols-4 md:gap-5">
          {ledger.map((cell) => (
            <div key={cell.k} className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted-2)]">
                {cell.k}
              </span>
              <span className="text-[13px] text-[var(--ink-2)]">{cell.v}</span>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted-2)]">
              Status
            </span>
            <span className="inline-flex items-center gap-2 text-[13px] text-[var(--ink-2)]">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[var(--accent)]" />
              Taking briefs · Summer &rsquo;26
            </span>
          </div>
        </div>

        {/* Display headline */}
        <h1
          className="font-display text-[clamp(52px,8.8vw,136px)] font-light leading-[0.94] tracking-[-0.025em]"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 0' }}
        >
          <span className="block overflow-hidden">
            <span className="inline-block italic text-[var(--ink-2)] [animation:rise_.9s_cubic-bezier(.2,.8,.2,1)_.08s_backwards_forwards]">
              A small studio
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="inline-block [animation:rise_.9s_cubic-bezier(.2,.8,.2,1)_.18s_backwards_forwards]">
              building{" "}
              <span className="relative inline-block px-[0.04em]">
                products
                <span
                  className="absolute bottom-[0.12em] left-0 right-0 h-[0.14em] origin-left scale-x-0 rounded-[2px] bg-[var(--accent)] opacity-[0.85] [animation:mark-fill_1s_cubic-bezier(.2,.8,.2,1)_.9s_forwards]"
                  aria-hidden="true"
                />
              </span>{" "}
              people
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="inline-block [animation:rise_.9s_cubic-bezier(.2,.8,.2,1)_.28s_backwards_forwards]">
              want to keep open.
            </span>
          </span>
        </h1>

        {/* Lede + card deck */}
        <div className="mt-16 grid gap-10 md:mt-16 md:grid-cols-[1.15fr_1fr] md:items-end md:gap-16">
          <div>
            <p className="max-w-[520px] text-[19px] leading-[1.55] text-[var(--ink-2)]">
              Flutterly is a UK design-and-engineering practice led by{" "}
              <strong className="font-medium text-[var(--ink)]">Anoop Jose</strong>.
              We ship web and mobile products that feel considered, fast, and alive —
              then keep shipping long after launch.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="#brief"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--ink)] px-5 py-3.5 text-sm font-medium text-[var(--paper)] transition-all hover:-translate-y-px hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                Send a brief
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M3 11 11 3M5 3h6v6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
              <Link
                href="#work"
                className="inline-flex items-center gap-2 border-b border-transparent py-3.5 pr-1 pl-1 text-sm font-medium text-[var(--ink-2)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                Read the ledger ↓
              </Link>
            </div>
          </div>

          {/* Card deck */}
          <div className="relative h-[380px] max-md:h-[320px]">
            {cards.map((card) => {
              const base =
                "group absolute aspect-[4/5] w-[260px] overflow-hidden rounded-[18px] border border-[var(--rule-2)] bg-[var(--paper-2)] shadow-[var(--shadow)] transition-transform duration-700 hover:!rotate-0 hover:-translate-y-1.5 max-md:w-[200px]";
              const positions = {
                c1: "right-[40%] top-5 -rotate-6",
                c2: "right-[15%] top-0 rotate-2 z-10",
                c3: "right-[-5%] top-[70px] rotate-[8deg]",
              } as const;
              return (
                <div
                  key={card.tag}
                  className={`${base} ${positions[card.variant]}`}
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 200px, 260px"
                    className="object-cover"
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 h-1/2"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, rgba(21,20,15,0.35))",
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className={`absolute left-2.5 top-2.5 rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur-sm ${
                      card.darkText
                        ? "bg-[rgba(245,239,228,0.85)] text-[var(--ink-2)]"
                        : "bg-[rgba(245,239,228,0.18)] text-[var(--paper)]"
                    }`}
                  >
                    {card.tag}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(245,239,228,0.85)]">
                    <span>{card.idx}</span>
                    <span>{card.year}</span>
                  </div>
                </div>
              );
            })}
            <span className="absolute -bottom-7 right-[15%] font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
              Contact sheet · <span className="text-[var(--accent)]">03 / 05</span>
            </span>
          </div>
        </div>

        {/* Hero footer */}
        <div className="mt-20 flex flex-wrap items-baseline justify-between gap-5 border-t border-[var(--rule)] pt-4.5 text-[13px] text-[var(--muted)]">
          <span>
            <em className="not-italic text-[var(--ink)]">№ 01</em> — An introduction.
            Scroll for the ledger, the practice, and how to put something on our bench.
          </span>
          <Link
            href="#work"
            className="inline-flex items-center gap-2 text-[var(--ink-2)]"
          >
            <span
              className="relative inline-block h-3.5 w-3.5 rounded-full border border-current"
              style={{ animation: "bob 2s infinite" }}
            >
              <span
                className="absolute inset-x-0 bottom-0.5 m-auto h-1 w-1 rotate-45 border-r border-b border-current"
                style={{ transform: "translateY(-3px) rotate(45deg)" }}
              />
            </span>
            Ledger of ships
          </Link>
        </div>
      </div>
    </header>
  );
}
