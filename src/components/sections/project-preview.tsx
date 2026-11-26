import Image from "next/image";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

type ProjectPreviewProps = {
  project: Project;
  className?: string;
  priority?: boolean;
  /** "aspect" keeps a 16:10 screen; "fill" stretches to the parent's height. */
  layout?: "aspect" | "fill";
  /** Hide the fake browser bar (e.g. for small thumbnails). */
  bare?: boolean;
};

/**
 * Browser-window mockup for a project. Shows `project.image` when provided,
 * otherwise a generated placeholder built from the project's palette.
 */
export function ProjectPreview({ project, className, priority, layout = "aspect", bare }: ProjectPreviewProps) {
  const [from, to] = project.palette;

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-[18px] border border-foreground/10 bg-card",
        layout === "fill" && "h-full",
        className,
      )}
    >
      {!bare && (
        <div className="flex shrink-0 items-center gap-2 border-b border-foreground/10 px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
          </span>
          <span className="mx-auto font-mono text-[11px] text-muted-foreground">{project.domain}</span>
          <span className="w-[42px]" aria-hidden />
        </div>
      )}

      <div className={cn("relative", layout === "aspect" ? "aspect-[16/10]" : "min-h-56 flex-1")}>
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholder="blur"
            className="object-cover object-top"
            priority={priority}
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 flex flex-col justify-between p-[6%]"
            style={{ background: `radial-gradient(120% 120% at 0% 0%, ${from}, ${to})` }}
          >
            <div className="flex items-center justify-between">
              <span className="h-2 w-16 rounded-full bg-white/70" />
              <span className="flex gap-2">
                <span className="h-2 w-8 rounded-full bg-white/40" />
                <span className="h-2 w-8 rounded-full bg-white/40" />
                <span className="h-2 w-8 rounded-full bg-white/40" />
              </span>
            </div>
            <div>
              <p className="font-display text-[clamp(1.25rem,3.4vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                {project.name}
              </p>
              <p className="mt-2 max-w-[70%] text-[clamp(0.6rem,1.2vw,0.9rem)] text-white/80">{project.tagline}</p>
              <span className="mt-4 inline-block h-5 w-20 rounded-full bg-white/90" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="h-10 rounded-lg bg-white/15" />
              <span className="h-10 rounded-lg bg-white/15" />
              <span className="h-10 rounded-lg bg-white/15" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
