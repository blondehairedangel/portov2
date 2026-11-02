import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Runs before first paint so the correct theme is applied without a flash.
 * Kept tiny and dependency-free; mirrors applyTheme() in lib/theme.ts.
 */
const script = `(function(){try{var d=document.documentElement,t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var m=window.matchMedia("(prefers-color-scheme: dark)").matches;d.classList.toggle("dark",t==="dark"||(t!=="light"&&m))}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
