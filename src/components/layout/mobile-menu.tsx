"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/cn";
import { setPageScrollLocked } from "@/lib/smooth-scroll";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileMenuButton({ open, onOpenChange }: MobileMenuProps) {
  return (
    <button
      type="button"
      onClick={() => onOpenChange(!open)}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="grid size-10 place-items-center rounded-full border border-foreground/10 text-foreground lg:hidden"
    >
      {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
    </button>
  );
}

/** Full-screen panel shown below the header on small screens. */
export function MobileMenuPanel({ open, onOpenChange }: MobileMenuProps) {
  const pathname = usePathname();
  const close = () => onOpenChange(false);

  // Close on Escape and lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onOpenChange(false);
    document.addEventListener("keydown", onKey);
    setPageScrollLocked(true);
    return () => {
      document.removeEventListener("keydown", onKey);
      setPageScrollLocked(false);
    };
  }, [open, onOpenChange]);

  return (
    <div
      id="mobile-menu"
      hidden={!open}
      data-lenis-prevent
      className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-background px-5 pb-10 pt-6 lg:hidden"
    >
      <ul className="flex flex-col">
        {navLinks.map((link) => (
          <li key={link.href} className="border-b border-foreground/10">
            <Link
              href={link.href}
              onClick={close}
              className={cn(
                "block py-4 font-display text-3xl font-semibold tracking-[-0.03em]",
                pathname.startsWith(link.href) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center gap-3">
        <MagneticButton href={site.contactUrl}>Let&apos;s talk</MagneticButton>
        <ThemeToggle />
      </div>
    </div>
  );
}
