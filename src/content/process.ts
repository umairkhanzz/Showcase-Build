import type { Feature, PhaseStep, ProcessStep, Testimonial } from "./types";

export const processSteps: ProcessStep[] = [
  {
    when: "Day one",
    title: "Your board, your queue.",
    body: "Subscribe and add requests to your own board, or send a brief for a fixed quote. No hourly meter either way.",
  },
  {
    when: "Within 1 to 2 days",
    title: "Your first request in review.",
    body: "You click the real thing on a real link, then approve it or ask for changes right on the card.",
  },
  {
    when: "Every day",
    title: "Short updates you can steer.",
    body: "A daily note on what shipped and what is next, so changes happen while they are still cheap.",
  },
  {
    when: "Launch",
    title: "Tested, deployed and yours.",
    body: "Documented and handed over with the code in your repo. No lock-in and no mystery about how it works.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Umair is an exceptional full-stack engineer. He delivers scalable, high-performance solutions in React, Next.js and Node.js, and translates complex FinTech and logistics requirements into applications people can actually use.",
    author: "Ghazala Babar",
    role: "Teammate, full-stack engineering",
  },
  {
    quote:
      "Give him the really challenging tasks, the ones that everyone else is struggling with, and he will get them done. No matter how complex the problem is, he comes up with a brilliant, elegant, and cost-effective solution.",
    author: "Muhammad Zulfiqar",
    role: "Colleague",
  },
  {
    quote:
      "He is always punctual, his knowledge is vast and thorough. I would recommend him for any project that needs a strong frontend engineer in React, Next.js and Node.js — especially FinTech, logistics SaaS, micro-frontends and AI-powered work.",
    author: "Muhammad Zulfiqar",
    role: "Recommendation on LinkedIn",
  },
];

/** The three promises at the top of /process. */
export const processPrinciples: Feature[] = [
  {
    title: "Broken down clearly",
    body: "Big goals become small, shippable tasks, so scope is never a vague blob. You see how each piece of work adds up.",
  },
  {
    title: "Visible on a shared board",
    body: "A Kanban board shows what's in progress, in review and done. Full transparency, no status meetings.",
  },
  {
    title: "Daily done / doing / next",
    body: "Every working day: what got done, what I'm on now and what's coming. Async by default, a call whenever you want.",
  },
];

/** How the monthly subscription runs, step by step. */
export const subscriptionSteps: Feature[] = [
  { title: "Add requests", body: "Drop features, fixes and pages on your board, with files and links. As many as you like." },
  { title: "Set the order", body: "Drag cards into Up next. I always pick up the top card first." },
  { title: "Review in a day or two", body: "Finished work lands in review on a live link. Approve it or ask for changes." },
  { title: "Pause when it's quiet", body: "No requests this month? Pause the subscription and keep the unused days." },
];

/** The fixed-price project, from first call to launch. */
export const projectPhases: PhaseStep[] = [
  { phase: "Before we start", title: "Discovery & planning", body: "A call to understand the problem, the users and the outcome you need. I map scope, risks and the fastest path to value." },
  { phase: "Before we start", title: "Design & wireframes", body: "We agree on the structure and key screens first, so the flow is shaped cheaply before any code." },
  { phase: "Before we start", title: "Choosing the stack", body: "The right framework, database and hosting for your scale, budget and timeline. No over-engineering." },
  { phase: "During the build", title: "Small milestones", body: "Each milestone is a working slice on a live URL, so progress is real and course-correcting is cheap." },
  { phase: "During the build", title: "A shared board", body: "Backlog, in progress, review, done. You can see exactly what's happening any time, without asking." },
  { phase: "During the build", title: "Daily updates", body: "A short note every day: what I finished, what I'm on and what's next." },
  { phase: "Launch", title: "Test, feedback & deploy", body: "Features ship with tests. We iterate on your feedback, then deploy to fast global hosting." },
  { phase: "Launch", title: "Handover & support", body: "Docs, credentials and a walkthrough, plus a support window after launch. The code is yours." },
];
