"use client"

import { useState, useEffect } from "react"
import type { Language } from "./translations"

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("vi")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null
    if (saved) {
      setLanguage(saved)
    }
    setMounted(true)
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  return { language, changeLanguage, mounted }
}
