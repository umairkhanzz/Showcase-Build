import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional element aligned to the right on wide screens (e.g. a link). */
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, action, className }: SectionHeadingProps) {
  return (
    <div
      data-reveal=""
      suppressHydrationWarning
      className={cn("mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between", className)}
    >
      <div className="max-w-4xl">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <h2 className="text-balance font-display text-[40px] font-semibold leading-[0.98] tracking-[-0.04em] md:text-[64px]">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Small monospace label used above headings. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground", className)}>
      {children}
    </p>
  );
}
