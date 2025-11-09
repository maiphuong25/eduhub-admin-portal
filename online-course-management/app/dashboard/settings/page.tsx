"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Database, Shield } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const loadSettings = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      setProfile(profileData)

      if (profileData?.role === "admin") {
        // Get system stats
        const { data: users } = await supabase.from("profiles").select("*")
        const { data: courses } = await supabase.from("courses").select("*")
        const { data: enrollments } = await supabase.from("enrollments").select("*")

        setStats({
          totalUsers: users?.length || 0,
          totalCourses: courses?.length || 0,
          totalEnrollments: enrollments?.length || 0,
          teachers: users?.filter((u) => u.role === "teacher").length || 0,
          students: users?.filter((u) => u.role === "student").length || 0,
        })
      }

      setLoading(false)
    }

    loadSettings()
  }, [supabase])

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Settings className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2 animate-pulse" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage system settings and view statistics</p>
      </div>

      {/* System Statistics */}
      {profile?.role === "admin" && stats && (
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.teachers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.students}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEnrollments}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Manage security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Account Email</Label>
            <Input value={profile?.email} disabled className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input value={profile?.role} disabled className="bg-muted capitalize" />
          </div>
          <p className="text-sm text-muted-foreground">
            To change your password, please use the password reset feature in your email settings.
          </p>
        </CardContent>
      </Card>

      {/* Database Info */}
      {profile?.role === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database Information
            </CardTitle>
            <CardDescription>System database details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Database Type</p>
                <p className="font-medium">PostgreSQL (Supabase)</p>
              </div>
              <div>
                <p className="text-muted-foreground">Row Level Security</p>
                <p className="font-medium">Enabled</p>
              </div>
              <div>
                <p className="text-muted-foreground">Backup Status</p>
                <p className="font-medium">Automatic</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Updated</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
