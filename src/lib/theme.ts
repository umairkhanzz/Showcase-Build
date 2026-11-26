export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

/**
 * Runs in <head> before first paint so the page never flashes the wrong theme.
 * Order: saved choice → default (dark). Also adds `js` so scroll animations can hide content safely.
 */
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("${THEME_STORAGE_KEY}")||"${DEFAULT_THEME}";d.classList.toggle("dark",t==="dark")}catch(e){}})()`;

export function getCurrentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}
