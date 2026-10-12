// Genera las imágenes Open Graph (1200×630) en public/og/, una por idioma.
// Uso: node scripts/generate-og.mjs   (requiere Playwright con Chromium instalado)
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require(join(process.env.PLAYWRIGHT_NODE_PATH ?? '/opt/node22/lib/node_modules', 'playwright')));
}

const root = resolve(import.meta.dirname, '..');
const font = pathToFileURL(join(root, 'node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-700-normal.woff2')).href;
const logo = pathToFileURL(join(root, 'public/brand/svg/lumacode-lockup-ink.svg')).href;

const copy = {
  es: ['Diseño que se ve.', 'Código que ', 'funciona.'],
  en: ['Design you can see.', 'Code that ', 'works.'],
};

// Rejilla del símbolo ampliada (I = ink, S = stone, L = la luz, · = vacía), cortada por el borde inferior
const rows = ['SII·', '·SIS', 'ISIL', 'S·SI'];
const cell = 130, gap = 12, x0 = 640, y0 = 150;
const cells = rows
  .flatMap((row, r) => [...row].map((k, c) => ({ k, left: x0 + c * (cell + gap), top: y0 + r * (cell + gap) })))
  .filter(({ k }) => k !== '·')
  .map(({ k, left, top }) => `<i class="${k}" style="left:${left}px;top:${top}px"></i>`)
  .join('');

const html = (lang) => `<!doctype html><html lang="${lang}"><meta charset="utf-8"><style>
@font-face{font-family:"Schibsted Grotesk";font-weight:700;src:url(${font}) format('woff2')}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;position:relative;overflow:hidden;background:#F6F5F1;color:#111111;font-family:"Schibsted Grotesk",sans-serif}
img{position:absolute;left:64px;top:56px;height:44px;width:auto}
h1{position:absolute;left:72px;top:300px;font-size:60px;line-height:0.98;font-weight:700;letter-spacing:-0.045em}
h1 b{color:#E8471C;font-weight:700}
i{position:absolute;width:${cell}px;height:${cell}px}
i.I{background:#111111}i.S{background:#E6E3DC}i.L{background:#E8471C;border-radius:999px}
</style><body><img src="${logo}" alt=""><h1>${copy[lang][0]}<br>${copy[lang][1]}<b>${copy[lang][2]}</b></h1>${cells}</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'lumacode-og-'));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const lang of Object.keys(copy)) {
  const file = join(dir, `${lang}.html`);
  writeFileSync(file, html(lang));
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(root, `public/og/og-${lang}.png`) });
  console.log(`public/og/og-${lang}.png`);
}
await browser.close();
