import { describe, expect, it } from "vitest";
import {
  INITIAL_SPLASH_TRANSITION,
  SPLASH_STATES,
  isLastSplashState,
  splashReducer,
  unwrapAngle,
} from "./splash-machine";

describe("splashReducer", () => {
  it("advances through all 9 states in order on click", () => {
    let transition = INITIAL_SPLASH_TRANSITION;
    const seen = [transition.state];
    for (let i = 0; i < SPLASH_STATES.length - 1; i++) {
      transition = splashReducer(transition, { type: "click", reducedMotion: false });
      seen.push(transition.state);
    }
    expect(seen).toEqual([...SPLASH_STATES]);
  });

  it("click from the last state (V9) is a no-op", () => {
    let transition = INITIAL_SPLASH_TRANSITION;
    for (let i = 0; i < SPLASH_STATES.length - 1; i++) {
      transition = splashReducer(transition, { type: "click", reducedMotion: false });
    }
    expect(transition.state).toBe("V9");

    const after = splashReducer(transition, { type: "click", reducedMotion: false });
    expect(after).toBe(transition);
  });

  it("click uses 800 ms ease-in-out", () => {
    const transition = splashReducer(INITIAL_SPLASH_TRANSITION, {
      type: "click",
      reducedMotion: false,
    });
    expect(transition.durationMs).toBe(800);
    expect(transition.easing).toBe("ease-in-out");
  });

  it("drag advances Default -> V5 only, with 1200 ms linear", () => {
    const transition = splashReducer(INITIAL_SPLASH_TRANSITION, {
      type: "drag",
      reducedMotion: false,
    });
    expect(transition.state).toBe("V5");
    expect(transition.durationMs).toBe(1200);
    expect(transition.easing).toBe("linear");
  });

  it("drag outside Default is a no-op", () => {
    const afterClick = splashReducer(INITIAL_SPLASH_TRANSITION, {
      type: "click",
      reducedMotion: false,
    });
    const afterDrag = splashReducer(afterClick, { type: "drag", reducedMotion: false });
    expect(afterDrag).toBe(afterClick);
  });

  it("reduced motion gives duration 0 for click and drag alike", () => {
    const click = splashReducer(INITIAL_SPLASH_TRANSITION, {
      type: "click",
      reducedMotion: true,
    });
    expect(click.durationMs).toBe(0);

    const drag = splashReducer(INITIAL_SPLASH_TRANSITION, {
      type: "drag",
      reducedMotion: true,
    });
    expect(drag.durationMs).toBe(0);
  });
});

describe("unwrapAngle", () => {
  it("takes the shortest path across a large positive-to-negative jump", () => {
    // Raw delta from 178.1 to -154.3 is -332.4deg; the short way is +27.6deg.
    expect(unwrapAngle(178.1, -154.3)).toBeCloseTo(205.7, 5);
  });

  it("leaves small deltas as-is", () => {
    expect(unwrapAngle(0, 30)).toBeCloseTo(30, 5);
    expect(unwrapAngle(0, -30)).toBeCloseTo(-30, 5);
  });

  it("is idempotent once the rendered angle is already in sync", () => {
    const first = unwrapAngle(178.1, -154.3);
    expect(unwrapAngle(first, -154.3)).toBeCloseTo(first, 5);
  });
});

describe("splashReducer — scroll", () => {
  const down = { type: "scroll", direction: 1, reducedMotion: false } as const;
  const up = { type: "scroll", direction: -1, reducedMotion: false } as const;

  it("scroll down steps forward through the same order as click, 800 ms ease-in-out", () => {
    let t = INITIAL_SPLASH_TRANSITION;
    const seen: string[] = [t.state];
    for (let i = 0; i < 8; i++) {
      t = splashReducer(t, down);
      seen.push(t.state);
    }
    expect(seen).toEqual([...SPLASH_STATES]);
    expect(t.durationMs).toBe(800);
    expect(t.easing).toBe("ease-in-out");
    expect(isLastSplashState(t)).toBe(true);
  });

  it("scroll up steps back one state", () => {
    const v2 = splashReducer(splashReducer(INITIAL_SPLASH_TRANSITION, down), down);
    const back = splashReducer(v2, up);
    expect(back.state).toBe("V5");
    expect(back.durationMs).toBe(800);
  });

  it("is a no-op past either end", () => {
    expect(splashReducer(INITIAL_SPLASH_TRANSITION, up)).toBe(INITIAL_SPLASH_TRANSITION);
    let last = INITIAL_SPLASH_TRANSITION;
    for (let i = 0; i < 8; i++) last = splashReducer(last, down);
    expect(splashReducer(last, down)).toBe(last);
  });

  it("reduced motion gives duration 0", () => {
    const t = splashReducer(INITIAL_SPLASH_TRANSITION, { ...down, reducedMotion: true });
    expect(t.durationMs).toBe(0);
  });
});
