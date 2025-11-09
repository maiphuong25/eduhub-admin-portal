"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BasicIcons } from "@/components/icons/basic-icons"

const mockCoupons = [
  { id: 1, code: "SUMMER2024", type: "percentage", value: 20, maxUses: 100, used: 45, active: true },
  { id: 2, code: "WELCOME50", type: "fixed", value: 50, maxUses: 500, used: 234, active: true },
  { id: 3, code: "NEWYEAR30", type: "percentage", value: 30, maxUses: 200, used: 198, active: false },
  { id: 4, code: "FLASH10", type: "fixed", value: 10, maxUses: 1000, used: 876, active: true },
]

export default function CouponManagement() {
  const [coupons, setCoupons] = useState(mockCoupons)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleActive = (id: number) => {
    setCoupons(coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c)))
  }

  const handleDeleteCoupon = (id: number) => {
    setCoupons(coupons.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Quản lý Coupon & Promo</CardTitle>
            <CardDescription>Tạo và quản lý mã giảm giá</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                {BasicIcons.add}
                Thêm Coupon
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo Coupon mới</DialogTitle>
                <DialogDescription>Nhập thông tin coupon mới</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Mã coupon (VD: SUMMER2024)" />
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Phần trăm (%)</option>
                  <option>Số tiền cố định ($)</option>
                </select>
                <Input type="number" placeholder="Giá trị giảm" />
                <Input type="number" placeholder="Số lần sử dụng tối đa" />
                <Button className="w-full">Tạo Coupon</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã Coupon</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead className="text-right">Giá trị</TableHead>
                  <TableHead className="text-right">Đã dùng / Tối đa</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-center">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono font-semibold">{coupon.code}</TableCell>
                    <TableCell>{coupon.type === "percentage" ? "Phần trăm" : "Cố định"}</TableCell>
                    <TableCell className="text-right">
                      {coupon.type === "percentage" ? `${coupon.value}%` : `$${coupon.value}`}
                    </TableCell>
                    <TableCell className="text-right">
                      {coupon.used} / {coupon.maxUses}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-sm ${coupon.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {coupon.active ? "Hoạt động" : "Vô hiệu"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" variant="ghost" onClick={() => handleToggleActive(coupon.id)}>
                          {coupon.active ? BasicIcons.lock : BasicIcons.unlock}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteCoupon(coupon.id)}>
                          {BasicIcons.delete}
                        </Button>
                      </div>
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
