import type { CSSProperties } from "react";
import { SKILL_ICONS, type SkillIconKey } from "@/lib/habilidades/icon-layers";

// Purely decorative; the row's text label carries the meaning.
export default function SkillIcon({ icon }: { icon: SkillIconKey }) {
  const spec = SKILL_ICONS[icon];
  const boxStyle: CSSProperties = { inset: spec.boxInset };

  return (
    <span aria-hidden="true" className="relative block size-[50px] shrink-0">
      <img
        src="/figma/skills/fondo.svg"
        alt=""
        draggable={false}
        className="absolute inset-0 block size-full max-w-none"
      />
      <span className={`absolute block${spec.overflowHidden ? " overflow-hidden" : ""}`} style={boxStyle}>
        {spec.layers.map((layer, index) =>
          layer.kind === "image" ? (
            <img
              key={index}
              src={layer.src}
              alt=""
              draggable={false}
              className="absolute block size-full max-w-none"
              style={{ inset: layer.inset }}
            />
          ) : (
            <div
              key={index}
              className="absolute"
              style={
                {
                  inset: layer.divInset,
                  WebkitMaskImage: `url(${layer.maskSrc})`,
                  maskImage: `url(${layer.maskSrc})`,
                  WebkitMaskSize: layer.maskSize,
                  maskSize: layer.maskSize,
                  WebkitMaskPosition: layer.maskPosition,
                  maskPosition: layer.maskPosition,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  ...(layer.maskMode ? { WebkitMaskMode: layer.maskMode, maskMode: layer.maskMode } : {}),
                } as CSSProperties
              }
            >
              <img
                src={layer.src}
                alt=""
                draggable={false}
                className="absolute block size-full max-w-none"
                style={{ inset: layer.imageInset }}
              />
            </div>
          ),
        )}
      </span>
    </span>
  );
}
