"use client";

import { useEffect, useRef } from "react";
import styles from "./home.module.css";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
};

/**
 * Lightweight canvas neural-network: drifting nodes with connecting edges.
 * Suggests linking customers to organisations. Honours reduced motion.
 */
export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let pointer = { x: -9999, y: -9999, active: false };
    let time = 0;

    const COUNT = () => Math.min(72, Math.max(28, Math.floor((width * height) / 28000)));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = COUNT();
      if (nodes.length === 0) {
        nodes = Array.from({ length: count }, () => spawn());
      } else if (nodes.length < count) {
        while (nodes.length < count) nodes.push(spawn());
      } else if (nodes.length > count) {
        nodes.length = count;
      }
    };

    const spawn = (): Node => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.8,
      pulse: Math.random() * Math.PI * 2,
    });

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(160, width * 0.22);
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDist) continue;
          const alpha = (1 - dist / linkDist) * 0.28;
          ctx.strokeStyle = `rgba(245,245,247,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(245,245,247,0.55)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const linkDist = Math.min(170, width * 0.24);

      for (const node of nodes) {
        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 180) {
            node.vx += (dx / dist) * 0.012;
            node.vy += (dy / dist) * 0.012;
          }
        }

        node.vx *= 0.992;
        node.vy *= 0.992;
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDist) continue;
          const pulse = 0.5 + 0.5 * Math.sin(time * 1.4 + i * 0.35);
          const alpha = (1 - dist / linkDist) * (0.18 + pulse * 0.18);
          ctx.strokeStyle = `rgba(245,245,247,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        const glow = 0.45 + 0.35 * Math.sin(node.pulse);
        ctx.fillStyle = `rgba(245,245,247,${0.35 + glow * 0.35})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(245,245,247,${0.08 + glow * 0.08})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pointer.active) {
        const ring = 24 + 8 * Math.sin(time * 3);
        ctx.strokeStyle = "rgba(245,245,247,0.22)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, ring, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = window.requestAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };
    const onPointerLeave = () => {
      pointer = { x: -9999, y: -9999, active: false };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    if (reduced.matches) {
      drawStatic();
    } else {
      raf = window.requestAnimationFrame(frame);
    }

    const onReducedChange = () => {
      window.cancelAnimationFrame(raf);
      if (reduced.matches) {
        drawStatic();
      } else {
        raf = window.requestAnimationFrame(frame);
      }
    };
    reduced.addEventListener("change", onReducedChange);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      reduced.removeEventListener("change", onReducedChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.neuralField}
      aria-hidden="true"
    />
  );
}
