-- Insert buckets if they don't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('private_documents', 'private_documents', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('public_property_media', 'public_property_media', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for private_documents
CREATE POLICY "Users can access their operation documents"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'private_documents' AND (
        public.is_admin() OR
        EXISTS (
            SELECT 1 FROM public.documents d
            JOIN public.operations o ON o.id = d.operation_id
            WHERE d.file_path = name AND (
                o.client_id = auth.uid() OR o.assigned_agent_id = auth.uid()
            )
        )
    )
);

CREATE POLICY "Agents and Admins can manage documents"
ON storage.objects FOR ALL
USING (
    bucket_id = 'private_documents' AND (public.is_agent() OR public.is_admin())
);

-- Policies for public_property_media
CREATE POLICY "Public read access to property media"
ON storage.objects FOR SELECT
USING (bucket_id = 'public_property_media');

CREATE POLICY "Agents and Admins can manage property media"
ON storage.objects FOR ALL
USING (
    bucket_id = 'public_property_media' AND (public.is_agent() OR public.is_admin())
);
