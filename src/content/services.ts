import { ClipboardList, Landmark, PackageCheck, Search } from "lucide-react";
import type { BuildGroup, Faq, Goal, IconStep, Service } from "./types";

/** Small, well-defined jobs with a set scope and delivery time. */
export const services: Service[] = [
  {
    slug: "stripe-checkout",
    category: "Payments",
    title: "Add Stripe Checkout to your website",
    description:
      "Cards, Apple Pay and Google Pay on your site, with verified webhooks so every paid order is recorded.",
    worksWith: ["Next.js", "React", "Node.js"],
    delivery: "3 business days",
    popular: true,
  },
  {
    slug: "ai-chatbot",
    category: "AI",
    title: "Add an AI chatbot trained on your content",
    description:
      "A branded chat widget that answers from your pages and documents, cites sources and hands off when unsure.",
    worksWith: ["Any website", "WordPress", "Webflow"],
    delivery: "7 business days",
    popular: true,
  },
  {
    slug: "core-web-vitals",
    category: "Speed & SEO",
    title: "Pass Core Web Vitals: fix LCP, INP and CLS",
    description:
      "Slow, jumpy pages fixed in your code for up to three templates, with a before-and-after report.",
    worksWith: ["Next.js", "React", "WordPress"],
    delivery: "5 business days",
    popular: true,
  },
  {
    slug: "landing-page",
    category: "Design & Build",
    title: "A high-converting landing page",
    description: "A fast, responsive landing page designed and built from your brief, ready to run ads to.",
    worksWith: ["Next.js", "Framer", "Webflow"],
    delivery: "5 business days",
  },
  {
    slug: "auth-setup",
    category: "Security",
    title: "Production-ready authentication",
    description: "Email, Google and magic-link sign-in with roles, protected routes and session handling done right.",
    worksWith: ["Next.js", "Supabase", "Clerk"],
    delivery: "4 business days",
  },
  {
    slug: "app-rescue",
    category: "Fixes & rescue",
    title: "Rescue a vibe-coded app",
    description: "I audit an AI-generated codebase, fix the bugs that matter and leave it clean enough to keep building on.",
    worksWith: ["React", "Next.js", "Node.js"],
    delivery: "7 business days",
  },
];

export const serviceCategories = [
  "Payments",
  "AI",
  "Speed & SEO",
  "Design & Build",
  "Stack",
  "Infrastructure",
  "Security",
  "Fixes & rescue",
] as const;

/** Quick "I want to…" shortcuts on the services page; each fills the search box. */
export const serviceIntents: { label: string; query: string }[] = [
  { label: "take payments", query: "stripe" },
  { label: "add AI to my site", query: "ai" },
  { label: "make my site faster", query: "vitals" },
  { label: "launch a landing page", query: "landing" },
  { label: "add secure sign-in", query: "auth" },
  { label: "fix my AI-built app", query: "rescue" },
  { label: "build a SaaS", query: "saas" },
  { label: "automate busywork", query: "automation" },
  { label: "rank higher on Google", query: "seo" },
];

