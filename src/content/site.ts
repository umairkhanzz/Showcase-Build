import type { NavLink, SocialLink, Stat } from "./types";
import avatar from "@/assets/profile/avatar.png";

/**
 * Global site settings. Replace the placeholders (marked TODO) with your details.
 */
export const site = {
  name: "Muhammad Umair Khan",
  /** What you go by, used in "Hi, I'm …" and "Message …". */
  shortName: "Umair",
  /** Logo renders as `logo.name` followed by `logo.suffix` in a lime pill. */
  logo: { name: "umair", suffix: ".dev" },
  role: "Full Stack Developer",
  /** Profile photo (src/assets/profile). Used by the avatar and the About portrait. */
  avatar,
  email: "umairkhan.se24@gmail.com",
  location: "Based in Pakistan, working worldwide",
  availability: "Open to new engineering collaborations",
  description:
    "Full stack developer engineering modern, scalable, user-centric products — from React and Next.js interfaces to Node.js, Django backends, and blockchain-powered systems.",
  /** Short promise shown over the photo in the closing call to action. */
  promise:
    "Thoughtful engineering. Meaningful impact. Simplicity is the ultimate sophistication.",
  /** Where "Let's talk" and "Start a project" buttons go. ("Book a call" opens Calendly; see content/contact.ts.) */
  contactUrl: "/contact",
  copyrightYear: 2026,
} as const;

export const navLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

/** Footer "Elsewhere" icons. Remove any you don't use. */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/umairkhanzz", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-umair-khanz/", icon: "linkedin" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~01187822217068d026", icon: "upwork" },
];

export const heroStats: Stat[] = [
  { value: "10+", label: "products shipped across FinTech, gaming and Web3" },
  { value: "3 yrs", label: "building full-stack applications, end to end" },
  { value: "200K+", label: "users on products I helped ship" },
  { value: "AI + Web3", label: "LLM-powered features and smart contract integrations" },
];

export const techStack: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Vue",
  "Node.js",
  "Django",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Socket.IO",
  "Solidity",
  "OpenAI",
  "Vercel",
];

/** Numbers shown at the top of /work. */
export const workStats: Stat[] = [
  { value: "200K+", label: "Users on products I helped ship" },
  { value: "10+", label: "Projects delivered" },
  { value: "3 yrs", label: "Full-stack engineering" },
  { value: "4", label: "Products spanning FinTech, gaming, Web3 and AI" },
];
