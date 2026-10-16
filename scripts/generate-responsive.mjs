// Emits 1x/2x AVIF + WebP variants next to the existing photos (sources: the *.jpg masters).
// Run: node scripts/generate-responsive.mjs
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../public/assets/images');
const photos = [
  { base: 'sergej-portrait', widths: [356, 712] },
  { base: 'sergej-casual', widths: [494, 988] },
];
for (const { base, widths } of photos) {
  const src = sharp(resolve(dir, `${base}.jpg`));
  for (const w of widths) {
    await src.clone().resize({ width: w }).avif({ quality: 55 }).toFile(resolve(dir, `${base}-${w}.avif`));
    await src.clone().resize({ width: w }).webp({ quality: 78 }).toFile(resolve(dir, `${base}-${w}.webp`));
  }
  console.log(base, widths.join('/'), 'written');
}
