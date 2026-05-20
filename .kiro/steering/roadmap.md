# Roadmap

## Overview
Benaribi Agence is a luxury real estate and business investment advisory firm based in Nador, Morocco, targeting international high-net-worth investors from Europe and Asia. The digital platform comprises three layers: a public marketing website (lead capture, credibility), a private client portal (operation tracking, document management), and a Python FastAPI backend engine (PDF generation, fiscal calculations, webhooks).

The platform must position Benaribi at the same institutional level as JLL, Knight Frank, and Savills — never folkloric, always premium. Primary audience arrives via LinkedIn, direct search, and referrals, not mass social media.

## Approach Decision
- **Chosen**: Parallel foundation tracks
- **Why**: The public website (marketing layer) and the data/backend layer (Supabase + FastAPI) are architecturally independent. Running them in parallel reduces overall delivery time and allows backend contracts to be defined and validated before the portal UI consumes them.
- **Rejected alternatives**:
  - Sequential phases: slower, gates portal delivery behind a finished public website
  - MVP vertical slice: risks rework on design system when full scope is built

## Scope
- **In**: Design system, public marketing website (EN/FR/ES), ROI fiscal calculator v1, lead capture + CRM integration, Supabase database + auth + storage, React client portal, Python FastAPI backend
- **Out**: Phase 00 operational tasks (domain registration, LinkedIn page, Google Business Profile), Phase 02 media production (photography, video), Phase 05 marketing campaigns and LinkedIn Ads, Arabic (AR) language support (Phase 2), Chinese (ZH) language support (Phase 3)

## Constraints
- Mobile first — Instagram/TikTok traffic arrives from mobile
- Core Web Vitals must pass — performance is non-negotiable for international SEO
- WCAG AA accessibility minimum
- No unnecessary dependencies — every library must be justified
- Visual positioning: must compare favorably with JLL/Knight Frank/Savills, never folkloric
- Primary languages: EN (base), FR, ES — AR deferred to Phase 2
- Morocco market: benaribi.ma domain authority, Charte de l'Investissement 2022 compliance context
- WeasyPrint requires self-hosted fonts (Cormorant Garamond, DM Sans) — Google Fonts CDN URLs cause fallback to system fonts in generated PDFs

## Boundary Strategy
- **Why this split**: The public website and backend/data layers are independently deployable and independently valuable. The design system is a shared foundation consumed by both website and portal. FastAPI has no public website dependency.
- **Shared seams to watch**: design-system components consumed by both public-website and client-portal; Supabase API contracts between supabase-foundation and client-portal + fastapi-backend; lead form data flowing from public-website to HubSpot CRM (external) and eventually to Supabase leads table.

## Specs (dependency order)

### Track 1 — Frontend
- [ ] design-system — Brand tokens, typography scale, base component library (React + Tailwind). Dependencies: none
- [ ] public-website — Full public marketing site: all pages, multilingue EN/FR/ES, ROI calculator, lead forms, analytics. Dependencies: design-system

### Track 2 — Backend/Data
- [ ] supabase-foundation — PostgreSQL schema, RLS policies, Auth setup, Storage buckets, seed data. Dependencies: none
- [ ] fastapi-backend — PDF report generation, fiscal ROI calculator v2, webhooks, email notifications API. Dependencies: supabase-foundation

### Converging Layer
- [ ] client-portal — React 18 client portal: authentication, operation dashboard, document management, properties listing, timeline. Dependencies: design-system, supabase-foundation
