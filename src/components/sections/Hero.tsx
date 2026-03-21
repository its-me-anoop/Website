"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type TrackerState = {
  targetX: number;
  targetY: number;
  targetDepth: number;
  isFaceTracking: boolean;
  lastFaceSeenAt: number;
};

type FaceBoundingBox = {
  xCenter: number;
  yCenter: number;
  width: number;
  height: number;
};

type FaceResults = {
  detections?: Array<{
    boundingBox: FaceBoundingBox;
  }>;
};

type MediaPipeFaceDetection = {
  setOptions: (options: { model?: string; minDetectionConfidence?: number }) => void;
  onResults: (listener: (results: FaceResults) => void) => void;
  send: (inputs: { image: HTMLVideoElement }) => Promise<void>;
  close: () => Promise<void>;
};

type MediaPipeCameraInstance = {
  start: () => Promise<void>;
  stop: () => Promise<void>;
};

type MediaPipeWindow = Window & {
  Camera?: new (
    video: HTMLVideoElement,
    options: {
      onFrame: () => Promise<void>;
      width?: number;
      height?: number;
      facingMode?: "user" | "environment";
    }
  ) => MediaPipeCameraInstance;
  FaceDetection?: new (config?: {
    locateFile?: (path: string, prefix?: string) => string;
  }) => MediaPipeFaceDetection;
};

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const inputVideoRef = useRef<HTMLVideoElement | null>(null);
  const welcomeTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const container = canvasContainerRef.current;
    const inputVideo = inputVideoRef.current;
    const welcomeText = welcomeTextRef.current;

    if (!hero || !container || !inputVideo || !welcomeText) {
      return;
    }

    const tracker: TrackerState = {
      targetX: 0,
      targetY: 0,
      targetDepth: 0,
      isFaceTracking: false,
      lastFaceSeenAt: 0,
    };

    let animationFrameId = 0;
    let mediaCamera: MediaPipeCameraInstance | null = null;
    let faceDetection: MediaPipeFaceDetection | null = null;

    const updateTargetFromPointer = (clientX: number, clientY: number) => {
      if (tracker.isFaceTracking) {
        return;
      }

      tracker.targetX = THREE.MathUtils.clamp(
        (clientX / window.innerWidth) * 2 - 1,
        -1,
        1
      );
      tracker.targetY = THREE.MathUtils.clamp(
        -((clientY / window.innerHeight) * 2 - 1),
        -1,
        1
      );
      tracker.targetDepth = THREE.MathUtils.clamp(
        1 - (clientY / window.innerHeight) * 2,
        -0.35,
        0.35
      );
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateTargetFromPointer(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        updateTargetFromPointer(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090c12);
    scene.fog = new THREE.FogExp2(0x0d1017, 0.018);

    const camera = new THREE.PerspectiveCamera(
      58,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 2.25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.HemisphereLight(0x6276a8, 0x06070a, 0.42);
    scene.add(ambientLight);

    const coldTopLight = new THREE.PointLight(0x29d8ff, 26, 18, 2);
    coldTopLight.position.set(0, 4.2, -11.8);
    coldTopLight.castShadow = true;
    scene.add(coldTopLight);

    const cyanPoolLight = new THREE.PointLight(0x2af2ff, 32, 16, 2);
    cyanPoolLight.position.set(0, -3.6, -10.4);
    scene.add(cyanPoolLight);

    const magentaFillLight = new THREE.PointLight(0xff4fd8, 15, 18, 2);
    magentaFillLight.position.set(-3.6, -1.5, -9.2);
    scene.add(magentaFillLight);

    const blueRimLight = new THREE.PointLight(0x4f8dff, 12, 20, 2);
    blueRimLight.position.set(4.8, 0.8, -13.5);
    scene.add(blueRimLight);

    const amberCeilingWash = new THREE.PointLight(0xff8f3f, 18, 24, 2);
    amberCeilingWash.position.set(0, 4.7, -15.5);
    scene.add(amberCeilingWash);

    const flameLights: THREE.PointLight[] = [];
    const flameMeshes: THREE.Mesh[] = [];

    const baseGroup = new THREE.Group();
    scene.add(baseGroup);

    const roomWidth = 14;
    const roomHeight = 9;
    const roomDepth = 18;

    const makeCanvasTexture = (
      draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
    ) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const context = canvas.getContext("2d");

      if (!context) {
        return new THREE.CanvasTexture(canvas);
      }

      draw(context, canvas);
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    const floorTexture = makeCanvasTexture((ctx, canvas) => {
      ctx.fillStyle = "#2c211d";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const slab = 160;
      for (let y = 0; y < canvas.height; y += slab) {
        for (let x = 0; x < canvas.width; x += slab) {
          const hue = 36 + Math.floor(Math.random() * 12);
          const light = 17 + Math.floor(Math.random() * 8);
          ctx.fillStyle = `hsl(${hue} 18% ${light}%)`;
          ctx.fillRect(x + 4, y + 4, slab - 8, slab - 8);
          ctx.strokeStyle = "rgba(0,0,0,0.35)";
          ctx.lineWidth = 5;
          ctx.strokeRect(x + 4, y + 4, slab - 8, slab - 8);
        }
      }
    });
    floorTexture.repeat.set(4, 6);

    const stoneTexture = makeCanvasTexture((ctx, canvas) => {
      ctx.fillStyle = "#5a4946";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const blockW = 220;
      const blockH = 170;

      for (let row = 0; row < canvas.height / blockH + 1; row += 1) {
        const offset = row % 2 === 0 ? 0 : blockW / 2;
        for (let x = -offset; x < canvas.width; x += blockW) {
          const hue = 20 + Math.floor(Math.random() * 14);
          const sat = 12 + Math.floor(Math.random() * 10);
          const light = 34 + Math.floor(Math.random() * 12);
          ctx.fillStyle = `hsl(${hue} ${sat}% ${light}%)`;
          ctx.fillRect(x + 8, row * blockH + 8, blockW - 16, blockH - 16);
          const surface = ctx.createLinearGradient(
            x + 8,
            row * blockH + 8,
            x + blockW - 8,
            row * blockH + blockH - 8
          );
          surface.addColorStop(0, "rgba(255,255,255,0.08)");
          surface.addColorStop(0.5, "rgba(255,255,255,0.01)");
          surface.addColorStop(1, "rgba(0,0,0,0.12)");
          ctx.fillStyle = surface;
          ctx.fillRect(x + 8, row * blockH + 8, blockW - 16, blockH - 16);
          ctx.strokeStyle = "rgba(18,14,14,0.55)";
          ctx.lineWidth = 8;
          ctx.strokeRect(x + 8, row * blockH + 8, blockW - 16, blockH - 16);

          for (let i = 0; i < 90; i += 1) {
            const alpha = 0.03 + Math.random() * 0.05;
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fillRect(
              x + 16 + Math.random() * (blockW - 32),
              row * blockH + 16 + Math.random() * (blockH - 32),
              2 + Math.random() * 3,
              2 + Math.random() * 3
            );
          }

          for (let i = 0; i < 4; i += 1) {
            const crackX = x + 20 + Math.random() * (blockW - 40);
            const crackY = row * blockH + 20 + Math.random() * (blockH - 40);
            ctx.strokeStyle = `rgba(22,16,15,${0.18 + Math.random() * 0.22})`;
            ctx.lineWidth = 1 + Math.random() * 2;
            ctx.beginPath();
            ctx.moveTo(crackX, crackY);
            ctx.lineTo(crackX + Math.random() * 40 - 20, crackY + Math.random() * 18 - 9);
            ctx.lineTo(crackX + Math.random() * 68 - 34, crackY + Math.random() * 28 - 14);
            ctx.stroke();
          }
        }
      }
    });
    stoneTexture.repeat.set(4, 2.6);

    const ceilingTexture = makeCanvasTexture((ctx, canvas) => {
      ctx.fillStyle = "#3f2b27";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 12; i += 1) {
        const y = i * 86;
        ctx.fillStyle = i % 2 === 0 ? "#4a312b" : "#2f211f";
        ctx.fillRect(0, y, canvas.width, 60);
        ctx.strokeStyle = "rgba(255,171,89,0.16)";
        ctx.strokeRect(0, y, canvas.width, 60);
      }
    });
    ceilingTexture.repeat.set(1, 2);

    const addMesh = (
      parent: THREE.Object3D,
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      options: {
        rotation?: [number, number, number];
        position?: [number, number, number];
        scale?: [number, number, number];
        castShadow?: boolean;
        receiveShadow?: boolean;
      } = {}
    ) => {
      const mesh = new THREE.Mesh(geometry, material);
      if (options.rotation) {
        mesh.rotation.set(...options.rotation);
      }
      if (options.position) {
        mesh.position.set(...options.position);
      }
      if (options.scale) {
        mesh.scale.set(...options.scale);
      }
      mesh.castShadow = options.castShadow ?? true;
      mesh.receiveShadow = options.receiveShadow ?? true;
      parent.add(mesh);
      return mesh;
    };

    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x65524d,
      roughness: 0.96,
      metalness: 0.03,
      map: stoneTexture,
    });

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d211d,
      roughness: 0.78,
      metalness: 0.04,
      map: floorTexture,
    });

    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a332d,
      roughness: 0.88,
      metalness: 0.06,
      map: ceilingTexture,
    });

    const shelfMaterial = new THREE.MeshStandardMaterial({
      color: 0x241511,
      roughness: 0.8,
      metalness: 0.08,
    });

    const cyanMaterial = new THREE.MeshStandardMaterial({
      color: 0x66e8ff,
      emissive: 0x18c7ff,
      emissiveIntensity: 1.25,
      roughness: 0.24,
      metalness: 0.05,
    });

    addMesh(baseGroup, new THREE.PlaneGeometry(roomWidth, roomDepth), floorMaterial, {
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -roomHeight / 2, -roomDepth / 2],
      castShadow: false,
    });

    addMesh(baseGroup, new THREE.PlaneGeometry(roomWidth, roomDepth), ceilingMaterial, {
      rotation: [Math.PI / 2, 0, 0],
      position: [0, roomHeight / 2, -roomDepth / 2],
    });

    const buildBrickWall = (type: "back" | "left" | "right") => {
      const rows = 5;
      const blockW = 2.2;
      const blockH = 1.55;
      const depth = 0.9;

      for (let row = 0; row < rows; row += 1) {
        const y = -3.5 + row * blockH;
        const cols = type === "back" ? 7 : 8;

        for (let col = 0; col < cols; col += 1) {
          const stagger = row % 2 === 0 ? 0 : blockW * 0.5;

          if (type === "back") {
            const x = -6.6 + col * blockW + stagger;
            addMesh(
              baseGroup,
              new THREE.BoxGeometry(blockW - 0.12, blockH - 0.12, depth),
              stoneMaterial,
              { position: [x, y, -17.4] }
            );
          } else {
            const z = -4.7 - col * 1.8 - stagger * 0.45;
            addMesh(
              baseGroup,
              new THREE.BoxGeometry(depth, blockH - 0.12, 1.75),
              stoneMaterial,
              { position: [type === "left" ? -6.85 : 6.85, y, z] }
            );
          }
        }
      }
    };

    buildBrickWall("back");
    buildBrickWall("left");
    buildBrickWall("right");

    for (let i = 0; i < 10; i += 1) {
      addMesh(
        baseGroup,
        new THREE.BoxGeometry(1.45, 0.42, roomDepth - 0.4),
        new THREE.MeshStandardMaterial({ color: 0x3e2c28, roughness: 0.84 }),
        { position: [-6.2 + i * 1.38, 4.25, -9.2] }
      );
    }

    const centerPool = addMesh(
      baseGroup,
      new THREE.BoxGeometry(3.15, 0.4, 2.6),
      cyanMaterial,
      { position: [0, -3.95, -10.3] }
    );
    const centerPoolMaterial = centerPool.material as THREE.MeshStandardMaterial;

    addMesh(baseGroup, new THREE.BoxGeometry(5.2, 0.55, 3.9), stoneMaterial, {
      position: [0, -4.7, -10.3],
    });

    addMesh(baseGroup, new THREE.BoxGeometry(6.8, 0.75, 5.4), stoneMaterial, {
      position: [0, -4.95, -10.3],
    });

    [
      [-2.4, -3.45, -8.7, 2.4, 0.9, 1.6],
      [2.4, -3.45, -8.7, 2.4, 0.9, 1.6],
      [-1.55, -2.85, -10.1, 2.1, 1.05, 1.8],
      [1.55, -2.85, -10.1, 2.1, 1.05, 1.8],
      [-0.85, -2.2, -11.8, 1.8, 1.15, 2],
      [0.85, -2.2, -11.8, 1.8, 1.15, 2],
      [4.25, -3.1, -9.3, 1.8, 1.2, 2],
      [5.15, -2.3, -10.6, 1.35, 1.15, 1.7],
    ].forEach(([x, y, z, w, h, d]) => {
      addMesh(baseGroup, new THREE.BoxGeometry(w, h, d), stoneMaterial, {
        position: [x, y, z],
      });
    });

    addMesh(baseGroup, new THREE.BoxGeometry(3.6, 0.28, 0.7), shelfMaterial, {
      position: [-1.8, 0.75, -16.65],
    });

    addMesh(baseGroup, new THREE.BoxGeometry(3.2, 0.28, 0.7), shelfMaterial, {
      position: [2.45, 0.75, -16.65],
    });

    [-2.8, -2.1, -1.4, 1.9, 2.55, 3.15].forEach((x, index) => {
      addMesh(
        baseGroup,
        new THREE.BoxGeometry(0.22, 0.9 + (index % 3) * 0.12, 0.48),
        new THREE.MeshStandardMaterial({
          color: [0x8f5e3c, 0x69453b, 0x9a7b56, 0x59413b, 0x987c4d, 0x815742][index],
          roughness: 0.84,
        }),
        { position: [x, 1.25, -16.55] }
      );
    });

    const addTorch = (x: number) => {
      addMesh(baseGroup, new THREE.BoxGeometry(0.2, 0.9, 0.18), shelfMaterial, {
        position: [x, 0.35, -16.75],
      });
      addMesh(
        baseGroup,
        new THREE.CylinderGeometry(0.08, 0.12, 0.65, 14),
        new THREE.MeshStandardMaterial({
          color: 0x2b1d17,
          roughness: 0.75,
          metalness: 0.22,
        }),
        {
          position: [x, 0.78, -16.25],
          rotation: [0.2, 0, 0],
        }
      );

      const flame = addMesh(
        baseGroup,
        new THREE.SphereGeometry(0.22, 14, 14),
        new THREE.MeshStandardMaterial({
          color: 0xffc875,
          emissive: 0xff7c2f,
          emissiveIntensity: 1.8,
        }),
        {
          position: [x, 1.48, -16.05],
          castShadow: false,
        }
      );

      flameMeshes.push(flame);

      const torchLight = new THREE.PointLight(0xff9b42, 28, 8, 2);
      torchLight.position.set(x, 1.35, -15.8);
      torchLight.castShadow = true;
      scene.add(torchLight);
      flameLights.push(torchLight);
    };

    addTorch(-5.2);
    addTorch(5.2);

    [-2.25, 0, 2.25].forEach((x, index) => {
      const rune = addMesh(
        baseGroup,
        new THREE.BoxGeometry(0.32, 0.9, 0.16),
        new THREE.MeshStandardMaterial({
          color: [0x7ce4ff, 0xffa95b, 0xa26cff][index],
          emissive: [0x0f7d9f, 0xa34b08, 0x4b1ca8][index],
          emissiveIntensity: 0.8,
          roughness: 0.28,
          metalness: 0.12,
        }),
        {
          position: [x, -1.15, -15.45],
          castShadow: false,
        }
      );
      rune.rotation.y = 0.06 * (index - 1);
    });

    const ceilingGlow = addMesh(
      baseGroup,
      new THREE.BoxGeometry(3.2, 0.18, 0.8),
      cyanMaterial,
      {
        position: [0, 4.05, -11.7],
        castShadow: false,
      }
    );
    const ceilingGlowMaterial = ceilingGlow.material as THREE.MeshStandardMaterial;

    const foregroundGroup = new THREE.Group();
    foregroundGroup.position.set(-4.9, -4.8, -5.4);
    baseGroup.add(foregroundGroup);

    addMesh(foregroundGroup, new THREE.BoxGeometry(2.8, 1, 1.8), stoneMaterial, {
      position: [0, 0.55, 0],
    });
    addMesh(foregroundGroup, new THREE.BoxGeometry(2.4, 0.8, 1.45), stoneMaterial, {
      position: [0.65, 1.3, -0.2],
    });

    addMesh(baseGroup, new THREE.BoxGeometry(2.2, 1.3, 1.8), stoneMaterial, {
      position: [4.95, -4.2, -6],
    });

    const particles = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({
        size: 0.06,
        color: 0xffd2a6,
        transparent: true,
        opacity: 0.52,
      })
    );

    const particlePositions: number[] = [];
    for (let i = 0; i < 260; i += 1) {
      particlePositions.push(
        THREE.MathUtils.randFloatSpread(12),
        THREE.MathUtils.randFloat(-3.8, 4.8),
        THREE.MathUtils.randFloat(-17, -4)
      );
    }

    particles.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particlePositions, 3)
    );
    scene.add(particles);

    const estimateDepthFromFaceSize = (bbox: FaceBoundingBox) => {
      const faceScale = Math.max(bbox.width, bbox.height);
      const normalizedDepth = THREE.MathUtils.clamp(
        THREE.MathUtils.inverseLerp(0.16, 0.42, faceScale),
        0,
        1
      );
      return normalizedDepth * 2 - 1;
    };

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });

    const initFaceTracking = async () => {
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js");

        const mediaPipeWindow = window as MediaPipeWindow;
        if (!mediaPipeWindow.Camera || !mediaPipeWindow.FaceDetection) {
          throw new Error("MediaPipe scripts loaded without expected globals.");
        }

        faceDetection = new mediaPipeWindow.FaceDetection({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
        });

        faceDetection.setOptions({
          model: "short",
          minDetectionConfidence: 0.55,
        });

        faceDetection.onResults((results: FaceResults) => {
          const detection = results.detections?.[0];

          if (!detection) {
            if (performance.now() - tracker.lastFaceSeenAt > 800 && tracker.isFaceTracking) {
              tracker.isFaceTracking = false;
              tracker.targetDepth = 0;
            }
            return;
          }

          const bbox = detection.boundingBox;
          tracker.targetX = THREE.MathUtils.clamp((bbox.xCenter - 0.5) * -2.2, -1, 1);
          tracker.targetY = THREE.MathUtils.clamp((bbox.yCenter - 0.5) * -2.2, -1, 1);
          tracker.targetDepth = estimateDepthFromFaceSize(bbox);
          tracker.lastFaceSeenAt = performance.now();
          tracker.isFaceTracking = true;
        });

        mediaCamera = new mediaPipeWindow.Camera(inputVideo, {
          onFrame: async () => {
            await faceDetection?.send({ image: inputVideo });
          },
          width: 480,
          height: 360,
          facingMode: "user",
        });

        await mediaCamera.start();
      } catch (error) {
        console.warn("Unable to start face tracking.", error);
        tracker.isFaceTracking = false;
        tracker.targetDepth = 0;
      }
    };

    void initFaceTracking();

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const smoothness = 0.075;
      const depthSmoothing = 0.05;
      const currentDepth = (camera.userData.depth as number | undefined) ?? 0;
      const smoothedDepth = currentDepth + (tracker.targetDepth - currentDepth) * depthSmoothing;
      camera.userData.depth = smoothedDepth;

      const parallaxMultiplier =
        1 + THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, -0.18, 0.42);
      const rangeX = 4.7 * parallaxMultiplier;
      const rangeY = 2.45 * parallaxMultiplier;
      const targetZ = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, 1.65, 2.65);
      const targetFov = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, 66, 52);

      camera.position.x += (tracker.targetX * rangeX - camera.position.x) * smoothness;
      camera.position.y += (tracker.targetY * rangeY - camera.position.y) * smoothness;
      camera.position.z += (targetZ - camera.position.z) * depthSmoothing;
      camera.fov += (targetFov - camera.fov) * depthSmoothing;
      camera.updateProjectionMatrix();

      centerPoolMaterial.emissiveIntensity = 1.15 + Math.sin(elapsed * 1.6) * 0.14;
      ceilingGlowMaterial.emissiveIntensity = 1.05 + Math.sin(elapsed * 1.3) * 0.1;
      foregroundGroup.rotation.y = Math.sin(elapsed * 0.28) * 0.12;
      particles.rotation.y = elapsed * 0.01;

      coldTopLight.intensity = 24 + Math.sin(elapsed * 1.1) * 2;
      cyanPoolLight.intensity = 30 + Math.sin(elapsed * 1.5) * 2.4;
      magentaFillLight.intensity = 12 + Math.sin(elapsed * 0.9 + 1.3) * 1.8;
      blueRimLight.intensity = 10 + Math.cos(elapsed * 0.8) * 1.4;
      amberCeilingWash.intensity = 17 + Math.sin(elapsed * 0.6) * 2.2;
      flameLights.forEach((light, index) => {
        light.intensity =
          25 + Math.sin(elapsed * 7 + index * 0.9) * 6 + Math.random() * 1.8;
      });
      flameMeshes.forEach((flame, index) => {
        flame.scale.y = 1 + Math.sin(elapsed * 8 + index) * 0.12;
        flame.scale.x = 1 + Math.cos(elapsed * 6 + index) * 0.06;
      });

      const heroHeight = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const scrollProgress = THREE.MathUtils.clamp(window.scrollY / heroHeight, 0, 1);
      const revealProgress = THREE.MathUtils.clamp((scrollProgress - 0.015) / 0.24, 0, 1);
      const easedReveal = 1 - Math.pow(1 - revealProgress, 3);

      const textDepthOffset = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, -34, 28);
      const textScaleDepth = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, 0.9, 1.08);
      const textRotateXDepth = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, 10, -12);
      const textTranslateX = camera.position.x * 7.5;
      const textTranslateY = camera.position.y * 9 + textDepthOffset;
      const textRotateY = camera.position.x * -2.4;
      const textRotateZ = (0.5 - scrollProgress) * 5 + camera.position.x * -0.65;

      welcomeText.classList.toggle("opacity-0", scrollProgress <= 0.01);
      welcomeText.classList.toggle("opacity-100", scrollProgress > 0.01);
      welcomeText.style.opacity = `${easedReveal}`;
      welcomeText.style.transform =
        `translate3d(${textTranslateX}px, ${-56 + (1 - easedReveal) * 82 + textTranslateY}px, 0) ` +
        `rotateX(${8 + (1 - easedReveal) * -64 + textRotateXDepth}deg) rotateY(${textRotateY}deg) ` +
        `rotateZ(${textRotateZ}deg) scale(${(0.9 + easedReveal * 0.12) * textScaleDepth})`;

      const lookYOffset = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, -1.32, -1.08);
      const lookZ = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, -11.3, -10.3);
      camera.lookAt(0, lookYOffset, lookZ);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);

      void mediaCamera?.stop();
      void faceDetection?.close();

      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else if (mesh.material) {
          mesh.material.dispose();
        }
      });

      renderer.dispose();
      container.innerHTML = "";
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[220vh] bg-background"
      aria-label="Flutterly hero"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={canvasContainerRef} className="absolute inset-0 z-10" />

        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(31, 209, 255, 0.08), transparent 28%), linear-gradient(180deg, rgba(3, 4, 7, 0.1) 0%, rgba(6, 7, 11, 0.28) 55%, rgba(5, 6, 10, 0.76) 100%)",
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center px-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent shadow-[0_0_16px_rgba(212,255,0,0.8)]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-foreground-secondary">
              Scroll down
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[12vh] z-30 flex justify-center px-4">
          <div
            ref={welcomeTextRef}
            className="w-[min(1000px,calc(100vw-48px))] text-center opacity-0 [transform-style:preserve-3d]"
          >
            <span className="block text-[clamp(2.8rem,8vw,7rem)] font-semibold uppercase leading-[0.92] tracking-[-0.06em] text-[#fff7ed] [text-shadow:0_1px_0_rgba(255,255,255,0.05),0_14px_34px_rgba(0,0,0,0.38),0_0_38px_rgba(74,214,255,0.16)]">
              Welcome to
            </span>
            <span className="block bg-[linear-gradient(120deg,#fff3e0_0%,#ffbb74_38%,#62e8ff_100%)] bg-clip-text text-[clamp(2.8rem,8vw,7rem)] font-semibold uppercase leading-[0.92] tracking-[-0.06em] text-transparent [text-shadow:0_1px_0_rgba(255,255,255,0.05),0_14px_34px_rgba(0,0,0,0.38),0_0_38px_rgba(74,214,255,0.16)]">
              Flutterly
            </span>
          </div>
        </div>
      </div>

      <video ref={inputVideoRef} className="hidden" playsInline muted />
    </section>
  );
}
