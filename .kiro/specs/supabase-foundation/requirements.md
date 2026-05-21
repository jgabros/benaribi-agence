# Requirements — supabase-foundation

## Introduction

The supabase-foundation establishes the shared data layer for the entire Benaribi Agence platform. It provides the schema, access-control policies, authentication configuration, file storage, and TypeScript type contract that both the client-portal (React frontend) and fastapi-backend (server-side API) depend on. The foundation must enforce strict role-based data isolation between clients, agents, and administrators, and must be fully reproducible from version-controlled migrations. All downstream development is blocked until this foundation is complete and verified.

## Boundary Context

- **In scope**: All 6 data tables with their columns, types, and relationships; enumerated type definitions; row-level security policies for client/agent/admin roles; email+password and magic-link authentication; two storage buckets (private documents, public property media); TypeScript type file export; development seed data; environment configuration template; idempotent migration set.
- **Out of scope**: Supabase Edge Functions; realtime subscription setup (delegated to client-portal spec if needed); production backup configuration; database monitoring; custom email templates for auth emails (Supabase defaults sufficient for v1); admin dashboard UI; Supabase client SDK integration code (belongs in client-portal); supabase-py integration code (belongs in fastapi-backend).
- **Adjacent expectations**: client-portal consumes authentication sessions, all six tables, and the TypeScript type file via the Supabase JS v2 client. fastapi-backend accesses all tables using a service-role key through the REST API. Neither downstream spec owns the schema or migration files — changes flow from this spec only.

---

## Requirements

### Requirement 1: Core Data Schema

**Objective:** As a developer building the client-portal or fastapi-backend, I want all required data entities defined in the shared data layer, so that both applications have a consistent, typed foundation to build against.

#### Acceptance Criteria

1. The Supabase Data Layer shall store **client** records containing: unique identifier, full name, email address, country of origin, language preference, investor type, and record creation timestamp.
2. The Supabase Data Layer shall store **operation** records containing: unique identifier, reference to a client record, service type, status, total amount, currency, assigned agent reference, and record creation timestamp.
3. The Supabase Data Layer shall store **property** records containing: unique identifier, property type, zone, surface area in m², price in MAD, availability status, geographic coordinates, media file references, and record creation timestamp.
4. The Supabase Data Layer shall store **document** records containing: unique identifier, reference to an operation record, document type, storage file path, uploader reference, signed status flag, optional expiry date, and record creation timestamp.
5. The Supabase Data Layer shall store **lead** records containing: unique identifier, contact name, email address, country, service interest, budget range, acquisition source, status, and record creation timestamp.
6. The Supabase Data Layer shall store **timeline_event** records containing: unique identifier, reference to an operation record, event type, description, client-visibility flag, and record creation timestamp.
7. The Supabase Data Layer shall enforce referential integrity: every document record must reference an existing operation, and every timeline_event record must reference an existing operation.
8. All enumerated field values (service types, operation statuses, property types, investor types, lead statuses, and any other constrained lists) shall be restricted to defined valid values; any attempt to store a value outside the defined set shall be rejected.

---

### Requirement 2: Role-Based Data Access

**Objective:** As the system operator, I want data access strictly controlled by user role, so that clients cannot read each other's data, agents only see their assigned work, and admins have full oversight.

#### Acceptance Criteria

1. While an authenticated user holds the **client** role, the Supabase Data Layer shall permit that user to read only records directly associated with their own account identity.
2. While an authenticated user holds the **client** role, the Supabase Data Layer shall reject any read or write attempt targeting records belonging to a different client.
3. While an authenticated user holds the **agent** role, the Supabase Data Layer shall permit that user to read and update operations where they are the assigned agent.
4. While an authenticated user holds the **agent** role, the Supabase Data Layer shall permit read access to the client records, documents, and timeline events linked to their assigned operations.
5. While an authenticated user holds the **admin** role, the Supabase Data Layer shall permit full read and write access to all records across all tables.
6. When an unauthenticated request attempts to access any table containing client, operation, document, or timeline data, the Supabase Data Layer shall deny the request.
7. When a server-side service authenticates using the service-role credential, the Supabase Data Layer shall permit unrestricted access to all tables, bypassing row-level security restrictions.

---

### Requirement 3: Authentication

**Objective:** As a user of the platform, I want to authenticate using my email address with a password or a magic link, so that I can access my account securely without requiring a third-party social login.

#### Acceptance Criteria

