import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/ui/status-dot";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { HeroShowcase } from "./hero-showcase";
import { Marker } from "@/components/ui/marker";

export function Hero() {
  return (
    <Container
      as="section"
      className="grid items-center gap-14 pb-16 pt-28 md:min-h-dvh md:grid-cols-[1.12fr_1fr] md:gap-10 md:pb-14 md:pt-24"
    >
      <div>
        <Reveal className="flex items-center gap-3">
          <Avatar priority />
          <div className="leading-tight">
            <p className="text-sm font-medium">{site.name}</p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <StatusDot />
              {site.availability}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} as="h1" className="mt-7 text-balance font-display text-[48px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[64px] md:text-[clamp(3.5rem,6vw,5.5rem)]">
          I engineer modern, scalable <Marker>products</Marker>.
        </Reveal>

        <Reveal delay={160} as="p" className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Full-stack applications, FinTech platforms, real-time gaming, Web3 and AI-powered products. Hire me by
          the month for one flat price, or by the project.
        </Reveal>

        <Reveal delay={240} className="mt-9 flex flex-wrap gap-3">
          <MagneticButton href="/pricing">See plans</MagneticButton>
          <MagneticButton href={site.contactUrl} variant="secondary" icon={null}>
            Start a project
          </MagneticButton>
        </Reveal>

        <Reveal delay={320}>
          <Link
            href="#work"
            className="mt-7 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Or see the work first <ArrowDown aria-hidden className="size-3.5" />
          </Link>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <HeroShowcase projects={projects.slice(0, 4)} />
      </Reveal>
    </Container>
  );
}
