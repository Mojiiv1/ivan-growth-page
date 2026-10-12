import { chromium } from 'playwright';
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'scripts', 'app-source.html');
const sourceHtml = (await readFile(source, 'utf8'))
  .replace('function top(', 'function pageTop(')
  .replaceAll('return top(', 'return pageTop(');
const sourceUrl = `data:text/html;base64,${Buffer.from(sourceHtml).toString('base64')}`;
const browser = await chromium.launch({ headless: true });
const routes = ['home', 'services', 'bridal', 'gallery', 'locations'];
const languages = ['en', 'fr', 'ar'];

function outputPath(lang, route) {
  if (lang === 'en' && route === 'home') return 'index.html';
  if (lang === 'en') return `${route}/index.html`;
  if (route === 'home') return `${lang}/index.html`;
  return `${lang}/${route}/index.html`;
}

function sitePath(lang, route) {
  if (lang === 'en' && route === 'home') return 'index.html';
  if (lang === 'en') return `${route}/index.html`;
  if (route === 'home') return `${lang}/index.html`;
  return `${lang}/${route}/index.html`;
}

function relative(fromFile, toFile) {
  return path.posix.relative(path.posix.dirname(fromFile), toFile) || 'index.html';
}

for (const lang of languages) {
  for (const route of routes) {
    const page = await browser.newPage();
    page.on('pageerror', error => console.error('Page error:', error.message));
    console.log(`Rendering ${lang}/${route}`);
    await page.goto(`${sourceUrl}#/${lang}/${route}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForFunction(() => document.documentElement.classList.contains('js-ready'), null, { timeout: 10000 });
    const out = outputPath(lang, route);
    const links = Object.fromEntries(languages.flatMap(l => routes.map(r => [`${l}/${r}`, relative(out, sitePath(l, r))])));
    const assetPrefix = `${path.posix.relative(path.posix.dirname(out), 'assets')}/`;
    await page.evaluate(({ lang, route, links, assetPrefix }) => {
      document.querySelectorAll('a[href^="#/"]').forEach(a => {
        const match = a.getAttribute('href').match(/^#\/(en|fr|ar)\/(home|services|bridal|gallery|locations)$/);
        if (match) a.href = links[`${match[1]}/${match[2]}`];
      });
      document.querySelectorAll('img[src^="assets/"]').forEach(img => img.src = assetPrefix + img.getAttribute('src').slice(7));
      const picker = document.querySelector('#lang-picker');
      picker.innerHTML = ['en', 'fr', 'ar'].map((l, i) => `<a href="${links[`${l}/${route}`]}" lang="${l}" hreflang="${l}" aria-current="${l === lang ? 'true' : 'false'}">${['EN', 'FR', 'العربية'][i]}</a>`).join('');
      picker.setAttribute('aria-label', lang === 'fr' ? 'Langue' : lang === 'ar' ? 'اللغة' : 'Language');
      const demo = document.querySelector('#demo-banner');
      demo.setAttribute('role', 'region');
      demo.setAttribute('aria-label', lang === 'fr' ? 'Avis de démonstration' : lang === 'ar' ? 'تنبيه الموقع التجريبي' : 'Demo notice');
      document.querySelector('#menu-toggle').removeAttribute('id');
      document.querySelector('#menu-toggle')?.remove();
      const toggle = document.querySelector('.menu-toggle');
      if (toggle) { toggle.dataset.menu = ''; toggle.setAttribute('aria-controls', 'mobile-nav'); }
      document.querySelector('#mobile-nav').dataset.mobileNav = '';
      if (route === 'gallery') {
        document.querySelectorAll('.gallery-page figure').forEach((figure, i) => {
          const img = figure.querySelector('img');
          const link = document.createElement('a');
          link.className = 'gallery-open';
          link.href = img.src;
          link.dataset.galleryOpen = String(i);
          link.setAttribute('aria-label', `${img.alt}: open full-size viewer`);
          img.replaceWith(link);
          link.append(img);
          link.insertAdjacentHTML('beforeend', '<span class="gallery-zoom" aria-hidden="true">↗</span>');
        });
        document.body.insertAdjacentHTML('beforeend', `<dialog class="lightbox" aria-labelledby="lightbox-caption"><button class="lightbox-close" type="button" data-lightbox-close aria-label="Close viewer">×</button><button class="lightbox-prev" type="button" data-lightbox-prev aria-label="Previous photo">‹</button><figure><img alt=""><figcaption id="lightbox-caption"></figcaption></figure><button class="lightbox-next" type="button" data-lightbox-next aria-label="Next photo">›</button></dialog>`);
      }
      if (route === 'locations') {
        document.querySelectorAll('main .location-card h3').forEach(heading => {
          const h2 = document.createElement('h2');
          h2.innerHTML = heading.innerHTML;
          heading.replaceWith(h2);
        });
        document.querySelectorAll('main .location-card h4').forEach(heading => {
          const h3 = document.createElement('h3');
          h3.className = 'hours-heading';
          h3.innerHTML = heading.innerHTML;
          heading.replaceWith(h3);
        });
      }
      document.querySelectorAll('script').forEach(script => script.remove());
      document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${assetPrefix}static.css">`);
      if (route === 'gallery') document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${assetPrefix}gallery-v2.css">`);
      document.body.insertAdjacentHTML('beforeend', `<script src="${assetPrefix}static.js" defer></script>`);
      document.querySelector('meta[name="description"]').content = document.querySelector('.section-intro,.lead')?.textContent.trim() || 'Ivan Beauty Salon website demo.';
      document.querySelectorAll('link[rel="alternate"]').forEach(link => link.remove());
      ['en','fr','ar'].forEach(l => document.head.insertAdjacentHTML('beforeend', `<link rel="alternate" hreflang="${l}" href="${links[`${l}/${route}`]}">`));
    }, { lang, route, links, assetPrefix });
    let html = await page.content();
    html = '<!doctype html>\n' + html.replace(/^<!DOCTYPE html>/i, '');
    const target = path.join(root, ...out.split('/'));
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');
    await page.close();
  }
}

await browser.close();
await mkdir(path.join(root, 'dist'), { recursive: true });
for (const entry of ['index.html', 'assets', 'services', 'bridal', 'gallery', 'locations', 'fr', 'ar', '.nojekyll', 'robots.txt']) {
  await cp(path.join(root, entry), path.join(root, 'dist', entry), { recursive: true, force: true });
}
console.log('Generated 15 static localized pages.');
