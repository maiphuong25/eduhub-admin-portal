"use client"

export const dynamic = "force-dynamic"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateLessonPage() {
  const params = useParams()
  const courseId = params.id as string
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [content, setContent] = useState("")
  const [durationMinutes, setDurationMinutes] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: createError } = await supabase.from("lessons").insert({
        course_id: courseId,
        title,
        description,
        video_url: videoUrl || null,
        content: content || null,
        duration_minutes: durationMinutes ? Number.parseInt(durationMinutes) : null,
        order_index: 0,
      })

      if (createError) throw createError

      router.push(`/dashboard/courses/${courseId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create lesson")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <Link href={`/dashboard/courses/${courseId}`} className="flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Course
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Create New Lesson</h1>
        <p className="text-muted-foreground mt-2">Add a new lesson to your course</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
          <CardDescription>Provide information about your lesson</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Introduction to HTML"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the lesson content..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add lesson content in markdown format..."
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
                placeholder="e.g., 30"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                {loading ? "Creating..." : "Create Lesson"}
              </Button>
              <Link href={`/dashboard/courses/${courseId}`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
