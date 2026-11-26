import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "article";
  id?: string;
  "aria-labelledby"?: string;
};

/** Centered page-width wrapper with consistent side padding. */
export function Container({ children, className, as: Tag = "div", ...rest }: ContainerProps) {
  return (
    <Tag {...rest} className={cn("mx-auto w-full max-w-[1360px] px-5 md:px-8", className)}>
      {children}
    </Tag>
  );
}
