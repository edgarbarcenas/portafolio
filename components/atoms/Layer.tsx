import type { CSSProperties } from "react";

export type LayerSpec = {
  src: string;
  // CSS inset shorthand in percentages of the parent box (top right bottom left).
  inset: string;
  blend?: "screen" | "multiply";
};

export default function Layer({ src, inset, blend }: LayerSpec) {
  const style: CSSProperties = { inset };
  if (blend) style.mixBlendMode = blend;
  return (
    <span aria-hidden="true" className="absolute block" style={style}>
      <img
        src={src}
        alt=""
        draggable={false}
        className="absolute inset-0 block size-full max-w-none"
      />
    </span>
  );
}
