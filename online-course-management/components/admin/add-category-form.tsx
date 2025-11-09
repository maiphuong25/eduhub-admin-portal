"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/i18n/use-language"
import { getTranslations } from "@/lib/i18n/get-translations"

interface AddCategoryFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (categoryData: any) => void
}

export function AddCategoryForm({ open, onOpenChange, onSubmit }: AddCategoryFormProps) {
  const { language, mounted } = useLanguage()
  const t = mounted ? getTranslations(language) : getTranslations("vi")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "📚",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Tên danh mục không được để trống"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Mô tả không được để trống"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      await onSubmit({
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
      })

      setFormData({
        name: "",
        description: "",
        icon: "📚",
      })
      setErrors({})
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm danh mục mới</DialogTitle>
          <DialogDescription>Điền thông tin để tạo danh mục khóa học mới</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Tên danh mục</Label>
            <Input
              id="name"
              placeholder="Ví dụ: Công nghệ, Kinh doanh"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết về danh mục"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={errors.description ? "border-destructive" : ""}
              rows={4}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          {/* Icon Field */}
          <div className="space-y-2">
            <Label htmlFor="icon">Biểu tượng</Label>
            <Input
              id="icon"
              placeholder="Nhập emoji hoặc ký tự"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              maxLength={2}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Hủy
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Đang tạo..." : "Tạo danh mục"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
