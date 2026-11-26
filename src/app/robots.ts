import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

/** /robots.txt: everything is public; point crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
