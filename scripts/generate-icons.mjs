// Writes brand SVGs from simple-icons (plus a few hand-drawn ones) into public/assets/images.
// Run: node scripts/generate-icons.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as si from 'simple-icons';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = resolve(root, 'public/assets/images/skills');
const contactDir = resolve(root, 'public/assets/images/contact');
mkdirSync(skillsDir, { recursive: true });
mkdirSync(contactDir, { recursive: true });

/** @type {Array<[file: string, siKey: string]>} */
const skills = [
  ['python', 'siPython'],
  ['bash', 'siGnubash'],
  ['java', 'siOpenjdk'],
  ['php', 'siPhp'],
  ['javascript', 'siJavascript'],
  ['typescript', 'siTypescript'],
  ['html5', 'siHtml5'],
  ['css', 'siCss'],
  ['angular', 'siAngular'],
  ['mysql', 'siMysql'],
  ['postgresql', 'siPostgresql'],
  ['docker', 'siDocker'],
  ['kubernetes', 'siKubernetes'],
  ['kafka', 'siApachekafka'],
  ['jenkins', 'siJenkins'],
  ['argocd', 'siArgo'],
  ['gitlab', 'siGitlab'],
  ['git', 'siGit'],
  ['linux', 'siLinux'],
  ['copilot', 'siGithubcopilot'],
  ['claude', 'siClaude'],
  ['jira', 'siJira'],
  ['confluence', 'siConfluence'],
  ['retool', 'siRetool'],
  ['swift', 'siSwift'],
  ['selenium', 'siSelenium'],
  ['drupal', 'siDrupal'],
  ['redmine', 'siRedmine'],
];

const svg = (path, hex, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="${title}"><path fill="#${hex}" d="${path}"/></svg>\n`;

for (const [file, key] of skills) {
  const icon = si[key];
  if (!icon) throw new Error(`simple-icons has no ${key}`);
  // Near-black brand colours disappear on the cream background; use the site green instead.
  const hex = parseInt(icon.hex, 16) < 0x333333 ? '073E29' : icon.hex;
  writeFileSync(resolve(skillsDir, `${file}.svg`), svg(icon.path, hex, icon.title));
}

// AWS has no simple-icons entry (trademark policy). Hand-drawn wordmark with the "smile".
writeFileSync(
  resolve(skillsDir, 'aws.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 40" role="img" aria-label="AWS">
<text x="32" y="22" text-anchor="middle" font-family="Lexend Deca, system-ui, sans-serif" font-weight="700" font-size="20" fill="#232F3E">aws</text>
<path d="M12 29c8 6 32 6 40 0" fill="none" stroke="#FF9900" stroke-width="3" stroke-linecap="round"/>
<path d="M48 26l5 3-4 4" fill="none" stroke="#FF9900" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>\n`,
);

// Contact icons: monochrome, 20px, currentColor-free so they match the original's dark glyphs.
const contact = {
  email:
    'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
  phone:
    'M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z',
  github: si.siGithub.path,
  xing: si.siXing.path,
  linkedin:
    'M20.4 2H3.6C2.7 2 2 2.7 2 3.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V3.6c0-.9-.7-1.6-1.6-1.6zM8 19H5V9h3v10zM6.5 7.7c-1 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.7 1.7-1.7 1.7zM19 19h-3v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6V19h-3V9h2.9v1.4c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19z',
};
for (const [name, path] of Object.entries(contact)) {
  writeFileSync(resolve(contactDir, `${name}.svg`), svg(path, '2F3349', name));
}

console.log(`wrote ${skills.length + 1} skill icons and ${Object.keys(contact).length} contact icons`);
