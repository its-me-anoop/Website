"use client";

import { useEffect, useRef } from "react";

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

/* Domain-warped fbm aurora: two warp passes feed a third fbm lookup,
   blended through deep indigo -> teal -> magenta. Mouse drifts the
   field; u_dim fades the show as the hero scrolls away. */
const FRAG = `precision highp float;
uniform vec2 u_res;uniform float u_time;uniform vec2 u_mouse;uniform float u_dim;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.;float a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.03;a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res.xy;
 vec2 p=uv*vec2(u_res.x/u_res.y,1.);
 float t=u_time*.045;
 vec2 q=vec2(fbm(p*1.3+t),fbm(p*1.3-t*.7));
 vec2 r=vec2(fbm(p*1.7+q*1.6+vec2(1.7,9.2)+t*.55),fbm(p*1.7+q*1.6+vec2(8.3,2.8)-t*.4));
 float f=fbm(p*1.5+r*1.9+(u_mouse-.5)*.55);
 vec3 c1=vec3(.016,.02,.045);
 vec3 c2=vec3(.11,.08,.34);
 vec3 c3=vec3(.02,.48,.40);
 vec3 c4=vec3(.58,.16,.46);
 vec3 col=mix(c1,c2,smoothstep(.12,.72,f));
 col=mix(col,c3,smoothstep(.42,.88,q.x*f)*.75);
 col=mix(col,c4,smoothstep(.5,.97,r.y)*.45);
 float vig=smoothstep(1.3,.32,length(uv-vec2(.5,.55)));
 col*=vig;
 col*=mix(1.,.3,u_dim);
 gl_FragColor=vec4(col,1.);
}`;

/* If WebGL is unavailable the canvas stays unpainted and this CSS
   gradient shows through — a calm, static stand-in for the shader. */
const CSS_FALLBACK =
  "radial-gradient(90% 70% at 72% 8%, rgba(139,124,255,.18), transparent 62%)," +
  "radial-gradient(85% 65% at 18% 32%, rgba(61,242,196,.11), transparent 60%)," +
  "radial-gradient(70% 60% at 55% 80%, rgba(255,111,203,.08), transparent 65%)," +
  "#05060A";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Fixed full-viewport stack behind the homepage: WebGL aurora canvas,
 * a top-light vignette, and a film-grain overlay. Reduced-motion users
 * get a single static shader frame instead of the animation loop.
 */
export function AuroraBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
      });
    } catch {
      gl = null;
    }
    if (!gl) return;
    const ctx = gl;

    const mk = (type: number, src: string) => {
      const s = ctx.createShader(type);
      if (!s) return null;
      ctx.shaderSource(s, src);
      ctx.compileShader(s);
      return s;
    };
    const vs = mk(ctx.VERTEX_SHADER, VERT);
    const fs = mk(ctx.FRAGMENT_SHADER, FRAG);
    const prog = ctx.createProgram();
    if (!vs || !fs || !prog) return;
    ctx.attachShader(prog, vs);
    ctx.attachShader(prog, fs);
    ctx.linkProgram(prog);
    if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) return;

    ctx.useProgram(prog);
    const buf = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
    ctx.bufferData(
      ctx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      ctx.STATIC_DRAW
    );
    const loc = ctx.getAttribLocation(prog, "a");
    ctx.enableVertexAttribArray(loc);
    ctx.vertexAttribPointer(loc, 2, ctx.FLOAT, false, 0, 0);
    const uRes = ctx.getUniformLocation(prog, "u_res");
    const uTime = ctx.getUniformLocation(prog, "u_time");
    const uMouse = ctx.getUniformLocation(prog, "u_mouse");
    const uDim = ctx.getUniformLocation(prog, "u_dim");

    const cleanups: Array<() => void> = [];
    let mx = 0.5,
      my = 0.5,
      tx = 0.5,
      ty = 0.5;

    const draw = (timeSec: number) => {
      const dim = Math.min(1, window.scrollY / (window.innerHeight * 1.1));
      ctx.uniform2f(uRes, canvas.width, canvas.height);
      ctx.uniform1f(uTime, timeSec);
      ctx.uniform2f(uMouse, mx, my);
      ctx.uniform1f(uDim, dim);
      ctx.drawArrays(ctx.TRIANGLES, 0, 3);
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const s = 0.5; // half-res — fbm x5 octaves is heavy at full DPR
      canvas.width = Math.max(2, Math.floor(window.innerWidth * s));
      canvas.height = Math.max(2, Math.floor(window.innerHeight * s));
      ctx.viewport(0, 0, canvas.width, canvas.height);
      if (reduced) draw(14);
    };
    resize();
    window.addEventListener("resize", resize);
    cleanups.push(() => window.removeEventListener("resize", resize));

    if (!reduced) {
      const onMove = (e: MouseEvent) => {
        tx = e.clientX / window.innerWidth;
        ty = 1 - e.clientY / window.innerHeight;
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("mousemove", onMove));

      let raf = 0;
      const t0 = performance.now();
      const loop = (now: number) => {
        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;
        draw((now - t0) / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanups.push(() => cancelAnimationFrame(raf));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
        style={{ background: CSS_FALLBACK }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 95% at 50% 0%, transparent 38%, rgba(5,6,10,.62) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] opacity-[.055] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
    </>
  );
}
