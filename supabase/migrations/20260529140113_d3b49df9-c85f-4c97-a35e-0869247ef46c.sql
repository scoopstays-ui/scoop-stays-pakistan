
CREATE TABLE public.activity_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  user_email text,
  action text NOT NULL,
  entity_type text,
  entity_id text,
  status text NOT NULL DEFAULT 'success',
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_logs_created_at ON public.activity_logs (created_at DESC);
CREATE INDEX idx_activity_logs_action ON public.activity_logs (action);

GRANT SELECT, INSERT ON public.activity_logs TO anon;
GRANT SELECT, INSERT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated login attempts) can insert log entries
CREATE POLICY "Anyone can insert activity logs"
ON public.activity_logs
FOR INSERT
WITH CHECK (true);

-- Only admins can read logs
CREATE POLICY "Admins can view activity logs"
ON public.activity_logs
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete logs (for cleanup)
CREATE POLICY "Admins can delete activity logs"
ON public.activity_logs
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
