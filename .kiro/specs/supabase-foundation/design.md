# Design — supabase-foundation

## Architecture Overview

The `supabase-foundation` establishes the relational schema, access policies (RLS), and object storage configuration. It acts as the ultimate source of truth for the platform's data.

## 1. Custom Types (Enums)

To ensure data integrity, we will use PostgreSQL ENUM types.

- `user_role`: `'client'`, `'agent'`, `'admin'`
- `investor_type`: `'individual'`, `'corporate'`, `'institutional'`
- `service_type`: `'buy'`, `'sell'`, `'advisory'`, `'property_management'`
- `operation_status`: `'discovery'`, `'negotiation'`, `'contract'`, `'closed'`, `'cancelled'`
- `property_type`: `'villa'`, `'apartment'`, `'commercial'`, `'land'`
- `property_status`: `'available'`, `'reserved'`, `'sold'`
- `document_type`: `'contract'`, `'invoice'`, `'id_proof'`, `'report'`, `'other'`
- `lead_status`: `'new'`, `'contacted'`, `'qualified'`, `'disqualified'`
- `event_type`: `'status_change'`, `'document_uploaded'`, `'meeting_scheduled'`, `'note_added'`

## 2. Table Schemas

### 2.1 `user_roles`
Provides application-level role querying to complement `auth.users` metadata.
- `user_id` (uuid, pk, fk -> auth.users.id, cascade)
- `role` (user_role, not null)
- `created_at` (timestamptz, default now())

### 2.2 `clients`
- `id` (uuid, pk, fk -> auth.users.id, cascade)
- `full_name` (text, not null)
- `email` (text, not null, unique)
- `country` (text, not null)
- `language_preference` (text, not null, default 'en')
- `investor_type` (investor_type, not null)
- `created_at` (timestamptz, default now())

### 2.3 `operations`
- `id` (uuid, pk, default uuid_generate_v4())
- `client_id` (uuid, not null, fk -> clients.id)
- `service_type` (service_type, not null)
- `status` (operation_status, not null, default 'discovery')
- `total_amount` (numeric, null)
- `currency` (text, not null, default 'MAD')
- `assigned_agent_id` (uuid, null, fk -> auth.users.id)
- `created_at` (timestamptz, default now())

### 2.4 `properties`
- `id` (uuid, pk, default uuid_generate_v4())
- `property_type` (property_type, not null)
- `zone` (text, not null)
- `surface_area` (numeric, not null) /* in m2 */
- `price` (numeric, not null) /* in MAD */
- `status` (property_status, not null, default 'available')
- `lat` (numeric, null) /* simpler than PostGIS for v1 */
- `lng` (numeric, null)
- `media_urls` (text[], default '{}')
- `created_at` (timestamptz, default now())

### 2.5 `documents`
- `id` (uuid, pk, default uuid_generate_v4())
- `operation_id` (uuid, not null, fk -> operations.id, cascade)
- `type` (document_type, not null)
- `file_path` (text, not null)
- `uploader_id` (uuid, not null, fk -> auth.users.id)
- `is_signed` (boolean, default false)
- `expiry_date` (timestamptz, null)
- `created_at` (timestamptz, default now())

### 2.6 `leads`
- `id` (uuid, pk, default uuid_generate_v4())
- `contact_name` (text, not null)
- `email` (text, not null)
- `country` (text, not null)
- `service_interest` (text, not null)
- `budget_range` (text, not null)
- `acquisition_source` (text, null)
- `status` (lead_status, not null, default 'new')
- `created_at` (timestamptz, default now())

### 2.7 `timeline_events`
- `id` (uuid, pk, default uuid_generate_v4())
- `operation_id` (uuid, not null, fk -> operations.id, cascade)
- `event_type` (event_type, not null)
- `description` (text, not null)
- `is_client_visible` (boolean, default true)
- `created_at` (timestamptz, default now())

## 3. Row-Level Security (RLS)

All tables must have RLS enabled.

**Helper Functions:**
- `is_admin()`: checks if `auth.uid()` has `'admin'` role in `user_roles` (or JWT metadata).
- `is_agent()`: checks if `auth.uid()` has `'agent'` role in `user_roles`.

**Clients Table:**
- `SELECT`: `auth.uid() = id` OR `is_agent()` OR `is_admin()`.
- `INSERT/UPDATE`: `auth.uid() = id` (for self-update) OR `is_admin()`.

**Operations Table:**
- `SELECT`: `client_id = auth.uid()` OR `assigned_agent_id = auth.uid()` OR `is_admin()`.
- `UPDATE`: `assigned_agent_id = auth.uid()` OR `is_admin()`.
- `INSERT/DELETE`: `is_admin()`.

**Properties Table:**
- `SELECT`: `true` (Publicly readable).
- `INSERT/UPDATE/DELETE`: `is_agent()` OR `is_admin()`.

**Documents Table:**
- `SELECT`: 
  - If Client: `EXISTS (SELECT 1 FROM operations WHERE id = operation_id AND client_id = auth.uid())`
  - If Agent: `EXISTS (SELECT 1 FROM operations WHERE id = operation_id AND assigned_agent_id = auth.uid())`
  - If Admin: `true`
- `INSERT/UPDATE/DELETE`: `is_agent()` OR `is_admin()`.

**Timeline Events Table:**
- `SELECT`:
  - If Client: `is_client_visible = true AND EXISTS (SELECT 1 FROM operations WHERE id = operation_id AND client_id = auth.uid())`
  - If Agent: `EXISTS (SELECT 1 FROM operations WHERE id = operation_id AND assigned_agent_id = auth.uid())`
  - If Admin: `true`
- `INSERT/UPDATE/DELETE`: `is_agent()` OR `is_admin()`.

**Leads Table:**
- `SELECT/INSERT/UPDATE`: `is_admin()` (and maybe webhook service-role).

## 4. Storage Configuration

### `private_documents` Bucket
- `public: false`
- `SELECT` policy: User must have read access to the corresponding `documents` record holding the `file_path`. Alternatively, agents/admins can generate signed URLs.
- `INSERT` policy: Agents & Admins only.

### `public_property_media` Bucket
- `public: true`
- `SELECT` policy: `true` (public).
- `INSERT/UPDATE/DELETE` policy: Agents & Admins only.
