"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/cn";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/** Wraps any element so it gently follows the pointer while hovered. */
export function Magnetic({ children, strength, className }: MagneticProps) {
  const ref = useMagnetic<HTMLSpanElement>({ strength });

  return (
    <span ref={ref} className={cn("inline-flex will-change-transform", className)}>
      {children}
    </span>
  );
}
