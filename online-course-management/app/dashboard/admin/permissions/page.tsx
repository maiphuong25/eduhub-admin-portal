"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/i18n/use-language"
import { getTranslations } from "@/lib/i18n/get-translations"

const roles = ["student", "teacher", "admin"]
const permissions = [
  { id: "view_courses", label: "Xem khóa học" },
  { id: "create_courses", label: "Tạo khóa học" },
  { id: "edit_courses", label: "Chỉnh sửa khóa học" },
  { id: "delete_courses", label: "Xóa khóa học" },
  { id: "manage_users", label: "Quản lý người dùng" },
  { id: "manage_categories", label: "Quản lý danh mục" },
]

const defaultPermissions: Record<string, string[]> = {
  student: ["view_courses"],
  teacher: ["view_courses", "create_courses", "edit_courses"],
  admin: ["view_courses", "create_courses", "edit_courses", "delete_courses", "manage_users", "manage_categories"],
}

export default function PermissionsPage() {
  const { language, mounted } = useLanguage()
  const t = mounted ? getTranslations(language) : getTranslations("vi")

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{t.admin.permissions}</h1>
        <p className="text-muted-foreground">{t.admin.rolePermissions}</p>
      </div>

      {/* Permissions Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role} className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="capitalize text-lg">{role}</CardTitle>
              <CardDescription>Quyền hạn cho vai trò {role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`${role}-${permission.id}`}
                    defaultChecked={defaultPermissions[role]?.includes(permission.id)}
                  />
                  <label
                    htmlFor={`${role}-${permission.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {permission.label}
                  </label>
                </div>
              ))}
              <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:shadow-lg">
                {t.admin.save}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
