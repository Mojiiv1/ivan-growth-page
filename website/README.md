# Ivan Beauty Salon — cream-and-gold website demo (V2)

Preview: https://mojiiv1.github.io/ivan-growth-page/website/

The mobile-first client-review demo has five real static pages (Home, Services, Bridal, Gallery and Locations) in English, French and Arabic. English uses `/website/`, `/website/services/`, and the other top-level page directories. French and Arabic use `/website/fr/...` and `/website/ar/...`. Every URL supports direct loading and refresh; Arabic documents use `dir="rtl"`.

The homepage uses the actual transparent gold Ivan logo, existing salon portfolio images, official locations and phone numbers, service/bridal information published on Ivan's original website, and user-provided Hemlock reference prices clearly labeled for reconfirmation. No testimonials, staff names, appointment availability or reviews are invented.

Booking goes to https://ivanbeauty.com/booking/. Google Calendar, email confirmations and other new booking automation have **not** been implemented.

Navigation, service cards, footer links and language links all use static relative URLs. Language switching retains the current page. JavaScript progressively enhances the mobile menu and gallery viewer; core content and navigation remain available without it. `scripts/app-source.html` is the localized source template and `scripts/export-static.mjs` exports all 15 documents with `hreflang` alternates.

## Preview and QA
```sh
npm install
npm run build
npm run check
npm run serve
npm run test
```

The demo retains noindex,nofollow and an explicit concept label. Before launch, confirm logo and photo usage rights, business hours (especially Hemlock Tuesday), all current prices, branches' service offerings, staff and scheduling, cancellation terms, and actual owner approval. Do not treat Google Calendar/Gmail automation as active.

## Gallery refinement — October 2026
The gallery presents five existing salon portfolio assets in a responsive editorial grid, with a progressive-enhancement full-screen viewer supporting keyboard arrows, Escape, focus return and touch swipes. Visitors can follow **@ivanbeautysalon** on Instagram via a clear external link; **the demo does not import, scrape or auto-sync Instagram posts**. Public use of salon imagery and any later embedded posts require owner permission. Source template and static export logic have been updated alongside all three published gallery routes.

## Services layout refinement — October 2026
The three localized Services pages now use six consistent cards with genuine hairstyle portfolio examples (only where relevant), readable typography, a structured 16-item Hemlock reference menu, an explicit price-verification disclaimer, and direct booking/phone links. Responsive styles are scoped in `assets/services-v2.css`, and `scripts/app-source.html` plus `scripts/export-static.mjs` have been updated to retain this layout on rebuild. No live booking form, staff availability, or confirmation automation is implied. The NFC Growth Page and other website pages are unchanged.
