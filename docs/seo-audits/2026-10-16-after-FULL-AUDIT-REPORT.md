# Full SEO Audit Report: sergej.kukshausen.me

Audit date: 2026-10-16 (post-rebuild run). Tool: claude-seo `/seo audit` v2.4.2.
Scope: https://sergej.kukshausen.me/ (single HTML page plus CV PDF, imprint and privacy pages). Ten specialist passes ran in parallel: technical, content, schema, sitemap, performance, visual, GEO, agentic, SXO, backlinks.
Data limits: no Google API key (no PSI, CrUX, GSC or GA4 field data), backlink credential tier 0 (Common Crawl and verification crawler only), no DataForSEO, no drift baseline. Performance figures are Playwright lab measurements.

## 1. Executive Summary

**SEO Health Score: 76 / 100** (previous audit on 2026-10-16, pre-rebuild: 69 / 100, +7)

Business type detected: personal services / B2B consulting site. Fractional and interim engineering management for fintech and banking, mainframe-to-AWS migration, AI skills for development teams, M/Text output management. Based in Budapest, DE/EN, remote plus DACH on-site. Not a local storefront, so the local and maps passes were not spawned.

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 72 | 15.8 |
| Content Quality | 23% | 74 | 17.0 |
| On-Page SEO | 20% | 76 | 15.2 |
| Schema / Structured Data | 10% | 80 | 8.0 |
| Performance (CWV, lab) | 10% | 82 | 8.2 |
| AI Search Readiness | 10% | 75 | 7.5 |
| Images | 5% | 82 | 4.1 |
| **SEO Health Score** | | **76** | 75.9 |

AI Search Readiness blends the GEO citability score (69, weight 70%) with Agent Readiness (88, weight 30%).

Supplementary scores (not weighted into the health score): Sitemap 90, Visual / UX 80, Agent Readiness 88, GEO 69, SXO gap score 60 (persona average 64), Backlinks: insufficient data at tier 0.

### Top issues

1. **High. All five server-side items from the previous audit are still present.** No security headers, the http redirect is a 307 instead of a 301, no Cache-Control on any asset, the www host serves a self-signed Traefik certificate and a 503, and the manifest is served as application/octet-stream. Verified live with curl. These cap Technical SEO at 72 and Performance at 82.
2. **High. No third-party proof on the page.** No testimonials, ratings, talks or press. Authoritativeness scores 48/100 and Trust is the lowest dimension for every buyer persona.
3. **High. One URL carries four service intents with 25 to 40 words each.** None of six queried SERPs had a personal site in the top 9. They reward dedicated service pages, aggregators and case studies.
4. **High. Entity visibility gap.** A name search does not surface the site (to be confirmed in Search Console), the domain is absent from the Common Crawl graph, none of the six owned profiles could be confirmed linking back, and the GitHub profile has no name, bio or website.
5. **High. Claim and role-label inconsistencies.** The hero says "11+ years in banking and fintech" while the timeline shows banking from 2018. The job title differs across title tag, schema, llms.txt, CV and Xing.
6. **High. Mobile and social presentation.** The primary mobile CTA stays invisible above the fold until a scroll event. The og:image is a 712x1040 portrait used with summary_large_image and no width, height or alt tags.

### Quick wins (under 30 minutes each)

1. Fill in the GitHub profile (name, bio, website, location) and add a profile README linking to the site.
2. Change hero and meta description to "11+ years in software delivery, 8 in banking and fintech".
3. Render the hero CTAs without scroll-reveal so the mobile CTA shows on load.
4. Rewrite the first sentence of each service card to name Sergej, the service and the proof.
5. Remove Person.telephone from JSON-LD and use typed Country / AdministrativeArea for areaServed.
6. llms.txt: drop the Keywords block, match the four on-page services, use one Xing URL everywhere.
7. Create a 1200x630 OG card image and add og:image:width, og:image:height, og:image:alt, twitter:image:alt.
8. Fix the hero preload with imagesrcset and imagesizes mirroring the picture element.
9. Add aria-label and data-topic to the four "Talk about this" links so they preselect the form topic.
10. Set the website field on LinkedIn, Xing, Malt and Upwork.

