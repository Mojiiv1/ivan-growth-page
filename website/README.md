# Ivan Beauty Salon — cream-and-gold website demo (V2)

Preview: https://mojiiv1.github.io/ivan-growth-page/website/

The homepage is a mobile-first, client-review design demo. It has five navigable views (Home, Services, Bridal, Gallery, Locations) at hash routes such as `#/en/services`, `#/fr/bridal`, and `#/ar/locations`. English, French and Arabic are supported. Arabic switches document direction to RTL.

The homepage uses the actual transparent gold Ivan logo, existing salon portfolio images, official locations and phone numbers, service/bridal information published on Ivan's original website, and user-provided Hemlock reference prices clearly labeled for reconfirmation. No testimonials, staff names, appointment availability or reviews are invented.

Booking goes to https://ivanbeauty.com/booking/. Google Calendar, email confirmations and other new booking automation have **not** been implemented.

The previously generated static pages in `services/`, `bridal/`, `gallery/` and `locations/` remain in place as archived references. The V2 navigation stays within `index.html`; `scripts/build.mjs` deliberately preserves that homepage while rebuilding the older archive pages. The app is a prototype, not production-ready static localized pages. For an official launch, convert language+page hash routes to server-addressable static URLs with `hreflang`, and ensure the core content works without JavaScript.

## Preview and QA
```sh
npm install
npm run build
npm run check
npm run serve
npm run test
```

The demo retains noindex,nofollow and an explicit concept label. Before launch, confirm logo and photo usage rights, business hours (especially Hemlock Tuesday), all current prices, branches' service offerings, staff and scheduling, cancellation terms, and actual owner approval. Do not treat Google Calendar/Gmail automation as active.
