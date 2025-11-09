import { translations, type Language } from "./translations"

export function getTranslations(language: Language) {
  return translations[language] || translations.vi
}
