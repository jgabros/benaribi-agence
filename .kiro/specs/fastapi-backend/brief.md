# Brief: fastapi-backend

## Problem
The client portal needs branded PDF reports of operations, automated email notifications on status changes, and a more sophisticated fiscal ROI calculator that can be updated without redeploying the React frontend. These capabilities require server-side Python logic that cannot live in a static SPA.

## Current State
No backend service exists. The public website's fiscal calculator v1 is a pure JS feature (within public-website spec). PDF generation and automated notifications require server-side processing.

## Desired Outcome
A deployed Python FastAPI service that the client portal calls to: (1) generate branded PDF reports of individual operations, (2) send email notifications triggered by operation status changes and document events, (3) expose a v2 fiscal ROI calculator endpoint with more complete Moroccan tax law logic than the client-side v1.

## Approach
Python FastAPI + Uvicorn, containerized with Docker. PDF generation via WeasyPrint (HTML-to-PDF) using self-hosted font files (Cormorant Garamond + DM Sans WOFF2 — required because WeasyPrint does not support the font-display:swap directive injected by Google Fonts CDN). Email via SendGrid API or SMTP relay. Supabase service-role client (supabase-py) for database reads during report generation. API key authentication for all endpoints.

## Scope
- **In**:
  - `POST /reports/operation/{id}` — reads operation + client + timeline_events from Supabase, renders branded HTML template, returns PDF stream; requires valid API key in header
  - `POST /notifications/send` — sends email notification to client or agent; triggered by Supabase webhook or direct portal call on status change / document upload event
  - `GET /calculator/roi` — advanced fiscal ROI calculator v2: inputs (capital, sector, investor type, zone) → outputs (tax exemption schedule over 20-year period per Charte de l'Investissement 2022, SARL vs SA cost comparison, estimated net return); logic documented and auditable
  - Supabase webhook receiver: `POST /webhooks/supabase` — handles operation status change events to auto-trigger notifications
  - CORS configured for portal.benaribi.ma (and localhost for dev)
  - API key authentication (static key in environment variable) for all endpoints
  - Docker configuration (Dockerfile + docker-compose.yml)
  - Environment config template (`.env.example`)
  - Self-hosted Cormorant Garamond + DM Sans WOFF2 font files bundled in the container for PDF rendering
- **Out**: Authentication/user management (Supabase handles this); Direct database writes from FastAPI (reads only — mutations go through Supabase client from portal); PDF design assets beyond brand colors/fonts; Public website integration (FastAPI is portal-only in v1); Full email template HTML design system (plain-text or minimal HTML for v1 notifications)

## Boundary Candidates
- PDF generation engine + branded Jinja2/HTML template
- Email notification service integration (SendGrid or SMTP)
- Fiscal ROI calculator logic (Moroccan tax law: Charte de l'Investissement 2022, zone franche 20-year exemption schedule)
- Supabase webhook processing and event routing
- API authentication layer (API key middleware)

## Out of Boundary
- React UI for PDF download (client-portal owns the download button and fetch call)
- Database schema and migrations (supabase-foundation)
- Email HTML design system (keep notifications minimal in v1)

## Upstream / Downstream
- **Upstream**: supabase-foundation (schema, service-role key for report data reads)
- **Downstream**: client-portal (calls /reports/operation/{id} and /calculator/roi); SendGrid/SMTP provider (sends emails to clients and agents)

## Existing Spec Touchpoints
- **Extends**: none
- **Adjacent**: client-portal (primary consumer), supabase-foundation (data source)

## Constraints
- Python 3.11+, FastAPI, Uvicorn
- Docker containerization required for deployment portability
- WeasyPrint requires self-hosted font files — Cormorant Garamond + DM Sans WOFF2 must be bundled in container (Google Fonts CDN URLs cause silent font fallback in PDF output — known WeasyPrint issue)
- Service-role key used server-side only — never exposed to client
- Moroccan fiscal calculator logic must be documented inline referencing Charte de l'Investissement 2022 articles — logic must be auditable by a non-developer (the client)
- SendGrid free tier: 100 emails/day — sufficient for v1 notification volumes at luxury real estate scale
