/**
 * Search strategy: what each page should rank for, in one place.
 *
 * Rules of thumb used here:
 * - One primary search intent per page, so pages don't compete with each other.
 * - Titles stay under ~60 characters including the " | Muhammad Umair Khan" suffix,
 *   descriptions under ~155, so Google shows them in full.
 * - Keywords appear naturally in titles, descriptions and headings. The
 *   `keywords` meta tag is ignored by Google, so it's kept short and honest.
 */

/** Brand and core service terms, used site-wide (meta keywords and structured data). */
export const coreKeywords = [
  "Muhammad Umair Khan",
  "Umair Khan",
  "full stack developer",
  "Next.js developer",
  "React developer",
  "Django developer",
  "Node.js developer",
  "FinTech developer",
  "Web3 developer",
  "hire full stack developer",
  "SaaS developer",
  "AI integration developer",
  "MVP development",
  "web app development",
  "remote developer Pakistan",
];

type PageSeo = {
  /** Shown as "<title> | Muhammad Umair Khan" (the home page uses its title as-is). */
  title: string;
  description: string;
  /** Extra page-specific terms, added to the core keywords. */
  keywords?: string[];
};

export const pageSeo = {
  home: {
    title: "Muhammad Umair Khan | Full Stack Developer",
    description:
      "Full stack developer building scalable React, Next.js, Node.js and Django products across FinTech, gaming, Web3 and AI. Hire me monthly or for a fixed-price project.",
  },
  work: {
    title: "Selected Projects: FinTech, Gaming & Web3",
    description:
      "Case studies of Nohesi.gg, Voycap, Train Like a Ballerina and other full-stack products I built with Next.js, Django, Socket.IO and smart contracts.",
    keywords: ["Next.js portfolio", "FinTech case study", "Web3 case study"],
  },
  services: {
    title: "Web Development Services",
    description:
      "Stripe checkout, AI chatbots, Core Web Vitals fixes and more, each with a clear scope and delivered in days. No hourly rates.",
    keywords: ["web development services", "Stripe integration", "AI chatbot development", "Core Web Vitals fix"],
  },
  pricing: {
    title: "Pricing: Monthly Developer Subscription",
    description:
      "Hire a full stack developer by the month for one flat price with unlimited requests, or book a fixed-price project. Clear numbers up front.",
    keywords: ["developer subscription", "hire developer monthly", "web development pricing"],
  },
  process: {
    title: "How I Work: From Brief to Launch",
    description:
      "How a project runs, from the first call to launch: daily updates, real preview links, tested code in your repo and no lock-in.",
    keywords: ["web development process", "software development workflow"],
  },
  about: {
    title: "About Me: Full Stack Developer",
    description:
      "I'm Muhammad Umair Khan, a full stack developer from Pakistan building React, Next.js, Django and Web3 products for teams worldwide.",
    keywords: ["full-stack developer Pakistan", "React and Next.js engineer"],
  },
  blog: {
    title: "Blog: Next.js, React & AI Engineering Notes",
    description:
      "Practical notes from real builds: Next.js, React, TypeScript, RAG and AI features, debugging stories and code snippets you can reuse.",
    keywords: ["Next.js blog", "React tips", "AI engineering"],
  },
  contact: {
    title: "Hire Me: Start a Project or Book a Call",
    description:
      "Tell me what you're building. Send a project brief for a fixed quote within one business day, or email me to start a conversation.",
    keywords: ["hire freelance developer", "hire React developer"],
  },
} satisfies Record<string, PageSeo>;
