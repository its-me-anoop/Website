"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────
   Fragment shader — a slow, domain-warped fractal-noise "aurora" tinted
   with the studio palette (citron signal + azure + plum) over obsidian.
   Cheap enough for 60fps: a single fullscreen plane, ~5 octaves of fbm.
   ───────────────────────────────────────────────────────────────────── */
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec2  uPointer;

  // Ashima 2D simplex noise -------------------------------------------------
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for(int i = 0; i < 5; i++){
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    uv.x *= uAspect;
    float t = uTime * 0.045;

    // Domain warp: noise feeding noise for an organic, flowing field.
    vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(3.2, 1.7) - t));
    vec2 r = vec2(fbm(uv + 1.4 * q + vec2(8.3, 2.8) + t * 0.6),
                  fbm(uv + 1.4 * q + vec2(1.2, 6.5) - t * 0.6));
    float f = fbm(uv + 1.8 * r);

    // Subtle pointer-driven lift.
    float dist = distance(vUv, uPointer * 0.5 + 0.5);
    float lift = smoothstep(0.6, 0.0, dist) * 0.12;

    vec3 obsidian = vec3(0.039, 0.039, 0.047);
    vec3 signal   = vec3(0.831, 0.949, 0.298); // citron
    vec3 azure    = vec3(0.486, 0.608, 1.0);
    vec3 plum     = vec3(0.710, 0.549, 1.0);

    vec3 col = obsidian;
    col = mix(col, azure,  smoothstep(0.0, 1.0, f) * 0.16);
    col = mix(col, plum,   smoothstep(0.3, 1.2, r.x + r.y) * 0.10);
    col = mix(col, signal, smoothstep(0.65, 1.3, f + lift) * 0.14);
    col += lift * signal * 0.4;

    // Vignette keeps the centre calm and edges deep.
    float vig = smoothstep(1.25, 0.25, length(vUv - 0.5));
    col *= 0.72 + 0.28 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function FieldPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value += delta;
    mat.current.uniforms.uAspect.value = viewport.width / viewport.height;
    // Ease the pointer for a soft trailing response.
    const p = mat.current.uniforms.uPointer.value as THREE.Vector2;
    p.x += (pointer.x - p.x) * 0.04;
    p.y += (pointer.y - p.y) * 0.04;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/**
 * Fullscreen, fixed WebGL canvas rendering the animated aurora field.
 * Imported dynamically (client-only) by ShaderBackground so three.js never
 * ships to the server bundle or to reduced-motion users.
 */
export function ShaderField() {
  return (
    <Canvas
      aria-hidden="true"
      className="!fixed inset-0 -z-10"
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 1], fov: 50 }}
      frameloop="always"
    >
      <FieldPlane />
    </Canvas>
  );
}

export default ShaderField;
