// Builds the favicon set from one SVG mark: green rounded square, white "S".
// Usage: node scripts/generate-favicons.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const out = new URL('../public/', import.meta.url);
const svg = (fontFamily = 'Lexend Deca, Helvetica Neue, Arial, sans-serif') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#073E29"/>
  <text x="32" y="47" text-anchor="middle" font-family="${fontFamily}" font-weight="700" font-size="44" fill="#FEF3DF">S</text>
</svg>`;

writeFileSync(new URL('favicon.svg', out), svg());

const png = (size) => sharp(Buffer.from(svg('Helvetica Neue, Arial, sans-serif')), { density: 72 * (size / 64) }).resize(size, size).png().toBuffer();

const [p32, p180, p192, p512] = await Promise.all([32, 180, 192, 512].map(png));
writeFileSync(new URL('favicon-32.png', out), p32);
writeFileSync(new URL('apple-touch-icon.png', out), p180);
writeFileSync(new URL('icon-192.png', out), p192);
writeFileSync(new URL('icon-512.png', out), p512);

// ICO container holding the 32px PNG (every current browser accepts PNG-in-ICO).
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(p32.length, 14); header.writeUInt32LE(22, 18);
writeFileSync(new URL('favicon.ico', out), Buffer.concat([header, p32]));

writeFileSync(new URL('site.webmanifest', out), JSON.stringify({
  name: 'Sergej Kukshausen', short_name: 'Kukshausen', start_url: '/', display: 'browser',
  background_color: '#FEF3DF', theme_color: '#073E29',
  icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2));
console.log('favicons written');
