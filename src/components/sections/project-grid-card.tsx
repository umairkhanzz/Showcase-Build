import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { ProjectPreview } from "./project-preview";

type ProjectGridCardProps = {
  project: Project;
  /** "lg" for the main product grid, "sm" for the denser client-work panel. */
  size?: "lg" | "sm";
};

/**
 * Work-page card (parish layout): a borderless screenshot that zooms on hover
 * and reveals a lime arrow, then name and year, tagline and inline stats.
 */
export function ProjectGridCard({ project, size = "lg" }: ProjectGridCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-[22px] border border-foreground/10 bg-muted">
        <div className="aspect-[16/10.5] transition-transform duration-700 ease-snap group-hover:scale-[1.035]">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              placeholder="blur"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="size-full object-cover object-left-top"
            />
          ) : (
            <ProjectPreview project={project} layout="fill" bare className="rounded-none border-0" />
          )}
        </div>
        <span
          aria-hidden
          className="absolute bottom-4 right-4 grid size-11 translate-y-2 place-items-center rounded-full bg-signal text-signal-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>

      <div className="px-1 pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={cn(
              "font-display font-semibold leading-none tracking-[-0.03em]",
              size === "lg" ? "text-[32px] md:text-[40px]" : "text-[26px]",
            )}
          >
            {project.name}
          </h3>
          <span className="shrink-0 text-[13px] text-muted-foreground">{project.year}</span>
        </div>
        <p className="mt-2 text-balance leading-snug text-muted-foreground">{project.tagline}</p>
        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {project.stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-1.5">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-semibold">{stat.value}</dd>
              <dd aria-hidden className="text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
}
