"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/content/types";
import { Container } from "@/components/ui/container";
import { AutoplayProgress } from "@/components/ui/autoplay-progress";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 7000;

/** One big quote at a time; the author tabs below switch it and autoplay. */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const next = () => setActive((index) => (index + 1) % items.length);
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // On narrow screens the tabs are a horizontal scroller: keep the active one
  // centred. Scrolls only the tab row, never the page.
  useEffect(() => {
    const list = tablistRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <section aria-label="What clients say" className="group/autoplay border-t border-foreground/10">
      <Container className="py-20 md:py-32">
        {/* Every quote sits in the same grid cell so the block keeps the height
            of the longest one and the tabs below never jump. */}
        <figure className="mx-auto grid max-w-5xl text-center">
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <div
                key={item.quote}
                aria-hidden={!selected}
                className={cn("col-start-1 row-start-1 flex items-center justify-center", !selected && "invisible")}
              >
                <blockquote
                  key={selected ? active : undefined}
                  className={cn(
                    "text-balance font-display text-[26px] font-medium leading-[1.12] tracking-[-0.03em] sm:text-[32px] md:text-[56px] md:leading-[1.08]",
                    selected && "animate-fade-in",
                  )}
                >
                  “{item.quote}”
                </blockquote>
              </div>
            );
          })}
          <figcaption className="sr-only">
            {items[active].author}, {items[active].role}
          </figcaption>
        </figure>

        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Choose a testimonial"
          className={cn(
            "scrollbar-none -mx-5 mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 scroll-px-5 md:mx-0 md:mt-12 md:flex-wrap md:justify-center md:overflow-visible md:px-0",
            // Soft fade at the edges hints that the row scrolls on mobile.
            "mask-[linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)]",
          )}
        >
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.quote}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(index)}
                className={cn(
                  "relative shrink-0 snap-center overflow-hidden whitespace-nowrap rounded-full border px-4 py-2 text-left text-sm transition-colors",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/10 text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="font-medium">{item.author}</span>
                <span className={cn("ml-1.5", selected ? "opacity-70" : "opacity-60")}>{item.role}</span>
                {selected && <AutoplayProgress key={active} durationMs={AUTOPLAY_MS} onDone={next} />}
              </button>
            );
          })}
        </div>

        {/* Dot indicator for small screens, where some tabs are off-screen. */}
        <div aria-hidden className="mt-5 flex justify-center gap-1.5 md:hidden">
          {items.map((item, index) => (
            <span
              key={item.quote}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === active ? "w-5 bg-foreground" : "w-1.5 bg-foreground/20",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
