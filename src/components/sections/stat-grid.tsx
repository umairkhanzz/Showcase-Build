import type { Stat } from "@/content/types";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** Desktop column count by number of stats (literal classes so Tailwind keeps them). */
const DESKTOP_COLUMNS: Record<number, string> = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" };

/**
 * Big numbers between two hairlines, inside the page width (Work page and case studies).
 * Two columns on phones; one row from md up. Dividers sit only between cells.
 */
export function StatGrid({ stats, className }: { stats: Stat[]; className?: string }) {
  // First stat on the last row of the two-column phone grid.
  const lastRowStart = stats.length - (stats.length % 2 === 0 ? 2 : 1);

  return (
    <dl
      className={cn(
        "grid grid-cols-2 border-y border-foreground/10",
        DESKTOP_COLUMNS[stats.length] ?? "md:grid-cols-3",
        className,
      )}
    >
      {stats.map((stat, index) => (
        <Reveal
          key={stat.label}
          delay={index * 80}
          className={cn(
            "flex flex-col border-foreground/10 py-8 md:py-10 md:pr-8",
            index % 2 === 1 && "max-md:pl-4",
            index % 2 === 0 && index < stats.length - 1 && "max-md:border-r max-md:pr-4",
            index < lastRowStart && "max-md:border-b",
            index > 0 && "md:pl-8",
            index < stats.length - 1 && "md:border-r",
          )}
        >
          <dt className="order-2 mt-3 text-[15px] font-medium">{stat.label}</dt>
          <dd className="order-1 font-display text-[44px] font-semibold leading-none tracking-[-0.04em] md:text-[64px]">
            {stat.value}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
