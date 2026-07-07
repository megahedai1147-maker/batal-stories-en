'use client'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/components/translations'

function useCountdown() {
  const getTimeLeft = () => {
    const now = new Date()
    const end = new Date()
    end.setHours(23, 59, 59, 999)
    const diff = end.getTime() - now.getTime()
    return {
      h: String(Math.floor(diff / 3600000)).padStart(2,'0'),
      m: String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0'),
      s: String(Math.floor((diff % 60000) / 1000)).padStart(2,'0'),
    }
  }
  const [time, setTime] = useState(getTimeLeft())
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function FomoBanner() {
  const time = useCountdown()
  const [visible, setVisible] = useState(true)
  const { lang } = useLanguage()
  const t = translations[lang].fomo

  if (!visible) return null

  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] flex items-center justify-center gap-3 flex-wrap px-4 py-2.5"
      style={{
        background: 'linear-gradient(90deg, #FF2D7A, #FF7A1A)',
        boxShadow: '0 2px 12px rgba(255,45,122,0.4)',
      }}
    >
      <span
        className="text-white font-bold text-sm whitespace-nowrap"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {t.text}
      </span>

      <div className="flex items-center gap-2">
        <span
          className="text-white text-sm line-through opacity-70"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          450 EGP
        </span>
        <span
          className="font-tajawal font-black text-base px-3 py-0.5 rounded-full"
          style={{ background: 'white', color: 'var(--pink)' }}
        >
          300 EGP
        </span>
      </div>

      <div className="flex items-center gap-1">
        {[time.h, time.m, time.s].map((val, i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              className="font-tajawal font-black text-sm px-2 py-0.5 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.25)',
                color: 'white',
                minWidth: '34px',
                textAlign: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >
              {val}
            </div>
            {i < 2 && (
              <span className="text-white font-black text-sm opacity-80">:</span>
            )}
          </div>
        ))}
      </div>

      <a
        href="#order"
        className="font-bold text-xs px-4 py-1.5 rounded-full whitespace-nowrap transition-all"
        style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-body)',
          textDecoration: 'none',
        }}
      >
        {t.cta}
      </a>

      <button
        onClick={() => setVisible(false)}
        className="absolute text-white opacity-70 hover:opacity-100 transition-opacity"
        style={{ [lang === 'ar' ? 'left' : 'right']: '12px', fontSize: '16px', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 } as any}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  )
}
