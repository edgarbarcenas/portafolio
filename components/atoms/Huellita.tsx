import type { CSSProperties } from "react";

// Figma vector exported as one SVG with background rects removed (no
// backdrop); natural size 80.39 x 66.
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
