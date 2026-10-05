# Ivan Beauty Salon — full website demo

The five-page demo is self-contained in this directory. Keep `assets/`, `services/`, `bridal/`, `gallery/` and `locations/` beside `index.html`. All navigation and asset URLs are relative, so this works at a GitHub Pages project subdirectory.

GitHub Pages destination: https://mojiiv1.github.io/ivan-growth-page/website/

## Preview, edit and rebuild
Use Node.js 22+:

```sh
npm install
npm run build
npm run check
npm run serve
```

Open http://127.0.0.1:4173/. Edit `scripts/build.mjs` for content and page templates, and `assets/` for shared styling and behaviour. The build regenerates the five static pages here and copies only deployable assets into `dist/`. It needs no parent files and does not depend on the old growth page or private Sites hosting.

Run `node scripts/audit-source.mjs` for local links, fragments, asset hashes and contrast calculations. With the local server running, `npm run test` runs the browser suite. Windows uses installed Edge; Linux uses Playwright Chromium (`npx playwright install --with-deps chromium`). The repository-level GitHub Actions job uses this directory as its working directory.

## Documentation
- `AGENTS.md`: reusable implementation rules.
- `docs/SOURCES.md`: verified/public business facts and original asset provenance.
- `docs/DESIGN.md`: architecture and design decisions.
- `docs/READINESS.md`: required owner confirmations before production.
- `QA.md`: audit evidence, fixes and limitations.
- `qa/baseline-*.json`: previous version's browser evidence, explicitly not results for this revision.
- `qa/source-audit.json`: this revision's source checks.

The original root landing page remains separate. No prices, hours, service claims or booking destinations were added during this audit. Demo labels and noindex remain. Do not add production canonical URLs or structured data until the owner confirms the final domain and business details.
