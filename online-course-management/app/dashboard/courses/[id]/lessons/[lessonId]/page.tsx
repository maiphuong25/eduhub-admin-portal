"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LessonDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const lessonId = params.lessonId as string
  const router = useRouter()
  const [lesson, setLesson] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [content, setContent] = useState("")
  const [durationMinutes, setDurationMinutes] = useState("")
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const loadLessonData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      setProfile(profileData)

      // Load lesson
      const { data: lessonData } = await supabase.from("lessons").select("*").eq("id", lessonId).single()

      if (lessonData) {
        setLesson(lessonData)
        setTitle(lessonData.title)
        setDescription(lessonData.description)
        setVideoUrl(lessonData.video_url)
        setContent(lessonData.content)
        setDurationMinutes(lessonData.duration_minutes?.toString() || "")

        // Check if student completed this lesson
        if (profileData?.role === "student") {
          const { data: progressData } = await supabase
            .from("lesson_progress")
            .select("*")
            .eq("lesson_id", lessonId)
            .eq("student_id", user.id)
            .single()

          if (progressData?.completed) {
            setCompleted(true)
          }
        }
      }

      setLoading(false)
    }

    loadLessonData()
  }, [lessonId, supabase])

  const handleUpdateLesson = async () => {
    const { error } = await supabase
      .from("lessons")
      .update({
        title,
        description,
        video_url: videoUrl || null,
        content: content || null,
        duration_minutes: durationMinutes ? Number.parseInt(durationMinutes) : null,
      })
      .eq("id", lessonId)

    if (!error) {
      setLesson({ ...lesson, title, description, video_url: videoUrl, content, duration_minutes: durationMinutes })
      setEditMode(false)
    }
  }

  const handleMarkComplete = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase.from("lesson_progress").upsert({
      lesson_id: lessonId,
      student_id: user.id,
      completed: true,
      completed_at: new Date().toISOString(),
    })

    if (!error) {
      setCompleted(true)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Lesson not found</p>
          <Link href={`/dashboard/courses/${courseId}`}>
            <Button className="mt-4 bg-primary hover:bg-primary/90">Back to Course</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isTeacher = profile?.role === "teacher"

  return (
    <div className="p-6 space-y-6">
      <Link href={`/dashboard/courses/${courseId}`} className="flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Course
      </Link>

      {/* Lesson Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl">{lesson.title}</CardTitle>
              <CardDescription className="mt-2">{lesson.description}</CardDescription>
              {lesson.duration_minutes && (
                <p className="text-xs text-muted-foreground mt-2">Duration: {lesson.duration_minutes} minutes</p>
              )}
            </div>
            <div className="flex gap-2">
              {!isTeacher && !completed && (
                <Button onClick={handleMarkComplete} className="gap-2 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Mark Complete
                </Button>
              )}
              {completed && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
              {isTeacher && (
                <Button size="sm" variant="outline" onClick={() => setEditMode(!editMode)}>
                  {editMode ? "Cancel" : "Edit"}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Edit Form */}
      {editMode && isTeacher && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Lesson</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lessonTitle">Title</Label>
              <Input id="lessonTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lessonDesc">Description</Label>
              <textarea
                id="lessonDesc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input id="videoUrl" type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lessonContent">Content</Label>
              <textarea
                id="lessonContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-32 font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdateLesson} className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Lesson Content */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {videoUrl && (
            <div className="space-y-2">
              <h3 className="font-semibold">Video</h3>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Video: {videoUrl}</p>
              </div>
            </div>
          )}

          {content && (
            <div className="space-y-2">
              <h3 className="font-semibold">Content</h3>
              <div className="prose prose-sm max-w-none bg-muted/50 p-4 rounded-lg whitespace-pre-wrap text-sm">
                {content}
              </div>
            </div>
          )}

          {!videoUrl && !content && <p className="text-muted-foreground">No content available for this lesson</p>}
        </CardContent>
      </Card>
    </div>
  )
}
