# Implementation Plan — public-website

- [x] 1. Foundation: scaffold apps/web and configure the development environment
- [x] 1.1 Create the apps/web Next.js 15 project with static export, Tailwind v4, and @benaribi/ui
  - Initialise `apps/web` in the monorepo with Next.js 15, enabling `output: 'export'` in `next.config.ts` and TypeScript strict mode
  - Install Tailwind v4 (`@tailwindcss/postcss`) and configure it to import CSS tokens from `@benaribi/ui`
  - Add `@benaribi/ui` as a workspace dependency; add `apps/web` to `pnpm-workspace.yaml`; add `web#build` and `web#dev` entries to `turbo.json`
  - Running `pnpm --filter web dev` starts the dev server at localhost:3000 with the @benaribi/ui fonts and tokens rendering correctly and no TypeScript errors
  - _Requirements: 11.2_

- [x] 1.2 Configure next-intl multilingual routing for EN/FR/ES
  - Create `i18n.ts` with `locales: ['en', 'fr', 'es']`, `defaultLocale: 'en'`, and a silent `onError` that falls back to the EN key
  - Create `app/[locale]/` directory; add `generateStaticParams` returning all three locale objects in `[locale]/layout.tsx`
  - Create skeleton `messages/en.json`, `messages/fr.json`, `messages/es.json` with placeholder keys for every page section (populated later in Task 8.1)
  - Running `next build` generates distinct `out/en/`, `out/fr/`, and `out/es/` output folders without errors; accessing `/en/` and `/fr/` renders the same placeholder shell
  - _Requirements: 8.1, 8.4, 8.6_

- [x] 1.3 Set up Vitest, @testing-library, and Playwright test infrastructure
  - Install and configure Vitest with jsdom, @testing-library/react, and @testing-library/user-event; add a `test` script to `apps/web/package.json`
  - Install Playwright; configure `playwright.config.ts` with a `webServer` pointing to `next build && serve out/` and a `baseURL` for local E2E runs
  - Add `e2e` script to `apps/web/package.json`; add both scripts to `turbo.json`
  - Running `pnpm --filter web test` exits 0 on an empty suite; running `pnpm --filter web e2e` launches the Playwright test runner without configuration errors
  - _Requirements: none (infrastructure)_

- [x] 2. Domain logic modules
- [x] 2.1 (P) Build the ROI fiscal calculator logic with unit tests
  - Implement `lib/calculator/fiscal-rules.ts` with the hardcoded Charte de l'Investissement 2022 data table (9 tier×sector entries), treaty-bonus country list, and `RULES_VERSION = "2022-v1"` export
  - Implement `lib/calculator/calculate.ts` exporting `calculateFiscalEstimate(inputs: CalculatorInputs): FiscalResult` as a pure function — no React imports, no browser APIs, no network calls
  - Write unit tests covering: all 9 tier×sector combinations return structurally valid `FiscalResult` objects; tier-boundary values (€99 999, €100 000, €2 000 000, €2 000 001) assign the correct `CapitalTier`; "France", "Spain", and "United States" set `hasTreatyBonus: true`; `min ≤ max` invariant holds for cost and timeline ranges
  - All unit tests pass; `calculateFiscalEstimate` returns a non-null `FiscalResult` for every valid input combination
  - _Requirements: 4.2, 4.3, 4.5_
  - _Boundary: calculate.ts, fiscal-rules.ts_

- [x] 2.2 (P) Build the HubSpot Forms API v3 client adapter with unit tests
  - Implement `lib/hubspot/client.ts` exporting `submitContact(fields: HubSpotContactFields): Promise<void>` and `captureLeadEmail(fields: HubSpotLeadEmailFields): Promise<void>`
  - Read `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`, `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_GUID`, and `NEXT_PUBLIC_HUBSPOT_LEAD_FORM_GUID` from env vars; construct the HubSpot Forms API v3 payload with `submittedAt` (ms timestamp) and `context`
  - `submitContact` rejects on non-200 HTTP responses; `captureLeadEmail` swallows all errors and resolves silently; both catch non-JSON Cloudflare 1015 responses
  - Unit tests confirm: `submitContact` builds a payload containing all 6 required field names; an HTTP 429 response causes `submitContact` to reject; `captureLeadEmail` resolves even when `fetch` throws
  - _Requirements: 6.3, 6.5, 7.2_
  - _Boundary: client.ts_

