"use client";

import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { centreFromOrigin, placementStyle } from "@/lib/placement";
import Perro from "@/components/atoms/Perro";
import { unwrapAngle, type SplashTransition } from "@/lib/intro/splash-machine";
import {
  BALL_ORIGIN,
  HEAD_POSE,
  HEAD_POSE_ROT,
  PERRO_ORIGIN,
  headPlacement,
  zIndices,
} from "@/lib/intro/splash-geometry";

// Edgar never moves: a fixed 122.1x354.1 box at (0, 127.9) inside the splash
// box; inside it the body sits at (0, 57.1) 122.1x297 (the body svg is 123.1x298, close enough to
// stretch into the placed box, same convention as components/atoms/Layer).
const EDGAR_BOX = { x: 0, y: 127.9, w: 122.1, h: 354.1 };
// Local to the Edgar box (body and head are rendered inside it).
const EDGAR_BODY = { x: 0, y: 57.1, w: 122.1, h: 297 };
const PERRO_SIZE = { w: 60, h: 224 };
const BALL_SIZE = { w: 33, h: 33 };

// Keeps each rotation continuous across renders (see unwrapAngle): remembers
// the last *rendered* angle in state and, when the target changes, re-centres
// it so the CSS transition always takes the shortest path. This is React's
// documented "adjust state during render" pattern (no ref access during
// render, no effect indirection) — the conditional setState below runs
// synchronously before paint, it does not flash the stale angle first.
function useUnwrappedAngle(target: number): number {
  const [previousTarget, setPreviousTarget] = useState(target);
  const [angle, setAngle] = useState(target);
  if (target !== previousTarget) {
    setPreviousTarget(target);
    setAngle(unwrapAngle(angle, target));
  }
  return angle;
}

type Props = {
  transition: SplashTransition;
  onAdvance: () => void;
  onDrag: () => void;
};

// The 9-state splash illustration (Figma screen 00, fills its 600x482
// container). One <button> advances the state on click/Enter/Space; while in
// "Default", dragging the ball is an additional pointer-only shortcut to the
// same next state (V5), using the prototype's drag timing instead of the
// click one. See splash-machine.ts for the transition rules and
// splash-geometry.ts for the per-state layer placement.
export default function Splash({ transition, onAdvance, onDrag }: Props) {
  const { state, index, durationMs, easing } = transition;
  const isLast = state === "V9";
  const justDraggedRef = useRef(false);
  const transitionCss = `left ${durationMs}ms ${easing}, top ${durationMs}ms ${easing}, transform ${durationMs}ms ${easing}`;

  const pose = HEAD_POSE[state];
  const headRot = useUnwrappedAngle(HEAD_POSE_ROT[pose]);
  const headStyle: CSSProperties = { ...headPlacement(pose, headRot), transition: transitionCss };

  const bodyCentre = centreFromOrigin(EDGAR_BODY.x, EDGAR_BODY.y, EDGAR_BODY.w, EDGAR_BODY.h, 0);
  const bodyStyle = placementStyle({
    w: EDGAR_BODY.w,
    h: EDGAR_BODY.h,
    cx: bodyCentre.cx,
    cy: bodyCentre.cy,
  });

  const edgarBoxCentre = centreFromOrigin(EDGAR_BOX.x, EDGAR_BOX.y, EDGAR_BOX.w, EDGAR_BOX.h, 0);
  const edgarBoxStyle: CSSProperties = {
    ...placementStyle({ w: EDGAR_BOX.w, h: EDGAR_BOX.h, cx: edgarBoxCentre.cx, cy: edgarBoxCentre.cy }),
    zIndex: zIndices(state).edgar,
  };

  const perroOrigin = PERRO_ORIGIN[state];
  const perroRot = useUnwrappedAngle(perroOrigin.rot);
  const perroCentre = centreFromOrigin(
    perroOrigin.x,
    perroOrigin.y,
    PERRO_SIZE.w,
    PERRO_SIZE.h,
    perroOrigin.rot,
  );
  const perroStyle: CSSProperties = {
    ...placementStyle({ w: PERRO_SIZE.w, h: PERRO_SIZE.h, cx: perroCentre.cx, cy: perroCentre.cy, rot: perroRot }),
    transition: transitionCss,
    zIndex: zIndices(state).perro,
  };

  const ballOrigin = BALL_ORIGIN[state];
  const ballRot = useUnwrappedAngle(ballOrigin.rot);
  const ballCentre = centreFromOrigin(
    ballOrigin.x,
    ballOrigin.y,
    BALL_SIZE.w,
    BALL_SIZE.h,
    ballOrigin.rot,
  );
  const ballStyle: CSSProperties = {
    ...placementStyle({ w: BALL_SIZE.w, h: BALL_SIZE.h, cx: ballCentre.cx, cy: ballCentre.cy, rot: ballRot }),
    transition: transitionCss,
    zIndex: zIndices(state).ball,
  };

  // Pointer drag on the ball: only meaningful from Default (matched against
  // the live transition, not a captured value, since the handler outlives
  // the render it was created in).
  function handleBallPointerDown(event: ReactPointerEvent<HTMLSpanElement>) {
    if (index !== 0) return;
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
        justDraggedRef.current = true;
        cleanup();
        onDrag();
      }
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", cleanup);
    el.addEventListener("pointercancel", cleanup);
  }

  // A completed drag already advanced the state; swallow the click the
  // browser fires on pointerup so it does not advance a second time.
  function handleClick() {
    if (justDraggedRef.current) {
      justDraggedRef.current = false;
      return;
    }
    onAdvance();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-disabled={isLast}
      aria-label={`Avanzar ilustración, paso ${index + 1} de 9`}
      className="relative block h-full w-full cursor-pointer overflow-visible border-0 bg-transparent p-0"
    >
      <span className="block" style={edgarBoxStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector layer stretched to its placed box, see components/atoms/Layer.tsx */}
        <img
          src="/figma/intro/edgar-body.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="block max-w-none"
          style={bodyStyle}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector layer stretched to its placed box, see components/atoms/Layer.tsx */}
        <img
          src="/figma/intro/edgar-head.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="block max-w-none"
          style={headStyle}
        />
      </span>

      <Perro art="intro" style={perroStyle} />

      <span
        className="block"
        style={ballStyle}
        onPointerDown={handleBallPointerDown}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector layer stretched to its placed box, see components/atoms/Layer.tsx */}
        <img
          src="/figma/intro/ball.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 block size-full max-w-none"
        />
      </span>
    </button>
  );
}
