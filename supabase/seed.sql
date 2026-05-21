-- supabase/seed.sql
-- Seed Data for Local Development

-- 1. Create mock users in auth.users
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'admin@benaribi.ma', 'password', now(), '{"role": "admin"}', '{}', now(), now(), 'authenticated', '', '', '', ''),
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'agent1@benaribi.ma', 'password', now(), '{"role": "agent"}', '{}', now(), now(), 'authenticated', '', '', '', ''),
('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'client1@gmail.com', 'password', now(), '{"role": "client"}', '{}', now(), now(), 'authenticated', '', '', '', ''),
('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'client2@yahoo.fr', 'password', now(), '{"role": "client"}', '{}', now(), now(), 'authenticated', '', '', '', ''),
('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'client3@corp.com', 'password', now(), '{"role": "client"}', '{}', now(), now(), 'authenticated', '', '', '', '');

-- 2. Insert user_roles
INSERT INTO public.user_roles (user_id, role) VALUES
('00000000-0000-0000-0000-000000000001', 'admin'),
('00000000-0000-0000-0000-000000000002', 'agent'),
('00000000-0000-0000-0000-000000000003', 'client'),
('00000000-0000-0000-0000-000000000004', 'client'),
('00000000-0000-0000-0000-000000000005', 'client');

-- 3. Insert clients
INSERT INTO public.clients (id, full_name, email, country, language_preference, investor_type) VALUES
('00000000-0000-0000-0000-000000000003', 'Jean Dupont', 'client1@gmail.com', 'France', 'fr', 'individual'),
('00000000-0000-0000-0000-000000000004', 'Maria Garcia', 'client2@yahoo.fr', 'Spain', 'es', 'individual'),
('00000000-0000-0000-0000-000000000005', 'Global Investments LLC', 'client3@corp.com', 'UK', 'en', 'corporate');

-- 4. Insert properties
INSERT INTO public.properties (id, property_type, zone, surface_area, price, status, lat, lng, media_urls) VALUES
('10000000-0000-0000-0000-000000000001', 'villa', 'Marrakech Palmeraie', 1200, 15000000, 'available', 31.63, -8.0, ARRAY['https://example.com/img1.jpg']),
('10000000-0000-0000-0000-000000000002', 'apartment', 'Tanger City Center', 150, 2500000, 'available', 35.75, -5.8, ARRAY['https://example.com/img2.jpg']),
('10000000-0000-0000-0000-000000000003', 'commercial', 'Casablanca Maarif', 300, 8000000, 'reserved', 33.58, -7.6, ARRAY['https://example.com/img3.jpg']),
('10000000-0000-0000-0000-000000000004', 'land', 'Nador', 5000, 4000000, 'available', 35.17, -2.9, ARRAY['https://example.com/img4.jpg']),
('10000000-0000-0000-0000-000000000005', 'villa', 'Rabat Souissi', 800, 12000000, 'sold', 33.97, -6.8, ARRAY['https://example.com/img5.jpg']);

-- 5. Insert operations
INSERT INTO public.operations (id, client_id, service_type, status, total_amount, currency, assigned_agent_id) VALUES
('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'buy', 'negotiation', 14500000, 'MAD', '00000000-0000-0000-0000-000000000002'),
('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005', 'advisory', 'discovery', NULL, 'MAD', '00000000-0000-0000-0000-000000000002');

-- 6. Insert documents
INSERT INTO public.documents (id, operation_id, type, file_path, uploader_id, is_signed) VALUES
('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'contract', 'contracts/draft_v1.pdf', '00000000-0000-0000-0000-000000000002', false);

-- 7. Insert timeline_events
INSERT INTO public.timeline_events (id, operation_id, event_type, description, is_client_visible) VALUES
('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'status_change', 'Moved to negotiation phase with seller.', true);

-- 8. Insert leads
INSERT INTO public.leads (id, contact_name, email, country, service_interest, budget_range, acquisition_source, status) VALUES
('50000000-0000-0000-0000-000000000001', 'Anna Schmidt', 'anna.s@example.de', 'Germany', 'buy villa', '500k-1M EUR', 'LinkedIn', 'new'),
('50000000-0000-0000-0000-000000000002', 'Li Wei', 'li.w@example.cn', 'China', 'commercial', '2M-5M EUR', 'Referral', 'contacted');
