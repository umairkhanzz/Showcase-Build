"use client";

import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import type { Tier } from "@/content/types";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/cn";

type Mode = "subscription" | "project";

type PricingTabsProps = {
  tiers: Tier[];
  projectIncludes: string[];
  projectPrice: string;
};

/** Toggle between the monthly tiers and the fixed-price project offer. */
export function PricingTabs({ tiers, projectIncludes, projectPrice }: PricingTabsProps) {
  const [mode, setMode] = useState<Mode>("subscription");

  return (
    <Container as="section" id="plans" className="scroll-mt-24 pb-24">
      <div className="flex justify-center">
        {/* Full width on phones so the two halves share the screen; shrinks to fit its labels from `sm` up. */}
        <div
          role="tablist"
          aria-label="Pricing model"
          className="relative grid w-full max-w-sm grid-cols-2 rounded-full border border-foreground/10 bg-card p-1.5 sm:inline-grid sm:w-auto sm:max-w-none"
        >
          {/* Sliding pill behind the active tab */}
          <span
            aria-hidden
            className={cn(
              "absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-foreground transition-transform duration-500 ease-snap",
              mode === "project" && "translate-x-full",
            )}
          />
          {/* Phones get short labels and a lime dot in place of the "Recommended" badge, so both tabs fit side by side. */}
          <TabButton active={mode === "subscription"} onClick={() => setMode("subscription")}>
            <span className="sm:hidden">Monthly</span>
            <span className="hidden sm:inline">Monthly subscription</span>
            <span aria-hidden className="size-1.5 rounded-full bg-signal sm:hidden" />
            <span className="sr-only sm:not-sr-only sm:rounded-full sm:bg-signal sm:px-2 sm:py-0.5 sm:text-[11px] sm:text-signal-foreground">
              Recommended
            </span>
          </TabButton>
          <TabButton active={mode === "project"} onClick={() => setMode("project")}>
            <span className="sm:hidden">Fixed price</span>
            <span className="hidden sm:inline">Fixed-price project</span>
          </TabButton>
        </div>
      </div>

      {mode === "subscription" ? (
        <div key="subscription" role="tabpanel" className="mt-12 grid animate-fade-in gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      ) : (
        <div
          key="project"
          role="tabpanel"
          className="mx-auto mt-12 grid max-w-4xl animate-fade-in gap-10 rounded-[28px] border border-foreground/10 bg-card p-8 md:grid-cols-[1fr_auto] md:p-12"
        >
          <div>
            <h3 className="font-display text-4xl font-semibold tracking-[-0.04em]">Fixed-price project</h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              One defined build with a clear finish line. You get a written scope, a timeline and one number before any
              work starts.
            </p>
            <ul className="mt-8 space-y-3">
              {projectIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-signal-text" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-8 md:items-end md:text-right">
            <p>
              <span className="block text-sm text-muted-foreground">from</span>
              <span className="font-display text-6xl font-semibold tracking-[-0.04em]">{projectPrice}</span>
            </p>
            <MagneticButton href={site.contactUrl}>Start a project</MagneticButton>
          </div>
        </div>
      )}
    </Container>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-medium sm:px-4 transition-colors duration-500 md:px-6",
        active ? "text-background" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  const featured = tier.popular;

  return (
    <article
      className={cn(
        "flex flex-col rounded-[28px] p-7 transition-transform duration-500 ease-snap hover:-translate-y-1 md:p-8",
        featured ? "bg-foreground text-background lg:-translate-y-3 lg:hover:-translate-y-4" : "border border-foreground/10 bg-card",
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-3xl font-semibold tracking-[-0.03em]">{tier.name}</h3>
        {featured && (
          <span className="rounded-full bg-signal px-3 py-1 text-xs font-medium text-signal-foreground">Most popular</span>
        )}
      </div>
      <p className={cn("mt-2 text-sm", featured ? "opacity-70" : "text-muted-foreground")}>{tier.tagline}</p>

      <p className="mt-8">
        <span className="font-display text-5xl font-semibold tracking-[-0.04em]">{tier.price}</span>
        <span className="text-sm opacity-60">/mo</span>
      </p>
      <p className={cn("mt-2 text-sm", featured ? "opacity-70" : "text-muted-foreground")}>{tier.turnaround}</p>

      <ul className={cn("mt-8 space-y-3 border-t pt-8", featured ? "border-background/15" : "border-foreground/10")}>
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", featured ? "text-signal" : "text-signal-text")} />
            {feature}
          </li>
        ))}
      </ul>

      <p className={cn("mt-8 text-sm", featured ? "opacity-70" : "text-muted-foreground")}>{tier.bestFor}</p>

      <div className="mt-auto pt-8">
        <MagneticButton href={site.contactUrl} variant={featured ? "accent" : "secondary"} className="w-full">
          Start with {tier.name}
        </MagneticButton>
      </div>
    </article>
  );
}
