import type { CSSProperties } from "react";

// A Figma layer placed by its unrotated size, its centre and its rotation.
// Figma rotation is counter-clockwise-positive; CSS rotate() is clockwise.
export type Placement = {
  w: number;
  h: number;
  cx: number;
  cy: number;
  rot?: number;
};

export function placementStyle({ w, h, cx, cy, rot = 0 }: Placement): CSSProperties {
  return {
    position: "absolute",
    left: cx - w / 2,
    top: cy - h / 2,
    width: w,
    height: h,
    transform: rot ? `rotate(${-rot}deg)` : undefined,
  };
}

// Centre of a layer from Figma's x/y (top-left of the rotated box origin),
// size and rotation, as reported by node.x / node.y / node.rotation.
export function centreFromOrigin(x: number, y: number, w: number, h: number, rot: number) {
  const r = (rot * Math.PI) / 180;
  return {
    cx: x + Math.cos(r) * (w / 2) + Math.sin(r) * (h / 2),
    cy: y - Math.sin(r) * (w / 2) + Math.cos(r) * (h / 2),
  };
}
