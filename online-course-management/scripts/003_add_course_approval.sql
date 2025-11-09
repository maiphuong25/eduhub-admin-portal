-- Add pending status to courses table if not exists
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Update existing courses to approved status
UPDATE public.courses SET approval_status = 'approved' WHERE approval_status IS NULL;
