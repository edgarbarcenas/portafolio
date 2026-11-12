"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { EASE_IN_OUT, MOTION, prefersReducedMotion } from "@/lib/motion";
import { markIntroSeen } from "@/lib/intro-session";
import IsoEdgar from "@/components/common/IsoEdgar";
import Huellita, { HUELLITA_ASPECT } from "@/components/common/Huellita";
import Splash from "./Splash";
import {
  INITIAL_SPLASH_TRANSITION,
  isLastSplashState,
  splashReducer,
  type SplashTransition,
} from "./splash-machine";

// Figma screen 00, the frame the whole overlay is built at.
const FRAME = { w: 1440, h: 682 } as const;
// Black nav bar inside the frame: 136px tall, 1px from the frame top.
const NAV_BAR_TOP = 1;
const NAV_BAR_H = 136;
// The splash illustration box inside the frame.
const SPLASH = { x: 359, y: 162, w: 600, h: 482 } as const;
// Compact (phone) layout: side gutter and where the scene starts (below the bar).
const COMPACT_GUTTER = 16;
const SCENE_TOP = NAV_BAR_TOP + NAV_BAR_H;
// Centre of the paw + "Scroll" group in the frame (paw 619,439 80x66; label below).
const SCROLL_SPOT = { x: 659, y: 488 } as const;
const COMPACT_MAX_W = 768;

// Letter-spacing on "Scroll" is 8% in Figma; CSS letter-spacing takes a
// length, so it is pre-multiplied by the 14px font size here (1.12px).
const SCROLL_LETTER_SPACING = 14 * 0.08;

// The pre-paint script (lib/intro-session.ts) decides this before first
// paint by writing `data-intro` on <html>. Read it through
// useSyncExternalStore (server snapshot: false, no `document` yet) rather
// than an effect + setState, so the first client render can already show the
// overlay without a flash-then-hide and without the hydration mismatch an
// effect-driven state flip would otherwise need to paper over.
function subscribeNever() {
  return () => {};
}
function readShown() {
  return document.documentElement.dataset.intro === "show";
}
function readShownOnServer() {
  return false;
}

// Wheel/swipe/arrow input is ignored while a step is still animating, plus a
// short margin, so trackpad inertia cannot skip several states at once.
const SCROLL_LOCK_MARGIN_MS = 200;
const SWIPE_THRESHOLD_PX = 40;

