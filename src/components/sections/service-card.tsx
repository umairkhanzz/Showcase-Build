import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/types";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";

/** Text colours that flip to the inverted fill while the card is hovered. */
const mutedText = "text-muted-foreground transition-colors duration-500 group-hover:text-background/65";

export function ServiceCard({ service }: { service: Service }) {
  const href = `/services/${service.slug}`;
  return (
    <article
      id={service.slug}
      className="group relative isolate flex w-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card p-6 transition-[border-color,transform] duration-500 ease-snap hover:-translate-y-1 hover:border-foreground md:p-7"
    >
      {/* Hover fill: rises from the bottom in the foreground colour (black in light mode, white in dark). */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 translate-y-full rounded-t-[45%] bg-foreground transition-[translate,border-radius] duration-700 ease-snap group-hover:translate-y-0 group-hover:rounded-none motion-reduce:transition-none"
      />

      <div className="flex items-center justify-between">
        <span className={`text-sm ${mutedText}`}>{service.category}</span>
        {service.popular ? (
          <Tag tone="signal">Popular</Tag>
        ) : (
          service.quoted && (
            <Tag className="transition-colors duration-500 group-hover:border-background/15 group-hover:bg-background/10 group-hover:text-background/80">
              Custom build
            </Tag>
          )
        )}
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] transition-colors duration-500 group-hover:text-background">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-3xl">
          {service.title}
        </Link>
      </h3>
      <p className={`mt-3 line-clamp-3 text-sm leading-relaxed ${mutedText}`}>{service.description}</p>
      <p className={`mt-5 text-xs ${mutedText}`}>Works with {service.worksWith.join(", ")}</p>

      <div className="mt-auto flex items-end justify-between pt-10">
        <div>
          <p className={`text-xs ${mutedText}`}>{service.quoted ? "Typical timeline" : "Delivery"}</p>
          <p className="font-display text-xl font-semibold tracking-[-0.02em] transition-colors duration-500 group-hover:text-background">
            {service.delivery}
          </p>
        </div>
        <span
          aria-hidden
          className="grid size-11 place-items-center rounded-full bg-muted text-foreground transition-all duration-500 ease-snap group-hover:-rotate-45 group-hover:bg-signal group-hover:text-signal-foreground"
        >
          <ArrowUpRight className="size-4 rotate-45" />
        </span>
      </div>
    </article>
  );
}
