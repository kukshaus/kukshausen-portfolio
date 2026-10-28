// Homepage template. Rendered once per language by scripts/render-pages.mjs.
import { SITE, CALENDLY, MALT, UPWORK, UPDATED, langDir, toRoot, fill, headCommon, header, footer } from './shared.mjs';

export const SKILLS = [
  ['python', 'Python'], ['bash', 'Bash'], ['java', 'Java'], ['php', 'PHP'], ['javascript', 'JavaScript'],
  ['typescript', 'TypeScript'], ['html5', 'HTML5'], ['css', 'CSS'], ['angular', 'Angular'], ['mysql', 'MySQL'],
  ['postgresql', 'PostgreSQL'], ['aws', 'AWS'], ['docker', 'Docker'], ['kubernetes', 'Kubernetes'],
  ['kafka', 'Apache Kafka'], ['jenkins', 'Jenkins'], ['argocd', 'Argo CD'], ['gitlab', 'GitLab CI/CD'], ['git', 'Git'],
  ['linux', 'Linux'], ['copilot', 'GitHub Copilot'], ['claude', 'Claude'], ['jira', 'Jira'], ['confluence', 'Confluence'],
  ['retool', 'Retool'], ['swift', 'Swift'], ['selenium', 'Selenium'], ['drupal', 'Drupal'], ['redmine', 'Redmine'],
];


const FLAGS = {
  de: '<svg class="flag" viewBox="0 0 3 2" aria-hidden="true"><rect width="3" height="2" fill="#000"/><rect y="0.667" width="3" height="1.333" fill="#DD0000"/><rect y="1.333" width="3" height="0.667" fill="#FFCE00"/></svg>',
  ru: '<svg class="flag" viewBox="0 0 3 2" aria-hidden="true"><rect width="3" height="2" fill="#fff"/><rect y="0.667" width="3" height="1.333" fill="#0039A6"/><rect y="1.333" width="3" height="0.667" fill="#D52B1E"/></svg>',
  en: '<svg class="flag" viewBox="0 0 60 30" preserveAspectRatio="none" aria-hidden="true"><clipPath id="uk-c"><path d="M30,15h30v15zv15H30zH0V15zV0h30z"/></clipPath><rect width="60" height="30" fill="#012169"/><path d="M0,0L60,30M60,0L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0L60,30M60,0L0,30" clip-path="url(#uk-c)" stroke="#C8102E" stroke-width="4"/><path d="M30,0v30M0,15h60" stroke="#fff" stroke-width="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" stroke-width="6"/></svg>',
  hu: '<svg class="flag" viewBox="0 0 3 2" aria-hidden="true"><rect width="3" height="2" fill="#CE2939"/><rect y="0.667" width="3" height="1.333" fill="#fff"/><rect y="1.333" width="3" height="0.667" fill="#477050"/></svg>',
};

const LOCALES = ['en_GB', 'de_DE', 'ru_RU', 'hu_HU'];
export const AISKILLS = 'https://github.com/kukshaus/ai-skills';
const ACCESS_KEY = process.env.VITE_CONTACT_ACCESS_KEY ?? '';
const link = (href, cls = 'underline underline-offset-4 text-[#073E29]') => [
  `<a href="${href}" target="_blank" rel="noopener" class="${cls}">`,
  '</a>',
];
/** Before/after diagram of the payment routing migration, the one case shown as a picture. */
const route = (r) => `<figure class="route">
                <figcaption class="route-label">${r.label}</figcaption>
                <div class="route-path">
                  <p class="route-node"><span class="route-k">${r.before}</span>${r.beforeText}</p>
                  <span class="route-arrow" aria-hidden="true"></span>
                  <p class="route-node is-after"><span class="route-k">${r.after}</span>${r.afterText}</p>
                </div>
              </figure>`;
const stripTags = (html) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');

