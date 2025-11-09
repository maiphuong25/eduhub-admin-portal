"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLanguage } from "@/lib/i18n/use-language"
import { getTranslations } from "@/lib/i18n/get-translations"
import { CourseDetailModal } from "@/components/admin/course-detail-modal"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const mockCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    teacher: "Nguyễn Văn A",
    category: "Công nghệ",
    status: "published",
    approval_status: "approved",
    students: 245,
    violation: false,
    description: "Khóa học cơ bản về phát triển web với HTML, CSS, JavaScript",
    level: "Beginner",
    price: "Miễn phí",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    teacher: "Trần Thị B",
    category: "Công nghệ",
    status: "published",
    approval_status: "approved",
    students: 189,
    violation: false,
    description: "Các mẫu thiết kế nâng cao trong React",
    level: "Advanced",
    price: "299.000 VND",
  },
  {
    id: 3,
    title: "Digital Marketing Essentials",
    teacher: "Lê Văn C",
    category: "Tiếp thị",
    status: "hidden",
    approval_status: "approved",
    students: 156,
    violation: true,
    description: "Kiến thức cơ bản về tiếp thị kỹ thuật số",
    level: "Intermediate",
    price: "199.000 VND",
  },
  {
    id: 4,
    title: "Data Science with Python",
    teacher: "Phạm Thị D",
    category: "Công nghệ",
    status: "draft",
    approval_status: "pending",
    students: 0,
    violation: false,
    description: "Khóa học về khoa học dữ liệu sử dụng Python",
    level: "Intermediate",
    price: "399.000 VND",
  },
  {
    id: 5,
    title: "Business Strategy 101",
    teacher: "Hoàng Văn E",
    category: "Kinh doanh",
    status: "draft",
    approval_status: "pending",
    students: 0,
    violation: false,
    description: "Chiến lược kinh doanh cơ bản cho các doanh nhân",
    level: "Beginner",
    price: "249.000 VND",
  },
  {
    id: 6,
    title: "Machine Learning Basics",
    teacher: "Võ Thị F",
    category: "Công nghệ",
    status: "draft",
    approval_status: "rejected",
    rejection_reason: "Nội dung chưa đầy đủ, cần bổ sung thêm bài tập thực hành",
    students: 0,
    violation: false,
    description: "Giới thiệu về Machine Learning",
    level: "Intermediate",
    price: "349.000 VND",
  },
]

export default function CoursesPage() {
  const { language, mounted } = useLanguage()
  const t = mounted ? getTranslations(language) : getTranslations("vi")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "pending") return matchesSearch && course.approval_status === "pending"
    if (activeTab === "approved") return matchesSearch && course.approval_status === "approved"
    if (activeTab === "rejected") return matchesSearch && course.approval_status === "rejected"
    return matchesSearch
  })

  const stats = {
    total: mockCourses.length,
    pending: mockCourses.filter((c) => c.approval_status === "pending").length,
    approved: mockCourses.filter((c) => c.approval_status === "approved").length,
    rejected: mockCourses.filter((c) => c.approval_status === "rejected").length,
    violations: mockCourses.filter((c) => c.violation).length,
  }

  const handleApprove = (courseId: string) => {
    console.log("Approved course:", courseId)
    setIsDetailOpen(false)
  }

  const handleReject = (courseId: string, reason: string) => {
    console.log("Rejected course:", courseId, "Reason:", reason)
    setIsDetailOpen(false)
  }

  const handleViewDetail = (course: any) => {
    setSelectedCourse(course)
    setIsDetailOpen(true)
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{t.admin.courseManagement}</h1>
        <p className="text-muted-foreground">Quản lý khóa học và phê duyệt khóa học mới</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng khóa học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Chờ duyệt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Đã duyệt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Từ chối</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.rejected}</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vi phạm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.violations}</div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Danh sách khóa học</CardTitle>
            <CardDescription>Quản lý toàn bộ danh sách khóa học</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-4">
            <Input
              placeholder={t.admin.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="pending">Chờ duyệt ({stats.pending})</TabsTrigger>
                <TabsTrigger value="approved">Đã duyệt ({stats.approved})</TabsTrigger>
                <TabsTrigger value="rejected">Từ chối ({stats.rejected})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.admin.courseName}</TableHead>
                  <TableHead className="text-center">{t.admin.courseTeacher}</TableHead>
                  <TableHead className="text-center">{t.admin.courseCategory}</TableHead>
                  <TableHead className="text-center">Trạng thái duyệt</TableHead>
                  <TableHead className="text-center">{t.admin.courseStatus}</TableHead>
                  <TableHead className="text-center">{t.admin.courseStudents}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow
                    key={course.id}
                    className={`cursor-pointer hover:bg-muted/50 ${course.violation ? "bg-red-50" : ""}`}
                    onClick={() => handleViewDetail(course)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {course.violation && <span className="text-red-500">⚠️</span>}
                        {course.title}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{course.teacher}</TableCell>
                    <TableCell className="text-center">{course.category}</TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                          course.approval_status === "approved"
                            ? "bg-green-100 text-green-700"
                            : course.approval_status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.approval_status === "approved"
                          ? "Đã duyệt"
                          : course.approval_status === "pending"
                            ? "Chờ duyệt"
                            : "Từ chối"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                          course.status === "published"
                            ? "bg-green-100 text-green-700"
                            : course.status === "hidden"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {course.status === "published"
                          ? t.admin.published
                          : course.status === "hidden"
                            ? t.admin.hidden
                            : t.admin.draft}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{course.students}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          onApprove={handleApprove}
          onReject={handleReject}
          isPending={selectedCourse.approval_status === "pending"}
        />
      )}
    </div>
  )
}
