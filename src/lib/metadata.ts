import type { Metadata } from "next";
import { site } from "@/content/site";
import { coreKeywords } from "@/content/seo";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Site path of the page, e.g. "/work". Becomes the canonical URL. */
  path: string;
  keywords?: string[];
  /** Use the title as-is, without the " | Muhammad Umair Khan" suffix (home page). */
  absoluteTitle?: boolean;
  /** Open Graph type: "article" for case studies and posts. */
  type?: "website" | "article";
  /** Extra Open Graph fields for articles. */
  article?: { publishedTime?: string; tags?: string[] };
  /** True when the page has its own opengraph-image file next to it (case studies, posts). */
  ownImage?: boolean;
};

/**
 * Builds a page's metadata: title, description, canonical URL, keywords,
 * Open Graph and X (Twitter) cards.
 *
 * Every page goes through this, because Next.js replaces (not merges) a parent's
 * `openGraph` when a page sets its own, so the share image is set here too.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  absoluteTitle = false,
  type = "website",
  article,
  ownImage = false,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...keywords, ...coreKeywords],
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: "en_US",
      title: fullTitle,
      description,
      // Explicit metadata beats image files, so name the right card: the page's own
      // (case studies, posts) or the site-wide one in app/opengraph-image.tsx.
      images: [
        {
          url: ownImage ? `${path}/opengraph-image` : "/opengraph-image",
          width: 1200,
          height: 630,
          alt: ownImage ? fullTitle : `${site.name}, ${site.role}`,
        },
      ],
      ...(type === "article" && article
        ? { publishedTime: article.publishedTime, tags: article.tags, authors: [site.name] }
        : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
