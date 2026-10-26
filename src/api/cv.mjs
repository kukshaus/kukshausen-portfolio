// The CV as structured data, for /api/v1/cv.json and the MCP tool get_cv.
// Same content as public/Sergej_Kukshausen_CV.pdf (English only): update both together.
import { SITE, UPDATED } from '../pages/shared.mjs';
import { EMAIL, PHONE, LINKS } from './resources.mjs';

const CV = {
  name: 'Sergej Kukshausen',
  title: 'Engineering Manager, Software Development',
  location: { city: 'Budapest', country: 'HU' },
  contact: { email: EMAIL, phone: PHONE, linkedin: LINKS.linkedin, xing: LINKS.xing, github: LINKS.github },
  summary:
    'Hands-on engineering leader with 11+ years delivering mission-critical platforms in banking, fintech and Industry 4.0. Led the migration of a high-availability payment routing system from mainframe to cloud-native microservices on AWS, cutting infrastructure costs by 31%. Experienced people manager – hiring, 1:1s, coaching and performance reviews for cross-functional engineering teams – while staying hands-on daily with Python and AI-assisted development (custom AI skills for GitHub Copilot, Claude and Codex). Budapest-based; passionate about building product-minded, high-performing teams.',
  expertise: [
    {
      id: 'leadership',
      area: 'Engineering leadership',
      details: 'Hiring & interviewing, 1:1s & coaching, performance reviews, goal setting, backlog grooming with Product, Agile/Scrum/SAFe, stakeholder management',
    },
    {
      id: 'programming',
      area: 'Programming (hands-on)',
      details:
        'Python (daily), Bash, Java, PHP, SQL, JavaScript/AngularJS, HTML/CSS; AI-assisted development: authoring custom AI skills/agents for GitHub Copilot, Claude and Codex; Python pipelines for large-scale file/data post-processing',
    },
    {
      id: 'cloud',
      area: 'Cloud & architecture',
      details: 'AWS managed services, microservices architecture, Docker, Kubernetes, Kafka, Jenkins, ArgoCD, GitLab CI/CD',
    },
  ],
  experience: [
    {
      id: 'fiserv',
      role: 'Technical Project Manager / Team Lead',
      organization: 'Fiserv',
      location: 'Frankfurt am Main',
      from: '2020-08',
      to: null,
      highlights: [
        { topic: 'People Management', text: 'Lead a cross-functional team of 4 engineers and analysts: interviewing and hiring, regular 1:1s, coaching, goal setting and performance reviews – sustaining high retention and productivity.' },
        { topic: 'Cloud Migration & Microservices', text: 'Led the modernization of a high-availability payment routing system from on-prem mainframe to cloud-native microservices on AWS managed services – 31% lower infrastructure costs, 12% faster incident resolution.' },
        { topic: 'Hands-on Development', text: 'Daily Python and Bash: built data post-processing pipelines for very large files and authored custom AI skills for GitHub Copilot, Claude and Codex, accelerating the team’s development workflow.' },
        { topic: 'Product Partnership', text: 'Work with Product Management on grooming and prioritizing a customer-centric backlog; cut product launch time by 21% by introducing Scrum across cross-functional teams.' },
        { topic: 'Quality & Compliance', text: 'Delivered PSD2/GDPR-compliant features across legacy and cloud environments; passed three consecutive internal audits with zero findings.' },
      ],
      stack: ['Python', 'Bash', 'AWS', 'Kafka', 'Docker', 'Kubernetes', 'AngularJS', 'GitLab CI/CD', 'Retool', 'Jira', 'Confluence'],
    },
    {
      id: 'capgemini',
      role: 'Engagement Manager',
      organization: 'Capgemini',
      location: 'Frankfurt am Main',
      from: '2018-04',
      to: '2020-07',
      highlights: [
        { topic: 'Enterprise Delivery', text: 'Oversaw multi-million-euro IT initiatives for cross-border and domestic payment systems (SEPA), ensuring end-to-end regulatory compliance and uninterrupted transaction flows.' },
        { topic: 'Team Leadership', text: 'Managed a distributed delivery team of 4 across Germany and India – 100% of milestones on time and under budget.' },
        { topic: 'Transformation', text: 'Delivered a €2.2M digital transformation program for a major German finance processor, coordinating 6+ vendor systems and migrating operations to a hybrid-cloud environment; legacy document-workflow modernization cut manual processing 75% (€180K/year savings).' },
      ],
      stack: ['Python', 'Bash', 'HTML5', 'AngularJS', 'Docker', 'Kafka', 'SQL', 'M/Text', 'Jira', 'Confluence', 'GitLab', 'AWS'],
    },
    {
      id: 'itexia',
      role: 'Technical Project Manager',
      organization: 'ITEXIA',
      location: 'Dresden',
      from: '2016-04',
      to: '2018-03',
      highlights: [
        { topic: 'Automation Delivery', text: 'Led end-to-end execution of an advanced automation project, hitting 100% of key milestones.' },
        { topic: 'Client Impact', text: 'Drove a 27% boost in customer satisfaction through close collaboration, risk management and proactive communication.' },
      ],
      stack: ['PHP', 'Swift', 'Docker', 'SQL', 'Selenium', 'Drupal', 'Jira', 'Confluence', 'GitLab'],
    },
    {
      id: 'tte-europe',
      role: 'Project Manager',
      organization: 'TTE-Europe',
      location: 'Dresden',
      from: '2014-10',
      to: '2015-12',
      highlights: [
        { topic: 'Web App Delivery', text: 'Led IT initiatives in the explosives industry, delivering modern, scalable Java-based web applications and directing technical teams for timely delivery.' },
      ],
      stack: ['Java', 'SQL', 'Redmine', 'Confluence'],
    },
  ],
  education: [
    {
      degree: 'BSc Computer Science',
      institution: 'Technical University Bergakademie Freiberg',
      from: '2010-10',
      to: '2016-03',
      thesis: 'Development of a mobile application for voice activity detection (signal processing, mobile development), at the Institute of Computer Science',
    },
  ],
  certifications: ['Professional Scrum Master I (PSM I)', 'Certified SAFe 4 Agilist'],
  languages: [
    { code: 'de', name: 'German', level: 'native', cefr: null },
    { code: 'ru', name: 'Russian', level: 'native', cefr: null },
    { code: 'en', name: 'English', level: 'fluent', cefr: 'C1' },
    { code: 'hu', name: 'Hungarian', level: 'basic', cefr: 'A2' },
  ],
  interests: ['AI-assisted engineering & digital transformation', 'Drone flying', 'Volleyball & floorball', 'Travel'],
  pdf: `${SITE}Sergej_Kukshausen_CV.pdf`,
};

