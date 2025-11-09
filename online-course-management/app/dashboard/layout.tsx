"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/use-language"
import { getTranslations } from "@/lib/i18n/get-translations"
import { BasicIcons } from "@/components/icons/basic-icons"
import { LanguageSwitcher } from "@/components/language-switcher"

const mockUser = {
  id: "demo-user",
  email: "demo@example.com",
  full_name: "Demo User",
  role: "admin",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { language, mounted } = useLanguage()
  const t = mounted ? getTranslations(language) : getTranslations("vi")

  const profile = mockUser

  const navItems = [
    { label: t.dashboard.dashboard, href: "/dashboard/admin", icon: BasicIcons.dashboard },
    { label: t.dashboard.users, href: "/dashboard/admin/users", icon: BasicIcons.users },
    { label: t.dashboard.categories, href: "/dashboard/admin/categories", icon: BasicIcons.categories },
    { label: t.admin.courseManagement, href: "/dashboard/admin/courses", icon: BasicIcons.courses },
    { label: "Thanh toán & Billing", href: "/dashboard/admin/billing", icon: BasicIcons.settings },
  ]

  const currentNavItems = navItems

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors duration-200 text-primary"
            >
              {sidebarOpen ? BasicIcons.close : BasicIcons.menu}
            </button>
            <Link href="/dashboard/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg text-white font-bold text-lg">
                E
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:inline">
                EduHub
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground">{profile?.full_name || "User"}</p>
              <p className="text-xs text-muted-foreground capitalize">{profile?.role}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-primary/10 transition-colors duration-200 text-primary"
            >
              {BasicIcons.logout}
              <span className="hidden sm:inline">{t.dashboard.logout}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-border/40 bg-gradient-to-b from-background to-primary/5 transition-all duration-300 overflow-hidden lg:w-64 shadow-lg z-30`}
        >
          <nav className="p-4 space-y-2">
            {currentNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 hover:bg-primary/10 transition-all duration-200 group text-primary"
                  asChild
                >
                  <span>
                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                    {item.label}
                  </span>
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-primary/2 to-accent/5 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}
