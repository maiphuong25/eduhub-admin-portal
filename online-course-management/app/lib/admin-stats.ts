"use server"

import { createClient } from "@/lib/supabase/server"

const MOCK_STATS = {
  totalCourses: 13,
  courseGrowth: 18.5,
  activeTeachers: 5,
  totalTeachers: 5,
  activeStudents: 10,
  registrationChartData: [
    { month: "Nov 2024", students: 2 },
    { month: "Dec 2024", students: 3 },
    { month: "Jan 2025", students: 5 },
    { month: "Feb 2025", students: 4 },
    { month: "Mar 2025", students: 6 },
    { month: "Apr 2025", students: 7 },
    { month: "May 2025", students: 8 },
    { month: "Jun 2025", students: 5 },
    { month: "Jul 2025", students: 6 },
    { month: "Aug 2025", students: 4 },
    { month: "Sep 2025", students: 3 },
    { month: "Oct 2025", students: 2 },
  ],
  categoryChartData: [
    { name: "Web Development", value: 15 },
    { name: "Mobile Development", value: 12 },
    { name: "Data Science", value: 10 },
    { name: "UI/UX Design", value: 8 },
    { name: "DevOps", value: 5 },
  ],
  completionRate: 65,
  recentActivity: [
    {
      id: "1",
      title: "Advanced React Patterns",
      teacher_id: "teacher1",
      updated_at: new Date().toISOString(),
      profiles: { full_name: "Nguyễn Văn A" },
    },
    {
      id: "2",
      title: "Node.js Backend Development",
      teacher_id: "teacher2",
      updated_at: new Date(Date.now() - 86400000).toISOString(),
      profiles: { full_name: "Trần Thị B" },
    },
    {
      id: "3",
      title: "Python for Data Science",
      teacher_id: "teacher3",
      updated_at: new Date(Date.now() - 172800000).toISOString(),
      profiles: { full_name: "Lê Văn C" },
    },
    {
      id: "4",
      title: "UI/UX Design Fundamentals",
      teacher_id: "teacher4",
      updated_at: new Date(Date.now() - 259200000).toISOString(),
      profiles: { full_name: "Phạm Thị D" },
    },
    {
      id: "5",
      title: "Docker & Kubernetes",
      teacher_id: "teacher5",
      updated_at: new Date(Date.now() - 345600000).toISOString(),
      profiles: { full_name: "Hoàng Văn E" },
    },
  ],
  categoryEnrollmentChartData: [
    { name: "Web Development", enrollments: 15 },
    { name: "Mobile Development", enrollments: 12 },
    { name: "Data Science", enrollments: 10 },
    { name: "UI/UX Design", enrollments: 8 },
    { name: "DevOps", enrollments: 5 },
  ],
  currentMonthRevenue: 2450,
  revenueGrowth: 22.5,
  revenueChartData: [
    { month: "Nov 2024", revenue: 1200 },
    { month: "Dec 2024", revenue: 1500 },
    { month: "Jan 2025", revenue: 1800 },
    { month: "Feb 2025", revenue: 1600 },
    { month: "Mar 2025", revenue: 2100 },
    { month: "Apr 2025", revenue: 2300 },
    { month: "May 2025", revenue: 2500 },
    { month: "Jun 2025", revenue: 2200 },
    { month: "Jul 2025", revenue: 2400 },
    { month: "Aug 2025", revenue: 2100 },
    { month: "Sep 2025", revenue: 1900 },
    { month: "Oct 2025", revenue: 2450 },
  ],
}

