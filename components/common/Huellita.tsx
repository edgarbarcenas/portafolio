/* eslint-disable @next/next/no-img-element -- decorative vector art */
import type { CSSProperties } from "react";

// "Huellita" paw: the full Figma vector (719 paths, two colours) exported as
// one SVG with the canvas/frame background rects removed, so it has no
// background and sits on any surface the chasing paws cross. Natural size
// 80.39 x 66 (svg box 81 x 66).
export const HUELLITA_ASPECT = 80.39 / 66;

type Props = {
  className?: string;
  style?: CSSProperties;
};

export default function Huellita({ className, style }: Props) {
  return (
    <img
      src="/figma/common/huellita.svg"
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`block max-w-none ${className ?? ""}`}
      style={style}
    />
  );
}
