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
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function AssignmentDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const assignmentId = params.assignmentId as string
  const [assignment, setAssignment] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [userSubmission, setUserSubmission] = useState<any>(null)
  const [submissionContent, setSubmissionContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      setProfile(profileData)

      // Load assignment
      const { data: assignmentData } = await supabase.from("assignments").select("*").eq("id", assignmentId).single()

      setAssignment(assignmentData)

      if (profileData?.role === "student") {
        // Get student's submission
        const { data: submissionData } = await supabase
          .from("submissions")
          .select("*")
          .eq("assignment_id", assignmentId)
          .eq("student_id", user.id)
          .single()

        if (submissionData) {
          setUserSubmission(submissionData)
          setSubmissionContent(submissionData.content || "")
        }
      } else if (profileData?.role === "teacher") {
        // Get all submissions for this assignment
        const { data: submissionsData } = await supabase
          .from("submissions")
          .select("*, profiles(full_name, email)")
          .eq("assignment_id", assignmentId)

        setSubmissions(submissionsData || [])
      }

      setLoading(false)
    }

    loadData()
  }, [assignmentId, supabase])

  const handleSubmit = async () => {
    if (!submissionContent.trim()) return

    setSubmitting(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    if (userSubmission) {
      // Update existing submission
      const { error } = await supabase
        .from("submissions")
        .update({
          content: submissionContent,
          submitted_at: new Date().toISOString(),
        })
        .eq("id", userSubmission.id)

      if (!error) {
        setUserSubmission({ ...userSubmission, content: submissionContent })
      }
    } else {
      // Create new submission
      const { data, error } = await supabase
        .from("submissions")
        .insert({
          assignment_id: assignmentId,
          student_id: user.id,
          content: submissionContent,
          submitted_at: new Date().toISOString(),
        })
        .select()

      if (!error && data) {
        setUserSubmission(data[0])
      }
    }

    setSubmitting(false)
  }

  const handleGradeSubmission = async (submissionId: string, score: number, feedback: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase
      .from("submissions")
      .update({
        score,
        feedback,
        graded_at: new Date().toISOString(),
        graded_by: user.id,
      })
      .eq("id", submissionId)

    if (!error) {
      setSubmissions(
        submissions.map((s) =>
          s.id === submissionId ? { ...s, score, feedback, graded_at: new Date().toISOString() } : s,
        ),
      )
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading assignment...</p>
        </div>
      </div>
    )
  }

  if (!assignment) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Assignment not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <Link href={`/dashboard/courses/${courseId}`} className="flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Course
      </Link>

      {/* Assignment Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{assignment.title}</CardTitle>
          <CardDescription>{assignment.description}</CardDescription>
          <div className="flex gap-4 mt-4 text-sm">
            {assignment.due_date && (
              <div>
                <p className="text-muted-foreground">Due Date</p>
                <p className="font-medium">{new Date(assignment.due_date).toLocaleDateString()}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Max Score</p>
              <p className="font-medium">{assignment.max_score}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Student Submission View */}
      {profile?.role === "student" && (
        <Card>
          <CardHeader>
            <CardTitle>Your Submission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="submission">Submission Content</Label>
              <textarea
                id="submission"
                value={submissionContent}
                onChange={(e) => setSubmissionContent(e.target.value)}
                placeholder="Enter your submission here..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-32"
              />
            </div>

            {userSubmission?.submitted_at && (
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md text-sm">
                <p className="text-blue-900 dark:text-blue-100">
                  Submitted: {new Date(userSubmission.submitted_at).toLocaleString()}
                </p>
              </div>
            )}

            {userSubmission?.graded_at && (
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-md text-sm space-y-2">
                <p className="text-green-900 dark:text-green-100 font-medium">
                  Score: {userSubmission.score}/{assignment.max_score}
                </p>
                {userSubmission.feedback && (
                  <p className="text-green-900 dark:text-green-100">Feedback: {userSubmission.feedback}</p>
                )}
              </div>
            )}

            <Button onClick={handleSubmit} disabled={submitting} className="gap-2 bg-primary hover:bg-primary/90">
              <Upload className="w-4 h-4" />
              {submitting ? "Submitting..." : userSubmission ? "Update Submission" : "Submit Assignment"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Teacher Submissions View */}
      {profile?.role === "teacher" && (
        <Tabs defaultValue="submissions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="submissions">Submissions ({submissions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="space-y-4">
            {submissions.length > 0 ? (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{submission.profiles?.full_name}</CardTitle>
                          <CardDescription>{submission.profiles?.email}</CardDescription>
                        </div>
                        <div className="text-right">
                          {submission.graded_at ? (
                            <div className="text-sm">
                              <p className="text-muted-foreground">Score</p>
                              <p className="font-bold text-lg">
                                {submission.score}/{assignment.max_score}
                              </p>
                            </div>
                          ) : (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Not Graded</span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Submission</p>
                        <div className="bg-muted p-3 rounded text-sm whitespace-pre-wrap">{submission.content}</div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`score-${submission.id}`}>Score</Label>
                        <Input
                          id={`score-${submission.id}`}
                          type="number"
                          defaultValue={submission.score || ""}
                          placeholder="0"
                          max={assignment.max_score}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`feedback-${submission.id}`}>Feedback</Label>
                        <textarea
                          id={`feedback-${submission.id}`}
                          defaultValue={submission.feedback || ""}
                          placeholder="Provide feedback to the student..."
                          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-20"
                        />
                      </div>

                      <Button
                        onClick={() => {
                          const scoreInput = document.getElementById(`score-${submission.id}`) as HTMLInputElement
                          const feedbackInput = document.getElementById(
                            `feedback-${submission.id}`,
                          ) as HTMLTextAreaElement
                          handleGradeSubmission(
                            submission.id,
                            Number.parseInt(scoreInput.value) || 0,
                            feedbackInput.value,
                          )
                        }}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Save Grade
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No submissions yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