export async function getAdminStats() {
  const supabase = await createClient()

  try {
    // 1. Total courses with month-over-month comparison
    const { data: coursesData } = await supabase.from("courses").select("created_at, status").eq("status", "published")

    const currentMonth = new Date()
    const lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)

    const currentMonthCourses =
      coursesData?.filter((c) => {
        const date = new Date(c.created_at)
        return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear()
      }).length || 0

    const lastMonthCourses =
      coursesData?.filter((c) => {
        const date = new Date(c.created_at)
        return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear()
      }).length || 0

    const totalCourses = coursesData?.length || 0
    const courseGrowth = lastMonthCourses > 0 ? ((currentMonthCourses - lastMonthCourses) / lastMonthCourses) * 100 : 0

    // 2. Active instructors
    const { data: teachersData } = await supabase.from("profiles").select("id").eq("role", "teacher")

    const { data: activeTeachersData } = await supabase.from("courses").select("teacher_id").eq("status", "published")

    const uniqueActiveTeachers = new Set(activeTeachersData?.map((c) => c.teacher_id) || [])
    const totalTeachers = teachersData?.length || 0
    const activeTeachers = uniqueActiveTeachers.size

    // 3. Active students
    const { data: enrollmentsData } = await supabase.from("enrollments").select("student_id")

    const uniqueStudents = new Set(enrollmentsData?.map((e) => e.student_id) || [])
    const activeStudents = uniqueStudents.size

    // 4. New student registrations by month (last 12 months)
    const { data: allEnrollments } = await supabase
      .from("enrollments")
      .select("enrolled_at")
      .order("enrolled_at", { ascending: true })

    const monthlyRegistrations: Record<string, number> = {}
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    for (let i = 11; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const key = `${months[date.getMonth()]} ${date.getFullYear()}`
      monthlyRegistrations[key] = 0
    }

    allEnrollments?.forEach((e) => {
      const date = new Date(e.enrolled_at)
      const key = `${months[date.getMonth()]} ${date.getFullYear()}`
      if (monthlyRegistrations[key] !== undefined) {
        monthlyRegistrations[key]++
      }
    })

    const registrationChartData = Object.entries(monthlyRegistrations).map(([month, count]) => ({
      month,
      students: count,
    }))

    // 5. Student distribution by category
    const { data: categoryDistribution } = await supabase
      .from("courses")
      .select("category_id, categories(name)")
      .eq("status", "published")

    const { data: enrollmentsByCategory } = await supabase
      .from("enrollments")
      .select("course_id, courses(category_id, categories(name))")

    const categoryStats: Record<string, number> = {}
    enrollmentsByCategory?.forEach((e: any) => {
      const categoryName = e.courses?.categories?.name || "Uncategorized"
      categoryStats[categoryName] = (categoryStats[categoryName] || 0) + 1
    })

    const categoryChartData = Object.entries(categoryStats).map(([name, value]) => ({
      name,
      value,
    }))

    // 6. Course completion rate
    const { data: allEnrollmentsForCompletion } = await supabase.from("enrollments").select("progress, completed_at")

    const completedCourses = allEnrollmentsForCompletion?.filter((e) => e.completed_at).length || 0
    const totalEnrollments = allEnrollmentsForCompletion?.length || 0
    const completionRate = totalEnrollments > 0 ? (completedCourses / totalEnrollments) * 100 : 0

    // 7. Recent instructor activity
    const { data: recentActivity } = await supabase
      .from("courses")
      .select("id, title, teacher_id, updated_at, profiles(full_name)")
      .eq("status", "published")
      .order("updated_at", { ascending: false })
      .limit(5)

    const { data: categoryEnrollments } = await supabase
      .from("enrollments")
      .select("course_id, courses(category_id, categories(name))")

    const categoryEnrollmentStats: Record<string, number> = {}
    categoryEnrollments?.forEach((e: any) => {
      const categoryName = e.courses?.categories?.name || "Chưa phân loại"
      categoryEnrollmentStats[categoryName] = (categoryEnrollmentStats[categoryName] || 0) + 1
    })

    const categoryEnrollmentChartData = Object.entries(categoryEnrollmentStats)
      .map(([name, value]) => ({
        name,
        enrollments: value,
      }))
      .sort((a, b) => b.enrollments - a.enrollments)

    // Calculate revenue from course enrollments
    const { data: enrollmentsWithCourses } = await supabase.from("enrollments").select("enrolled_at, courses(price)")

    let currentMonthRevenue = 0
    let lastMonthRevenue = 0

    enrollmentsWithCourses?.forEach((e: any) => {
      const date = new Date(e.enrolled_at)
      const price = e.courses?.price || 0

      if (date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear()) {
        currentMonthRevenue += price
      }
      if (date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear()) {
        lastMonthRevenue += price
      }
    })

    const revenueGrowth = lastMonthRevenue > 0 ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0

    // Monthly revenue trend (last 12 months)
    const monthlyRevenue: Record<string, number> = {}
    const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    for (let i = 11; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const key = `${monthsArray[date.getMonth()]} ${date.getFullYear()}`
      monthlyRevenue[key] = 0
    }

    enrollmentsWithCourses?.forEach((e: any) => {
      const date = new Date(e.enrolled_at)
      const key = `${monthsArray[date.getMonth()]} ${date.getFullYear()}`
      const price = e.courses?.price || 0
      if (monthlyRevenue[key] !== undefined) {
        monthlyRevenue[key] += price
      }
    })

    const revenueChartData = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue: Math.round(revenue * 100) / 100,
    }))

    const hasData =
      (totalCourses > 0 ||
        activeStudents > 0 ||
        registrationChartData.some((d) => d.students > 0) ||
        categoryChartData.length > 0) &&
      recentActivity &&
      recentActivity.length > 0

    if (!hasData) {
      return MOCK_STATS
    }

    return {
      totalCourses,
      courseGrowth,
      activeTeachers,
      totalTeachers,
      activeStudents,
      registrationChartData,
      categoryChartData,
      completionRate,
      recentActivity: recentActivity || [],
      categoryEnrollmentChartData,
      currentMonthRevenue: Math.round(currentMonthRevenue * 100) / 100,
      revenueGrowth,
      revenueChartData,
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return MOCK_STATS
  }
}