- [x] 2.3 (P) Build analytics event helpers with unit tests
  - Implement `lib/analytics/events.ts` exporting `fireLead(source: 'contact-form')`, `fireLeadMagnetDownload(source: 'calculator' | 'resources')`, and `fireCalculatorCompleted(sector: CalculatorSector)`
  - Each function guards with `typeof window !== 'undefined'` before calling `window.gtag`, `window.fbq`, and `window.lintrk` with the correct event names and parameters
  - Unit tests confirm: `fireLead` calls `window.gtag` with event name `"generate_lead"` when `window` is defined; each helper is a no-op (no throw) when `window` is undefined
  - _Requirements: 10.4, 10.5, 10.6_
  - _Boundary: events.ts_

- [x] 3. Site shell, shared components, and per-locale layout
- [x] 3.1 (P) Build the LanguageSwitcher, WhatsApp button, and root locale redirect
  - Implement `components/layout/LanguageSwitcher.tsx` as a Client Component rendering EN/FR/ES buttons; on click, call `router.replace` (next-intl) for the current path in the new locale and persist the choice to `localStorage['preferred-locale']`
  - Implement `components/layout/WhatsAppButton.tsx` as a fixed-position `<a href="https://wa.me/212676726119">` with `rel="noopener noreferrer"` and min 44×44 px touch target
  - Implement `app/page.tsx` as a Client Component: reads `localStorage['preferred-locale']`, then `navigator.language`, redirects to the matched locale path or `/en/` as the default — this page has no SEO-visible content
  - Clicking a language button in the switcher immediately updates all visible text without a full page reload; returning to `http://localhost:3000/` redirects to the previously selected locale
  - _Requirements: 1.7, 8.2, 8.3, 8.4_
  - _Boundary: LanguageSwitcher, WhatsAppButton, app/page.tsx_

- [x] 3.2 (P) Build the AnalyticsProvider with GA4, Meta Pixel, and LinkedIn Insight Tag
  - Implement `components/shared/AnalyticsProvider.tsx` using `<GoogleAnalytics gaId={NEXT_PUBLIC_GA4_ID}>` from `@next/third-parties/google`, plus two `<Script strategy="afterInteractive">` blocks: one for Meta Pixel (`fbq('init', ID); fbq('track', 'PageView')`) and one for the LinkedIn Insight Tag
  - None of the three scripts block page rendering; all load after the page is interactive
  - _Requirements: 10.1, 10.2, 10.3, 10.7_
  - _Boundary: AnalyticsProvider_

- [x] 3.3 Build SiteNav wrapping the NavigationBar design-system component
  - Implement `components/layout/SiteNav.tsx` (Client Component): pass locale-aware next-intl `<Link>` elements into NavigationBar's `links` slot, `<Logo>` into the `logo` slot, and `<LanguageSwitcher>` into the `action` slot
  - NavigationBar's built-in hamburger toggle and mobile overlay panel satisfy the mobile nav requirements without additional code in SiteNav
  - On a desktop viewport, all navigation links and the language switcher are visible; on a mobile viewport, a hamburger button appears that toggles the full-width overlay with links and the language switcher
  - _Requirements: 1.3, 1.4, 1.5_

- [x] 3.4 Build the per-locale layout and global 404 page
  - Implement `app/[locale]/layout.tsx` mounting `NextIntlClientProvider` (with locale messages), `AnalyticsProvider`, `SiteNav`, the `Footer` component from `@benaribi/ui`, and `WhatsAppButton`; add `generateMetadata` emitting `<link rel="alternate" hreflang="...">` for all three locales
  - Implement `app/not-found.tsx` displaying a 404 headline and a link back to `/[detected-locale]/` derived from `usePathname`
  - Every page under `[locale]/` renders with SiteNav, Footer, and WhatsApp button present; navigating to an unknown route renders the 404 shell with a working link to home
  - _Requirements: 1.2, 1.6, 8.5_

