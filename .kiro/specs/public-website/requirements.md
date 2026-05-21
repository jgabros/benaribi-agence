# Requirements — public-website

## Introduction

The public-website is the primary digital presence for Benaribi Agence at benaribi.ma. It serves international high-net-worth investors (HNWIs) and industrial companies researching Morocco as an investment destination. The site must convey institutional credibility comparable to JLL.com and Savills.com, generate qualified inbound leads via a segmented contact form and a gated lead magnet, provide a pure-JavaScript ROI fiscal calculator for preliminary investment research, and be fully discoverable via international SEO in English, French, and Spanish. The site is fully static/CDN-deployed with no server-side logic.

## Boundary Context

- **In scope**: All public pages (Home, Services ×3, Investment, About, Resources, Contact); multilingual content EN/FR/ES; ROI Fiscal Calculator v1 (client-side only); Morocco Investment Guide 2026 lead magnet with email-gated download; segmented contact form integrated with HubSpot Free CRM; WhatsApp float button; GA4 + Meta Pixel + LinkedIn Insight Tag analytics; per-page SEO meta, Open Graph, sitemap.xml, robots.txt; Core Web Vitals optimization; WCAG AA accessibility.
- **Out of scope**: Client portal authentication or any private/authenticated content; AR/ZH language support; CMS or blog; backend-connected ROI calculator v2 (fastapi-backend spec); paid advertising campaigns; content production (copy, photography, video assets).
- **Adjacent expectations**: The site imports all visual components and fonts exclusively from the `@benaribi/ui` design-system package. HubSpot Free CRM receives form submissions and lead-magnet captures (rate limit: 100 req/10 s). CTA buttons linking to the client portal point to portal.benaribi.ma (client-portal spec scope). Content assets (copy, images, video) are supplied externally prior to launch.

---

## Requirements

### Requirement 1: Page Architecture & Navigation

**Objective:** As a visitor, I want to browse a clearly structured site with persistent navigation, so that I can reach any page without confusion.

#### Acceptance Criteria

1. The Public Website shall serve the following routes: `/` (Home), `/services/residential`, `/services/industrial`, `/services/company-setup`, `/investment`, `/about`, `/resources`, `/contact`.
2. When a visitor navigates to a route that does not match any defined page, the Public Website shall display a 404 page with a link back to the home page.
3. The Public Website shall display a persistent navigation bar on every page containing: the Benaribi Agence logo, links to all primary pages, the language switcher, and a primary CTA button.
4. When the viewport is below the mobile breakpoint, the Public Website shall collapse navigation links into a hamburger menu toggle.
5. When the hamburger menu is opened, the Public Website shall display all navigation links and the language switcher in a full-width overlay panel.
6. The Public Website shall display a footer on every page containing: office address, phone number, email address, links to all main pages, and social media links.
7. The Public Website shall display a persistent WhatsApp float button on every page linking to the firm's WhatsApp number (+212 676 72 61 19).

---

### Requirement 2: Home Page

**Objective:** As a first-time visitor, I want to immediately understand Benaribi Agence's value proposition, so that I can decide whether to explore further or make contact.

#### Acceptance Criteria

