import type { Metadata } from "next";
import { pageSeo } from "@/content/seo";
import { pageMetadata } from "@/lib/metadata";
import { clientProjects, productProjects } from "@/content/projects";
import { workStats } from "@/content/site";
import { PageHeader } from "@/components/sections/page-header";
import { StatGrid } from "@/components/sections/stat-grid";
import { ProjectGridCard } from "@/components/sections/project-grid-card";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Marker } from "@/components/ui/marker";

export const metadata: Metadata = pageMetadata({ ...pageSeo.work, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <PageHeader
        crumb="Work"
        path="/work"
        title={
          <>
            Products I <Marker>built</Marker> and shipped.
          </>
        }
        description="SaaS and AI products I built and run myself, plus client work that's live and earning. Every project here is a real, shipped product."
      />

      <Container className="pb-16 md:pb-24">
        <StatGrid stats={workStats} />
      </Container>

      {/* Products: two columns, with the right-hand column dropped down for a staggered look */}
      <Container as="section" aria-labelledby="products" className="pb-16 md:pb-28">
        <h2 id="products" className="sr-only">
          Products I built myself
        </h2>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20 md:[&>*:nth-child(even)]:mt-32">
          {productProjects.map((project) => (
            <Reveal key={project.slug}>
              <ProjectGridCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>

      {clientProjects.length > 0 && (
        <Container as="section" className="pb-16 md:pb-28">
          <div className="rounded-[32px] bg-muted/60 p-6 md:p-12">
            <Reveal className="mb-10 max-w-3xl md:mb-12">
              <h2 className="text-balance font-display text-[30px] font-semibold leading-none tracking-[-0.03em] md:text-[40px]">
                Client work
              </h2>
              <p className="mt-5 max-w-[56ch] text-pretty text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
                Built for founders and teams. Shown for the scale and kind of work I do.
              </p>
            </Reveal>
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
              {clientProjects.map((project, index) => (
                <Reveal key={project.slug} delay={(index % 2) * 100}>
                  <ProjectGridCard project={project} size="sm" />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      )}

      <CtaSection
        title={
          <>
            Your project could be <Marker>next</Marker>.
          </>
        }
        description="Tell me what you're building. I'll reply with a clear scope and a fixed quote."
      />
    </>
  );
}
