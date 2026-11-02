"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
};

/**
 * Anchor link to a homepage section (e.g. "/#about").
 *
 * A plain <a> is used on purpose: the browser handles same-page hash
 * navigation natively, which keeps the CSS smooth scrolling and the
 * scroll-padding offset for the sticky header (Next's <Link> turns smooth
 * scrolling off during hash navigation).
 *
 * Home is marked as current while on the homepage, as before.
 */
export function NavLink({ href, children, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = href === "/#home" && (pathname === "/" || pathname === "");

  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(className, active ? "text-fg" : "text-fg-muted hover:text-fg")}
    >
      {children}
    </a>
  );
}
