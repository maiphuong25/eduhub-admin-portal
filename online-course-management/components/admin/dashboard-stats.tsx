"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, BookOpen, DollarSign } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    totalCourses: number
    courseGrowth: number
    activeTeachers: number
    totalTeachers: number
    activeStudents: number
    registrationChartData: Array<{ month: string; students: number }>
    categoryChartData: Array<{ name: string; value: number }>
    completionRate: number
    recentActivity: Array<{
      id: string
      title: string
      teacher_id: string
      updated_at: string
      profiles: { full_name: string } | null
    }>
    categoryEnrollmentChartData: Array<{ name: string; enrollments: number }>
    currentMonthRevenue: number
    revenueGrowth: number
    revenueChartData: Array<{ month: string; revenue: number }>
  }
}

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"]

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu tháng này</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.currentMonthRevenue.toLocaleString()}</div>
            <p className={`text-xs ${stats.revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {stats.revenueGrowth >= 0 ? "+" : ""}
              {stats.revenueGrowth.toFixed(1)}% so với tháng trước
            </p>
          </CardContent>
        </Card>

        {/* Total Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số khóa học</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className={`text-xs ${stats.courseGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {stats.courseGrowth >= 0 ? "+" : ""}
              {stats.courseGrowth.toFixed(1)}% so với tháng trước
            </p>
          </CardContent>
        </Card>

        {/* Active Teachers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giảng viên hoạt động</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.activeTeachers}/{stats.totalTeachers}
            </div>
            <p className="text-xs text-muted-foreground">Đang giảng dạy / Tổng giảng viên</p>
          </CardContent>
        </Card>

        {/* Active Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Học viên đang học</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents}</div>
            <p className="text-xs text-muted-foreground">Đã đăng ký ít nhất một khóa</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doanh thu theo thời gian</CardTitle>
          <CardDescription>Theo dõi xu hướng doanh thu từng tháng</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <ChartContainer
            config={{
              revenue: {
                label: "Doanh thu",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[400px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.revenueChartData} margin={{ top: 5, right: 30, left: 0, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Student Registrations */}
        <Card>
          <CardHeader>
            <CardTitle>Học viên đăng ký mới</CardTitle>
            <CardDescription>Lượng học viên đăng ký theo tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                students: {
                  label: "Học viên",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.registrationChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="students" fill="var(--color-students)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Student Distribution by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố học viên theo lĩnh vực</CardTitle>
            <CardDescription>Lĩnh vực được ưa chuộng nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Học viên",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categoryChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Số lượng người đăng ký từng danh mục</CardTitle>
          <CardDescription>Thống kê lượng học viên đăng ký theo từng danh mục khóa học</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              enrollments: {
                label: "Người đăng ký",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.categoryEnrollmentChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="enrollments" fill="var(--color-enrollments)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent Instructor Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt động gần đây của giảng viên</CardTitle>
          <CardDescription>Danh sách giảng viên vừa tạo hoặc cập nhật khóa học</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Giảng viên: {activity.profiles?.full_name || "Unknown"}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.updated_at).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Không có hoạt động gần đây</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
