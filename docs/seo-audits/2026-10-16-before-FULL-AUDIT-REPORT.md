# SEO Audit: sergej.kukshausen.me

**Date:** 2026-10-16  
**SEO Health Score:** 69/100  
**Business type:** Personal brand / portfolio (engineering manager, freelance consulting intent)  
**Pages crawled:** 3 HTML pages (/, /imprint.html, /privacy.html) + /llms.txt, sitemap.xml, robots.txt  
**Data sources:** render_page, Playwright lab probes, Common Crawl index. No Google API key, Moz, Bing, Matomo or DataForSEO credentials, so no field CWV, GSC, GA4 or backlink metrics.

## Executive Summary

The site is technically clean for a static portfolio: server-rendered, fast (desktop LCP 0.28 s, mobile 2.18 s lab), fully open to AI crawlers, with a valid Person schema and a spec-conformant llms.txt. The score is held back by three structural problems rather than by code quality:

1. **Positioning split.** The HTML says 'employed Engineering Manager'. llms.txt says 'freelance consultant, hire me on Upwork/Malt'. Search engines and AI answer engines corroborate across surfaces, so the freelance intent currently has no indexable support.
2. **Promises that 404.** llms.txt advertises three articles and a FAQ that do not exist.
3. **Server hygiene.** No security headers, no Cache-Control, 302 instead of 301, broken www host, sitemap full of noindex pages.

### Category scores

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 71 |
| Content Quality | 23% | 64 |
| On-Page SEO | 20% | 70 |
| Schema / Structured Data | 10% | 58 |
| Performance (CWV) | 10% | 84 |
| AI Search Readiness | 10% | 68 |
| Images | 5% | 72 |

Supplementary (not weighted): SXO gap 50/100, Visual/UX 72/100, Agent readiness 86/100, GEO 59/100. Authority: Not assessed (Common Crawl: domain never crawled; no Moz/Bing credentials).

### Top 5 issues

1. llms.txt links to three pages that return 404 and claims a FAQ that does not exist
2. The HTML and llms.txt describe two different offers (employed EM vs freelance consultant); the freelance intent has zero indexable support
3. www host serves a certificate mismatch / 503 and HTTP to HTTPS is a 302
4. No security headers and no Cache-Control on any response
5. Font swap causes a measurable layout shift (CLS 0.094 lab, 0.187 with reduced motion)

### Top 5 quick wins

1. Delete or publish the three dead llms.txt links (5 minutes)
2. Replace the Person JSON-LD with the generated ProfilePage graph (10 minutes)
3. nginx: 301 redirect, HSTS + security headers, Cache-Control map, manifest MIME type (30 minutes)
4. Trim sitemap.xml to / and the CV PDF; fix index.html footer links (10 minutes)
5. Add crossorigin to the font preload and a size-adjusted fallback face (20 minutes)

### Persona scores (SXO)

| Persona | Score |
|---|---|
| Recruiter after LinkedIn | 76 |
| CTO seeking fractional EM / AWS migration (DACH) | 42 |
| Dev lead seeking Claude/Copilot skills | 43 |

## Technical SEO (71/100)

**What works**

- Static, server-rendered HTML (870 words without JS)
- HTTP/2 + HTTP/3, brotli and gzip available
- Real 404s for unknown paths, no mixed content
- robots.txt and sitemap.xml present and declared
- Valid viewport and mobile layout, no horizontal overflow

