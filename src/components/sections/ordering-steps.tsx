import type { IconStep } from "@/content/types";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** "How ordering works": icon steps joined by a lime line, four across on desktop. */
export function OrderingSteps({ steps }: { steps: IconStep[] }) {
  return (
    <Container as="section" className="pb-16 md:pb-28">
      <Reveal as="h2" className="mb-10 font-display text-[30px] font-semibold leading-none tracking-[-0.03em] md:mb-12 md:text-[40px]">
        How ordering works
      </Reveal>
      <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
        {steps.map(({ icon: Icon, title, body }, index) => (
          <Reveal as="li" key={title} delay={index * 100}>
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-foreground text-background">
                <Icon aria-hidden className="size-5" />
              </span>
              {/* Connector to the next step (hidden after the last one) */}
              <span
                aria-hidden
                className={cn("h-0.5 flex-1", index < steps.length - 1 ? "bg-signal" : "bg-transparent")}
              />
            </div>
            <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em]">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
          </Reveal>
        ))}
      </ol>
    </Container>
  );
}
