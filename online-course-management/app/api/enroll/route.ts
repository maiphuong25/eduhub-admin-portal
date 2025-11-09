import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { courseId } = await request.json()

    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if already enrolled
    const { data: existing } = await supabase
      .from("enrollments")
      .select("*")
      .eq("course_id", courseId)
      .eq("student_id", user.id)
      .single()

    if (existing) {
      return NextResponse.json({ error: "Already enrolled" }, { status: 400 })
    }

    // Create enrollment
    const { data, error } = await supabase
      .from("enrollments")
      .insert({
        course_id: courseId,
        student_id: user.id,
      })
      .select()

    if (error) throw error

    return NextResponse.json({ data: data?.[0] })
  } catch (error) {
    console.error("Enrollment error:", error)
    return NextResponse.json({ error: "Failed to enroll" }, { status: 500 })
  }
}
