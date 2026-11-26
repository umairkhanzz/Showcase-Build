"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { useScrolled } from "@/hooks/use-scrolled";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenuButton, MobileMenuPanel } from "./mobile-menu";

/**
 * Fixed header. Transparent at the top of the page; once scrolled, a blurred
 * backdrop fades in behind it and the link pill gets its border.
 */
export function Navbar() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 border-b border-foreground/5 bg-background/85 backdrop-blur-xl transition-opacity duration-500",
          solid ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="mx-auto flex h-[72px] w-full max-w-[1360px] items-center justify-between gap-6 px-5 md:px-8">
        <Logo onClick={() => setMenuOpen(false)} />
        <NavLinks scrolled={scrolled} />
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />
          <MagneticButton href={site.contactUrl} size="sm" className="hidden sm:inline-flex">
            Let&apos;s talk
          </MagneticButton>
          <MobileMenuButton open={menuOpen} onOpenChange={setMenuOpen} />
        </div>
      </div>
      <MobileMenuPanel open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}
