"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFinePointer, useMotionAllowed } from "../effects/hooks";

/** Layers stacked behind the face to give the body real depth. */
const DEPTH_LAYERS = 9;

/**
 * A phone built in CSS 3D: a face with the screen, a stack of body
 * layers behind it for thickness (which keeps the rounded corners solid
 * at any angle), a camera island and a glare that slides as the phone
 * turns. It swings round as the page scrolls and leans towards a mouse.
 * No 3D library, so it costs no JavaScript beyond the motion values.
 *
 * Decorative: the screenshot is a picture of a page described elsewhere.
 */
export function Phone3D({
  src,
  className,
  width = 250,
  priority,
}: {
  src: string;
  className?: string;
  /** Rendered width of the phone in CSS pixels. */
  width?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motion = useMotionAllowed();
  const fine = useFinePointer();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [-34, 6]);
  const scrollX = useTransform(scrollYProgress, [0, 1], [14, -4]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 120, damping: 18 });
  const spy = useSpring(py, { stiffness: 120, damping: 18 });

  const rotateY = useTransform([scrollY, spx], ([s, p]: number[]) => s + p);
  const rotateX = useTransform([scrollX, spy], ([s, p]: number[]) => s + p);
  const glareX = useTransform(rotateY, [-40, 20], [110, -10]);
  const glare = useMotionTemplate`linear-gradient(115deg, transparent ${glareX}%, rgba(255,236,210,0.18) calc(${glareX}% + 8%), transparent calc(${glareX}% + 22%))`;

  const height = Math.round((width * 844) / 390) + 24;
  const radius = Math.round(width * 0.16);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-auto relative [perspective:1600px]", className)}
      style={{ width, height }}
      onPointerMove={(e) => {
        if (!fine || !motion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - rect.left) / rect.width - 0.5) * 24);
        py.set(-((e.clientY - rect.top) / rect.height - 0.5) * 16);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <div className="a-phone-float h-full w-full [transform-style:preserve-3d]">
        <m.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          style={motion ? { rotateY, rotateX } : { rotateY: -22, rotateX: 8 }}
        >
          {/* Body: stacked slabs behind the face read as a solid edge. */}
          {Array.from({ length: DEPTH_LAYERS }, (_, i) => (
            <span
              key={i}
              className="absolute inset-0"
              style={{
                borderRadius: radius,
                transform: `translateZ(${-(i + 1) * 1.6}px)`,
                background: i === DEPTH_LAYERS - 1 ? "#120e0b" : `hsl(28 ${30 - i}% ${22 - i * 1.2}%)`,
              }}
            />
          ))}

          {/* Face: warm metal rim, black bezel, screen. */}
          <div
            className="absolute inset-0 p-[3px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.9)]"
            style={{
              borderRadius: radius,
              background: "linear-gradient(145deg, #6b4a2e, #2a1d14 35%, #1b1510 60%, #8a5a32)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden bg-black p-[9px]" style={{ borderRadius: radius - 3 }}>
              <div className="relative h-full w-full overflow-hidden bg-white" style={{ borderRadius: radius - 11 }}>
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={priority}
                  sizes={`${width}px`}
                  className="object-cover object-top"
                />
                <m.span className="pointer-events-none absolute inset-0" style={motion ? { backgroundImage: glare } : undefined} />
              </div>
              <span className="absolute left-1/2 top-[15px] h-[20px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
            </div>
          </div>
        </m.div>
      </div>
      <span
        className="absolute -bottom-8 left-1/2 h-10 w-[85%] -translate-x-1/2 rounded-[50%] opacity-60 blur-xl"
        style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.9), transparent)" }}
      />
    </div>
  );
}
