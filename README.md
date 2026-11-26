# Muhammad Umair Khan: Portfolio

The personal site of Muhammad Umair Khan, a full stack developer building
modern, scalable products across FinTech, gaming, Web3 and AI.

Built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

## Features

- **Pages:**
  - Home
  - Work, plus a case study for each project
  - Services
  - Pricing
  - Process
  - About
  - Blog, plus a page for each post
  - Contact
  - A custom 404 page
- **Dark and light themes.** Defaults to dark, set before the page paints so it never flashes.
- **Animated background:** a topographic map that lights up around the cursor.
- **Motion:**
  - smooth scrolling (Lenis)
  - reveal-on-scroll animations
  - a pinned, sideways-scrolling project slider
  - magnetic buttons
  - a fanned project showcase in the hero
- **Case studies:**
  - screenshot gallery
  - results
  - story and build steps
  - "hard parts" and how each was solved
  - a link to the next project
- **Booking and contact:**
  - a "Message Umair" chat that hands the conversation to email
  - a contact form that emails briefs through Resend
- **Accessible and fast:**
  - semantic HTML and keyboard-friendly dialogs
  - respects reduced motion
  - static pages wherever possible

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Turbopack) |
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4, with theme tokens as CSS variables in `globals.css` |
| Icons | `lucide-react`, plus inline SVG brand icons |
| Smooth scroll | `lenis` |
| Validation | `zod` (contact form) |
| Email | Resend HTTP API, no SDK |
| Fonts | Bricolage Grotesque (headings), Geist (body), JetBrains Mono (labels) |

## Getting started

You need **Node.js 20+** and **pnpm 10** (pinned in `package.json`).

```bash
pnpm install
```

```bash
cp .env.example .env.local
```

```bash
pnpm dev
```

Open <http://localhost:3000>.

### Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server with Turbopack |
| `pnpm build` | Production build (type-checks and prerenders every page) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | In production | Your domain, e.g. `https://umair.dev`. Used for canonical URLs, the sitemap and share images. On Vercel it falls back to the production domain. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | The code from Google Search Console's "HTML tag" verification method |
| `RESEND_API_KEY` | Yes | API key from [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Yes | Inbox that receives project briefs |
| `CONTACT_FROM_EMAIL` | No | Sender on a domain verified in Resend. Defaults to Resend's test sender. |

If the two Resend values aren't set, the contact form says it isn't connected yet and points visitors to your email.

## SEO

- **Strategy:** the target search terms, titles and descriptions for each page live in `src/content/seo.ts`.
- **Generated at build time:**
  - `sitemap.xml`, `robots.txt` and a web manifest
  - the favicon and app icons
  - a share image (Open Graph) for the site, plus one for each case study and blog post
- **Structured data (JSON-LD):** Person, WebSite and ProfessionalService on every page; breadcrumbs; FAQs; services and plans with prices; case studies; blog posts.

## Project structure

```
src/
├── app/            Routes (one folder per page), layout, global styles, 404
├── assets/         Images imported by components (profile photo, project screenshots)
├── components/
│   ├── backgrounds/  Topographic canvas background
│   ├── chat/         "Message Umair" email chat widget
│   ├── contact/      Booking card, contact form
│   ├── layout/       Navbar, mobile menu, footer, theme toggle
│   ├── providers/    Smooth scroll and reveal-on-scroll
│   ├── sections/     Page sections (hero, sliders, pricing, FAQ, case-study parts…)
│   └── ui/           Small building blocks (buttons, container, reveal, tags…)
├── content/        All site text and data, typed (see below)
├── hooks/          useMagnetic, useMediaQuery, useScrolled
└── lib/            Helpers: cn(), email, contact schema, theme, formatting
docs/
├── ASSETS.md       Where every image and file goes
└── PLAN.md         Original design and implementation plan
```

## Editing content

All copy and data live in **`src/content/`** as typed TypeScript, so a missing field is a build
error rather than a broken page. You rarely need to touch a component.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, email, availability, social links, nav, home and Work stats |
| `projects.ts` | Projects and their case studies (order sets the hero, slider and "Next project") |
| `services.ts` | Fixed-price services, ordering steps, custom builds, service FAQs, goal picker |
| `pricing.ts` | Plans and tiers |
| `process.ts` | Process steps and testimonials |
| `about.ts` | Story, principles, stack, experience, profiles |
| `contact.ts` | Chat greeting, Calendly link, contact channels |
| `posts.ts` | Blog posts |
| `types.ts` | The shapes all of the above follow |

## Deployment

It's a standard Next.js app, so it deploys to [Vercel](https://vercel.com) with no extra
configuration. Add the environment variables above in the project settings.

## Contact

- Email: [umairkhan.se24@gmail.com](mailto:umairkhan.se24@gmail.com)
- LinkedIn: [muhammad-umair-khanz](https://www.linkedin.com/in/muhammad-umair-khanz/)
- GitHub: [umairkhanzz](https://github.com/umairkhanzz)
