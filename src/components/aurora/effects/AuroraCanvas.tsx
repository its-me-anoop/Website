"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { canvasSize, easePointer, FRAGMENT_SHADER, VERTEX_SHADER, type Point } from "./aurora-gl";

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

/**
 * The live aurora behind the hero. A single full-screen triangle runs
 * the fragment shader from `aurora-gl.ts` at reduced resolution. It
 * pauses off screen and in background tabs, draws one still frame for
 * reduced-motion visitors, and fades in over the CSS blob layer, which
 * remains the fallback wherever WebGL is unavailable.
 */
export function AuroraCanvas({ className, reduced }: { className?: string; reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    if (!gl) return;
    const program = createProgram(gl);
    if (!program) return;

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uPointer = gl.getUniformLocation(program, "u_pointer");

    let pointer: Point = { x: 0.5, y: 0.7 };
    let target: Point = { x: 0.5, y: 0.7 };
    let frame = 0;
    let visible = true;
    const start = performance.now() - 20_000;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const { width, height } = canvasSize(rect.width, rect.height, Math.min(window.devicePixelRatio || 1, 2));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (now: number) => {
      pointer = easePointer(pointer, target, 0.04);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.dataset.ready = "true";
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    const run = () => {
      cancelAnimationFrame(frame);
      if (reduced) {
        draw(start + 32_000);
        return;
      }
      if (visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target = {
        x: (e.clientX - rect.left) / Math.max(rect.width, 1),
        y: 1 - (e.clientY - rect.top) / Math.max(rect.height, 1),
      };
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) run();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      run();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", run);
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    resize();
    run();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", run);
      window.removeEventListener("pointermove", onPointer);
      /* Free the GPU objects but keep the context: a canvas hands back
         the same context on the next getContext call (Strict Mode
         re-runs effects), and a lost one would stay blank. */
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 h-full w-full opacity-0 mix-blend-screen transition-opacity duration-[1600ms] data-[ready=true]:opacity-100",
        className
      )}
    />
  );
}
