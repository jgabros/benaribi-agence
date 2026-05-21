# Implementation Tasks — supabase-foundation

This document outlines the step-by-step tasks required to implement the `supabase-foundation` database design. These tasks can be executed manually or autonomously during the Implementation Phase.

## Phase 1: Project Initialization

- `[ ]` **Task 1.1**: Initialize Supabase project
  - Ensure the `supabase/` directory and `supabase/config.toml` exist. If not, run `npx supabase init`.
- `[ ]` **Task 1.2**: Generate Environment Template
  - Create a `.env.example` at the root of the project detailing Supabase URL, Anon Key, and Service Role Key (with empty placeholders).

## Phase 2: Database Schema (SQL Migrations)

- `[ ]` **Task 2.1**: Create core schema migration (`*_create_core_schema.sql`)
  - Define custom PostgreSQL ENUMs (`investor_type`, `service_type`, `operation_status`, `property_type`, `property_status`, `document_type`, `lead_status`, `event_type`, `user_role`).
  - Create `user_roles` table (foreign key to `auth.users`).
  - Create `clients` table.
  - Create `operations` table.
  - Create `properties` table.
  - Create `documents` table.
  - Create `leads` table.
  - Create `timeline_events` table.
- `[ ]` **Task 2.2**: Create RLS migration (`*_enable_rls.sql`)
  - Enable `ENABLE ROW LEVEL SECURITY` on all 7 tables.
  - Create helper functions (`is_admin()`, `is_agent()`).
  - Add standard `SELECT/INSERT/UPDATE/DELETE` policies matching the exact boundaries specified in `design.md`.
- `[ ]` **Task 2.3**: Create storage migration (`*_setup_storage.sql`)
  - Create `private_documents` bucket (`public: false`).
  - Create `public_property_media` bucket (`public: true`).
  - Attach RLS policies to `storage.objects` for both buckets ensuring correct role-based access.

## Phase 3: Development Data

- `[ ]` **Task 3.1**: Create Seed Data (`supabase/seed.sql`)
  - Generate mock `auth.users` records (1 admin, 1 agent, 3 clients).
  - Insert corresponding `user_roles`.
  - Insert 3 mock `clients`.
  - Insert 2 mock `operations`.
  - Insert 5 mock `properties`.
  - Insert 1 mock `document` and 1 `timeline_event`.
  - Insert 2 mock `leads`.

## Phase 4: TypeScript Code Generation

- `[ ]` **Task 4.1**: Generate Types
  - Add a script in the root `package.json`: `"db:types": "supabase gen types typescript --local > packages/ui/src/types/database.types.ts"` (or similar shared package).
  - Alternatively, execute `npx supabase gen types typescript --local > database.types.ts` manually and place it in a sensible directory (`packages/ui/src/lib/database.types.ts`).
