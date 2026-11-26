import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { servicePages } from "@/content/service-pages";
import { navLinks } from "@/content/site";
import { absoluteUrl } from "@/lib/site-url";

/**
 * /sitemap.xml: every public page, so search engines find them all.
 * New projects and posts are picked up automatically from /content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Only real dates are given (blog posts). Made-up "modified today" dates are
  // ignored by Google and would also force this file to rebuild on every request.
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    ...[...navLinks.map((link) => link.href), "/contact"].map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: ["/work", "/services", "/pricing", "/contact"].includes(path) ? 0.9 : 0.7,
    })),
  ];

  const caseStudies = projects.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: project.image ? [absoluteUrl(project.image.src)] : undefined,
  }));

  const serviceDetails = servicePages.map((page) => ({
    url: absoluteUrl(`/services/${page.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articles = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...serviceDetails, ...caseStudies, ...articles];
}
