/** Shared shapes for everything in /content. Components import these types. */

import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";

export type NavLink = { label: string; href: string };

export type Stat = { value: string; label: string };

export type Project = {
  slug: string;
  /** "product" = built and run by me; "client" = built for a client or team. */
  kind: "product" | "client";
  name: string;
  domain: string;
  url: string;
  year: string;
  role: string;
  tagline: string;
  summary: string;
  stats: Stat[];
  stack: string[];
  /** Two colours used for the generated preview when no screenshot exists. */
  palette: [string, string];
  /**
   * Optional cover screenshot, statically imported from src/assets/projects/<slug>/
   * (e.g. `import cover from "@/assets/projects/launchpad/cover.png"`).
   */
  image?: StaticImageData;
  caseStudy: CaseStudy;
};

/** The long-form story on /work/[slug]. */
export type CaseStudy = {
  /** Big page heading, e.g. "A tool library with no server behind it". */
  headline: string;
  /** Where and how it runs, shown beside role and year. */
  hosting: string;
  /** More screenshots for the gallery (after `image`). Without any, the generated preview is shown. */
  gallery?: StaticImageData[];
  /** "The story": the first paragraph is shown larger as the lead. */
  story: string[];
  /** "What the build involved", one numbered item each. */
  buildSteps: string[];
  /** "Hard parts, and how I solved them". */
  challenges: { problem: string; solution: string }[];
  /** "This is a … project." Links to /services. */
  serviceType?: string;
};

export type ServiceCategory =
  | "Payments"
  | "AI"
  | "Speed & SEO"
  | "Design & Build"
  | "Stack"
  | "Infrastructure"
  | "Security"
  | "Fixes & rescue";

export type Service = {
  slug: string;
  category: ServiceCategory;
  title: string;
  description: string;
  worksWith: string[];
  /** Delivery time ("3 business days") or typical timeline for quoted work ("2 to 4 weeks"). */
  delivery: string;
  popular?: boolean;
  /** Larger custom build: scoped and quoted per project. Shows "Typical timeline" instead of "Delivery". */
  quoted?: boolean;
};

export type Goal = {
  id: string;
  label: string;
  title: string;
  headline: string;
  points: { title: string; body: string }[];
  /** Slug of a project in projects.ts that proves it. */
  proofSlug: string;
};

export type Plan = {
  id: string;
  name: string;
  description: string;
  features: string[];
  priceLabel: string;
  price: string;
  period?: string;
  cta: { label: string; href: string };
  recommended?: boolean;
};

export type ProcessStep = { when: string; title: string; body: string };

/** A paid monthly tier on the pricing page. */
export type Tier = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  turnaround: string;
  features: string[];
  bestFor: string;
  popular?: boolean;
};

export type ComparisonRow = { label: string; subscription: string; project: string };

export type Feature = { title: string; body: string };

/** A numbered step shown with an icon (e.g. "How ordering works"). */
export type IconStep = Feature & { icon: LucideIcon };

/** A group of custom (quoted) build types on /services. */
export type BuildGroup = { title: string; items: string[] };

/** One step of the fixed-price project process, grouped by phase. */
export type PhaseStep = { phase: "Before we start" | "During the build" | "Launch"; title: string; body: string };

export type StackGroup = {
  title: string;
  note: string;
  items: string[];
  /** Shown as the inverted card with lime chips (use for one group). */
  highlight?: boolean;
};

export type Job = { period: string; company: string; role: string; body: string; highlights: string[] };

export type SocialIcon = "whatsapp" | "github" | "linkedin" | "instagram" | "x" | "upwork";

/** A profile link shown as a round icon button (footer "Elsewhere"). */
export type SocialLink = { label: string; href: string; icon: SocialIcon };

export type SocialProfile = {
  label: string;
  description: string;
  href: string;
  /** Brand logo; "email" shows a mail icon. */
  icon: SocialIcon | "email";
};

export type Testimonial = { quote: string; author: string; role: string };

export type Faq = { question: string; answer: string };

export type PostCategory = "Thought" | "TIL" | "Debug" | "Ship" | "Snippet";

export type Post = {
  slug: string;
  category: PostCategory;
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  readingTime: string;
  tags: string[];
  body: string[];
};

/** A detailed page at /services/[slug] for one kind of custom build. No prices: every project is quoted. */
export type ServicePage = {
  slug: string;
  /** For custom builds: must match the item name in `customBuildGroups` and a project's `caseStudy.serviceType`. */
  title: string;
  /** Category it's filed under in the services list, e.g. "Speed & SEO". */
  group: ServiceCategory;
  /** "3 business days" for quick services, "2 to 4 weeks" for custom builds. */
  timeline: string;
  /** One-line promise under the title. */
  headline: string;
  /** Lead paragraph in the header. */
  intro: string;
  /** "What … involves": a few short paragraphs. */
  overview: string[];
  /** "What you actually get": three outcomes. */
  benefits: Feature[];
  /** "A good fit if". */
  goodFit: string[];
  /** "What's included". */
  included: string[];
  /** "How it runs". */
  steps: Feature[];
  /** "Typically built with". */
  stack: string[];
  faqs: Faq[];
};
