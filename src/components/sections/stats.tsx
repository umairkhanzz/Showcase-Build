import type { Stat } from "@/content/types";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

type StatsProps = {
  stats: Stat[];
  className?: string;
};

/** Full-width row of big numbers separated by hairlines (parish style). */
export function Stats({ stats, className }: StatsProps) {
  return (
    <section aria-label="At a glance" className={cn("border-y border-foreground/10", className)}>
      <dl className="mx-auto grid w-full max-w-[1360px] grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 90}
            className={cn(
              "flex flex-col-reverse justify-end gap-3 border-foreground/10 px-5 py-9 md:px-8 md:py-12",
              index % 2 === 0 && "border-r",
              index < 2 && "max-md:border-b",
              "md:border-r md:last:border-r-0",
            )}
          >
            <dt className="max-w-[16rem] text-sm leading-snug text-muted-foreground">{stat.label}</dt>
            <dd className="font-display text-5xl font-semibold tracking-[-0.04em] md:text-6xl">{stat.value}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
