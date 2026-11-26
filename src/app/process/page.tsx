import type { Metadata } from "next";
import { pageSeo } from "@/content/seo";
import { pageMetadata } from "@/lib/metadata";
import { LayoutList, MessageSquareText, SquareKanban } from "lucide-react";
import { processPrinciples, projectPhases, subscriptionSteps } from "@/content/process";
import { PageHeader } from "@/components/sections/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { SectionHeading, Eyebrow } from "@/components/ui/section-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { ScrollTimeline, TimelineStep } from "@/components/ui/scroll-timeline";
import { Marker } from "@/components/ui/marker";

export const metadata: Metadata = pageMetadata({ ...pageSeo.process, path: "/process" });

const PRINCIPLE_ICONS = [LayoutList, SquareKanban, MessageSquareText];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        crumb="Process"
        path="/process"
        title={
          <>
            Fast to ship, never a <Marker>black box</Marker>.
          </>
        }
        description="Hiring a developer shouldn't feel like a gamble. Here's exactly how a project runs with me, from the first call to launch."
      >
        <MagneticButton href="/pricing">See plans</MagneticButton>
      </PageHeader>

      {/* Three promises */}
      <Container as="section" className="pb-20 md:pb-28">
        <div className="grid gap-5 md:grid-cols-3">
          {processPrinciples.map((item, index) => {
            const Icon = PRINCIPLE_ICONS[index % PRINCIPLE_ICONS.length];
            return (
              <Reveal key={item.title} delay={index * 100} className="rounded-3xl border border-foreground/10 bg-card p-7">
                <span className="grid size-11 place-items-center rounded-xl bg-signal text-signal-foreground">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h2 className="mt-8 font-display text-2xl font-semibold tracking-[-0.03em]">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>

      {/* Subscription */}
      <section className="border-t border-foreground/10">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="On a monthly subscription"
            title={
              <>
                Even simpler. <Marker>No quotes.</Marker>
              </>
            }
            description="Subscribers skip straight to the build. You get your own request board and I work through it top to bottom."
          />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {subscriptionSteps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 100} className="rounded-3xl border border-foreground/10 p-7">
                <span className="font-display text-6xl font-semibold tracking-[-0.05em] text-signal-text">{index + 1}</span>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Fixed-price project timeline */}
      <section className="border-t border-foreground/10">
        <Container className="grid gap-12 py-20 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:py-28">
          <Reveal className="md:sticky md:top-28 md:self-start">
            <h2 className="text-balance font-display text-[40px] font-semibold leading-[0.98] tracking-[-0.04em] md:text-[64px]">
              Fixed-price projects: first call to <Marker>launch</Marker>.
            </h2>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-muted-foreground">
              {projectPhases.length} steps, every project. No mystery, no surprises.
            </p>
          </Reveal>

          <ScrollTimeline>
            {projectPhases.map((step, index) => (
              <TimelineStep key={step.title} last={index === projectPhases.length - 1}>
                <Reveal>
                  <Eyebrow>{step.phase}</Eyebrow>
                  <h3 className="mt-2 font-display text-[28px] font-semibold leading-[1.05] tracking-[-0.025em] md:text-[34px]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] leading-relaxed text-muted-foreground">{step.body}</p>
                </Reveal>
              </TimelineStep>
            ))}
          </ScrollTimeline>
        </Container>
      </section>

      <CtaSection
        title={
          <>
            Ready when <Marker>you are</Marker>.
          </>
        }
        description="Add your first request today, or book a call and we'll map the plan together."
      />
    </>
  );
}
