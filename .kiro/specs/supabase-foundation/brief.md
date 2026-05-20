# Brief: supabase-foundation

## Problem
The client portal and FastAPI backend require a shared data layer with secure multi-tenant access, file storage, and built-in authentication. Without a proper foundation spec, schema drift and insecure or missing RLS policies are likely as portal and backend are built in parallel by independent workstreams.

## Current State
No Supabase project exists. The complete schema is designed in the discovery briefing: clients, operations, properties, documents, leads, timeline_events tables with enums and relationships.

## Desired Outcome
A fully configured Supabase project with all tables created, RLS policies enforced for every table, Storage buckets configured, Auth providers enabled, TypeScript types exported, and development seed data ready. client-portal and fastapi-backend specs can start immediately after this spec completes.

## Approach
Supabase CLI-managed migrations. All DDL in versioned SQL migration files checked into version control. RLS policies co-located with table definitions. Storage buckets configured via migration. TypeScript types auto-generated from schema using `supabase gen types typescript` for React consumption.

## Scope
- **In**:
  - All 6 tables from briefing schema with exact columns and types:
    - clients (id, full_name, email, country_origin, language_pref, investor_type, created_at)
    - operations (id, client_id FK, service_type, status, total_amount, currency, assigned_agent, created_at)
    - properties (id, type, zone, surface_m2, price_mad, status, coordinates, media_urls, created_at)
    - documents (id, operation_id FK, doc_type, file_path, uploaded_by, is_signed, expires_at, created_at)
    - leads (id, name, email, country, service_interest, budget_range, source, status, created_at)
    - timeline_events (id, operation_id FK, event_type, description, visible_to_client, created_at)
  - All enum types defined in SQL
  - RLS policies per table: client sees only own records, agent sees assigned operations, admin sees all
  - Auth: email + password provider enabled; magic link enabled
  - Storage buckets: `documents` (private, signed URL access), `property-media` (public read)
  - TypeScript types generated and exported as `database.types.ts`
  - Development seed data: 3 sample clients, 2 operations across service types, 5 properties across zones and statuses
  - Environment config template (`.env.example`) with required Supabase variables
- **Out**: Supabase Edge Functions; Realtime subscription setup (can be added in client-portal spec if needed); Production backup configuration; Database monitoring (ops task); Email templates for Auth emails (basic Supabase defaults are sufficient for v1)

## Boundary Candidates
- Schema DDL and versioned migrations
- Enum type definitions
- RLS policy set per table (three-role: client, agent, admin)
- Storage bucket configuration
- Auth provider configuration
- TypeScript type generation and export

## Out of Boundary
- Supabase JS client SDK usage in application code (client-portal)
- supabase-py usage (fastapi-backend)
- Email notification templates for operations (fastapi-backend)
- Admin dashboard UI

## Upstream / Downstream
- **Upstream**: Discovery briefing (schema defined there)
- **Downstream**: client-portal (consumes Auth + all tables via Supabase JS v2 client), fastapi-backend (consumes schema via supabase-py or direct PostgREST with service-role key)

## Existing Spec Touchpoints
- **Extends**: none
- **Adjacent**: client-portal, fastapi-backend — both depend on this spec completing first

## Constraints
- Supabase free tier for development; Supabase Pro required for production (custom domain on portal.benaribi.ma)
- All migrations must be idempotent (IF NOT EXISTS patterns)
- RLS must be ON for every table — no table is created without a policy
- Service-role key must NEVER appear in client-side code — only used server-side in fastapi-backend
- Supabase CLI v1.x (match version to project node tooling)
