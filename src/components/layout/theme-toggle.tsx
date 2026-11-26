"use client";

import { Moon, Sun } from "lucide-react";
import { getCurrentTheme, setTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";

/**
 * Switches between light and dark. Which icon shows is decided by CSS (`dark:`),
 * so the server and client render identical markup.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => setTheme(getCurrentTheme() === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className={cn(
        "grid size-10 place-items-center rounded-full border border-foreground/10 text-muted-foreground transition-all duration-200",
        "hover:scale-105 hover:border-foreground/30 hover:text-foreground active:scale-95",
        className,
      )}
    >
      <Sun aria-hidden className="hidden size-[18px] dark:block" />
      <Moon aria-hidden className="block size-[18px] dark:hidden" />
    </button>
  );
}
