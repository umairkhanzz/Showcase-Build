import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";

type PageHeaderProps = {
  /** Current page name shown in the breadcrumb trail. */
  crumb: string;
  /** Path of this page, e.g. "/work" (published as breadcrumb structured data). */
  path: string;
  /** Optional small label above the title. */
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

/** Top-of-page intro used by every inner page: breadcrumbs, big title, lead text. */
export function PageHeader({ crumb, path, kicker, title, description, children }: PageHeaderProps) {
  return (
    <Container as="header" className="pb-12 pt-28 md:pb-16 md:pt-36">
      <Reveal>
        <Breadcrumbs items={[{ label: crumb }]} path={path} />
      </Reveal>
      {kicker && (
        <Reveal delay={40} as="p" className="mb-3 text-sm font-medium text-signal-text">
          {kicker}
        </Reveal>
      )}
      <Reveal
        delay={80}
        as="h1"
        className="max-w-5xl text-balance font-display text-[48px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[64px] md:text-[clamp(4rem,7.2vw,7rem)]"
      >
        {title}
      </Reveal>
      {description && (
        <Reveal delay={160} as="p" className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {description}
        </Reveal>
      )}
      {children && (
        <Reveal delay={240} className="mt-9">
          {children}
        </Reveal>
      )}
    </Container>
  );
}
