# Portfolio — Implementation Plan

## Goal

A personal portfolio that follows **parish.cv** for its look, pages, hero and
theming. It takes two things from **m-ahmed-javed.vercel.app**: the navbar
behaviour and the magnetic, animated buttons.

| Area | Source | Notes |
| --- | --- | --- |
| Fonts | parish | Bricolage Grotesque (display/headings), Geist (body), JetBrains Mono (labels) |
| Colours / theme | parish | Zinc-dark + white light themes, lime "signal" accent, defaults to dark |
| Hero | parish | Avatar + status, big headline with marker highlight, 2 CTAs, project showcase with tabs |
| Pages | parish | `/work`, `/services`, `/pricing`, `/process`, `/about`, `/blog` (+ detail pages) |
| Navbar | ahmed (UI) + parish (links) | Transparent at top, pill container fades in on scroll, sliding hover pill, magnetic CTA |
| Buttons | ahmed | Magnetic pull, fill rising from the bottom with a curved top, text roll-up, icon rotates |

## Stack

- Next.js 16 (App Router, `cacheComponents` on, Turbopack) + React 19 + TypeScript (strict)
- Tailwind CSS v4: tokens declared once as CSS variables in `globals.css`
- `lucide-react` for icons, plus `clsx` and `tailwind-merge` for the `cn()` helper
- No animation library. The magnetic effect is a small `requestAnimationFrame` hook.

## Folder structure

```
src/
├── app/                      # Routes only: thin pages that compose sections
│   ├── layout.tsx            # fonts, theme script, navbar, footer
│   ├── page.tsx              # home
│   ├── work/ [slug]/         # case studies (statically generated)
│   ├── services/ pricing/ process/ about/
│   ├── blog/ [slug]/         # posts (statically generated)
│   ├── not-found.tsx
│   └── globals.css           # design tokens + a few global utilities
├── components/
│   ├── layout/               # navbar, mobile menu, theme toggle, footer
│   ├── ui/                   # primitives: Magnetic, MagneticButton, Marker, Container…
│   └── sections/             # page sections: Hero, Stats, Pricing, Process…
├── content/                  # ALL copy and data (edit these to personalise)
├── hooks/                    # useMagnetic, useScrolled
└── lib/                      # cn(), theme constants
```

### Rules
1. **Content is separate from UI.** Every string, project, price and post lives in
   `src/content/*.ts` with a TypeScript type, so editing copy never touches components.
2. **Server Components by default.** `"use client"` only where there is interaction:
   navbar, theme toggle, magnetic button, hero showcase tabs, goal picker.
3. **One component per file**, named exports, kebab-case filenames.
4. **Design tokens only.** Components use semantic classes (`bg-background`,
   `text-muted-foreground`, `bg-signal`), never raw hex values. Change the theme in one place.
5. **Theme without flash.** An inline `<head>` script sets the `dark` class before paint
   (see Next docs: *preventing-flash-before-hydration*). The toggle shows icons with CSS, so
   it needs no React state and causes no hydration mismatch.
6. **Accessible motion.** Magnetic and roll effects turn off for `prefers-reduced-motion`
   and touch pointers.

## Build order
1. Tokens, fonts, theme script, root layout
2. `cn`, `useMagnetic`, `Magnetic`, `MagneticButton`, `Marker`, `Container`, `SectionHeading`
3. Navbar (desktop pill + mobile menu), theme toggle, footer
4. Content files
5. Home sections: Hero → Stats → Tech marquee → Work → Pricing → Services → Goal picker → Process → Testimonials → CTA
6. Pages that reuse those sections: work (+ case study), services, pricing, process, about, blog (+ post), 404
7. `pnpm lint` + `pnpm build`, then check light/dark and mobile in the browser

## Motion (v2)

All motion matches parish.cv; the work slider is ported from the Visha frontend.

| Effect | Where | How |
| --- | --- | --- |
| Smooth scrolling | whole site | `providers/smooth-scroll.tsx` (Lenis); helpers in `lib/smooth-scroll.ts` |
| Fade-up on scroll | any element | `<Reveal delay={ms}>` sets `data-reveal`; one `RevealObserver` adds `data-visible`; CSS animates |
| Highlighter draws in | marked words | `<Marker>` (same observer) |
| Pinned horizontal slider | home "Shipped, not mocked up." | `sections/work-slider.tsx`: sticky section, scroll → translateX, progress bar + jump buttons |
| Fanned card stack + autoplay tabs | hero | `sections/hero-showcase.tsx` + `ui/autoplay-progress.tsx` (CSS animation, pauses on hover) |
| Timeline line fills on scroll | process, about | `ui/scroll-timeline.tsx` |
| Testimonial carousel | home, process, about | `sections/testimonials.tsx` |

Content is only hidden when JS runs (`html.js`), and every effect is turned off for `prefers-reduced-motion`.
