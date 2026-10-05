# Tap & Grow website system

## Evidence before implementation
- Record each business fact and asset in docs/SOURCES.md with source URL, retrieval date, scope and uncertainty. Public does not mean owner-approved. Prefer official sources over directories; record conflicts.
- Never invent prices, testimonials, hours, booking destinations, services, accessibility amenities, ownership history or results. Keep unknowns in docs/READINESS.md and give visitors a useful contact action.
- Match services and phone numbers to their verified location. Do not turn a starting price into a fixed price. Do not imply an embedded booking system was tested when only its parent page was verified.
- Preserve original user assets and read-only references. No synthetic portfolio photography. Record photo consent as a launch requirement.

## Design and implementation
- Build an identity for the business, not a generic card grid. Use semantic tokens for color, type, spacing, borders, focus and motion; design from 320px upward.
- Make the primary conversion explicit and truthful. Keep alternative actions subordinate. No nonfunctional lead forms, artificial urgency or fake social proof.
- Generate real static HTML per page, with relative asset and navigation paths for GitHub Pages subdirectories. Essential content and navigation must work without JavaScript.
- Enhance navigation, lightbox and theme progressively. Support keyboard, Escape, focus return, touch, reduced motion, safe-area insets and blocked storage.
- Provide descriptive image alt text and dimensions. Eager-load only the principal image; lazy-load below-fold images. No third-party font, tracker or map embed by default.
- Keep demo pages noindex,nofollow. Do not add production canonical URLs or business structured data until the domain and business details are approved.

## Verification and handoff
- Run the static build and integrity checks, viewport/theme matrix, interaction tests and automated accessibility checks. Test a nested base path and no-JavaScript navigation.
- Visually inspect mobile and desktop output. Correct observed problems before handing off.
- Report actual results in QA.md, including limits. Never copy another project's passing results or claim full WCAG certification from axe.
- Keep source, design decisions, launch blockers, reusable tests and deployment instructions in the deliverable. Changes to synced sources are prohibited.
