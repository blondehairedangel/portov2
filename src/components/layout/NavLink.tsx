"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
  /** Opens in a new tab and is never marked as the current page. */
  external?: boolean;
};

/**
 * Link that marks itself with aria-current="page" when its route is active.
 * External links render as a plain anchor that opens in a new tab.
 */
export function NavLink({ href, children, className, onNavigate, external = false }: NavLinkProps) {
  const pathname = usePathname();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={cn(className, "text-fg-muted hover:text-fg")}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const active = href === "/" ? normalized === "/" : normalized.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(className, active ? "text-fg" : "text-fg-muted hover:text-fg")}
    >
      {children}
    </Link>
  );
}
