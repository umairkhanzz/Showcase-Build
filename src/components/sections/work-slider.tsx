"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/cn";
import { ProjectSlide } from "./project-slide";
import { Marker } from "@/components/ui/marker";

const PINNED_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * "Shipped, not mocked up." On tablet/desktop the section pins to the viewport
 * and vertical scrolling slides the cards sideways; after the last card the
 * page scrolls on normally. On phones it's a swipeable scroll-snap row.
 *
 * How it works: the section gets a height of (track overflow + one viewport)
 * and its sticky child stays pinned for that extra distance. Scroll progress
 * through the section maps to a translateX on the track, written to the DOM
 * in a requestAnimationFrame so scrolling never re-renders React.
 */
export function WorkSlider({ projects, totalCount }: { projects: Project[]; totalCount: number }) {
  const pinned = useMediaQuery(PINNED_QUERY);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let distance = 0;
    let frame = 0;

    /** Slide the track sideways by how far the page has scrolled through the pinned section. */
    const update = () => {
      frame = 0;
      const pinnedDistance = section.offsetHeight - window.innerHeight;
      const progress = pinnedDistance > 0 ? clamp01(-section.getBoundingClientRect().top / pinnedDistance) : 0;
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    /** Make the section tall enough to scroll through the whole track while pinned. */
    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${distance + window.innerHeight}px`;
      requestUpdate();
    };

    // Phones / reduced motion: a plain swipeable row, so undo any pinned styles.
    if (!pinned) {
      section.style.height = "";
      track.style.transform = "";
      return;
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", requestUpdate);
      cancelAnimationFrame(frame);
    };
  }, [pinned]);

  return (
    <section ref={sectionRef} id="work" aria-label="Selected work" className="relative">
      <div className={cn(pinned ? "sticky top-0 flex h-dvh flex-col justify-center overflow-hidden" : "py-20")}>
        {/* Heading for phones (on desktop it lives inside the track) */}
        <div className="mb-8 px-5 md:hidden">
          <h2 className="font-display text-[44px] font-semibold leading-[0.95] tracking-[-0.035em]">
            Shipped, not <Marker>mocked up</Marker>.
          </h2>
        </div>

        <div
          ref={trackRef}
          className={cn(
            "flex gap-4 will-change-transform md:gap-6",
            pinned
              ? "w-max items-center px-[max(2rem,calc((100vw-1360px)/2+2rem))] pt-[72px]"
              : "scrollbar-none snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-5",
          )}
        >
          <div className="hidden shrink-0 md:flex md:w-[400px] md:flex-col md:justify-center md:pr-6">
            <h2 className="font-display text-[64px] font-semibold leading-[0.95] tracking-[-0.035em]">
              Shipped, not <Marker>mocked up</Marker>.
            </h2>
            <p className="mt-5 max-w-[34ch] text-[17px] leading-relaxed text-muted-foreground">
              Products I designed, built and run myself, plus client work that&apos;s live and earning.
            </p>
            <p className="mt-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Keep scrolling <ArrowRight aria-hidden className="size-3.5" />
            </p>
          </div>

          {projects.map((project) => (
            <ProjectSlide key={project.slug} project={project} />
          ))}

          <Link
            href="/work"
            className="group flex w-[70vw] shrink-0 snap-start flex-col justify-between self-stretch rounded-[28px] bg-signal p-8 text-signal-foreground transition-transform active:scale-[0.99] md:h-[min(640px,74dvh)] md:w-[340px] md:self-auto md:p-10"
          >
            <span className="font-display text-[40px] font-semibold leading-[0.95] tracking-[-0.03em] md:text-[52px]">
              All {totalCount} projects
            </span>
            <span className="mt-10 grid size-14 place-items-center rounded-full bg-signal-foreground text-signal transition-transform duration-500 ease-snap group-hover:translate-x-1 group-hover:-rotate-45">
              <ArrowRight aria-hidden className="size-6" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
