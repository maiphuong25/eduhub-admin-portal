"use client"

import { useLanguage } from "@/lib/i18n/use-language"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { language, changeLanguage, mounted } = useLanguage()

  if (!mounted) return null

  return (
    <div className="flex gap-2">
      <Button
        variant={language === "vi" ? "default" : "outline"}
        size="sm"
        onClick={() => changeLanguage("vi")}
        className="text-xs"
      >
        Tiếng Việt
      </Button>
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => changeLanguage("en")}
        className="text-xs"
      >
        English
      </Button>
    </div>
  )
}
