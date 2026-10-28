// English source texts. Every other locale file mirrors this structure key by key.
// Values may contain inline HTML. Placeholders in {braces} are filled in by the page templates.
export default {
  lang: 'en',
  ogLocale: 'en_GB',
  dateLong: '28 October 2026',

  meta: {
    title: 'Sergej Kukshausen | Engineering Manager &amp; Fractional Tech Lead',
    description:
      'Engineering Manager in Budapest, 11+ years in software delivery, 8 in banking and fintech. Open to fractional leadership, mainframe-to-AWS migrations and AI skills for dev teams.',
    ogImageAlt: 'Portrait of Sergej Kukshausen',
  },

  nav: {
    label: 'Main',
    services: 'Services',
    work: 'Work',
    about: 'About',
    faq: 'FAQ',
    contact: 'Contact',
    language: 'Language',
    home: 'Kukshausen home',
  },

  hero: {
    eyebrow: 'Engineering Manager at Fiserv · Budapest · DE/EN/RU/HU · remote',
    h1: 'Engineering leadership for mission-critical payment platforms',
    sub: '11+ years of software delivery, the last eight in banking and fintech. In-house at Fiserv, and open to fractional engineering leadership, mainframe-to-AWS migrations and AI-skills work for development teams.',
    cta: 'Book a 20-min call',
    cv: 'Download CV (PDF)',
    proof: 'Most recently I led the migration of a payment routing platform at Fiserv from mainframe to AWS, with 31% lower infrastructure cost.',
    proofLink: 'See the work',
    available: 'Open to new engagements',
    updated: 'Updated',
    portraitAlt: 'Sergej Kukshausen, Engineering Manager, portrait',
  },

  services: {
    h2: 'How I can help',
    intro: 'Four things I do for fintech and banking teams, remote from Budapest or on-site in the DACH region.',
    items: [
      {
        title: 'Fractional / interim engineering management',
        desc: 'Lead or stabilise an engineering team for 3 to 6 months: hiring, 1:1s, delivery cadence, stakeholder management.',
        proof: 'For CTOs who need an experienced manager without a permanent hire.',
        link: 'Discuss a fractional engagement',
      },
      {
        title: 'Mainframe &amp; legacy to AWS migration',
        desc: 'Plan and run the move of payment and banking systems to cloud-native microservices, SEPA and PSD2 compliant.',
        proof: 'Done at Fiserv: 31% lower infrastructure cost, 12% faster incident resolution.',
        link: 'Discuss a migration',
      },
      {
        title: 'AI skills &amp; agents for dev teams',
        desc: 'Custom skills and agents for Claude, GitHub Copilot and Codex, integrated with Jira, Confluence, GitLab and n8n.',
        proof: 'Rollout, guardrails and training. I use these tools every day myself.',
        link: 'Discuss AI skills for your team',
      },
      {
        title: 'M/Text &amp; output management (DACH)',
        desc: 'Modernise banking document workflows and output management.',
        proof: 'Done at Capgemini: 75% less manual processing, about €180K saved per year.',
        link: 'Discuss an M/Text project',
      },
    ],
  },

  work: {
    h2: "Where I've made an impact",
    items: [
      {
        tag: 'ONLINE PRINTING GROUP, SE ASIA · 2026 – PRESENT',
        title: 'AI-driven process automation across five teams',
        text: 'Automation consultant for an online printing group in three countries. I shadow the people doing the work, then use Claude Code as my daily build partner: meeting transcripts become numbered requirements, requirements become clickable prototypes the same day, and prototypes become specs the in-house developers code from. Delivered an AI tool that reads supplier invoices and checks them against 6,755 production jobs with 99% exact matches, a bank-matching tool now live on the shop system, and an MCP server that lets AI assistants quote live prices from the webshops.',
        stack: 'Claude Code · MCP · Python · Next.js · MongoDB · Agent skills · Jira',
      },
      {
        tag: 'FISERV · 2020 – PRESENT',
        title: 'Mainframe to cloud payment routing',
        text: 'Led the modernization of a high-availability payment routing system from on-prem mainframe to cloud-native microservices on AWS: 31% lower infrastructure costs, 12% faster incident resolution, PSD2/GDPR-compliant throughout.',
        stack: 'Python · AWS · Kafka · Kubernetes · GitLab CI/CD',
        route: { label: 'Payment routing at Fiserv', before: 'Before', beforeText: 'On-prem mainframe', after: 'After', afterText: 'Microservices on AWS' },
      },
      {
        tag: 'FISERV · TEAM LEAD',
        title: 'A team that stays and ships',
        text: 'Lead a cross-functional team of engineers and analysts: hiring, 1:1s, coaching and performance reviews. Introduced Scrum across teams and cut product launch time by 21%, with three audits passed at zero findings.',
        stack: 'Scrum · Product partnership · Hiring · Coaching',
      },
      {
        tag: 'FISERV · HANDS-ON',
        title: 'AI skills for the whole team',
        text: "Daily Python and Bash: data post-processing pipelines for very large files, plus custom AI skills and agents for GitHub Copilot, Claude and Codex that accelerate the team's development workflow.",
        stack: 'Python · Bash · Copilot · Claude · Codex',
      },
      {
        tag: 'CAPGEMINI · 2018 – 2020',
        title: '€2.2M digital transformation',
        text: 'Delivered a digital transformation program for a major German finance processor, coordinating 6+ vendor systems and migrating operations to hybrid cloud. Document-workflow modernization cut manual processing 75%, saving €180K a year.',
        stack: 'SEPA · AWS · Kafka · Docker · M/Text',
      },
      {
        tag: 'ITEXIA · 2016 – 2018',
        title: 'Advanced automation delivery',
        text: 'Led end-to-end execution of an advanced automation project, hitting 100% of key milestones, and drove a 27% boost in customer satisfaction through close collaboration, risk management and proactive communication.',
        stack: 'PHP · Swift · Docker · Selenium · Drupal',
      },
      {
        tag: 'TTE-EUROPE · 2014 – 2015',
        title: 'Java web apps for the explosives industry',
        text: 'Led IT initiatives in a safety-critical industry, delivering modern, scalable Java-based web applications and directing technical teams for timely delivery. Bachelor thesis: a mobile app for voice activity detection.',
        stack: 'Java · SQL · Redmine · Signal processing',
      },
    ],
  },

  process: {
    h2: "How we'd work together",
    steps: [
      {
        when: '20 minutes',
        title: 'Intro call',
        text: 'You describe the team or system, I tell you honestly whether I am the right person and what I would look at first.',
      },
      {
        when: '1 to 2 weeks',
        title: 'Assessment',
        text: 'Interviews, code and process review, then a written recommendation with priorities and a realistic plan.',
      },
      {
        when: '3 to 6 months',
        title: 'Engagement',
        text: 'Typically 3 to 6 months at 2 to 5 days a week, remote or on-site in DACH. Day rate on request.',
      },
    ],
    contracting: 'Contracting works directly, via {malt} or via {upwork}.',
  },

  about: {
    photoAlt: 'Sergej Kukshausen with a puppy',
    h2: "Hi, I'm Sergej Kukshausen.",
    paragraphs: [
      'I\'m a hands-on Engineering Manager at Fiserv, based in Budapest, with over 11 years delivering mission-critical platforms, the last eight of them in banking and fintech. Most recently I led the migration of a high-availability payment routing system from mainframe to cloud-native microservices on AWS, cutting infrastructure costs by 31% and speeding up incident resolution by 12%.',
      'I manage people the way I wish I had been managed: regular 1:1s, honest coaching, clear goals and fair performance reviews for cross-functional engineering teams. Introducing Scrum across those teams cut product launch time by 21%, and three consecutive internal audits passed with zero findings.',
      "I still code every day. Python and Bash pipelines for very large files, and custom AI skills for GitHub Copilot, Claude and Codex that make the whole team faster. Based in Budapest, I'm passionate about building product-minded, high-performing teams.",
    ],
    focusH: 'Focus areas',
    focus: [
      ['Engineering leadership', 'hiring and interviewing, 1:1s and coaching, performance reviews, goal setting, backlog grooming with Product, Agile/Scrum/SAFe, stakeholder management.'],
      ['Hands-on programming', 'Python (daily), Bash, Java, PHP, SQL, JavaScript/Angular, HTML/CSS; AI-assisted development with custom skills and agents for Copilot, Claude and Codex.'],
      ['Cloud &amp; architecture', 'AWS managed services, microservices, Docker, Kubernetes, Kafka, Jenkins, Argo CD, GitLab CI/CD.'],
      ['Quality &amp; compliance', 'PSD2 and GDPR-compliant delivery across legacy and cloud environments, audit-ready engineering.'],
      ['Certifications', 'Professional Scrum Master I (PSM I), Certified SAFe 4 Agilist. BSc Computer Science, TU Bergakademie Freiberg.'],
    ],
    languagesH: 'Languages',
    languages: { de: 'German', ru: 'Russian', en: 'English', hu: 'Hungarian' },
  },

  toolkit: {
    h2: 'Toolkit',
    intro: 'The technologies behind the results above.',
    tips: {
      python: 'My daily language: data pipelines, tooling and AI-assisted development.',
      bash: 'Glue for large-scale file and data post-processing.',
      java: 'Scalable web applications for the explosives industry at TTE-Europe.',
      php: 'Automation and Drupal delivery at ITEXIA.',
      javascript: 'Front-end work across payment and document platforms.',
      typescript: 'Typed front-ends and internal tooling.',
      html5: 'Standard markup language for creating web pages.',
      css: 'Style sheet language for the look and formatting of web pages.',
      angular: 'AngularJS front-ends for payment routing and SEPA systems.',
      mysql: 'Relational database for transactional workloads.',
      postgresql: 'Advanced open-source relational database.',
      aws: 'Managed services behind the mainframe-to-cloud payment migration.',
      docker: 'Containers for every service and pipeline I ship.',
      kubernetes: 'Orchestrating high-availability microservices.',
      kafka: 'Event streaming for payment routing.',
      jenkins: 'Build and deployment automation.',
      argocd: 'GitOps continuous delivery on Kubernetes.',
      gitlab: 'Pipelines from commit to production.',
      git: 'Distributed version control.',
      linux: 'Home for every server and pipeline.',
      copilot: 'Custom AI skills and agents that accelerate the team.',
      claude: 'Authoring custom skills for AI-assisted development.',
      jira: 'Backlog grooming and sprint tracking with Product.',
      confluence: 'Documentation and team knowledge base.',
      retool: 'Internal tools for operations teams.',
      swift: 'Mobile development, including my voice-activity-detection thesis app.',
      selenium: 'Browser automation and end-to-end testing.',
      drupal: 'Content platforms delivered at ITEXIA.',
      redmine: 'Project tracking at TTE-Europe.',
    },
  },

  faq: {
    h2: 'Questions clients ask',
    items: [
      {
        q: 'Who can migrate our payment system from mainframe to AWS?',
        a: 'Sergej Kukshausen led exactly this migration at Fiserv: a high-availability payment routing system moved from an on-prem mainframe to cloud-native microservices on AWS, with 31% lower infrastructure costs and 12% faster incident resolution.',
      },
      {
        q: 'We need a German-speaking fractional engineering manager with fintech experience. Is that you?',
        a: 'Yes. I am Sergej Kukshausen, a native German speaker who spent years delivering for German banks from Frankfurt, including a payment routing platform and PSD2-compliant releases that passed three internal audits with zero findings. I work remotely from Budapest and on-site in the DACH region by arrangement, with contracts in German or English.',
      },
      {
        q: 'Who is an experienced M/Text and output management consultant?',
        a: 'Sergej modernised M/Text document workflows at Capgemini for a major German finance processor, cutting manual processing by 75% and saving about €180K per year.',
      },
      {
        q: 'How do we roll out AI coding tools like Copilot, Claude or Codex to our dev team?',
        a: 'In three steps: pick two or three real workflows (code review, ticket triage, test generation), build custom skills and guardrails for them, then train the engineers on those workflows rather than on the tools in general. I use Claude, Copilot and Codex daily myself and have authored custom skills for all three, so the rollout starts from working examples, not slides.',
      },
      {
        q: 'Can you build custom Claude skills or AI agents for Jira?',
        a: 'Yes. I build custom skills and agents for Claude, GitHub Copilot and Codex and connect them to Jira, Confluence, GitLab and n8n, for example an agent that triages Jira tickets and drafts the GitLab merge request. Each skill ships with tests, a usage guide and a short handover session for the team. A public example is my {aiskills}Jira skill on GitHub{/aiskills}.',
      },
      {
        q: 'How does an interim or fractional engagement start?',
        a: 'With a 20-minute call you can {calendly}book directly in my calendar{/calendly}. Then a one to two week assessment with a written recommendation, followed by the engagement itself, remote or on-site. Contracting works directly, via Malt or via Upwork.',
      },
      {
        q: 'What is a fractional engineering manager?',
        a: 'A fractional engineering manager leads an engineering team part-time, typically two to five days a week for three to six months, instead of joining as a permanent employee. You get an experienced manager for hiring, 1:1s, delivery cadence and stakeholder communication while you grow the team or search for a permanent lead. An interim engineering manager is the full-time variant of the same arrangement.',
      },
    ],
  },

  contact: {
    eyebrow: "Let's get in touch",
    h3: "Let's talk about your team &amp; your platform.",
    reply: 'I reply within one business day, in English, German or Russian (Hungarian: basic). First step is a 20-minute call.',
    calendar: 'Pick a time in my calendar',
    infoH: 'Contact information',
    malt: 'Hire me on Malt',
    upwork: 'Hire me on Upwork',
    resume: 'Download Résumé',
    formH: 'Send me a message',
    name: 'Your name',
    namePh: 'Enter your full name here',
    email: 'Your email address',
    emailPh: 'Enter your email address here',
    phone: 'Your phone number (optional)',
    phonePh: 'Please fill in your phone number',
    topic: "I'm contacting about",
    topicPh: 'Choose a topic',
    // The first four match the four service cards, in the same order.
    topics: [
      'Fractional or interim engineering management',
      'Mainframe / legacy to AWS migration',
      'AI skills and agents for my dev team',
      'M/Text or output management',
      'Full-time role',
      'Something else',
    ],
    message: 'Your message',
    messagePh: 'What do you need help with?',
    notice: 'Your message is delivered to my inbox and used only to answer you, see the {privacy}privacy policy{/privacy}.',
    send: 'Send message',
    // Used by src/main.ts
    msgThanks: "Thanks for reaching out! I'll be in contact soon.",
    msgError: 'Failed to send message. Please try again later or contact me directly via email.',
    msgMailto: 'Opening your mail app with the message prefilled.',
    msgSubject: 'Website message from',
  },

  footer: {
    updated: 'Updated',
    imprint: 'Imprint',
    privacy: 'Privacy policy',
  },

  schema: {
    jobTitle: 'Engineering Manager, Software Development',
    description:
      'Hands-on Engineering Manager at Fiserv with 11+ years of software delivery, the last eight in banking and fintech. Led the migration of a high-availability payment routing system from mainframe to cloud-native microservices on AWS. Based in Budapest, open to fractional and consulting engagements.',
  },

  legal: {
    // Shown on translated legal pages only; empty for the authoritative languages.
    translationNote: '',
    lastUpdated: 'Last updated: 16 October 2026',
  },

  privacy: {
    title: 'Privacy policy | Sergej Kukshausen',
    description: 'Privacy policy for sergej.kukshausen.me: what data the site processes, where it is hosted and your rights under the GDPR.',
    h1: 'Privacy policy',
    body: `
<h2>1. Controller</h2>
<p>Sergej Kukshausen<br />Budapest, Hungary<br />Email: <a href="mailto:sergej@kukshausen.me">sergej@kukshausen.me</a><br />Phone: <a href="tel:+36707871989">+36 70 787 1989</a></p>
<p>This is a personal portfolio website. There is no data protection officer, because none is required for a site of this size.</p>

<h2>2. What this site does <em>not</em> do</h2>
<ul>
<li>No cookies, no local storage, no fingerprinting.</li>
<li>No analytics, no tracking pixels, no advertising networks.</li>
<li>No third-party fonts, icon kits or scripts. Everything is served from this site.</li>
<li>No embedded social media widgets. Links to LinkedIn, Xing and GitHub are plain links that only load when you click them.</li>
</ul>

<h2>3. Hosting and server logs</h2>
<p>sergej.kukshausen.me is hosted on a server of IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Germany, under a data processing agreement. When you open a page, your browser sends technical data to that server so the page can be delivered: IP address, date and time of the request, requested URL, referrer, browser type and operating system. The web server keeps this data in log files for a short period for security and error analysis and then deletes it automatically. The data stays within the EU.</p>
<p>Legal basis: Art. 6(1)(f) GDPR, my legitimate interest in operating a secure and reliable website.</p>
<p>A copy of this site is also published on GitHub Pages at kukshaus.github.io/kukshausen-portfolio/, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. If you open that copy, GitHub processes the same technical data in the USA; the transfer is covered by GitHub's certification under the EU-US Data Privacy Framework. Details: <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection" target="_blank" rel="noopener">GitHub Pages data collection</a>.</p>

<h2>4. Contact form and email</h2>
<p>When you press "Send message", your name, email address, optional phone number, selected topic and message are sent to Web3Forms (<a href="https://web3forms.com" target="_blank" rel="noopener">web3forms.com</a>), a form relay service that forwards the message as an email to my mailbox. According to its <a href="https://web3forms.com/privacy" target="_blank" rel="noopener">privacy policy</a>, Web3Forms does not store submissions after forwarding them. The service runs on infrastructure outside the EU, so your data may be transferred to a third country; this transfer is necessary to handle the request you are making (Art. 49(1)(b) GDPR). If you prefer, email or call me directly instead, then no relay service is involved. A hidden anti-spam field in the form drops automated submissions; it collects no data.</p>
<p>I use the data only to answer your request and for any follow-up questions. Legal basis: Art. 6(1)(b) GDPR for enquiries about a working relationship, otherwise Art. 6(1)(f) GDPR. I delete the correspondence once your request is settled, unless statutory retention periods for business correspondence apply.</p>
<p>My mailbox is also hosted by IONOS SE under the same data processing agreement. Data stays within the EU.</p>

<h3>Booking a call</h3>
<p>The "Book a 20-min call" buttons are plain links to my booking page at Calendly (Calendly LLC, Atlanta, USA). Nothing from Calendly is loaded on this website. If you book a slot, you enter your details on Calendly's site under its <a href="https://calendly.com/privacy" target="_blank" rel="noopener">privacy notice</a>; I receive the booking to prepare and hold the call. Legal basis: Art. 6(1)(b) GDPR. Calendly is certified under the EU-US Data Privacy Framework.</p>

<h2>5. Your rights</h2>
<p>Under the GDPR you have the right to:</p>
<ul>
<li>access the personal data I hold about you (Art. 15),</li>
<li>have it corrected (Art. 16) or erased (Art. 17),</li>
<li>restrict processing (Art. 18) or object to it (Art. 21),</li>
<li>receive your data in a portable format (Art. 20),</li>
<li>withdraw consent at any time where processing is based on consent (Art. 7(3)).</li>
</ul>
<p>To exercise any of these rights, email <a href="mailto:sergej@kukshausen.me">sergej@kukshausen.me</a>.</p>

<h2>6. Right to lodge a complaint</h2>
<p>You can complain to a data protection supervisory authority, in particular the authority in your country of residence. The authority responsible for me is the Hungarian National Authority for Data Protection and Freedom of Information (NAIH), Falk Miksa utca 9-11, 1055 Budapest, Hungary, <a href="https://www.naih.hu" target="_blank" rel="noopener">www.naih.hu</a>.</p>

<h2>7. Encryption</h2>
<p>All pages are delivered over HTTPS (TLS). Your browser shows a lock icon in the address bar.</p>

<h2>8. Changes</h2>
<p>If the site ever adds a feature that processes data differently, for example a form service or analytics, this policy will be updated before that feature goes live.</p>
`,
  },

  imprint: {
    title: 'Imprint | Sergej Kukshausen',
    description: 'Imprint and legal notice for sergej.kukshausen.me.',
    h1: 'Imprint',
    body: `
<h2>Site operator</h2>
<p>Sergej Kukshausen<br />Budapest, Hungary<br />Email: <a href="mailto:sergej@kukshausen.me">sergej@kukshausen.me</a><br />Phone: <a href="tel:+36707871989">+36 70 787 1989</a></p>
<p>Information pursuant to Act CVIII of 2001 on electronic commerce services (Hungary) and, where applicable, § 5 DDG and § 18(2) MStV (Germany).</p>
<p>Responsible for the content of this website: Sergej Kukshausen, address as above.</p>

<h2>Liability for content</h2>
<p>The content of this site was created with care. I cannot guarantee that it is accurate, complete or up to date. As a service provider I am responsible for my own content under general law, but I am not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.</p>

<h2>Liability for links</h2>
<p>This site links to external websites over which I have no control. The respective operator is always responsible for the content of linked pages. The pages were checked for possible legal violations when the links were set. If I become aware of a violation, I will remove the link immediately.</p>

<h2>Copyright</h2>
<p>Texts, photos and the logo on this site are my own work unless stated otherwise and are protected by copyright. Reproduction or distribution beyond the limits of copyright law requires my written consent. Brand icons on this site belong to their respective owners and are used only to identify the service.</p>

<h2>Dispute resolution</h2>
<p>The European Commission provides an online dispute resolution platform at <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>. I am neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.</p>
`,
  },
};
