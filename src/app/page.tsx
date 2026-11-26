import type { Metadata } from "next";
import { pageSeo } from "@/content/seo";
import { pageMetadata } from "@/lib/metadata";
import { heroStats, techStack } from "@/content/site";
import { projects } from "@/content/projects";
import { plans } from "@/content/pricing";
import { goals, services } from "@/content/services";
import { allServices } from "@/content/service-pages";
import { processSteps, testimonials } from "@/content/process";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { WorkSlider } from "@/components/sections/work-slider";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { ServicesGrid } from "@/components/sections/services-grid";
import { GoalPicker } from "@/components/sections/goal-picker";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = pageMetadata({ ...pageSeo.home, path: "/", absoluteTitle: true });

const projectsBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));
/** How many projects the home page slider shows; the last card links to all of them. */
const HOME_PROJECT_COUNT = 4;
const popularServices =services.filter((service) => service.popular);

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats stats={heroStats} />
      <TechMarquee items={techStack} />
      <WorkSlider projects={projects.slice(0, HOME_PROJECT_COUNT)} totalCount={projects.length} />
      <PricingPlans plans={plans} />
      <ServicesGrid services={popularServices} totalCount={allServices.length} />
      <GoalPicker goals={goals} projects={projectsBySlug} />
      <ProcessSteps steps={processSteps} />
      <Testimonials items={testimonials} />
      <CtaSection />
    </>
  );
}
