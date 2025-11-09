"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Trash2 } from "lucide-react"

export default function UsersPage() {
  const [profile, setProfile] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const loadUsers = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      setProfile(profileData)

      if (profileData?.role === "admin") {
        // Get all users
        const { data: usersList } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false })

        setUsers(usersList || [])
        setFilteredUsers(usersList || [])
      }

      setLoading(false)
    }

    loadUsers()
  }, [supabase])

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    const { error } = await supabase.from("profiles").delete().eq("id", userId)

    if (!error) {
      setUsers(users.filter((u) => u.id !== userId))
    }
  }

  const handleChangeRole = async (userId: string, newRole: string) => {
    const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", userId)

    if (!error) {
      setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-2">Manage all users and their roles</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search users by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2 animate-pulse" />
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{user.full_name || "Unknown"}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Joined {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleChangeRole(user.id, e.target.value)}
                      className="px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>

                    <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(user.id)} className="gap-2">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No users found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