/** Options for the "I need to…" picker. */
export const goals: Goal[] = [
  {
    id: "ai",
    label: "Add AI to my product",
    title: "AI Integration",
    headline: "Add AI features your users actually reach for.",
    proofSlug: "voycap",
    points: [
      { title: "Grounded in your data", body: "Retrieval over your content so answers are accurate, not confidently wrong." },
      { title: "Fast and streaming", body: "Token streaming and edge deployment so responses feel instant." },
      { title: "Safe by design", body: "Rate limits, cost caps and a human in the loop where it matters." },
    ],
  },
  {
    id: "mvp",
    label: "Launch an MVP, fast",
    title: "MVP Build",
    headline: "Go from idea to paying users in weeks, not quarters.",
    proofSlug: "intellisource",
    points: [
      { title: "Scope that ships", body: "We cut to the smallest version that proves the idea." },
      { title: "Real foundations", body: "Auth, billing and a database you won't have to rewrite." },
      { title: "Launch-ready", body: "Analytics, SEO basics and error tracking from day one." },
    ],
  },
  {
    id: "saas",
    label: "Build a real SaaS",
    title: "SaaS Development",
    headline: "A multi-tenant product built to scale with you.",
    proofSlug: "voycap",
    points: [
      { title: "Teams and roles", body: "Organisations, invites and permissions built in." },
      { title: "Subscriptions", body: "Stripe billing with plans, trials and a customer portal." },
      { title: "Admin tools", body: "The internal dashboards you need to run the business." },
    ],
  },
  {
    id: "automate",
    label: "Automate busywork with AI",
    title: "AI Automation",
    headline: "Let agents handle the repetitive work, with you in control.",
    proofSlug: "voycap",
    points: [
      { title: "Connected tools", body: "Email, CRM, sheets and Slack, wired together." },
      { title: "Review queue", body: "Approve actions before they run, or let trusted ones go automatic." },
      { title: "Full audit log", body: "See exactly what ran, when and why." },
    ],
  },
  {
    id: "speed",
    label: "Make my site faster",
    title: "Performance",
    headline: "Pages that load instantly and rank higher.",
    proofSlug: "nohesi",
    points: [
      { title: "Measured first", body: "Field data and a clear report of what is slow and why." },
      { title: "Fixed in code", body: "Images, fonts, scripts and rendering, all tuned." },
      { title: "Proven after", body: "Before-and-after numbers you can show your team." },
    ],
  },
  {
    id: "ecommerce",
    label: "Sell online",
    title: "E-commerce",
    headline: "A storefront that turns visitors into customers.",
    proofSlug: "wokiee",
    points: [
      { title: "Headless or hosted", body: "Shopify, Stripe or custom, whichever fits." },
      { title: "Built to convert", body: "Fast product pages and a checkout with no friction." },
      { title: "Easy to run", body: "Manage products and orders without calling a developer." },
    ],
  },
];

/** "How ordering works" on /services. */
export const orderingSteps: IconStep[] = [
  {
    icon: Search,
    title: "Pick a service",
    body: "Each service has a clear scope, a delivery time and a list of exactly what's included.",
  },
  {
    icon: ClipboardList,
    title: "Send a short brief",
    body: "Two minutes on the contact form. No call needed, though you're welcome to book one.",
  },
  {
    icon: Landmark,
    title: "Get a quote",
    body: "I confirm the brief and the quote, usually the same day. Work starts once you're happy with it.",
  },
  {
    icon: PackageCheck,
    title: "Delivered with a walkthrough",
    body: "You get the finished work, a short video walkthrough and notes on how everything fits together.",
  },
];

/**
 * Larger work quoted per project ("Bigger than a small job?" on /services).
 * Each item links to its detail page in service-pages.ts (matched by name).
 */
export const customBuildGroups: BuildGroup[] = [
  { title: "AI", items: ["AI Integration", "AI Product Development", "AI Chatbots & Assistants", "AI Business Automation"] },
  {
    title: "Build",
    items: ["SaaS Development", "Startup MVP Development", "Web App Development", "E-commerce Development"],
  },
  {
    title: "Stack",
    items: ["Next.js Development", "React Development", "TypeScript Development", "Full-Stack Development", "API Development"],
  },
  { title: "Infrastructure", items: ["Supabase Development", "Cloudflare Workers Development", "Deployment & CI/CD"] },
  {
    title: "Performance & SEO",
    items: ["Web Performance Optimization", "Technical SEO", "Landing Page Development"],
  },
];

/** "Questions about services" on /services. */
export const serviceFaqs: Faq[] = [
  {
    question: "How do services work?",
    answer:
      "Every service has a set scope and delivery time. You send a short brief, I reply with a quote for your exact project, and nothing changes after you agree to it.",
  },
  {
    question: "What if my project needs more than the listed scope?",
    answer:
      "I'll tell you before any work starts. Small extras get added to your quote; anything larger gets its own quote or fits better in a monthly plan.",
  },
  {
    question: "How do I pay?",
    answer:
      "By invoice once your brief and quote are confirmed. I accept bank transfer and the usual online payment options.",
  },
  {
    question: "What if I'm not happy with the result?",
    answer:
      "Each service includes revisions until it matches the agreed scope. If something isn't right, I fix it before the job is closed.",
  },
  {
    question: "Can I order something that isn't listed?",
    answer:
      "Yes. Send a brief describing what you need and I'll reply within one business day with a quote or a better-fitting option.",
  },
  {
    question: "Who owns the code and accounts?",
    answer:
      "You do. Code lives in your repository and every service account is in your name from the start, with no lock-in.",
  },
];
