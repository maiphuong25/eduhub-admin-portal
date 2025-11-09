"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n/use-language"
import { getTranslations } from "@/lib/i18n/get-translations"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { language, mounted } = useLanguage()
  const t = mounted ? getTranslations(language) : getTranslations("vi")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (email && password) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        router.push("/dashboard")
      } else {
        setError(t.auth.pleaseEnterEmailAndPassword)
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">📚</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EduHub
            </span>
          </div>
          <p className="text-muted-foreground">{t.auth.welcomeBack}</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl">{t.auth.login}</CardTitle>
            <CardDescription>{t.auth.enterCredentials}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  {t.auth.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  {t.auth.password}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? t.auth.loggingIn : t.auth.login}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {t.auth.dontHaveAccount}{" "}
              <Link href="/auth/sign-up" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                {t.auth.signup}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
