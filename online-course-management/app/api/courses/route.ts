import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Get published courses
    const { data, error } = await supabase
      .from("courses")
      .select("*, profiles(full_name)")
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Courses fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
