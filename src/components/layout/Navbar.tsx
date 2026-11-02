import Link from "next/link";
import { navigation, profile } from "@/data/profile";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="site-header sticky top-0 z-50 bg-bg/85 backdrop-blur-md backdrop-saturate-150">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="relative z-50 -ml-1 px-1 py-2 text-[0.9375rem] font-medium tracking-[-0.01em] text-fg"
        >
          {profile.name}
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navigation.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="link-draw py-2 text-small transition-colors duration-200"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="relative z-50 flex items-center gap-2">
            <MobileMenu />
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="scroll-progress absolute inset-x-0 -bottom-px h-px bg-accent"
      />
    </header>
  );
}
