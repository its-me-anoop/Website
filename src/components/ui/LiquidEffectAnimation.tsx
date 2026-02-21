"use client";

import { useEffect, useRef } from "react";

interface LiquidEffectAnimationProps {
  text?: string[];
  subText?: string;
  tagline?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

// --- GLSL Shaders ---

const noiseGLSL = /* glsl */ `
  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uTouchActive;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vDisplacement;
  varying vec3 vPosition;

  ${noiseGLSL}

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Multi-octave noise for organic liquid surface
    float n1 = snoise(vec3(pos.x * 1.8, pos.y * 1.8, uTime * 0.35)) * 0.12;
    float n2 = snoise(vec3(pos.x * 3.5, pos.y * 3.5, uTime * 0.5 + 10.0)) * 0.05;
    float n3 = snoise(vec3(pos.x * 6.0, pos.y * 6.0, uTime * 0.7 + 20.0)) * 0.02;
    float noise = n1 + n2 + n3;

    // Pointer interaction ripple (mouse + touch)
    float mouseDist = distance(uv, uMouse);
    float rippleStrength = 0.08 + uTouchActive * 0.12;
    float rippleRadius = 5.0 - uTouchActive * 2.0;
    float mouseWave = sin(mouseDist * 25.0 - uTime * 4.0) * exp(-mouseDist * rippleRadius) * rippleStrength;

    pos.z += noise + mouseWave;
    vDisplacement = pos.z;
    vPosition = pos;

    // Compute displaced normal via finite differences
    float eps = 0.01;
    float nX = snoise(vec3((pos.x + eps) * 1.8, pos.y * 1.8, uTime * 0.35)) * 0.12
             + snoise(vec3((pos.x + eps) * 3.5, pos.y * 3.5, uTime * 0.5 + 10.0)) * 0.05;
    float nY = snoise(vec3(pos.x * 1.8, (pos.y + eps) * 1.8, uTime * 0.35)) * 0.12
             + snoise(vec3(pos.x * 3.5, (pos.y + eps) * 3.5, uTime * 0.5 + 10.0)) * 0.05;
    vec3 tangent = vec3(eps, 0.0, nX - (n1 + n2));
    vec3 bitangent = vec3(0.0, eps, nY - (n1 + n2));
    vNormal = normalize(cross(tangent, bitangent));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uMetalness;
  uniform float uRoughness;
  uniform vec3 uAccentColor;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vDisplacement;
  varying vec3 vPosition;

  void main() {
    // UV distortion for liquid refraction
    vec2 uv = vUv;
    uv.x += sin(vUv.y * 12.0 + uTime * 0.4) * 0.004;
    uv.y += cos(vUv.x * 12.0 + uTime * 0.35) * 0.004;

    // Clamp UVs
    uv = clamp(uv, 0.0, 1.0);

    vec4 texColor = texture2D(uTexture, uv);

    // Blinn-Phong lighting
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    vec3 normal = normalize(vNormal);

    // Key light
    vec3 lightDir1 = normalize(vec3(1.5, 1.5, 2.0));
    vec3 halfDir1 = normalize(lightDir1 + viewDir);
    float diff1 = max(dot(normal, lightDir1), 0.0) * 0.6;
    float spec1 = pow(max(dot(normal, halfDir1), 0.0), mix(16.0, 128.0, 1.0 - uRoughness));

    // Fill light (accent colored)
    vec3 lightDir2 = normalize(vec3(-1.0, 0.5, 1.5));
    vec3 halfDir2 = normalize(lightDir2 + viewDir);
    float diff2 = max(dot(normal, lightDir2), 0.0) * 0.3;
    float spec2 = pow(max(dot(normal, halfDir2), 0.0), mix(8.0, 64.0, 1.0 - uRoughness));

    // Fresnel (edge glow)
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

    // Combine lighting
    vec3 color = texColor.rgb;
    color += diff1 * 0.15;
    color += diff2 * uAccentColor * 0.12;
    color += spec1 * uMetalness * 0.35;
    color += spec2 * uAccentColor * uMetalness * 0.2;
    color += fresnel * uMetalness * mix(vec3(0.15), uAccentColor * 0.3, 0.5);

    // Subtle displacement-based shading
    color += vDisplacement * 0.3;

    gl_FragColor = vec4(color, uOpacity);
  }
`;

function createTextTexture(
  THREE: typeof import("three"),
  width: number,
  height: number,
  text: string[],
  subText: string,
  tagline: string,
  backgroundColor: string,
  textColor: string,
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const dpr = Math.min(window.devicePixelRatio, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  // Background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Glowing gradient accents
  const grad1 = ctx.createRadialGradient(
    width * 0.2, height * 0.3, 0,
    width * 0.2, height * 0.3, width * 0.4,
  );
  grad1.addColorStop(0, "rgba(139,158,126,0.12)");
  grad1.addColorStop(1, "transparent");
  ctx.fillStyle = grad1;
  ctx.fillRect(0, 0, width, height);

  const grad2 = ctx.createRadialGradient(
    width * 0.8, height * 0.7, 0,
    width * 0.8, height * 0.7, width * 0.35,
  );
  grad2.addColorStop(0, "rgba(184,112,77,0.1)");
  grad2.addColorStop(1, "transparent");
  ctx.fillStyle = grad2;
  ctx.fillRect(0, 0, width, height);

  // Text
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = textColor;

  const baseFontSize = Math.min(width * 0.1, 140);

  // Calculate total text block height
  const lineHeight = baseFontSize * 1.25;
  const subFontSize = baseFontSize * 0.32;
  const tagFontSize = baseFontSize * 0.22;

  const textBlockHeight =
    text.length * lineHeight +
    (subText ? subFontSize * 2.5 : 0);

  let y = (height - textBlockHeight) / 2 + baseFontSize * 0.5;

  // Main text lines
  ctx.font = `600 ${baseFontSize}px "Fraunces", Georgia, serif`;
  for (const line of text) {
    ctx.fillText(line, width / 2, y);
    y += lineHeight;
  }

  // Subtitle
  if (subText) {
    y += subFontSize * 0.3;
    ctx.font = `400 ${subFontSize}px "Plus Jakarta Sans", system-ui, sans-serif`;
    ctx.fillStyle = textColor + "99";
    ctx.fillText(subText, width / 2, y);
  }

  // Tagline at bottom
  if (tagline) {
    ctx.font = `500 ${tagFontSize}px "Plus Jakarta Sans", system-ui, sans-serif`;
    ctx.fillStyle = textColor + "55";
    ctx.fillText(tagline, width / 2, height - tagFontSize * 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function LiquidEffectAnimation({
  text = ["Thirsty.ai"],
  subText = "",
  tagline = "",
  backgroundColor = "#F5EFE6",
  textColor = "#3D3830",
  className = "",
}: LiquidEffectAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animFrameId: number;
    let disposed = false;
    let rendererDom: HTMLCanvasElement | null = null;
    const container = containerRef.current;

    const init = async () => {
      const THREE = await import("three");
      if (disposed || !container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(backgroundColor);

      // Camera
      const aspect = width / height;
      const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
      camera.position.z = 3;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(new THREE.Color(backgroundColor), 1);
      container.appendChild(renderer.domElement);
      rendererDom = renderer.domElement;

      // Text texture
      const texture = createTextTexture(
        THREE, width, height,
        text, subText, tagline,
        backgroundColor, textColor,
      );

      // Plane geometry
      const planeHeight = 3.2;
      const planeWidth = planeHeight * aspect;
      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 128, 128);

      // Shader material
      const accentColor = new THREE.Color("#B8704D");
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTouchActive: { value: 0.0 },
          uMetalness: { value: 0.35 },
          uRoughness: { value: 0.45 },
          uAccentColor: { value: new THREE.Vector3(accentColor.r, accentColor.g, accentColor.b) },
          uOpacity: { value: 1.0 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Pointer tracking (mouse + touch)
      const mouse = new THREE.Vector2(0.5, 0.5);
      const targetMouse = new THREE.Vector2(0.5, 0.5);
      let touchActive = 0;
      let targetTouchActive = 0;

      const updatePointer = (clientX: number, clientY: number) => {
        const rect = container.getBoundingClientRect();
        targetMouse.x = (clientX - rect.left) / rect.width;
        targetMouse.y = 1.0 - (clientY - rect.top) / rect.height;
      };

      const handleMouseMove = (e: MouseEvent) => {
        updatePointer(e.clientX, e.clientY);
      };

      const handleTouchStart = (e: TouchEvent) => {
        targetTouchActive = 1;
        const touch = e.touches[0];
        updatePointer(touch.clientX, touch.clientY);
      };

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        updatePointer(touch.clientX, touch.clientY);
      };

      const handleTouchEnd = () => {
        targetTouchActive = 0;
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handleTouchMove, { passive: false });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });

      // Animation
      const clock = new THREE.Clock();
      const animate = () => {
        if (disposed) return;

        // Smooth pointer follow (faster lerp for touch responsiveness)
        const lerpSpeed = targetTouchActive > 0.5 ? 0.12 : 0.05;
        mouse.x += (targetMouse.x - mouse.x) * lerpSpeed;
        mouse.y += (targetMouse.y - mouse.y) * lerpSpeed;
        touchActive += (targetTouchActive - touchActive) * 0.08;

        material.uniforms.uTime.value = clock.getElapsedTime();
        material.uniforms.uMouse.value = mouse;
        material.uniforms.uTouchActive.value = touchActive;

        renderer.render(scene, camera);
        animFrameId = requestAnimationFrame(animate);
      };
      animate();

      // Resize
      const handleResize = () => {
        if (disposed || !container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);

        // Recreate texture for new size
        const newTexture = createTextTexture(
          THREE, w, h,
          text, subText, tagline,
          backgroundColor, textColor,
        );
        material.uniforms.uTexture.value.dispose();
        material.uniforms.uTexture.value = newTexture;
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      // Cleanup reference
      return () => {
        disposed = true;
        cancelAnimationFrame(animFrameId);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        resizeObserver.disconnect();
        geometry.dispose();
        material.dispose();
        texture.dispose();
        renderer.dispose();
        if (rendererDom && container.contains(rendererDom)) {
          container.removeChild(rendererDom);
        }
      };
    };

    let cleanupFn: (() => void) | undefined;
    init().then((fn) => {
      cleanupFn = fn;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animFrameId);
      if (cleanupFn) cleanupFn();
      else if (rendererDom && container.contains(rendererDom)) {
        container.removeChild(rendererDom);
      }
    };
  }, [text, subText, tagline, backgroundColor, textColor]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{ minHeight: "200px", touchAction: "none" }}
    />
  );
}
