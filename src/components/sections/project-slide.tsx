import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Tag } from "@/components/ui/tag";
import { ProjectPreview } from "./project-preview";

/** One wide card in the horizontal work slider (parish layout). */
export function ProjectSlide({ project }: { project: Project }) {
  return (
    <article
      className="grid w-[86vw] shrink-0 snap-center grid-rows-[auto_1fr] gap-6 rounded-[28px] border border-foreground/10 bg-card p-4 md:h-[min(640px,74dvh)] md:w-[min(1000px,72vw)] md:grid-cols-[1.35fr_1fr] md:grid-rows-1 md:gap-10 md:p-6"
    >
      <ProjectPreview project={project} layout="fill" className="max-md:aspect-[16/11]" />

      <div className="flex min-h-0 flex-col px-2 pb-2 md:px-0 md:py-4 md:pr-4">
        <p className="font-mono text-xs text-muted-foreground">
          {project.year} · {project.role}
        </p>
        <h3 className="mt-3 font-display text-[34px] font-semibold leading-none tracking-[-0.03em] md:text-[52px]">
          {project.name}
        </h3>
        <p className="mt-3 text-base leading-snug text-muted-foreground md:text-lg">{project.tagline}</p>

        <dl className="mt-7 grid grid-cols-3 gap-4">
          {project.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end gap-1.5">
              <dt className="text-[12.5px] leading-snug text-muted-foreground">{stat.label}</dt>
              <dd className="font-display text-[22px] font-semibold leading-none tracking-[-0.02em] md:text-[30px]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-5 pt-8">
          <MagneticButton href={`/work/${project.slug}`} size="sm">
            Case study
          </MagneticButton>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            {project.domain} <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
