# Research & Design Decisions — public-website

---

## Summary

- **Feature**: `public-website`
- **Discovery Scope**: New Feature (greenfield — no existing website)
- **Key Findings**:
  - Next.js `output: 'export'` is incompatible with next-intl middleware; browser language detection must be handled client-side in `app/page.tsx` via `navigator.language`
  - HubSpot Forms API v3 unauthenticated endpoint supports native CORS — no proxy required; rate limit is 50 req/10s (adequate for luxury RE volumes)
  - `@benaribi/ui` already ships `NavigationBar` (hamburger included), `Footer`, `Card`, `Button`, `Input`, `Textarea`, `Badge`, `SectionWrapper`, `Container`, `DarkOverlay`, `GeometricPattern`, `Logo` — no shell components need to be built from scratch

---

## Research Log

### HubSpot Forms API v3

- **Context**: Contact form (Req 7.2) and lead magnet email capture (Req 6.3, 4.7) must submit to HubSpot Free CRM from a browser with no proxy server.
- **Sources Consulted**:
  - HubSpot API reference: POST `/submissions/v3/integration/submit/{portalId}/{formGuid}`
  - HubSpot changelog: Forms Submission Rate Limits announcement
  - Community tutorial: JavaScript-based HubSpot Forms submission
- **Findings**:
  - Endpoint: `POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}`
  - No Authorization header required — portalId + formGuid are public identifiers
  - CORS: unauthenticated endpoint allows cross-origin browser `fetch()` — confirmed
  - Authenticated variant (`/secure/submit/`) does NOT support CORS; unsuitable for static sites
  - Body: `{ submittedAt: number (ms), fields: [{name, value}][], context?: {pageUri, pageName} }`
  - Success: HTTP 200 with `{"inlineMessage": "..."}`
  - Rate limits: 50 req/10s (not 100 as initially estimated); 429 on exceed; Cloudflare 1015 block on abuse
- **Implications**:
  - No proxy / serverless function needed → static constraint preserved
  - `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`, `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_GUID`, `NEXT_PUBLIC_HUBSPOT_LEAD_FORM_GUID` stored as build-time env vars (intentionally public)
  - Error handling must cover 429 and non-JSON Cloudflare 1015 response

### next-intl with Next.js `output: 'export'`

- **Context**: Requirement 8 demands EN/FR/ES multilingual routing with browser language detection. Next.js static export imposes constraints on middleware.
- **Sources Consulted**:
  - next-intl official docs: App Router with i18n routing + "usage without middleware"
  - next-intl GitHub examples for static export
  - Medium article: Internationalize Your Next.js Static Site (App Router)
- **Findings**:
  - next-intl v3 is compatible with `output: 'export'` with one restriction: **middleware does not execute** (requires Edge Runtime, which is server-side)
  - `generateStaticParams` in `[locale]/layout.tsx` exports all locale×page combinations at build time
  - Browser language detection must be done client-side: `app/page.tsx` reads `navigator.language` in `useEffect` and redirects to `/[detected-locale]/`
  - Locale preference persistence: `localStorage` write on language switch; `app/page.tsx` reads localStorage before falling back to `navigator.language`
  - `NextIntlClientProvider` must be mounted in `[locale]/layout.tsx` to provide translations to client components
- **Implications**:
  - `app/page.tsx` is a thin client shell (no SEO content) — acceptable since it only serves the redirect
  - Req 8.4 (browser preferred language) is met client-side, not at the CDN level
  - Hreflang tags (Req 8.5) generated via `generateMetadata` in `[locale]/layout.tsx`

### Existing Design System — Component Inventory

- **Context**: All visual components must come from `@benaribi/ui` (boundary constraint).
- **Sources Consulted**: `packages/ui/src/index.ts`, `packages/ui/src/components/NavigationBar/NavigationBar.tsx`, `packages/ui/src/tokens/colors.css`
- **Findings**:
  - Exported components: `Button`, `Input`, `Textarea`, `Badge`, `SectionWrapper`, `Container`, `Card` (with `CardImage`, `CardTitle`, `CardBody`), `Divider`, `DarkOverlay`, `GeometricPattern`, `Logo`, `Isotipo`, `NavigationBar`, `Footer`
  - `NavigationBar` already implements hamburger toggle, ARIA `aria-expanded`, mobile overlay panel, `links` / `logo` / `action` slots — Req 1.3, 1.4, 1.5 are largely satisfied by the existing component
  - Color tokens (Tailwind v4 `@theme`): `charcoal-black #1C1C1C`, `off-white #F5F3EF`, `champagne-gold #C4A35A`, `teal #3D8B7A`, `marble-grey #E0DDD8`
  - Font: Nunito Sans WOFF2 (self-hosted in design-system storybook static — must be referenced from `@benaribi/ui` dist or re-exported to `apps/web/public/`)
- **Implications**:
  - `SiteNav` in this spec is a thin wrapper — does not re-implement hamburger or mobile panel
  - `Footer` component exists in `@benaribi/ui` — use directly in `[locale]/layout.tsx`
  - Tailwind v4 must be used (not v3 as brief initially stated) to match design-system peer deps

