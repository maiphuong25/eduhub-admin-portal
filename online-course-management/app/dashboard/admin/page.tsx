import { getAdminStats } from "@/app/lib/admin-stats"
import { DashboardStats } from "@/components/admin/dashboard-stats"

export default async function AdminDashboard() {
  const stats = await getAdminStats()

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Quản lý toàn bộ hệ thống EduHub</p>
      </div>

      {/* Statistics Section */}
      <DashboardStats stats={stats} />
    </div>
  )
}
