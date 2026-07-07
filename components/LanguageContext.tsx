'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'en' | 'ar'

interface LanguageContextType {
  lang: Lang
  dir: 'ltr' | 'rtl'
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  dir: 'ltr',
  toggleLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = window.localStorage.getItem('batal-lang') as Lang | null
    if (saved === 'ar' || saved === 'en') setLang(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem('batal-lang', lang)
  }, [lang])

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'ar' : 'en'))
  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