function schema(t) {
  const url = `${SITE}${langDir(t.lang)}`;
  const person = `${SITE}#person`;
  const area = [
    { '@type': 'Country', name: 'Germany' },
    { '@type': 'Country', name: 'Austria' },
    { '@type': 'Country', name: 'Switzerland' },
    { '@type': 'Country', name: 'Hungary' },
    { '@type': 'Place', name: 'Remote across Europe' },
  ];
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE}#website`, url: SITE, name: 'Sergej Kukshausen', alternateName: 'sergej.kukshausen.me', inLanguage: ['en', 'de', 'ru', 'hu'], publisher: { '@id': person } },
      {
        '@type': 'ProfilePage', '@id': `${url}#profilepage`, url, name: stripTags(t.meta.title), inLanguage: t.lang,
        dateCreated: '2026-10-16', dateModified: '2026-10-17T09:00:00+02:00',
        isPartOf: { '@id': `${SITE}#website` }, about: { '@id': person }, mainEntity: { '@id': person },
        primaryImageOfPage: { '@id': `${SITE}#portrait` },
      },
      { '@type': 'ImageObject', '@id': `${SITE}#portrait`, url: `${SITE}assets/images/sergej-portrait.jpg`, contentUrl: `${SITE}assets/images/sergej-portrait.jpg`, width: 712, height: 1040, caption: 'Sergej Kukshausen' },
      {
        '@type': 'Person', '@id': person, name: 'Sergej Kukshausen', url: SITE, image: { '@id': `${SITE}#portrait` },
        jobTitle: t.schema.jobTitle, description: t.schema.description, email: 'sergej@kukshausen.me',
        address: { '@type': 'PostalAddress', addressLocality: 'Budapest', addressCountry: 'HU' },
        worksFor: { '@type': 'Organization', '@id': 'https://www.fiserv.com/#organization', name: 'Fiserv', url: 'https://www.fiserv.com/' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'TU Bergakademie Freiberg' },
        hasCredential: [
          { '@type': 'EducationalOccupationalCredential', name: 'Professional Scrum Master I (PSM I)', credentialCategory: 'certification' },
          { '@type': 'EducationalOccupationalCredential', name: 'Certified SAFe 4 Agilist', credentialCategory: 'certification' },
          { '@type': 'EducationalOccupationalCredential', name: 'BSc Computer Science', credentialCategory: 'degree' },
        ],
        hasOccupation: {
          '@type': 'Occupation', name: t.schema.jobTitle, occupationLocation: { '@type': 'City', name: 'Budapest' },
          skills: 'Engineering leadership, hiring and coaching, Agile/Scrum/SAFe, Python, Bash, AWS, microservices, Kubernetes, Kafka, GitLab CI/CD, payment systems (SEPA, PSD2), AI-assisted development',
        },
        knowsAbout: ['Engineering management', 'Agile software development (Scrum, SAFe)', 'Payment systems (SEPA, PSD2)', 'Cloud migration from mainframe to AWS', 'Microservices architecture', 'Python', 'Bash', 'Java', 'Amazon Web Services', 'Docker', 'Kubernetes', 'Apache Kafka', 'GitLab CI/CD', 'AI-assisted software development (GitHub Copilot, Claude, Codex)', 'M/Text output management', 'n8n workflow automation'],
        knowsLanguage: [
          { '@type': 'Language', name: 'German', alternateName: 'de' },
          { '@type': 'Language', name: 'Russian', alternateName: 'ru' },
          { '@type': 'Language', name: 'English', alternateName: 'en' },
          { '@type': 'Language', name: 'Hungarian', alternateName: 'hu' },
        ],
        makesOffer: t.services.items.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: stripTags(s.title), description: stripTags(s.desc), provider: { '@id': person }, areaServed: area },
        })),
        sameAs: ['https://www.linkedin.com/in/sergej-kukshausen-099015163/', 'https://www.xing.com/profile/Sergej_Kukshausen', 'https://github.com/kukshaus', UPWORK, MALT],
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`, isPartOf: { '@id': `${url}#profilepage` }, inLanguage: t.lang,
        mainEntity: t.faq.items.map((f) => ({
          '@type': 'Question', name: stripTags(f.q),
          acceptedAnswer: { '@type': 'Answer', text: stripTags(fill(f.a, { calendly: ['', ` (${CALENDLY})`], aiskills: ['', ` (${AISKILLS})`] })) },
        })),
      },
    ],
  };
  return JSON.stringify(graph, null, 2);
}

