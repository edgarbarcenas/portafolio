"use client";

import { useState, type KeyboardEvent } from "react";
import Layer from "@/components/common/Layer";
import { ESTRELLA_SIZE } from "./estrella-placement";

// Figma instance "Estrella" (Bio screen, page centre 219.5/764.5). The page
// composer places the 209 x 209 box with `placementStyle(ESTRELLA_PLACEMENT)`
// from ./estrella-placement
// (whole-instance rotation baked into that transform); this component only
// renders the unrotated 209 x 209 content and the hover micro-animation.

// Face group box, relative to the 209 x 209 instance; its children's insets
// below are relative to this smaller box, clipped by `overflow: hidden`.
const FACE_GROUP_INSET = "29.82% 30.18% 29.45% 30.18%";

// Default -> Variant2, Smart Animate 800 ms linear, reverts on leave/blur.
// Only the star layer rotates (Figma -27.68deg -> CSS rotate(27.68deg));
// circle and face group stay put. prefers-reduced-motion is handled globally
// (app/globals.css zeroes all transition durations), so no JS check is needed
// for a CSS-driven transition like this one.
export default function Estrella() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const active = hovered || focused || tapped;

  const toggleTapped = () => setTapped((value) => !value);

  return (
    <span
      role="img"
      aria-label="Estrella decorativa con el rostro de Edgar"
      tabIndex={0}
      className="relative block"
      style={{ width: ESTRELLA_SIZE, height: ESTRELLA_SIZE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={toggleTapped}
      onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggleTapped();
      }}
    >
      <Layer src="/figma/bio/star/circle.svg" inset="0" />
      <span
        aria-hidden="true"
        className="absolute block transition-transform duration-[800ms] ease-linear"
        style={{ inset: "2.11% 2.11% 2.11% 2.11%", transform: active ? "rotate(27.68deg)" : "rotate(0deg)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector layer */}
        <img
          src="/figma/bio/star/star.svg"
          alt=""
          draggable={false}
          className="absolute inset-0 block size-full max-w-none"
        />
      </span>
      <span aria-hidden="true" className="absolute block overflow-hidden" style={{ inset: FACE_GROUP_INSET }}>
        <Layer src="/figma/bio/star/glasses.png" inset="57.45% 22.05% 24.3% 23.24%" />
        <Layer src="/figma/bio/star/face0.svg" inset="0 0.01% 0.02% -0.01%" />
        <Layer src="/figma/bio/star/face1.svg" inset="77.55% 37.71% 6.54% 37.19%" />
        <Layer src="/figma/bio/star/face2.svg" inset="63.72% 61.17% 33.35% 31.6%" />
        <Layer src="/figma/bio/star/face3.svg" inset="63.74% 31.65% 33.33% 61.04%" />
      </span>
    </span>
  );
}
