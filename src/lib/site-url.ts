/**
 * The site's public origin, used for canonical URLs, the sitemap, robots.txt,
 * share images and structured data.
 *
 * Set NEXT_PUBLIC_SITE_URL to your domain (e.g. https://umair.dev). On Vercel it
 * falls back to the production domain automatically; locally, to localhost.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Absolute URL for a site path, e.g. absoluteUrl("/work") → "https://…/work". */
export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
