"use client"

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

export default function CreateAssignmentPage() {
  const params = useParams()
  const courseId = params.id as string
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [maxScore, setMaxScore] = useState("100")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: createError } = await supabase.from("assignments").insert({
        course_id: courseId,
        title,
        description,
        due_date: dueDate || null,
        max_score: Number.parseInt(maxScore) || 100,
      })

      if (createError) throw createError

      router.push(`/dashboard/courses/${courseId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create assignment")
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
        <h1 className="text-3xl font-bold text-foreground">Create Assignment</h1>
        <p className="text-muted-foreground mt-2">Add a new assignment to your course</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
          <CardDescription>Provide information about your assignment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Build a Todo App"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the assignment requirements..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-24"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxScore">Max Score</Label>
                <Input
                  id="maxScore"
                  type="number"
                  value={maxScore}
                  onChange={(e) => setMaxScore(e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                {loading ? "Creating..." : "Create Assignment"}
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
