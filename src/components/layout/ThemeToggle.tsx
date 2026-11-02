"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { readResolvedTheme, setPreference, subscribeTheme } from "@/lib/theme";

/** Header button: switches between light and dark. */
export function ThemeToggle() {
  // Server snapshot is null: the correct icon is shown by CSS (dark: variant),
  // so nothing visual depends on hydration.
  const theme = useSyncExternalStore(subscribeTheme, readResolvedTheme, () => null);

  return (
    <button
      type="button"
      onClick={() => setPreference(readResolvedTheme() === "dark" ? "light" : "dark")}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-full text-fg-muted transition-colors duration-200 hover:text-fg"
    >
      <Sun aria-hidden className="size-[18px] dark:hidden" strokeWidth={1.5} />
      <Moon aria-hidden className="hidden size-[18px] dark:block" strokeWidth={1.5} />
    </button>
  );
}