- [x] 3.5 Build the EmailGateModal shared component
  - Implement `components/shared/EmailGateModal.tsx` accepting `{ source: 'calculator' | 'resources', pdfPath: string, onClose: () => void }`
  - Email field validated with zod `z.string().email()` via react-hook-form; on valid submit, call `captureLeadEmail({ email, lead_source: source })` from `lib/hubspot/client.ts`, then unconditionally trigger `<a href={pdfPath} download>` click and call `fireLeadMagnetDownload(source)` from `lib/analytics/events.ts`
  - On HubSpot error, display a non-blocking inline notice; the PDF download proceeds in both the success and failure paths
  - Submitting an invalid email shows an inline error without calling HubSpot; submitting a valid email initiates the PDF download regardless of the HubSpot API outcome
  - _Requirements: 4.7, 6.2, 6.3, 6.4, 6.5, 6.6_
  - _Boundary: EmailGateModal_
  - _Depends: 2.2_

- [x] 4. (P) Home page
- [x] 4.1 (P) Build the Hero section with video and static image fallback
  - Implement `components/sections/home/Hero.tsx` with `<video autoPlay muted loop playsInline>` and a `next/image` fallback rendered simultaneously; position video absolutely on top via CSS so the static image is immediately visible while the video buffers
  - Apply the `priority` prop on the `next/image` fallback (LCP optimisation); wrap both layers with `DarkOverlay` from `@benaribi/ui` for text contrast
  - Declare explicit `width` and `height` on all images; descriptive `alt` on content images, `alt=""` on decorative ones
  - The static fallback image is visible at first paint before the video starts playing; the Hero headline, sub-headline, and CTA button render in the active locale
  - _Requirements: 2.1, 2.2, 9.5, 11.1, 11.3, 11.4_
  - _Boundary: Hero_

- [x] 4.2 (P) Build the ServicesGrid section
  - Implement `components/sections/home/ServicesGrid.tsx` rendering three `Card` components from `@benaribi/ui` for Residential, Industrial, and Company Setup services
  - Each card links to its service route using next-intl `Link` and displays translated title and short description from next-intl `useTranslations`
  - Three cards render with correct translated content and clicking each card navigates to the respective service route
  - _Requirements: 2.3_
  - _Boundary: ServicesGrid_

- [x] 4.3 (P) Build WhyMorocco, WhyBenaribi, and HomeCTA sections
  - Implement `WhyMorocco.tsx` presenting at least three macro investment data points (GDP context, FDI figures, Charte 2022 highlights) using `SectionWrapper` from `@benaribi/ui`; use `<section>` and `<article>` with appropriate heading hierarchy
  - Implement `WhyBenaribi.tsx` listing the firm's key differentiators using `SectionWrapper`
  - Implement `HomeCTA.tsx` with a primary `Button` linking to `/contact` and a secondary link to `/investment`, all translated via next-intl
  - All three sections render in the active locale with correct semantic HTML structure
  - _Requirements: 2.4, 2.5, 2.6, 9.6_
  - _Boundary: WhyMorocco, WhyBenaribi, HomeCTA_

- [x] 4.4 Compose the Home page with generateMetadata
  - Implement `app/[locale]/page.tsx` assembling Hero → ServicesGrid → WhyMorocco → WhyBenaribi → HomeCTA in a `<main>` element with appropriate landmark structure
  - Add `generateMetadata` returning a locale-specific `title`, `description`, `openGraph` block, and `twitter` card for EN, FR, and ES
  - Navigating to `http://localhost:3000/en/` renders all home page sections with correct content, no layout shift, and no console errors; the `<title>` tag in the document head differs between `/en/` and `/fr/`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 8.7, 9.1, 9.2_