## 2. Before / After Comparison

| | Previous audit (pre-rebuild) | This audit (post-rebuild) |
|---|---|---|
| SEO Health Score | 69 / 100 | 76 / 100 |
| Services / FAQ / process content | Missing, thin content flagged | Present. Services section with four offers and proof lines, 3-step process, 6 buyer-phrased FAQs |
| Structured data | Basic | ProfilePage + FAQPage + Person + 4 Service/Offer in one valid graph, all @ids resolve, FAQ matches visible text |
| Font loading | Flagged | Variable woff2 preloaded, font-display swap, metric-adjusted fallbacks, CLS 0 across swap |
| Hero image | Flagged | AVIF/WebP/JPEG picture with 356w/712w srcset, width/height, fetchpriority high |
| Sitemap | Bloated | 2 URLs, no priority/changefreq, validated, score 90 |
| robots.txt | No Content-Signal | Content-Signal valid in all 15 groups, AI crawlers explicitly allowed |
| llms.txt | Incorrect | Present, well-formed, every internal URL resolves 200 (still overstates services and has a keyword block) |
| security.txt | Missing | Present with Contact and Expires (2027-10-16) |
| IndexNow key | Not present | Claimed in the rebuild, but no key file could be found at common paths or referenced anywhere. Unverified |
| Security headers | Missing | Still missing (server-side, not changed) |
| http redirect | 307 | Still 307 (server-side) |
| Cache-Control | Missing | Still missing on every asset (server-side) |
| www host | Broken cert | Still self-signed Traefik cert, 503, no redirect (server-side) |
| Manifest MIME | Wrong | Still application/octet-stream (server-side) |

The previous audit did not leave a per-category breakdown in this workspace, so the comparison is overall score plus item status. If the five server-side items are fixed, Technical SEO would rise to roughly 88 and Performance to roughly 90, which puts the health score at about 80 / 100 with no content changes.

## 3. Technical SEO (72 / 100)

What works: valid apex certificate (expires 2026-12-21), HTTP/2 with HTTP/3 advertised, valid robots.txt with sitemap declared, self-referencing canonical, index,follow, lang=en, static server-rendered HTML, preloaded font and LCP image, full favicon set, custom 404 returns 404, security.txt and llms.txt present.

| Severity | Finding | Fix |
|---|---|---|
| High | No HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy. Server version disclosed. | nginx add_header block in findings/technical.md. CSP Report-Only first (one inline script). server_tokens off. |
| High | www: self-signed Traefik cert, 503, http://www 404. Same IP as apex. | Add www to the Traefik router with a cert resolver and 301 to apex, or delete the www record. |
| Medium | http to https is 307. | redirectscheme.permanent=true or nginx return 301. |
| Medium | No Cache-Control anywhere. CSS/JS are content-hashed. | /assets/ immutable one year; fonts and images 30 days; HTML no-cache. |
| Medium | IndexNow key file not discoverable. | Host /<key>.txt with the key as body, or drop IndexNow. |
| Low | site.webmanifest served as application/octet-stream. | types { application/manifest+json webmanifest; } |
| Low | /index.html returns 200; /README.md is served and its Disallow sits only in the * group. | 301 /index.html to /; remove README.md from the web root. |
| Info | English only, DE/EN claimed, no hreflang. | /de/ with reciprocal hreflang if German pages are planned. |

Crawlability, indexability, mobile viewport and JS rendering all pass. Core Web Vitals markup is strong. Security is the failing sub-category.

## 4. Content Quality (74 / 100)

E-E-A-T composite 70: Experience 80, Expertise 72, Authoritativeness 48, Trustworthiness 80. content_quality.py scores the main text 90 with no filler and no AI-typical phrasing. metadata_template.py reports low templating risk. Readability is Flesch 36, grade 11, acceptable for a CTO audience. About 1,000 main-content words, 1,460 visible.

