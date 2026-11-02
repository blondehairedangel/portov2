"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { readPreference, setPreference, subscribeTheme, type ThemePreference } from "@/lib/theme";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/** Footer control: three states, so a manual choice can be returned to "System". */
export function ThemeControl() {
  const preference = useSyncExternalStore(subscribeTheme, readPreference, () => null);

  return (
    <div role="group" aria-label="Color theme" className="flex items-center gap-1">
      {OPTIONS.map((option) => {
        const active = preference === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={preference === null ? undefined : active}
            onClick={() => setPreference(option.value)}
            className={cn(
              "label inline-flex h-11 items-center px-2 transition-colors duration-200 md:h-8",
              active ? "text-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            <span className={cn("link-draw", active && "[background-size:100%_1px]")}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
