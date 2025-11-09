"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Mail, Calendar } from "lucide-react"
import Link from "next/link"

export default function StudentsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [filteredStudents, setFilteredStudents] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const loadStudents = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      setProfile(profileData)

      if (profileData?.role === "teacher") {
        // Get teacher's courses
        const { data: courses } = await supabase.from("courses").select("id").eq("teacher_id", user.id)

        const courseIds = courses?.map((c) => c.id) || []

        if (courseIds.length > 0) {
          // Get all students enrolled in teacher's courses
          const { data: enrollments } = await supabase
            .from("enrollments")
            .select("student_id, courses(title)")
            .in("course_id", courseIds)

          // Get unique student profiles
          const studentIds = [...new Set(enrollments?.map((e) => e.student_id) || [])]

          if (studentIds.length > 0) {
            const { data: studentsList } = await supabase
              .from("profiles")
              .select("*")
              .in("id", studentIds)
              .eq("role", "student")

            setStudents(studentsList || [])
            setFilteredStudents(studentsList || [])
          }
        }
      }

      setLoading(false)
    }

    loadStudents()
  }, [supabase])

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredStudents(filtered)
  }, [searchTerm, students])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Students</h1>
        <p className="text-muted-foreground mt-2">Manage students enrolled in your courses</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search students by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2 animate-pulse" />
          <p className="text-muted-foreground">Loading students...</p>
        </div>
      ) : filteredStudents.length > 0 ? (
        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{student.full_name || "Unknown"}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Joined {new Date(student.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    {student.bio && <p className="text-sm text-muted-foreground mt-2">{student.bio}</p>}
                  </div>
                  <Link href={`/dashboard/students/${student.id}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No students enrolled yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
