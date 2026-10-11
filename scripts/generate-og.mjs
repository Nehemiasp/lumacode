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
const font = pathToFileURL(join(root, 'node_modules/@fontsource/archivo/files/archivo-latin-600-normal.woff2')).href;
const logo = pathToFileURL(join(root, 'public/brand/svg/lumacode-lockup-paper.svg')).href;

const copy = {
  es: ['Diseño que se ve.', 'Código que funciona.'],
  en: ['Design you can see.', 'Code that works.'],
};

const html = (lang) => `<!doctype html><html lang="${lang}"><meta charset="utf-8"><style>
@font-face{font-family:Archivo;font-weight:600;src:url(${font}) format('woff2')}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;position:relative;overflow:hidden;background:#0D0F0E;color:#F5F6F1;font-family:Archivo,sans-serif}
img{position:absolute;left:64px;top:56px;height:44px;width:auto}
h1{position:absolute;left:72px;top:290px;font-size:64px;line-height:1;font-weight:600;letter-spacing:-0.045em}
h1 span{display:block;color:#C6F04A}
.light{position:absolute;left:690px;top:115px;width:400px;height:400px;border-radius:999px;background:#C6F04A}
.cursor{position:absolute;left:1150px;top:150px;width:100px;height:330px;border-radius:14px;background:#C6F04A}
</style><body><img src="${logo}" alt=""><h1>${copy[lang][0]}<span>${copy[lang][1]}</span></h1><div class="light"></div><div class="cursor"></div></body></html>`;

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
