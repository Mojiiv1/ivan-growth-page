import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = spawn(process.execPath, [path.join(root, 'scripts', 'serve.mjs')], { cwd: root, stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('Preview server did not start')), 5000);
  server.stdout.on('data', chunk => { if (chunk.toString().includes('Local:')) { clearTimeout(timer); resolve(); } });
  server.on('error', reject);
});

const browser = await chromium.launch({ headless: true });
const pages = ['', 'services/', 'bridal/', 'gallery/', 'locations/'];
const languages = ['', 'fr/', 'ar/'];
const viewports = [{ name: 'mobile', width: 320, height: 720 }, { name: 'desktop', width: 1440, height: 900 }];
let cases = 0;
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    for (const language of languages) {
      for (const route of pages) {
        const page = await context.newPage();
        const url = `http://127.0.0.1:4173/${language}${route}`;
        await page.goto(url, { waitUntil: 'networkidle' });
        if (route === '' || route === 'locations/') {
          const photos = await page.locator('main .location-card .location-img img').evaluateAll(images => images.map(img => new URL(img.getAttribute('src'), document.baseURI).pathname));
          const expected = ['/assets/location-woodroffe.webp', '/assets/location-hemlock.webp'];
          if (photos.length !== 2 || photos.some((src, i) => !src.endsWith(expected[i]))) throw new Error(`${url}: incorrect branch photos ${photos.join(', ')}`);
          if (await page.locator('main .location-card iframe').count()) throw new Error(`${url}: obsolete map iframe remains`);
        }
        // Ensure lazy images are requested before deciding they are broken.
        // This preserves production lazy-loading and tests the actual image bytes.
        await page.locator('img[loading="lazy"]').evaluateAll(images => images.forEach(img => { img.loading = 'eager'; }));
        await page.waitForFunction(() => [...document.images].every(img => img.complete), null, { timeout: 15000 });
        const failures = await page.locator('img').evaluateAll(images => images.filter(img => img.getAttribute('src') && (!img.complete || !img.naturalWidth)).map(img => img.src));
        if (failures.length) throw new Error(`${url}: broken images ${failures.join(', ')}`);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
        if (overflow) throw new Error(`${url}: horizontal overflow`);
        const mainLinks = await page.locator('#desktop-nav a').count();
        const footerLinks = await page.locator('#footer a').count();
        if (mainLinks !== 5 || footerLinks < 8) throw new Error(`${url}: incomplete navigation`);
        const axe = await new AxeBuilder({ page }).analyze();
        if (axe.violations.length) throw new Error(`${url}: axe violations ${JSON.stringify(axe.violations.map(v => ({ id: v.id, nodes: v.nodes.slice(0, 5).map(n => ({ target: n.target, html: n.html.slice(0, 250), summary: n.failureSummary })) })))}`);
        if (viewport.name === 'mobile') {
          const toggle = page.locator('[data-menu]');
          await toggle.click();
          if (await toggle.getAttribute('aria-expanded') !== 'true') throw new Error(`${url}: mobile menu did not open`);
          await page.keyboard.press('Escape');
          if (await toggle.getAttribute('aria-expanded') !== 'false') throw new Error(`${url}: mobile menu did not close`);
        }
        if (route === 'gallery/') {
          await page.locator('[data-gallery-open]').first().click();
          if (!await page.locator('.lightbox').evaluate(dialog => dialog.open)) throw new Error(`${url}: gallery viewer did not open`);
          await page.keyboard.press('Escape');
        }
        await page.close();
        cases++;
      }
    }
    await context.close();
  }
  await mkdir(path.join(root, '..', '..', 'outputs'), { recursive: true });
  const shots = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await shots.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await shots.screenshot({ path: path.join(root, '..', '..', 'outputs', 'ivan-home-desktop.png'), fullPage: true });
  await shots.setViewportSize({ width: 390, height: 844 });
  await shots.goto('http://127.0.0.1:4173/ar/', { waitUntil: 'networkidle' });
  await shots.screenshot({ path: path.join(root, '..', '..', 'outputs', 'ivan-home-arabic-mobile.png'), fullPage: true });
  console.log(JSON.stringify({ cases, axeAudits: cases, result: 'pass' }));
} finally {
  await browser.close();
  server.kill();
}
