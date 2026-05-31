'use client'

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react'
import en from '@/messages/en.json'
import tr from '@/messages/tr.json'
import { getLocale, setLocale, type Locale, locales, defaultLocale } from './i18n'

type Messages = typeof en

const messagesMap: Record<Locale, Messages> = { en, tr }

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (path: string, params?: Record<string, string | number>) => string
  localeLabel: string
  locales: readonly Locale[]
}

const I18nContext = createContext<I18nContextValue | null>(null)

function resolvePath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) return (acc as Record<string, unknown>)[part]
    return undefined
  }, obj)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    setLocaleState(getLocale())
  }, [])

  const handleSetLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale)
  }, [])

  const t = useCallback((path: string, params?: Record<string, string | number>): string => {
    const msg = resolvePath(messagesMap[locale], path)
    let result = typeof msg === 'string' ? msg : path
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        result = result.replace(`{${key}}`, String(value))
      }
    }
    return result
  }, [locale])

  const value: I18nContextValue = {
    locale,
    setLocale: handleSetLocale,
    t,
    localeLabel: locale === 'tr' ? 'Türkçe' : 'English',
    locales,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useT() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useT must be used within I18nProvider')
  return ctx
}
