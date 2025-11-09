"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { BasicIcons } from "@/components/icons/basic-icons"

interface CourseDetailModalProps {
  course: any
  isOpen: boolean
  onClose: () => void
  onApprove?: (courseId: string) => void
  onReject?: (courseId: string, reason: string) => void
  isPending?: boolean
}

export function CourseDetailModal({
  course,
  isOpen,
  onClose,
  onApprove,
  onReject,
  isPending = false,
}: CourseDetailModalProps) {
  const [rejectionReason, setRejectionReason] = useState("")
  const [isRejecting, setIsRejecting] = useState(false)
  const [isLocked, setIsLocked] = useState(course?.status === "hidden")

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Vui lòng nhập lý do từ chối")
      return
    }
    onReject?.(course.id, rejectionReason)
    setRejectionReason("")
    setIsRejecting(false)
    onClose()
  }

  const handleToggleLock = () => {
    setIsLocked(!isLocked)
    console.log("Course lock status toggled:", !isLocked)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{course.title}</DialogTitle>
          <DialogDescription>Chi tiết khóa học</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Info */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 bg-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Giảng viên</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{course.teacher}</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Danh mục</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{course.category}</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Mức độ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{course.level || "Chưa xác định"}</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Giá</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{course.price || "Miễn phí"}</p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="border-0 bg-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Mô tả</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">{course.description || "Chưa có mô tả"}</p>
            </CardContent>
          </Card>

          {/* Rejection Reason (if rejected) */}
          {course.approval_status === "rejected" && course.rejection_reason && (
            <Card className="border-0 bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-red-700">Lý do từ chối</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-600">{course.rejection_reason}</p>
              </CardContent>
            </Card>
          )}

          {course.approval_status === "approved" && (
            <Card className="border-0 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Trạng thái khóa học</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleToggleLock}
                  className={`w-full ${isLocked ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isLocked ? <>{BasicIcons.lock} Khóa khóa học</> : <>{BasicIcons.unlock} Mở khóa khóa học</>}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  {isLocked
                    ? "Khóa học này đang bị khóa và không hiển thị cho học viên"
                    : "Khóa học này đang hoạt động và hiển thị cho học viên"}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Approval Actions (for pending courses) */}
          {isPending && course.approval_status === "pending" && (
            <div className="space-y-4 border-t pt-4">
              {!isRejecting ? (
                <div className="flex gap-2">
                  <Button onClick={() => onApprove?.(course.id)} className="flex-1 bg-green-600 hover:bg-green-700">
                    {BasicIcons.check} Phê duyệt
                  </Button>
                  <Button onClick={() => setIsRejecting(true)} variant="destructive" className="flex-1">
                    {BasicIcons.x} Từ chối
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Nhập lý do từ chối khóa học..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="min-h-24"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleReject} variant="destructive" className="flex-1">
                      Xác nhận từ chối
                    </Button>
                    <Button
                      onClick={() => {
                        setIsRejecting(false)
                        setRejectionReason("")
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
