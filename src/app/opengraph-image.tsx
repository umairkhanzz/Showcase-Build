import { site } from "@/content/site";
import { OG_SIZE, renderPortfolioBanner } from "@/lib/og";
import { siteUrl } from "@/lib/site-url";

/**
 * Default share card for every page that doesn't have its own. Doubles as the
 * LinkedIn "Featured" banner: download it from /opengraph-image.
 */
export const alt = `${site.name}, ${site.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderPortfolioBanner({
    headline: "I engineer modern, scalable products.",
    highlight: "scalable products.",
    stats: [
      { value: "10+", label: "products shipped" },
      { value: "3 yrs", label: "full-stack" },
      { value: "200K+", label: "users reached" },
    ],
    domain: new URL(siteUrl).host,
  });
}
