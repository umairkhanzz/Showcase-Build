import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type AutoplayProgressProps = {
  /** Called when the bar has filled; use it to move to the next item. */
  onDone: () => void;
  durationMs: number;
  className?: string;
};

/**
 * Thin lime bar that fills over `durationMs` and then calls `onDone`.
 * Pure CSS animation, so no timers to clean up. It pauses while any ancestor
 * with the `group/autoplay` class is hovered. Re-mount it (via `key`) to restart.
 */
export function AutoplayProgress({ onDone, durationMs, className }: AutoplayProgressProps) {
  return (
    <span
      aria-hidden
      onAnimationEnd={onDone}
      style={{ "--progress-duration": `${durationMs}ms` } as CSSProperties}
      className={cn(
        "absolute inset-x-0 bottom-0 h-[2px] origin-left animate-progress bg-signal group-hover/autoplay:[animation-play-state:paused]",
        className,
      )}
    />
  );
}