- [x] 5. (P) Service pages
- [x] 5.1 (P) Build shared service page section components
  - Implement `ServiceHero.tsx`, `ServiceBody.tsx`, and `ServiceCTA.tsx` under `components/sections/services/`
  - `ServiceHero` renders a page-specific background image with `DarkOverlay` and a translated heading; `ServiceBody` renders a service description and a benefits list from next-intl; `ServiceCTA` renders a `Button` linking to `/contact`
  - All three components accept their content via next-intl `useTranslations` with a namespace passed as a prop, so they can be reused across the three service pages
  - _Requirements: 3.2, 3.3_
  - _Boundary: ServiceHero, ServiceBody, ServiceCTA_

- [x] 5.2 (P) Compose the three service pages with generateMetadata
  - Implement `[locale]/services/residential/page.tsx`, `industrial/page.tsx`, and `company-setup/page.tsx`, each composing ServiceHero → ServiceBody → ServiceCTA with a `<main>` landmark element
  - Add `generateMetadata` to each page with a distinct locale-specific title and description
  - Populate EN translation keys for all three service pages in `messages/en.json`
  - All three service pages render at their respective routes with page-specific content; no two pages share the same `<title>` tag value
  - _Requirements: 3.1, 3.2, 3.3, 8.7, 9.1, 9.6_
  - _Boundary: service page.tsx files_

- [x] 6. (P) Investment page and ROI Fiscal Calculator
- [x] 6.1 (P) Build the InvestmentLandscape section and investment page skeleton
  - Implement `components/sections/investment/InvestmentLandscape.tsx` presenting Morocco's investment landscape and Charte de l'Investissement 2022 key provisions using `SectionWrapper`; use semantic HTML with appropriate heading hierarchy
  - Implement `app/[locale]/investment/page.tsx` with a `<main>` element, `generateMetadata`, and a placeholder for the RoiCalculator component
  - _Requirements: 4.1, 9.1, 9.6_
  - _Boundary: InvestmentLandscape, investment/page.tsx_

- [x] 6.2 (P) Build the RoiCalculator step 1 (inputs) and step 2 (results)
  - Implement `components/sections/investment/RoiCalculator.tsx` with a three-step state machine: `{ step: 'inputs' | 'results' | 'email-gate', inputs: CalculatorInputs | null, result: FiscalResult | null }`
  - Step 1: react-hook-form + zod validates `capitalEUR` (positive number), `sector` (`<select>`), and `countryOfOrigin` (non-empty text input); invalid submission shows inline field-level errors without advancing the step
  - Step 2: displays `FiscalResult` from the domain logic call — exemptions checklist, cost range (min–max EUR), process timeline (min–max weeks), and the mandatory disclaimer text (Req 4.6)
  - Submitting valid Step 1 inputs transitions to the results panel; submitting with a missing or invalid field shows inline zod error messages and does not render the results panel
  - _Requirements: 4.2, 4.3, 4.4, 4.6, 11.5, 11.6, 11.8_
  - _Boundary: RoiCalculator_

- [x] 6.3 Wire the calculator to domain logic, analytics, and EmailGateModal
  - Connect `calculateFiscalEstimate` from `lib/calculator/calculate.ts` in the step 1→2 transition; fire `fireCalculatorCompleted(sector)` from `events.ts` immediately after the results panel renders
  - Mount `EmailGateModal` with `source="calculator"` and `pdfPath="/downloads/morocco-investment-guide-2026.pdf"` when the visitor clicks the "Download Full Analysis" CTA in step 2; on modal close without download, return to step 2
  - Mount the finished RoiCalculator in `investment/page.tsx` below InvestmentLandscape
  - No network request is made at any point during input entry or results display; the `CalculatorCompleted` GA4 event fires exactly once per calculation; clicking the CTA opens the EmailGateModal
  - _Requirements: 4.5, 4.7, 10.6_
  - _Depends: 2.1, 3.5_

