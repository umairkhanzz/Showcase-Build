import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { getNextProject, getProject, projects } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MagneticIcon } from "@/components/ui/magnetic-icon";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { ProjectPreview } from "@/components/sections/project-preview";
import { StatGrid } from "@/components/sections/stat-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { DetailSkeleton } from "@/components/ui/detail-skeleton";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { caseStudyLd } from "@/lib/structured-data";
import { servicePageHref } from "@/content/service-pages";
import { JsonLd } from "@/components/seo/json-ld";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name}: ${project.caseStudy.headline}`,
    description: project.summary,
    path: `/work/${project.slug}`,
    keywords: [project.name, ...project.stack, ...(project.caseStudy.serviceType ? [project.caseStudy.serviceType] : [])],
    type: "article",
    ownImage: true,
  });
}

/**
 * `params` is URL data, so it's read inside <Suspense>: the page shell renders
 * instantly on navigation and the content streams in (prerendered for known slugs).
 */
export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <>
      <Suspense fallback={<DetailSkeleton />}>
        <CaseStudy params={params} />
      </Suspense>
      <CtaSection
        title="Want results like these?"
        description="Tell me what you're building. I'll reply with a clear scope and a fixed quote."
      />
    </>
  );
}

/** Shared heading style for the case study's smaller section titles. */
const SECTION_TITLE = "text-balance font-display text-[30px] font-semibold leading-none tracking-[-0.03em] md:text-[40px]";

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { caseStudy } = project;
  const [lead, ...rest] = caseStudy.story;

  return (
    <article>
      <JsonLd data={caseStudyLd(project)} />
      {/* Intro */}
      <Container as="header" className="pb-10 pt-28 md:pb-14 md:pt-36">
        <Reveal>
          <Breadcrumbs items={[{ label: "Work", href: "/work" }, { label: project.name }]} path={`/work/${project.slug}`} />
        </Reveal>
        <Reveal
          as="h1"
          delay={80}
          className="max-w-5xl text-balance font-display text-[48px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[64px] md:text-[clamp(4rem,7.2vw,7rem)]"
        >
          {caseStudy.headline}
        </Reveal>
        <Reveal as="p" delay={160} className="mt-7 max-w-[52ch] text-pretty text-lg leading-[1.55] text-muted-foreground md:text-xl">
          {project.summary}
        </Reveal>
        <Reveal delay={240} className="mt-9">
          <MagneticButton href={project.url} external icon={ArrowUpRight}>
            Visit {project.domain}
          </MagneticButton>
        </Reveal>
      </Container>

      {/* Role / year / hosting */}
      <Container className="pb-8 md:pb-10">
        <Reveal
          as="dl"
          className="grid gap-px overflow-hidden rounded-[22px] border border-foreground/10 bg-foreground/10 sm:grid-cols-3"
        >
          {[
            ["Role", project.role],
            ["Year", project.year],
            ["Hosting", caseStudy.hosting],
          ].map(([term, detail]) => (
            <div key={term} className="bg-background p-5 md:p-6">
              <dt className="text-[13px] font-medium text-muted-foreground">{term}</dt>
              <dd className="mt-1.5 text-[15px] leading-snug">{detail}</dd>
            </div>
          ))}
        </Reveal>
      </Container>

      <Container>
        <Reveal>
          <ProjectGallery project={project} />
        </Reveal>
      </Container>

      {/* Results */}
      <Container className="pt-12 md:pt-16">
        <StatGrid stats={project.stats} />
      </Container>

      {/* The story */}
      <Container as="section" className="py-16 md:py-28">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-16">
          <Reveal as="h2" className={SECTION_TITLE}>
            The story
          </Reveal>
          <Reveal delay={100} className="space-y-6">
            <p className="text-xl md:text-[22px]">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph} className="text-[17px] text-muted-foreground md:text-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Container>

      {/* What the build involved */}
      <Container as="section" className="pb-16 md:pb-28">
        <Reveal className="rounded-[32px] bg-muted/60 p-6 md:p-12">
          <h2 className={cn(SECTION_TITLE, "mb-8 md:mb-10")}>What the build involved</h2>
          <ol className="grid gap-x-10 gap-y-7 md:grid-cols-2">
            {caseStudy.buildSteps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-[13px] font-semibold text-background">
                  {index + 1}
                </span>
                <p className="pt-1 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>

      {/* Hard parts */}
      <section className="border-t border-foreground/10 py-16 md:py-28">
        <Container>
          <Reveal
            as="h2"
            className="mb-10 max-w-3xl text-balance font-display text-[40px] font-semibold leading-[0.95] tracking-[-0.04em] md:mb-14 md:text-[64px]"
          >
            Hard parts, and how I solved them
          </Reveal>
          <div className="space-y-3">
            {caseStudy.challenges.map((challenge, index) => (
              <Reveal
                key={challenge.problem}
                delay={index * 80}
                className="grid overflow-hidden rounded-[24px] border border-foreground/10 md:grid-cols-2"
              >
                <div className="p-7 md:p-9">
                  <p className="text-sm font-medium text-muted-foreground">The problem</p>
                  <p className="mt-3 text-[17px] leading-relaxed">{challenge.problem}</p>
                </div>
                <div className="bg-muted/60 p-7 md:p-9">
                  <p className="inline-flex rounded-full bg-signal px-2.5 py-0.5 text-[13px] font-medium text-signal-foreground">
                    What I did
                  </p>
                  <p className="mt-3 text-[17px] leading-relaxed">{challenge.solution}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Built with */}
      <Container as="section" className="pb-16 md:pb-24">
        <Reveal>
          <p className="mb-4 text-[15px] font-medium text-muted-foreground">Built with</p>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full border border-foreground/10 px-4 py-2 text-sm font-medium">
                {tech}
              </li>
            ))}
          </ul>
          {caseStudy.serviceType && (
            <p className="mt-14 flex flex-wrap items-center gap-2 text-[15px] text-muted-foreground">
              This is a
              <MagneticButton href={servicePageHref(caseStudy.serviceType)} variant="secondary" size="sm" icon={ArrowUpRight}>
                {caseStudy.serviceType}
              </MagneticButton>
              project.
            </p>
          )}
        </Reveal>
      </Container>

      <NextProject project={getNextProject(project.slug)} />
    </article>
  );
}

function NextProject({ project }: { project: Project }) {
  return (
    <Container as="section" className="pb-16 md:pb-20">
      <Reveal>
        <Link
          href={`/work/${project.slug}`}
          className="group grid items-center gap-6 overflow-hidden rounded-[32px] border border-foreground/10 p-6 transition-colors hover:border-foreground/30 md:grid-cols-[1fr_minmax(0,0.9fr)] md:p-10"
        >
          <div>
            <p className="text-[15px] font-medium text-muted-foreground">Next project</p>
            <p className="mt-3 font-display text-[44px] font-semibold leading-[0.95] tracking-[-0.04em] md:text-[72px]">
              {project.name}
            </p>
            <p className="mt-3 max-w-[40ch] text-[17px] text-muted-foreground">{project.tagline}</p>
            <MagneticIcon className="mt-7" />
          </div>
          <div className="overflow-hidden rounded-[20px]">
            <ProjectPreview
              project={project}
              bare
              className="rounded-[20px] transition-transform duration-700 ease-snap group-hover:scale-[1.03]"
            />
          </div>
        </Link>
      </Reveal>
    </Container>
  );
}
