-- Create awareness_resources table for downloadable documents
CREATE TABLE public.awareness_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.awareness_resources ENABLE ROW LEVEL SECURITY;

-- Everyone can view resources
CREATE POLICY "Resources are viewable by everyone"
ON public.awareness_resources
FOR SELECT
USING (true);

-- Only admins can manage resources
CREATE POLICY "Admins can insert resources"
ON public.awareness_resources
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update resources"
ON public.awareness_resources
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete resources"
ON public.awareness_resources
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));