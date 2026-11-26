import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Quiet inline link with an arrow that nudges right on hover. */
export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-signal-text",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
