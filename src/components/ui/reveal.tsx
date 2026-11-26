import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  /** Delay in ms before this element animates in (use for staggering). */
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/**
 * Fades and lifts its children into view on scroll. Works in Server
 * Components: it only sets `data-reveal`; RevealObserver + CSS do the rest.
 */
export function Reveal({ children, delay = 0, as: Tag = "div", className, style }: RevealProps) {
  return (
    <Tag
      data-reveal=""
      // RevealObserver may add `data-visible` to streamed HTML before hydration; that's intended.
      suppressHydrationWarning
      className={cn(className)}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
