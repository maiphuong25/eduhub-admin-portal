"use client"

import { AlertDialogFooter } from "@/components/ui/alert-dialog"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

interface User {
  id: number
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  status: "active" | "inactive"
  verification_status?: "pending" | "approved" | "rejected"
  verification_reason?: string
  created_at?: string
}

interface UserDetailModalProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (user: User) => void
  onDelete: (userId: number) => void
  onDeactivate: (userId: number) => void
}

export function UserDetailModal({ user, open, onOpenChange, onUpdate, onDelete, onDeactivate }: UserDetailModalProps) {
  const [editedUser, setEditedUser] = useState<User | null>(user)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [showDeactivateAlert, setShowDeactivateAlert] = useState(false)
  const [showApproveAlert, setShowApproveAlert] = useState(false)
  const [showRejectAlert, setShowRejectAlert] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  if (user && editedUser?.id !== user.id) {
    setEditedUser(user)
  }

  const handleSave = () => {
    if (editedUser) {
      onUpdate(editedUser)
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    if (editedUser) {
      onDelete(editedUser.id)
      onOpenChange(false)
    }
  }

  const handleDeactivate = () => {
    if (editedUser) {
      onDeactivate(editedUser.id)
      onOpenChange(false)
    }
  }

  const handleApproveTeacher = () => {
    if (editedUser) {
      const approvedUser = {
        ...editedUser,
        verification_status: "approved" as const,
        verification_reason: undefined,
      }
      onUpdate(approvedUser)
      setShowApproveAlert(false)
      onOpenChange(false)
    }
  }

  const handleRejectTeacher = () => {
    if (editedUser && rejectionReason.trim()) {
      const rejectedUser = {
        ...editedUser,
        verification_status: "rejected" as const,
        verification_reason: rejectionReason,
      }
      onUpdate(rejectedUser)
      setShowRejectAlert(false)
      setRejectionReason("")
      onOpenChange(false)
    }
  }

  if (!editedUser) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chi tiết người dùng</DialogTitle>
            <DialogDescription>Xem và quản lý thông tin người dùng</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Tên người dùng</Label>
              <Input
                id="name"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                disabled={!isEditing}
                className="disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                disabled={!isEditing}
                className="disabled:opacity-50"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Vai trò</Label>
              <Select
                value={editedUser.role}
                onValueChange={(value) =>
                  setEditedUser({ ...editedUser, role: value as "student" | "teacher" | "admin" })
                }
                disabled={!isEditing}
              >
                <SelectTrigger id="role" className="disabled:opacity-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Học viên</SelectItem>
                  <SelectItem value="teacher">Giảng viên</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={editedUser.status}
                onValueChange={(value) => setEditedUser({ ...editedUser, status: value as "active" | "inactive" })}
                disabled={!isEditing}
              >
                <SelectTrigger id="status" className="disabled:opacity-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {editedUser.role === "teacher" && editedUser.verification_status && (
              <div className="space-y-2 p-3 bg-muted rounded-lg">
                <Label>Trạng thái xác minh</Label>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      editedUser.verification_status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : editedUser.verification_status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {editedUser.verification_status === "pending"
                      ? "Chờ phê duyệt"
                      : editedUser.verification_status === "approved"
                        ? "Đã phê duyệt"
                        : "Bị từ chối"}
                  </span>
                </div>
                {editedUser.verification_reason && (
                  <div className="mt-2">
                    <Label className="text-xs">Lý do từ chối:</Label>
                    <p className="text-sm text-muted-foreground mt-1">{editedUser.verification_reason}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2 justify-between">
            <div className="flex gap-2">
              {editedUser.role === "teacher" && editedUser.verification_status === "pending" && !isEditing && (
                <>
                  <Button onClick={() => setShowApproveAlert(true)} className="bg-green-600 hover:bg-green-700">
                    {BasicIcons.check} Phê duyệt
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowRejectAlert(true)}
                    className="text-red-600 hover:text-red-700"
                  >
                    {BasicIcons.close} Từ chối
                  </Button>
                </>
              )}
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeactivateAlert(true)}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    {BasicIcons.pause} Ngừng hoạt động
                  </Button>
                  <Button variant="destructive" onClick={() => setShowDeleteAlert(true)}>
                    {BasicIcons.delete} Xóa
                  </Button>
                </>
              ) : null}
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                    Lưu thay đổi
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Đóng
                  </Button>
                  <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                    {BasicIcons.edit} Sửa
                  </Button>
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa người dùng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa người dùng "{editedUser.name}"? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Deactivate Confirmation Alert */}
      <AlertDialog open={showDeactivateAlert} onOpenChange={setShowDeactivateAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận ngừng hoạt động</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn ngừng hoạt động tài khoản của "{editedUser.name}"? Họ sẽ không thể đăng nhập cho đến
              khi bạn kích hoạt lại.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeactivate} className="bg-orange-600 hover:bg-orange-700">
              Ngừng hoạt động
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showApproveAlert} onOpenChange={setShowApproveAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Phê duyệt giảng viên</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn phê duyệt hồ sơ giảng viên "{editedUser.name}"? Họ sẽ có thể tạo khóa học ngay lập
              tức.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleApproveTeacher} className="bg-green-600 hover:bg-green-700">
              Phê duyệt
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRejectAlert} onOpenChange={setShowRejectAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Từ chối giảng viên</AlertDialogTitle>
            <AlertDialogDescription>
              Vui lòng nhập lý do từ chối hồ sơ giảng viên "{editedUser.name}"
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Lý do từ chối</Label>
              <Input
                id="rejection-reason"
                placeholder="Nhập lý do từ chối..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-20"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectTeacher}
              disabled={!rejectionReason.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              Từ chối
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
