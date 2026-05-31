export const locales = ['en', 'tr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

const localeCookie = 'HAUL_LOCALE'

export function getLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale
  try {
    const match = document.cookie.match(new RegExp(`(^| )${localeCookie}=([^;]+)`))
    if (match && locales.includes(match[2] as Locale)) return match[2] as Locale
  } catch {}
  return defaultLocale
}

export function setLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale};path=/;max-age=31536000;SameSite=Lax`
  window.location.reload()
}

export function getLocaleLabel(locale: Locale): string {
  const map: Record<Locale, string> = { en: 'English', tr: 'Türkçe' }
  return map[locale]
}
