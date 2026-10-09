// Downloads Google Noto Animated Emoji (CC BY 4.0) and shrinks them to 72px animated WebP.
// Usage: node scripts/fetch-emotes.mjs
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const CPS = [
  '1f44b', '1f917', '1f998', '1f680', '1f60e', '1f463', '1f440', '1f914', '1f60c', '2615',
  '1f635', '1f4a5', '1f62e_200d_1f4a8', '1f4aa', '1f973', '1f633', '1f62c', '1f634', '1f9d0',
  '1f92b', '1f6a7', '1f449', '1f389', '1f604', '1f60a', '1f48c', '1f4bb', '1f609', '1f929',
];

await mkdir('public/emotes', { recursive: true });
let total = 0;
for (const cp of CPS) {
  const res = await fetch(`https://fonts.gstatic.com/s/e/notoemoji/latest/${cp}/512.webp`);
  if (!res.ok) throw new Error(`${cp}: HTTP ${res.status}`);
  const out = await sharp(Buffer.from(await res.arrayBuffer()), { animated: true })
    .resize(72, 72)
    .webp({ quality: 45, effort: 6, smartSubsample: true })
    .toBuffer();
  await writeFile(`public/emotes/${cp}.webp`, out);
  total += out.length;
  console.log(cp, out.length);
}
console.log('total KB', Math.round(total / 1024));
