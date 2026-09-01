"use client";

import { useEffect, useRef } from "react";

export function HeroMotion({
  gridClassName,
  innerClassName,
  children,
}: {
  gridClassName: string;
  innerClassName: string;
  children: React.ReactNode;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const host = hostRef.current;
    const grid = gridRef.current;
    const inner = innerRef.current;
    if (!host || !grid || !inner) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const applyGrid = (pointerX = 0, pointerY = 0) => {
      const progress = scrollRef.current;
      grid.style.transform = `translate3d(${pointerX}px, ${progress * 48 + pointerY}px, 0) scale(${1 + progress * 0.035})`;
    };

    const onScroll = () => {
      const section = host.closest("section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      scrollRef.current = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      applyGrid();
      inner.style.transform = `perspective(1200px) rotateX(${scrollRef.current * 3.5}deg) translateY(${scrollRef.current * 20}px)`;
    };

    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (event: PointerEvent) => {
      const section = host.closest("section");
      if (!section || event.pointerType === "touch") return;
      const rect = section.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointerX = nx * 12;
      pointerY = ny * 10;
      applyGrid(pointerX, pointerY);

      inner.style.transform = `perspective(1200px) rotateX(${scrollRef.current * 3.5 - ny * 2.5}deg) rotateY(${nx * 2.5}deg) translateY(${scrollRef.current * 20}px)`;
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
      applyGrid();
      inner.style.transform = `perspective(1200px) rotateX(${scrollRef.current * 3.5}deg) translateY(${scrollRef.current * 20}px)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={hostRef}>
      <div ref={gridRef} className={gridClassName} aria-hidden />
      <div ref={innerRef} className={innerClassName}>
        {children}
      </div>
    </div>
  );
}
