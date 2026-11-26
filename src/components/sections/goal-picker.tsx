"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Goal, Project } from "@/content/types";
import { Container } from "@/components/ui/container";
import { SectionHeading, Eyebrow } from "@/components/ui/section-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/cn";
import { Marker } from "@/components/ui/marker";

type GoalPickerProps = {
  goals: Goal[];
  /** Projects keyed by slug, used for the "Done before" proof link. */
  projects: Record<string, Project>;
};

/** "I need to…" list on the left; the matching plan appears on the right. */
export function GoalPicker({ goals, projects }: GoalPickerProps) {
  const [activeId, setActiveId] = useState(goals[0].id);
  const goal = goals.find((g) => g.id === activeId) ?? goals[0];
  const proof = projects[goal.proofSlug];

  return (
    <Container as="section" className="py-24 md:py-32">
      <SectionHeading
        title={
          <>
            Tell me the goal. <Marker>Here&apos;s the plan</Marker>.
          </>
        }
        description="Pick what you're after to see what you get, where pricing starts and a project where I've already done it."
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow className="mb-4">I need to…</Eyebrow>
          <ul role="tablist" aria-orientation="vertical" className="flex flex-col">
            {goals.map((item) => {
              const active = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 border-b border-foreground/10 py-4 text-left font-display text-2xl font-medium tracking-[-0.03em] transition-colors md:text-3xl",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full bg-signal text-signal-foreground transition-all duration-500 ease-snap",
                        active ? "scale-100 opacity-100" : "scale-50 opacity-0",
                      )}
                    >
                      <ArrowRight aria-hidden className="size-4" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div key={goal.id} role="tabpanel" className="animate-fade-in rounded-[28px] border border-foreground/10 bg-card p-6 md:p-10">
          <p className="text-sm text-muted-foreground">{goal.title}</p>
          <h3 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl">
            {goal.headline}
          </h3>

          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {goal.points.map((point) => (
              <li key={point.title}>
                <span className="grid size-6 place-items-center rounded-full bg-signal text-signal-foreground">
                  <Check aria-hidden className="size-3.5" />
                </span>
                <p className="mt-3 font-medium">{point.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{point.body}</p>
              </li>
            ))}
          </ul>

          {proof && (
            <Link
              href={`/work/${proof.slug}`}
              className="mt-8 flex items-center gap-4 rounded-2xl border border-foreground/10 p-3 transition-colors hover:border-foreground/25"
            >
              <span
                aria-hidden
                className="h-12 w-20 shrink-0 rounded-lg"
                style={{ background: `linear-gradient(135deg, ${proof.palette[0]}, ${proof.palette[1]})` }}
              />
              <span className="text-sm">
                <span className="block text-muted-foreground">Done before</span>
                <span className="font-medium">
                  {proof.name}: {proof.tagline}
                </span>
              </span>
            </Link>
          )}

          <div className="mt-8">
            <MagneticButton href="/pricing">See plans</MagneticButton>
          </div>
        </div>
      </div>
    </Container>
  );
}
