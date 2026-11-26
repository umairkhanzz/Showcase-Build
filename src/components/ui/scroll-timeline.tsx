"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Vertical timeline whose lime line fills as you scroll through it. Each child
 * <li> marked with `data-step` gets `data-active` once the line reaches it,
 * so steps can style their dot with `group-data-[active]:…`.
 *
 * DOM writes happen in requestAnimationFrame; scrolling never re-renders React.
 */
export function ScrollTimeline({ children, className }: { children: ReactNode; className?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      // The "pen" sits 60% down the viewport; progress is how far it has travelled through the list.
      const pen = window.innerHeight * 0.6;
      const progress = Math.min(1, Math.max(0, (pen - rect.top) / rect.height));
      fill.style.transform = `scaleY(${progress})`;

      const reached = progress * rect.height;
      list.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
        step.toggleAttribute("data-active", step.offsetTop <= reached);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={listRef} className={className ?? "relative"}>
      <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-[2px] bg-foreground/10" />
      <span
        ref={fillRef}
        aria-hidden
        className="absolute bottom-3 left-[11px] top-3 w-[2px] origin-top bg-signal"
        style={{ transform: "scaleY(0)" }}
      />
      {children}
    </ol>
  );
}

/** A single step on the ScrollTimeline. */
export function TimelineStep({ children, last }: { children: ReactNode; last?: boolean }) {
  return (
    <li data-step className={last ? "group relative pl-14" : "group relative pb-14 pl-14 md:pb-20"}>
      <span
        aria-hidden
        className="absolute left-0 top-1 flex size-6 items-center justify-center rounded-full border-2 border-foreground/20 bg-background transition-colors duration-500 group-data-[active]:border-foreground group-data-[active]:bg-signal dark:group-data-[active]:border-signal dark:group-data-[active]:bg-background"
      >
        <span className="size-2 rounded-full bg-foreground/30 transition-colors duration-500 group-data-[active]:bg-foreground" />
      </span>
      {children}
    </li>
  );
}
