# Assets: where every file lives

There are two homes for files, and the rule for choosing between them is simple:

| Folder | Use it for | How it's referenced |
| --- | --- | --- |
| `src/assets/` | **Images shown on the page** (photos, screenshots, logos) | `import cover from "@/assets/…"`, then passed to `next/image` |
| `public/` | **Files that need a fixed URL** (PDFs, downloads, files other sites link to) | A plain path such as `/resume.pdf` |

Why `src/assets` for images: a static import gives Next.js the width and height (so the
layout never jumps), a free blur-up placeholder, and a hashed filename that can be cached
forever. A typo in the path is also a **build error**, not a broken image in production.

## Folder layout

```
src/assets/
├── profile/
│   └── avatar.png              ✅ added (hero, footer, blog hire card, About portrait)
├── projects/
│   └── <project-slug>/         one folder per project in content/projects.ts
│       ├── cover.png           main screenshot: slider, work grid, case study
│       └── 01.png, 02.png …    optional extra screenshots for the case study
├── testimonials/
│   └── <first-last>.jpg        client headshots (optional)
└── blog/
    └── <post-slug>/
        └── cover.png           post cover (optional)

public/
├── resume.pdf                  "Résumé (PDF)" button on /about (TODO)
└── (no images; they go in src/assets)

src/app/
├── favicon.ico                 browser tab icon (exists)
├── icon.png                    optional: sharper icon, 512×512
├── apple-icon.png              optional: iOS home screen, 180×180
└── opengraph-image.png         link preview on WhatsApp, LinkedIn and X, 1200×630 (TODO)
```

Folder names must match the `slug` in `src/content/*.ts` so it's obvious which file belongs where.

## What's needed, and where it shows

| Asset | Size / format | Where it appears | Status |
| --- | --- | --- | --- |
| Profile photo | Square, ≥ 800 px, PNG/JPG | Hero, footer, blog hire card, About portrait | ✅ Done |
| Project cover × 5 | 1600×1000 (16:10), PNG/WebP, top of the page | Home slider, `/work`, `/work/<slug>` | Placeholder gradient for now |
| Case-study screenshots | 1600 px wide | `/work/<slug>` (needs a gallery section) | Optional |
| Résumé | PDF | `/about` download button | TODO |
| Share image | 1200×630 PNG | Link previews | TODO |
| Testimonial headshots | Square, ≥ 160 px | Testimonials carousel | Optional (initials work fine) |
| Blog covers | 1600×900 | `/blog`, posts | Optional |

## How to add a project screenshot

1. Save it as `src/assets/projects/launchpad/cover.png`.
2. In `src/content/projects.ts`:

   ```ts
   import launchpadCover from "@/assets/projects/launchpad/cover.png";

   // inside the launchpad entry
   image: launchpadCover,
   ```

3. Done. `ProjectPreview` shows the screenshot (with blur-up) instead of the gradient
   placeholder everywhere that project appears.

## Tips

- Export screenshots at 2× the size they appear; Next.js resizes and serves WebP/AVIF automatically.
- Crop screenshots to the top of the page: the preview uses `object-top`.
- Keep original files under ~2 MB. Large ones slow down the build, not the site.
