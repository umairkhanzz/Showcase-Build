import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { BookCallButton } from "@/components/contact/book-call-button";
import { CopyEmail } from "@/components/ui/copy-email";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";

type CtaSectionProps = {
  title?: ReactNode;
  description?: string;
};

/**
 * Closing call to action: a lime panel with the pitch and buttons, beside a
 * portrait with a short promise. Each page can pass its own title and description.
 * Inside the lime panel, a <Marker> becomes a dark highlight (see `[data-surface="signal"]` in globals.css).
 */
export function CtaSection({
  title = "Let's build something meaningful.",
  description = "I'm interested in challenging engineering work — SaaS, FinTech, Web3 and AI-powered products. Subscribe, or send a brief for a fixed quote.",
}: CtaSectionProps) {
  return (
    <Container as="section" className="py-24 md:py-32">
      <Reveal className="grid overflow-hidden rounded-[32px] md:grid-cols-[1.35fr_1fr]">
        <div data-surface="signal" className="bg-signal px-6 py-12 text-signal-foreground sm:px-10 md:px-14 md:py-20">
          <h2 className="max-w-[12ch] text-balance font-display text-5xl font-semibold leading-[0.95] tracking-[-0.045em] md:text-[clamp(3.5rem,6vw,5.5rem)]">
            {title}
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed opacity-80">{description}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton href="/pricing" variant="ink">
              See plans
            </MagneticButton>
            <BookCallButton variant="ink-outline" />
            <CopyEmail email={site.email} className="ml-1 text-[15px]" />
          </div>

          <p className="mt-8 text-[15px] opacity-80">
            Prefer one fixed price for one defined build?{" "}
            <Link
              href={site.contactUrl}
              className="font-semibold underline decoration-current/40 underline-offset-[6px] hover:decoration-current"
            >
              Start a project
            </Link>
          </p>
        </div>

        <div className="relative min-h-[420px] bg-[#1a1a1a]">
          <Image
            src={site.avatar}
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            placeholder="blur"
            className="object-cover object-top"
          />
          {/* Promise card over the photo: smaller and tighter on phones so it covers less of the portrait. */}
          <p className="absolute inset-x-3 bottom-3 rounded-xl bg-signal-foreground/85 px-4 py-3 text-[13px] leading-snug text-signal backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:rounded-2xl sm:px-5 sm:py-4 sm:text-[15px] sm:leading-relaxed md:inset-x-6 md:bottom-6">
            {site.promise}
          </p>
        </div>
      </Reveal>
    </Container>
  );
}
