"use client";

import { useRef } from "react";
import styles from "./studio-motion.module.css";

function readTiltCap(element: HTMLElement): number {
  const raw = getComputedStyle(element).getPropertyValue("--tilt-cap").trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 7;
}

export function TiltSurface({
  children,
  className = "",
  lift = true,
}: {
  children: React.ReactNode;
  className?: string;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const setTilt = (x: number, y: number, active: boolean) => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--tilt-x", `${x}deg`);
    node.style.setProperty("--tilt-y", `${y}deg`);
    node.style.setProperty("--tilt-lift", lift && active ? "-4px" : "0px");
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || event.pointerType === "touch") return;

    const rect = node.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const cap = readTiltCap(node);
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt(Math.max(-cap, Math.min(cap, -ny * cap)), Math.max(-cap, Math.min(cap, nx * cap)), true);
  };

  const resetTilt = () => setTilt(0, 0, false);

  return (
    <div
      ref={ref}
      className={`${styles.tilt} ${className}`}
      style={{ "--tilt-cap": "7" } as React.CSSProperties}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      <div className={styles.tiltInner}>{children}</div>
    </div>
  );
}
