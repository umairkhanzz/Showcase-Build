import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Magnetic } from "./magnetic";

/**
 * Round lime arrow chip with the same feel as MagneticButton: it follows the
 * pointer, and a fill rises inside it while the parent `group` (e.g. the whole card) is hovered.
 * Decorative only, so it can sit inside a card that is itself a link.
 */
export function MagneticIcon({ icon: Icon = ArrowRight, className }: { icon?: LucideIcon; className?: string }) {
  return (
    <Magnetic strength={0.45}>
      <span
        aria-hidden
        className={cn(
          "relative isolate grid size-14 place-items-center overflow-hidden rounded-full bg-signal text-signal-foreground",
          "transition-colors duration-500 ease-snap group-hover:text-background",
          className,
        )}
      >
        {/* Foreground-coloured fill: black in light mode, white in dark mode, so it always stands out. */}
        <span className="absolute inset-0 -z-10 translate-y-full rounded-t-[50%] bg-foreground transition-[translate,border-radius] duration-500 ease-snap group-hover:translate-y-0 group-hover:rounded-none" />
        <Icon className="size-5 transition-transform duration-500 ease-snap group-hover:-rotate-45" />
      </span>
    </Magnetic>
  );
}
