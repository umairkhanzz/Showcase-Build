import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import type { BuildGroup } from "@/content/types";
import { servicePageHref } from "@/content/service-pages";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

type CustomBuildsProps = {
  groups: BuildGroup[];
};

/**
 * "Bigger than a small job?": a lime card pointing to the monthly plans
 * on /pricing, beside the kinds of custom builds that get their own quote.
 */
export function CustomBuilds({ groups }: CustomBuildsProps) {
  return (
    <section id="custom" className="scroll-mt-24 border-t border-foreground/10">
      <Container className="py-16 md:py-28">
        <SectionHeading
          title="Bigger than a small job?"
          description="Two ways to work together on larger builds: a flat monthly plan, or a custom project with its own quote."
        />
        <div className="grid gap-3 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
          <Reveal>
            <div
              data-surface="signal"
              className="flex h-full flex-col justify-between rounded-[28px] bg-signal p-7 text-signal-foreground md:p-10"
            >
              <div>
                <p className="text-[15px] opacity-70">Monthly plans</p>
                <p className="mt-2 font-display text-[34px] font-semibold leading-none tracking-[-0.035em] md:text-[40px]">
                  Unlimited requests, one monthly plan.
                </p>
                <p className="mt-4 max-w-[34ch] leading-relaxed opacity-80">
                  A developer on your team every month. Pause or cancel anytime.
                </p>
              </div>
              <MagneticButton href="/pricing#plans" variant="ink" className="mt-8">
                See plans
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={100} className="rounded-[28px] border border-foreground/10 bg-background p-7 md:p-10">
            <p className="text-[15px] text-muted-foreground">Custom builds, quoted per project</p>
            <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
              {groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[13px] font-semibold">{group.title}</h3>
                  <ul className="mt-2.5 space-y-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={servicePageHref(item)}
                          className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
