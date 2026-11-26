import type { Post } from "./types";

/** Blog posts. For long-form content you can later swap this for MDX files. */
export const posts: Post[] = [
  {
    slug: "shipping-an-mvp-in-two-weeks",
    category: "Ship",
    title: "How I ship an MVP in two weeks",
    excerpt: "The scope cuts, defaults and boring tech choices that let small products launch fast.",
    date: "2026-10-12",
    readingTime: "6 min read",
    tags: ["Process", "Next.js"],
    body: [
      "Most MVPs are late because they try to be version two. The first job is cutting the scope to the one flow that proves the idea.",
      "I start every project from the same foundations: Next.js, a Postgres database, auth and billing already wired. That removes a week of setup before any product work begins.",
      "Then I ship something clickable within two days. Real feedback on a real link beats any amount of planning.",
    ],
  },
  {
    slug: "rag-that-does-not-hallucinate",
    category: "Thought",
    title: "RAG that doesn't make things up",
    excerpt: "Practical ways to keep an AI assistant grounded in your own content.",
    date: "2026-09-03",
    readingTime: "8 min read",
    tags: ["AI", "RAG"],
    body: [
      "Retrieval-augmented generation is simple to demo and hard to get right. Most failures come from retrieval, not the model.",
      "Chunk by meaning, not by character count. Store the source URL with every chunk and require the model to cite it.",
      "Finally, give the assistant permission to say \"I don't know\" and hand off to a human. Users trust that far more than a confident wrong answer.",
    ],
  },
  {
    slug: "core-web-vitals-checklist",
    category: "TIL",
    title: "My Core Web Vitals checklist",
    excerpt: "The fixes that move LCP, INP and CLS the most on real sites.",
    date: "2026-07-21",
    readingTime: "5 min read",
    tags: ["Performance"],
    body: [
      "Start with field data, not a single Lighthouse run. The numbers your users see are the ones Google ranks on.",
      "For LCP, preload the hero image and serve it at the right size. For CLS, give every image and embed explicit dimensions. For INP, break up long tasks and defer third-party scripts.",
      "Measure again after every change. Small wins add up quickly.",
    ],
  },
  {
    slug: "fixing-hydration-errors",
    category: "Debug",
    title: "Fixing hydration errors for good",
    excerpt: "Why React complains about server and client mismatches, and the patterns that make them go away.",
    date: "2026-06-02",
    readingTime: "7 min read",
    tags: ["React", "Next.js"],
    body: [
      "Hydration errors happen when the HTML from the server doesn't match what React renders in the browser. Dates, random IDs and browser-only APIs are the usual suspects.",
      "Render the same thing on both sides, then update after mount, or use an inline script for values that must be correct before paint.",
      "Once you know the three or four patterns, these errors stop being scary.",
    ],
  },
  {
    slug: "stripe-webhook-snippet",
    category: "Snippet",
    title: "A Stripe webhook handler I reuse everywhere",
    excerpt: "Verified signatures, idempotent processing and clear logging in under 60 lines.",
    date: "2026-04-18",
    readingTime: "4 min read",
    tags: ["Stripe", "Node.js"],
    body: [
      "Every Stripe integration needs a webhook handler, and most bugs live there. This is the version I copy into every project.",
      "Verify the signature with the raw body, store the event ID so retries are ignored, and only then update your database.",
      "Log every event type you don't handle yet. It makes the next feature much easier to build.",
    ],
  },
];

export const postCategories = ["Thought", "TIL", "Debug", "Ship", "Snippet"] as const;

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
