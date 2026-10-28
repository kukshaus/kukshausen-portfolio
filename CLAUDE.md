# kukshausen-portfolio

Source of sergej.kukshausen.me (en at `/`, `/de/ /ru/ /hu/`). Texts in `src/i18n/<lang>.mjs`, templates in
`src/pages/`, styles in `src/style.css`.

## Definition of done: every change passes two reviews before it is pushed

This applies to every implemented feature, content change and style change, however small. Both reviews run on
the built site (`npm run preview`), not on the source alone, and both run before `git push` and before the
release to the live repo.

### 1. Apple design review

Run the `apple-design` skill on what changed. A website gets the principles and the foundations (accessibility,
color, typography, layout, motion, writing), not iOS or macOS platform conventions. No Critical or High finding
may remain. Quality floor, measured in a browser rather than estimated:

- Every page fits 375 px with no horizontal scroll, at 100% and at 200% root font size, in all four languages.
- Every link and control is at least 44 by 44 px on phones.
- Text contrast is at least 4.5:1 (3:1 for 18 px+ or bold), computed from the hex values.
- No font weight below 400. Sentence case in English copy. Headings in order (h1, h2, h3).
- Motion is optional: `prefers-reduced-motion` turns it off, and nothing is conveyed only by motion.
- No stat banners, numbered step sections, decorative blobs, cursor-following or magnetic effects, or the toolkit
  logo grid. They were removed on purpose (2026-10-23 and 2026-10-28).

### 2. SEO review

Use the skills in `~/Documents/projects/claude-seo/skills/` (read the leaf's `SKILL.md` and follow it):

| Change touches | Run |
| --- | --- |
| Any page content or template | `seo-page` on each changed URL |
| Copy, headings, FAQ | `seo-content` and `seo-geo` |
| JSON-LD in `src/pages/home.mjs` | `seo-schema` |
| A language file, `hreflang`, URLs | `seo-hreflang` |
| `sitemap.xml`, `robots.txt`, `llms.txt` | `seo-sitemap`, `seo-technical` |
| Headers, CSP, caching, redirects (`.coolify/nginx.conf` in the live repo) | `seo-technical` |
| Images | `seo-images` |

No regression against the last audit in `docs/seo-audits/`. Keep these in sync with any content change:
`public/sitemap.xml` lastmod, `UPDATED` in `src/pages/shared.mjs`, `dateLong` in every locale, and the API ids in
`src/api/resources.mjs` (they map to `work.items` and the other lists by position).

### Report

When a change is done, report both results in a few lines: the Apple floor checks with their measured numbers,
and the SEO leaves run with any finding and how it was fixed. A skipped check is reported as skipped, with why.