What works: the services section that was missing before now exists with four named offers, scope, audience and proof lines. Outcomes are concrete and attributed (31%, 12%, 21%, 75%, EUR 180K). The process section explains the buying path. FAQ questions read like real buyer queries. Contact data, imprint, privacy and a visible update date are in place.

| Severity | Finding | Fix |
|---|---|---|
| High | "11+ years in banking and fintech" contradicts the timeline (banking from 2018, about 8 years). | "11+ years in software delivery, 8 in banking and fintech" in hero and meta description. |
| High | No testimonials, ratings, talks or press. AI-skills offer has no outcome metric. | 2-3 attributed quotes, Malt/Upwork rating once available, link a public talk or skill repo. |
| High | Each service is 25-35 words with no dedicated URL. | 2-4 service pages of 800+ words, starting with mainframe-to-AWS and fractional EM. |
| Medium | DE/EN claimed, no German content; M/Text (DACH) offer is English-only. | /de/ for homepage and M/Text with hreflang, native German copy. |
| Medium | Metrics repeated 3-4 times; "EUR 2.2M" heading never explained. | Keep the headline metric once; add new detail elsewhere; spell out the programme budget. |
| Medium | Availability alongside Fiserv unclear. | One factual availability sentence and a Fiserv-fit FAQ. |
| Medium | FAQ answers short, some non-responsive, third-person answers to "you" questions. | 40-80 words each, direct answer first, add a definitional FAQ, first person where addressed. |
| Low | Dictionary tooltips, CV boilerplate, mixed person in About, no language levels or certification years. | Rewrite as "where I used it", split the About opener, add levels and years. |

## 5. On-Page SEO (76 / 100)

What works: title 62 characters and meta description 158 characters, unique and descriptive. One H1, seven H2s mapped to nav anchors, H3 per item. No templated metadata.

| Severity | Finding | Fix |
|---|---|---|
| Medium | H1 "Engineering Leadership for Mission-Critical Payment Platforms" has no primary keyword or name. Title says "Fractional Tech Lead", which never appears in copy. | H1 "Fractional Engineering Manager for Payment and Banking Platforms"; align the title. |
| Medium | "Book a 20-min call" goes to a message form; card CTAs do not preselect the topic. | Embed a scheduler or relabel; data-topic on card CTAs. |
| Low | Internal links are anchors plus CV, privacy, imprint. | Follows from the service-pages work. |
| Low | Four identical "Talk about this" link names. | Per-card aria-label or specific labels. |

## 6. Schema and Structured Data (80 / 100)

One valid JSON-LD graph (9.5 KB) in the raw HTML: WebSite, ProfilePage, Person, FAQPage, four Service/Offer pairs, ImageObject. All @id references resolve. ProfilePage.mainEntity is the Person. dateModified matches the visible date. All six FAQ pairs match visible text verbatim. Person carries jobTitle, image, address, alumniOf, three credentials, 16 knowsAbout items, four languages and five sameAs profiles.

| Severity | Finding | Fix |
|---|---|---|
| Medium | Person.telephone in markup but not on the page. | Remove or publish visibly. |
| Medium | areaServed strings "EU", "DACH", "Remote" on all four Services. | Typed Country and AdministrativeArea; remote in the description. |
| Medium | No business entity (optional). | Add ProfessionalService only if trading as a business. |
| Low | No dateCreated; dateModified is date-only; Fiserv worksFor has only a name; Xing sameAs differs from the page link; no WebSite alternateName. | Add dateCreated with full ISO 8601, Fiserv url and @id, one Xing URL, alternateName. |
| Info | FAQPage has no SERP value since Google retired FAQ rich results for all sites on 7 May 2026. | Keep as a machine-readable summary or drop; do not expand. |
| Info | CV PDF not in schema. | Optional subjectOf DigitalDocument. |

Corrected JSON-LD snippets are in findings/schema.md.

## 7. Performance (82 / 100, lab only)

