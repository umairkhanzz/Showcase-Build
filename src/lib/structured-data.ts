import type { Faq, Post, Project, Service, ServicePage, Tier } from "@/content/types";
import { site, socialLinks, techStack } from "@/content/site";
import { coreKeywords } from "@/content/seo";
import { absoluteUrl, siteUrl } from "./site-url";

/**
 * schema.org structured data. Entities share stable `@id`s so Google can link
 * them: every page's content points back to the same Person and WebSite.
 */
const ids = {
  person: `${siteUrl}/#person`,
  website: `${siteUrl}/#website`,
  business: `${siteUrl}/#business`,
};

const context = "https://schema.org";

/** Only real profile URLs (skips placeholders like "https://x.com/"). */
const profileUrls = socialLinks.map((link) => link.href).filter((href) => new URL(href).pathname.length > 1);

/** "$1,290" → "1290", for Offer prices. */
const priceNumber = (price: string) => price.replace(/[^0-9.]/g, "");

/** Site-wide graph, rendered once in the root layout: who I am, the website, and the business. */
export function siteGraph() {
  return {
    "@context": context,
    "@graph": [
      {
        "@type": "Person",
        "@id": ids.person,
        name: site.name,
        alternateName: ["Umair Khan", site.shortName],
        jobTitle: site.role,
        description: site.description,
        url: siteUrl,
        image: absoluteUrl(site.avatar.src),
        email: `mailto:${site.email}`,
        sameAs: profileUrls,
        knowsAbout: techStack,
        homeLocation: { "@type": "Country", name: "Pakistan" },
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        name: site.name,
        url: siteUrl,
        inLanguage: "en",
        publisher: { "@id": ids.person },
      },
      {
        "@type": "ProfessionalService",
        "@id": ids.business,
        name: `${site.name}, ${site.role}`,
        url: siteUrl,
        image: absoluteUrl(site.avatar.src),
        description: site.description,
        email: site.email,
        founder: { "@id": ids.person },
        areaServed: "Worldwide",
        knowsAbout: coreKeywords.slice(2),
        sameAs: profileUrls,
      },
    ],
  };
}

/** Breadcrumb trail; Google can show it instead of the raw URL in results. */
export function breadcrumbLd(trail: { label: string; path: string }[]) {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** FAQ answers, readable by search engines and AI assistants. */
export function faqLd(faqs: Faq[]) {
  return {
    "@context": context,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Services as an offer catalog (no prices: each is quoted). */
export function servicesLd(services: Service[]) {
  return {
    "@context": context,
    "@type": "OfferCatalog",
    name: "Web development services",
    url: absoluteUrl("/services"),
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        category: service.category,
        provider: { "@id": ids.business },
        areaServed: "Worldwide",
      },
    })),
  };
}

/** One custom-build service page (/services/[slug]). No offer price: these are quoted per project. */
export function serviceLd(page: ServicePage) {
  return {
    "@context": context,
    "@type": "Service",
    name: page.title,
    serviceType: page.title,
    description: page.intro,
    url: absoluteUrl(`/services/${page.slug}`),
    provider: { "@id": ids.business },
    areaServed: "Worldwide",
  };
}

/** Monthly subscription tiers, each a recurring monthly price. */
export function tiersLd(tiers: Tier[]) {
  return {
    "@context": context,
    "@type": "OfferCatalog",
    name: "Monthly developer subscription",
    url: absoluteUrl("/pricing"),
    itemListElement: tiers.map((tier) => ({
      "@type": "Offer",
      name: `${tier.name} plan`,
      description: tier.tagline,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: priceNumber(tier.price),
        priceCurrency: "USD",
        unitCode: "MON",
        billingDuration: "P1M",
      },
      seller: { "@id": ids.business },
    })),
  };
}

/** A case study, linked to me as its creator. */
export function caseStudyLd(project: Project) {
  return {
    "@context": context,
    "@type": "CreativeWork",
    name: `${project.name}: ${project.caseStudy.headline}`,
    headline: project.caseStudy.headline,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    image: project.image ? absoluteUrl(project.image.src) : undefined,
    dateCreated: project.year,
    keywords: project.stack.join(", "),
    creator: { "@id": ids.person },
    author: { "@id": ids.person },
    about: { "@type": "WebApplication", name: project.name, url: project.url, applicationCategory: "WebApplication" },
  };
}

/** A blog post. */
export function postLd(post: Post) {
  return {
    "@context": context,
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    author: { "@id": ids.person },
    publisher: { "@id": ids.person },
    isPartOf: { "@id": ids.website },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}
