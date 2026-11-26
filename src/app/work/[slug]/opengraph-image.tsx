import { getProject, projects } from "@/content/projects";
import { OG_SIZE, renderOgCard } from "@/lib/og";

/** Share card for each case study: project name, headline and tagline. */
export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgCard({
    eyebrow: project ? `Case study · ${project.name}` : "Case study",
    title: project?.caseStudy.headline ?? "Case study",
    subtitle: project?.tagline,
  });
}
