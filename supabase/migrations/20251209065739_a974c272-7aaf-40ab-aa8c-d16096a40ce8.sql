-- Add status column to testimonies table
ALTER TABLE public.testimonies 
ADD COLUMN status text NOT NULL DEFAULT 'pending';

-- Update existing testimonies to approved status
UPDATE public.testimonies SET status = 'approved' WHERE status = 'pending';

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage testimonies" ON public.testimonies;
DROP POLICY IF EXISTS "Testimonies are viewable by everyone" ON public.testimonies;

-- Create new policies
-- Anyone can submit testimonies (they go to pending status)
CREATE POLICY "Anyone can submit testimonies"
ON public.testimonies
FOR INSERT
WITH CHECK (status = 'pending');

-- Only approved testimonies are publicly viewable, admins can see all
CREATE POLICY "Approved testimonies are viewable by everyone"
ON public.testimonies
FOR SELECT
USING (status = 'approved' OR has_role(auth.uid(), 'admin'::app_role));

-- Admins can update testimonies (for approval/rejection)
CREATE POLICY "Admins can update testimonies"
ON public.testimonies
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete testimonies
CREATE POLICY "Admins can delete testimonies"
ON public.testimonies
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));