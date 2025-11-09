-- Add teacher verification status to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS verification_reason TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES public.profiles(id);
