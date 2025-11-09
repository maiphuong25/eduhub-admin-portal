"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BasicIcons } from "@/components/icons/basic-icons"

const mockCourses = [
  { id: 1, title: "Web Development Basics", price: 99.99, students: 245, revenue: 24497.55 },
  { id: 2, title: "Advanced React", price: 149.99, students: 189, revenue: 28348.11 },
  { id: 3, title: "Python for Data Science", price: 129.99, students: 312, revenue: 40556.88 },
  { id: 4, title: "UI/UX Design Masterclass", price: 199.99, students: 156, revenue: 31198.44 },
  { id: 5, title: "Mobile App Development", price: 179.99, students: 203, revenue: 36548.97 },
]

export default function PricingManagement() {
  const [courses, setCourses] = useState(mockCourses)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newPrice, setNewPrice] = useState("")

  const handleEditPrice = (id: number, currentPrice: number) => {
    setEditingId(id)
    setNewPrice(currentPrice.toString())
  }

  const handleSavePrice = (id: number) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, price: Number.parseFloat(newPrice) } : c)))
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quản lý giá khóa học</CardTitle>
          <CardDescription>Cập nhật giá bán cho các khóa học</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên khóa học</TableHead>
                  <TableHead className="text-right">Giá hiện tại</TableHead>
                  <TableHead className="text-right">Số học viên</TableHead>
                  <TableHead className="text-right">Doanh thu</TableHead>
                  <TableHead className="text-center">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell className="text-right">
                      {editingId === course.id ? (
                        <Input
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="w-24 ml-auto"
                          step="0.01"
                        />
                      ) : (
                        `$${course.price.toFixed(2)}`
                      )}
                    </TableCell>
                    <TableCell className="text-right">{course.students}</TableCell>
                    <TableCell className="text-right">${course.revenue.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      {editingId === course.id ? (
                        <div className="flex gap-2 justify-center">
                          <Button size="sm" onClick={() => handleSavePrice(course.id)}>
                            Lưu
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                            Hủy
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => handleEditPrice(course.id, course.price)}>
                          {BasicIcons.edit}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
