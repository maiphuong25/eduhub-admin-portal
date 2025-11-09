"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function CoursesPage() {
  const profile = {
    role: "student",
  }

  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
      level: "Beginner",
      status: "published",
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      description: "Master advanced React concepts and patterns for building scalable applications.",
      level: "Advanced",
      status: "published",
    },
    {
      id: 3,
      title: "Digital Marketing Essentials",
      description: "Understand the fundamentals of digital marketing and online promotion strategies.",
      level: "Beginner",
      status: "published",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground mt-2">
            {profile?.role === "student"
              ? "Your enrolled courses"
              : profile?.role === "teacher"
                ? "Your created courses"
                : "All courses"}
          </p>
        </div>
        {profile?.role === "teacher" && (
          <Link href="/dashboard/courses/create">
            <Button className="gap-2 bg-primary hover:bg-primary/90">➕ Create Course</Button>
          </Link>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-3 text-muted-foreground">🔍</span>
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 h-40 flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium capitalize">
                    {course.level || "Beginner"}
                  </span>
                  <span className="text-muted-foreground text-xs">{course.status}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/courses/${course.id}`} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                      {profile?.role === "student" ? "View" : "Manage"}
                    </Button>
                  </Link>
                  {(profile?.role === "teacher" || profile?.role === "admin") && (
                    <Button size="sm" variant="destructive">
                      🗑️
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <span className="text-4xl">📚</span>
            <p className="text-muted-foreground mt-4">
              {profile?.role === "student" ? "No courses enrolled yet" : "No courses found"}
            </p>
            {profile?.role === "student" && (
              <Link href="/">
                <Button className="mt-4 bg-primary hover:bg-primary/90">Browse Available Courses</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