**Findings**

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| High | www host is broken | www.sergej.kukshausen.me resolves (A record 194.164.198.82) but serves a certificate mismatch over HTTPS and 404 over HTTP; nginx answers 503 behind the bad cert. | Issue a certificate covering both hosts (certbot -d sergej.kukshausen.me -d www.sergej.kukshausen.me) and add a server block returning 301 https://sergej.kukshausen.me$request_uri. |
| High | No security headers on any response | HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy and Permissions-Policy are all absent on pages and assets. | Add the nginx add_header set from findings/technical.md (CSP connect-src https://api.web3forms.com). |
| High | HTTP to HTTPS redirect is temporary (302/307) | GET returns 302, HEAD 307; never 301. Combined with no HSTS every cold visit makes an insecure round trip. | Use return 301 in the port-80 server block and enable HSTS with max-age=31536000. |
| Medium | Entrance animation hides the LCP element | CSS sets H1 words and hero paragraph to opacity:0 and staggers them; Chrome ignores opacity-0 elements for LCP, adding ~1 s on mobile (0.69 s vs 2.18 s lab). | Animate only transform/translate, keep opacity at 1, or start at opacity 0.01 and only for non-LCP elements. |
| Medium | No Cache-Control on hashed assets | Vite content-hashed CSS/JS/fonts ship without Cache-Control; browsers revalidate every visit. | nginx map: immutable max-age=31536000 for /assets/*, 30d for images, no-cache for HTML. |
| Medium | Duplicate homepage URL via index.html | Footer links on imprint/privacy point to index.html, which serves a 200 copy of /. | Link to / and 301 /index.html to /. |
| Low | site.webmanifest served as application/octet-stream | Wrong MIME type for the manifest. | Add 'application/manifest+json webmanifest;' to nginx mime.types. |
| Low | No IndexNow key | bingbot is welcomed in robots.txt but no IndexNow key file exists. | Generate a key, host /<key>.txt, submit via indexnow_submit.py after deploys. |

## Content Quality (64/100)

**What works**

- Clean, human copy: content_quality.py 93/100, no filler or AI patterns
- Metadata is specific, not templated
- Imprint (469 words) and privacy (1,173 words) are complete legal pages
- Concrete outcomes quoted (31% cost reduction, 21% faster launches)

**Findings**

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| High | HTML and llms.txt describe different offers | The page says 'Engineering Manager, Software Development' and contains zero occurrences of freelance, consultant, fractional, interim, hire, remote or DACH. llms.txt opens with 'freelance technical leader ... via Upwork, Malt' and lists nine services. Claims that exist only in llms.txt have no indexable support. | Add a 'How I can help' services section and Upwork/Malt links to the HTML; use one role string across title, H1, schema and profiles. |
| High | llms.txt promises content that does not exist | Three linked articles return 404, it claims a homepage FAQ (none exists), and it is dated 2026-07-24 while the page changed 2026-10-16. | Publish the three articles or delete the lines; add the six 'typical client questions' to the page as H2/H3 with answers. |
| Medium | Ten quantified claims, none with baseline or attribution | 31%, 12%, 21%, 75%, 27%, 100%, EUR 2.2M, EUR 180K, 3 audits: no metric definition, period or source. | Rewrite each as 'from X to Y over Z months, measured by W'; see rewrite examples in findings/content.md. |
| Medium | No third-party voice | No testimonials, recommendations, publications or named repositories; authority rests on bare profile links. | Quote two LinkedIn recommendations with name and role; link two public repos or a talk. |
| Medium | No date signals | No <time>, no dateModified; the renderer inferred 2026-01-01. | Add a visible 'Updated <date>' line and dateModified in schema. |
| Low | Privacy page cites a dead mirror | privacy.html references kukshaus.github.io, which returns 404. | Remove or fix the reference. |

## On-Page SEO (70/100)

**What works**

- Unique title (64 chars) and description on the homepage
- Self-canonical, OG and Twitter cards present
- All 36 images have alt text and explicit dimensions
- Single H1, logical H2/H3 outline

**Findings**

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Medium | H1 contains the location eyebrow | The accessible heading reads 'Sergej Kukshausen | Budapest Engineering Leadership for Mission-Critical Platforms' because the eyebrow sits inside the H1. | Move '| Budapest' to a <p> above the H1; H1 = name + one role phrase. |
| Medium | Sitemap lists noindex pages | imprint.html and privacy.html carry noindex,follow (no canonical) yet appear in sitemap.xml together with llms.txt. | Reduce the sitemap to / and the CV PDF (proposal in findings/sitemap.md); drop changefreq/priority. |
| Low | Legal pages lack canonicals | imprint.html and privacy.html have no rel=canonical. | Add self-canonicals. |
| Low | Duplicate CV URL | /Sergej_Kukshausen_CV.pdf and /assets/sergej-kukshausen-cv.pdf are byte-identical. | Keep one, 301 the other, list it in the sitemap. |
| Low | Duplicate theme-color and legacy meta keywords | theme-color appears twice; meta keywords is ignored by Google. | Remove duplicates; keywords tag is harmless but dead weight. |
| Low | 36 outbound vendor links in the toolkit | Every logo is a target=_blank link to a vendor site; the section is the second screen and leaks link equity and attention. | Cut to ~12 logos, show labels, drop the outbound links. |

## Schema / Structured Data (58/100)

**What works**

- One valid Person JSON-LD block with sameAs, address, telephone, knowsLanguage
- No deprecated types, no syntax errors

**Findings**

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| High | No ProfilePage wrapper | Person floats without page or site context; Google documents ProfilePage with mainEntity Person for personal pages. | Replace the block with the generated @graph (WebSite + ProfilePage + ImageObject + Person) in findings/generated-schema.json. |
| High | Person lacks @id, image, description | Portrait and meta description exist but are not referenced in schema. | Included in the generated graph (@id https://sergej.kukshausen.me/#person). |
| Medium | Employer, education, certifications, expertise missing | No worksFor, alumniOf, hasCredential, knowsAbout, hasOccupation. | Generated: worksFor Fiserv, alumniOf TU Bergakademie Freiberg, 3 credentials, 16 knowsAbout. |
| Medium | sameAs incomplete and inconsistent | Upwork and Malt missing; Xing URL differs between schema and llms.txt. | Normalise to five sameAs URLs and link them on-page. |
| Low | email uses mailto: prefix | Tolerated but non-standard. | Use the bare address. |

## Performance (CWV) (84/100)

**What works**

- Critical path is 6 same-origin requests / 114 KB, zero third parties
- TTFB 100-175 ms, desktop LCP 0.28 s, TBT ~12 ms
- Brotli installed, HTTP/3 enabled
- Lab mobile LCP 2.18 s (Good)

**Findings**

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| High | Font swap causes layout shift | Lexend Deca is ~11% wider than the fallback; at swap the H1 re-wraps from 4 to 6 lines (+82 px). Lab CLS 0.094, 0.187 with reduced motion, 0 with font cached. The emitted size-adjust:100% is a no-op. Font preload also lacks crossorigin so the woff2 downloads twice. | Add local() fallback @font-face with size-adjust ~111% (Arial) / ~102% (Roboto) plus ascent/descent overrides, or font-display: optional; add crossorigin to the preload. |
| High | No Cache-Control anywhere | Hashed bundles revalidate every visit; shared Last-Modified resets caching each deploy. | nginx map config in findings/performance.md. |
| Medium | Reveal animation gates mobile LCP | Hero paragraph is opacity:0 with 700 ms delay; LCP 2.18 s vs 0.69 s without it. | Exclude the LCP element from data-reveal. |
| Medium | Portrait preload is below the fold on phones | Preloaded at high priority (y=840 on an 823 px viewport) ahead of the font. | Add media="(min-width:768px)" to the preload and use <picture>/srcset. |
| Low | Compression and image weight | gzip wins negotiation over brotli; gzip applied to woff2/webp/pdf; sergej-casual.webp is 240 KB (60% of page bytes) with no AVIF/srcset. | Prefer br, exclude already-compressed types, add AVIF + srcset. |

## AI Search Readiness (68/100)

**What works**

- robots.txt allows all 16 named AI crawlers; all tested UAs get full HTML
- llms.txt exists and follows the spec structure
- Contact form is agent-usable (labels, no CAPTCHA, aria-live confirmation)
- Accessibility tree clean: landmarks, named links, agent_ux_check 100/100

**Findings**

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Critical | llms.txt links to three 404 pages | 3 of 5 links under '## Pages' are dead; agents following them hit dead ends. | Publish or remove them (patch in findings/agentic-drafts/llms.txt.patch.md). |
| High | Freelance positioning has no indexable support | Freelance/interim/fractional/Upwork/Malt/Claude expert: 0 occurrences in HTML vs 30+ in llms.txt; AI engines corroborate across surfaces. | Add a 'Work with me' section, Upwork and Malt links, one consistent role string. |
| Medium | No question headings or entity sentence | No 'X is Y' first sentence, no question H2s, H1 is three fragments; citability 60/100. | Add 'Sergej Kukshausen is ...' opener and the six client questions as headings with direct answers. |
| Low | No Content-Signal in robots.txt | llms.txt says training/indexing/citation allowed, but no Content-Signal line exists. | Apply findings/agentic-drafts/robots.txt.draft-ai-train-yes (or -no) inside each UA group. |
| Low | No Markdown delivery, README exposed | Accept: text/markdown returns HTML; /README.md is served and names the private source repo. | Optional nginx negotiation for .md; block or remove README.md. |
| Info | Lighthouse Agentic Browsing not measured | PSI returned 429 (anonymous quota exhausted, no Google API key). | Add a Google API key and rerun /seo agentic lighthouse. |

## Images (72/100)

**What works**

- All images have alt text and width/height
- Hero portrait is WebP (55 KB) and preloaded
- Skill icons are SVG with lazy loading

**Findings**

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Medium | Largest image has no srcset or AVIF | sergej-casual.webp is 240 KB, 60% of page bytes. | Serve AVIF + WebP via <picture> with 2-3 widths. |
| Low | OG image is JPEG, not the optimised portrait | og:image points to sergej-portrait.jpg (70 KB) while the page uses the WebP. | Fine for social crawlers; consider a dedicated 1200x630 OG image. |
| Low | Portrait preload fires on mobile where it is below the fold | Competes with the font for bandwidth. | Scope the preload with a media attribute. |

## Methodology

Full audit per the claude-seo `seo-audit` skill (v2.4.2): 10 specialist passes (technical, content, schema, sitemap, performance, visual, GEO, agentic, SXO, backlinks). Weighted score: Technical 22%, Content 23%, On-Page 20%, Schema 10%, Performance 10%, AI Search Readiness 10% (GEO and agentic blended), Images 5%. CWV figures are Playwright lab estimates (slow 4G, 4x CPU) because PageSpeed Insights returned HTTP 429 without an API key. Detailed evidence, raw outputs, nginx snippets, and the generated JSON-LD live in `findings/`. Screenshots in `screenshots/`.


## Specialist findings

- findings/technical.md (293 lines)
- findings/content.md
- findings/schema.md + findings/generated-schema.json
- findings/sitemap.md
- findings/performance.md
- findings/visual.md
- findings/geo.md
- findings/agentic.md + findings/agentic-drafts/
- findings/sxo.md
- findings/backlinks.md
