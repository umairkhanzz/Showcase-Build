import type { Metadata } from "next";
import { pageSeo } from "@/content/seo";
import { pageMetadata } from "@/lib/metadata";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail, Repeat } from "lucide-react";
import { contactChannels, marketplaces } from "@/content/contact";
import { BrandIcon } from "@/components/ui/brand-icons";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { BookingCard } from "@/components/contact/booking-card";
import { Container } from "@/components/ui/container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Marker } from "@/components/ui/marker";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = pageMetadata({ ...pageSeo.contact, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        path="/contact"
        title={
          <>
            Let&apos;s build your website, SaaS, or <Marker>AI tool</Marker>.
          </>
        }
        description="Send a few lines and I'll reply within one business day. Want the subscription? You can skip the form and start right away."
      />

      <Container as="section" className="pb-24">
        {/* Skip-the-brief banner */}
        <Reveal className="flex flex-col gap-5 rounded-[28px] bg-signal p-6 text-signal-foreground md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-signal-foreground text-signal">
              <Repeat aria-hidden className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">Skip the brief. Start a subscription.</h2>
              <p className="mt-1 text-sm opacity-75">Pick a monthly plan and add your first request today.</p>
            </div>
          </div>
          <MagneticButton href="/pricing#plans" variant="ink" className="shrink-0">
            See plans
          </MagneticButton>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <Reveal delay={80} className="rounded-[28px] border border-foreground/10 bg-card p-6 md:p-10">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Tell me what you need</h2>
            <p className="mb-8 mt-3 max-w-md text-muted-foreground">
              Rough is fine. I&apos;ll suggest the best fit, a plan or a fixed-price project.
            </p>
            <ContactForm />
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={160}>
              <BookingCard />
            </Reveal>

            <Reveal delay={220} className="grid gap-5 sm:grid-cols-2">
              <ChannelCard icon={<Mail aria-hidden className="size-5" />} label="Email" value={contactChannels.email} href={`mailto:${contactChannels.email}`} />
              <ChannelCard
                icon={<BrandIcon name="linkedin" className="size-5" />}
                label="LinkedIn"
                value={contactChannels.linkedin.label}
                href={contactChannels.linkedin.href}
              />
            </Reveal>

            {marketplaces.length > 0 && (
              <Reveal delay={280} className="rounded-[28px] border border-foreground/10 bg-card p-6 md:p-8">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">Prefer a marketplace?</h2>
                <p className="mt-2 text-sm text-muted-foreground">Same developer, with the platform&apos;s escrow and reviews on top.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {marketplaces.map((market) => (
                    <a
                      key={market.label}
                      href={market.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                    >
                      {market.label}
                      <ArrowUpRight aria-hidden className="size-3.5 transition-transform duration-500 ease-snap group-hover:rotate-45" />
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

type ChannelCardProps = { icon: ReactNode; label: string; value: string; href: string };

function ChannelCard({ icon, label, value, href }: ChannelCardProps) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-[28px] border border-foreground/10 bg-card p-5 transition-colors hover:border-foreground/30"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-signal text-signal-foreground transition-transform duration-500 ease-snap group-hover:-rotate-12">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block truncate font-medium">{value}</span>
      </span>
    </a>
  );
}
