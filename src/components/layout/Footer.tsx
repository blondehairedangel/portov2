import Link from "next/link";
import { navigation, profile } from "@/data/profile";
import { ThemeControl } from "./ThemeControl";

export function Footer() {
  // Evaluated at build time for the static export.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-page grid-layout gap-y-8 py-10 md:py-12">
        <p className="col-span-4 text-small text-fg md:col-span-3">
          {profile.name} © {year}
        </p>

        <nav aria-label="Footer" className="col-span-4 md:col-span-5 lg:col-span-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-draw inline-block py-2 text-small text-fg-muted transition-colors hover:text-fg md:py-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-4 flex flex-col gap-3 md:col-span-8 md:flex-row md:items-center md:justify-between lg:col-span-3 lg:flex-col lg:items-end lg:justify-start">
          <p className="text-small text-fg-muted">Built with Next.js.</p>
          <ThemeControl />
        </div>
      </div>
    </footer>
  );
}
