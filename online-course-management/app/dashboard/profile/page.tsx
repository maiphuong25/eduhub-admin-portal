"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Shield } from "lucide-react"

export default function ProfilePage() {
  const profile = {
    id: "demo-user",
    email: "demo@example.com",
    full_name: "Demo User",
    role: "student",
    bio: "Welcome to EduHub!",
  }

  const [fullName, setFullName] = useState(profile.full_name || "")
  const [bio, setBio] = useState(profile.bio || "")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSaving(false)
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account information</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input id="email" value={profile?.email} disabled className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Role
            </Label>
            <div className="px-3 py-2 border border-input rounded-md bg-muted text-foreground capitalize">
              {profile?.role}
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
