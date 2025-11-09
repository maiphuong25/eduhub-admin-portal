"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { BasicIcons } from "@/components/icons/basic-icons"
import { useLanguage } from "@/lib/i18n/use-language"
import { getTranslations } from "@/lib/i18n/get-translations"

interface CategoryDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: any
  onUpdate: (categoryData: any) => void
  onDelete: (categoryId: string) => void
  onToggleLock: (categoryId: string, isLocked: boolean) => void
}

export function CategoryDetailModal({
  open,
  onOpenChange,
  category,
  onUpdate,
  onDelete,
  onToggleLock,
}: CategoryDetailModalProps) {
  const { language, mounted } = useLanguage()
  const t = mounted ? getTranslations(language) : getTranslations("vi")

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    icon: category?.icon || "📚",
  })
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      await onUpdate({
        id: category.id,
        ...formData,
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await onDelete(category.id)
      onOpenChange(false)
    } catch (error) {
      console.error("Error deleting category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleLock = async () => {
    setIsLoading(true)
    try {
      await onToggleLock(category.id, !category.is_locked)
    } catch (error) {
      console.error("Error toggling lock:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!category) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              {isEditing ? "Chỉnh sửa danh mục" : category.name}
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Cập nhật thông tin danh mục" : "Xem chi tiết và quản lý danh mục"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Category Info */}
            {!isEditing && (
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Tên danh mục</p>
                  <p className="font-semibold">{category.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mô tả</p>
                  <p>{category.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Số khóa học</p>
                    <p className="font-semibold text-lg">{category.courses || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Trạng thái</p>
                    <p className="font-semibold">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${category.is_locked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                      >
                        {category.is_locked ? "Đã khóa" : "Hoạt động"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Form */}
            {isEditing && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên danh mục</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Biểu tượng</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    maxLength={2}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4">
              {!isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} disabled={isLoading}>
                    {BasicIcons.edit} Chỉnh sửa
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToggleLock}
                    disabled={isLoading}
                    className={category.is_locked ? "text-green-600" : "text-orange-600"}
                  >
                    {category.is_locked ? BasicIcons.unlock : BasicIcons.lock}
                    {category.is_locked ? "Mở khóa" : "Khóa"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                    onClick={() => setShowDeleteAlert(true)}
                    disabled={isLoading}
                  >
                    {BasicIcons.delete} Xóa
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="ml-auto">
                    Đóng
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        name: category.name,
                        description: category.description,
                        icon: category.icon,
                      })
                    }}
                    disabled={isLoading}
                  >
                    Hủy
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleUpdate}
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa danh mục</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa danh mục "{category.name}"? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isLoading ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
