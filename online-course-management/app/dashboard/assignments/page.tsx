"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AssignmentsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  let supabase: any = null
  try {
    supabase = createClient()
  } catch (err) {
    setError("Supabase configuration is missing. Please set up environment variables.")
  }

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        if (!supabase) {
          setError("Supabase is not configured")
          setLoading(false)
          return
        }

        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        setProfile(profileData)

        if (profileData?.role === "student") {
          // Get student's assignments
          const { data: enrollments } = await supabase.from("enrollments").select("course_id").eq("student_id", user.id)

          const courseIds = enrollments?.map((e) => e.course_id) || []

          if (courseIds.length > 0) {
            const { data: assignmentsList } = await supabase
              .from("assignments")
              .select("*, submissions(*)")
              .in("course_id", courseIds)

            setAssignments(assignmentsList || [])
          }
        } else if (profileData?.role === "teacher") {
          // Get teacher's assignments
          const { data: courses } = await supabase.from("courses").select("id").eq("teacher_id", user.id)

          const courseIds = courses?.map((c) => c.id) || []

          if (courseIds.length > 0) {
            const { data: assignmentsList } = await supabase
              .from("assignments")
              .select("*, submissions(*)")
              .in("course_id", courseIds)

            setAssignments(assignmentsList || [])
          }
        }

        setLoading(false)
      } catch (err: any) {
        setError(err.message || "Failed to load assignments")
        setLoading(false)
      }
    }

    loadAssignments()
  }, [supabase])

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground mt-2">
          {profile?.role === "student" ? "Your assignments and submissions" : "Manage student submissions"}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2 animate-pulse" />
          <p className="text-muted-foreground">Loading assignments...</p>
        </div>
      ) : assignments.length > 0 ? (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{assignment.title}</CardTitle>
                    <CardDescription>{assignment.description}</CardDescription>
                  </div>
                  {assignment.due_date && isOverdue(assignment.due_date) && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Overdue
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {assignment.due_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Due: {new Date(assignment.due_date).toLocaleDateString()}
                    </div>
                  )}
                  <div>Max Score: {assignment.max_score}</div>
                </div>
                <Link href={`/dashboard/assignments/${assignment.id}`}>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    {profile?.role === "student" ? "Submit" : "View Submissions"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No assignments yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
