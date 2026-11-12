// Durations and curves read from the Figma prototype reactions.
export const MOTION = {
  introStepMs: 800, // splash variant change on click, ease-in-out
  introDragMs: 1200, // internal drag Default -> Variant5, linear
  introExitMs: 700, // intro -> home fade (Figma had 1500ms)
  hoverMs: 800, // header banner + bio star, linear
  scrollMs: 300, // nav anchor scroll, ease-in-out
  chipMs: 200, // Next.js chip pressed state, MD3 curve
} as const;

// Figma EASE_IN_AND_OUT is the CSS ease-in-out curve.
export const EASE_IN_OUT = "cubic-bezier(0.42, 0, 0.58, 1)";
export const LINEAR = "linear";
export const EASE_MD3 = "cubic-bezier(0.2, 0, 0, 1)";

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
