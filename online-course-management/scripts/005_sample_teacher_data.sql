-- Insert sample teacher accounts with pending verification status
-- Note: These are sample records for demonstration purposes

-- Sample teacher 1: Nguyễn Văn A
INSERT INTO public.profiles (id, email, full_name, role, bio, verification_status)
VALUES (
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'teacher1@example.com',
  'Nguyễn Văn A',
  'teacher',
  'Giảng viên lập trình với 5 năm kinh nghiệm. Chuyên dạy Web Development và JavaScript.',
  'pending'
) ON CONFLICT DO NOTHING;

-- Sample teacher 2: Trần Thị B
INSERT INTO public.profiles (id, email, full_name, role, bio, verification_status)
VALUES (
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'teacher2@example.com',
  'Trần Thị B',
  'teacher',
  'Chuyên gia về Python và Data Science. Có bằng cấp từ đại học hàng đầu.',
  'pending'
) ON CONFLICT DO NOTHING;

-- Sample teacher 3: Lê Minh C
INSERT INTO public.profiles (id, email, full_name, role, bio, verification_status)
VALUES (
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  'teacher3@example.com',
  'Lê Minh C',
  'teacher',
  'Giảng viên thiết kế UI/UX với kinh nghiệm làm việc tại các công ty công nghệ lớn.',
  'pending'
) ON CONFLICT DO NOTHING;

-- Sample teacher 4: Phạm Quốc D
INSERT INTO public.profiles (id, email, full_name, role, bio, verification_status)
VALUES (
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  'teacher4@example.com',
  'Phạm Quốc D',
  'teacher',
  'Chuyên dạy Mobile Development (React Native, Flutter). Tác giả của 3 khóa học online.',
  'pending'
) ON CONFLICT DO NOTHING;

-- Sample teacher 5: Hoàng Thị E
INSERT INTO public.profiles (id, email, full_name, role, bio, verification_status)
VALUES (
  '550e8400-e29b-41d4-a716-446655440005'::uuid,
  'teacher5@example.com',
  'Hoàng Thị E',
  'teacher',
  'Giảng viên tiếng Anh chuyên ngành công nghệ thông tin. Có chứng chỉ TOEIC 950.',
  'pending'
) ON CONFLICT DO NOTHING;
