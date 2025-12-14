-- Add linked_event_id to blog_posts for event recaps
ALTER TABLE public.blog_posts 
ADD COLUMN linked_event_id uuid REFERENCES public.events(id) ON DELETE SET NULL;

-- Add images array column for multiple images in blog posts
ALTER TABLE public.blog_posts 
ADD COLUMN images text[] DEFAULT '{}';

-- Create index for linked_event_id lookups
CREATE INDEX idx_blog_posts_linked_event_id ON public.blog_posts(linked_event_id);