"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pointer-tracked 3D tilt: the card pitches toward the cursor while
 * hovered and springs flat on leave. Decorative only — skipped for
 * reduced motion and never attached on touch-only devices (no
 * mousemove fires there).
 */
export function TiltCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = "transform .15s ease-out, border-color .3s";
      card.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg) scale(1.015)`;
    };
    const leave = () => {
      card.style.transition =
        "transform .6s cubic-bezier(.22,1.1,.36,1), border-color .3s";
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    };
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mousemove", move);
      card.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