1. The home page shall display a Hero section with a full-width aerial visual of Nador West Med, a headline claim, a supporting sub-headline, and a primary CTA button.
2. While the Hero video is loading, the Public Website shall display a static image as a fallback to prevent a blank Hero area.
3. The home page shall display a Services section with three cards for Residential Real Estate, Industrial Real Estate, and Company Setup, each linking to its respective service page.
4. The home page shall display a "Why Morocco" section presenting at least three macro investment data points (for example: GDP context, FDI figures, or Charte de l'Investissement 2022 highlights).
5. The home page shall display a "Why Benaribi" section articulating the firm's differentiators from generic real estate agents.
6. The home page shall display a closing CTA section inviting visitors to contact the firm or visit the Investment page.

---

### Requirement 3: Service Pages

**Objective:** As an investor evaluating a specific sector, I want a dedicated page per service type, so that I can assess whether Benaribi's offering matches my investment goals.

#### Acceptance Criteria

1. The Public Website shall provide a dedicated page for each service: `/services/residential`, `/services/industrial`, `/services/company-setup`.
2. Each service page shall include: a page-specific hero, a service description, key benefits or differentiators, and a contact CTA section at page bottom.
3. The Public Website shall render the correct content in the visitor's active language for every section of every service page.

---

### Requirement 4: Investment Page & ROI Fiscal Calculator v1

**Objective:** As an international investor researching Morocco, I want to use an interactive fiscal calculator, so that I can make a preliminary assessment of applicable tax exemptions and costs before booking a consultation.

#### Acceptance Criteria

1. The `/investment` page shall describe Morocco's investment landscape and the key provisions of the Charte de l'Investissement 2022.
2. The `/investment` page shall embed an interactive ROI Fiscal Calculator accepting the following inputs: investment capital (EUR amount), sector (Residential / Industrial / Company Setup), and investor type (Individual / Corporate / Foreign Entity).
3. When all required calculator inputs are provided and valid, the Public Website shall display: applicable Moroccan tax exemptions, an estimated tax cost, and an estimated net return range.
4. When a required calculator input is missing or contains an invalid value, the Public Website shall display an inline validation message identifying the problematic field.
5. The ROI calculator shall produce all outputs without making any network requests.
6. The `/investment` page shall display a disclaimer stating that calculator results are indicative only and do not constitute legal or fiscal advice.
7. When a visitor completes the calculator, the Public Website shall display a CTA encouraging them to contact Benaribi for a full fiscal analysis.

---

### Requirement 5: About Page

**Objective:** As a prospective client evaluating the firm's credibility, I want to read about Benaribi Agence's background, team, and positioning, so that I can decide whether to trust them with my investment.

#### Acceptance Criteria

1. The `/about` page shall display the firm's founding story, geographic focus (Nador West Med region), and positioning statement.
2. The `/about` page shall display a team section with at least the lead advisor's profile.
3. The `/about` page shall include a contact CTA linking to `/contact`.

---

### Requirement 6: Resources Page & Lead Magnet

**Objective:** As an investor researching Morocco, I want to download the Morocco Investment Guide 2026, so that I can study the investment landscape in depth at my own pace.

#### Acceptance Criteria

1. The `/resources` page shall display the Morocco Investment Guide 2026 lead magnet with a title, a description, and a download CTA.
2. When a visitor activates the download CTA, the Public Website shall display a form requesting the visitor's email address before delivering the file.
3. When a visitor submits a valid email address in the lead magnet form, the Public Website shall record that email in the HubSpot Free CRM and initiate the PDF download.
4. If the visitor submits an improperly formatted email address, the Public Website shall display an inline validation error without submitting the form.
5. If the HubSpot CRM API call fails, the Public Website shall still allow the PDF download to proceed and display a non-blocking notice.
6. The Public Website shall not require the visitor to create an account or complete a full contact profile to access the lead magnet.

---

### Requirement 7: Contact Page & Segmented Lead Form

**Objective:** As a prospect ready to engage, I want to submit my contact and investment profile to Benaribi, so that an advisor can respond with a tailored proposal.

#### Acceptance Criteria

1. The `/contact` page shall display a contact form with the following required fields: full name, email address, country of origin (select), service interest (select: Residential / Industrial / Company Setup / Other), and budget range in EUR (select).
2. When a visitor submits the contact form with all required fields filled and valid, the Public Website shall send the form data as a new contact record to the HubSpot Free CRM.
3. When the HubSpot submission succeeds, the Public Website shall replace the form with a confirmation message.
4. If the HubSpot API returns an error on form submission, the Public Website shall display a user-facing error message and preserve all field values so the visitor does not lose their input.
5. When a visitor attempts to submit the form with one or more required fields empty or invalid, the Public Website shall display inline validation errors for each invalid field without submitting to HubSpot.
6. The `/contact` page shall display the firm's WhatsApp number, email address, and office address as alternative contact options alongside the form.
7. The contact form shall be fully operable via keyboard navigation alone.

---

### Requirement 8: Multilingual Support (EN / FR / ES)

**Objective:** As a French- or Spanish-speaking investor, I want to read the entire site in my language, so that I can evaluate Benaribi's offering without a language barrier.

#### Acceptance Criteria

1. The Public Website shall support three languages: English (EN, base), French (FR), and Spanish (ES).
2. The Public Website shall display a language switcher in the navigation bar and in the mobile menu, enabling visitors to switch between EN, FR, and ES at any time.
3. When a visitor selects a language, the Public Website shall immediately re-render all visible text — headings, body copy, labels, error messages, and button text — in the selected language without a full page reload.
4. When a visitor first arrives on the site, the Public Website shall use the browser's preferred language to pre-select EN, FR, or ES; if the browser language is not one of the three, the Public Website shall default to EN.
5. The Public Website shall include `hreflang` link tags in the `<head>` for each page and each supported language pointing to the correct URL for that language–page combination.
6. If a translation string is missing for a given language, the Public Website shall display the English fallback string rather than a blank value or a translation key.
7. The Public Website shall serve the active-language value in all page metadata: `<title>`, `<meta name="description">`, Open Graph tags, and Twitter Card tags.

---

### Requirement 9: SEO & Discoverability

**Objective:** As the Benaribi team, I want the site discoverable by international search engines for Morocco investment terms, so that we generate organic inbound leads independent of referrals.

#### Acceptance Criteria

1. The Public Website shall set a unique `<title>` and `<meta name="description">` for each page in each supported language.
2. The Public Website shall include Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter Card meta tags on every page.
3. The Public Website shall serve a `sitemap.xml` listing all pages across all supported languages.
4. The Public Website shall serve a `robots.txt` permitting search-engine indexing of all public pages.
5. All images shall have descriptive `alt` text; decorative images shall use `alt=""`.
6. The Public Website shall use semantic HTML structure: heading hierarchy, `<nav>`, `<main>`, `<footer>`, `<article>` where content warrants.
7. Each language variant of a page shall carry its own `<link rel="canonical">` tag pointing to that variant's URL, preventing duplicate-content signals across language URLs.

---

### Requirement 10: Analytics & Marketing Tracking

**Objective:** As the Benaribi team, I want visitor behaviour and key conversion events tracked across analytics and ad platforms, so that we can measure site effectiveness and support future campaigns.

#### Acceptance Criteria

1. The Public Website shall load Google Analytics 4 and send a page-view event on every page navigation.
2. The Public Website shall load the Meta Pixel and fire a `PageView` event on every page navigation.
3. The Public Website shall load the LinkedIn Insight Tag on every page.
4. When a visitor successfully submits the contact form, the Public Website shall fire a `Lead` conversion event to GA4, Meta Pixel, and LinkedIn Insight Tag.
5. When a visitor successfully triggers the lead magnet PDF download, the Public Website shall fire a `LeadMagnetDownload` event to GA4.
6. When a visitor completes all required calculator inputs and views results, the Public Website shall fire a `CalculatorCompleted` event to GA4.
7. The Public Website shall not block rendering of page content while loading third-party analytics scripts.

---

### Requirement 11: Core Web Vitals & Accessibility

**Objective:** As a visitor on mobile from an international connection, I want the site to load quickly and be fully usable, so that a slow or inaccessible experience does not undermine confidence in Benaribi.

#### Acceptance Criteria

1. The Public Website shall display above-the-fold content within 2.5 seconds on a simulated 4G mobile connection (targeting LCP ≤ 2.5 s).
2. The Public Website shall display fallback text in a system font while custom fonts load, preventing any period of invisible text.
3. Below-fold images shall use deferred loading; the Hero image or video shall use eager loading.
4. All images shall declare explicit width and height dimensions to prevent layout shift during load (targeting CLS < 0.1).
5. All interactive elements (buttons, links, form fields, calculator inputs) shall have a minimum touch target of 44 × 44 px.
6. All interactive elements shall display a visible, high-contrast focus indicator when navigated via keyboard.
7. The Public Website shall meet WCAG AA contrast requirements for all text/background color combinations.
8. The Public Website shall be fully operable via keyboard-only navigation, including the navigation menu, contact form, language switcher, and ROI calculator.
