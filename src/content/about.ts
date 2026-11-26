import type { Feature, Job, SocialProfile, Stat, StackGroup } from "./types";
import { site } from "./site";

export const about = {
  headline: "engineer modern, scalable",
  markedWord: "products",
  intro:
    "I'm Muhammad Umair Khan, a full stack developer focused on engineering modern, scalable, and user-centric digital products. With 3 years of development experience, I work across the complete application lifecycle — from crafting responsive frontend experiences to designing backend architectures, integrating APIs, managing databases, and developing blockchain-powered solutions.",
};

export const aboutStats: Stat[] = [
  { value: "10+", label: "Products shipped" },
  { value: "3 yrs", label: "Building for the web" },
  { value: "200K+", label: "Users reached" },
  { value: "Full stack", label: "Frontend, backend, Web3 and AI" },
];

export const experience: Job[] = [
  {
    period: "Oct 2024 – now",
    company: "NthLogics",
    role: "Software Engineer",
    body: "Full-stack development across Voycap, Yield Guild Games and Train Like a Ballerina. I built reusable React systems, tightened performance, and connected frontend work to MongoDB, PostgreSQL and Solidity-based blockchain logic.",
    highlights: ["Voycap", "Yield Guild Games", "Train Like a Ballerina"],
  },
  {
    period: "Apr 2023 – Oct 2024",
    company: "Devline Solutions",
    role: "Full Stack Engineer",
    body: "Built responsive, scalable web applications with React, Next.js, Vue and TypeScript. Integrated APIs, real-time communication, and collaborated with Node.js and Laravel backends on client products including Nohesi.gg.",
    highlights: ["Nohesi.gg", "Next.js", "Real-time systems"],
  },
  {
    period: "Nov 2022 – Mar 2023",
    company: "Capps Solution",
    role: "Frontend Developer",
    body: "Shipped responsive interfaces with HTML, CSS, Tailwind CSS, JavaScript and React, translating UI/UX into production pages and integrating Laravel APIs.",
    highlights: ["React", "Tailwind CSS", "Laravel APIs"],
  },
];

export const principles: Feature[] = [
  {
    title: "Principle 1",
    body: "Great software combines thoughtful design, clean architecture, and meaningful functionality.",
  },
  {
    title: "Principle 2",
    body: "Treat the frontend and backend as equally critical layers of the product, not implementation details.",
  },
  {
    title: "Principle 3",
    body: "Simplicity is the ultimate sophistication — boring technology, used well, wins most of the time.",
  },
  {
    title: "Principle 4",
    body: "Ship systems that improve velocity: reusable components, well-designed APIs, and measurable impact.",
  },
];

export const stackGroups: StackGroup[] = [
  {
    title: "Frontend Engineering",
    note: "interfaces people actually enjoy using",
    items: ["React", "Next.js", "Vue", "TypeScript", "Redux Toolkit", "Zustand", "Tailwind CSS"],
  },
  {
    title: "Backend Engineering",
    note: "APIs, services and real-time systems",
    items: ["Node.js", "Express", "Python", "Django", "DRF", "REST APIs", "GraphQL", "Socket.IO"],
  },
  {
    title: "Databases & Infrastructure",
    note: "data, hosting and delivery",
    items: ["MongoDB", "PostgreSQL", "Supabase", "Vercel", "AWS", "Docker", "CI/CD"],
  },
  {
    title: "Blockchain & AI",
    note: "the new product layer",
    items: ["Solidity", "Smart Contracts", "Ethereum", "Web3", "NFTs", "LLM APIs"],
    highlight: true,
  },
];

export const socialProfiles: SocialProfile[] = [
  { label: "GitHub", description: "Code and side projects", href: "https://github.com/umairkhanzz", icon: "github" },
  {
    label: "LinkedIn",
    description: "Work history",
    href: "https://www.linkedin.com/in/muhammad-umair-khanz/",
    icon: "linkedin",
  },
  {
    label: "Upwork",
    description: "Hire me on Upwork",
    href: "https://www.upwork.com/freelancers/~01187822217068d026",
    icon: "upwork",
  },
  { label: "Email", description: "Say hello", href: `mailto:${site.email}`, icon: "email" },
];
