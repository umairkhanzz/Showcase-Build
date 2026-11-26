import type { Service, ServicePage } from "./types";
import { services } from "./services";

/**
 * Detail pages for every service, at /services/[slug]: first the quick services
 * (same slugs as `services` in services.ts), then each custom build listed under
 * "Bigger than a small job?" on /services. There are no prices here on purpose:
 * every project is scoped and quoted after a short brief.
 *
 * `title` must match the item in `customBuildGroups` (services.ts) and, where a
 * project proves it, that project's `caseStudy.serviceType` (projects.ts).
 */
export const servicePages: ServicePage[] = [
  // ─── Quick services (slugs match `services` in services.ts) ──────────
  {
    slug: "stripe-checkout",
    title: "Add Stripe Checkout to your website",
    group: "Payments",
    timeline: "3 business days",
    headline: "Take payments on your site, the right way.",
    intro:
      "Cards, Apple Pay and Google Pay on your website through Stripe Checkout, with verified webhooks so every paid order is recorded and fulfilled, even if the customer closes the tab.",
    overview: [
      "Adding a payment button is easy. Making sure every payment actually turns into an order is not. Most broken setups rely on the customer landing back on a thank-you page, so orders go missing when they close the tab or their connection drops.",
      "I set up Stripe Checkout with server-side sessions and signed webhooks, so your system records the order the moment Stripe confirms payment. You get receipts, refunds and test mode set up, and a clear handover of how it all fits together.",
    ],
    benefits: [
      { title: "Every payment method", body: "Cards, Apple Pay, Google Pay and local methods Stripe supports, with no extra work." },
      { title: "No missing orders", body: "Signed webhooks record each paid order on your server, not in the browser." },
      { title: "Secure by default", body: "Card details never touch your server, so you stay out of PCI scope." },
    ],
    goodFit: [
      "Sites selling products, bookings or digital downloads",
      "Businesses still taking payment by invoice or bank transfer",
      "Apps with a checkout that sometimes loses orders",
    ],
    included: [
      "Stripe account review and product setup",
      "Server-side Checkout sessions",
      "Signed webhook handler for paid orders",
      "Success, cancel and receipt emails",
      "Test-mode run-through of every flow",
      "Handover notes and a walkthrough video",
    ],
    steps: [
      { title: "Set up", body: "Review your Stripe account and products, and agree what should happen after payment." },
      { title: "Integrate", body: "Add Checkout and the webhook handler to your site, tested end to end in test mode." },
      { title: "Go live", body: "Switch to live keys, make a real test payment and hand everything over." },
    ],
    stack: ["Stripe", "Next.js", "React", "Node.js"],
    faqs: [
      { question: "Do I need a Stripe account first?", answer: "It helps, but I can guide you through creating one. It stays in your name." },
      { question: "Can it handle subscriptions?", answer: "This service covers one-off payments. Subscriptions are a bigger job that I'm happy to scope separately." },
      { question: "Does it work with my website builder?", answer: "It's built for code-based sites like Next.js, React and Node.js. For other platforms, send me a brief and I'll check." },
    ],
  },
  {
    slug: "ai-chatbot",
    title: "Add an AI chatbot trained on your content",
    group: "AI",
    timeline: "7 business days",
    headline: "Answer customer questions around the clock.",
    intro:
      "A branded chat widget that answers from your own pages and documents, cites its sources, and hands off to you when it isn't sure. Add it to any website with one line of code.",
    overview: [
      "Customers ask the same questions again and again: pricing, shipping, how something works. A chatbot trained on your content answers them instantly, any time of day, so you and your team only handle the questions that need a person.",
      "Unlike generic bots, this one only answers from your own content and links to where the answer came from. When it doesn't know, it says so and offers a way to reach you.",
    ],
    benefits: [
      { title: "Trained on your content", body: "Your pages, PDFs and FAQs, indexed so answers are accurate." },
      { title: "Cites its sources", body: "Every answer links back to the page it came from, so customers can check." },
      { title: "Hands off gracefully", body: "Passes the conversation to you by email or form when it's unsure." },
    ],
    goodFit: [
      "Businesses answering the same questions every day",
      "Sites with lots of content that's hard to search",
      "Teams who want support outside office hours",
    ],
    included: [
      "Content indexing from your site and documents",
      "Branded chat widget matched to your site",
      "Source links on every answer",
      "Human handoff by email or form",
      "Conversation log you can review",
      "Install on your site and a walkthrough",
    ],
    steps: [
      { title: "Gather", body: "Collect the pages and documents it should learn from and agree what it should avoid." },
      { title: "Train and test", body: "Index the content and test it on real customer questions." },
      { title: "Install", body: "Add the widget to your site and review the first conversations together." },
    ],
    stack: ["OpenAI", "Claude", "pgvector", "Next.js"],
    faqs: [
      { question: "Will it work on WordPress or Webflow?", answer: "Yes. The widget is a single script tag, so it works on almost any website." },
      { question: "What if it gives a wrong answer?", answer: "It only answers from your content and says when it isn't sure. You can review conversations and fix gaps in the content." },
      { question: "How do I update what it knows?", answer: "Add or remove pages and documents, and it re-learns them. I'll show you how." },
    ],
  },
  {
    slug: "core-web-vitals",
    title: "Pass Core Web Vitals: fix LCP, INP and CLS",
    group: "Speed & SEO",
    timeline: "5 business days",
    headline: "Fast, stable pages that pass Google's checks.",
    intro:
      "Slow, jumpy pages fixed in your code for up to three page templates, with a before-and-after report and Search Console validation.",
    overview: [
      "Core Web Vitals are Google's measure of how fast and stable your pages feel to real users: how quickly the main content appears (LCP), how fast the page responds to taps and clicks (INP), and how much it jumps around while loading (CLS).",
      "Failing them hurts both rankings and conversions. I find the exact causes on your most important templates and fix them in the code, then validate the fix in Search Console.",
    ],
    benefits: [
      { title: "Faster loading", body: "Images, fonts and critical content load first, so pages appear quickly." },
      { title: "Snappier interactions", body: "Heavy scripts trimmed so taps and clicks respond right away." },
      { title: "No layout jumps", body: "Space reserved for images, ads and embeds, so nothing shifts." },
    ],
    goodFit: [
      "Sites flagged as \"poor\" or \"needs improvement\" in Search Console",
      "Stores and landing pages where speed affects sales",
      "Teams who tried plugins and still fail the checks",
    ],
    included: [
      "Audit of up to three page templates",
      "LCP fixes: images, fonts and server response",
      "INP fixes: scripts and main-thread work",
      "CLS fixes: reserved space and stable layout",
      "Before-and-after report",
      "Search Console validation started",
    ],
    steps: [
      { title: "Measure", body: "Pull real-user data and lab tests to find what's failing and why." },
      { title: "Fix", body: "Make the changes directly in your code, template by template." },
      { title: "Prove", body: "Re-test, start validation in Search Console and share the report." },
    ],
    stack: ["Lighthouse", "Chrome DevTools", "Next.js", "React", "WordPress"],
    faqs: [
      { question: "How long until Search Console shows a pass?", answer: "Google uses 28 days of real-user data, so the status updates over the following weeks. Lab scores improve right away." },
      { question: "What if my site has more than three templates?", answer: "Three templates usually covers most traffic. More can be added to the scope before we start." },
      { question: "Will you change my design?", answer: "No. The fixes are under the hood. Your pages look the same, just faster." },
    ],
  },
  {
    slug: "landing-page",
    title: "A high-converting landing page",
    group: "Design & Build",
    timeline: "5 business days",
    headline: "One page, one goal, built to convert.",
    intro:
      "A fast, responsive landing page designed and built from your brief, ready for ads, launches and email campaigns, with tracking set up from day one.",
    overview: [
      "A good landing page does one thing: gets the visitor to take the next step. That means a clear headline, proof that builds trust, answers to the obvious objections, and a single call to action.",
      "I design and build the page from your brief, make sure it loads quickly on phones, and connect your forms and analytics so you can see exactly how it performs.",
    ],
    benefits: [
      { title: "Clear message", body: "A structure that leads visitors from headline to action." },
      { title: "Fast on every device", body: "Lightweight and responsive, so ad clicks don't bounce." },
      { title: "Tracked from day one", body: "Analytics and conversion events ready before you launch." },
    ],
    goodFit: [
      "Product launches, waitlists and events",
      "Paid ad campaigns that need a focused page",
      "Businesses testing a new offer quickly",
    ],
    included: [
      "Page structure and copy guidance",
      "Custom design matched to your brand",
      "Responsive build",
      "Form or email signup connected",
      "SEO metadata and social share image",
      "Analytics and conversion tracking",
    ],
    steps: [
      { title: "Brief", body: "Agree the audience, offer and the one action the page should drive." },
      { title: "Design and build", body: "Share a live preview link and refine it with your feedback." },
      { title: "Launch", body: "Connect your domain, forms and tracking, and go live." },
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer", "Webflow"],
    faqs: [
      { question: "Do you write the copy?", answer: "I give you the structure and guidance for each section. You provide the final words, since you know your customers best." },
      { question: "Can I edit it after launch?", answer: "Yes. On Framer or Webflow you can edit it visually; on Next.js I can add simple editable content." },
      { question: "Do I need my own domain?", answer: "It helps. I can launch it on your main domain, a subdomain, or a new domain you buy." },
    ],
  },
  {
    slug: "auth-setup",
    title: "Production-ready authentication",
    group: "Security",
    timeline: "4 business days",
    headline: "Sign-in that's secure, simple and done right.",
    intro:
      "Email, Google and magic-link sign-in with roles, protected routes and proper session handling, so only the right people see the right data.",
    overview: [
      "Authentication looks simple until it isn't: sessions that never expire, pages that load before checking who you are, admin screens anyone can reach with the right URL. These gaps are some of the most common security problems in new apps.",
      "I set up sign-in with a proven provider, protect every route and API on the server, and add roles so admins, members and customers each see only what they should.",
    ],
    benefits: [
      { title: "Easy sign-in", body: "Email, Google and magic links, so users sign in the way they prefer." },
      { title: "Protected everywhere", body: "Checks on the server for pages and APIs, not just hidden buttons." },
      { title: "Roles that work", body: "Admins, members and customers each see the right screens and data." },
    ],
    goodFit: [
      "New apps adding user accounts for the first time",
      "Apps with sign-in that feels fragile or insecure",
      "Products adding admin or team roles",
    ],
    included: [
      "Auth provider setup (Supabase, Clerk or similar)",
      "Email, Google and magic-link sign-in",
      "Protected routes and API checks",
      "Roles and permissions",
      "Session handling and sign-out",
      "Security review of the flow",
    ],
    steps: [
      { title: "Plan", body: "Choose the provider and agree the roles and what each can access." },
      { title: "Build", body: "Add sign-in, protect routes and APIs, and wire up roles." },
      { title: "Test", body: "Check every flow and try to break it before handing over." },
    ],
    stack: ["Next.js", "Supabase", "Clerk", "TypeScript"],
    faqs: [
      { question: "Which auth provider should I use?", answer: "Supabase Auth and Clerk are both great. I'll recommend one based on your stack and budget." },
      { question: "Can you add it to an existing app?", answer: "Yes. Most auth jobs are added to apps that already exist." },
      { question: "Can users already signed up be kept?", answer: "Usually, yes. Existing users can be migrated so nobody has to sign up again." },
    ],
  },
  {
    slug: "app-rescue",
    title: "Rescue a vibe-coded app",
    group: "Fixes & rescue",
    timeline: "7 business days",
    headline: "Turn your AI-built app into something you can trust.",
    intro:
      "I audit an app built with AI tools like Lovable, Bolt or Cursor, fix the bugs and security holes that matter, and leave it clean enough to keep building on.",
    overview: [
      "AI tools are great for getting an app working fast. But they often leave behind exposed keys, missing database rules, broken edge cases and code that's hard to change without something else breaking.",
      "I go through the app with a developer's eye, fix what's risky first, tidy up the structure, and explain what I changed so you can keep building with confidence.",
    ],
    benefits: [
      { title: "Security holes closed", body: "Exposed keys, open database rules and missing checks fixed first." },
      { title: "Bugs that matter fixed", body: "The issues users actually hit, found and fixed at the source." },
      { title: "Clean to build on", body: "A tidier structure so new features stop breaking old ones." },
    ],
    goodFit: [
      "Founders who built an app with Lovable, Bolt, v0 or Cursor",
      "Apps about to launch or take real payments",
      "Projects where every new change breaks something else",
    ],
    included: [
      "Code and security audit",
      "Database rules and exposed key fixes",
      "Fixes for the most important bugs",
      "Code cleanup and structure",
      "Error tracking set up",
      "A written report of what was changed",
    ],
    steps: [
      { title: "Audit", body: "Review the code, database and hosting, and list the risks in priority order." },
      { title: "Fix", body: "Close security holes first, then fix the bugs that matter most." },
      { title: "Hand over", body: "Share a report of what changed and what to watch out for next." },
    ],
    stack: ["React", "Next.js", "Node.js", "Supabase", "Firebase"],
    faqs: [
      { question: "Which AI tools do you work with?", answer: "Lovable, Bolt, v0, Replit, Cursor and similar. If it produces React or Node.js code, I can work with it." },
      { question: "Will you rewrite my whole app?", answer: "No. I fix what's risky and broken, and keep what works." },
      { question: "Can I keep using AI tools afterwards?", answer: "Yes. I'll leave notes on how to keep the codebase healthy as you keep building." },
    ],
  },

  // ─── AI ───────────────────────────────────────────────────────────────
  {
    slug: "ai-integration",
    title: "AI Integration",
    group: "AI",
    timeline: "2 to 4 weeks",
    headline: "AI features your users actually reach for.",
    intro:
      "I add AI to the product you already have: search, summaries, assistants and smart automations that are grounded in your data, fast, and safe to run in production.",
    overview: [
      "AI integration means wiring a language model into your existing app so it does something genuinely useful: answering questions from your content, drafting text, classifying requests or pulling structured data out of messy input.",
      "The hard part is not calling an API. It's grounding answers in your data so they're right, streaming them so they feel instant, and putting limits in place so costs and mistakes stay under control. That's the part I focus on.",
    ],
    benefits: [
      { title: "Grounded in your data", body: "Retrieval over your own content, so answers are accurate and cite where they came from." },
      { title: "Fast and streaming", body: "Token streaming and edge deployment so responses start in well under a second." },
      { title: "Safe by design", body: "Rate limits, cost caps, logging and a human in the loop where it matters." },
    ],
    goodFit: [
      "Products that want AI features without rebuilding the app",
      "Teams with a lot of content, docs or data users struggle to search",
      "Founders who tried a quick prototype and need it production-ready",
    ],
    included: [
      "Use-case review and model selection",
      "Retrieval (RAG) over your content with embeddings",
      "Streaming UI built into your existing app",
      "Prompt design, evaluation and guardrails",
      "Usage limits, cost tracking and logging",
      "Handover notes and a walkthrough video",
    ],
    steps: [
      { title: "Scope", body: "Pick the one AI feature that will matter most and define what a good answer looks like." },
      { title: "Build", body: "Wire up retrieval, prompts and the UI, tested against real questions from your users." },
      { title: "Harden", body: "Add limits, monitoring and fallbacks, then ship it behind a flag before going live." },
    ],
    stack: ["OpenAI", "Claude", "pgvector", "Next.js", "Vercel AI SDK", "Cloudflare Workers"],
    faqs: [
      { question: "Which AI model do you use?", answer: "Whichever fits the job. I usually compare a couple of models on your real data and pick on accuracy, speed and running cost." },
      { question: "Will my data be used to train the model?", answer: "No. I use API tiers that don't train on your data, and sensitive data can stay in your own database." },
      { question: "Can you add AI to an app you didn't build?", answer: "Yes. Most integrations go into an existing codebase. I review it first and fit the feature around how it already works." },
    ],
  },
  {
    slug: "ai-product-development",
    title: "AI Product Development",
    group: "AI",
    timeline: "6 to 10 weeks",
    headline: "An AI-first product, built from idea to launch.",
    intro:
      "When AI is the product, not a feature, the whole stack has to be designed around it. I build AI products end to end: data pipeline, model layer, interface and the infrastructure to run it affordably.",
    overview: [
      "An AI product lives or dies on the quality of its answers and how fast they arrive. That means thinking about data ingestion, indexing, prompt design and caching from day one, not bolting them on later.",
      "I build the full product: the pipeline that collects and cleans your data, the search or generation layer on top, and a clean interface people want to come back to, all deployed to run cheaply at scale.",
    ],
    benefits: [
      { title: "End-to-end build", body: "Data pipeline, AI layer, frontend and deployment, from one developer who owns all of it." },
      { title: "Quality you can measure", body: "Evaluation sets so you know the answers are getting better, not just different." },
      { title: "Runs affordably", body: "Caching, smaller models where they're enough, and edge hosting to keep running costs low." },
    ],
    goodFit: [
      "Founders with an AI product idea who need a technical partner",
      "Teams turning an internal AI prototype into a real product",
      "Anyone building search, recommendations or assistants over large datasets",
    ],
    included: [
      "Product scoping and architecture",
      "Data ingestion and indexing pipeline",
      "AI search, generation or agent layer",
      "Production web app with auth",
      "Evaluation, monitoring and cost controls",
      "Deployment, docs and handover",
    ],
    steps: [
      { title: "Prototype", body: "Prove the core AI loop works on real data before building anything around it." },
      { title: "Build", body: "Turn the prototype into a product: pipeline, interface, accounts and analytics." },
      { title: "Launch", body: "Ship with monitoring and evaluation in place, then iterate on what users actually do." },
    ],
    stack: ["Next.js", "TypeScript", "Python", "Cloudflare Workers", "D1", "pgvector"],
    faqs: [
      { question: "How long does an AI product take to build?", answer: "A focused first version usually takes a few weeks. I'll give you a clear timeline once the scope is agreed." },
      { question: "Do I need my own data?", answer: "It helps, but it isn't required. Many products start from public data, which I can help you collect and clean." },
      { question: "Can it grow after launch?", answer: "Yes. Everything is built in a codebase you own, and many clients keep working with me on a monthly plan after launch." },
    ],
  },
  {
    slug: "ai-chatbots-assistants",
    title: "AI Chatbots & Assistants",
    group: "AI",
    timeline: "1 to 2 weeks",
    headline: "An assistant that knows your business.",
    intro:
      "A branded chat assistant trained on your own pages, docs and policies. It answers customers and staff accurately, cites its sources and hands off to a human when it isn't sure.",
    overview: [
      "Most chatbots frustrate people because they guess. A good assistant only answers from what it knows, says so when it doesn't, and makes it easy to reach a real person.",
      "I build assistants for websites, help centres and internal teams, connected to your content and the tools you already use, with a dashboard so you can see what people are asking.",
    ],
    benefits: [
      { title: "Answers from your content", body: "Trained on your site, docs and FAQs, with links back to the source." },
      { title: "Knows when to hand off", body: "Escalates to email, a form or live chat when a question is out of scope." },
      { title: "Insight into questions", body: "See what customers ask most so you can improve your content and product." },
    ],
    goodFit: [
      "Businesses answering the same customer questions every day",
      "SaaS products with docs users don't read",
      "Teams wanting an internal assistant over policies and knowledge bases",
    ],
    included: [
      "Content ingestion from your site and documents",
      "Branded chat widget for any website",
      "Source citations and confidence handling",
      "Human handoff flow",
      "Conversation log and analytics",
      "Simple process to update its knowledge",
    ],
    steps: [
      { title: "Collect", body: "Gather the content the assistant should know and decide what it should never answer." },
      { title: "Train and test", body: "Index the content and test against real questions until the answers are right." },
      { title: "Embed", body: "Add the widget to your site, connect handoff, and review the first conversations with you." },
    ],
    stack: ["OpenAI", "Claude", "pgvector", "Next.js", "Edge Functions"],
    faqs: [
      { question: "Will it work on my website builder?", answer: "Yes. The widget is one script tag, so it works on WordPress, Webflow, Shopify, Framer or a custom site." },
      { question: "What happens when it doesn't know?", answer: "It says so, and offers a way to reach you instead of making something up." },
      { question: "How do I keep it up to date?", answer: "New pages can be picked up automatically, and documents can be added or removed whenever you like." },
    ],
  },
  {
    slug: "ai-business-automation",
    title: "AI Business Automation",
    group: "AI",
    timeline: "2 to 4 weeks",
    headline: "Let AI agents handle the busywork, with you in control.",
    intro:
      "I automate the repetitive work that eats your week: sorting email, updating the CRM, preparing reports and moving data between tools, with a review step for anything that matters.",
    overview: [
      "Plenty of daily work is the same steps over and over: read something, decide what it is, update a few systems. AI agents can now do most of that reliably, as long as they're set up with clear rules and oversight.",
      "I map the workflow with you, connect the tools involved, and build agents that do the work and show you exactly what they did. Trusted actions run automatically; risky ones wait for approval.",
    ],
    benefits: [
      { title: "Connected tools", body: "Email, CRM, spreadsheets, Slack and your own systems, wired together." },
      { title: "Review queue", body: "Approve actions before they run, or let trusted ones go automatic." },
      { title: "Full audit log", body: "See what ran, when, and why, so nothing happens behind your back." },
    ],
    goodFit: [
      "Small teams spending hours a week on copy-paste admin",
      "Operations-heavy businesses with repeatable processes",
      "Anyone who has outgrown Zapier for anything needing judgement",
    ],
    included: [
      "Workflow mapping and automation plan",
      "Integrations with your existing tools",
      "AI agents with clear rules and limits",
      "Approval queue and notifications",
      "Audit log and error alerts",
      "Documentation and a walkthrough",
    ],
    steps: [
      { title: "Map", body: "Walk through the workflow together and pick the steps worth automating first." },
      { title: "Automate", body: "Build the agents and integrations, running in review mode to start." },
      { title: "Hand over", body: "Switch trusted steps to automatic once the results are proven." },
    ],
    stack: ["Node.js", "TypeScript", "Claude", "PostgreSQL", "Cloudflare Workers"],
    faqs: [
      { question: "Is it safe to let AI act on my systems?", answer: "Every agent has narrow permissions, and anything with real consequences goes through an approval step first." },
      { question: "Which tools can you connect?", answer: "Anything with an API, which covers most email, CRM, spreadsheet, chat and accounting tools." },
      { question: "What if a step fails?", answer: "You get an alert, the item goes back to the queue, and nothing is half-done silently." },
    ],
  },

  // ─── Build ────────────────────────────────────────────────────────────
  {
    slug: "saas-development",
    title: "SaaS Development",
    group: "Design & Build",
    timeline: "8 to 12 weeks",
    headline: "A SaaS product built to scale with you.",
    intro:
      "Multi-tenant apps with accounts, teams, billing and admin tools done properly from the start, so you can focus on the features that make your product different.",
    overview: [
      "Every SaaS needs the same foundation: sign-in, organisations and roles, subscriptions, emails, an admin area. Getting these wrong is expensive to fix later, and getting them right takes time away from your actual product.",
      "I build that foundation on a proven stack and then build your core features on top, in a codebase that's clean enough for you or another developer to keep growing.",
    ],
    benefits: [
      { title: "Teams and roles", body: "Organisations, invites and permissions built in from day one." },
      { title: "Subscriptions", body: "Stripe billing with plans, trials and a customer portal." },
      { title: "Admin tools", body: "The internal dashboards you need to run and support the business." },
    ],
    goodFit: [
      "Founders validating a SaaS idea with real paying users",
      "Businesses turning an internal tool into a product",
      "Teams replacing a prototype that won't scale",
    ],
    included: [
      "Architecture and data model",
      "Authentication, teams and roles",
      "Stripe subscriptions and billing portal",
      "Core product features",
      "Transactional email and notifications",
      "Admin dashboard, analytics and error tracking",
    ],
    steps: [
      { title: "Plan", body: "Agree the data model, user roles and the smallest feature set worth launching." },
      { title: "Build", body: "Weekly releases to a live staging URL so you see progress from the first week." },
      { title: "Launch", body: "Production deploy, monitoring and a handover of everything, in your name." },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Resend"],
    faqs: [
      { question: "Do I own the code?", answer: "Yes. It lives in your repository and every service account is in your name from day one." },
      { question: "Can you work with my existing designs?", answer: "Yes. I can build from Figma files, or design a clean interface if you don't have one yet." },
      { question: "What happens after launch?", answer: "You can take it in-house, or keep me on a monthly plan for new features and fixes." },
    ],
  },
  {
    slug: "startup-mvp-development",
    title: "Startup MVP Development",
    group: "Design & Build",
    timeline: "4 to 6 weeks",
    headline: "From idea to paying users in weeks, not quarters.",
    intro:
      "I help founders cut an idea down to the smallest version that proves it, then build it on foundations that won't need a rewrite when it works.",
    overview: [
      "An MVP is not a cheap version of the full product. It's the smallest thing that tests your riskiest assumption with real users. Most of the work is deciding what to leave out.",
      "Once that's clear, I build fast on a stack I know well: real auth, a real database and payments if you need them, so the MVP can grow into the product instead of being thrown away.",
    ],
    benefits: [
      { title: "Scope that ships", body: "We cut to the core loop that proves the idea, and park the rest." },
      { title: "Real foundations", body: "Auth, billing and a database you won't have to rewrite later." },
      { title: "Launch-ready", body: "Analytics, SEO basics and error tracking from day one." },
    ],
    goodFit: [
      "Non-technical founders who need a technical partner",
      "Founders with a waitlist or early customers ready to try it",
      "Teams testing a new product line quickly",
    ],
    included: [
      "Scoping workshop and feature list",
      "Simple, clean UI design",
      "Core product features",
      "Auth, database and payments if needed",
      "Analytics and error tracking",
      "Launch support and handover",
    ],
    steps: [
      { title: "Cut", body: "Turn the idea into a short list of must-have features and a clear success metric." },
      { title: "Build", body: "Ship to a live URL early and iterate weekly with your feedback." },
      { title: "Launch", body: "Go live, watch how people use it, and plan the next round from real data." },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    faqs: [
      { question: "How fast can an MVP launch?", answer: "Most focused MVPs launch in a few weeks. The tighter the scope, the sooner you're learning from real users." },
      { question: "I'm not technical. Is that a problem?", answer: "Not at all. I explain decisions in plain language and you'll see working software every week." },
      { question: "Will I need to rebuild it later?", answer: "It's built on production-grade tools, so the plan is to grow it, not replace it." },
    ],
  },
  {
    slug: "web-app-development",
    title: "Web App Development",
    group: "Design & Build",
    timeline: "4 to 8 weeks",
    headline: "Custom web apps that are fast, reliable and easy to use.",
    intro:
      "Dashboards, portals, booking systems and internal tools, built around how your team or customers actually work rather than forced into an off-the-shelf product.",
    overview: [
      "When spreadsheets and generic tools stop fitting, a custom web app can save hours every week. It does exactly what you need, nothing more, and works on every device without installing anything.",
      "I handle the whole build: data model, interface, integrations and hosting, with a focus on speed and a clean experience people don't need training to use.",
    ],
    benefits: [
      { title: "Built around your workflow", body: "Screens and data shaped by how you work, not by a template." },
      { title: "Fast everywhere", body: "Server rendering and smart caching so it feels instant on any device." },
      { title: "Connected", body: "Integrates with the tools and APIs you already rely on." },
    ],
    goodFit: [
      "Businesses running key processes on spreadsheets",
      "Companies needing a customer or partner portal",
      "Teams whose off-the-shelf tool has become a workaround",
    ],
    included: [
      "Requirements and data modelling",
      "Responsive UI design and build",
      "Authentication and permissions",
      "Integrations and APIs",
      "Hosting, backups and monitoring",
      "Documentation and training walkthrough",
    ],
    steps: [
      { title: "Discover", body: "Map how the work happens today and where the app will save the most time." },
      { title: "Build", body: "Develop in short cycles with a live preview you can click through." },
      { title: "Roll out", body: "Migrate data, train your team and launch with support close by." },
    ],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase"],
    faqs: [
      { question: "Can you move our data from spreadsheets?", answer: "Yes. Data migration is part of the build, with checks so nothing goes missing." },
      { question: "Will it work on phones?", answer: "Yes. Every screen is designed to work on phones, tablets and desktops." },
      { question: "Who hosts it?", answer: "It runs on accounts in your name, usually Vercel or Cloudflare, so you're never locked in." },
    ],
  },
  {
    slug: "e-commerce-development",
    title: "E-commerce Development",
    group: "Design & Build",
    timeline: "4 to 8 weeks",
    headline: "A storefront that turns visitors into customers.",
    intro:
      "Fast, conversion-focused online stores on Shopify, Stripe or a headless setup, built so product pages load instantly and checkout has no friction.",
    overview: [
      "Every extra second of load time costs sales. Most stores are slowed down by heavy themes, too many apps and unoptimised images. A fast store isn't a luxury; it's revenue.",
      "I build stores that load quickly, rank well and are easy to run day to day, whether that's a tuned Shopify theme, a headless storefront, or a custom checkout with Stripe.",
    ],
    benefits: [
      { title: "Headless or hosted", body: "Shopify, Stripe or custom, whichever fits your products and budget." },
      { title: "Built to convert", body: "Fast product pages, clear navigation and a checkout with no friction." },
      { title: "Easy to run", body: "Manage products, stock and orders without calling a developer." },
    ],
    goodFit: [
      "Brands whose current store feels slow or dated",
      "Businesses moving from marketplaces to their own store",
      "Shopify stores outgrowing their theme",
    ],
    included: [
      "Store architecture and platform choice",
      "Product, collection and cart pages",
      "Checkout and payment setup",
      "Product SEO and structured data",
      "Analytics and conversion tracking",
      "Training on managing the store",
    ],
    steps: [
      { title: "Plan", body: "Choose the right platform and map products, collections and customer journeys." },
      { title: "Build", body: "Design and develop the store with speed and conversion in mind." },
      { title: "Launch", body: "Migrate products, test checkout end to end and go live safely." },
    ],
    stack: ["Next.js", "Shopify", "Stripe", "Tailwind CSS", "Vercel"],
    faqs: [
      { question: "Shopify or headless?", answer: "Shopify on its own suits most stores. Headless makes sense when speed and custom design really matter. I'll recommend one honestly." },
      { question: "Can you migrate my existing store?", answer: "Yes. Products, customers and orders can be moved, with redirects so you keep your search rankings." },
      { question: "Will I be able to update it myself?", answer: "Yes. Products, prices and content are all editable without touching code." },
    ],
  },

  // ─── Stack ────────────────────────────────────────────────────────────
  {
    slug: "nextjs-development",
    title: "Next.js Development",
    group: "Stack",
    timeline: "1 to 6 weeks",
    headline: "Next.js apps that are fast, SEO-friendly and built right.",
    intro:
      "Next.js is my main tool. I build new apps and sites with it, upgrade older ones to the latest version, and fix the performance and caching problems that creep into growing codebases.",
    overview: [
      "Next.js gives you server rendering, routing, caching and image optimisation out of the box, but each version changes how they work. Using them well is the difference between a fast app and a confusing one.",
      "I keep up with every release, so you get a codebase that uses current patterns, loads quickly and is straightforward for the next developer to pick up.",
    ],
    benefits: [
      { title: "Fast by default", body: "Server components, streaming and caching tuned for real performance." },
      { title: "SEO built in", body: "Metadata, sitemaps and structured data handled properly from the start." },
      { title: "Up to date", body: "Current App Router patterns, not outdated workarounds." },
    ],
    goodFit: [
      "New projects that need speed and good SEO",
      "Teams stuck on an old Next.js version",
      "Apps with slow pages or confusing caching bugs",
    ],
    included: [
      "New builds or migrations to the App Router",
      "Version upgrades and dependency cleanup",
      "Caching and rendering strategy",
      "Performance and Core Web Vitals tuning",
      "Metadata, sitemaps and structured data",
      "Deployment setup",
    ],
    steps: [
      { title: "Review", body: "Audit the current setup, or plan the structure for a new build." },
      { title: "Build", body: "Develop or migrate in small, tested steps with preview deployments." },
      { title: "Ship", body: "Deploy, measure performance and hand over clear notes." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    faqs: [
      { question: "Can you upgrade our existing Next.js app?", answer: "Yes. I upgrade in safe steps, fixing breaking changes as I go, so the app keeps working throughout." },
      { question: "Pages Router or App Router?", answer: "New work uses the App Router. Existing Pages Router apps can be migrated gradually, route by route." },
      { question: "Do I have to host on Vercel?", answer: "No. Next.js runs well on Cloudflare, Netlify, or your own servers too." },
    ],
  },
  {
    slug: "react-development",
    title: "React Development",
    group: "Stack",
    timeline: "2 to 6 weeks",
    headline: "React interfaces people enjoy using.",
    intro:
      "Clean, accessible React frontends: dashboards, design systems and complex interactive screens, built with components your team can reuse and maintain.",
    overview: [
      "React makes it easy to start and easy to make a mess. Over time, apps slow down, components get tangled and small changes break unexpected things.",
      "I build React frontends with a clear structure, well-tested components and sensible data fetching, so the interface stays fast and the codebase stays pleasant to work in.",
    ],
    benefits: [
      { title: "Reusable components", body: "A consistent component library that speeds up every future screen." },
      { title: "Smooth and fast", body: "Smart data fetching and rendering so complex screens stay responsive." },
      { title: "Accessible", body: "Keyboard support, focus handling and screen-reader friendly markup." },
    ],
    goodFit: [
      "Products with complex dashboards or data-heavy screens",
      "Teams needing a design system or component library",
      "Apps where the frontend has become slow or fragile",
    ],
    included: [
      "Component architecture and design system",
      "Pixel-accurate builds from Figma",
      "State and data fetching setup",
      "Accessibility checks",
      "Component docs in Storybook",
      "Tests for critical flows",
    ],
    steps: [
      { title: "Structure", body: "Plan components, state and data flow before writing screens." },
      { title: "Build", body: "Develop components and screens with previews you can review." },
      { title: "Document", body: "Leave a documented library your team can keep building with." },
    ],
    stack: ["React", "TypeScript", "TanStack Query", "Storybook", "Tailwind CSS"],
    faqs: [
      { question: "Can you work with our backend team?", answer: "Yes. I regularly build frontends against existing APIs and work alongside backend developers." },
      { question: "Do you build from Figma?", answer: "Yes. I build from Figma closely and flag anything that won't work well in the browser." },
      { question: "Can you fix a slow React app?", answer: "Yes. I profile it, find what's re-rendering or over-fetching, and fix it at the source." },
    ],
  },
  {
    slug: "typescript-development",
    title: "TypeScript Development",
    group: "Stack",
    timeline: "1 to 4 weeks",
    headline: "Codebases that catch bugs before your users do.",
    intro:
      "I write TypeScript across the whole stack and help teams move JavaScript projects to TypeScript, with strict types that prevent whole classes of bugs.",
    overview: [
      "TypeScript turns many runtime errors into editor warnings. It makes refactoring safer, onboarding faster and APIs self-documenting.",
      "Whether it's a new project or a gradual migration, I set up strict, practical types that help rather than get in the way, and validate data at the edges where types alone can't help.",
    ],
    benefits: [
      { title: "Fewer bugs", body: "Strict types catch mistakes while you're writing the code, not in production." },
      { title: "Safer changes", body: "Refactor confidently, knowing the compiler will flag what you missed." },
      { title: "Validated data", body: "Runtime validation on forms and APIs so bad data never gets in." },
    ],
    goodFit: [
      "JavaScript codebases that keep breaking in surprising ways",
      "Teams growing beyond one or two developers",
      "Projects with complex data shared between frontend and backend",
    ],
    included: [
      "TypeScript setup with strict settings",
      "Gradual migration plan from JavaScript",
      "Shared types between frontend and backend",
      "Runtime validation with Zod",
      "Linting and CI type checks",
      "Team guidelines and examples",
    ],
    steps: [
      { title: "Set up", body: "Add TypeScript and tooling without disrupting current work." },
      { title: "Migrate", body: "Convert the most important files first, then the rest step by step." },
      { title: "Enforce", body: "Turn on strict checks in CI so the codebase stays typed." },
    ],
    stack: ["TypeScript", "Zod", "Node.js", "React", "ESLint"],
    faqs: [
      { question: "Do we have to stop work to migrate?", answer: "No. Migration happens gradually, file by file, alongside normal feature work." },
      { question: "Does TypeScript slow development down?", answer: "Slightly at first, then it speeds things up because fewer bugs reach testing and production." },
      { question: "Can you type an existing API?", answer: "Yes. I can generate or write types for your APIs and validate responses at runtime." },
    ],
  },
  {
    slug: "full-stack-development",
    title: "Full-Stack Development",
    group: "Stack",
    timeline: "4 to 12 weeks",
    headline: "One developer for the whole stack.",
    intro:
      "Frontend, backend, database and deployment, handled by one person who sees the whole picture. Fewer handoffs, faster decisions, and one person accountable for the result.",
    overview: [
      "Splitting a project across separate frontend and backend developers adds meetings, handoffs and gaps where bugs hide. For most products, one experienced full-stack developer moves faster.",
      "I design the database, build the APIs and server logic, create the interface and set up hosting and monitoring, so every layer fits together.",
    ],
    benefits: [
      { title: "No handoffs", body: "Decisions get made and shipped without waiting on another team." },
      { title: "Coherent design", body: "Database, API and UI designed together, so they fit naturally." },
      { title: "One point of contact", body: "One person to talk to and one person responsible for it working." },
    ],
    goodFit: [
      "Startups without an in-house engineering team",
      "Projects that touch every layer of the stack",
      "Teams needing extra capacity across frontend and backend",
    ],
    included: [
      "Database design and migrations",
      "APIs and server logic",
      "Frontend interface",
      "Authentication and permissions",
      "Hosting, CI/CD and monitoring",
      "Documentation and handover",
    ],
    steps: [
      { title: "Design", body: "Plan the data model and architecture together with the features." },
      { title: "Build", body: "Develop each feature end to end, from database to screen." },
      { title: "Deploy", body: "Ship with automated deploys, monitoring and backups in place." },
    ],
    stack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Supabase"],
    faqs: [
      { question: "Can one developer really handle everything?", answer: "For most products, yes. For very large projects I'll be upfront about where extra help is needed." },
      { question: "Which backend do you use?", answer: "Usually Node.js with PostgreSQL or Supabase, but I'll work with whatever fits your project." },
      { question: "Can you join an existing project?", answer: "Yes. I start with a code review and then pick up work across the stack." },
    ],
  },
  {
    slug: "api-development",
    title: "API Development",
    group: "Stack",
    timeline: "2 to 6 weeks",
    headline: "Reliable APIs that are a pleasure to integrate with.",
    intro:
      "REST and webhook APIs for your app, partners or mobile clients: well-designed, documented, secure and fast, plus integrations with the third-party APIs you depend on.",
    overview: [
      "An API is a contract. When it's inconsistent, undocumented or slow, every app built on top of it suffers. When it's done well, integrations become quick and painless.",
      "I design APIs with clear resources, validation, authentication and versioning, document them properly and test them, so your team and partners can build on them with confidence.",
    ],
    benefits: [
      { title: "Clear design", body: "Consistent endpoints, sensible errors and predictable behaviour." },
      { title: "Secure", body: "Authentication, rate limits and input validation on every endpoint." },
      { title: "Documented", body: "Up-to-date docs so integrators don't need to ask how it works." },
    ],
    goodFit: [
      "Products opening up an API to customers or partners",
      "Teams building a mobile app on top of a web backend",
      "Businesses connecting several third-party services",
    ],
    included: [
      "API design and data contracts",
      "Endpoint build with validation",
      "Authentication, keys and rate limiting",
      "Webhooks and third-party integrations",
      "OpenAPI documentation",
      "Automated tests and monitoring",
    ],
    steps: [
      { title: "Design", body: "Agree resources, endpoints and data shapes before writing code." },
      { title: "Build", body: "Implement and test each endpoint, with docs generated alongside." },
      { title: "Launch", body: "Deploy with monitoring and versioning so future changes don't break clients." },
    ],
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Zod", "Cloudflare Workers"],
    faqs: [
      { question: "REST or GraphQL?", answer: "REST suits most projects and is easiest for partners. I'll suggest GraphQL only when it clearly helps." },
      { question: "Can you integrate with a third-party API?", answer: "Yes. Payment, CRM, email, shipping and AI APIs are all common integrations." },
      { question: "Will the API be documented?", answer: "Yes. You get OpenAPI docs that stay in sync with the code." },
    ],
  },

  // ─── Infrastructure ───────────────────────────────────────────────────
  {
    slug: "supabase-development",
    title: "Supabase Development",
    group: "Infrastructure",
    timeline: "1 to 3 weeks",
    headline: "Supabase backends that are secure and scale.",
    intro:
      "Postgres database, auth, storage and realtime set up properly, with row-level security that actually protects your data and a schema that's easy to grow.",
    overview: [
      "Supabase gives you a full backend in minutes, which is exactly why so many apps launch with weak security rules, missing indexes and a schema that becomes hard to change.",
      "I build and audit Supabase projects: designing the schema, writing row-level security policies, setting up auth and storage, and adding the edge functions your app needs.",
    ],
    benefits: [
      { title: "Locked-down data", body: "Row-level security policies tested so users only ever see their own data." },
      { title: "Clean schema", body: "A database design that's fast to query and easy to extend." },
      { title: "Full backend", body: "Auth, storage, realtime and edge functions working together." },
    ],
    goodFit: [
      "New apps choosing Supabase as their backend",
      "Apps built quickly on Supabase that need a security review",
      "Teams moving from Firebase to Postgres",
    ],
    included: [
      "Schema design and migrations",
      "Row-level security policies and tests",
      "Auth setup with social and magic-link sign-in",
      "Storage buckets and access rules",
      "Edge functions and scheduled jobs",
      "Backups and environment setup",
    ],
    steps: [
      { title: "Audit or plan", body: "Review the current project or design the schema from scratch." },
      { title: "Build", body: "Set up tables, policies, auth and functions with tests for access rules." },
      { title: "Secure", body: "Verify no data leaks between users before going live." },
    ],
    stack: ["Supabase", "PostgreSQL", "TypeScript", "Next.js", "Edge Functions"],
    faqs: [
      { question: "Can you check my existing Supabase project?", answer: "Yes. A security review of row-level security and exposed keys is one of the most common requests." },
      { question: "Can you migrate us from Firebase?", answer: "Yes. I plan the data mapping, migrate users and data, and update the app to use Supabase." },
      { question: "Is Supabase ready for production?", answer: "Yes, when it's set up properly. That's what this service is for." },
    ],
  },
  {
    slug: "cloudflare-workers-development",
    title: "Cloudflare Workers Development",
    group: "Infrastructure",
    timeline: "2 to 4 weeks",
    headline: "Code that runs everywhere, instantly.",
    intro:
      "APIs, sites and background jobs on Cloudflare's edge network: fast for users worldwide, extremely cheap to run and with almost nothing to maintain.",
    overview: [
      "Cloudflare Workers run your code in hundreds of locations, close to every user. Combined with D1, KV, R2 and Queues, they can power a complete app without managing a single server.",
      "I build and migrate apps to Workers, and design them around the platform's strengths so you get global speed and very low hosting bills.",
    ],
    benefits: [
      { title: "Global speed", body: "Responses from the nearest location, with sub-100ms response times worldwide." },
      { title: "Tiny hosting bills", body: "Pay for what's used, often a fraction of traditional hosting." },
      { title: "No servers", body: "Nothing to patch, scale or babysit." },
    ],
    goodFit: [
      "APIs and sites serving users around the world",
      "Projects that want to cut hosting costs",
      "Teams wanting serverless without cold starts",
    ],
    included: [
      "Workers architecture and setup",
      "D1, KV, R2 and Queues integration",
      "API and routing build",
      "Caching strategy",
      "CI/CD with preview deployments",
      "Monitoring and logs",
    ],
    steps: [
      { title: "Plan", body: "Map which parts of your app suit the edge and how data will be stored." },
      { title: "Build", body: "Develop and test the Workers with preview deployments." },
      { title: "Cut over", body: "Switch traffic over gradually with monitoring in place." },
    ],
    stack: ["Cloudflare Workers", "D1", "KV", "R2", "TypeScript", "Hono"],
    faqs: [
      { question: "Can Next.js run on Cloudflare?", answer: "Yes. Next.js apps can be deployed to Cloudflare, and I can help you decide if it suits your app." },
      { question: "Is there a database?", answer: "Yes. D1 is a SQL database built for Workers, and you can also connect to Postgres." },
      { question: "How much will hosting cost?", answer: "Usually very little. Many small apps fit within Cloudflare's free or lowest paid tier." },
    ],
  },
  {
    slug: "deployment-ci-cd",
    title: "Deployment & CI/CD",
    group: "Infrastructure",
    timeline: "1 to 2 weeks",
    headline: "Ship every day without holding your breath.",
    intro:
      "Automated testing, preview deployments and one-click releases, so every change is checked before it goes live and rollbacks take seconds.",
    overview: [
      "Manual deploys are slow and risky. Someone forgets a step, an untested change goes out, and the site is down on a Friday evening.",
      "I set up pipelines that test every change, create a preview link for every pull request and deploy automatically when it's merged, with environment variables, secrets and rollbacks handled properly.",
    ],
    benefits: [
      { title: "Automatic checks", body: "Tests, type checks and linting run on every change." },
      { title: "Preview links", body: "Every pull request gets its own live URL to review." },
      { title: "Safe releases", body: "Automatic deploys with quick rollbacks if something goes wrong." },
    ],
    goodFit: [
      "Teams still deploying by hand",
      "Projects with no tests running before release",
      "Apps that need separate staging and production environments",
    ],
    included: [
      "GitHub Actions pipeline",
      "Preview deployments for pull requests",
      "Staging and production environments",
      "Secrets and environment variable setup",
      "Error tracking and uptime alerts",
      "Release and rollback guide",
    ],
    steps: [
      { title: "Review", body: "Look at how you ship today and where it can go wrong." },
      { title: "Automate", body: "Build the pipeline, environments and checks." },
      { title: "Hand over", body: "Walk your team through releasing and rolling back." },
    ],
    stack: ["GitHub Actions", "Vercel", "Cloudflare", "Docker", "Sentry"],
    faqs: [
      { question: "Which hosting do you support?", answer: "Vercel, Cloudflare, Netlify, Fly.io and container-based hosts are all common." },
      { question: "Do we need tests first?", answer: "No. I can set up the pipeline and add tests for your most important flows as part of the work." },
      { question: "Can you fix our broken pipeline?", answer: "Yes. Flaky or slow pipelines are a common fix." },
    ],
  },

  // ─── Performance & SEO ────────────────────────────────────────────────
  {
    slug: "web-performance-optimization",
    title: "Web Performance Optimization",
    group: "Speed & SEO",
    timeline: "1 to 3 weeks",
    headline: "Pages that load instantly and rank higher.",
    intro:
      "I find out exactly why your site is slow and fix it in the code: images, fonts, scripts, rendering and caching, with before-and-after numbers to prove it.",
    overview: [
      "Slow sites lose visitors, sales and search rankings. Google measures real-user speed through Core Web Vitals and uses it when ranking pages.",
      "I start with field data to see what real users experience, find the biggest bottlenecks and fix them at the source, not with plugins that hide the problem.",
    ],
    benefits: [
      { title: "Measured first", body: "Real-user data and a clear report of what is slow and why." },
      { title: "Fixed in code", body: "Images, fonts, scripts and rendering, all tuned properly." },
      { title: "Proven after", body: "Before-and-after numbers you can show your team." },
    ],
    goodFit: [
      "Sites failing Core Web Vitals in Search Console",
      "Stores where slow pages hurt conversion",
      "Apps that have gradually become sluggish",
    ],
    included: [
      "Performance audit with field and lab data",
      "LCP, INP and CLS fixes",
      "Image and font optimisation",
      "JavaScript and third-party script cleanup",
      "Caching and CDN setup",
      "Before-and-after report",
    ],
    steps: [
      { title: "Measure", body: "Collect real-user and lab data to find the slowest pages and why." },
      { title: "Fix", body: "Apply the fixes with the biggest impact first, directly in your code." },
      { title: "Verify", body: "Re-measure and confirm the improvements in Search Console." },
    ],
    stack: ["Lighthouse", "Next.js", "Cloudflare", "WebPageTest", "Chrome DevTools"],
    faqs: [
      { question: "Will a faster site rank better?", answer: "Speed is one of Google's ranking signals, and it improves conversions regardless of ranking." },
      { question: "Can you speed up WordPress or Shopify?", answer: "Yes. The tools differ, but the causes are usually similar: heavy images, scripts and themes." },
      { question: "How long do the results take to show?", answer: "Lab scores improve immediately. Search Console field data updates over about 28 days." },
    ],
  },
  {
    slug: "technical-seo",
    title: "Technical SEO",
    group: "Speed & SEO",
    timeline: "2 to 4 weeks",
    headline: "Great content can't rank on a broken foundation.",
    intro:
      "I fix the technical layer Google judges you on: crawlability, structured data, speed and rendering, so your content finally gets the rankings it deserves.",
    overview: [
      "Technical SEO is everything that happens before content: can Google crawl and render your pages, are they fast, is your markup structured so search engines understand it, and are there hidden problems quietly holding your rankings back.",
      "As a developer, I fix technical SEO at the source, in the code, not with plugins that paper over problems. This site is a live example: server rendering, structured data, clean metadata, sitemaps and passing Core Web Vitals.",
    ],
    benefits: [
      { title: "Crawlable and indexable", body: "Clean rendering, sitemaps and no traps stopping Google from seeing your pages." },
      { title: "Structured data", body: "Schema markup so search engines understand and richly display your pages." },
      { title: "Fast and rendered right", body: "Core Web Vitals and server rendering, the technical signals Google rewards." },
    ],
    goodFit: [
      "Sites publishing good content that isn't ranking",
      "Businesses whose SEO agency needs a developer to implement fixes",
      "Anyone launching a new site who wants the foundation right first time",
    ],
    included: [
      "Technical SEO audit",
      "Crawlability and indexing fixes",
      "Structured data (JSON-LD schema)",
      "Metadata, canonicals and sitemaps",
      "Core Web Vitals and rendering fixes",
      "A prioritised action report",
    ],
    steps: [
      { title: "Audit", body: "Crawl the site and find what is blocking it from ranking." },
      { title: "Fix", body: "Rendering, markup, speed and structure, fixed at the code level." },
      { title: "Verify", body: "Confirm indexing and structured data are valid in Search Console." },
    ],
    stack: ["Next.js", "Google Search Console", "Lighthouse", "Schema.org", "Cloudflare"],
    faqs: [
      { question: "Do you write content too?", answer: "No. I focus on the technical side, and work well alongside writers or an SEO agency handling content." },
      { question: "How is this different from an SEO agency?", answer: "Agencies often hand you a list of issues. I fix them directly in your code." },
      { question: "Will I see ranking improvements?", answer: "Fixing technical problems removes what's holding pages back. Rankings also depend on content and competition, so I don't promise positions." },
    ],
  },
  {
    slug: "landing-page-development",
    title: "Landing Page Development",
    group: "Speed & SEO",
    timeline: "1 to 2 weeks",
    headline: "Landing pages that load fast and convert.",
    intro:
      "High-converting landing pages designed and built from your brief: fast, responsive, SEO-ready and easy to run ads to, with analytics so you know what's working.",
    overview: [
      "A landing page has one job: turn a visitor into a lead or customer. Clear messaging, a fast load and a single obvious next step matter more than anything else.",
      "I design and build landing pages around that goal, with sections that answer objections, proof that builds trust, and tracking so you can measure and improve results.",
    ],
    benefits: [
      { title: "Built to convert", body: "Clear structure, strong calls to action and proof in the right places." },
      { title: "Loads instantly", body: "Lightweight pages that score well on Core Web Vitals and ad quality." },
      { title: "Measurable", body: "Analytics and conversion tracking set up from day one." },
    ],
    goodFit: [
      "Product launches and waitlists",
      "Paid ad campaigns that need a dedicated page",
      "Businesses whose current homepage isn't converting",
    ],
    included: [
      "Page structure and copy guidance",
      "Custom design matched to your brand",
      "Responsive, fast build",
      "Forms, email capture or checkout",
      "SEO metadata and social previews",
      "Analytics and conversion tracking",
    ],
    steps: [
      { title: "Brief", body: "Agree the audience, offer and the one action the page should drive." },
      { title: "Design and build", body: "Create the page with a live preview link for your feedback." },
      { title: "Launch", body: "Connect your domain, forms and tracking, and go live." },
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer", "Webflow", "Vercel"],
    faqs: [
      { question: "Can I edit the page myself?", answer: "Yes. I can build on Framer or Webflow, or add a simple editor to a Next.js page." },
      { question: "Do you write the copy?", answer: "I provide structure and copy guidance. You know your customers best, so the final words come from you." },
      { question: "Can you A/B test it?", answer: "Yes. Variants and testing can be set up so you can improve the page over time." },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}

/** Link for a service name, e.g. "Technical SEO" → "/services/technical-seo". Falls back to the custom builds list. */
export function servicePageHref(title: string): string {
  const page = servicePages.find((p) => p.title === title);
  return page ? `/services/${page.slug}` : "/services#custom";
}

/**
 * Every service for the list and table on /services: the quick services first,
 * then each custom build as a card (quoted per project, with a typical timeline).
 */
export const allServices: Service[] = [
  ...services,
  ...servicePages
    .filter((page) => !services.some((service) => service.slug === page.slug))
    .map((page) => ({
      slug: page.slug,
      category: page.group,
      title: page.title,
      description: page.intro,
      worksWith: page.stack.slice(0, 3),
      delivery: page.timeline,
      quoted: true,
    })),
];
