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

## Accessibility rules for Codex
Codex MUST treat accessibility as a release requirement, not a cleanup pass.

Primary guidance:
- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
- W3C WAI-ARIA Authoring Practices Guide: https://github.com/w3c/aria-practices
- Automated engine: axe-core, already installed in this project.

Implementation requirements:
- MUST prefer native HTML semantics before ARIA.
- MUST preserve a logical heading hierarchy and one clear page-level h1.
- MUST provide a working skip link and visible, unobscured `:focus-visible` states.
- MUST keep all interactive flows keyboard-operable and follow the relevant WAI-ARIA APG pattern for composite widgets/dialogs.
- MUST return focus to the opener when dialogs or menus close.
- MUST keep mobile interactive targets at least 44x44 CSS px where practical; never create tiny touch-only controls.
- MUST NOT disable browser zoom or prevent text resizing.
- MUST keep body text readable at 200% zoom without loss of content or horizontal page scrolling.
- MUST meet WCAG AA contrast for normal text (4.5:1), large text (3:1), and meaningful UI boundaries/focus indicators (3:1 where applicable). Passing contrast is the floor; prefer comfortable contrast.
- MUST not rely on color alone to convey state or meaning.
- MUST support `prefers-reduced-motion`, safe-area insets, light/dark color schemes, and keyboard Escape behavior where relevant.
- MUST give images accurate alternative text when informative and empty alt text when decorative.
- MUST give icon-only controls accessible names.
- MUST ensure fixed/sticky UI never obscures focused controls or anchored content.
- SHOULD keep visible UI text at 14px or larger; 12px text is reserved for genuinely secondary metadata only and must remain highly legible.
- SHOULD use a disciplined spacing/type scale rather than one-off values that drift page to page.
- SHOULD verify Windows forced-colors/high-contrast behavior when feasible.

Agent review procedure:
1. Review changed UI against the Vercel Web Interface Guidelines.
2. For menus, dialogs, disclosure widgets, navigation and keyboard behavior, compare the implementation to the corresponding W3C APG pattern.
3. Run the existing source checks and axe-core browser suite.
4. Test keyboard-only navigation, 200% zoom, reduced motion and both light/dark themes.
5. Record actual results and remaining limitations in QA.md. Never claim WCAG certification from automated scans alone.

## Verification and handoff
- Run the static build and integrity checks, viewport/theme matrix, interaction tests and automated accessibility checks. Test a nested base path and no-JavaScript navigation.
- Visually inspect mobile and desktop output. Correct observed problems before handing off.
- Report actual results in QA.md, including limits. Never copy another project's passing results or claim full WCAG certification from axe.
- Keep source, design decisions, launch blockers, reusable tests and deployment instructions in the deliverable. Changes to synced sources are prohibited.
