# Action Plan: sergej.kukshausen.me

Generated 2026-10-16 from the post-rebuild audit. SEO Health Score 76 / 100 (previous 69). Items are grouped by priority. Effort is for the site owner. "Server" marks items blocked until server config can be changed.

## Critical (fix immediately)

No finding blocks indexing or risks a penalty. The page is indexable, canonical and crawlable. Start with the High items.

## High (fix within 1 week)

| # | Action | Source | Effort |
|---|---|---|---|
| 1 | Server: add HSTS, X-Content-Type-Options nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, and a CSP in Report-Only first. Set server_tokens off. | technical | 30 min when server access exists |
| 2 | Server: add www to the Traefik router with a certificate and 301 it to the apex, or delete the www DNS record. | technical | 20 min |
| 3 | Server: make the http redirect permanent (301) and add Cache-Control (immutable on hashed /assets/, 30 days on fonts and images, no-cache on HTML). | technical, performance | 20 min |
| 4 | Fix the hero and meta description claim to "11+ years in software delivery, 8 in banking and fintech". | content | 5 min |
| 5 | Add 2-3 attributed testimonials (name, role, company, with consent) after the impact section. Show the Malt or Upwork rating once available. | content, sxo | 1-2 h |
| 6 | Add a factual availability line ("Available for engagements from [month], up to N days/week") and a FAQ "How does this fit with your role at Fiserv?". | content, sxo | 20 min |
| 7 | Rewrite the first sentence of each service card and the Capgemini case so it names Sergej, the service and the proof. Spell out the EUR 2.2M. Rewrites are in findings/geo.md. | geo, content | 30 min |
| 8 | Standardise the role label to "Engineering Manager at Fiserv" plus "Fractional Engineering Manager" in the title, schema jobTitle, llms.txt, CV, Xing, LinkedIn and GitHub. | geo | 45 min |
| 9 | Render the hero CTAs without scroll-reveal so "Book a 20-min call" is visible on load at 390x844. Place the CTA under the sub-copy, stats after. | visual | 10 min |
| 10 | Create a 1200x630 OG card image (portrait, name, title) and add og:image:width, og:image:height, og:image:alt, og:image:type and twitter:image:alt. | visual, images | 30 min |
| 11 | Fill in the GitHub profile (name, bio, website, location) and create the kukshaus/kukshaus README linking to the site. Set the website field on LinkedIn, Xing, Malt and Upwork. | backlinks, geo | 15 min |
| 12 | Verify the brand query "Sergej Kukshausen" in Search Console (URL Inspection plus Performance filtered on the name) and request indexing. | sxo | 10 min |

## Medium (fix within 1 month)

| # | Action | Source | Effort |
|---|---|---|---|
| 13 | Rewrite the H1 to include the primary term, for example "Fractional Engineering Manager for Payment and Banking Platforms", and align the title tag. | content, sxo | 15 min |
| 14 | Embed a scheduler (Cal.com or Calendly, 20-min slots) or relabel the CTA to "Request a 20-min call". | content, sxo | 30 min |
| 15 | Give the four "Talk about this" links data-topic and aria-label, and set select#topic on click. Use specific labels ("Discuss a migration"). | sxo, agentic | 20 min |
| 16 | Schema: remove Person.telephone; replace areaServed strings with typed Country and AdministrativeArea; add ProfilePage.dateCreated and full ISO 8601 dateModified; add Fiserv url and @id; use one Xing URL; add WebSite.alternateName. | schema | 30 min |
| 17 | llms.txt: drop the Keywords block, match the four on-page services, fix the Xing URL. | geo | 15 min |
| 18 | Add a FAQ "What is a fractional engineering manager?" and expand the AI-rollout, Jira-agent and German-speaking answers to 40-80 words with a method, example or number. Answer "you" questions in first person. | geo, content | 30 min |
| 19 | Add scope and timeframe to the outcome numbers once per case (team size, volume, measurement period). | geo | 20 min |
| 20 | Fix the hero preload with imagesrcset and imagesizes mirroring the picture element. Keep the H1 and LCP paragraph visible without JS. | performance | 15 min |
| 21 | Mobile: 44px tap targets on nav, card links, contact and footer links; overflow-x clip on the blob wrapper; clamp tooltip width; darken placeholders to 4.5:1. | visual | 45 min |
| 22 | Host the IndexNow key file at /<key>.txt (body = key) and submit via indexnow_submit.py, or drop IndexNow. | technical, agentic | 10 min |
| 23 | Stop deploying README.md to the web root (return 404) and drop the Disallow line. 301 /index.html to /. | technical | 10 min |
| 24 | Server: set the manifest MIME type to application/manifest+json. | technical | 5 min |
| 25 | Recompress the casual-photo JPEG fallback to about 80 KB; add width/height to the 7 contact icons. | images | 15 min |
| 26 | Add a rate band or "from EUR X/day" and a FAQ on how the rate depends on scope and on-site share. | sxo | 15 min |

## Low (backlog)

| # | Action | Source | Effort |
|---|---|---|---|
| 27 | Publish /mainframe-to-aws-migration-banking/ as a case-study page: context, constraints, approach, team and role, timeline, results, stack, FAQ, before/after architecture diagram. Link from the service card. | sxo, content, backlinks | 1 day |
| 28 | Publish /fractional-engineering-manager/ with fit/no-fit guidance (EM vs CTO), first-30-days plan, engagement models and rates. | sxo, content | half day |
| 29 | Publish /mt-output-management/ for the M/Text SERP where no supplier currently ranks. | sxo | half day |
| 30 | Build /de/ with reciprocal hreflang (en, de, x-default), native German copy, a German H1 and rate line. List on freelancermap and fratch with rel=me links. | content, sxo | 1-2 days |
| 31 | Trim the toolkit to 10-12 outcome-tied tools; drop dictionary definitions. Left-align impact-card paragraphs. Collapse the mobile header on scroll and add a header "Book a call" button. | content, visual, sxo | 1 h |
| 32 | Add an HTML case table (Client / Problem / What I did / Result) and optionally a 60-90 s intro video with VideoObject. | geo | 2 h |
| 33 | Disable the Vite modulepreload polyfill; combine the 32 skill icons into one SVG sprite. | performance | 30 min |
| 34 | Drive sitemap lastmod and the visible "Updated" date from the last real content edit; preserve the PDF mtime on deploy. Optionally serve the sitemap as application/xml with max-age=3600. | sitemap | 20 min |
| 35 | Link acquisition: fractional-exec and consultant directories, one GitHub project tied to a case study, one guest post, one podcast, one meetup talk. | backlinks | ongoing |
| 36 | Optional: ProfessionalService node only if trading as a business; subjectOf DigitalDocument for the CV; PGP-sign security.txt; Markdown delivery via /index.md; WebMCP annotations on the contact form. | schema, agentic | optional |

## Monitoring (ongoing)

1. Configure a Google API key for PSI and CrUX and Search Console access, then rerun `/seo google cwv` and `/seo audit` for field data.
2. Add free Moz and Bing Webmaster keys and rerun `/seo backlinks` for a numeric authority score.
3. Capture a drift baseline with `/seo drift baseline https://sergej.kukshausen.me` after the Medium items ship, and compare after each deploy.
4. Renew the apex certificate before 2026-12-21 and security.txt before 2027-10-16.
5. Rerun this audit after the server-side items are fixed. Expected health score with no content changes: about 80 / 100.
