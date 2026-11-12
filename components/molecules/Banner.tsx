"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";
import { LINEAR, MOTION } from "@/lib/motion";
import { placementStyle } from "@/lib/placement";

type Props = {
  className?: string;
};

// Values below are CSS degrees (CSS = -Figma rotation), see placementStyle.
const ROTATE: Record<"star6" | "star7" | "ellipse146", { default: number; active: number }> = {
  star6: { default: 0, active: 180 },
  star7: { default: 0, active: 180 },
  ellipse146: { default: -57.43, active: 57 },
};

const rotateTransition: CSSProperties = {
  transitionProperty: "transform",
  transitionDuration: `${MOTION.hoverMs}ms`,
  transitionTimingFunction: LINEAR,
};

function rotatingLayerStyle(
  key: keyof typeof ROTATE,
  box: Parameters<typeof placementStyle>[0],
  active: boolean,
): CSSProperties {
  const deg = active ? ROTATE[key].active : ROTATE[key].default;
  return {
    ...placementStyle(box),
    ...rotateTransition,
    transform: `rotate(${deg}deg)`,
  };
}

// Not prototyped for touch in Figma: tapping toggles the active state so
// the hover rotation stays reachable without a pointer.
export default function Banner({ className }: Props) {
  const [active, setActive] = useState(false);

  const toggleOnTouch = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") setActive((value) => !value);
  };

  return (
    <div
      role="img"
      aria-label="Composición decorativa"
      tabIndex={0}
      data-state={active ? "active" : "default"}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onPointerUp={toggleOnTouch}
      className={`relative block h-[392px] w-[510px] ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-[256px] block size-[136px] rounded-full bg-[#fff3d0]"
      />
      <span
        aria-hidden="true"
        className="absolute block rounded-full bg-[#f9d57f]"
        style={placementStyle({ w: 345, h: 345, cx: 165 + 345 / 2, cy: 27 + 345 / 2 })}
      />
      <img
        src="/figma/inicio/banner-star6.svg"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute block"
        style={rotatingLayerStyle("star6", { w: 273, h: 273, cx: 337.5, cy: 199.5 }, active)}
      />
      <span
        aria-hidden="true"
        className="absolute block rounded-full bg-[#009379]"
        style={placementStyle({ w: 222, h: 222, cx: 35 + 222 / 2, cy: 0 + 222 / 2 })}
      />
      <img
        src="/figma/inicio/banner-ellipse146.svg"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute block"
        style={rotatingLayerStyle(
          "ellipse146",
          { w: 126.453, h: 219.022, cx: 145.5, cy: 108.4 },
          active,
        )}
      />
      <img
        src="/figma/inicio/banner-star7.svg"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute block"
        style={rotatingLayerStyle("star7", { w: 106, h: 106, cx: 68, cy: 328 }, active)}
      />
    </div>
  );
}
