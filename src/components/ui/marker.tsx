import type { ReactNode } from "react";

/**
 * Lime highlighter behind a word; it draws in when scrolled into view.
 * `suppressHydrationWarning`: RevealObserver may add `data-visible` to
 * streamed HTML before React hydrates it, which is intended.
 */
export function Marker({ children }: { children: ReactNode }) {
  return (
    <span className="marker" suppressHydrationWarning>
      {children}
    </span>
  );
}
