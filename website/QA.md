# Audit and export — 2026-10-04

## This revision
Source review found and corrected:
- Mobile lightbox arrows could be narrower than 44px. They now have explicit 48px targets; navigation, footer links, phone links and other controls have 44px minimum target dimensions.
- Captions and navigation text were small. Control/caption text is now 14px, small labels 12px, and section heading line-height 1.12. Body text remains 16px/1.65.
- Dark primary buttons blended into the canvas. They now use gold backgrounds and dark text, with separate hover colours.
- Adjacent bridal links lacked separation. A shared link stack supplies consistent spacing; service-aside links also occupy separate rows.
- The gallery's first image was lazy-loaded. It is now eager/high-priority; remaining gallery images stay lazy-loaded.
- Logo height metadata was off by one pixel: corrected to the measured 1200 × 639 dimensions.
- Lightbox height now leaves room for controls on short screens. Pinch gestures no longer start swipe navigation. Viewer dimensions track the selected photograph.
- Mobile footer/scroll padding now accounts for the safe-area inset.
- The source export is self-contained: build, preview and checks no longer depend on parent growth-page files.

## Executed for this revision
- Static link/asset check: 128 references passed.
- Source audit: 133 local references and fragments passed; 26 configured light/dark text, focus and control contrast pairs passed the relevant 4.5:1 / 3:1 thresholds.
- JavaScript syntax checks passed. Original photo files remain unchanged. No business fact, price, hour, review, service or booking destination was added.
- Detailed ratios and asset hashes: qa/source-audit.json.

## Browser evidence and limitations
The previous private-demo revision passed 60 viewport/theme cases and 63 axe audits. Its results are retained as qa/baseline-results.json and qa/baseline-extra-results.json. Those results are not presented as a fresh audit of this revision.

Fresh access to the private live preview was blocked by automatic approval review because the browser tool reached its usage limit. No alternate browser or indirect access was used to bypass that denial. A fresh live-browser audit is therefore incomplete.

A repository-level GitHub Actions job is supplied to run the updated build and browser suite against localhost from the checked-in source. Its actual status must be checked separately; adding a workflow is not a passing test result. No phone call, booking, review or message is submitted by the tests.

Physical devices, screen readers, live booking completion and field Core Web Vitals remain unverified. No full WCAG certification or Lighthouse score is claimed.

## Chromium follow-up
The first GitHub QA run completed its 60 layout cases, then exposed a timing gap between native dialog Escape closure and scroll-lock cleanup. The lightbox now restores scrolling and focus synchronously for Escape, close-button and backdrop dismissal, with an idempotent native-close fallback. Fresh CI verification is pending for this repair.

The next Chromium run passed all 60 layout/touch-target cases and all 63 axe/interaction audits. The supplementary footer check then revealed a test-timing issue: it measured while smooth scrolling was still running. Test-only scroll positioning now uses instant scrolling so geometry is measured at the intended location. No footer layout or business information changed for this correction.


## Final UI/accessibility refinement — 2026-10-04

Implemented on the GitHub Pages source:
- Reduced the global section-spacing ceiling and tightened page gutters.
- Reduced oversized H1/H2/H3 scales while preserving the editorial hierarchy.
- Tightened header, hero, page-intro, service, location and footer spacing.
- Removed the large gallery stagger and normalized the final gallery item width.
- Raised micro text from 12px to 13px and kept control/caption text at 14px.
- Increased gallery zoom controls to 44px visual targets.
- Improved service-row readability and spacing.
- Reduced footer density and increased footer body text readability.
- Added forced-colors focus/border fallbacks.
- Clarified non-phone CTAs from “Call to book” to “Choose a location” where the link first opens the location chooser.
- Preserved verified Ivan content, phone links, official booking links, theme behavior, lightbox behavior and existing accessibility mechanics.

Verification status:
- GitHub Pages build checks passed for the current revision.
- The repository accessibility/browser QA workflow was triggered automatically and is still running at the time of this update.
- This document does not claim the new revision passed Playwright/axe until that workflow completes.


## Self-contained content cleanup — 2026-10-04

User-facing pages were simplified so the demo does not depend on the previous Ivan website for uncertain details:
- Removed all ivanbeauty.com links from the five public demo pages.
- Removed published opening-hour tables and the uncertain Hemlock Tuesday schedule.
- Removed online-booking claims and links.
- Removed unconfirmed hijab-space claims from the Home, Services and Locations pages.
- Removed bridal starting prices and old-menu references.
- Kept the two Ottawa addresses, direct phone actions, directions, Instagram, internal Services/Bridal/Gallery/Locations navigation and the supplied salon photography.
- Reworked Locations into direct contact cards with a call-for-current-hours/services message.
- Reworked Bridal into a planning/contact flow without quoting unconfirmed pricing.
- Reworked Services so it is clearly an overview, with current availability/details confirmed by phone.

No new business facts were invented in this cleanup.
