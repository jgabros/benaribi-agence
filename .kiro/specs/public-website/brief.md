# Brief: public-website

## Problem
International HNWIs and industrial companies looking to invest in Morocco cannot find Benaribi Agence through institutional channels. The firm lacks a web presence that positions it at the level of JLL/Knight Frank/Savills — the primary comparison set for its target clientele. Clients arrive only via referral or LinkedIn, with no SEO-driven inbound channel.

## Current State
No website exists. Only active digital presence is Instagram @benaribiagence. No inbound lead generation. No fiscal information resource for investors researching Morocco.

## Desired Outcome
A production-ready public marketing website at benaribi.ma that ranks for key EN/FR investment terms related to Morocco and Nador West Med, generates qualified inbound leads via a segmented contact form, and conveys institutional credibility at first scroll — comparable to JLL.com or Savills.com in tone and professionalism.

## Approach
React + Tailwind SPA with Vite. react-i18next for EN/FR/ES language switching (EN base, strings in JSON). Static export or SSG for CDN deployment and SEO. All pages import from the design-system component library. Lead forms submit to HubSpot Free CRM via REST API. Analytics: GA4 + Meta Pixel + LinkedIn Insight Tag.

## Scope
- **In**:
  - All pages: / (Home), /services/residential, /services/industrial, /services/company-setup, /investment, /about, /resources, /contact
  - Language switcher EN/FR/ES visible in header; hreflang tags; URL strategy (path or query param)
  - Home page sections: Hero (video/image aerial Nador West Med + claim), Services (3 cards), Why Morocco (macro data), Why Benaribi, CTA
  - ROI fiscal calculator v1: pure JS, no backend — inputs: capital + sector + investor type → outputs: applicable tax exemptions + cost estimate; embedded on /investment page
  - Lead magnet: "Morocco Investment Guide 2026" PDF gated behind email capture on /resources
  - Segmented contact form: country of origin + service interest + budget range (EUR); submits to HubSpot Free CRM
  - WhatsApp float button (+212 676 72 61 19) persistent on all pages
  - HubSpot Free CRM integration (contact creation on form submit)
  - GA4 + Meta Pixel + LinkedIn Insight Tag installed and event-tracked
  - SEO: meta title/description per page/language, Open Graph, Twitter Card, sitemap.xml, robots.txt
  - Core Web Vitals optimization: image lazy loading, font-display swap, critical CSS
- **Out**: Portal authentication or any client-specific content; AR/ZH languages; Blog or CMS; Backend-connected fiscal calculator (v2 belongs in fastapi-backend); Paid advertising campaigns (Phase 05); Content production (copywriting, photography, drone video — pre-production tasks outside this spec)

## Boundary Candidates
- Page architecture and client-side routing
- Multilingual content layer (i18n JSON strings + language detection)
- ROI calculator feature (JS logic + embedded UI)
- Lead capture flows (segmented form + lead magnet + CRM integration)
- Analytics instrumentation (event tracking plan)
- SEO and performance layer (meta, sitemap, image optimization)

## Out of Boundary
- Design tokens and base components (design-system)
- Client authentication or portal content (client-portal)
- Server-side logic or API calls (website is fully static/CDN-deployed)
- Content production (copy, photo, video assets)

## Upstream / Downstream
- **Upstream**: design-system (all visual components + fonts), brand assets (logo, photography, drone video from Phase 02 media production)
- **Downstream**: HubSpot CRM (receives form leads), GA4/Meta/LinkedIn platforms (receive pixel events), client-portal (CTA buttons link to portal.benaribi.ma)

## Existing Spec Touchpoints
- **Extends**: none
- **Adjacent**: design-system (imported), client-portal (CTA links point to portal)

## Constraints
- React + Tailwind v3 (matching portal stack for shared component imports)
- Static export or SSG — no SSR server; European CDN deployment
- No CMS dependency in v1 — all content in i18n JSON files
- HubSpot Free CRM API: 100 req/10s rate limit — adequate for form submission volumes at luxury real estate scale
- benaribi.ma Moroccan TLD
- Fonts must be self-hosted WOFF2 (design-system provides these files)
