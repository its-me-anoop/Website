/**
 * Pure pieces of the hero aurora: GLSL sources, buffer sizing and
 * pointer easing. Kept free of React and the DOM so they are testable
 * and the renderer (AuroraCanvas) stays a thin lifecycle wrapper.
 */

export const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/**
 * Domain-warped fractal noise folded into slow, rising sheets of
 * molten light. The palette runs ember → orange → amber → gold over a
 * warm near-black, the pointer bends the field like heat haze, and a
 * vignette keeps the edges dark so headline text always sits on a
 * low-luminance ground.
 */
export const FRAGMENT_SHADER = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_pointer;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  float t = u_time * 0.045;
  /* Heat rises: the whole field drifts slowly upwards. */
  p.y -= t * 0.55;

  vec2 m = (u_pointer - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  float pull = exp(-2.2 * length(p - m));
  p += (p - m) * pull * 0.18;

  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t)), fbm(p * 1.4 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p * 1.6 + 3.0 * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p * 1.6 + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.2 + 2.6 * r);

  float curtain = smoothstep(0.15, 0.95, f) * (0.55 + 0.45 * sin(p.x * 3.0 + r.y * 6.0 + t * 8.0));

  vec3 ember = vec3(0.42, 0.07, 0.02);
  vec3 orange = vec3(1.0, 0.40, 0.08);
  vec3 amber = vec3(1.0, 0.64, 0.12);
  vec3 gold = vec3(1.0, 0.84, 0.48);

  vec3 col = mix(ember, orange, smoothstep(0.15, 0.65, q.x));
  col = mix(col, amber, smoothstep(0.45, 0.95, r.x));
  col = mix(col, gold, smoothstep(0.7, 1.0, r.y) * 0.45);

  float glow = curtain * (0.5 + 0.5 * uv.y) + pull * 0.06;
  vec3 night = vec3(0.043, 0.035, 0.027);
  /* A high exponent keeps most of the field black and pools the light
     into molten streaks. */
  vec3 outc = night + col * pow(max(glow, 0.0), 1.4) * 3.6;
  /* White-hot cores where the flow is densest. */
  outc += gold * smoothstep(0.55, 0.95, glow) * 0.35;

  float vig = smoothstep(1.35, 0.2, length((uv - vec2(0.5, 0.6)) * vec2(1.0, 1.3)));
  outc *= mix(0.15, 1.0, vig);
  outc *= smoothstep(0.0, 0.3, uv.y) * 0.75 + 0.25;
  outc = min(outc, vec3(0.78));

  gl_FragColor = vec4(outc, 1.0);
}
`;

export type Size = { width: number; height: number };

/**
 * Drawing-buffer size for a CSS box. The aurora is soft, so it renders
 * at a fraction of device resolution and is stretched by the browser;
 * `maxPixels` caps the cost on very large screens.
 */
export function canvasSize(
  cssWidth: number,
  cssHeight: number,
  dpr: number,
  { scale = 0.5, maxPixels = 900_000 }: { scale?: number; maxPixels?: number } = {}
): Size {
  let width = cssWidth * dpr * scale;
  let height = cssHeight * dpr * scale;
  const pixels = width * height;
  if (pixels > maxPixels) {
    const k = Math.sqrt(maxPixels / pixels);
    width *= k;
    height *= k;
  }
  return { width: Math.max(1, Math.floor(width)), height: Math.max(1, Math.floor(height)) };
}

export type Point = { x: number; y: number };

/** One frame of exponential easing towards the pointer. */
export function easePointer(current: Point, target: Point, factor: number): Point {
  return {
    x: current.x + (target.x - current.x) * factor,
    y: current.y + (target.y - current.y) * factor,
  };
}
