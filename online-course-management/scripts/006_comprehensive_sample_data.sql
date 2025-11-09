-- Sample data for admin dashboard
-- This script creates realistic sample data for all tables to demonstrate dashboard functionality

-- 1. Create sample admin user (if not exists)
INSERT INTO public.profiles (id, email, full_name, role, bio, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'admin@edutech.com', 'Admin User', 'admin', 'System Administrator', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Create sample teacher profiles
INSERT INTO public.profiles (id, email, full_name, role, bio, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'teacher1@edutech.com', 'Nguyễn Văn A', 'teacher', 'Giảng viên lập trình web', NOW() - INTERVAL '6 months', NOW() - INTERVAL '2 months'),
  ('550e8400-e29b-41d4-a716-446655440002', 'teacher2@edutech.com', 'Trần Thị B', 'teacher', 'Giảng viên thiết kế UI/UX', NOW() - INTERVAL '5 months', NOW() - INTERVAL '1 month'),
  ('550e8400-e29b-41d4-a716-446655440003', 'teacher3@edutech.com', 'Lê Văn C', 'teacher', 'Giảng viên Python', NOW() - INTERVAL '4 months', NOW() - INTERVAL '3 weeks'),
  ('550e8400-e29b-41d4-a716-446655440004', 'teacher4@edutech.com', 'Phạm Thị D', 'teacher', 'Giảng viên Data Science', NOW() - INTERVAL '3 months', NOW() - INTERVAL '1 week'),
  ('550e8400-e29b-41d4-a716-446655440005', 'teacher5@edutech.com', 'Hoàng Văn E', 'teacher', 'Giảng viên Mobile Development', NOW() - INTERVAL '2 months', NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. Create sample student profiles
INSERT INTO public.profiles (id, email, full_name, role, bio, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440010', 'student1@edutech.com', 'Võ Minh Tuấn', 'student', 'Sinh viên năm 2', NOW() - INTERVAL '8 months', NOW()),
  ('550e8400-e29b-41d4-a716-446655440011', 'student2@edutech.com', 'Đặng Thị Hương', 'student', 'Sinh viên năm 1', NOW() - INTERVAL '7 months', NOW()),
  ('550e8400-e29b-41d4-a716-446655440012', 'student3@edutech.com', 'Bùi Quốc Anh', 'student', 'Lập trình viên tự do', NOW() - INTERVAL '6 months', NOW()),
  ('550e8400-e29b-41d4-a716-446655440013', 'student4@edutech.com', 'Ngô Thị Linh', 'student', 'Nhân viên IT', NOW() - INTERVAL '5 months', NOW()),
  ('550e8400-e29b-41d4-a716-446655440014', 'student5@edutech.com', 'Dương Văn Hùng', 'student', 'Sinh viên năm 3', NOW() - INTERVAL '4 months', NOW()),
  ('550e8400-e29b-41d4-a716-446655440015', 'student6@edutech.com', 'Tạ Thị Mỹ', 'student', 'Thiết kế đồ họa', NOW() - INTERVAL '3 months', NOW()),
  ('550e8400-e29b-41d4-a716-446655440016', 'student7@edutech.com', 'Vũ Văn Sơn', 'student', 'Kỹ sư phần mềm', NOW() - INTERVAL '2 months', NOW()),
  ('550e8400-e29b-41d4-a716-446655440017', 'student8@edutech.com', 'Lý Thị Hà', 'student', 'Quản lý dự án', NOW() - INTERVAL '1 month', NOW()),
  ('550e8400-e29b-41d4-a716-446655440018', 'student9@edutech.com', 'Trương Văn Kiên', 'student', 'Sinh viên năm 4', NOW() - INTERVAL '3 weeks', NOW()),
  ('550e8400-e29b-41d4-a716-446655440019', 'student10@edutech.com', 'Cao Thị Yến', 'student', 'Chuyên gia UX', NOW() - INTERVAL '2 weeks', NOW())
ON CONFLICT (id) DO NOTHING;

-- 4. Create sample categories
INSERT INTO public.categories (id, name, description, icon, created_at)
VALUES 
  ('650e8400-e29b-41d4-a716-446655440001', 'Lập trình Web', 'Các khóa học về phát triển web', 'globe', NOW() - INTERVAL '1 year'),
  ('650e8400-e29b-41d4-a716-446655440002', 'Thiết kế UI/UX', 'Thiết kế giao diện người dùng', 'palette', NOW() - INTERVAL '1 year'),
  ('650e8400-e29b-41d4-a716-446655440003', 'Python', 'Lập trình Python từ cơ bản đến nâng cao', 'code', NOW() - INTERVAL '1 year'),
  ('650e8400-e29b-41d4-a716-446655440004', 'Data Science', 'Khoa học dữ liệu và phân tích', 'chart', NOW() - INTERVAL '1 year'),
  ('650e8400-e29b-41d4-a716-446655440005', 'Mobile Development', 'Phát triển ứng dụng di động', 'smartphone', NOW() - INTERVAL '1 year')
ON CONFLICT (id) DO NOTHING;

-- 5. Create sample courses with various statuses
INSERT INTO public.courses (id, title, description, category_id, teacher_id, price, level, status, created_at, updated_at)
VALUES 
  -- Web Development courses
  ('750e8400-e29b-41d4-a716-446655440001', 'HTML & CSS Cơ Bản', 'Học HTML và CSS từ đầu', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 299000, 'beginner', 'published', NOW() - INTERVAL '6 months', NOW() - INTERVAL '1 week'),
  ('750e8400-e29b-41d4-a716-446655440002', 'JavaScript Nâng Cao', 'Khóa học JavaScript cho lập trình viên', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 499000, 'intermediate', 'published', NOW() - INTERVAL '5 months', NOW() - INTERVAL '2 weeks'),
  ('750e8400-e29b-41d4-a716-446655440003', 'React.js Toàn Diện', 'Thành thạo React.js', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 699000, 'advanced', 'published', NOW() - INTERVAL '4 months', NOW() - INTERVAL '3 days'),
  
  -- UI/UX Design courses
  ('750e8400-e29b-41d4-a716-446655440004', 'Thiết kế UI Cơ Bản', 'Nguyên tắc thiết kế UI', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 399000, 'beginner', 'published', NOW() - INTERVAL '5 months', NOW() - INTERVAL '10 days'),
  ('750e8400-e29b-41d4-a716-446655440005', 'Figma Chuyên Nghiệp', 'Sử dụng Figma như một chuyên gia', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 549000, 'intermediate', 'published', NOW() - INTERVAL '3 months', NOW() - INTERVAL '5 days'),
  
  -- Python courses
  ('750e8400-e29b-41d4-a716-446655440006', 'Python Cho Người Mới Bắt Đầu', 'Học Python từ con số 0', '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 349000, 'beginner', 'published', NOW() - INTERVAL '4 months', NOW() - INTERVAL '15 days'),
  ('750e8400-e29b-41d4-a716-446655440007', 'Django Web Framework', 'Xây dựng web với Django', '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 599000, 'intermediate', 'published', NOW() - INTERVAL '2 months', NOW() - INTERVAL '1 day'),
  
  -- Data Science courses
  ('750e8400-e29b-41d4-a716-446655440008', 'Pandas & NumPy', 'Xử lý dữ liệu với Pandas', '650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 449000, 'intermediate', 'published', NOW() - INTERVAL '3 months', NOW() - INTERVAL '20 days'),
  ('750e8400-e29b-41d4-a716-446655440009', 'Machine Learning Cơ Bản', 'Giới thiệu Machine Learning', '650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 799000, 'advanced', 'published', NOW() - INTERVAL '1 month', NOW() - INTERVAL '2 days'),
  
  -- Mobile Development courses
  ('750e8400-e29b-41d4-a716-446655440010', 'Flutter Cơ Bản', 'Phát triển ứng dụng với Flutter', '650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 549000, 'beginner', 'published', NOW() - INTERVAL '2 months', NOW() - INTERVAL '8 days'),
  ('750e8400-e29b-41d4-a716-446655440011', 'React Native Nâng Cao', 'Xây dựng ứng dụng React Native', '650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 699000, 'advanced', 'published', NOW() - INTERVAL '1 month', NOW() - INTERVAL '4 days'),
  
  -- Pending approval courses
  ('750e8400-e29b-41d4-a716-446655440012', 'Next.js Full Stack', 'Xây dựng ứng dụng full stack với Next.js', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 799000, 'advanced', 'draft', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
  ('750e8400-e29b-41d4-a716-446655440013', 'Vue.js Toàn Diện', 'Thành thạo Vue.js', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 649000, 'intermediate', 'draft', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

-- 6. Create sample enrollments with realistic distribution
INSERT INTO public.enrollments (id, course_id, student_id, enrolled_at, progress, completed_at)
VALUES 
  -- HTML & CSS course enrollments
  ('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '5 months', 100, NOW() - INTERVAL '2 months'),
  ('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', NOW() - INTERVAL '4 months', 75, NULL),
  ('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440012', NOW() - INTERVAL '3 months', 50, NULL),
  ('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440013', NOW() - INTERVAL '2 months', 25, NULL),
  
  -- JavaScript course enrollments
  ('850e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '4 months', 100, NOW() - INTERVAL '1 month'),
  ('850e8400-e29b-41d4-a716-446655440006', '750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440011', NOW() - INTERVAL '3 months', 80, NULL),
  ('850e8400-e29b-41d4-a716-446655440007', '750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440012', NOW() - INTERVAL '2 months', 60, NULL),
  ('850e8400-e29b-41d4-a716-446655440008', '750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440014', NOW() - INTERVAL '1 month', 40, NULL),
  ('850e8400-e29b-41d4-a716-446655440009', '750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440015', NOW() - INTERVAL '2 weeks', 20, NULL),
  
  -- React course enrollments
  ('850e8400-e29b-41d4-a716-446655440010', '750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '3 months', 100, NOW() - INTERVAL '1 week'),
  ('850e8400-e29b-41d4-a716-446655440011', '750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440012', NOW() - INTERVAL '2 months', 70, NULL),
  ('850e8400-e29b-41d4-a716-446655440012', '750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440014', NOW() - INTERVAL '1 month', 50, NULL),
  ('850e8400-e29b-41d4-a716-446655440013', '750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440016', NOW() - INTERVAL '2 weeks', 30, NULL),
  ('850e8400-e29b-41d4-a716-446655440014', '750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440017', NOW() - INTERVAL '1 week', 10, NULL),
  
  -- UI Design course enrollments
  ('850e8400-e29b-41d4-a716-446655440015', '750e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440011', NOW() - INTERVAL '4 months', 100, NOW() - INTERVAL '2 months'),
  ('850e8400-e29b-41d4-a716-446655440016', '750e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440013', NOW() - INTERVAL '3 months', 85, NULL),
  ('850e8400-e29b-41d4-a716-446655440017', '750e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440015', NOW() - INTERVAL '2 months', 60, NULL),
  ('850e8400-e29b-41d4-a716-446655440018', '750e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440018', NOW() - INTERVAL '1 month', 40, NULL),
  
  -- Figma course enrollments
  ('850e8400-e29b-41d4-a716-446655440019', '750e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440011', NOW() - INTERVAL '2 months', 100, NOW() - INTERVAL '3 weeks'),
  ('850e8400-e29b-41d4-a716-446655440020', '750e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440013', NOW() - INTERVAL '1 month', 75, NULL),
  ('850e8400-e29b-41d4-a716-446655440021', '750e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440019', NOW() - INTERVAL '2 weeks', 45, NULL),
  
  -- Python course enrollments
  ('850e8400-e29b-41d4-a716-446655440022', '750e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440012', NOW() - INTERVAL '3 months', 100, NOW() - INTERVAL '1 month'),
  ('850e8400-e29b-41d4-a716-446655440023', '750e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440014', NOW() - INTERVAL '2 months', 70, NULL),
  ('850e8400-e29b-41d4-a716-446655440024', '750e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440016', NOW() - INTERVAL '1 month', 50, NULL),
  ('850e8400-e29b-41d4-a716-446655440025', '750e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440017', NOW() - INTERVAL '2 weeks', 30, NULL),
  ('850e8400-e29b-41d4-a716-446655440026', '750e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440018', NOW() - INTERVAL '1 week', 15, NULL),
  
  -- Django course enrollments
  ('850e8400-e29b-41d4-a716-446655440027', '750e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440012', NOW() - INTERVAL '1 month', 100, NOW() - INTERVAL '1 week'),
  ('850e8400-e29b-41d4-a716-446655440028', '750e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440014', NOW() - INTERVAL '2 weeks', 60, NULL),
  ('850e8400-e29b-41d4-a716-446655440029', '750e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440016', NOW() - INTERVAL '1 week', 35, NULL),
  
  -- Data Science course enrollments
  ('850e8400-e29b-41d4-a716-446655440030', '750e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440014', NOW() - INTERVAL '2 months', 100, NOW() - INTERVAL '2 weeks'),
  ('850e8400-e29b-41d4-a716-446655440031', '750e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440016', NOW() - INTERVAL '1 month', 65, NULL),
  ('850e8400-e29b-41d4-a716-446655440032', '750e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440017', NOW() - INTERVAL '2 weeks', 40, NULL),
  
  -- Machine Learning course enrollments
  ('850e8400-e29b-41d4-a716-446655440033', '750e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440014', NOW() - INTERVAL '3 weeks', 100, NOW() - INTERVAL '3 days'),
  ('850e8400-e29b-41d4-a716-446655440034', '750e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440016', NOW() - INTERVAL '2 weeks', 55, NULL),
  ('850e8400-e29b-41d4-a716-446655440035', '750e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440018', NOW() - INTERVAL '1 week', 25, NULL),
  
  -- Flutter course enrollments
  ('850e8400-e29b-41d4-a716-446655440036', '750e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440015', NOW() - INTERVAL '1 month', 100, NOW() - INTERVAL '1 week'),
  ('850e8400-e29b-41d4-a716-446655440037', '750e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440017', NOW() - INTERVAL '2 weeks', 70, NULL),
  ('850e8400-e29b-41d4-a716-446655440038', '750e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440019', NOW() - INTERVAL '1 week', 40, NULL),
  
  -- React Native course enrollments
  ('850e8400-e29b-41d4-a716-446655440039', '750e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440015', NOW() - INTERVAL '2 weeks', 100, NOW() - INTERVAL '2 days'),
  ('850e8400-e29b-41d4-a716-446655440040', '750e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440017', NOW() - INTERVAL '1 week', 50, NULL)
ON CONFLICT (id) DO NOTHING;

-- 7. Create sample lessons
INSERT INTO public.lessons (id, course_id, title, description, duration_minutes, order_index, created_at, updated_at)
VALUES 
  ('950e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'Giới thiệu HTML', 'Tìm hiểu cơ bản về HTML', 30, 1, NOW() - INTERVAL '6 months', NOW() - INTERVAL '6 months'),
  ('950e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', 'Các thẻ HTML phổ biến', 'Học các thẻ HTML thường dùng', 45, 2, NOW() - INTERVAL '6 months', NOW() - INTERVAL '6 months'),
  ('950e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440001', 'CSS Cơ Bản', 'Tạo kiểu cho HTML với CSS', 50, 3, NOW() - INTERVAL '6 months', NOW() - INTERVAL '6 months'),
  
  ('950e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440002', 'JavaScript Cơ Bản', 'Giới thiệu JavaScript', 40, 1, NOW() - INTERVAL '5 months', NOW() - INTERVAL '5 months'),
  ('950e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440002', 'Biến và Kiểu Dữ Liệu', 'Hiểu về biến trong JavaScript', 45, 2, NOW() - INTERVAL '5 months', NOW() - INTERVAL '5 months'),
  ('950e8400-e29b-41d4-a716-446655440006', '750e8400-e29b-41d4-a716-446655440002', 'Hàm và Scope', 'Làm việc với hàm trong JavaScript', 55, 3, NOW() - INTERVAL '5 months', NOW() - INTERVAL '5 months'),
  
  ('950e8400-e29b-41d4-a716-446655440007', '750e8400-e29b-41d4-a716-446655440003', 'React Hooks', 'Sử dụng React Hooks', 60, 1, NOW() - INTERVAL '4 months', NOW() - INTERVAL '4 months'),
  ('950e8400-e29b-41d4-a716-446655440008', '750e8400-e29b-41d4-a716-446655440003', 'State Management', 'Quản lý state trong React', 70, 2, NOW() - INTERVAL '4 months', NOW() - INTERVAL '4 months')
ON CONFLICT (id) DO NOTHING;

-- 8. Create sample assignments
INSERT INTO public.assignments (id, course_id, title, description, due_date, max_score, created_at, updated_at)
VALUES 
  ('a50e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'Tạo trang web đơn giản', 'Tạo một trang web với HTML và CSS', NOW() + INTERVAL '7 days', 100, NOW() - INTERVAL '5 months', NOW() - INTERVAL '5 months'),
  ('a50e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440002', 'Bài tập JavaScript', 'Viết các hàm JavaScript', NOW() + INTERVAL '7 days', 100, NOW() - INTERVAL '4 months', NOW() - INTERVAL '4 months'),
  ('a50e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', 'Dự án React', 'Xây dựng ứng dụng React', NOW() + INTERVAL '14 days', 100, NOW() - INTERVAL '3 months', NOW() - INTERVAL '3 months')
ON CONFLICT (id) DO NOTHING;

-- 9. Create sample submissions
INSERT INTO public.submissions (id, assignment_id, student_id, content, submitted_at, score, feedback, graded_at, graded_by)
VALUES 
  ('b50e8400-e29b-41d4-a716-446655440001', 'a50e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 'Trang web hoàn thành', NOW() - INTERVAL '4 months', 95, 'Tuyệt vời! Thiết kế rất đẹp.', NOW() - INTERVAL '4 months', '550e8400-e29b-41d4-a716-446655440001'),
  ('b50e8400-e29b-41d4-a716-446655440002', 'a50e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', 'Trang web hoàn thành', NOW() - INTERVAL '3 months', 88, 'Tốt, nhưng cần cải thiện responsive.', NOW() - INTERVAL '3 months', '550e8400-e29b-41d4-a716-446655440001'),
  ('b50e8400-e29b-41d4-a716-446655440003', 'a50e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440010', 'Các hàm JavaScript', NOW() - INTERVAL '3 months', 92, 'Rất tốt! Code sạch và hiệu quả.', NOW() - INTERVAL '3 months', '550e8400-e29b-41d4-a716-446655440001')
ON CONFLICT (id) DO NOTHING;

-- 10. Create sample lesson progress
INSERT INTO public.lesson_progress (id, lesson_id, student_id, completed, completed_at)
VALUES 
  ('c50e8400-e29b-41d4-a716-446655440001', '950e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', TRUE, NOW() - INTERVAL '5 months'),
  ('c50e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440010', TRUE, NOW() - INTERVAL '5 months'),
  ('c50e8400-e29b-41d4-a716-446655440003', '950e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440010', TRUE, NOW() - INTERVAL '4 months'),
  ('c50e8400-e29b-41d4-a716-446655440004', '950e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440010', TRUE, NOW() - INTERVAL '4 months'),
  ('c50e8400-e29b-41d4-a716-446655440005', '950e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440010', TRUE, NOW() - INTERVAL '4 months'),
  ('c50e8400-e29b-41d4-a716-446655440006', '950e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440010', TRUE, NOW() - INTERVAL '3 months'),
  ('c50e8400-e29b-41d4-a716-446655440007', '950e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440010', TRUE, NOW() - INTERVAL '3 months'),
  ('c50e8400-e29b-41d4-a716-446655440008', '950e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440010', TRUE, NOW() - INTERVAL '1 week')
ON CONFLICT (id) DO NOTHING;
