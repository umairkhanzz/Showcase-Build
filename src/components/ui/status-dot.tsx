import { cn } from "@/lib/cn";

/** Pulsing green dot for "available" indicators. */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex size-2", className)}>
      <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
      <span className="relative inline-flex size-2 rounded-full bg-success" />
    </span>
  );
}
