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
    let isCompactViewport = window.matchMedia("(max-width: 640px)").matches;

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
    scene.fog = new THREE.FogExp2(0x090b12, 0.024);

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
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    const ambientLight = new THREE.HemisphereLight(0x8aa0c7, 0x2b1c14, 0.52);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xd9eeff, 46, 28, 0.38, 0.78, 1.15);
    keyLight.position.set(-1.2, 6.4, -5.8);
    keyLight.target.position.set(0, -1.6, -10.8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.00012;
    scene.add(keyLight);
    scene.add(keyLight.target);

    const coldTopLight = new THREE.PointLight(0x69dbff, 22, 18, 2);
    coldTopLight.position.set(0, 4.2, -11.8);
    coldTopLight.castShadow = true;
    coldTopLight.shadow.mapSize.set(1024, 1024);
    scene.add(coldTopLight);

    const cyanPoolLight = new THREE.PointLight(0x2af2ff, 18, 16, 2);
    cyanPoolLight.position.set(0, -3.6, -10.4);
    scene.add(cyanPoolLight);

    const magentaFillLight = new THREE.PointLight(0xa46cff, 4.5, 18, 2);
    magentaFillLight.position.set(-3.6, -1.5, -9.2);
    scene.add(magentaFillLight);

    const blueRimLight = new THREE.PointLight(0x76a8ff, 7, 20, 2);
    blueRimLight.position.set(4.8, 0.8, -13.5);
    scene.add(blueRimLight);

    const amberCeilingWash = new THREE.PointLight(0xffa25d, 28, 24, 2);
    amberCeilingWash.position.set(0, 4.9, -15.5);
    scene.add(amberCeilingWash);

    const amberRimLight = new THREE.PointLight(0xffb87a, 12, 14, 2);
    amberRimLight.position.set(4.4, 1.8, -8.8);
    scene.add(amberRimLight);

    const moonBackLight = new THREE.DirectionalLight(0xa4d5ff, 2.4);
    moonBackLight.position.set(-3.8, 5.8, -18);
    moonBackLight.target.position.set(0, -1.8, -10.5);
    scene.add(moonBackLight);
    scene.add(moonBackLight.target);

    const floorBounceLight = new THREE.PointLight(0xffb983, 8.8, 18, 2);
    floorBounceLight.position.set(0, -4.35, -11.3);
    scene.add(floorBounceLight);

    const pendantLights: THREE.PointLight[] = [];
    const deskLampLights: THREE.PointLight[] = [];

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
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const createDepthMap = (
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

    const createRoughnessMap = (
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

    const floorBumpTexture = createDepthMap((ctx, canvas) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#716862");
      gradient.addColorStop(1, "#2d241f");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const slab = 160;
      for (let y = 0; y < canvas.height; y += slab) {
        for (let x = 0; x < canvas.width; x += slab) {
          ctx.fillStyle = "rgba(208,208,208,0.26)";
          ctx.fillRect(x + 4, y + 4, slab - 8, slab - 8);
          ctx.strokeStyle = "rgba(28,28,28,0.88)";
          ctx.lineWidth = 6;
          ctx.strokeRect(x + 4, y + 4, slab - 8, slab - 8);
        }
      }

      for (let i = 0; i < 2400; i += 1) {
        const alpha = 0.04 + Math.random() * 0.06;
        const value = 120 + Math.floor(Math.random() * 100);
        ctx.fillStyle = `rgba(${value},${value},${value},${alpha})`;
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1 + Math.random() * 3,
          1 + Math.random() * 3
        );
      }
    });
    floorBumpTexture.repeat.copy(floorTexture.repeat);

    const floorRoughnessTexture = createRoughnessMap((ctx, canvas) => {
      ctx.fillStyle = "#9c9c9c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 3400; i += 1) {
        const shade = 62 + Math.floor(Math.random() * 120);
        ctx.fillStyle = `rgba(${shade},${shade},${shade},${0.06 + Math.random() * 0.16})`;
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          2 + Math.random() * 4,
          2 + Math.random() * 4
        );
      }
    });
    floorRoughnessTexture.repeat.copy(floorTexture.repeat);

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

    const stoneBumpTexture = createDepthMap((ctx, canvas) => {
      ctx.fillStyle = "#737373";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const blockW = 220;
      const blockH = 170;

      for (let row = 0; row < canvas.height / blockH + 1; row += 1) {
        const offset = row % 2 === 0 ? 0 : blockW / 2;
        for (let x = -offset; x < canvas.width; x += blockW) {
          ctx.fillStyle = "rgba(202,202,202,0.28)";
          ctx.fillRect(x + 8, row * blockH + 8, blockW - 16, blockH - 16);
          ctx.strokeStyle = "rgba(26,26,26,0.9)";
          ctx.lineWidth = 8;
          ctx.strokeRect(x + 8, row * blockH + 8, blockW - 16, blockH - 16);

          for (let i = 0; i < 130; i += 1) {
            const value = 160 + Math.floor(Math.random() * 80);
            ctx.fillStyle = `rgba(${value},${value},${value},${0.05 + Math.random() * 0.1})`;
            ctx.fillRect(
              x + 16 + Math.random() * (blockW - 32),
              row * blockH + 16 + Math.random() * (blockH - 32),
              2 + Math.random() * 4,
              2 + Math.random() * 4
            );
          }

          for (let i = 0; i < 5; i += 1) {
            const crackX = x + 20 + Math.random() * (blockW - 40);
            const crackY = row * blockH + 20 + Math.random() * (blockH - 40);
            ctx.strokeStyle = `rgba(18,18,18,${0.22 + Math.random() * 0.28})`;
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
    stoneBumpTexture.repeat.copy(stoneTexture.repeat);

    const stoneRoughnessTexture = createRoughnessMap((ctx, canvas) => {
      ctx.fillStyle = "#8a8a8a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 3000; i += 1) {
        const tone = 38 + Math.floor(Math.random() * 170);
        ctx.fillStyle = `rgba(${tone},${tone},${tone},${0.04 + Math.random() * 0.18})`;
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1 + Math.random() * 5,
          1 + Math.random() * 5
        );
      }
    });
    stoneRoughnessTexture.repeat.copy(stoneTexture.repeat);

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

    const ceilingBumpTexture = createDepthMap((ctx, canvas) => {
      ctx.fillStyle = "#595959";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 12; i += 1) {
        const y = i * 86;
        const fill = i % 2 === 0 ? "#8a8a8a" : "#4f4f4f";
        ctx.fillStyle = fill;
        ctx.fillRect(0, y, canvas.width, 60);
        ctx.strokeStyle = "rgba(18,18,18,0.9)";
        ctx.lineWidth = 5;
        ctx.strokeRect(0, y, canvas.width, 60);
      }
    });
    ceilingBumpTexture.repeat.copy(ceilingTexture.repeat);

    const ceilingRoughnessTexture = createRoughnessMap((ctx, canvas) => {
      ctx.fillStyle = "#7f7f7f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 1800; i += 1) {
        const value = 78 + Math.floor(Math.random() * 120);
        ctx.fillStyle = `rgba(${value},${value},${value},${0.04 + Math.random() * 0.14})`;
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          3 + Math.random() * 6,
          1 + Math.random() * 3
        );
      }
    });
    ceilingRoughnessTexture.repeat.copy(ceilingTexture.repeat);

    [
      floorTexture,
      floorBumpTexture,
      floorRoughnessTexture,
      stoneTexture,
      stoneBumpTexture,
      stoneRoughnessTexture,
      ceilingTexture,
      ceilingBumpTexture,
      ceilingRoughnessTexture,
    ].forEach((texture) => {
      texture.anisotropy = Math.min(16, maxAnisotropy);
      texture.needsUpdate = true;
    });

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
      roughness: 0.88,
      metalness: 0.03,
      map: stoneTexture,
      bumpMap: stoneBumpTexture,
      bumpScale: 0.2,
      roughnessMap: stoneRoughnessTexture,
    });

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d211d,
      roughness: 0.44,
      metalness: 0.08,
      map: floorTexture,
      bumpMap: floorBumpTexture,
      bumpScale: 0.08,
      roughnessMap: floorRoughnessTexture,
    });

    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a332d,
      roughness: 0.81,
      metalness: 0.06,
      map: ceilingTexture,
      bumpMap: ceilingBumpTexture,
      bumpScale: 0.12,
      roughnessMap: ceilingRoughnessTexture,
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
      roughness: 0.12,
      metalness: 0.08,
    });

    addMesh(baseGroup, new THREE.PlaneGeometry(roomWidth, roomDepth), floorMaterial, {
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -roomHeight / 2, -roomDepth / 2],
      castShadow: false,
    });

    const shadowPlane = addMesh(
      baseGroup,
      new THREE.PlaneGeometry(roomWidth * 0.98, roomDepth * 0.98),
      new THREE.ShadowMaterial({ opacity: 0.26 }),
      {
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -roomHeight / 2 + 0.01, -roomDepth / 2],
        castShadow: false,
        receiveShadow: true,
      }
    );
    shadowPlane.renderOrder = 2;

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

    const warmLampMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd7ae,
      emissive: 0xffb86a,
      emissiveIntensity: 1.3,
      roughness: 0.34,
      metalness: 0.04,
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

    const addPendantLamp = (x: number, z: number, hue: number) => {
      addMesh(
        baseGroup,
        new THREE.CylinderGeometry(0.02, 0.02, 2.4, 10),
        new THREE.MeshStandardMaterial({ color: 0x2f2723, roughness: 0.72 }),
        {
          position: [x, 3.2, z],
          castShadow: false,
        }
      );

      addMesh(
        baseGroup,
        new THREE.CylinderGeometry(0.46, 0.3, 0.5, 18, 1, true),
        new THREE.MeshStandardMaterial({
          color: 0xd6b08f,
          roughness: 0.72,
          metalness: 0.05,
          side: THREE.DoubleSide,
        }),
        {
          position: [x, 1.95, z],
        }
      );

      addMesh(baseGroup, new THREE.SphereGeometry(0.12, 14, 14), warmLampMaterial, {
        position: [x, 1.82, z],
        castShadow: false,
      });

      const pendantLight = new THREE.PointLight(hue, 16, 8, 2);
      pendantLight.position.set(x, 1.75, z);
      scene.add(pendantLight);
      pendantLights.push(pendantLight);
    };

    addPendantLamp(-2.7, -8.9, 0xffbd82);
    addPendantLamp(2.85, -8.6, 0xffc795);

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

    const addDeskLamp = (x: number, z: number, direction: 1 | -1) => {
      addMesh(
        baseGroup,
        new THREE.CylinderGeometry(0.08, 0.12, 0.08, 16),
        new THREE.MeshStandardMaterial({ color: 0x42332a, roughness: 0.74 }),
        {
          position: [x, -1.28, z],
        }
      );

      addMesh(
        baseGroup,
        new THREE.CylinderGeometry(0.03, 0.03, 0.58, 12),
        new THREE.MeshStandardMaterial({ color: 0x5b473b, roughness: 0.62 }),
        {
          position: [x, -0.96, z],
        }
      );

      addMesh(
        baseGroup,
        new THREE.BoxGeometry(0.42, 0.08, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x5f4a3d, roughness: 0.6 }),
        {
          position: [x + direction * 0.2, -0.7, z],
          rotation: [0, 0, direction * -0.42],
        }
      );

      addMesh(baseGroup, new THREE.SphereGeometry(0.12, 14, 14), warmLampMaterial, {
        position: [x + direction * 0.38, -0.55, z - 0.05],
        castShadow: false,
      });

      const deskLight = new THREE.PointLight(0xffca95, 12, 6, 2);
      deskLight.position.set(x + direction * 0.32, -0.7, z + 0.18);
      scene.add(deskLight);
      deskLampLights.push(deskLight);
    };

    addDeskLamp(-2.2, -14.6, 1);
    addDeskLamp(2.4, -14.2, -1);

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

    addMesh(
      baseGroup,
      new THREE.BoxGeometry(2.8, 0.18, 1.1),
      new THREE.MeshStandardMaterial({ color: 0x5d4639, roughness: 0.72 }),
      {
        position: [0, -1.36, -14.4],
      }
    );

    addMesh(
      baseGroup,
      new THREE.BoxGeometry(1.5, 0.12, 0.8),
      new THREE.MeshStandardMaterial({
        color: 0x4f5b62,
        emissive: 0x263740,
        emissiveIntensity: 0.4,
        roughness: 0.42,
      }),
      {
        position: [0, -1.08, -14.4],
      }
    );

    [-0.95, 0.95].forEach((x) => {
      addMesh(
        baseGroup,
        new THREE.BoxGeometry(0.42, 0.42, 0.42),
        new THREE.MeshStandardMaterial({ color: 0x4f6a56, roughness: 0.88 }),
        {
          position: [x, -1.05, -15.1],
        }
      );
      addMesh(
        baseGroup,
        new THREE.CylinderGeometry(0.14, 0.17, 0.26, 12),
        new THREE.MeshStandardMaterial({ color: 0x745948, roughness: 0.82 }),
        {
          position: [x, -1.34, -15.1],
        }
      );
    });

    const particles = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({
        size: 0.075,
        color: 0xffddb5,
        transparent: true,
        opacity: 0.44,
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

    const makeHazePlane = (
      width: number,
      height: number,
      colorStops: Array<[number, string]>,
      opacity: number
    ) => {
      const hazeTexture = makeCanvasTexture((ctx, canvas) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const gradient = ctx.createRadialGradient(
          canvas.width * 0.5,
          canvas.height * 0.5,
          canvas.width * 0.08,
          canvas.width * 0.5,
          canvas.height * 0.5,
          canvas.width * 0.5
        );

        colorStops.forEach(([stop, color]) => gradient.addColorStop(stop, color));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      const material = new THREE.MeshBasicMaterial({
        map: hazeTexture,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      return addMesh(baseGroup, new THREE.PlaneGeometry(width, height), material, {
        castShadow: false,
        receiveShadow: false,
      });
    };

    const backHaze = makeHazePlane(
      9.8,
      7.4,
      [
        [0, "rgba(255,214,170,0.3)"],
        [0.35, "rgba(100,198,255,0.18)"],
        [1, "rgba(7,10,18,0)"],
      ],
      0.28
    );
    backHaze.position.set(0, -0.65, -14.6);

    const leftLightShaft = makeHazePlane(
      4.8,
      11.6,
      [
        [0, "rgba(160,225,255,0.56)"],
        [0.22, "rgba(116,221,255,0.18)"],
        [1, "rgba(0,0,0,0)"],
      ],
      0.23
    );
    leftLightShaft.position.set(-3.2, 0.95, -8.8);
    leftLightShaft.rotation.set(-0.16, 0.26, -0.34);

    const rightWarmHaze = makeHazePlane(
      4.4,
      8.8,
      [
        [0, "rgba(255,188,118,0.5)"],
        [0.4, "rgba(255,124,63,0.18)"],
        [1, "rgba(0,0,0,0)"],
      ],
      0.2
    );
    rightWarmHaze.position.set(4.2, -0.15, -11.2);
    rightWarmHaze.rotation.set(0, -0.18, 0.14);

    const centerDepthHaze = makeHazePlane(
      7.8,
      6.4,
      [
        [0, "rgba(152,218,255,0.38)"],
        [0.3, "rgba(95,166,214,0.2)"],
        [0.68, "rgba(255,186,126,0.08)"],
        [1, "rgba(0,0,0,0)"],
      ],
      0.22
    );
    centerDepthHaze.position.set(0, -0.9, -12.2);
    const centerDepthHazeMaterial = centerDepthHaze.material as THREE.MeshBasicMaterial;

    const foregroundMist = makeHazePlane(
      8.4,
      4.5,
      [
        [0, "rgba(255,205,150,0.25)"],
        [0.34, "rgba(154,214,255,0.16)"],
        [1, "rgba(0,0,0,0)"],
      ],
      0.16
    );
    foregroundMist.position.set(0, -3.2, -7.4);
    foregroundMist.rotation.set(-0.2, 0, 0);
    const foregroundMistMaterial = foregroundMist.material as THREE.MeshBasicMaterial;

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
      const smoothness = 0.068;
      const depthSmoothing = 0.045;
      const currentDepth = (camera.userData.depth as number | undefined) ?? 0;
      const smoothedDepth = currentDepth + (tracker.targetDepth - currentDepth) * depthSmoothing;
      camera.userData.depth = smoothedDepth;
      const depthMomentum = (camera.userData.depthMomentum as number | undefined) ?? 0;
      const nextDepthMomentum = depthMomentum + (smoothedDepth - depthMomentum) * 0.12;
      camera.userData.depthMomentum = nextDepthMomentum;

      const parallaxMultiplier =
        1 + THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, -0.22, 0.55);
      const rangeX = 4.7 * parallaxMultiplier;
      const rangeY = 2.45 * (1 + THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, -0.16, 0.38));
      const targetZ = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, 1.58, 2.84);
      const targetFov = isCompactViewport
        ? THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, 58.5, 49.4)
        : THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, 63.2, 47.8);
      const depthLean = nextDepthMomentum * 0.08;

      camera.position.x += (tracker.targetX * rangeX - camera.position.x) * (smoothness + 0.012);
      camera.position.y +=
        (tracker.targetY * rangeY + Math.sin(elapsed * 0.18) * 0.04 - camera.position.y) *
        smoothness;
      camera.position.z += (targetZ - camera.position.z) * depthSmoothing;
      camera.fov += (targetFov - camera.fov) * depthSmoothing;
      camera.updateProjectionMatrix();

      baseGroup.position.z = -depthLean * 3.4;
      baseGroup.rotation.y = camera.position.x * 0.011 + depthLean * 0.42;
      baseGroup.rotation.x = camera.position.y * -0.009 + depthLean * 0.28;

      centerPoolMaterial.emissiveIntensity = 1.15 + Math.sin(elapsed * 1.6) * 0.14;
      ceilingGlowMaterial.emissiveIntensity = 1.05 + Math.sin(elapsed * 1.3) * 0.1;
      foregroundGroup.rotation.y = Math.sin(elapsed * 0.28) * 0.12;
      particles.rotation.y = elapsed * 0.01;
      backHaze.position.y = -0.62 + Math.sin(elapsed * 0.18) * 0.05;
      leftLightShaft.rotation.z = -0.34 + Math.sin(elapsed * 0.18) * 0.018;
      rightWarmHaze.rotation.z = 0.14 + Math.cos(elapsed * 0.24) * 0.016;
      centerDepthHaze.rotation.z = Math.sin(elapsed * 0.22) * 0.012;
      centerDepthHaze.position.z = -12.1 - smoothedDepth * 0.85;
      centerDepthHazeMaterial.opacity =
        0.18 + THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, -0.03, 0.08);
      foregroundMist.position.y = -3.2 + Math.sin(elapsed * 0.16) * 0.08;
      foregroundMistMaterial.opacity = 0.12 + Math.cos(elapsed * 0.3) * 0.02;

      keyLight.intensity = 40 + Math.sin(elapsed * 0.58) * 1.4;
      coldTopLight.intensity = 20 + Math.sin(elapsed * 1.1) * 1.5;
      cyanPoolLight.intensity = 17 + Math.sin(elapsed * 1.5) * 1.4;
      magentaFillLight.intensity = 4 + Math.sin(elapsed * 0.9 + 1.3) * 0.6;
      blueRimLight.intensity = 6.5 + Math.cos(elapsed * 0.8) * 0.8;
      amberCeilingWash.intensity = 24 + Math.sin(elapsed * 0.6) * 1.8;
      amberRimLight.intensity = 11 + Math.cos(elapsed * 0.7 + 0.8) * 1.1;
      moonBackLight.intensity = 2.1 + Math.sin(elapsed * 0.36 + 0.6) * 0.22;
      floorBounceLight.intensity =
        8.3 + Math.cos(elapsed * 0.68) * 0.7 + THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, -1, 1.3);
      pendantLights.forEach((light, index) => {
        light.intensity = 15 + Math.sin(elapsed * 0.8 + index * 1.2) * 0.8;
      });
      deskLampLights.forEach((light, index) => {
        light.intensity = 11 + Math.cos(elapsed * 0.9 + index) * 0.6;
      });
      flameLights.forEach((light, index) => {
        light.intensity =
          20 + Math.sin(elapsed * 7 + index * 0.9) * 4 + Math.random() * 1.1;
      });
      flameMeshes.forEach((flame, index) => {
        flame.scale.y = 1 + Math.sin(elapsed * 8 + index) * 0.12;
        flame.scale.x = 1 + Math.cos(elapsed * 6 + index) * 0.06;
      });

      const heroHeight = Math.max(
        (hero.offsetHeight - window.innerHeight) * (isCompactViewport ? 0.58 : 1),
        1
      );
      const scrollProgress = THREE.MathUtils.clamp(window.scrollY / heroHeight, 0, 1);
      const revealProgress = isCompactViewport
        ? THREE.MathUtils.clamp((scrollProgress - 0.005) / 0.16, 0, 1)
        : THREE.MathUtils.clamp((scrollProgress - 0.015) / 0.24, 0, 1);
      const easedReveal = 1 - Math.pow(1 - revealProgress, 3);

      const textDepthOffset = THREE.MathUtils.mapLinear(
        smoothedDepth,
        -1,
        1,
        isCompactViewport ? -12 : -28,
        isCompactViewport ? 12 : 22
      );
      const textScaleDepth = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, 0.94, 1.04);
      const textRotateXDepth = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, 6, -8);
      const textTranslateX = camera.position.x * (isCompactViewport ? 3.2 : 6.2);
      const textTranslateY = camera.position.y * (isCompactViewport ? 4.6 : 7.2) + textDepthOffset;
      const textRotateY = camera.position.x * (isCompactViewport ? -1.1 : -1.8);
      const textRotateZ =
        (0.5 - scrollProgress) * (isCompactViewport ? 1.8 : 3.2) +
        camera.position.x * (isCompactViewport ? -0.22 : -0.42);

      welcomeText.classList.toggle("opacity-0", scrollProgress <= 0.01);
      welcomeText.classList.toggle("opacity-100", scrollProgress > 0.01);
      welcomeText.style.opacity = `${easedReveal}`;
      welcomeText.style.transform =
        `translate3d(${textTranslateX}px, ${-34 + (1 - easedReveal) * 72 + textTranslateY}px, 0) ` +
        `rotateX(${6 + (1 - easedReveal) * -48 + textRotateXDepth}deg) rotateY(${textRotateY}deg) ` +
        `rotateZ(${textRotateZ}deg) scale(${(0.92 + easedReveal * 0.09) * textScaleDepth})`;

      const lookYOffset = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, -1.32, -1.08);
      const lookZ = THREE.MathUtils.mapLinear(smoothedDepth, -1, 1, -11.3, -10.3);
      camera.lookAt(0, lookYOffset, lookZ);

      renderer.render(scene, camera);
    };

    animate();

      const handleResize = () => {
      isCompactViewport = window.matchMedia("(max-width: 640px)").matches;
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
      className="relative min-h-[132vh] bg-background sm:min-h-[175vh] md:min-h-[220vh]"
      aria-label="Flutterly hero"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={canvasContainerRef} className="absolute inset-0 z-10" />

        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(120% 64% at 48% -2%, rgba(173, 226, 255, 0.24), transparent 46%), radial-gradient(76% 52% at 84% 24%, rgba(255, 193, 133, 0.22), transparent 58%), radial-gradient(68% 45% at 12% 68%, rgba(105, 181, 235, 0.14), transparent 72%), linear-gradient(180deg, rgba(6, 8, 13, 0.1) 0%, rgba(5, 6, 10, 0.16) 34%, rgba(8, 10, 15, 0.46) 68%, rgba(3, 4, 8, 0.82) 100%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.24] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.18), transparent 0 18%), radial-gradient(circle at 78% 66%, rgba(255,255,255,0.12), transparent 0 12%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 0 44%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.06] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.74' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.9'/%3E%3C/svg%3E\")",
            backgroundSize: "280px 280px",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(circle at 50% 56%, transparent 0 38%, rgba(0, 0, 0, 0.18) 62%, rgba(0, 0, 0, 0.42) 100%)",
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[6vh] sm:h-[8vh] bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[10vh] sm:h-[12vh] bg-[linear-gradient(0deg,rgba(0,0,0,0.58),rgba(0,0,0,0))]" />

        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-40 flex justify-center px-4 sm:bottom-8">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/25 px-3 py-2 sm:gap-3 sm:px-4 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent shadow-[0_0_16px_rgba(212,255,0,0.8)]" />
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.26em] text-foreground-secondary">
              Scroll down
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[12vh] z-40 flex justify-center px-4 sm:bottom-[13vh]">
          <div
            ref={welcomeTextRef}
            className="w-[min(1000px,calc(100vw-32px))] sm:w-[min(1000px,calc(100vw-48px))] text-center opacity-0 [transform-style:preserve-3d]"
          >
            <span className="block text-[clamp(2.2rem,10vw,6.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.075em] text-[#fff5e8] [text-shadow:0_1px_0_rgba(255,255,255,0.05),0_18px_56px_rgba(0,0,0,0.6),0_0_34px_rgba(74,214,255,0.12)]">
              Welcome to
            </span>
            <span className="block bg-[linear-gradient(118deg,#fff1db_0%,#ffc97e_22%,#ff9864_54%,#88dcff_100%)] bg-clip-text text-[clamp(2.2rem,10vw,6.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.075em] text-transparent [text-shadow:0_1px_0_rgba(255,255,255,0.05),0_18px_56px_rgba(0,0,0,0.6),0_0_34px_rgba(74,214,255,0.12)]">
              Flutterly
            </span>
          </div>
        </div>
      </div>

      <video ref={inputVideoRef} className="hidden" playsInline muted />
    </section>
  );
}
