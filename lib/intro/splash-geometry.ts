import { centreFromOrigin, placementStyle } from "@/lib/placement";
import type { CSSProperties } from "react";
import type { SplashState } from "./splash-machine";

type Origin = { x: number; y: number; rot: number };

// Figma origins (x, y = top-left of the rotated box, rot = CCW degrees),
// local to the 600x482 splash box, one entry per state.
export const PERRO_ORIGIN: Record<SplashState, Origin> = {
  Default: { x: 195, y: 511.9, rot: 178.1 },
  V5: { x: 195, y: 511.9, rot: 178.1 },
  V2: { x: 145.6, y: 482.2, rot: 151.3 },
  V3: { x: 291.5, y: 363.5, rot: 141.2 },
  V4: { x: 448.6, y: 296.2, rot: 151.3 },
  V6: { x: 595.8, y: 200.5, rot: -154.3 },
  V7: { x: 635.6, y: 123.3, rot: -110.2 },
  V8: { x: 583.2, y: 11.4, rot: -50.1 },
  V9: { x: 583.2, y: 11.4, rot: -50.1 },
};

// Default's ball sits at x~897-930, outside the 600px box: overflow stays
// visible so it is not clipped.
export const BALL_ORIGIN: Record<SplashState, Origin> = {
  Default: { x: 897, y: 85, rot: 180 },
  V5: { x: 517, y: 71.8, rot: 0 },
  V2: { x: 517, y: 72, rot: 0 },
  V3: { x: 517, y: 71.9, rot: 0 },
  V4: { x: 517, y: 71.9, rot: 0 },
  V6: { x: 449, y: -1.2, rot: 0 },
  V7: { x: 389.9, y: 80.2, rot: 44 },
  V8: { x: 423.3, y: 202.9, rot: 104.1 },
  V9: { x: 364, y: 240.7, rot: 104.1 },
};

export const HEAD_POSE: Record<SplashState, "A" | "B"> = {
  Default: "A",
  V5: "A",
  V2: "B",
  V3: "A",
  V4: "B",
  V6: "B",
  V7: "A",
  V8: "B",
  V9: "B",
};

// Stacking: Default/V5/V2/V3 keep the ball on top; from V4 on the ball tucks
// behind both Edgar and the dog.
const EARLY_STATES: ReadonlySet<SplashState> = new Set(["Default", "V5", "V2", "V3"]);

export function zIndices(state: SplashState): { edgar: number; perro: number; ball: number } {
  return EARLY_STATES.has(state)
    ? { edgar: 0, perro: 1, ball: 2 }
    : { ball: 0, edgar: 1, perro: 2 };
}

// Edgar's head, in coordinates local to the never-moving Edgar box
// (122.1x354.1); the head is rendered inside that box, which Splash places at
// (0, 127.9).
// The head box is 99.7x67.6; only its origin/rotation change between poses
// (interpolated, Smart Animate in Figma).
const HEAD_BOX = { w: 99.7, h: 67.6 };
const HEAD_POSE_ORIGIN: Record<"A" | "B", { x: number; y: number }> = {
  A: { x: 8.9, y: 0 },
  B: { x: 15.5, y: -6.1 },
};

// `rot` is passed in already unwrapped (see unwrapAngle) so the caller
// controls interpolation continuity; this only resolves the origin/centre.
export function headPlacement(pose: "A" | "B", rot: number): CSSProperties {
  const local = HEAD_POSE_ORIGIN[pose];
  const { cx, cy } = centreFromOrigin(
    local.x,
    local.y,
    HEAD_BOX.w,
    HEAD_BOX.h,
    rot,
  );
  return placementStyle({ w: HEAD_BOX.w, h: HEAD_BOX.h, cx, cy, rot });
}

export const HEAD_POSE_ROT: Record<"A" | "B", number> = { A: 0, B: -6.37 };
