'use client'
import { useEffect } from 'react'
import FomoBanner  from '@/components/FomoBanner'
import Navbar      from '@/components/Navbar'
import Hero        from '@/components/Hero'
import Catalog     from '@/components/Catalog'
import HowItWorks  from '@/components/HowItWorks'
import Pricing     from '@/components/Pricing'
import Reviews     from '@/components/Reviews'
import Order       from '@/components/Order'
import Footer      from '@/components/Footer'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/components/translations'

export default function Home() {
  const { lang } = useLanguage()
  const t = translations[lang]

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <FomoBanner />
      <Navbar />
      <Hero />
      <Catalog />
      <HowItWorks />
      <Pricing />
      <Reviews />
      <Order />
      <Footer />

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/971501615994?text=${encodeURIComponent(t.whatsappGreeting)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label={t.whatsappFloat}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.948-1.413A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
        </svg>
      </a>
    </main>
  )
}
