"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { AutoplayProgress } from "@/components/ui/autoplay-progress";
import { cn } from "@/lib/cn";
import { ProjectPreview } from "./project-preview";

const AUTOPLAY_MS = 6000;

/** Position of a card based on how far behind the front card it sits. */
const DEPTH_STYLES = [
  { transform: "rotate(-2deg)", filter: "brightness(1)" },
  { transform: "translate(34px, -26px) scale(0.94) rotate(2.5deg)", filter: "brightness(0.88)" },
  { transform: "translate(64px, -50px) scale(0.88) rotate(6deg)", filter: "brightness(0.76)" },
  { transform: "translate(90px, -70px) scale(0.82) rotate(9.5deg)", filter: "brightness(0.64)" },
];

/**
 * A fanned stack of project previews. The front card rotates through the
 * projects automatically (pausing on hover). Clicking the front card shows the
 * next project; clicking a card behind it or a tab jumps to that project.
 */
export function HeroShowcase({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const current = projects[selected];
  const next = () => setSelected((index) => (index + 1) % projects.length);

  return (
    <div className="group/autoplay">
      <div className="relative mr-[90px] mt-[70px] max-md:mr-12 max-md:mt-10">
        {projects.map((project, index) => {
          const depth = (index - selected + projects.length) % projects.length;
          const style = DEPTH_STYLES[Math.min(depth, DEPTH_STYLES.length - 1)];
          return (
            <button
              key={project.slug}
              type="button"
              aria-label={depth === 0 ? "Show next project" : `Show ${project.name}`}
              // The front card moves on to the next project; a card behind it jumps straight to that one.
              onClick={depth === 0 ? next : () => setSelected(index)}
              className={cn(
                "block w-full origin-bottom-left cursor-pointer text-left transition-[transform,filter] duration-700 ease-snap",
                depth === 0 ? "relative" : "absolute inset-0",
              )}
              style={{ ...style, zIndex: projects.length - depth }}
            >
              <ProjectPreview
                project={project}
                priority={index === 0}
                className="shadow-[0_20px_60px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              />
            </button>
          );
        })}
      </div>

      <div key={current.slug} className="mt-8 flex animate-fade-in items-start justify-between gap-4">
        <p className="text-[15px] text-muted-foreground">
          <span className="font-medium text-foreground">{current.name}.</span> {current.tagline}
        </p>
        <Link
          href={`/work/${current.slug}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-foreground/15 px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
        >
          Case study <ArrowUpRight aria-hidden className="size-3.5" />
        </Link>
      </div>

      <div role="tablist" aria-label="Featured projects" className="mt-5 flex flex-wrap gap-1.5">
        {projects.map((project, index) => {
          const active = index === selected;
          return (
            <button
              key={project.slug}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(index)}
              className={cn(
                "relative overflow-hidden rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {project.name}
              {active && <AutoplayProgress key={selected} durationMs={AUTOPLAY_MS} onDone={next} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
