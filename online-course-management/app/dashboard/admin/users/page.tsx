"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/i18n/use-language"
import { getTranslations } from "@/lib/i18n/get-translations"
import { BasicIcons } from "@/components/icons/basic-icons"
import { AddUserForm } from "@/components/admin/add-user-form"
import { UserDetailModal } from "@/components/admin/user-detail-modal"

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyena@example.com",
    role: "student",
    status: "active",
    verification_status: undefined,
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranb@example.com",
    role: "teacher",
    status: "active",
    verification_status: "approved",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    role: "student",
    status: "inactive",
    verification_status: undefined,
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamd@example.com",
    role: "admin",
    status: "active",
    verification_status: undefined,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoange@example.com",
    role: "teacher",
    status: "active",
    verification_status: "approved",
  },
  {
    id: 6,
    name: "Võ Thị F",
    email: "vof@example.com",
    role: "teacher",
    status: "active",
    verification_status: "pending",
    created_at: "2025-10-24",
  },
  {
    id: 7,
    name: "Đặng Văn G",
    email: "dangg@example.com",
    role: "teacher",
    status: "active",
    verification_status: "pending",
    created_at: "2025-10-23",
  },
  {
    id: 8,
    name: "Bùi Thị H",
    email: "buih@example.com",
    role: "teacher",
    status: "active",
    verification_status: "rejected",
    verification_reason: "Hồ sơ không đầy đủ",
    created_at: "2025-10-22",
  },
]

export default function UserManagementPage() {
  const { language, mounted } = useLanguage()
  const t = mounted ? getTranslations(language) : getTranslations("vi")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [users, setUsers] = useState(mockUsers)
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [userTypeFilter, setUserTypeFilter] = useState<"all" | "student" | "teacher">("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = userTypeFilter === "all" || user.role === userTypeFilter
    return matchesSearch && matchesType
  })

  const stats = {
    total: users.length,
    students: users.filter((u) => u.role === "student").length,
    teachers: users.filter((u) => u.role === "teacher").length,
    admins: users.filter((u) => u.role === "admin").length,
  }

  const pendingTeachers = users.filter((u) => u.role === "teacher" && u.verification_status === "pending")
  const approvedTeachers = users.filter((u) => u.role === "teacher" && u.verification_status === "approved")
  const rejectedTeachers = users.filter((u) => u.role === "teacher" && u.verification_status === "rejected")

  const handleAddUser = async (userData: any) => {
    try {
      const newUser = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: "active",
        verification_status: userData.role === "teacher" ? "pending" : undefined,
      }
      setUsers([...users, newUser])
      console.log("User created:", newUser)
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  const handleOpenUserDetail = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user)
    setIsDetailModalOpen(true)
  }

  const handleUpdateUser = (updatedUser: (typeof mockUsers)[0]) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
    setSelectedUser(updatedUser)
    console.log("User updated:", updatedUser)
  }

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((u) => u.id !== userId))
    console.log("User deleted:", userId)
  }

  const handleDeactivateUser = (userId: number) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: "inactive" as const } : u)))
    console.log("User deactivated:", userId)
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{t.admin.userManagement}</h1>
        <p className="text-muted-foreground">{t.admin.allUsers}</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t.admin.totalUsers}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t.admin.students}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.students}</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t.admin.teachers}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.teachers}</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t.admin.admins}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.admins}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>{t.admin.allUsers}</CardTitle>
            <CardDescription>Danh sách tất cả người dùng trong hệ thống</CardDescription>
          </div>
          <Button
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
            onClick={() => setIsAddUserOpen(true)}
          >
            {BasicIcons.add} {t.admin.addUser}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Tabs value={userTypeFilter} onValueChange={(value) => setUserTypeFilter(value as any)}>
              <TabsList>
                <TabsTrigger value="all">Tất cả ({users.length})</TabsTrigger>
                <TabsTrigger value="student">Học viên ({stats.students})</TabsTrigger>
                <TabsTrigger value="teacher">Giảng viên ({stats.teachers})</TabsTrigger>
              </TabsList>
            </Tabs>

            <Input
              placeholder={t.admin.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.admin.userName}</TableHead>
                  <TableHead>{t.admin.userEmail}</TableHead>
                  <TableHead>{t.admin.userRole}</TableHead>
                  <TableHead>{t.admin.userStatus}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleOpenUserDetail(user)}
                  >
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold capitalize">
                        {user.role === "student"
                          ? "Học viên"
                          : user.role === "teacher"
                            ? "Giảng viên"
                            : "Quản trị viên"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.status === "active" ? t.admin.active : t.admin.inactive}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddUserForm open={isAddUserOpen} onOpenChange={setIsAddUserOpen} onSubmit={handleAddUser} />

      <UserDetailModal
        user={selectedUser}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onUpdate={handleUpdateUser}
        onDelete={handleDeleteUser}
        onDeactivate={handleDeactivateUser}
      />
    </div>
  )
}
