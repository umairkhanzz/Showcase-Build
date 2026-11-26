import Link from "next/link";
import { navLinks, site, socialLinks } from "@/content/site";
import { services } from "@/content/services";
import { Container } from "@/components/ui/container";
import { Avatar } from "@/components/ui/avatar";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Magnetic } from "@/components/ui/magnetic";
import { BrandIcon } from "@/components/ui/brand-icons";
import type { SocialLink } from "@/content/types";

const COLUMNS = [
  {
    title: "Services",
    links: services.map((service) => ({ label: service.title, href: `/services/${service.slug}` })),
  },
  { title: "Explore", links: [...navLinks, { label: "Contact", href: site.contactUrl }] },
];

const ELSEWHERE: SocialLink[] = socialLinks;

export function Footer() {
  return (
    // Same max width as the page (1360px), but no side padding, so the card spans the full width.
    <Container as="footer" className="px-0 pb-5 md:px-0 md:pb-8">
      <div className="@container overflow-hidden rounded-[28px] border border-foreground/10 bg-card">
        <div className="grid gap-12 px-6 pt-14 md:px-10 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_0.6fr_1.25fr]">
          <div>
            <div className="flex items-center gap-3">
              <Avatar />
              <div>
                <p className="font-medium">{site.name}</p>
                <p className="text-sm text-muted-foreground">{site.role}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{site.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <MagneticButton href="/pricing" size="sm" icon={null}>
                See plans
              </MagneticButton>
              <MagneticButton href={site.contactUrl} size="sm" variant="secondary" icon={null}>
                Start a project
              </MagneticButton>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-sm font-medium">{column.title}</p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <SayHello />
        </div>

        <div className="mx-6 mt-14 flex md:mx-10 flex-col gap-2 border-t border-foreground/10 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. Built with Next.js.
          </p>
          <p>{site.location}</p>
        </div>

        {/* Oversized wordmark, cropped at the bottom edge; sized to the card (cqw), not the screen */}
        <div aria-hidden className="select-none overflow-hidden px-6 pt-6 md:px-10">
          <p className="flex items-baseline justify-start font-display text-[15.5cqw] font-semibold leading-[0.8] tracking-[-0.06em]">
            {site.logo.name}
            <span className="ml-[0.04em] rounded-[0.08em] bg-signal px-[0.06em] text-signal-foreground">
              {site.logo.suffix}
            </span>
          </p>
        </div>
      </div>
    </Container>
  );
}

/** Direct contact details plus round, magnetic profile icons. */
function SayHello() {
  return (
    <div>
      <p className="mb-4 text-sm font-medium">Say hello</p>
      <ul className="space-y-2.5 text-sm">
        <li>
          <a
            href={`mailto:${site.email}?subject=Project%20inquiry`}
            className="transition-colors duration-300 wrap-anywhere hover:text-signal-text"
          >
            {site.email}
          </a>
        </li>
      </ul>

      <p className="mb-4 mt-10 text-sm font-medium">Elsewhere</p>
      <ul className="flex flex-wrap gap-2.5">
        {ELSEWHERE.map((link) => (
          <li key={link.label}>
            <Magnetic>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="grid size-12 place-items-center rounded-full border-[1.5px] border-foreground/20 transition-[background-color,color,border-color] duration-300 hover:border-signal hover:bg-signal hover:text-signal-foreground"
              >
                <BrandIcon name={link.icon} className="size-4.5" />
              </a>
            </Magnetic>
          </li>
        ))}
      </ul>
    </div>
  );
}
