import { MOTION } from "@/lib/motion";

// The 9 splash illustration states, in the order the prototype advances
// through them on click (Figma screen 00): Default -> V5 -> V2 -> V3 -> V4 ->
// V6 -> V7 -> V8 -> V9. The names follow the Figma variant labels; they are
// not alphabetical/numeric order.
export const SPLASH_STATES = [
  "Default",
  "V5",
  "V2",
  "V3",
  "V4",
  "V6",
  "V7",
  "V8",
  "V9",
] as const;

export type SplashState = (typeof SPLASH_STATES)[number];

export type SplashEasing = "ease-in-out" | "linear";

export type SplashTransition = {
  state: SplashState;
  index: number;
  durationMs: number;
  easing: SplashEasing;
};

export type SplashAction =
  | { type: "click"; reducedMotion: boolean }
  | { type: "drag"; reducedMotion: boolean }
  | { type: "scroll"; direction: 1 | -1; reducedMotion: boolean };

export function isLastSplashState(transition: SplashTransition): boolean {
  return transition.index === SPLASH_STATES.length - 1;
}

export const INITIAL_SPLASH_TRANSITION: SplashTransition = {
  state: SPLASH_STATES[0],
  index: 0,
  durationMs: 0,
  easing: "ease-in-out",
};

// Pure reducer for the splash illustration: no autoplay, no loop, every step
// is operator-initiated.
//
// - "click" (also Enter/Space on the splash button) always steps to the next
//   state in SPLASH_STATES, 800 ms ease-in-out (MOTION.introStepMs). V9 has
//   no continuation: clicking it is a no-op and returns the same reference.
// - "drag" (pointer drag on the ball) is only meaningful from Default, and
//   reaches the same next state (V5) but with the prototype's drag reaction
//   timing: 1200 ms linear (MOTION.introDragMs). From any other state it is
//   a no-op.
// - "scroll" (wheel, swipe, arrow keys), not part of the Figma prototype:
//   down steps forward like a click, up steps back one state, both 800 ms
//   ease-in-out. Past either end it is a no-op (the overlay turns a forward
//   scroll on V9 into the exit).
// - Reduced motion collapses the duration to 0 regardless of the trigger.
export function splashReducer(
  current: SplashTransition,
  action: SplashAction,
): SplashTransition {
  const isLast = isLastSplashState(current);

  if (action.type === "scroll") {
    const index = current.index + action.direction;
    if (index < 0 || index >= SPLASH_STATES.length) return current;
    return {
      state: SPLASH_STATES[index],
      index,
      durationMs: action.reducedMotion ? 0 : MOTION.introStepMs,
      easing: "ease-in-out",
    };
  }

  if (action.type === "click") {
    if (isLast) return current;
    const index = current.index + 1;
    return {
      state: SPLASH_STATES[index],
      index,
      durationMs: action.reducedMotion ? 0 : MOTION.introStepMs,
      easing: "ease-in-out",
    };
  }

  if (current.index !== 0) return current;
  return {
    state: SPLASH_STATES[1],
    index: 1,
    durationMs: action.reducedMotion ? 0 : MOTION.introDragMs,
    easing: "linear",
  };
}

// Rotation interpolation helper. A CSS transition on `transform` animates
// across the raw numeric difference between two rotate() values, which for a
// drop like 178.1deg -> -154.3deg takes the long way round (-332.4deg)
// instead of the short one (+27.6deg). Figma's own interpolation path for
// deltas over 180deg isn't inspectable from the file, so this always takes
// the shortest path from the previously *rendered* angle (not the previous
// state's nominal angle) so repeated calls stay continuous across many
// transitions.
export function unwrapAngle(previousRendered: number, next: number): number {
  const delta = (((next - previousRendered + 180) % 360) + 360) % 360 - 180;
  return previousRendered + delta;
}
