import type { CSSProperties } from "react";
import Layer, { type LayerSpec } from "./Layer";

// Rebuilt from Figma layers; box is 59 x 60.606 (source of ISO_ASPECT below).
const LAYERS: ReadonlyArray<LayerSpec> = [
  { src: "/figma/common/iso/v0.svg", inset: "31.01% 15.34% 1.14% 15.48%" },
  { src: "/figma/common/iso/v1.svg", inset: "64.22% 17.88% 5.97% 63.56%" },
  { src: "/figma/common/iso/v2.svg", inset: "56.03% 4.52% 29.98% 84.92%" },
  { src: "/figma/common/iso/v3.svg", inset: "56.08% 84.77% 30% 4.66%" },
  { src: "/figma/common/iso/v4.svg", inset: "2.95% 7.21% 38.06% 3.04%" },
  { src: "/figma/common/iso/v5.svg", inset: "7.84% 2.69% 45.89% 75.09%" },
  { src: "/figma/common/iso/glasses.png", inset: "57.45% 22.05% 24.3% 23.24%" },
  { src: "/figma/common/iso/outline.svg", inset: "0.03% 0 0.01% 0" },
];

export const ISO_ASPECT = 59 / 60.606;

type Props = {
  width: number;
  className?: string;
  style?: CSSProperties;
};

// Decorative: callers that make it a link or button provide the label.
export default function IsoEdgar({ width, className, style }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`relative block shrink-0 ${className ?? ""}`}
      style={{ width, height: width / ISO_ASPECT, ...style }}
    >
      {LAYERS.map((layer) => (
        <Layer key={layer.src} {...layer} />
      ))}
    </span>
  );
}