export const cv = () => ({ lang: 'en', updated: UPDATED, data: CV });

const month = (ym) => (ym ? new Date(`${ym}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'Present');
const period = (e) => `${month(e.from)} – ${month(e.to)}`;

/** The CV as Markdown, for /api/v1/cv.md and get_cv with format "markdown". */
export function cvMarkdown() {
  const c = CV;
  return `# ${c.name}

**${c.title}**
${c.location.city}, Hungary · ${c.contact.email} · ${c.contact.phone.replace(/^\+36(\d{2})(\d{3})(\d{4})$/, '+36 $1 $2 $3')}
[LinkedIn](${c.contact.linkedin}) · [Xing](${c.contact.xing}) · [GitHub](${c.contact.github}) · [CV as PDF](${c.pdf})

## Professional summary

${c.summary}

## Areas of expertise

${c.expertise.map((x) => `- **${x.area}:** ${x.details}`).join('\n')}

## Professional experience
${c.experience
  .map(
    (e) => `
### ${e.role}, ${e.organization} (${e.location})

*${period(e)}*

${e.highlights.map((h) => `- **${h.topic}:** ${h.text}`).join('\n')}

Tech stack: ${e.stack.join(', ')}`,
  )
  .join('\n')}

## Education
${c.education.map((e) => `\n### ${e.degree}, ${e.institution}\n\n*${period(e)}*\n\n- Bachelor thesis: ${e.thesis}`).join('\n')}

## Certifications

${c.certifications.map((x) => `- ${x}`).join('\n')}

## Languages

${c.languages.map((l) => `- ${l.name}: ${l.level}${l.cefr ? ` (${l.cefr})` : ''}`).join('\n')}

## Interests

${c.interests.map((x) => `- ${x}`).join('\n')}

---
Last updated ${UPDATED} · JSON: ${SITE}api/v1/cv.json
`;
}
