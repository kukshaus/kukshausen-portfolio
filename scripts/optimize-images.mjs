// Crops a source photo to the portrait ratio used on the site and writes webp + jpg.
// Run: node scripts/optimize-images.mjs <source-image> <output-basename> [width] [height]
//   e.g. node scripts/optimize-images.mjs ~/Downloads/me.png sergej-portrait 712 1040
//        node scripts/optimize-images.mjs ~/Downloads/casual.jpg sergej-casual 988 988
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const [source, basename, w = '712', h = '1040'] = process.argv.slice(2);
if (!source || !basename) {
  console.error('usage: node scripts/optimize-images.mjs <source> <basename> [width] [height]');
  process.exit(1);
}
const outDir = resolve(dirname(fileURLToPath(import.meta.url)), '../public/assets/images');
const width = Number(w);
const height = Number(h);

const base = sharp(source).rotate().resize(width, height, { fit: 'cover', position: 'attention' });
await base.clone().webp({ quality: 82 }).toFile(resolve(outDir, `${basename}.webp`));
await base.clone().jpeg({ quality: 85, mozjpeg: true }).toFile(resolve(outDir, `${basename}.jpg`));
console.log(`wrote ${basename}.webp and ${basename}.jpg (${width}x${height}) to public/assets/images`);
