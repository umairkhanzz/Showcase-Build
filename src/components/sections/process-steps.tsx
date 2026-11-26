import type { ProcessStep } from "@/content/types";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { Reveal } from "@/components/ui/reveal";
import { ScrollTimeline, TimelineStep } from "@/components/ui/scroll-timeline";
import { Marker } from "@/components/ui/marker";

type ProcessStepsProps = {
  steps: ProcessStep[];
  showFullLink?: boolean;
};

/** "No black box." Sticky intro on the left, scroll-filled timeline on the right. */
export function ProcessSteps({ steps, showFullLink = true }: ProcessStepsProps) {
  return (
    <section className="border-t border-foreground/10">
      <Container className="grid gap-12 py-24 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:py-32">
        <Reveal className="md:sticky md:top-28 md:self-start">
          <h2 className="text-balance font-display text-[44px] font-semibold leading-[0.95] tracking-[-0.04em] md:text-[76px]">
            No <Marker>black box</Marker>.
          </h2>
          <p className="mt-6 max-w-[38ch] text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
            You always know what&apos;s happening, what it costs and when you&apos;ll see it. Here&apos;s how the work
            runs, on a plan or a project.
          </p>
          {showFullLink && <TextLink href="/process" className="mt-8">The full process</TextLink>}
        </Reveal>

        <ScrollTimeline>
          {steps.map((step, index) => (
            <TimelineStep key={step.title} last={index === steps.length - 1}>
              <Reveal>
                <p className="font-mono text-[12.5px] text-muted-foreground">{step.when}</p>
                <h3 className="mt-2 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.025em] md:text-[40px]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted-foreground md:text-[17px]">
                  {step.body}
                </p>
              </Reveal>
            </TimelineStep>
          ))}
        </ScrollTimeline>
      </Container>
    </section>
  );
}
