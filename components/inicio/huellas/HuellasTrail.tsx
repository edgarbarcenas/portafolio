"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { isDarkAt } from "./background";
import { CFG, autoStep, followStep, isOffscreen, printAt, startCrossing, type Vec, type Walker } from "./trail";

type Mode = "auto" | "cursor";

const MODE_KEY = "huellas-modo";
// Existing project asset: the Figma "Huellita" paw (toes up, no background),
// plus its light variant (purple → white) for dark surfaces.
const PAW_SRC = "/figma/common/huellita.svg";
const PAW_LIGHT_SRC = "/figma/common/huellita-clara.svg";
const PRINT_H = (CFG.printWidth * 66) / 80.39;
const LIFE_MS = CFG.appearMs + CFG.holdMs + CFG.fadeMs;

function initialMode(): Mode {
  try {
    const saved = localStorage.getItem(MODE_KEY);
    if (saved === "auto" || saved === "cursor") return saved;
  } catch {
    // Storage blocked: fall back to the input type.
  }
  return window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ? "cursor" : "auto";
}

// Appear (bounce) → hold → fade, as one Web Animation. With reduced motion
// only opacity changes, no scale.
function lifeKeyframes(reduced: boolean): Keyframe[] {
  const a = CFG.appearMs / LIFE_MS;
  const h = (CFG.appearMs + CFG.holdMs) / LIFE_MS;
  if (reduced) {
    return [
      { opacity: 0, offset: 0 },
      { opacity: 0.9, offset: a },
      { opacity: 0.9, offset: h },
      { opacity: 0, offset: 1 },
    ];
  }
  return [
    { opacity: 0, transform: "scale(0.35)", offset: 0, easing: "ease-out" },
    { opacity: 0.9, transform: "scale(1.08)", offset: a * 0.7, easing: "ease-in-out" },
    { opacity: 0.9, transform: "scale(1)", offset: a },
    { opacity: 0.9, transform: "scale(1)", offset: h, easing: "ease-in" },
    { opacity: 0, transform: "scale(0.92)", offset: 1 },
  ];
}

// Quadruped footprint trail over the home page (developer spec; not in
// Figma). A corner pill switches between "Auto" (diagonal crossings) and
// "Cursor" (walks towards the pointer one step at a time, never jumping).
// Prints are plain DOM nodes animated with the Web Animations API, so React
// does not re-render per step; they never take pointer events.
export default function HuellasTrail() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only preference, read after hydration
    setMode(initialMode());
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || !mode) return;
    const reduced = prefersReducedMotion();
    const live: HTMLElement[] = [];

    const remove = (el: HTMLElement) => {
      const i = live.indexOf(el);
      if (i >= 0) live.splice(i, 1);
      el.remove();
    };

    const fadeOut = (el: HTMLElement, ms: number) => {
      el.getAnimations?.().forEach((anim) => anim.cancel());
      if (!el.animate) return remove(el);
      const anim = el.animate([{ opacity: getComputedStyle(el).opacity }, { opacity: 0 }], { duration: ms, fill: "forwards" });
      anim.onfinish = () => remove(el);
    };

    const leavePrint = (w: Walker) => {
      const pose = printAt(w);
      const wrap = document.createElement("span");
      wrap.style.cssText = `position:absolute;left:${pose.x}px;top:${pose.y}px;width:${CFG.printWidth}px;height:${PRINT_H}px;transform:translate(-50%,-50%) rotate(${pose.angleDeg}deg);pointer-events:none;`;
      const img = document.createElement("img");
      // Visible on purple: the light paw where the surface below is dark.
      img.src = isDarkAt(pose.x, pose.y) ? PAW_LIGHT_SRC : PAW_SRC;
      img.alt = "";
      img.draggable = false;
      img.style.cssText = "display:block;width:100%;height:100%;opacity:0;";
      wrap.appendChild(img);
      layer.appendChild(wrap);
      live.push(wrap);

      if (img.animate) {
        const anim = img.animate(lifeKeyframes(reduced), { duration: LIFE_MS, fill: "forwards" });
        anim.onfinish = () => remove(wrap);
      } else {
        img.style.opacity = "0.9";
        setTimeout(() => remove(wrap), LIFE_MS);
      }

      // Over the cap: the oldest prints leave quickly.
      while (live.length > CFG.maxPaws) {
        const oldest = live.shift()!;
        fadeOut(oldest, CFG.overflowFadeMs);
      }
    };

    let walker: Walker | null = null;
    let cursor: Vec | null = null;
    let timer: ReturnType<typeof setInterval> | undefined;

    const introUp = () => document.documentElement.dataset.intro === "show";

    const tickAuto = () => {
      if (introUp()) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!walker || isOffscreen(walker, w, h)) walker = startCrossing(w, h);
      leavePrint(walker);
      walker = autoStep(walker);
    };

    const tickCursor = () => {
      if (introUp() || !cursor) return;
      // Starts mid-screen (never on the cursor) and walks there step by step.
      walker ??= { x: window.innerWidth / 2, y: window.innerHeight / 2, heading: 0, side: 1 };
      const next = followStep(walker, cursor);
      if (!next) return; // within one stride: stop, no more prints
      walker = next;
      leavePrint(walker);
    };

    const start = () => {
      if (timer) return;
      timer = mode === "auto" ? setInterval(tickAuto, CFG.autoStepMs) : setInterval(tickCursor, CFG.followStepMs);
    };
    const stop = () => {
      clearInterval(timer);
      timer = undefined;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMove = (event: PointerEvent) => {
      cursor = { x: event.clientX, y: event.clientY };
    };
    // Cursor left the window: the walker stands still (no more prints).
    const onOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) cursor = null;
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    if (mode === "cursor") {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseout", onOut);
    }

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
      live.splice(0).forEach((el) => el.remove());
    };
  }, [mode]);

  const toggle = () => {
    const next: Mode = mode === "auto" ? "cursor" : "auto";
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {
      // Storage blocked: the choice lasts for this page view only.
    }
    setMode(next);
  };

  return (
    <>
      <div ref={layerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden" />
      {mode && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Huellas: modo ${mode === "auto" ? "Auto" : "Cursor"}. Cambiar a ${mode === "auto" ? "Cursor" : "Auto"}`}
          className="fixed bottom-4 right-4 z-40 rounded-full bg-white px-3 py-1 font-sans text-[12px] font-medium leading-[18px] text-negro opacity-55 shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          {mode === "auto" ? "Auto" : "Cursor"}
        </button>
      )}
    </>
  );
}
