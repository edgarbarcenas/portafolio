import { ROUTES, SECTIONS } from "@/lib/routes";
import type { NavTarget } from "./NavLink";

export type NavCurrent = "home" | "bio" | "proyecto";

export type NavItemDef = {
  label: string;
  // Left edge of the text at the 1440 px Figma reference frame.
  left1440: number;
};

// Order + x-positions from .claude/parallel/specs/T-01-nav.md.
export const NAV_ITEMS: readonly NavItemDef[] = [
  { label: "Experiencia", left1440: 789 },
  { label: "Proyectos", left1440: 912 },
  { label: "Habilidades", left1440: 1022 },
  { label: "Bio", left1440: 1144 },
  { label: "Contacto", left1440: 1194 },
];

const SECTION_BY_LABEL: Readonly<Record<string, string>> = {
  Experiencia: SECTIONS.experiencia,
  Proyectos: SECTIONS.proyectos,
  Habilidades: SECTIONS.habilidades,
  Contacto: SECTIONS.contacto,
};

// Bio always goes to its own route. Contacto always scrolls the current
// page (home, bio and proyecto all carry a #contacto section). The rest
// scroll on home but become a plain "/#section" link elsewhere, landing the
// visitor back on home at that section.
export function resolveNavItem(label: string, current: NavCurrent): NavTarget {
  if (label === "Bio") return { kind: "route", href: ROUTES.bio };

  const id = SECTION_BY_LABEL[label];
  if (label === "Contacto" || current === "home") return { kind: "section", id };

  return { kind: "route", href: `${ROUTES.home}#${id}` };
}

export function isCurrentNavItem(label: string, current: NavCurrent): boolean {
  if (current === "bio") return label === "Bio";
  if (current === "proyecto") return label === "Proyectos";
  return false;
}

export function resolveLogoNav(current: NavCurrent): NavTarget {
  return current === "home" ? { kind: "section", id: SECTIONS.hero } : { kind: "route", href: ROUTES.home };
}
