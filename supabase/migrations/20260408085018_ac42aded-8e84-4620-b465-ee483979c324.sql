
-- Site settings table for CMS content management
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read site settings (needed for homepage)
CREATE POLICY "Public read site_settings" ON public.site_settings
  FOR SELECT TO public USING (true);

-- Only admins can modify
CREATE POLICY "Admins can insert site_settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site_settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site_settings" ON public.site_settings
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default content
INSERT INTO public.site_settings (key, value) VALUES
  ('hero', '{"title": "Find Verified Stays", "titleHighlight": "Across Pakistan", "subtitle": "Short-Term Rentals in Pakistan", "description": "Book directly. No hidden fees. Trusted by 5000+ guests.", "backgroundImage": ""}'),
  ('stats', '[{"value": "100+", "label": "Properties"}, {"value": "15+", "label": "Cities"}, {"value": "4.8", "label": "Avg Rating"}, {"value": "5000+", "label": "Happy Guests"}]'),
  ('contact', '{"phone": "+92 304 111 0786", "email": "info@scoopstays.com", "address": "Pakistan", "whatsappUrl": "https://wa.me/923041110786"}'),
  ('testimonials', '[{"name": "Ali Khan", "city": "Lahore", "text": "Amazing stay experience. The property was clean and exactly as shown. Highly recommended."}, {"name": "Sarah Ahmed", "city": "Karachi", "text": "Smooth booking process and very helpful support team."}, {"name": "Usman Raza", "city": "Islamabad", "text": "Great property and professional management."}]'),
  ('cta', '{"title": "Book Your Perfect Stay Today", "description": "Browse our collection of 100+ luxury properties and find your perfect stay across Pakistan."}'),
  ('banners', '[]');
