import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { Arima as Arial } from "next/font/google"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _arial = Arial({ subsets: ["latin"], variable: "--font-arial", weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Online Course Management",
  description: "Manage your online courses efficiently",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_arial.variable}`}>{children}</body>
    </html>
  )
}