| Metric | Desktop | Mobile (4x CPU, 1.6 Mbps) | Threshold |
|---|---|---|---|
| TTFB | 199 ms | 185 ms | 800 ms |
| FCP | 324 ms | 792 ms | 1.8 s |
| LCP | 324 ms (portrait AVIF) | 792 ms (hero paragraph) | 2.5 s |
| CLS | 0 | 0 | 0.1 |
| TBT proxy | 0 ms | 21 ms | |
| Requests / transfer | 43 / 173 KB | 12 / 87 KB | |

Field data is unavailable (no PSI or CrUX key), so no Core Web Vitals pass or fail can be asserted at p75.

What works: Brotli on HTML and CSS, HTTP/2, one render-blocking 6.8 KB CSS file, deferred 3 KB JS module, preloaded variable font with swap and metric fallbacks, AVIF picture with srcset and dimensions, 495 DOM elements, no third-party scripts, no bfcache blockers.

| Severity | Finding | Fix |
|---|---|---|
| High | No Cache-Control on any asset; repeat visits revalidate up to 43 files. Server-side. | Immutable on hashed assets, 30 days on fonts and images, no-cache on HTML. |
| Medium | Hero preload fetches the 712w AVIF while sizes selects the 356w; both downloaded, ~31 KB wasted. | Responsive preload with imagesrcset and imagesizes. |
| Low | Hero text hidden until JS runs; mobile LCP element is that text. | Keep H1 and LCP paragraph visible by default. |
| Low | Vite modulepreload polyfill stub; 32 separate skill-icon SVGs. | polyfill: false; SVG sprite. |

## 8. Images (82 / 100)

38 img tags. All content images have descriptive alt; decorative icons use alt="" and aria-hidden. Portrait and casual photo use picture with AVIF, WebP and JPEG fallbacks. Dimensions on the portrait, casual photo and all 29 skill icons. Portrait eager with fetchpriority high; everything else lazy.

| Severity | Finding | Fix |
|---|---|---|
| High | og:image is a 712x1040 portrait with summary_large_image and no width, height, alt or type tags. | 1200x630 card image plus the missing meta tags. |
| Medium | Casual photo JPEG fallback is 252 KB. | Recompress to about 80 KB. |
| Low | 7 contact icons lack width/height. | Add 20x20. |

## 9. AI Search Readiness (75 / 100)

GEO citability 69 (Citability 66, Structural Readability 78, Multi-Modal 45, Authority 58, Technical Accessibility 90). Agent Readiness 88 (agent_ux_check 100/100). The Lighthouse Agentic Browsing fraction could not be measured without a PSI key.

What works: every AI search, user-fetch and training crawler explicitly allowed with valid Content-Signal syntax in all 15 groups. No WAF differentiation for GPTBot, ClaudeBot or PerplexityBot. Server-rendered content (1,448 words without JS). llms.txt well-formed with all internal URLs resolving. Freshness signals agree across page, schema, sitemap and llms.txt. FAQ answers start with the named entity and a number. Accessibility tree has 764 nodes, 0 unnamed interactive elements, four landmarks, all form fields labelled.

| Severity | Finding | Fix |
|---|---|---|
| High | Service-card passages lose their subject when extracted (H3s dropped); "EUR 2.2M" only in a heading. | Self-contained first sentences (rewrites in findings/geo.md). |
| High | Role label differs across title, schema, llms.txt, CV and Xing. | "Engineering Manager at Fiserv" plus "Fractional Engineering Manager" everywhere. |
| Medium | No definitional passage for fractional engineering management; three thin FAQ answers. | Add a "What is a fractional engineering manager?" FAQ and the three rewrites. |
| Medium | Weak off-site authority; GitHub profile empty. | Fill in GitHub, add testimonials, link the PSM I certificate. |
| Medium | llms.txt lists 6 services (page has 4) and a keyword block with unsupported terms. | Drop the keyword block; match the four services. |
| Medium | IndexNow key not discoverable; README.md reachable by named AI bots. | Host the key file or drop IndexNow; remove README.md. |
| Low | No diagram, table or video. Markdown delivery and WebMCP absent (optional). | One architecture diagram and an HTML case table. |

