import type { Metadata } from "next";
import { pageSeo } from "@/content/seo";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { site } from "@/content/site";
import { about, aboutStats, experience, principles, socialProfiles, stackGroups } from "@/content/about";
import { testimonials } from "@/content/process";
import { Stats } from "@/components/sections/stats";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { ScrollTimeline, TimelineStep } from "@/components/ui/scroll-timeline";
import { Marker } from "@/components/ui/marker";
import { BrandIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({ ...pageSeo.about, path: "/about" });

const firstName = site.shortName;

export default function AboutPage() {
  return (
    <>
      {/* Intro with portrait */}
      <Container as="header" className="grid items-center gap-12 pb-16 pt-28 md:grid-cols-[1.1fr_0.9fr] md:pt-36">
        <div>
          <Reveal>
            <Breadcrumbs items={[{ label: "About" }]} path="/about" />
          </Reveal>
          <Reveal
            delay={80}
            as="h1"
            className="text-balance font-display text-[44px] font-semibold leading-[0.95] tracking-[-0.045em] md:text-[clamp(3rem,5.4vw,4.75rem)]"
          >
            Hi, I&apos;m {firstName}. I {about.headline} <Marker>{about.markedWord}</Marker>.
          </Reveal>
          <Reveal delay={160} as="p" className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {about.intro}
          </Reveal>
          <Reveal delay={240} className="mt-9 flex flex-wrap gap-3">
            <MagneticButton href="/pricing">See plans</MagneticButton>
            {/* TODO: add your résumé to /public/resume.pdf */}
            <MagneticButton href="/resume.pdf" external variant="secondary" icon={Download}>
              Résumé (PDF)
            </MagneticButton>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <Image
            src={site.avatar}
            alt={`Portrait of ${site.name}`}
            sizes="(min-width: 768px) 40vw, 100vw"
            placeholder="blur"
            priority
            className="aspect-[4/5] w-full rounded-[28px] border border-foreground/10 object-cover"
          />
          <div className="absolute -bottom-5 left-6 -rotate-3 rounded-2xl bg-signal px-5 py-3 text-signal-foreground shadow-xl">
            <p className="font-display text-lg font-semibold leading-tight">{site.name}</p>
            <p className="text-xs opacity-75">{site.role}</p>
          </div>
        </Reveal>
      </Container>

      <Stats stats={aboutStats} className="mt-10" />

      {/* Experience */}
      <Container as="section" className="grid gap-12 py-20 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:py-28">
        <Reveal className="md:sticky md:top-28 md:self-start">
          <h2 className="font-display text-[40px] font-semibold leading-[0.98] tracking-[-0.04em] md:text-[64px]">
            Where I&apos;ve <Marker>built</Marker>.
          </h2>
        </Reveal>
        <ScrollTimeline>
          {experience.map((job, index) => (
            <TimelineStep key={job.company + job.period} last={index === experience.length - 1}>
              <Reveal>
                <p className="font-mono text-[12.5px] text-muted-foreground">{job.period}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.025em]">{job.company}</h3>
                <p className="mt-1 font-medium">{job.role}</p>
                <p className="mt-3 max-w-[50ch] leading-relaxed text-muted-foreground">{job.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.highlights.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </TimelineStep>
          ))}
        </ScrollTimeline>
      </Container>

      {/* Principles: the first one is the lime card */}
      <section className="border-t border-foreground/10">
        <Container className="py-16 md:py-28">
          <SectionHeading title="How I think about the work" />
          <ol className="grid gap-3 md:grid-cols-2">
            {principles.map((item, index) => {
              const featured = index === 0;
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={(index % 2) * 100}
                  className={cn(
                    "flex min-h-[200px] flex-col justify-between gap-8 rounded-[28px] p-7 md:p-9",
                    featured ? "bg-signal text-signal-foreground" : "bg-muted/60",
                  )}
                >
                  <span className={cn("text-sm font-medium", featured ? "text-signal-foreground/70" : "text-muted-foreground")}>
                    {item.title}
                  </span>
                  <p className="text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[32px]">
                    {item.body}
                  </p>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Stack: one highlighted (inverted) group */}
      <Container as="section" className="pb-16 md:pb-28">
        <SectionHeading title="The stack I reach for" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 80}
              className={cn(
                "rounded-[28px] p-7",
                group.highlight ? "bg-foreground text-background" : "border border-foreground/10 bg-background",
              )}
            >
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{group.title}</h3>
              <p className={cn("mt-1 text-sm", group.highlight ? "text-background/60" : "text-muted-foreground")}>
                {group.note}
              </p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-[13px] font-medium",
                      group.highlight ? "bg-signal text-signal-foreground" : "bg-muted",
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Testimonials */}
      <section className="border-t border-foreground/10">
        <Container className="py-16 md:py-28">
          <SectionHeading title="What people say" />
          <div className="grid gap-3 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal
                as="figure"
                key={item.quote}
                delay={index * 100}
                className="flex h-full flex-col justify-between rounded-3xl bg-muted/50 p-7 md:p-8"
              >
                <div>
                  <span
                    aria-hidden
                    className="grid size-10 place-items-center rounded-full bg-signal pt-3 font-display text-[28px] leading-none text-signal-foreground"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-5 text-[17px] leading-relaxed">{item.quote}</blockquote>
                </div>
                <figcaption className="mt-8 text-sm leading-snug">
                  <span className="block font-semibold">{item.author}</span>
                  <span className="text-muted-foreground">{item.role}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Elsewhere: a ruled list of profiles */}
      <Container as="section" className="pb-16 md:pb-28">
        <Reveal as="h2" className="mb-8 font-display text-[30px] font-semibold leading-none tracking-[-0.03em] md:text-[40px]">
          Elsewhere on the internet
        </Reveal>
        <ul className="grid border-t border-foreground/10 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8">
          {socialProfiles.map((profile) => (
            <li key={profile.label} className="border-b border-foreground/10">
              <a
                href={profile.href}
                target={profile.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 py-5 pr-1"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition-colors duration-300 group-hover:bg-signal group-hover:text-signal-foreground">
                  {profile.icon === "email" ? (
                    <Mail aria-hidden className="size-5" />
                  ) : (
                    <BrandIcon name={profile.icon} className="size-5" />
                  )}
                </span>
                <span className="flex-1 leading-tight">
                  <span className="block font-display text-xl font-semibold tracking-[-0.02em]">{profile.label}</span>
                  <span className="text-sm text-muted-foreground">{profile.description}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-5 transition-transform duration-500 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <CtaSection
        title={
          <>
            Let&apos;s build something that <Marker>lasts</Marker>.
          </>
        }
        description="Tell me what you're working on. I'll reply within one business day with next steps."
      />
    </>
  );
}
