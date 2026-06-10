const fs = require('fs');
const path = require('path');

const converted = [
  'crystal-logo-black.png',
  'crystal_warehouse_hero.png',
  'images/about/leadership/akash-agarwal.jpeg',
  'images/about/leadership/murari-lal-agarwal.jpg',
  'images/about/leadership/naresh-agarwal.jpg',
  'images/about/leadership/rajesh-agarwal.png',
  'images/about/leadership/yatish-agarwal.png',
  'images/build/bts-commissioning.png',
  'images/build/bts-engineering.png',
  'images/build/bts-operations.png',
  'images/build/bts-site-selection.png',
  'uploads/cms/1777460591611.png',
  'uploads/misc/1777701349195.jpg',
  'uploads/misc/1777701351934.jpg',
  'uploads/misc/1777701353189.jpg',
];

const replacements = converted.map(f => {
  const webp = f.replace(/\.(png|jpe?g)$/i, '.webp');
  return ['/' + f, '/' + webp];
});

function walk(dir, exts) {
  let files = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const skip = ['node_modules', '.git', '.astro', 'dist'];
    if (e.isDirectory() && !skip.includes(e.name)) {
      files = files.concat(walk(full, exts));
    } else if (exts.some(x => e.name.endsWith(x))) {
      files.push(full);
    }
  }
  return files;
}

const srcFiles = walk('./src', ['.tsx', '.astro', '.json', '.ts']);
let totalChanges = 0;

for (const file of srcFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    totalChanges++;
    console.log('Updated: ' + path.relative(process.cwd(), file));
  }
}

console.log('\nFiles updated: ' + totalChanges);
