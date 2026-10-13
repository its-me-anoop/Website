"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { approach, frameDue, shaderSize } from "./fx-math";

/* Slow "ember silk": domain-warped fractal noise mapped from coal
   through ember and flame to amber, masked towards one point of the
   frame and lifted gently where the pointer is. A little grain stops
   the gradients banding. */
const FRAGMENT = `precision mediump float;
uniform vec2 uR;uniform float uT;uniform vec2 uM;uniform vec2 uC;uniform float uI;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
float fb(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}
void main(){vec2 uv=gl_FragCoord.xy/uR;float asp=uR.x/uR.y;vec2 p=(uv-.5)*vec2(asp,1.);float t=uT*.05;vec2 m=(uM-.5)*vec2(asp,1.);
vec2 q=vec2(fb(p*1.3+vec2(0.,t)),fb(p*1.3+vec2(5.2,-t)));
vec2 r=vec2(fb(p*1.7+2.*q+vec2(1.7,9.2)+t*1.4),fb(p*1.7+2.*q+vec2(8.3,2.8)-t*1.1));
float f=fb(p*1.1+2.4*r+(m-p)*.15);float silk=pow(smoothstep(.35,.95,f),1.6);
float ridge=1.-abs(sin(p.x*1.2-p.y*2.2+f*5.+t*3.));silk+=pow(ridge,6.)*.35*f;
vec2 c=(uC-.5)*vec2(asp,1.);float mask=1.-smoothstep(0.,1.25,length((p-c)*vec2(.8,1.)));
float g=exp(-dot(p-m,p-m)*5.);float k=clamp((silk*mask*1.2+g*.24*f)*uI,0.,1.);
vec3 coal=vec3(.043,.035,.027),em=vec3(.85,.21,.11),fl=vec3(1.,.45,.11),am=vec3(1.,.76,.3);
vec3 col=mix(coal,em*.6,smoothstep(.04,.3,k));col=mix(col,fl,smoothstep(.28,.62,k));col=mix(col,am,smoothstep(.55,.9,k));
col+=(h(gl_FragCoord.xy+fract(uT*7.)*91.)-.5)*.04;gl_FragColor=vec4(col,1.);}`;

/** The only devices the shader runs on. */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

const VERTEX = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

/**
 * The hero's lightweight WebGL shader. It renders at half resolution,
 * at most 30 frames a second, pauses while off screen, and draws one
 * still frame for visitors who ask for reduced motion.
 *
 * It only starts on devices with a mouse or trackpad. iOS Safari once
 * left regions black and froze animations under a WebGL hero, so
 * phones and tablets keep the static CSS ember gradient underneath,
 * which is also what shows wherever WebGL is unavailable.
 *
 * `mix-blend-screen` marks it as a light source for the hero contrast
 * check, which paints it at a bright worst case before measuring text.
 */
export function EmberShader({
  centre = [0.74, 0.5],
  gain = 1.05,
  className,
}: {
  /** Where the silk gathers, as fractions of the box (x from left, y from bottom). */
  centre?: readonly [number, number];
  gain?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [cx, cy] = centre;

  useEffect(() => {
    if (!window.matchMedia?.(FINE_POINTER).matches) return;
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      preserveDrawingBuffer: true,
      powerPreference: "low-power",
    });
    if (!canvas || !gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uR = uniform("uR");
    const uT = uniform("uT");
    const uM = uniform("uM");
    gl.uniform2f(uniform("uC"), cx, cy);
    gl.uniform1f(uniform("uI"), gain);

    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let mx = cx;
    let my = cy;
    let tx = cx;
    let ty = cy;
    let last = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const draw = (now: number) => {
      const box = canvas.getBoundingClientRect();
      const { width, height } = shaderSize(box.width, box.height);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      mx = approach(mx, tx, 0.05);
      my = approach(my, ty, 0.05);
      gl.uniform2f(uR, width, height);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.dataset.ready = "true";
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || !frameDue(now, last)) return;
      last = now;
      draw(now);
    };

    const onPointer = (e: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      if (!box.width) return;
      tx = (e.clientX - box.left) / box.width;
      ty = 1 - (e.clientY - box.top) / box.height;
    };
    /* A still frame has to follow the box when the window (or a
       foldable) changes size. */
    const onResize = () => draw(start + 9000);

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
            visible = entries[0]?.isIntersecting ?? true;
          })
        : null;
    observer?.observe(canvas);

    if (still) {
      draw(start + 9000);
      window.addEventListener("resize", onResize);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [cx, cy, gain]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      data-ember-shader
      className={cn("mix-blend-screen pointer-events-none absolute inset-0 block h-full w-full", className)}
      style={{
        background:
          "radial-gradient(55% 65% at 74% 52%, rgba(255,114,27,0.28), rgba(217,54,28,0.08) 55%, rgba(11,9,7,0) 78%), #0b0907",
      }}
    />
  );
}
