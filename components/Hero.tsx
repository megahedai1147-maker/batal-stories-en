'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/components/translations'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { lang, dir } = useLanguage()
  const t = translations[lang].hero

  useEffect(() => {
    setTimeout(() => ref.current?.classList.add('visible'), 120)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #FFF5F8 0%, #FFF8EE 50%, #F5FFFE 100%)' }}
    >
      <BlobDecor />
      <FloatingDeco />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ── TEXT ── */}
          <div ref={ref} className="reveal">
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-xs font-bold"
              style={{
                background: 'white',
                border: '1.5px solid var(--pink)',
                color: 'var(--pink)',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 2px 10px rgba(255,45,122,0.12)',
              }}
            >
              <span>⭐</span>
              <span>{t.badge}</span>
            </div>

            <h1
              className="font-tajawal font-black leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem,5.5vw,3.8rem)', color: 'var(--navy)' }}
            >
              {t.titleLine1}{' '}
              <span className="text-gradient">{t.titleGradient}</span>
              <br />
              {t.titleLine2}
            </h1>

            <p
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: 'var(--gray-text)', fontFamily: 'var(--font-body)' }}
            >
              {t.desc}{' '}
              <strong style={{ color: 'var(--pink)' }}>{t.descStrong}</strong>
            </p>

            <div
              className="flex flex-wrap gap-5 mb-8 py-4 border-y"
              style={{ borderColor: 'rgba(255,45,122,0.15)' }}
            >
              {[
                { num: t.stat1Num, label: t.stat1Label, icon: '👦', color: 'var(--pink)'   },
                { num: t.stat2Num, label: t.stat2Label, icon: '⚡', color: 'var(--orange)' },
                { num: t.stat3Num, label: t.stat3Label, icon: '✨', color: 'var(--purple)' },
              ].map(s => (
                <div key={s.num+s.label} className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg"
                    style={{ background: `${s.color}15` }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-tajawal font-black text-xl leading-none" style={{ color: s.color }}>
                      {s.num}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--gray-text)', fontFamily: 'var(--font-body)' }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#order"   className="btn-primary text-base px-7 py-4">{t.ctaPrimary}</a>
              <a href="#catalog" className="btn-outline text-base px-7 py-4">{t.ctaSecondary}</a>
            </div>
          </div>

          {/* ── HERO IMAGE ── */}
          <div className="hidden lg:flex justify-center items-center relative">
            <HeroImage t={t} dir={dir} />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0 wavy-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80 C240 30 480 60 720 40 C960 20 1200 55 1440 20 L1440 80 Z" fill="#F7F8FC"/>
        </svg>
      </div>
    </section>
  )
}


/* ── HERO IMAGE ── */
function HeroImage({ t, dir }: { t: any; dir: 'ltr'|'rtl' }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width:'520px', height:'520px' }}>
      <div className="absolute inset-8 rounded-full blur-3xl opacity-40"
        style={{ background:'linear-gradient(135deg, #FF2D7A55, #FF7A1A44, #27D3B633)' }}/>
      <div className="relative z-10 animate-float-slow" style={{ width:'480px', height:'480px' }}>
        <Image src="/hero-image.png" alt={t.imgAlt} fill style={{ objectFit:'contain' }} priority/>
      </div>
      <div className="absolute top-12 left-0 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm text-white animate-float"
        style={{ background:'var(--teal)', boxShadow:'0 4px 16px rgba(39,211,182,0.4)', fontFamily:'var(--font-body)', animationDelay:'0.5s', zIndex:20, direction:dir, unicodeBidi:'plaintext' }}>
        {t.badgeDelivery}
      </div>
      <div className="absolute top-1/2 -left-4 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm animate-float"
        style={{ background:'var(--yellow)', color:'var(--navy)', boxShadow:'0 4px 16px rgba(255,199,44,0.4)', fontFamily:'var(--font-body)', animationDelay:'1.2s', zIndex:20, direction:dir, unicodeBidi:'plaintext' }}>
        {t.badgeCustom}
      </div>
      <div className="absolute bottom-12 left-4 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white animate-float"
        style={{ background:'var(--grad-btn)', boxShadow:'0 4px 20px rgba(255,45,122,0.4)', fontFamily:'var(--font-body)', animationDelay:'2s', zIndex:20, direction:dir, unicodeBidi:'plaintext' }}>
        {t.badgePrice}
      </div>
    </div>
  )
}

/* ── BACKGROUND BLOBS ── */
function BlobDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -top-20 -right-20 w-96 h-96 opacity-30 animate-blob"
        style={{ background: 'radial-gradient(circle, #FF2D7A40, transparent 70%)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
      />
      <div
        className="absolute bottom-10 -left-20 w-80 h-80 opacity-20 animate-blob"
        style={{ background: 'radial-gradient(circle, #27D3B640, transparent 70%)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', animationDelay: '4s' }}
      />
      <div
        className="absolute top-1/3 left-1/3 w-64 h-64 opacity-15 animate-blob"
        style={{ background: 'radial-gradient(circle, #FFC72C40, transparent 70%)', borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%', animationDelay: '2s' }}
      />
    </div>
  )
}

function FloatingDeco() {
  const items = [
    { emoji: '⭐', top: '12%', right: '8%',  size: 36, delay: '0s',   dur: '4s' },
    { emoji: '🌙', top: '22%', right: '18%', size: 28, delay: '1s',   dur: '6s' },
    { emoji: '🎨', top: '65%', right: '6%',  size: 32, delay: '0.5s', dur: '5s' },
    { emoji: '💫', top: '8%',  left: '6%',   size: 24, delay: '1.5s', dur: '5s' },
    { emoji: '🌈', top: '80%', left: '8%',   size: 30, delay: '0.8s', dur: '6s' },
  ]
  return (
    <>
      {items.map((it, i) => (
        <div
          key={i}
          className="absolute select-none"
          style={{
            top: it.top,
            right: (it as any).right,
            left: (it as any).left,
            fontSize: `${it.size}px`,
            animation: `floatUp ${it.dur} ease-in-out infinite`,
            animationDelay: it.delay,
            opacity: 0.65,
            zIndex: 1,
          }}
        >
          {it.emoji}
        </div>
      ))}
    </>
  )
}
