"use client";

import { useEffect, useId, useState } from "react";

type Props = {
  src: string;
  name: string;
  height: number;
};

// Figma offset from its logo: tooltip box at (78, 75) from the logo's
// top-left. Shown on hover/focus, toggled by tap on touch, dismissed with
// Escape.
export default function TechLogo({ src, name, height }: Props) {
  const tooltipId = useId();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const visible = (hovered || focused || tapped) && !dismissed;

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDismissed(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  const reset = () => setDismissed(false);

  return (
    <span
      tabIndex={0}
      aria-describedby={tooltipId}
      className="relative block w-[100px]"
      style={{ height }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          reset();
          setHovered(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHovered(false);
      }}
      onPointerUp={(event) => {
        if (event.pointerType !== "mouse") {
          reset();
          setTapped((value) => !value);
        }
      }}
      onFocus={() => {
        reset();
        setFocused(true);
      }}
      onBlur={() => {
        setFocused(false);
        setTapped(false);
      }}
    >
      <img src={src} alt={name} draggable={false} className="block w-[100px]" style={{ height }} />
      <span
        id={tooltipId}
        role="tooltip"
        className={`group absolute z-30 flex h-8 items-center justify-center rounded-lg bg-lila px-4 shadow-[0_1px_3px_1px_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.3)] transition-[opacity,box-shadow] duration-200 ease-md3 active:shadow-[0_2px_6px_2px_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.3)] ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ left: 78, top: 75 }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-lg bg-[#49454f]/8 transition-colors duration-200 ease-md3 group-active:bg-[#49454f]/10" />
        <span className="relative whitespace-nowrap font-roboto text-[14px] font-medium leading-[20px] tracking-[0.1px] text-on-surface">
          {name}
        </span>
      </span>
    </span>
  );
}
