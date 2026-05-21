-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;

-- Helper Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_agent()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'agent'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. user_roles
CREATE POLICY "Users can read their own role" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles FOR ALL 
USING (public.is_admin());

-- 2. clients
CREATE POLICY "Clients can view their own profile" 
ON public.clients FOR SELECT 
USING (auth.uid() = id OR public.is_agent() OR public.is_admin());

CREATE POLICY "Clients can update their own profile" 
ON public.clients FOR UPDATE 
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Admins can manage clients" 
ON public.clients FOR ALL 
USING (public.is_admin());

-- 3. operations
CREATE POLICY "Clients and Agents can view relevant operations" 
ON public.operations FOR SELECT 
USING (client_id = auth.uid() OR assigned_agent_id = auth.uid() OR public.is_admin());

CREATE POLICY "Agents can update assigned operations" 
ON public.operations FOR UPDATE 
USING (assigned_agent_id = auth.uid() OR public.is_admin());

CREATE POLICY "Admins can manage operations" 
ON public.operations FOR ALL 
USING (public.is_admin());

-- 4. properties
CREATE POLICY "Public read properties" 
ON public.properties FOR SELECT 
USING (true);

CREATE POLICY "Agents and Admins can manage properties" 
ON public.properties FOR ALL 
USING (public.is_agent() OR public.is_admin());

-- 5. documents
CREATE POLICY "Clients and Agents can view relevant documents" 
ON public.documents FOR SELECT 
USING (
    public.is_admin() OR 
    (public.is_agent() AND EXISTS (SELECT 1 FROM public.operations WHERE id = operation_id AND assigned_agent_id = auth.uid())) OR
    EXISTS (SELECT 1 FROM public.operations WHERE id = operation_id AND client_id = auth.uid())
);

CREATE POLICY "Agents and Admins can manage documents" 
ON public.documents FOR ALL 
USING (public.is_agent() OR public.is_admin());

-- 6. leads
CREATE POLICY "Admins can manage leads" 
ON public.leads FOR ALL 
USING (public.is_admin());

-- 7. timeline_events
CREATE POLICY "Clients and Agents can view relevant events" 
ON public.timeline_events FOR SELECT 
USING (
    public.is_admin() OR
    (public.is_agent() AND EXISTS (SELECT 1 FROM public.operations WHERE id = operation_id AND assigned_agent_id = auth.uid())) OR
    (is_client_visible = true AND EXISTS (SELECT 1 FROM public.operations WHERE id = operation_id AND client_id = auth.uid()))
);

CREATE POLICY "Agents and Admins can manage timeline events" 
ON public.timeline_events FOR ALL 
USING (public.is_agent() OR public.is_admin());
