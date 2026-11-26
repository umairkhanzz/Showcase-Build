import { themeInitScript } from "@/lib/theme";

/**
 * Inline <head> script that applies the saved theme before first paint.
 * See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
