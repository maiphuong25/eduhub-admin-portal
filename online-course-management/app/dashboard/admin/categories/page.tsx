"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLanguage } from "@/lib/i18n/use-language"
import { getTranslations } from "@/lib/i18n/get-translations"
import { BasicIcons } from "@/components/icons/basic-icons"
import { AddCategoryForm } from "@/components/admin/add-category-form"
import { CategoryDetailModal } from "@/components/admin/category-detail-modal"

// Mock data
const mockCategories = [
  { id: 1, name: "Công nghệ", description: "Các khóa học về công nghệ", icon: "💻", courses: 45, is_locked: false },
  { id: 2, name: "Kinh doanh", description: "Các khóa học về kinh doanh", icon: "💼", courses: 32, is_locked: false },
  { id: 3, name: "Thiết kế", description: "Các khóa học về thiết kế", icon: "🎨", courses: 28, is_locked: true },
  { id: 4, name: "Tiếp thị", description: "Các khóa học về tiếp thị", icon: "📊", courses: 19, is_locked: false },
]

export default function CategoriesPage() {
  const { language, mounted } = useLanguage()
  const t = mounted ? getTranslations(language) : getTranslations("vi")
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState(mockCategories)
  const [addFormOpen, setAddFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddCategory = async (categoryData: any) => {
    const newCategory = {
      id: Math.max(...categories.map((c) => c.id), 0) + 1,
      ...categoryData,
      courses: 0,
      is_locked: false,
    }
    setCategories([...categories, newCategory])
  }

  const handleUpdateCategory = async (categoryData: any) => {
    setCategories(categories.map((cat) => (cat.id === categoryData.id ? { ...cat, ...categoryData } : cat)))
    setDetailModalOpen(false)
  }

  const handleDeleteCategory = async (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId))
    setDetailModalOpen(false)
  }

  const handleToggleLock = async (categoryId: string, isLocked: boolean) => {
    setCategories(categories.map((cat) => (cat.id === categoryId ? { ...cat, is_locked: isLocked } : cat)))
  }

  const handleViewDetails = (category: any) => {
    setSelectedCategory(category)
    setDetailModalOpen(true)
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Quản lý danh mục</h1>
        <p className="text-muted-foreground">Quản lý tất cả danh mục khóa học trong hệ thống</p>
      </div>

      {/* Stats */}
      <Card className="border-0 bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Tổng số danh mục</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{categories.length}</div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Danh sách danh mục</CardTitle>
            <CardDescription>Quản lý và chỉnh sửa các danh mục khóa học</CardDescription>
          </div>
          <Button
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
            onClick={() => setAddFormOpen(true)}
          >
            {BasicIcons.add} Thêm danh mục
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Biểu tượng</TableHead>
                  <TableHead>Tên danh mục</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Khóa học</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow
                    key={category.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleViewDetails(category)}
                  >
                    <TableCell className="text-2xl">{category.icon}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                        {category.courses}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          category.is_locked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {category.is_locked ? "Đã khóa" : "Hoạt động"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Category Form */}
      <AddCategoryForm open={addFormOpen} onOpenChange={setAddFormOpen} onSubmit={handleAddCategory} />

      {/* Category Detail Modal */}
      <CategoryDetailModal
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        category={selectedCategory}
        onUpdate={handleUpdateCategory}
        onDelete={handleDeleteCategory}
        onToggleLock={handleToggleLock}
      />
    </div>
  )
}
