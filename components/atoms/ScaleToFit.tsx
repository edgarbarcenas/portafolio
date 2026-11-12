"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  // Size of the fixed Figma composition, in px.
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
};

// Responsive adaptation (not specified in Figma): absolutely positioned
// compositions keep their exact 1440-reference geometry and scale down
// uniformly when their container is narrower. Never scales up.
export default function ScaleToFit({ width, height, className, children }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / width));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outer} className={className} style={{ width: "100%", maxWidth: width, height: height * scale }}>
      <div
        style={{
          position: "relative",
          width,
          height,
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
