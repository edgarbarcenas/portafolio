import { describe, expect, it } from "vitest";
import {
  CFG,
  advance,
  autoStep,
  blendHeading,
  followStep,
  isOffscreen,
  printAt,
  startCrossing,
  type Walker,
} from "../trail";

const walkingRight: Walker = { x: 100, y: 100, heading: 0, side: 1 };

describe("footprint trail", () => {
  it("steps exactly one stride along the heading and alternates paws", () => {
    const next = advance(walkingRight);
    expect(next.x).toBeCloseTo(100 + CFG.stride, 9);
    expect(next.y).toBeCloseTo(100, 9);
    expect(next.side).toBe(-1);
    expect(advance(next).side).toBe(1);
  });

  it("offsets each paw to its own side and turns it outwards", () => {
    // Walking right (heading 0): right paw is below (+y), left above (-y).
    const right = printAt(walkingRight);
    expect(right.y - walkingRight.y).toBeCloseTo(CFG.lateral, 9);
    expect(right.angleDeg).toBeCloseTo(90 + CFG.outward, 9);

    const left = printAt({ ...walkingRight, side: -1 });
    expect(left.y - walkingRight.y).toBeCloseTo(-CFG.lateral, 9);
    expect(left.angleDeg).toBeCloseTo(90 - CFG.outward, 9);
  });

  it("bases the rotation on the heading + 90° (art points up)", () => {
    const down = printAt({ x: 0, y: 0, heading: Math.PI / 2, side: 1 });
    expect(down.angleDeg).toBeCloseTo(180 + CFG.outward, 9);
  });

  it("Cursor mode blends 40% previous direction with 60% new direction", () => {
    const h = blendHeading(0, Math.PI / 2);
    expect(Math.tan(h)).toBeCloseTo(0.6 / 0.4, 9);
  });

  it("Cursor mode walks one stride per tick and never jumps to the cursor", () => {
    const far = { x: 2000, y: 100 };
    const next = followStep(walkingRight, far);
    expect(next).not.toBeNull();
    expect(Math.hypot(next!.x - walkingRight.x, next!.y - walkingRight.y)).toBeCloseTo(CFG.stride, 9);
  });

  it("Cursor mode stops (no more prints) within one stride of the cursor", () => {
    expect(followStep(walkingRight, { x: 100 + CFG.stride - 1, y: 100 })).toBeNull();
  });

  it("Auto mode wiggles the heading by at most ±0.06 rad per step", () => {
    expect(autoStep(walkingRight, () => 1).heading).toBeCloseTo(CFG.wobble, 9);
    expect(autoStep(walkingRight, () => 0).heading).toBeCloseTo(-CFG.wobble, 9);
  });

  it("Auto crossings start off-screen at a corner heading diagonally across", () => {
    const w = startCrossing(1440, 900, () => 0); // from left, from top, -15% offset
    expect(w.x).toBeLessThan(0);
    expect(Math.cos(w.heading)).toBeGreaterThan(0); // towards the right
    expect(Math.sin(w.heading)).toBeGreaterThan(0); // and downwards
    const r = startCrossing(1440, 900, () => 0.99); // from right, from bottom
    expect(r.x).toBeGreaterThan(1440);
    expect(Math.cos(r.heading)).toBeLessThan(0);
    expect(Math.sin(r.heading)).toBeLessThan(0);
  });

  it("detects when the walker has left the screen", () => {
    expect(isOffscreen({ ...walkingRight, x: 1440 + CFG.stride * 3 }, 1440, 900)).toBe(true);
    expect(isOffscreen(walkingRight, 1440, 900)).toBe(false);
  });
});
