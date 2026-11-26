"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/cn";

/** Returns the index of the nav link that matches the current route, or -1. */
function useActiveIndex() {
  const pathname = usePathname();
  return navLinks.findIndex(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );
}

/**
 * Desktop links inside a pill. A solid "indicator" slides under the hovered
 * link and rests on the active route.
 */
export function NavLinks({ scrolled }: { scrolled: boolean }) {
  const activeIndex = useActiveIndex();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const highlighted = hoverIndex ?? activeIndex;

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Move the indicator by writing styles directly; no extra render needed.
  useLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const link = linkRefs.current[highlighted];
    if (!indicator) return;

    if (!link) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.opacity = "1";
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [highlighted]);

  return (
    <nav aria-label="Primary" className="relative isolate hidden rounded-full p-1.5 lg:block">
      {/* Pill background: fades in once the page scrolls */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-20 rounded-full border border-foreground/10 bg-card/90 shadow-[0_12px_32px_-20px_hsl(var(--foreground)/0.35)] backdrop-blur-xl transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
      {/* Sliding indicator */}
      <span
        ref={indicatorRef}
        aria-hidden
        className="absolute inset-y-1.5 left-0 -z-10 rounded-full bg-foreground opacity-0 transition-[transform,width,opacity] duration-500 ease-snap"
      />
      <ul className="flex" onMouseLeave={() => setHoverIndex(null)}>
        {navLinks.map((link, index) => (
          <li key={link.href}>
            <Link
              ref={(node) => {
                linkRefs.current[index] = node;
              }}
              href={link.href}
              onMouseEnter={() => setHoverIndex(index)}
              onFocus={() => setHoverIndex(index)}
              onBlur={() => setHoverIndex(null)}
              aria-current={index === activeIndex ? "page" : undefined}
              className={cn(
                "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 xl:px-5",
                index === highlighted ? "text-background" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
