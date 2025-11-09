"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const [course, setCourse] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("draft")
  const supabase = createClient()

  useEffect(() => {
    const loadCourseData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      setProfile(profileData)

      // Load course
      const { data: courseData } = await supabase.from("courses").select("*").eq("id", courseId).single()

      if (courseData) {
        setCourse(courseData)
        setTitle(courseData.title)
        setDescription(courseData.description)
        setStatus(courseData.status)

        // Load lessons
        const { data: lessonsData } = await supabase
          .from("lessons")
          .select("*")
          .eq("course_id", courseId)
          .order("order_index")

        setLessons(lessonsData || [])

        // Load assignments
        const { data: assignmentsData } = await supabase.from("assignments").select("*").eq("course_id", courseId)

        setAssignments(assignmentsData || [])
      }

      setLoading(false)
    }

    loadCourseData()
  }, [courseId, supabase])

  const handleUpdateCourse = async () => {
    const { error } = await supabase
      .from("courses")
      .update({
        title,
        description,
        status,
      })
      .eq("id", courseId)

    if (!error) {
      setCourse({ ...course, title, description, status })
      setEditMode(false)
    }
  }

  const handleDeleteLesson = async (lessonId: string) => {
    const { error } = await supabase.from("lessons").delete().eq("id", lessonId)

    if (!error) {
      setLessons(lessons.filter((l) => l.id !== lessonId))
    }
  }

  const isTeacher = profile?.role === "teacher" && profile?.id === course?.teacher_id

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2 animate-pulse" />
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Course not found</p>
          <Link href="/dashboard/courses">
            <Button className="mt-4 bg-primary hover:bg-primary/90">Back to Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <Link href="/dashboard/courses" className="flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Link>

      {/* Course Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{course.title}</CardTitle>
              <CardDescription className="mt-2">{course.description}</CardDescription>
            </div>
            {isTeacher && (
              <Button size="sm" variant="outline" onClick={() => setEditMode(!editMode)} className="gap-2">
                <Edit2 className="w-4 h-4" />
                {editMode ? "Cancel" : "Edit"}
              </Button>
            )}
          </div>
        </CardHeader>
        {editMode && isTeacher && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courseTitle">Title</Label>
              <Input id="courseTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseDesc">Description</Label>
              <textarea
                id="courseDesc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseStatus">Status</Label>
              <select
                id="courseStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <Button onClick={handleUpdateCourse} className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lessons">Lessons ({lessons.length})</TabsTrigger>
          <TabsTrigger value="assignments">Assignments ({assignments.length})</TabsTrigger>
        </TabsList>

        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-4">
          {isTeacher && (
            <Link href={`/dashboard/courses/${courseId}/lessons/create`}>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Lesson
              </Button>
            </Link>
          )}

          {lessons.length > 0 ? (
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <Card key={lesson.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {index + 1}. {lesson.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                        {lesson.duration_minutes && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Duration: {lesson.duration_minutes} minutes
                          </p>
                        )}
                      </div>
                      {isTeacher && (
                        <div className="flex gap-2">
                          <Link href={`/dashboard/courses/${courseId}/lessons/${lesson.id}`}>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </Link>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteLesson(lesson.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-muted-foreground">No lessons yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          {isTeacher && (
            <Link href={`/dashboard/courses/${courseId}/assignments/create`}>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Create Assignment
              </Button>
            </Link>
          )}

          {assignments.length > 0 ? (
            <div className="space-y-3">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">Max Score: {assignment.max_score}</p>
                      </div>
                      {isTeacher && (
                        <Link href={`/dashboard/courses/${courseId}/assignments/${assignment.id}`}>
                          <Button size="sm" variant="outline">
                            Manage
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-muted-foreground">No assignments yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
