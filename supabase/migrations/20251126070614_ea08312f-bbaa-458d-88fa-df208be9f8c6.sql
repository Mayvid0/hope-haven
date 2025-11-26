-- Fix search_path for update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix search_path for increment_event_registered function
CREATE OR REPLACE FUNCTION public.increment_event_registered()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.events
  SET registered = registered + 1
  WHERE id = NEW.event_id;
  RETURN NEW;
END;
$$;

-- Fix search_path for decrement_event_registered function
CREATE OR REPLACE FUNCTION public.decrement_event_registered()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.events
  SET registered = registered - 1
  WHERE id = OLD.event_id;
  RETURN OLD;
END;
$$;