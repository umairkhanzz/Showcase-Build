import { Check, FileText, Repeat } from "lucide-react";
import type { Plan } from "@/content/types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { Marker } from "@/components/ui/marker";

export function PricingPlans({ plans }: { plans: Plan[] }) {
  return (
    <Container as="section" id="plans" className="py-24 md:py-32">
      <SectionHeading
        title={
          <>
            Two ways to <Marker>work together</Marker>.
          </>
        }
        description="A monthly subscription for ongoing work, or a fixed price for one defined build. Most clients pick the subscription and never think about quotes again."
      />
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        {plans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 120} className="flex">
            <PlanCard plan={plan} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const featured = plan.recommended;
  const Icon = featured ? Repeat : FileText;

  return (
    <article
      className={cn(
        "flex w-full flex-col rounded-[28px] p-7 transition-transform duration-500 ease-snap hover:-translate-y-1 md:p-10",
        featured
          ? "bg-signal text-signal-foreground"
          : "border border-foreground/10 bg-card text-foreground",
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "grid size-11 place-items-center rounded-xl",
            featured ? "bg-signal-foreground text-signal" : "bg-muted text-foreground",
          )}
        >
          <Icon aria-hidden className="size-5" />
        </span>
        {featured && (
          <span className="rounded-full bg-signal-foreground px-3 py-1 text-xs font-medium text-signal">
            Recommended
          </span>
        )}
      </div>

      <h3 className="mt-8 font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{plan.name}</h3>
      <p className={cn("mt-4 max-w-md leading-relaxed", featured ? "opacity-80" : "text-muted-foreground")}>
        {plan.description}
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm">
            <Check aria-hidden className="size-4 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-12">
        <p>
          <span className={cn("block text-sm", featured ? "opacity-70" : "text-muted-foreground")}>
            {plan.priceLabel}
          </span>
          <span className="font-display text-5xl font-semibold tracking-[-0.04em] md:text-6xl">{plan.price}</span>
          {plan.period && <span className="text-sm opacity-70">{plan.period}</span>}
        </p>
        <MagneticButton href={plan.cta.href} variant={featured ? "ink" : "secondary"}>
          {plan.cta.label}
        </MagneticButton>
      </div>
    </article>
  );
}
