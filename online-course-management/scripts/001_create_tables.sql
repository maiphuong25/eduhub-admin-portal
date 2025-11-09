-- Create users profile table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.categories(id),
  teacher_id UUID NOT NULL REFERENCES public.profiles(id),
  thumbnail_url TEXT,
  price DECIMAL(10, 2) DEFAULT 0,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  content TEXT,
  order_index INTEGER,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  max_score INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id),
  content TEXT,
  file_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  score INTEGER,
  feedback TEXT,
  graded_at TIMESTAMP WITH TIME ZONE,
  graded_by UUID REFERENCES public.profiles(id)
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  progress DECIMAL(5, 2) DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(course_id, student_id)
);

-- Create lesson progress table
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(lesson_id, student_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_select_public" ON public.profiles FOR SELECT USING (true);

-- Categories RLS Policies (public read)
CREATE POLICY "categories_select_all" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_insert_admin" ON public.categories FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "categories_update_admin" ON public.categories FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Courses RLS Policies
CREATE POLICY "courses_select_published" ON public.courses FOR SELECT USING (status = 'published' OR teacher_id = auth.uid());
CREATE POLICY "courses_insert_teacher" ON public.courses FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
);
CREATE POLICY "courses_update_teacher" ON public.courses FOR UPDATE USING (teacher_id = auth.uid());

-- Lessons RLS Policies
CREATE POLICY "lessons_select_enrolled" ON public.lessons FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.enrollments 
    WHERE enrollments.course_id = lessons.course_id AND enrollments.student_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM public.courses WHERE courses.id = lessons.course_id AND courses.teacher_id = auth.uid()
  )
);

-- Assignments RLS Policies
CREATE POLICY "assignments_select_enrolled" ON public.assignments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.enrollments 
    WHERE enrollments.course_id = assignments.course_id AND enrollments.student_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM public.courses WHERE courses.id = assignments.course_id AND courses.teacher_id = auth.uid()
  )
);

-- Submissions RLS Policies
CREATE POLICY "submissions_select_own" ON public.submissions FOR SELECT USING (
  student_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.assignments a
    JOIN public.courses c ON a.course_id = c.id
    WHERE a.id = submissions.assignment_id AND c.teacher_id = auth.uid()
  )
);
CREATE POLICY "submissions_insert_student" ON public.submissions FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "submissions_update_student" ON public.submissions FOR UPDATE USING (student_id = auth.uid());

-- Enrollments RLS Policies
CREATE POLICY "enrollments_select_own" ON public.enrollments FOR SELECT USING (
  student_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.courses WHERE id = enrollments.course_id AND teacher_id = auth.uid()
  )
);
CREATE POLICY "enrollments_insert_student" ON public.enrollments FOR INSERT WITH CHECK (student_id = auth.uid());

-- Lesson Progress RLS Policies
CREATE POLICY "lesson_progress_select_own" ON public.lesson_progress FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "lesson_progress_insert_own" ON public.lesson_progress FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "lesson_progress_update_own" ON public.lesson_progress FOR UPDATE USING (student_id = auth.uid());