// Intro overlay (Figma screen 00): a full-viewport dialog shown once per
// session (lib/intro-session.ts decides this before paint). The illustration
// advances by click (Figma) and by scroll: wheel, swipe or arrow keys move one
// state per gesture, and scrolling forward from the last state exits (scroll
// behaviour requested by the developer, not in the prototype). Also exits by
// a 1500ms dissolve on the Scroll button or a pointer drag on the side bar.
export default function IntroOverlay() {
  const shown = useSyncExternalStore(subscribeNever, readShown, readShownOnServer);
  const [closed, setClosed] = useState(false);
  const [scale, setScale] = useState(1);
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });
  const [exiting, setExiting] = useState(false);
  const [transition, setTransition] = useState<SplashTransition>(INITIAL_SPLASH_TRANSITION);
  const rootRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef(transition);
  const lockUntilRef = useRef(0);
  const exitRef = useRef<() => void>(() => {});
  const visible = shown && !closed;

  useEffect(() => {
    transitionRef.current = transition;
  }, [transition]);

  useEffect(() => {
    if (!visible) return;
    rootRef.current?.focus();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const update = () => {
      setScale(Math.min(window.innerWidth / FRAME.w, window.innerHeight / FRAME.h));
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [visible]);

  function exit() {
    if (exiting) return;
    setExiting(true);

    const finish = () => {
      markIntroSeen();
      setClosed(true);
      const hero = document.getElementById("inicio");
      if (hero) {
        if (!hero.hasAttribute("tabindex")) hero.setAttribute("tabindex", "-1");
        hero.focus();
      }
    };

    if (prefersReducedMotion()) finish();
    else setTimeout(finish, MOTION.introExitMs);
  }

  useEffect(() => {
    exitRef.current = exit;
  });

  // Scroll-driven steps: one state per wheel tick / swipe / key press.
  useEffect(() => {
    if (!visible) return;

    const step = (direction: 1 | -1) => {
      const now = performance.now();
      if (now < lockUntilRef.current) return;
      const current = transitionRef.current;
      if (direction === 1 && isLastSplashState(current)) {
        lockUntilRef.current = Number.POSITIVE_INFINITY;
        exitRef.current();
        return;
      }
      const next = splashReducer(current, { type: "scroll", direction, reducedMotion: prefersReducedMotion() });
      if (next === current) return;
      transitionRef.current = next;
      lockUntilRef.current = now + next.durationMs + SCROLL_LOCK_MARGIN_MS;
      setTransition(next);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 4) return;
      step(event.deltaY > 0 ? 1 : -1);
    };

    let touchStartY: number | null = null;
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchStartY === null) return;
      const dy = (event.touches[0]?.clientY ?? touchStartY) - touchStartY;
      if (Math.abs(dy) < SWIPE_THRESHOLD_PX) return;
      touchStartY = null; // one step per swipe
      step(dy < 0 ? 1 : -1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const direction =
        event.key === "ArrowDown" || event.key === "PageDown"
          ? 1
          : event.key === "ArrowUp" || event.key === "PageUp"
            ? -1
            : 0;
      if (!direction) return;
      event.preventDefault();
      step(direction);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible]);

  function advance() {
    setTransition((current) => splashReducer(current, { type: "click", reducedMotion: prefersReducedMotion() }));
  }

  function dragAdvance() {
    setTransition((current) => splashReducer(current, { type: "drag", reducedMotion: prefersReducedMotion() }));
  }

  // Pointer drag on the side bar: any movement past 8px exits, matching the
  // ball's drag threshold on the splash (Splash.tsx).
  function handleBarPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const startX = event.clientX;
    const startY = event.clientY;
    const el = event.currentTarget;
    el.setPointerCapture(event.pointerId);

    const cleanup = () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", cleanup);
      el.removeEventListener("pointercancel", cleanup);
    };
    const onMove = (moveEvent: PointerEvent) => {
      if (Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY) > 8) {
        cleanup();
        exit();
      }
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", cleanup);
    el.addEventListener("pointercancel", cleanup);
  }

  if (!visible) return null;

  const reduced = prefersReducedMotion();
  const rootProps = {
    ref: rootRef,
    "data-intro-overlay": true,
    role: "dialog",
    "aria-modal": true,
    "aria-label": "Introducción",
    tabIndex: -1,
    style: {
      opacity: exiting ? 0 : 1,
      transition: `opacity ${reduced ? 0 : MOTION.introExitMs}ms ${EASE_IN_OUT}`,
    },
  } as const;

  // Responsive proposal (not in Figma, which only designs 1440): below 768px
  // the 1440x682 frame would shrink to a thin strip with a ~20px Scroll
  // button. Phones get a vertical recomposition instead: black header, the
  // same splash scaled to the width, a large Scroll button, and taps on any
  // empty area advance the illustration (swipes already do).
  if (viewport.w < COMPACT_MAX_W) {
    const headerH = 72;
    const splashScale = Math.min((viewport.w - 2 * COMPACT_GUTTER) / SPLASH.w, (viewport.h - headerH) / (FRAME.h - SCENE_TOP));
    return (
      <div {...rootProps} className="fixed inset-0 z-50 flex touch-none flex-col overflow-hidden bg-white">
        <header className="flex shrink-0 items-center gap-3 bg-negro px-4" style={{ height: headerH }}>
          <IsoEdgar width={40} />
          <p className="font-sans text-[12px] font-semibold leading-[16px] text-white">
            Desarrollador Full Stack | Next.js | Angular | NestJS | Prisma | Supabase
          </p>
        </header>
        <div
          className="relative flex flex-1 flex-col justify-end overflow-hidden"
          onClick={(event) => {
            // Any tap outside a button advances the illustration.
            if (!(event.target as HTMLElement).closest("button")) advance();
          }}
        >
          {/* The Figma scene below the nav bar (frame y 137–682), scaled so the
              splash fills the width, cropped around it and anchored to the
              bottom edge like on desktop: both purple backgrounds bleed off the
              bottom where the design puts them. */}
          <div className="relative w-full shrink-0 overflow-hidden" style={{ height: (FRAME.h - SCENE_TOP) * splashScale }}>
            <div
              className="absolute left-0 top-0"
              style={{
                width: FRAME.w,
                height: FRAME.h,
                transform: `translate(${COMPACT_GUTTER - SPLASH.x * splashScale}px, ${-SCENE_TOP * splashScale}px) scale(${splashScale})`,
                transformOrigin: "top left",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector background */}
              <img src="/figma/intro/bg-left.svg" alt="" aria-hidden="true" draggable={false} className="pointer-events-none absolute block max-w-none" style={{ left: 0, top: -8, width: 609, height: 693 }} />
              {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector background */}
              <img src="/figma/intro/bg-right.svg" alt="" aria-hidden="true" draggable={false} className="pointer-events-none absolute block max-w-none" style={{ left: 640, top: 1, width: 801, height: 691 }} />
              <div className="absolute" style={{ left: SPLASH.x, top: SPLASH.y, width: SPLASH.w, height: SPLASH.h }}>
                <Splash transition={transition} onAdvance={advance} onDrag={dragAdvance} />
              </div>
            </div>
            {/* Scroll at its Figma spot next to the dog, enlarged for touch. */}
            <button
              type="button"
              onClick={exit}
              aria-label="Scroll — entrar al portafolio"
              className="absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5 border-0 bg-transparent p-1"
              style={{
                left: COMPACT_GUTTER + (SCROLL_SPOT.x - SPLASH.x) * splashScale,
                top: (SCROLL_SPOT.y - SCENE_TOP) * splashScale,
              }}
            >
              <Huellita style={{ width: 56, height: 56 / HUELLITA_ASPECT }} />
              <span className="font-sans text-[13px] font-bold leading-[18px] text-negro" style={{ letterSpacing: `${SCROLL_LETTER_SPACING}px` }}>
                Scroll
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div {...rootProps} className="fixed inset-0 z-50 flex touch-none items-start justify-center overflow-hidden bg-white">
      {/* The black bar is pinned to the top edge and spans the full viewport,
          even when the scaled frame is narrower (height-limited screens). */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 bg-negro" style={{ height: NAV_BAR_H * scale }} />
      {/* flexShrink 0 keeps the 1440 frame intact; it scales from its top edge
          and shifts up by its 1px top offset so the bar touches the viewport top. */}
      <div
        style={{
          position: "relative",
          flexShrink: 0,
          width: FRAME.w,
          height: FRAME.h,
          transform: `translateY(${-NAV_BAR_TOP * scale}px) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {/* 1. Background shapes */}
        {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector background, see components/common/Layer.tsx */}
        <img
          src="/figma/intro/bg-left.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute block max-w-none"
          style={{ left: 0, top: -8, width: 609, height: 693 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector background, see components/common/Layer.tsx */}
        <img
          src="/figma/intro/bg-right.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute block max-w-none"
          style={{ left: 640, top: 1, width: 801, height: 691 }}
        />

        {/* 3. Nav bar */}
        <div
          className="absolute overflow-hidden bg-negro"
          style={{ left: 0, top: NAV_BAR_TOP, width: FRAME.w, height: NAV_BAR_H }}
        >
          <IsoEdgar width={59} style={{ position: "absolute", left: 168, top: 47 }} />
          <p
            className="absolute whitespace-nowrap font-sans font-semibold text-white"
            style={{ left: 564, top: 71, fontSize: 20, lineHeight: "30px" }}
          >
            Desarrollador Full Stack | Next.js | Angular | NestJS | Prisma | Supabase
          </p>
        </div>

        {/* 4. Splash illustration box */}
        <div className="absolute" style={{ left: 359, top: 162, width: 600, height: 482 }}>
          <Splash transition={transition} onAdvance={advance} onDrag={dragAdvance} />
        </div>

        {/* 5. Scroll (paw + label), exits the overlay */}
        <button
          type="button"
          onClick={exit}
          aria-label="Scroll — entrar al portafolio"
          className="absolute border-0 bg-transparent p-0 text-left"
          style={{ left: 619, top: 439, width: 80.39, height: 99 }}
        >
          <Huellita style={{ position: "absolute", left: 0, top: 0, width: 80.39, height: 66 }} />
          <span
            className="absolute font-sans font-bold text-negro"
            style={{
              left: 16,
              top: 71,
              width: 47,
              fontSize: 14,
              lineHeight: "28px",
              letterSpacing: `${SCROLL_LETTER_SPACING}px`,
            }}
          >
            Scroll
          </span>
        </button>

        {/* 6. Side bar, drag-to-exit */}
        <div
          aria-hidden="true"
          className="absolute cursor-grab touch-none"
          style={{ left: 1273, top: 162, width: 6, height: 86, borderRadius: 3, backgroundColor: "#ececec" }}
          onPointerDown={handleBarPointerDown}
        />
      </div>
    </div>
  );
}
