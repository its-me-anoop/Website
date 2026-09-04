export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function smoothstep(value: number): number {
  const progress = clamp01(value);
  return progress * progress * (3 - 2 * progress);
}

export function assemblyProgress(elapsedMs: number, delayMs: number): number {
  const progress = clamp01((elapsedMs - 400 - delayMs) / 4800);
  return 1 - (1 - progress) ** 3;
}

export function offscreenStart(
  side: number,
  u: number,
  width: number,
  height: number,
): { x: number; y: number } {
  switch (side) {
    case 0:
      return { x: -96, y: u * height };
    case 1:
      return { x: width + 96, y: u * height };
    case 2:
      return { x: u * width, y: -96 };
    default:
      return { x: u * width, y: height + 96 };
  }
}

export function edgeDestination(
  side: number,
  u: number,
  v: number,
  width: number,
  height: number,
): { x: number; y: number } {
  const margin = 6 + u * (width < 600 ? 8 : 15);
  return {
    x: side % 2 === 0 ? margin : width - margin,
    y: height * (0.12 + v * 0.84),
  };
}

export function scrollDispersal(
  scrollOffset: number,
  viewportHeight: number,
): number {
  return smoothstep((scrollOffset - 32) / (Math.max(viewportHeight, 1) * 0.75));
}

export function butterflyBlend(y: number, heroBottom: number): number {
  return smoothstep((y - heroBottom) / 60);
}

export function journeyOpacity(heroBottom: number, viewportHeight: number): number {
  const height = Math.max(viewportHeight, 1);
  return 1 - smoothstep((-heroBottom - height * 0.65) / (height * 0.6));
}

export function refugeProgress(centerY: number, viewportHeight: number): number {
  const height = Math.max(viewportHeight, 1);
  return (
    smoothstep((height * 0.98 - centerY) / (height * 0.32)) *
    smoothstep((centerY - height * 0.04) / (height * 0.24))
  );
}

export function pointerRepulsion(
  dx: number,
  dy: number,
  radius: number,
  strength: number,
): { x: number; y: number } {
  const distance = Math.hypot(dx, dy);
  if (radius <= 0 || distance >= radius) return { x: 0, y: 0 };

  const force = (1 - distance / radius) ** 2 * strength;
  if (distance === 0) return { x: force, y: 0 };
  return { x: (dx / distance) * force, y: (dy / distance) * force };
}

export function butterflyFlight(
  ageMs: number,
  phase: number,
  dx: number,
  dy: number,
): { x: number; y: number; energy: number } {
  if (ageMs <= 0 || ageMs >= 2800) return { x: 0, y: 0, energy: 0 };

  const progress = ageMs / 2800;
  const arc = Math.sin(Math.PI * progress);
  const energy = arc ** 0.85;
  return {
    x: dx * energy + Math.sin(progress * Math.PI * 2 + phase) * 24 * energy,
    y:
      dy * energy -
      arc * 55 +
      Math.sin(progress * Math.PI * 3 + phase) * 15 * energy,
    energy,
  };
}
