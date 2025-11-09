"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BasicIcons } from "@/components/icons/basic-icons"

const mockPayments = [
  {
    id: "INV001",
    student: "Nguyễn Văn A",
    course: "Web Development",
    amount: 99.99,
    status: "paid",
    date: "2024-10-20",
    method: "VNPAY",
  },
  {
    id: "INV002",
    student: "Trần Thị B",
    course: "React Advanced",
    amount: 149.99,
    status: "paid",
    date: "2024-10-19",
    method: "MoMo",
  },
  {
    id: "INV003",
    student: "Lê Văn C",
    course: "Python Data",
    amount: 129.99,
    status: "refunded",
    date: "2024-10-18",
    method: "Stripe",
  },
  {
    id: "INV004",
    student: "Phạm Thị D",
    course: "UI/UX Design",
    amount: 199.99,
    status: "paid",
    date: "2024-10-17",
    method: "VNPAY",
  },
  {
    id: "INV005",
    student: "Hoàng Văn E",
    course: "Mobile Dev",
    amount: 179.99,
    status: "pending",
    date: "2024-10-16",
    method: "PayPal",
  },
]

export default function PaymentHistory() {
  const [payments] = useState(mockPayments)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "refunded":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán"
      case "pending":
        return "Chờ xử lý"
      case "refunded":
        return "Đã hoàn tiền"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử thanh toán</CardTitle>
          <CardDescription>Xem tất cả các giao dịch thanh toán, hoàn tiền và hóa đơn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã hóa đơn</TableHead>
                  <TableHead>Học viên</TableHead>
                  <TableHead>Khóa học</TableHead>
                  <TableHead className="text-right">Số tiền</TableHead>
                  <TableHead>Phương thức</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead className="text-center">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono font-semibold">{payment.id}</TableCell>
                    <TableCell>{payment.student}</TableCell>
                    <TableCell>{payment.course}</TableCell>
                    <TableCell className="text-right font-semibold">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-sm ${getStatusColor(payment.status)}`}>
                        {getStatusLabel(payment.status)}
                      </span>
                    </TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell className="text-center">
                      <Button size="sm" variant="ghost">
                        {BasicIcons.download}
                      </Button>
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
