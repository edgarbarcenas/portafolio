import type { Placement } from "@/lib/placement";

// Plain module on purpose: values exported from a "use client" file reach
// Server Components as client references, not numbers.
// Figma instance "Estrella" on the Bio screen: page centre (219.5, 764.5),
// whole instance rotated 13.84deg; the page places it with placementStyle.
export const ESTRELLA_SIZE = 209;
export const ESTRELLA_PLACEMENT: Placement = { w: ESTRELLA_SIZE, h: ESTRELLA_SIZE, cx: 219.5, cy: 764.5, rot: 13.84 };