- [x] 7. (P) Lead capture, about, and contact pages
- [x] 7.1 (P) Build the LeadMagnetBlock section and compose the Resources page
  - Implement `components/sections/resources/LeadMagnetBlock.tsx` displaying the Morocco Investment Guide 2026 title, description, and a download CTA button
  - Clicking the CTA opens `EmailGateModal` (built in Task 3.5) with `source="resources"` and `pdfPath="/downloads/morocco-investment-guide-2026.pdf"`
  - Implement `app/[locale]/resources/page.tsx` with `generateMetadata` and populate EN translation keys for the resources page
  - The resources page renders the guide block; clicking the download CTA opens the email gate modal
  - _Requirements: 6.1, 6.2, 9.1_
  - _Boundary: LeadMagnetBlock, resources/page.tsx_
  - _Depends: 3.5_

- [x] 7.2 (P) Build the ContactForm and compose the Contact page
  - Implement `components/sections/contact/ContactForm.tsx` with react-hook-form + zod for fields: `firstname` and `lastname` (text), `email`, `country` (select), `service_interest` (select: residential | industrial | company-setup | other), `budget_range` (select: <50k | 50k–100k | 100k–500k | 500k–2M | >2M)
  - On valid submit: call `submitContact` from `lib/hubspot/client.ts`; on success render a confirmation message replacing the form and fire `fireLead('contact-form')`; on HubSpot error render an error banner above the form with all field values preserved
  - On invalid submit: show per-field inline zod errors without calling HubSpot; all interactive elements are native HTML `<input>` and `<select>` with `<label>` associations and min 44×44 px touch targets; form is fully keyboard-navigable
  - Implement `app/[locale]/contact/page.tsx` embedding ContactForm and the firm's alternative contact details (WhatsApp number, email address, office address); add `generateMetadata`
  - A successful submission replaces the form with a confirmation message; a HubSpot failure shows an error banner with all fields still populated; keyboard-only navigation reaches every field and the submit button
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 10.4, 11.5, 11.6, 11.8_
  - _Boundary: ContactForm, contact/page.tsx_
  - _Depends: 2.2_

- [x] 7.3 (P) Build the About page with FirmStory and TeamSection
  - Implement `components/sections/about/FirmStory.tsx` with the firm's founding story, geographic focus (Nador West Med), and positioning statement using `SectionWrapper`
  - Implement `components/sections/about/TeamSection.tsx` rendering the lead advisor profile using `Card` from `@benaribi/ui`
  - Implement `app/[locale]/about/page.tsx` assembling FirmStory → TeamSection → a contact CTA `Button` linking to `/contact`; add `generateMetadata` with locale-specific title and description
  - The About page renders all three sections; the contact CTA navigates to the Contact page
  - _Requirements: 5.1, 5.2, 5.3, 9.1_
  - _Boundary: FirmStory, TeamSection, about/page.tsx_

- [ ] 8. SEO, complete translations, and analytics event verification
- [ ] 8.1 Complete EN/FR/ES translation files for all pages
  - Finalise all keys in `messages/en.json` with real copy placeholders (or supplied content) for every page section: nav links, footer, error messages, button labels, form labels, calculator UI labels and disclaimer text
  - Translate all EN keys into `messages/fr.json` and `messages/es.json`; this task completes the skeleton created in Task 1.2 — no new message keys should be added after this point without a matching EN entry
  - Building the app with a missing translation key triggers a next-intl `onError` warning but not a build error; no raw translation keys (e.g., `common.submit`) appear in any rendered output across EN, FR, and ES
  - _Requirements: 3.3, 8.1, 8.6_

- [ ] 8.2 Implement per-page generateMetadata (title, description, Open Graph, canonical, hreflang)
  - Update or confirm `generateMetadata` on every page file (home, residential, industrial, company-setup, investment, about, resources, contact) to return locale-specific `title`, `description`, `openGraph` (`og:title`, `og:description`, `og:image`, `og:url`), `twitter` (summary_large_image card), and `alternates.canonical`
  - Confirm `[locale]/layout.tsx` emits `<link rel="alternate" hreflang="...">` for all three locales on every page; decorative images use `alt=""`; content images have descriptive `alt` text
  - `next build` output shows distinct `<title>` and `<meta name="description">` for at least the EN and FR variants of the home page, investment page, and contact page; each page's `<link rel="canonical">` points to its own locale URL
  - _Requirements: 8.5, 8.7, 9.1, 9.2, 9.5, 9.6, 9.7_

