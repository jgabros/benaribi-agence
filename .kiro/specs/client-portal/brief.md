# Brief: client-portal

## Problem
Benaribi clients in a 6–18 month investment process have no digital touchpoint to track their operation status, access documents, or communicate with their assigned agent. This gap creates friction, increases manual agent workload (status update calls and emails), and prevents Benaribi from delivering a premium post-sale experience that differentiates it from competitors.

## Current State
No portal exists. All client communication is manual (WhatsApp, email). Documents are sent as email attachments. Operation status is communicated verbally. Agents have no unified view of their assigned operations.

## Desired Outcome
A private React portal at portal.benaribi.ma where authenticated clients see their operation's live timeline, download/upload documents, browse available properties, and contact their assigned agent directly. Agents manage all their assigned operations. Admins have full system access. The experience must feel as premium as the public website — same design system, same institutional tone.

## Approach
React 18 + Tailwind SPA consuming Supabase JS v2 client directly (PostgREST + RLS handles data security — no intermediary API needed for reads/writes). FastAPI backend called only for PDF report generation and email notification triggers. Deployed as a separate subdomain (portal.benaribi.ma) from the public website.

## Scope
- **In**:
  - Authentication: email + password login + magic link via Supabase Auth; protected route guards
  - Three-role system enforced via RLS + app-level routing: Client, Agent, Admin
  - Client view:
    - Operation dashboard: current status badge + visual timeline of timeline_events
    - Document list: download available files, upload new documents to Supabase Storage
    - Assigned agent contact card (name, WhatsApp link, mailto)
    - Property browsing: filterable listing (type, zone, price range, status)
  - Agent view:
    - All assigned operations list with status and client name
    - Operation detail: same timeline view as client + agent-only notes
    - Status update control (advances operation through status enum)
    - Document management per operation
  - Admin view:
    - All operations, all clients, all properties (full read/write)
    - Lead list from leads table
  - PDF report download: button that calls FastAPI POST /reports/operation/{id} and streams PDF
  - Email notification display: in-app badge for unread notifications (triggered by FastAPI webhooks)
  - Design system components shared from design-system spec (same Tailwind config, same base components)
  - Language: English only in v1 (portal audience is agents + international clients, EN is sufficient)
- **Out**: FastAPI PDF generation logic (portal only calls the endpoint — fastapi-backend owns generation); Advanced fiscal calculator v2 UI (Phase 2 after fastapi-backend ships the endpoint); AR/ZH interface languages; Mobile native app; Real-time collaboration or live cursor features

## Boundary Candidates
- Authentication flows and session management
- Role-based routing and view separation (Client / Agent / Admin)
- Operation dashboard and timeline visualization
- Document management (upload/download via Supabase Storage signed URLs)
- Properties listing with filters
- Agent assignment display and contact integration
- PDF download trigger (API call to fastapi-backend)
- Notification badge display

## Out of Boundary
- PDF generation logic (fastapi-backend)
- Schema and RLS definitions (supabase-foundation)
- Design tokens and base components (design-system)
- Public marketing pages (public-website)

## Upstream / Downstream
- **Upstream**: design-system (components + fonts), supabase-foundation (schema, Auth, Storage), fastapi-backend (PDF endpoint at /reports/operation/{id})
- **Downstream**: none (terminal consumer layer)

## Existing Spec Touchpoints
- **Extends**: none
- **Adjacent**: public-website (CTAs on public site link to portal login page), fastapi-backend (portal calls its /reports endpoint for PDF download)

## Constraints
- React 18 + Tailwind v3 (same stack as public website for shared design-system import)
- Supabase JS v2 client
- No sensitive data in localStorage — session managed entirely by Supabase Auth (httpOnly cookies or in-memory tokens)
- Service-role key must NEVER be used client-side — only anon key + RLS
- portal.benaribi.ma subdomain requires Supabase Pro custom domain OR a reverse proxy that forwards auth cookies correctly
- fastapi-backend must be deployed before PDF download feature is testable — implement with graceful degradation (disabled button if API unavailable)