export function renderHome(t) {
  const root = toRoot(t.lang);
  const c = t.contact;

  return `<!doctype html>
<html lang="${t.lang}" class="scroll-smooth">
  <head>
${headCommon({ t, page: '', title: t.meta.title, description: t.meta.description, robots: 'index, follow' })}
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${t.ogLocale}" />
${LOCALES.filter((l) => l !== t.ogLocale).map((l) => `    <meta property="og:locale:alternate" content="${l}" />`).join('\n')}
    <meta property="og:url" content="${SITE}${langDir(t.lang)}" />
    <meta property="og:title" content="${t.meta.title}" />
    <meta property="og:description" content="${t.meta.description}" />
    <meta property="og:image" content="${SITE}assets/images/sergej-portrait.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="712" />
    <meta property="og:image:height" content="1040" />
    <meta property="og:image:alt" content="${t.meta.ogImageAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t.meta.title}" />
    <meta name="twitter:description" content="${t.meta.description}" />
    <meta name="twitter:image" content="${SITE}assets/images/sergej-portrait.jpg" />
    <meta name="twitter:image:alt" content="${t.meta.ogImageAlt}" />

    <script>
      document.documentElement.classList.add('js');
    </script>
    <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/lexend-deca-latin.woff2" crossorigin />${t.lang === 'ru' ? '\n    <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/montserrat-cyrillic.woff2" crossorigin />' : ''}
    <link rel="preload" as="image" imagesrcset="/assets/images/sergej-portrait-356.avif 356w, /assets/images/sergej-portrait-712.avif 712w" imagesizes="356px" type="image/avif" fetchpriority="high" media="(min-width: 768px)" />

    <script type="application/ld+json">
${schema(t)}
    </script>
  </head>

  <body>
${header(t, { page: '', anchors: true })}

    <main>
      <!-- ================= INTRO ================= -->
      <section
        id="intro"
        class="relative bg-[#FEF3DF] px-[1.5rem] pt-[1.5rem] sm:px-[2.5rem] sm:pt-[2.5rem] md:px-[5.5rem] md:pt-[5.5rem] scroll-mt-[100vmax]"
      >
        <div class="relative mx-auto max-w-[1170px] flex gap-4 flex-col md:flex-row">
          <div class="flex-1 pb-16">
            <p class="eyebrow text-[1rem] sm:text-[1.15rem]">
              <span class="text-gray-600">${t.hero.eyebrow}</span>
            </p>
            <h1 class="text-[clamp(2rem,4vmax,3rem)] leading-tight mt-3" data-split><span class="h1-name">Sergej Kukshausen</span> ${t.hero.h1}</h1>
            <p class="mt-3 text-base sm:text-lg leading-relaxed">${t.hero.sub}</p>

            <div class="mt-6 flex flex-wrap gap-3">
              <a href="${CALENDLY}" target="_blank" rel="noopener" class="cta text-white bg-[#073E29] px-5 py-3 font-bold inline-block">${t.hero.cta}</a>
              <a href="${root}Sergej_Kukshausen_CV.pdf" download="Sergej_Kukshausen_CV.pdf" class="cta-secondary px-5 py-3 font-bold inline-block">${t.hero.cv}</a>
            </div>
            <p class="mt-6 text-base leading-relaxed border-l-2 border-[#073E29] pl-4">${t.hero.proof} <a href="#projects" class="underline underline-offset-4 text-[#073E29] whitespace-nowrap">${t.hero.proofLink}</a></p>
            <p class="mt-4 text-sm text-gray-700">
              <span class="avail-dot" aria-hidden="true"></span>${t.hero.available} · ${t.hero.updated} <time datetime="${UPDATED}">${t.dateLong}</time>
            </p>
          </div>

          <div class="flex-1 md:-mb-16 order-1">
            <div class="portrait relative mx-auto w-[356px] max-w-full overflow-hidden">
              <picture>
                <source type="image/avif" srcset="/assets/images/sergej-portrait-356.avif 356w, /assets/images/sergej-portrait-712.avif 712w" sizes="356px" />
                <source type="image/webp" srcset="/assets/images/sergej-portrait-356.webp 356w, /assets/images/sergej-portrait-712.webp 712w" sizes="356px" />
                <img height="520" width="356" src="/assets/images/sergej-portrait.jpg" alt="${t.hero.portraitAlt}" class="mx-auto block" loading="eager" fetchpriority="high" />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= SERVICES ================= -->
      <section id="services" class="px-5 py-[5rem] scroll-mt-[8rem] md:scroll-mt-[6.5rem]">
        <div class="mx-auto max-w-[1170px]">
          <h2 class="text-[2.5rem] leading-tight text-center" data-reveal>${t.services.h2}</h2>
          <p class="text-center mt-3 mb-10 text-gray-700 max-w-[720px] mx-auto" data-reveal style="--d: 80ms">${t.services.intro}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
${t.services.items.map((s, i) => `            <article class="svc card flex flex-col gap-3 p-8 bg-[#F7F9F4]" data-reveal style="--d: ${i * 100}ms">
              <h3 class="text-[1.35rem] font-medium leading-tight">${s.title}</h3>
              <p class="leading-relaxed">${s.desc}</p>
              <p class="leading-relaxed text-gray-700">${s.proof}</p>
              <a href="#contact" data-topic="${c.topics[i]}" aria-label="${s.link}" class="mt-auto pt-2 font-semibold text-[#073E29] underline underline-offset-4">${s.link} →</a>
            </article>`).join('\n')}
          </div>
        </div>
      </section>

      <!-- ================= WORK ================= -->
      <section id="projects" class="px-5 py-[5rem] scroll-mt-[8rem] md:scroll-mt-[6.5rem]">
        <div class="mx-auto max-w-[1170px]">
          <h2 class="text-[2.5rem] leading-tight text-center mb-10" data-reveal>${t.work.h2}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
${t.work.items.map((w, i) => `            <article class="card flex flex-col gap-4 p-8 bg-[#E6EBE4]" data-reveal style="--d: ${i * 80}ms">
              <p class="text-sm font-semibold tracking-wide text-[#073E29]">${w.tag}</p>
              <h3 class="text-[1.4rem] font-medium leading-tight">${w.title}</h3>${w.route ? `
              ${route(w.route)}` : ''}
              <p class="leading-relaxed">${w.text}</p>
              <p class="text-sm text-gray-700 mt-auto pt-2">${w.stack}</p>
            </article>`).join('\n')}
          </div>
        </div>
      </section>

      <!-- ================= PROCESS ================= -->
      <section id="process" class="px-5 py-[5rem] bg-[#F7F9F4] scroll-mt-[8rem] md:scroll-mt-[6.5rem]">
        <div class="mx-auto max-w-[1170px]">
          <h2 class="text-[2.5rem] leading-tight text-center mb-10" data-reveal>${t.process.h2}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
${t.process.steps.map((s, i) => `            <article class="phase bg-white p-8" data-reveal style="--d: ${i * 100}ms">
              <p class="text-sm font-semibold tracking-wide text-[#073E29]">${s.when}</p>
              <h3 class="text-[1.3rem] font-medium mt-1">${i === 0 ? `<a href="${CALENDLY}" target="_blank" rel="noopener" class="underline underline-offset-4 decoration-[#073E29]/40 hover:decoration-[#073E29]">${s.title}</a>` : s.title}</h3>
              <p class="mt-2 leading-relaxed">${s.text}</p>
            </article>`).join('\n')}
          </div>
          <p class="mt-8 text-center text-gray-700" data-reveal style="--d: 300ms">${fill(t.process.contracting, {
            malt: [`<a href="${MALT}" target="_blank" rel="noopener me" class="underline underline-offset-4 text-[#073E29]">Malt</a>`],
            upwork: [`<a href="${UPWORK}" target="_blank" rel="noopener me" class="underline underline-offset-4 text-[#073E29]">Upwork</a>`],
          })}</p>
        </div>
      </section>

      <!-- ================= ABOUT ================= -->
      <section id="about" class="px-5 py-[5rem] scroll-mt-[8rem] md:scroll-mt-[6.5rem]">
        <div class="mx-auto max-w-[1170px] flex gap-12 flex-col sm:flex-row">
          <div class="flex-1" data-reveal>
            <picture>
              <source type="image/avif" srcset="/assets/images/sergej-casual-494.avif 494w, /assets/images/sergej-casual-988.avif 988w" sizes="(min-width: 640px) 494px, 100vw" />
              <source type="image/webp" srcset="/assets/images/sergej-casual-494.webp 494w, /assets/images/sergej-casual-988.webp 988w" sizes="(min-width: 640px) 494px, 100vw" />
              <img height="593" width="494" src="/assets/images/sergej-casual.jpg" alt="${t.about.photoAlt}" loading="lazy" decoding="async" class="mx-auto w-full max-w-[494px] h-auto object-cover" />
            </picture>
          </div>
          <div class="flex-1 pt-8" data-reveal style="--d: 120ms">
            <h2 class="text-[2.5rem] leading-tight mb-4">${t.about.h2}</h2>
${t.about.paragraphs.map((p) => `            <p class="leading-loose mb-4">${p}</p>`).join('\n')}
            <h3 class="text-xl font-semibold mb-3 text-[#073E29]">${t.about.focusH}</h3>
            <ul class="list-disc pl-5 space-y-2">
${t.about.focus.map(([k, v]) => `              <li><strong>${k}:</strong> ${v}</li>`).join('\n')}
            </ul>
            <h3 class="text-xl font-semibold mt-8 mb-3 text-[#073E29]">${t.about.languagesH}</h3>
            <ul class="flex flex-wrap gap-3" aria-label="${t.about.languagesH}">
${['de', 'ru', 'en', 'hu'].map((l) => `              <li class="lang">${FLAGS[l]}${t.about.languages[l]}</li>`).join('\n')}
            </ul>
          </div>
        </div>
      </section>

      <!-- ================= FAQ ================= -->
      <section id="faq" class="px-5 py-[5rem] bg-[#F7F9F4] scroll-mt-[8rem] md:scroll-mt-[6.5rem]">
        <div class="mx-auto max-w-[860px]">
          <h2 class="text-[2.5rem] leading-tight text-center mb-10" data-reveal>${t.faq.h2}</h2>
          <div class="flex flex-col gap-3">
${t.faq.items.map((f, i) => `            <article class="faq-item bg-white p-6" data-reveal style="--d: ${i * 60}ms">
              <h3 class="text-[1.15rem] font-medium">${f.q}</h3>
              <p class="mt-3 leading-relaxed text-gray-700">${fill(f.a, { calendly: link(CALENDLY), aiskills: link(AISKILLS) })}</p>
            </article>`).join('\n')}
          </div>
        </div>
      </section>

      <!-- ================= CONTACT ================= -->
      <section id="contact" class="p-[1.5rem] sm:p-[2rem] md:p-[5.5rem] bg-[#FEF3DF] scroll-mt-[8rem] md:scroll-mt-[6.5rem]">
        <div class="mx-auto max-w-[1170px] flex gap-10 flex-col sm:flex-row">
          <div class="flex-auto" data-reveal>
            <p class="text-xl font-semibold mb-4">${c.eyebrow}</p>
            <h2 class="text-[clamp(1.5rem,4vmax,2.5rem)] leading-tight">${c.h3}</h2>
            <p class="mt-4 text-gray-700">${c.reply}</p>
            <a href="${CALENDLY}" target="_blank" rel="noopener" class="cta text-white bg-[#073E29] px-5 py-3 font-bold inline-block mt-6">${c.calendar}</a>
            <section class="mt-10">
              <h3 class="text-xl font-semibold mb-8">${c.infoH}</h3>
              <div class="flex flex-col gap-5">
                <div class="flex gap-3">
                  <div><img src="/assets/images/contact/email.svg" alt="" aria-hidden="true" width="20" height="20" class="contact-icon" /></div>
                  <div><a href="mailto:sergej@kukshausen.me" class="text-lg">sergej@kukshausen.me</a></div>
                </div>
                <div class="flex gap-3">
                  <div><img src="/assets/images/contact/phone.svg" alt="" aria-hidden="true" width="20" height="20" class="contact-icon" /></div>
                  <div><a href="tel:+36707871989" class="text-lg">+36 70 787 1989</a></div>
                </div>
                <div class="flex gap-3">
                  <div><img src="/assets/images/contact/linkedin.svg" alt="" aria-hidden="true" width="20" height="20" class="contact-icon" /></div>
                  <div><a href="https://www.linkedin.com/in/sergej-kukshausen-099015163/" target="_blank" rel="noopener me" class="text-lg">sergej-kukshausen</a></div>
                </div>
                <div class="flex gap-3">
                  <div><img src="/assets/images/contact/xing.svg" alt="" aria-hidden="true" width="20" height="20" class="contact-icon" /></div>
                  <div><a href="https://www.xing.com/profile/Sergej_Kukshausen" target="_blank" rel="noopener me" class="text-lg">Sergej_Kukshausen</a></div>
                </div>
                <div class="flex gap-3">
                  <div><img src="/assets/images/contact/github.svg" alt="" aria-hidden="true" width="20" height="20" class="contact-icon" /></div>
                  <div><a href="https://github.com/kukshaus" target="_blank" rel="noopener me" class="text-lg">github.com/kukshaus</a></div>
                </div>
                <div class="flex gap-3">
                  <div><img src="/assets/images/contact/malt.svg" alt="" aria-hidden="true" width="28" height="28" class="contact-icon contact-icon-wide" /></div>
                  <div><a href="${MALT}" target="_blank" rel="noopener me" class="text-lg">${c.malt}</a></div>
                </div>
                <div class="flex gap-3">
                  <div><img src="/assets/images/contact/upwork.svg" alt="" aria-hidden="true" width="28" height="28" class="contact-icon contact-icon-wide" /></div>
                  <div><a href="${UPWORK}" target="_blank" rel="noopener me" class="text-lg">${c.upwork}</a></div>
                </div>
                <div class="flex gap-3">
                  <div>
                    <a href="${root}Sergej_Kukshausen_CV.pdf" download="Sergej_Kukshausen_CV.pdf" class="cta-secondary px-5 py-3 font-bold inline-block">${t.hero.cv}</a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="flex-[47%] md:-mb-16 order-1" data-reveal style="--d: 150ms">
            <section class="bg-white w-full p-10 shadow-2xl">
              <h3 class="text-[clamp(1.5rem,4vmax,2.5rem)] leading-tight">${c.formH}</h3>
              <form id="contact-form" class="mt-5 flex flex-col gap-4"${ACCESS_KEY ? ' method="post" action="https://api.web3forms.com/submit"' : ' method="post" action="mailto:sergej@kukshausen.me" enctype="text/plain"'} data-recipient="sergej@kukshausen.me"
                data-msg-thanks="${c.msgThanks}" data-msg-error="${c.msgError}" data-msg-mailto="${c.msgMailto}" data-msg-subject="${c.msgSubject}">
${ACCESS_KEY ? `                <input type="hidden" name="access_key" value="${ACCESS_KEY}" />
                <input type="hidden" name="from_name" value="kukshausen.me" />
` : ''}                <input type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
                <div class="flex flex-col gap-1">
                  <label for="name" class="w-fit required">${c.name}</label>
                  <input id="name" name="name" type="text" required autocomplete="name" placeholder="${c.namePh}" class="field bg-[#E0F1F1] h-[3.75rem] px-4 py-6 outline-none" />
                </div>
                <div class="flex flex-col gap-1">
                  <label for="email" class="w-fit required">${c.email}</label>
                  <input id="email" name="email" type="email" required autocomplete="email" placeholder="${c.emailPh}" class="field bg-[#E0F1F1] h-[3.75rem] px-4 py-6 outline-none" />
                </div>
                <div class="flex flex-col gap-1">
                  <label for="phone" class="w-fit">${c.phone}</label>
                  <input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="${c.phonePh}" class="field bg-[#E0F1F1] h-[3.75rem] px-4 py-6 outline-none" />
                </div>
                <div class="flex flex-col gap-1">
                  <label for="topic" class="w-fit required">${c.topic}</label>
                  <select id="topic" name="topic" required class="field bg-[#E0F1F1] h-[3.75rem] px-4 outline-none">
                    <option value="" disabled selected>${c.topicPh}</option>
${c.topics.map((o) => `                    <option>${o}</option>`).join('\n')}
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="message" class="w-fit required">${c.message}</label>
                  <textarea id="message" name="message" required placeholder="${c.messagePh}" class="field bg-[#E0F1F1] px-4 py-6 outline-none min-h-[10rem]"></textarea>
                </div>
                <div>
                  <p class="text-sm mb-3">${fill(c.notice, { privacy: ['<a href="privacy.html" class="underline underline-offset-2">', '</a>'] })}</p>
                  <button type="submit" class="cta text-white bg-[#073E29] px-4 py-3 font-bold mt-2 w-full">${c.send}</button>
                  <p class="mt-3 text-sm" data-status aria-live="polite"></p>
                </div>
              </form>
            </section>
          </div>
        </div>
      </section>
    </main>

${footer(t)}

    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`;
}
