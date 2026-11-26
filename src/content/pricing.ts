import type { ComparisonRow, Faq, Plan, Tier } from "./types";

/** TODO: set your own prices. */
export const plans: Plan[] = [
  {
    id: "subscription",
    name: "Monthly subscription",
    description:
      "A senior developer on call for one flat price. Add as many requests as you like and I ship them one by one.",
    features: [
      "No quotes, ever",
      "Unlimited requests",
      "1 to 2 day turnaround",
      "Pause or cancel anytime",
      "Shared request board",
      "You own all the code",
    ],
    priceLabel: "from",
    price: "$1,490",
    period: "/month",
    cta: { label: "Get started", href: "/pricing#plans" },
    recommended: true,
  },
  {
    id: "project",
    name: "Fixed-price project",
    description:
      "One defined build with a clear finish line. You get a written scope, a timeline and one number before work starts.",
    features: ["Fixed quote in one business day", "Milestone payments", "Launch, handover and support window"],
    priceLabel: "from",
    price: "$1,500",
    cta: { label: "Start a project", href: "/contact" },
  },
];

export const pricingFaqs: Faq[] = [
  {
    question: "How does the subscription work?",
    answer:
      "You add requests to a shared board. I work through them in order, usually shipping each one in a day or two. You can pause or cancel whenever you like.",
  },
  {
    question: "Is there a limit on requests?",
    answer:
      "No. You can add as many as you want. I work on one at a time so each gets full attention and ships quickly.",
  },
  {
    question: "What if I only need one thing built?",
    answer: "Pick a fixed-price project or one of the fixed-price services. You get a scope and a single price up front.",
  },
  {
    question: "Who owns the code?",
    answer: "You do. Everything lives in your repository from day one, with no lock-in.",
  },
];

/** Monthly subscription tiers shown on /pricing. */
export const tiers: Tier[] = [
  {
    id: "care",
    name: "Care",
    tagline: "Keep a live site healthy and moving.",
    price: "$790",
    turnaround: "Small tasks in 2 to 3 business days",
    features: [
      "Unlimited requests, one at a time",
      "Bug fixes, content and page updates",
      "Performance, security and dependency upkeep",
      "Uptime and error monitoring",
      "Pause or cancel anytime",
    ],
    bestFor: "Businesses with a site or app that needs steady fixes and small improvements.",
  },
  {
    id: "build",
    name: "Build",
    tagline: "A senior developer on your team, without the hire.",
    price: "$1,490",
    turnaround: "Most requests in 1 to 2 business days",
    features: [
      "Everything in Care",
      "New features, pages and integrations",
      "AI features and automations",
      "Weekly async video update",
      "Your repo, your code, from day one",
    ],
    bestFor: "Founders and teams shipping new features every week.",
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Twice the throughput for a busy roadmap.",
    price: "$2,490",
    turnaround: "Two requests in progress at a time",
    features: [
      "Everything in Build",
      "Two active requests at a time",
      "Priority turnaround",
      "Monthly roadmap call",
      "Architecture and code reviews",
    ],
    bestFor: "Products with a long roadmap that want two things moving at once.",
  },
];

/** What a fixed-price project includes, shown in the second pricing tab. */
export const projectIncludes: string[] = [
  "Written scope and fixed quote within one business day",
  "Milestone payments, never everything up front",
  "Weekly demos on a live link",
  "Tests, documentation and a clean handover",
  "30-day support window after launch",
];

export const comparison: ComparisonRow[] = [
  { label: "Pricing", subscription: "One flat monthly price", project: "Fixed quote per project" },
  { label: "Getting started", subscription: "Same day, no scoping call", project: "Scope and quote in 1 business day" },
  { label: "Changing your mind", subscription: "Re-order the queue anytime, free", project: "Changes are re-quoted first" },
  { label: "Best for", subscription: "Ongoing work and evolving roadmaps", project: "One defined build with a clear end" },
  { label: "Commitment", subscription: "Pause or cancel anytime", project: "Deposit and milestone payments" },
];
