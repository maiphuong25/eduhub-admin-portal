"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const mockUser = {
      role: "admin",
    }

    if (mockUser?.role === "admin") {
      router.push("/dashboard/admin")
    } else {
      router.push("/")
    }
  }, [router])

  return null
}