1. The Supabase Data Layer shall support user sign-in via email address and password.
2. The Supabase Data Layer shall support user sign-in via a one-time magic link sent to the user's email address.
3. When a user presents valid email and password credentials, the Supabase Data Layer shall issue an authenticated session.
4. When a user activates a valid magic link, the Supabase Data Layer shall issue an authenticated session.
5. If a user presents incorrect credentials, the Supabase Data Layer shall reject the sign-in attempt without disclosing whether the submitted email address exists in the system.
6. The Supabase Data Layer shall expire authenticated sessions after a defined period of inactivity, requiring the user to re-authenticate.

---

### Requirement 4: Private Document Storage

**Objective:** As an authorized user with access to an operation, I want to upload and retrieve sensitive operation documents securely, so that legal and financial files are accessible only to the parties with permission to view that operation.

#### Acceptance Criteria

1. The Supabase Data Layer shall provide a storage area for operation documents that restricts read access to authenticated users who have permission to view the associated operation.
2. When an authorized user requests access to a stored document file, the Supabase Data Layer shall provide a time-limited access URL granting temporary read access to that specific file.
3. If an unauthenticated request attempts to retrieve a document file directly, the Supabase Data Layer shall deny access and return no file content.
4. If a request uses an expired or invalid access URL to retrieve a document file, the Supabase Data Layer shall deny access.

---

### Requirement 5: Public Property Media Storage

**Objective:** As a visitor or authenticated user browsing available properties, I want to view property photos and media without needing to log in, so that the property browsing experience is frictionless.

#### Acceptance Criteria

1. The Supabase Data Layer shall provide a storage area for property media files that permits read access without authentication.
2. When any request — authenticated or not — fetches a property media file via its public URL, the Supabase Data Layer shall serve that file.
3. Write access to the property media storage area shall be restricted to authenticated users holding the agent or admin role.

---

### Requirement 6: TypeScript Type Contract

**Objective:** As a client-portal developer, I want auto-generated TypeScript definitions for the database schema, so that application queries are type-safe and schema changes surface immediately as compile-time errors.

#### Acceptance Criteria

1. The Supabase Data Layer shall provide a TypeScript type file (`database.types.ts`) defining types for every table, column, enumerated value, and relationship in the schema.
2. The type file shall be regenerable from the live schema state without manual editing.
3. When the schema is updated (table or column added, modified, or removed), the regenerated type file shall reflect those changes accurately.
4. The exported type file shall be the single source of truth for schema types consumed by the client-portal; no manually authored schema type files shall be required.

---

### Requirement 7: Development Seed Data

**Objective:** As a developer building the client-portal or fastapi-backend, I want representative sample data in the development environment, so that I can build and test features without manually creating records.

#### Acceptance Criteria

1. The development environment shall include at least **3 client records** spanning different countries of origin and investor types.
2. The development environment shall include at least **2 operation records** covering at least 2 different service types and at least 2 different operation statuses.
3. The development environment shall include at least **5 property records** spanning at least 2 different zones and at least 2 different availability statuses.
4. The development environment shall include at least **1 document record** associated with a seeded operation.
5. The development environment shall include at least **1 timeline event record** associated with a seeded operation.
6. The development environment shall include at least **2 lead records** with different acquisition sources and statuses.

---

### Requirement 8: Environment Configuration Template

**Objective:** As a developer onboarding to the project, I want a clear configuration template, so that I can connect any application to the Supabase project without guessing required variable names.

#### Acceptance Criteria

1. The Supabase Data Layer shall provide an environment configuration template listing all variables required to connect to the project: project URL, public anonymous key, service-role key, and storage bucket identifiers.
2. The template shall clearly identify which variables are safe for client-side use and which must be restricted to server-side environments only.
3. The template file shall contain no actual secret values; all sensitive entries shall contain only placeholder text.

---

### Requirement 9: Schema Reliability & Migration Integrity

**Objective:** As a developer or operator deploying to a new environment, I want migrations to be safe to apply from scratch and in sequence, so that the schema can be reproduced exactly from version control without manual intervention.

#### Acceptance Criteria

1. The Supabase Data Layer shall be fully reconstructible in a fresh environment by applying its migration set in order, producing an identical schema and policy configuration.
2. Each migration shall be idempotent: applying a migration to an environment where it has already been applied shall produce no errors and no unintended schema changes.
3. Row-level security shall be enabled on every table at the time of its creation; no table shall exist without at least one access policy defined.
4. The Supabase Data Layer shall not grant the public anonymous role read or write access to any table containing client, operation, document, or timeline data.
