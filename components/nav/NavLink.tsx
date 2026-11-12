"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { scrollToSection } from "@/lib/scroll";

// Either an in-page section anchor (scrolled with lib/scroll, 300 ms
// ease-in-out) or a real route, depending on where the nav item points from
// the current page — see nav-items.ts for the resolution rules.
export type NavTarget = { kind: "section"; id: string } | { kind: "route"; href: string };

type Props = {
  nav: NavTarget;
  active?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "aria-label"?: AnchorHTMLAttributes<HTMLAnchorElement>["aria-label"];
};

// The one client leaf of the nav: it needs `scrollToSection`, which touches
// `window`/`document`. Everything else in components/nav can stay server-only.
export default function NavLink({ nav, active, className, style, children, ...aria }: Props) {
  const ariaCurrent = active ? "page" : undefined;

  if (nav.kind === "route") {
    return (
      <Link href={nav.href} className={className} style={style} aria-current={ariaCurrent} {...aria}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={`#${nav.id}`}
      className={className}
      style={style}
      aria-current={ariaCurrent}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(nav.id);
      }}
      {...aria}
    >
      {children}
    </a>
  );
}
