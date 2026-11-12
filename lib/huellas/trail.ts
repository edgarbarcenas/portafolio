// Coordinates are viewport px; angles in radians unless the name says Deg.
// The paw art points its toes up, so a print's CSS rotation is the heading
// in degrees + 90.

export const CFG = {
  stride: 46, // px between steps
  lateral: 13, // px each paw sits towards its own side
  outward: 10, // deg each paw turns outwards
  appearMs: 250,
  holdMs: 900,
  fadeMs: 600,
  overflowFadeMs: 250, // oldest prints leave this fast when over maxPaws
  autoStepMs: 260,
  followStepMs: 220,
  maxPaws: 10,
  wobble: 0.06, // rad, max heading wiggle per auto step
  followBlend: 0.6, // weight of the new direction in Cursor mode
  printWidth: 30, // px
} as const;

export type Vec = { x: number; y: number };
export type Side = 1 | -1; // 1 = right, -1 = left
export type Walker = { x: number; y: number; heading: number; side: Side };
export type PrintPose = { x: number; y: number; angleDeg: number; side: Side };

const TO_DEG = 180 / Math.PI;

// Right of heading θ in screen space (y down) is (-sinθ, cosθ).
export function printAt(w: Walker): PrintPose {
  return {
    x: w.x - Math.sin(w.heading) * CFG.lateral * w.side,
    y: w.y + Math.cos(w.heading) * CFG.lateral * w.side,
    angleDeg: w.heading * TO_DEG + 90 + CFG.outward * w.side,
    side: w.side,
  };
}

export function advance(w: Walker, heading = w.heading): Walker {
  return {
    x: w.x + Math.cos(heading) * CFG.stride,
    y: w.y + Math.sin(heading) * CFG.stride,
    heading,
    side: w.side === 1 ? -1 : 1,
  };
}

// Blended as unit vectors, so it never flips through a meaningless average angle.
export function blendHeading(previous: number, towards: number): number {
  const k = CFG.followBlend;
  const x = (1 - k) * Math.cos(previous) + k * Math.cos(towards);
  const y = (1 - k) * Math.sin(previous) + k * Math.sin(towards);
  return Math.hypot(x, y) < 1e-9 ? towards : Math.atan2(y, x);
}

// Null means the walker is already within one stride: it stops and leaves no more prints.
export function followStep(w: Walker, cursor: Vec): Walker | null {
  const dx = cursor.x - w.x;
  const dy = cursor.y - w.y;
  if (Math.hypot(dx, dy) < CFG.stride) return null;
  return advance(w, blendHeading(w.heading, Math.atan2(dy, dx)));
}

export function autoStep(w: Walker, random: () => number = Math.random): Walker {
  return advance(w, w.heading + (random() * 2 - 1) * CFG.wobble);
}

// Random corner, heading to the opposite corner, starting just off-screen.
export function startCrossing(width: number, height: number, random: () => number = Math.random): Walker {
  const margin = CFG.stride;
  const fromLeft = random() < 0.5;
  const fromTop = random() < 0.5;
  const offset = (random() * 2 - 1) * 0.15; // up to 15% of the side
  const start = {
    x: fromLeft ? -margin : width + margin,
    y: (fromTop ? 0 : height) + offset * height * (fromTop ? 1 : -1),
  };
  const end = { x: fromLeft ? width : 0, y: fromTop ? height : 0 };
  return {
    x: start.x,
    y: start.y,
    heading: Math.atan2(end.y - start.y, end.x - start.x),
    side: random() < 0.5 ? 1 : -1,
  };
}

export function isOffscreen(w: Walker, width: number, height: number): boolean {
  const m = CFG.stride * 2;
  return w.x < -m || w.y < -m || w.x > width + m || w.y > height + m;
}
