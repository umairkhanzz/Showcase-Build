import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { getServicePage, servicePages } from "@/content/service-pages";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { DetailSkeleton } from "@/components/ui/detail-skeleton";
import { ProjectGridCard } from "@/components/sections/project-grid-card";
import { FaqList } from "@/components/sections/faq-list";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { serviceLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return pageMetadata({
    title: isQuick(page.slug) ? page.title : `${page.title} Services`,
    description: page.intro,
    path: `/services/${page.slug}`,
    keywords: [page.title, `${page.title} services`, `${page.title} developer`, ...page.stack],
  });
}

/** Same pattern as /work/[slug]: `params` is read inside <Suspense> so the shell renders instantly. */
export default function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  return (
    <>
      <Suspense fallback={<DetailSkeleton />}>
        <ServiceDetail params={params} />
      </Suspense>
      <CtaSection
        title="Let's talk about your project."
        description="Tell me what you're building. I'll reply within one business day with a clear scope and next steps."
      />
    </>
  );
}

/** Quick services are small fixed-scope jobs; everything else is a custom build. */
const isQuick = (slug: string) => services.some((service) => service.slug === slug);

const SECTION_TITLE = "text-balance font-display text-[30px] font-semibold leading-none tracking-[-0.03em] md:text-[40px]";

async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const proof = projects.filter((project) => project.caseStudy.serviceType === page.title);
  const related = servicePages.filter((p) => p.group === page.group && p.slug !== page.slug);
  const path = `/services/${page.slug}`;
  const quick = isQuick(page.slug);

  return (
    <article>
      <JsonLd data={serviceLd(page)} />

      {/* Intro */}
      <Container as="header" className="pb-14 pt-28 md:pb-20 md:pt-36">
        <Reveal>
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: page.title }]} path={path} />
        </Reveal>
        <Reveal delay={40} as="p" className="mb-3 text-sm font-medium text-signal-text">
          {page.group}
        </Reveal>
        <Reveal
          delay={80}
          as="h1"
          className="max-w-5xl text-balance font-display text-[48px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[64px] md:text-[clamp(4rem,7.2vw,7rem)]"
        >
          {page.title}
        </Reveal>
        <Reveal delay={120} as="p" className="mt-6 max-w-3xl text-balance font-display text-2xl font-medium tracking-[-0.02em] md:text-3xl">
          {page.headline}
        </Reveal>
        <Reveal delay={160} as="p" className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {page.intro}
        </Reveal>
        <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-3">
          <MagneticButton href={site.contactUrl}>Start a project</MagneticButton>
          <MagneticButton href="/pricing#plans" variant="secondary">
            See monthly plans
          </MagneticButton>
        </Reveal>
        <Reveal delay={280} as="p" className="mt-8 text-[15px] text-muted-foreground">
          {quick ? "Delivery" : "Typical timeline"}:{" "}
          <span className="font-medium text-foreground">{page.timeline}</span>
          {!quick && " · quoted per project"}
        </Reveal>
        {proof.length > 0 && (
          <Reveal delay={300} as="p" className="mt-3 flex flex-wrap items-center gap-2 text-[15px] text-muted-foreground">
            Done before:
            {proof.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
              >
                {project.name}
                <ArrowUpRight aria-hidden className="size-3.5" />
              </Link>
            ))}
          </Reveal>
        )}
      </Container>

      {/* What it involves */}
      <section className="border-t border-foreground/10">
        <Container className="grid gap-8 py-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-16 md:py-24">
          <Reveal as="h2" className={SECTION_TITLE}>
            {quick ? "What this involves" : `What ${page.title} involves`}
          </Reveal>
          <Reveal delay={80} className="space-y-5 text-[17px] leading-relaxed text-muted-foreground">
            {page.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* What you get */}
      <section className="border-t border-foreground/10">
        <Container className="py-16 md:py-24">
          <Reveal as="h2" className={`${SECTION_TITLE} mb-10 md:mb-14`}>
            What you actually get
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {page.benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 80} className="rounded-3xl border border-foreground/10 bg-card p-7">
                <p className="font-display text-sm font-semibold text-muted-foreground">0{index + 1}</p>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.03em]">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{benefit.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Fit + included */}
      <section className="border-t border-foreground/10">
        <Container className="grid gap-4 py-16 md:grid-cols-2 md:py-24">
          <Reveal className="rounded-[28px] border border-foreground/10 p-7 md:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">A good fit if</h2>
            <ul className="mt-6 space-y-4">
              {page.goodFit.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <div data-surface="signal" className="h-full rounded-[28px] bg-signal p-7 text-signal-foreground md:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">What&apos;s included</h2>
            <ul className="mt-6 space-y-4">
              {page.included.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <Check aria-hidden className="mt-1 size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it runs */}
      <section className="border-t border-foreground/10">
        <Container className="py-16 md:py-24">
          <Reveal as="h2" className={SECTION_TITLE}>
            How it runs
          </Reveal>
          <Reveal delay={40} as="p" className="mt-4 max-w-xl text-muted-foreground">
            No surprises and no black box. You see progress on a live link from the first week.
          </Reveal>
          <ol className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
            {page.steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 80} className="border-t border-foreground/15 pt-6">
                <span className="grid size-9 place-items-center rounded-full bg-foreground text-sm font-semibold text-background">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-16">
            <p className="mb-4 text-[15px] font-medium text-muted-foreground">Typically built with</p>
            <ul className="flex flex-wrap gap-2">
              {page.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-foreground/10 px-4 py-2 text-sm font-medium">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Proof */}
      {proof.length > 0 && (
        <section className="border-t border-foreground/10">
          <Container className="py-16 md:py-24">
            <div className="mb-10 flex items-end justify-between gap-6">
              <Reveal as="h2" className={SECTION_TITLE}>
                Proof, not promises
              </Reveal>
              <Link href="/work" className="shrink-0 text-[15px] font-medium underline-offset-4 hover:underline">
                All work
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {proof.map((project) => (
                <Reveal key={project.slug}>
                  <ProjectGridCard project={project} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <FaqList faqs={page.faqs} title={quick ? "Questions about this service" : `${page.title} FAQ`} layout="split" />

      {/* Related */}
      {related.length > 0 && (
        <Container as="section" className="border-t border-foreground/10 pt-16 md:pt-24">
          <Reveal as="h2" className={SECTION_TITLE}>
            More in {page.group}
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Reveal key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex h-full items-start justify-between gap-4 rounded-3xl border border-foreground/10 p-6 transition-colors hover:border-foreground/30"
                >
                  <span>
                    <span className="block font-display text-xl font-semibold tracking-[-0.02em]">{item.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{item.headline}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 transition-transform duration-500 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
