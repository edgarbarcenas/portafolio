"use client";

import { useEffect, useId, useRef, useState } from "react";
import IsoEdgar from "@/components/atoms/IsoEdgar";
import NavLink, { type NavTarget } from "./NavLink";

type Item = { label: string; nav: NavTarget; active: boolean };

type Props = {
  logoNav: NavTarget;
  items: readonly Item[];
};

// Not in Figma: below 1280px the nav collapses into a "Menú" toggle; colours
// inherit from the parent <nav> in SiteNav.tsx. Escape returns focus to the
// toggle; the panel stays in normal flow (no overlay).
export default function MobileNavToggle({ logoNav, items }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="xl:hidden">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <NavLink nav={logoNav} className="relative block" aria-label="Edgar Barcenas — inicio">
          <IsoEdgar width={40} />
        </NavLink>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="font-sans text-[17px]"
        >
          Menú
        </button>
      </div>
      {open && (
        <div id={panelId} className="flex flex-col gap-4 px-4 pb-6 sm:px-6">
          {items.map((item) => (
            <NavLink
              key={item.label}
              nav={item.nav}
              active={item.active}
              className={`font-sans text-[17px] ${item.active ? "font-semibold text-lila" : "font-normal"}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
