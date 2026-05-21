-- 20260521000000_create_core_schema.sql

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom ENUM types
CREATE TYPE public.user_role AS ENUM ('client', 'agent', 'admin');
CREATE TYPE public.investor_type AS ENUM ('individual', 'corporate', 'institutional');
CREATE TYPE public.service_type AS ENUM ('buy', 'sell', 'advisory', 'property_management');
CREATE TYPE public.operation_status AS ENUM ('discovery', 'negotiation', 'contract', 'closed', 'cancelled');
CREATE TYPE public.property_type AS ENUM ('villa', 'apartment', 'commercial', 'land');
CREATE TYPE public.property_status AS ENUM ('available', 'reserved', 'sold');
CREATE TYPE public.document_type AS ENUM ('contract', 'invoice', 'id_proof', 'report', 'other');
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'disqualified');
CREATE TYPE public.event_type AS ENUM ('status_change', 'document_uploaded', 'meeting_scheduled', 'note_added');

-- Tables

-- 1. user_roles
CREATE TABLE public.user_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.user_role NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. clients
CREATE TABLE public.clients (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    country TEXT NOT NULL,
    language_preference TEXT NOT NULL DEFAULT 'en',
    investor_type public.investor_type NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. operations
CREATE TABLE public.operations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE RESTRICT,
    service_type public.service_type NOT NULL,
    status public.operation_status NOT NULL DEFAULT 'discovery',
    total_amount NUMERIC NULL,
    currency TEXT NOT NULL DEFAULT 'MAD',
    assigned_agent_id UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. properties
CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_type public.property_type NOT NULL,
    zone TEXT NOT NULL,
    surface_area NUMERIC NOT NULL,
    price NUMERIC NOT NULL,
    status public.property_status NOT NULL DEFAULT 'available',
    lat NUMERIC NULL,
    lng NUMERIC NULL,
    media_urls TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. documents
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    operation_id UUID NOT NULL REFERENCES public.operations(id) ON DELETE CASCADE,
    type public.document_type NOT NULL,
    file_path TEXT NOT NULL,
    uploader_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    is_signed BOOLEAN NOT NULL DEFAULT false,
    expiry_date TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. leads
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    service_interest TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    acquisition_source TEXT NULL,
    status public.lead_status NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. timeline_events
CREATE TABLE public.timeline_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    operation_id UUID NOT NULL REFERENCES public.operations(id) ON DELETE CASCADE,
    event_type public.event_type NOT NULL,
    description TEXT NOT NULL,
    is_client_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
