import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";

type Crumb = { label: string; href?: string };

type BreadcrumbsProps = {
  items: Crumb[];
  /** Path of the current page. When set, the trail is also published as structured data. */
  path?: string;
};

/** "Home / Section / Page" trail. The last crumb is the current page. */
export function Breadcrumbs({ items, path }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-1.5 text-sm">
      {path && (
        <JsonLd
          data={breadcrumbLd(
            trail.map((crumb, index) => ({
              label: crumb.label,
              path: index === trail.length - 1 ? path : (crumb.href ?? path),
            })),
          )}
        />
      )}
      {trail.map((crumb, index) => {
        const isLast = index === trail.length - 1;
        return (
          <span key={crumb.label} className="inline-flex items-center gap-1.5">
            {index > 0 && <span className="text-muted-foreground/50">/</span>}
            {isLast || !crumb.href ? (
              <span aria-current="page" className="rounded-full bg-muted px-2.5 py-0.5 font-medium text-foreground">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