### ROI Fiscal Calculator — Moroccan Tax Rules

- **Context**: Req 4.2–4.5 require a pure-JS calculator outputting exemptions, cost estimate, and process timeline based on Moroccan fiscal law.
- **Sources Consulted**: Charte de l'Investissement 2022 (Law 03-22, Morocco), general knowledge of Moroccan IS/IR/TVA regime, OECD Morocco tax treaty list
- **Findings**:
  - **Charte de l'Investissement 2022** establishes three investment tiers: standard (<MAD 100M, ~€9M), structurant (MAD 100M–500M), grand projet (>MAD 500M)
  - For v1 calculator targeting retail HNWI investors, practical thresholds are: Small <€100k, Mid €100k–€2M, Large >€2M
  - **IS (Impôt sur les Sociétés)**: 20% standard; 0% for 5 years in designated industrial zones (IDTL / zones franches); potentially 0% for 10 years for grand projets
  - **IR (Impôt sur le Revenu)**: Residential rental income taxed at 10.5% flat (after 40% deduction) for individuals; progressive brackets 0–38% for self-employed
  - **Treaty countries** (Morocco has treaties with ~55 nations): France, Spain, Germany, Belgium, Netherlands, USA, Canada, UK and others get additional withholding-tax exemption on dividends
  - Process timelines by sector: Company Setup (SARL) 6–16 weeks, Industrial (zone permit + CRI) 12–52 weeks depending on size, Residential (notarial transfer) 4–16 weeks
- **Implications**:
  - Fiscal rules hardcoded as a TypeScript constant — not a dynamic API call
  - Disclaimer is mandatory (Req 4.6) and prominent — rules are indicative only
  - `countryOfOrigin` input triggers treaty-bonus flag; ISO 3166-1 alpha-2 code used internally

---

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Decision |
|--------|-------------|-----------|---------------------|----------|
| **Next.js 15 + `output: 'export'`** | SSG: each page pre-rendered to static HTML at build | Native image optimization, generateMetadata API, next-intl integration, App Router | No middleware, no API routes in static export | **Selected** |
| Vite + react-i18next SPA | Pure SPA with vite-plugin-ssg for pre-rendering | Matches original brief | Less mature SSG, manual hreflang, no native image optimization | Rejected — SEO requirements favor Next.js |
| Next.js 15 SSR | Full server-side rendering | Middleware works, edge locale detection | Requires server / Vercel Functions; contradicts static constraint | Rejected — site must be fully static/CDN |

---

## Design Decisions

### Decision: Next.js 15 over Vite SPA

- **Context**: Brief specified "Vite SPA" but SEO requirements (hreflang, unique meta, sitemap, image optimization) are significantly easier to implement correctly with Next.js SSG
- **Alternatives Considered**:
  1. Vite + `vite-plugin-ssg` + `react-i18next`
  2. Next.js 15 with `output: 'export'`
- **Selected Approach**: Next.js 15 with `output: 'export'`
- **Rationale**: `generateMetadata` API handles Req 8.7 and 9.1–9.7 with near-zero boilerplate; `next/image` satisfies Req 11.1–11.4 natively; `next-sitemap` generates sitemap.xml post-build; stack remains React + Tailwind as required
- **Trade-offs**: Slightly larger build dependency; brief specified Vite; **resolved by aligning with "or SSG" clause in brief**
- **Follow-up**: Confirm with team that Vercel/Cloudflare Pages deployment is acceptable (both support Next.js static export)

### Decision: next-intl over react-i18next

- **Context**: i18n library must work with Next.js App Router and static export
- **Alternatives Considered**:
  1. react-i18next (mentioned in brief)
  2. next-intl v3
- **Selected Approach**: next-intl v3
- **Rationale**: next-intl is purpose-built for Next.js App Router; provides `generateStaticParams` helpers, typed message schema, and `useTranslations()` hook; react-i18next requires additional wrappers for App Router
- **Trade-offs**: Slightly less community content; no meaningful downside for this stack
- **Follow-up**: None

### Decision: HubSpot Forms API v3 unauthenticated (Option A)

- **Context**: Two forms must submit to HubSpot Free CRM from a static site without a proxy
- **Alternatives Considered**:
  1. HubSpot Forms API v3 unauthenticated (portalId + formGuid)
  2. HubSpot Contacts API v3 (requires Private App token + proxy)
- **Selected Approach**: Option A — unauthenticated Forms API v3
- **Rationale**: No API key exposure risk; native CORS support; adequate field mapping for v1 form fields; no serverless proxy needed → preserves static constraint
- **Trade-offs**: Field names must be configured in HubSpot portal to match submission payload; less flexible than Contacts API v3 for custom properties
- **Follow-up**: Portal admin must create two forms in HubSpot (contact form, lead capture) and share portalId + formGUIDs before deploy

### Decision: Calculator three-tier model

