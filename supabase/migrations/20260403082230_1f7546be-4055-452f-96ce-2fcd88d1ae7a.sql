
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
  property_name TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  check_in DATE,
  check_out DATE,
  guests INTEGER NOT NULL DEFAULT 1,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a booking request
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT TO public WITH CHECK (true);

-- Only admins can view all bookings
CREATE POLICY "Admins can view bookings" ON public.bookings
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update bookings (change status)
CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete bookings
CREATE POLICY "Admins can delete bookings" ON public.bookings
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
