import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Wordmark: name + suffix in a lime pill, e.g. "umair[.dev]". */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name}, home`}
      className={cn(
        "inline-flex items-center gap-[3px] font-display text-[19px] font-semibold leading-none tracking-[-0.03em] text-foreground",
        className,
      )}
    >
      {site.logo.name}
      <span className="rounded-[6px] bg-signal px-1.5 py-[3px] text-[15px] text-signal-foreground">
        {site.logo.suffix}
      </span>
    </Link>
  );
}