- **Context**: Fiscal rules must be simple enough for pure-JS implementation while still meaningful for HNWI prospects
- **Selected Approach**: Three capital tiers (Small < €100k, Mid €100k–€2M, Large > €2M) × three sectors × treaty-country flag
- **Rationale**: Covers 90%+ of realistic prospect scenarios without requiring a full Moroccan tax engine; produces a defensible indicative range with mandatory disclaimer
- **Trade-offs**: Coarse granularity; rules will need update when fiscal law changes
- **Follow-up**: Client to confirm tier thresholds and key rule accuracy before launch; `fiscal-rules.ts` should include a `RULES_VERSION` constant for future audit

### Decision: `EmailGateModal` as shared component (resources + calculator)

- **Context**: Both `/resources` (Req 6.2) and `/investment` calculator (Req 4.7) require email gate before PDF download
- **Selected Approach**: Single `EmailGateModal` component with `source: 'calculator' | 'resources'` prop
- **Rationale**: Identical UX pattern; reduces duplication; HubSpot submission uses `lead_source` field to distinguish origin in CRM
- **Trade-offs**: Slight coupling; acceptable given identical behavior
- **Follow-up**: None

### Decision: Tailwind v4 (not v3 as stated in brief)

- **Context**: `@benaribi/ui` peer dependencies declare `tailwindcss: ^4.0.0` and use `@theme` directive (Tailwind v4 syntax). Using v3 would break `@benaribi/ui` imports.
- **Selected Approach**: Tailwind v4 throughout monorepo
- **Rationale**: Consistency with existing design-system implementation is mandatory
- **Trade-offs**: Tailwind v4 has breaking changes from v3 (no `tailwind.config.js`, uses `@theme` CSS variables); docs are newer but sufficient
- **Follow-up**: None — design-system is already implemented with v4

---

## Synthesis Outcomes

### Generalizations
- Email gate (resources + calculator) → single `EmailGateModal` component with `source` prop
- HubSpot submission (contact + lead capture) → single `client.ts` with two typed methods
- Analytics event dispatch → single `events.ts` with typed fire functions; prevents ad-hoc `gtag()` calls scattered across components

### Build vs. Adopt Summary
| Component | Decision | Rationale |
|-----------|----------|-----------|
| Framework | Adopt Next.js 15 | SEO + image + SSG built-in |
| i18n | Adopt next-intl v3 | Purpose-built for App Router |
| Sitemap | Adopt next-sitemap | Zero-config post-build |
| GA4 | Adopt @next/third-parties | Official Next.js integration |
| Forms | Adopt react-hook-form + zod | Standard; eliminates manual validation state |
| Calculator logic | Build | Domain-specific fiscal rules |
| HubSpot client | Build | Thin wrapper; SDK overkill for two endpoints |
| Analytics helpers | Build | Typed wrappers around window.gtag / window.fbq |

### Simplifications Applied
- No Redux / Zustand: React `useState` is sufficient for calculator (3-step form) and contact form (idle/submitting/success/error)
- No dedicated analytics SDK: direct `window.gtag` / `window.fbq` calls wrapped in typed helpers
- No CMS adapter: all content in i18n JSON files — no indirection layer needed

---

## Risks & Mitigations

- **Fiscal rules accuracy**: calculator produces indicative values based on hardcoded 2022 rules → mandatory disclaimer (Req 4.6); `RULES_VERSION` constant for audit trail; easy to disable calculator per Req 4 fallback clause
- **HubSpot 429 rate limit**: 50 req/10s threshold → irrelevant at luxury RE volumes; implement basic retry-once with exponential backoff in `client.ts` as defensive measure
- **Cloudflare 1015 non-JSON response**: catch non-JSON fetch responses in `client.ts`; treat as transient error
- **PDF not delivered**: `public/downloads/morocco-investment-guide-2026.pdf` is externally supplied; add build-time file existence check
- **Tailwind v4 ecosystem maturity**: fewer third-party plugins than v3; limited to what design-system already uses → no risk for this feature
- **Static export + i18n redirect**: `app/page.tsx` generates a client-redirect shell; its SEO value is zero — acceptable since all real SEO is on `[locale]/` pages
- **Font WOFF2 path**: design-system provides fonts in `storybook-static/` (dev artifact); production path must be verified in `packages/ui/dist/` after `pnpm build`

---

## References

- [HubSpot Forms API v3 Reference](https://developers.hubspot.com/docs/api-reference/legacy/forms-v3-legacy/post-submissions-v3-integration-submit-portalId-formGuid)
- [HubSpot Forms Submission Rate Limits](https://developers.hubspot.com/changelog/announcing-forms-submission-rate-limits)
- [next-intl — App Router with i18n routing](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
- [next-intl — Static Export / No Middleware](https://next-intl.dev/docs/environments/server-client-components)
- [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)
- [@next/third-parties — GoogleAnalytics](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)
- [Charte de l'Investissement 2022 — Law 03-22 (Morocco)](https://www.investissement.gov.ma/charte-dinvestissement/)
- [Morocco Tax Treaty Network — OECD](https://www.oecd.org/en/topics/sub-issues/tax-treaties/morocco.html)
