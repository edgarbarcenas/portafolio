"use client";

import { useEffect, useId, useRef, useState } from "react";
import IsoEdgar from "@/components/atoms/IsoEdgar";
import NavLink, { type NavTarget } from "./NavLink";

type Item = { label: string; nav: NavTarget; active: boolean };

type Props = {
  logoNav: NavTarget;
  items: readonly Item[];
  // Solid surface for the full-screen panel; matches the bar in SiteNav.tsx.
  panelClass: string;
};

// Not in Figma: below 1280px the nav collapses into a "Menú" toggle that
// opens a full-screen panel with the same colours as the bar. Escape, the
// close button or picking an item close it; focus returns to the toggle and
// the page behind does not scroll while it is open.
export default function MobileNavToggle({ logoNav, items, panelClass }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = (restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
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
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className={`fixed inset-0 z-50 flex flex-col overflow-y-auto ${panelClass}`}
        >
          {/* Same bar as the closed state, so the logo and toggle stay put. */}
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <NavLink
              nav={logoNav}
              className="relative block"
              aria-label="Edgar Barcenas — inicio"
              onClick={() => close(false)}
            >
              <IsoEdgar width={40} />
            </NavLink>
            <button
              ref={closeRef}
              type="button"
              onClick={() => close(true)}
              className="font-sans text-[17px]"
            >
              Cerrar
            </button>
          </div>
          <ul className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-16">
            {items.map((item) => (
              <li key={item.label}>
                <NavLink
                  nav={item.nav}
                  active={item.active}
                  onClick={() => close(false)}
                  className={`font-sans text-[32px] leading-[42px] ${
                    item.active ? "font-semibold text-lila" : "font-normal"
                  }`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
