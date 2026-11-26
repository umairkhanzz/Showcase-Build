import { site } from "./site";

/**
 * Everything shown on /contact.
 * The form options live here too, so the form and its validation stay in sync.
 */

export const workTypes = [
  { value: "subscription", label: "Monthly subscription" },
  { value: "project", label: "Fixed-price project" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const serviceOptions = ["Web app", "AI / automation", "Full-stack build", "Web3", "Consulting / other"] as const;
export const budgetOptions = ["< $1k", "$1k–5k", "$5k–15k", "$15k+", "Not sure yet"] as const;
export const timelineOptions = ["ASAP", "2–4 weeks", "1–3 months", "Flexible"] as const;

export const DETAILS_MAX_LENGTH = 2000;

export const contactChannels = {
  email: site.email,
  linkedin: {
    label: "linkedin.com/in/muhammad-umair-khanz",
    href: "https://www.linkedin.com/in/muhammad-umair-khanz/",
  },
};

/** The floating "Message me" chat popup (components/chat/chat-widget.tsx). */
export const chat = {
  replyTime: "Replies within a few hours",
  /** Shown as "21:11 in PK" so visitors know your local time. */
  timeZone: "Asia/Karachi",
  timeZoneLabel: "PK",
  /** Greeting bubbles, shown one after another after a short "typing" indicator. */
  greeting: [
    "Hi, I’m Umair \u{1F44B}",
    "Tell me what you’re building. I read every message myself and usually reply within a few hours.",
  ],
  placeholder: "What would you like to work on?",
  /** Used when the visitor leaves the box empty. */
  fallbackMessage: "Hi Umair, I'd like to talk about a project.",
};

/**
 * "Pick a time" and "Book a 30-min call" open your Calendly page in a new tab.
 * Paste your Calendly event link into `calendlyUrl`. While it's empty, the button emails you instead.
 */
export const booking = {
  title: "30-minute intro call",
  calendlyUrl: "",
  fallbackUrl: `mailto:${site.email}?subject=Intro%20call`,
  details: ["30 minutes", "Google Meet or Zoom", "Any time zone"],
};

/** Optional marketplace profiles. Remove entries you don't use; the card hides when empty. */
export const marketplaces: { label: string; href: string }[] = [
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~01187822217068d026" },
];
