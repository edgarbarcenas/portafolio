import IsoEdgar from "@/components/common/IsoEdgar";
import NavLink from "./NavLink";
import MobileNavToggle from "./MobileNavToggle";
import { NAV_ITEMS, type NavCurrent, isCurrentNavItem, resolveLogoNav, resolveNavItem } from "./nav-items";

export type SiteNavProps = {
  current: NavCurrent;
};

// Figma frame is 1440 x 143, not sticky (no fixed children in the source).
// Server wrapper: the only client code is the leaf anchor (NavLink, for
// scrollToSection) and the mobile toggle (MobileNavToggle, for its state).
export default function SiteNav({ current }: SiteNavProps) {
  const isHome = current === "home";
  const surfaceClass = isHome ? "bg-white/90 text-negro" : "bg-purpura text-blanco";
  const logoNav = resolveLogoNav(current);
  const items = NAV_ITEMS.map((item) => ({
    ...item,
    nav: resolveNavItem(item.label, current),
    active: isCurrentNavItem(item.label, current),
  }));

  return (
    <nav aria-label="Principal" className={`relative w-full ${surfaceClass}`}>
      {/* Desktop — exact Figma geometry at the 1440 px reference. */}
      <div className="relative mx-auto hidden h-[143px] max-w-[1440px] xl:block">
        <NavLink
          nav={logoNav}
          className="absolute"
          style={{ left: 168, top: 41 }}
          aria-label="Edgar Barcenas — inicio"
        >
          <IsoEdgar width={59} />
        </NavLink>
        {items.map((item) => (
          <NavLink
            key={item.label}
            nav={item.nav}
            active={item.active}
            className={`absolute text-[17px] leading-[28px] font-sans ${
              item.active ? "font-semibold text-lila" : "font-normal"
            }`}
            style={{ left: item.left1440, top: 58 }}
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Responsive proposal (not in Figma): <1280, see MobileNavToggle. */}
      <MobileNavToggle logoNav={logoNav} items={items} />
    </nav>
  );
}