Platform estimates (heuristic): Google AI Overviews 60, ChatGPT search 66, Perplexity 70, Bing Copilot 63.

## 10. Search Experience (SXO gap score 60 / 100)

Persona scores: recruiter verifying identity 74, CTO needing an interim lead 65, fintech VP Eng planning a migration 60, DACH hiring manager 54. Trust is 12 to 14 out of 25 for every persona.

SERP page-type mismatch is high. For "fractional engineering manager", "interim engineering manager DACH" and "mainframe to AWS migration banking consultant", the top results are marketplace hire pages, role-by-city aggregators and vendor case studies. No personal site appears. The M/Text SERP is 100% job listings, so the supply side is empty and a dedicated page could rank. A name search returned nothing about this person, which must be confirmed in Search Console.

Ranked changes: testimonials plus an availability line and Fiserv FAQ; a real scheduler and topic preselection; brand-query visibility through GSC and rel=me profile links; a mainframe-to-AWS case-study page and a fractional EM page; H1 rewrite; /de/ with a rate band and freelancermap and fratch listings; mobile header, card padding and toolkit trim. Full user stories and evidence are in findings/sxo.md.

## 11. Backlinks and Authority (no numeric score)

Credential tier 0, so only Common Crawl and the verification crawler ran. kukshausen.me and sergej.kukshausen.me are absent from the cc-main-2026-jan-feb-mar graph (PageRank, harmonic centrality and in-degree null). This implies few or no crawled inbound links as of Q1 2026 but does not prove zero backlinks. 0 of 6 owned profile pages could be confirmed linking back. GitHub has no site link and no profile README. LinkedIn, Xing, Malt and Upwork block the crawler. No toxic signals are observable. Referring domains, anchors, spam score and competitor gap are unknown without Moz or Bing keys.

Acquisition plan: fix profile links and the GitHub README (week 1), fractional-exec and consultant directories (weeks 1-3), GitHub projects tied to case studies (weeks 2-6), guest posts (month 2-3), podcasts (month 2-4), speaking (month 3+), monitoring with Bing Webmaster Tools and a free Moz key.

## 12. Sitemap (90 / 100) and Visual (80 / 100)

Sitemap: declared in robots.txt, validated, 2 URLs, no bloat, every URL 200 with matching canonical. Low: lastmod values look deploy-stamped and the PDF lastmod disagrees with its server date. The PDF in the sitemap is acceptable but optional.

Visual: desktop above the fold shows H1, value proposition, four stats, both CTAs and a crisp portrait. CLS 0 on both viewports, strong contrast, 16px base font. High: the mobile primary CTA is hidden by scroll-reveal above the fold. Medium: possible horizontal overflow (body 431px against a 390px viewport, currently clipped) and 18 to 32px tap targets where 44px is the target. Screenshots are in screenshots/.

## 13. Methodology

Homepage rendered with render_page.py (raw mode, not an SPA). Technical checks with curl and sitemap_discovery.py. Content scored with content_quality.py and metadata_template.py. Schema extracted from the rendered DOM and validated against Schema.org and Google documentation. Performance measured with Playwright on desktop (1350x940, unthrottled) and mobile (412x823, DPR 2.6, 4x CPU, 1.6 Mbps, 150 ms RTT) plus preload_check.py. Screenshots at 1440x900 and 390x844. Agent readiness via agentic_check.py and agent_ux_check.py. Backlinks via commoncrawl_graph.py and verify_backlinks.py. SXO via eight WebSearch SERPs on 2026-10-16. Weights per the seo-audit skill: Technical 22, Content 23, On-Page 20, Schema 10, Performance 10, AI Search 10, Images 5.

Per-category evidence: findings/technical.md, content.md, schema.md, sitemap.md, performance.md, visual.md, geo.md, agentic.md, sxo.md, backlinks.md. Structured data: audit-data.json. Prioritised plan: ACTION-PLAN.md.
