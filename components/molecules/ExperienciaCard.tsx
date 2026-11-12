"use client";

import { useRef, useState } from "react";
import type { CardSpec } from "@/lib/experiencia/cards-data";

type Props = {
  card: CardSpec;
};

const opposite = (face: CardSpec["initialFace"]) => (face === "front" ? "back" : "front");

// Flips with a 500ms 3D turn; prefers-reduced-motion keeps it instant
// (app/globals.css zeroes transition durations globally). Hover flips on
// mouse; touch toggles on pointerup (click is delayed/dropped on some mobile
// browsers); keyboard toggles via Enter/Space click. Mouse clicks are
// ignored because hover already owns mice.
export default function ExperienciaCard({ card }: Props) {
  const [hovered, setHovered] = useState(false);
  const [toggled, setToggled] = useState(false);
  // Set when a touch/pen tap already toggled, so its synthetic click is skipped.
  const tapHandled = useRef(false);
  const face = hovered !== toggled ? opposite(card.initialFace) : card.initialFace;
  const isFront = face === "front";
  const nextFaceLabel = isFront ? "ver contraportada" : "ver portada";

  return (
    <button
      type="button"
      aria-pressed={!isFront}
      aria-label={`${card.name} — ${nextFaceLabel}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHovered(false);
      }}
      onPointerUp={(event) => {
        if (event.pointerType === "mouse") return;
        tapHandled.current = true;
        setToggled((value) => !value);
      }}
      onClick={(event) => {
        if (tapHandled.current) {
          tapHandled.current = false;
          return;
        }
        // detail 0 = keyboard-activated click (Enter/Space).
        if (event.detail === 0) setToggled((value) => !value);
      }}
      className="relative block h-[523px] w-[323px] touch-manipulation rounded-none text-left [perspective:1200px]"
    >
      <span
        className="relative block size-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d]"
        style={{ transform: isFront ? "rotateY(0deg)" : "rotateY(180deg)" }}
      >
        {/* inert when hidden, so it is neither read nor focusable. */}
        <span
          className="absolute inset-0 block overflow-hidden [backface-visibility:hidden]"
          inert={!isFront}
        >
          <img
            src={card.art}
            alt=""
            draggable={false}
            className="absolute left-0 top-0 block h-auto max-w-none"
            style={{ width: 323 }}
          />
          {/* The art fades to purple from ~57% down; tells the footprint trail
              to use its light paw there (components/organisms/HuellasTrail.tsx). */}
          <span aria-hidden="true" data-huellas-fondo="oscuro" className="absolute inset-x-0 bottom-0 top-[57%]" />
          <div className="absolute left-4 w-[291px]" style={{ top: 387 }}>
            <p
              className={`font-poppins font-semibold leading-[20px] ${card.frontClassName ?? "text-white"}`}
              style={{ fontSize: card.frontSize1, marginBottom: "16.66px" }}
            >
              {card.titleLine1}
            </p>
            <p
              className={`font-poppins font-semibold leading-[20px] ${card.frontClassName ?? "text-white"}`}
              style={{ fontSize: card.frontSize2 }}
            >
              {card.titleLine2}
            </p>
          </div>
        </span>
        {/* Pre-turned so it reads correctly once flipped. */}
        <span
          className="absolute inset-0 block overflow-hidden bg-purpura py-[26px] [backface-visibility:hidden] [transform:rotateY(180deg)]"
          inert={isFront}
        >
          <div className="absolute left-[23px] w-[277px]" style={{ top: 26 }}>
            <p
              className="font-sans font-semibold text-lila leading-[9px]"
              style={{ fontSize: 30, marginBottom: "16.66px" }}
            >
              {card.titleLine1}
            </p>
            <p
              className="font-sans font-medium text-lila leading-[9px]"
              style={{ fontSize: 20, marginBottom: "16.66px" }}
            >
              {card.titleLine2}
            </p>
            {/* Figma exports a marker indent keyed to an undefined
                --list-marker-font-size variable, which resolves to zero; ps-5
                is the standard Tailwind disc indent and matches the reference. */}
            <ul className="list-disc ps-5 font-sans text-[15px] font-semibold leading-[23px] text-white">
              {card.backItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </span>
      </span>
    </button>
  );
}
