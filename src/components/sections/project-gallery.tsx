"use client";

import Image, { type StaticImageData } from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { ProjectPreview } from "./project-preview";

const FRAME = "h-[300px] overflow-hidden rounded-[24px] border border-foreground/10 bg-muted sm:h-[460px] lg:h-[640px]";

/** How long scrolling must pause before a loop jump (ms). */
const SETTLE_MS = 120;

/**
 * Screenshot gallery for a case study. With one screenshot it's a single frame;
 * without any it shows the generated preview.
 */
export function ProjectGallery({ project }: { project: Project }) {
  const shots = [project.image, ...(project.caseStudy.gallery ?? [])].filter((shot) => shot !== undefined);

  if (shots.length === 0) {
    return (
      <div className={FRAME}>
        <ProjectPreview project={project} layout="fill" bare priority className="rounded-none border-0" />
      </div>
    );
  }
  if (shots.length === 1) {
    return <Slide shot={shots[0]} alt={`${project.name} screenshot`} priority />;
  }
  return <LoopingCarousel shots={shots} name={project.name} />;
}

/**
 * An endless carousel on a native scroll-snap row, so it swipes on touch.
 *
 * How the loop works: the row is [copy of last, ...shots, copy of first].
 * Going "next" from the last shot slides forward onto the copy of the first,
 * and once scrolling settles we jump (instantly, invisibly) to the real first
 * shot. "Previous" from the first shot works the same way in reverse. So the
 * motion always goes in the direction you asked for.
 */
function LoopingCarousel({ shots, name }: { shots: StaticImageData[]; name: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [active, setActive] = useState(0);
  const count = shots.length;
  // Row positions: 0 = copy of the last shot, 1…count = real shots, count + 1 = copy of the first.
  const slides = [shots[count - 1], ...shots, shots[0]];

  const position = () => {
    const track = trackRef.current;
    return track ? Math.round(track.scrollLeft / track.clientWidth) : 1;
  };

  const scrollToPosition = (target: number, behavior: ScrollBehavior) => {
    const track = trackRef.current;
    track?.scrollTo({ left: target * track.clientWidth, behavior });
  };

  /** If we're resting on a copy, swap to the real slide it shows. Returns the real position. */
  const leaveCopy = () => {
    const current = position();
    const real = current === 0 ? count : current === count + 1 ? 1 : current;
    if (real !== current) scrollToPosition(real, "instant");
    return real;
  };

  // Start on the real first shot, before the first paint so the copy never flashes.
  useLayoutEffect(() => {
    scrollToPosition(1, "instant");
    return () => clearTimeout(settleTimer.current);
  }, []);

  const step = (delta: number) => scrollToPosition(leaveCopy() + delta, "smooth");
  const goTo = (index: number) => scrollToPosition(index + 1, "smooth");

  // Keep the dots in sync while scrolling, and loop once the row comes to rest.
  const onScroll = () => {
    setActive((position() - 1 + count) % count);
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(leaveCopy, SETTLE_MS);
  };

  return (
    <div>
      <div className="group relative" role="region" aria-roledescription="carousel" aria-label={`${name} screenshots`}>
        <div ref={trackRef} onScroll={onScroll} className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain">
          {slides.map((shot, position) => {
            const isCopy = position === 0 || position === count + 1;
            const index = (position - 1 + count) % count;
            return (
              <div
                key={isCopy ? `copy-${position}` : shot.src}
                role={isCopy ? undefined : "group"}
                aria-roledescription={isCopy ? undefined : "slide"}
                aria-label={isCopy ? undefined : `${index + 1} of ${count}`}
                aria-hidden={isCopy || undefined}
                className="w-full shrink-0 snap-center"
              >
                <Slide
                  shot={shot}
                  alt={isCopy ? "" : `${name} screenshot ${index + 1} of ${count}`}
                  priority={position === 1}
                />
              </div>
            );
          })}
        </div>

        <ArrowButton label="Previous screenshot" side="left" onClick={() => step(-1)} />
        <ArrowButton label="Next screenshot" side="right" onClick={() => step(1)} />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {shots.map((shot, index) => (
          <button
            key={shot.src}
            type="button"
            aria-label={`Go to screenshot ${index + 1}`}
            aria-current={index === active}
            onClick={() => goTo(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === active ? "w-8 bg-signal" : "w-2 bg-foreground/15 hover:bg-foreground/30",
            )}
          />
        ))}
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          {active + 1} / {count}
        </span>
      </div>
    </div>
  );
}

function Slide({ shot, alt, priority }: { shot: StaticImageData; alt: string; priority?: boolean }) {
  return (
    <div className={cn(FRAME, "relative")}>
      <Image
        src={shot}
        alt={alt}
        fill
        sizes="(min-width: 1360px) 1300px, 100vw"
        placeholder="blur"
        priority={priority}
        className="object-cover object-left-top"
      />
    </div>
  );
}

function ArrowButton({ label, side, onClick }: { label: string; side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-foreground text-background opacity-0 shadow-lg transition-all hover:bg-foreground/85 focus-visible:opacity-100 group-hover:opacity-100",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon aria-hidden className="size-5" />
    </button>
  );
}