- [ ] 8.3 Configure next-sitemap for sitemap.xml and robots.txt
  - Install `next-sitemap`; create `next-sitemap.config.js` listing all eight page routes across all three locales (24 entries total) with `alternateRefs` for hreflang entries
  - Add `"postbuild": "next-sitemap"` to `apps/web/package.json`
  - Running `pnpm --filter web build` produces `out/sitemap.xml` with 24 URL entries covering all locale×page combinations, and `out/robots.txt` with `Allow: /` and a `Sitemap:` pointer
  - _Requirements: 9.3, 9.4_

- [ ] 8.4 Verify and complete analytics event wiring across all conversion points
  - Confirm `fireLead('contact-form')` fires from ContactForm after a successful `submitContact` call
  - Confirm `fireLeadMagnetDownload(source)` fires from EmailGateModal on PDF download trigger, in both the HubSpot-success and HubSpot-failure paths
  - Confirm `fireCalculatorCompleted(sector)` fires from RoiCalculator exactly once on the step 1→2 transition
  - In a development build with `window.gtag` replaced by a jest/vitest spy, all three events are observable via browser console or spy assertions after the corresponding user actions
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 9. Integration tests, E2E tests, and performance baseline
- [ ] 9.1 Write integration tests for RoiCalculator, ContactForm, and EmailGateModal
  - RoiCalculator: valid inputs → results panel renders containing `FiscalResult` data; `fireCalculatorCompleted` spy called once with the correct sector value
  - RoiCalculator: missing or invalid input → inline zod error visible for the failing field; results panel not rendered
  - ContactForm: all fields valid → `submitContact` called once → confirmation message visible and form hidden
  - ContactForm: `submitContact` rejects → error banner visible; all field values preserved in the form
  - EmailGateModal: invalid email → `captureLeadEmail` not called; valid email + HubSpot success → PDF `<a>` click triggered; valid email + HubSpot failure → PDF `<a>` click still triggered
  - All integration tests pass with `pnpm --filter web test`
  - _Requirements: 4.2, 4.3, 4.4, 4.7, 6.2, 6.4, 6.5, 7.1, 7.3, 7.4, 7.5_

- [ ] 9.2 Write Playwright E2E tests for the five critical user paths
  - Test 1 — Contact form: fill firstname, lastname, email, country, service interest, budget → submit (HubSpot stubbed) → confirmation message visible; form no longer in DOM
  - Test 2 — Resources lead magnet: navigate to `/en/resources/` → click download CTA → email gate modal visible → submit valid email → PDF download initiated (anchor click observed)
  - Test 3 — Calculator flow: navigate to `/en/investment/` → enter capital + sector + country → click calculate → results panel visible with exemptions and timeline → click "Download Full Analysis" → email gate opens → submit email → PDF download initiated
  - Test 4 — Language switch: navigate to `/en/` → click FR in language switcher → URL is `/fr/` → at least one heading is in French → `<head>` contains `<link rel="alternate" hreflang="fr">`
  - Test 5 — Mobile navigation: set viewport to 375×812 → hamburger button visible → click → nav overlay visible with all links → click a link → overlay closes
  - All 5 E2E tests pass against a locally-served static build
  - _Requirements: 1.3, 1.4, 1.5, 4.2, 4.3, 4.7, 6.1, 6.2, 7.1, 8.2, 8.3_

- [ ]* 9.3 Lighthouse CI performance baseline (optional — deferrable post-MVP)
  - Configure `lighthouserc.js` with assertions: `lcp ≤ 2500 ms`, `cls ≤ 0.1`, `performance ≥ 0.80`, `accessibility ≥ 0.90`
  - Add `lhci autorun` as an optional CI step after `next build`
  - Running Lighthouse on the locally-served Home page reports LCP ≤ 2.5 s and CLS < 0.1 for the simulated mobile throttled profile
  - _Requirements: 11.1, 11.4_
