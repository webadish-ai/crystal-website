/**
 * Image compression script — run once before deploying.
 * Compresses all JPG/PNG/WebP images in src/data/images and public/.
 * Overwrites originals in-place. Skips files already under 80 KB.
 *
 * Usage:
 *   node scripts/compress-images.mjs
 *   node scripts/compress-images.mjs --dry-run   (shows savings without writing)
 */

import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT      = fileURLToPath(new URL('..', import.meta.url));
const SCAN_DIRS = ['src/data/images', 'public'];
const SKIP_BELOW_KB = 80;     // don't bother compressing tiny files
const DRY_RUN = process.argv.includes('--dry-run');

const JPEG_QUALITY = 82;
const PNG_QUALITY  = 85;      // maps to [0.85, 1.0] palette compression
const WEBP_QUALITY = 82;

let totalOriginal = 0;
let totalCompressed = 0;
let fileCount = 0;
let skippedCount = 0;

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkDir(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

async function compressFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const { size: originalSize } = await stat(filePath);
  if (originalSize < SKIP_BELOW_KB * 1024) {
    skippedCount++;
    return;
  }

  let pipeline = sharp(filePath);

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, adaptiveFiltering: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: WEBP_QUALITY });
  }

  const output = await pipeline.toBuffer();
  const savedBytes = originalSize - output.length;
  const rel = relative(ROOT, filePath);

  totalOriginal   += originalSize;
  totalCompressed += output.length;
  fileCount++;

  const pct    = ((savedBytes / originalSize) * 100).toFixed(1);
  const savedK = (savedBytes / 1024).toFixed(0);
  const tag    = savedBytes > 0 ? `✓ -${savedK} KB (${pct}%)` : '— no gain, skipped';

  if (savedBytes > 0) {
    if (!DRY_RUN) {
      const { writeFile } = await import('node:fs/promises');
      await writeFile(filePath, output);
    }
    console.log(`  ${DRY_RUN ? '[dry] ' : ''}${tag.padEnd(24)} ${rel}`);
  } else {
    skippedCount++;
    fileCount--;
  }
}

console.log(`\n🗜  Crystal Image Compressor${DRY_RUN ? ' (dry run)' : ''}\n`);

for (const dir of SCAN_DIRS) {
  const abs = join(ROOT, dir);
  const files = await walkDir(abs);
  for (const f of files) {
    await compressFile(f);
  }
}

const savedMB  = ((totalOriginal - totalCompressed) / 1024 / 1024).toFixed(2);
const origMB   = (totalOriginal  / 1024 / 1024).toFixed(2);
const finalMB  = (totalCompressed / 1024 / 1024).toFixed(2);
const pctTotal = totalOriginal > 0 ? (((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(1) : '0';

console.log(`
────────────────────────────────────
  Files compressed : ${fileCount}
  Files skipped    : ${skippedCount}  (< ${SKIP_BELOW_KB} KB or no gain)
  Before           : ${origMB} MB
  After            : ${finalMB} MB
  Saved            : ${savedMB} MB  (${pctTotal}%)
────────────────────────────────────
${DRY_RUN ? '\nDry run — no files were written.' : '\nDone. Originals replaced in-place.'}
`);
