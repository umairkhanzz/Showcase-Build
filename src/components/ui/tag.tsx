import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  tone?: "default" | "signal";
  className?: string;
};

/** Small rounded label for tech stacks, categories and badges. */
export function Tag({ children, tone = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "default" && "border border-foreground/10 bg-foreground/[0.04] text-muted-foreground",
        tone === "signal" && "bg-signal text-signal-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
