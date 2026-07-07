'use client'
import Image from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/components/translations'

export default function Footer() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const tn = t.nav
  const tf = t.footer

  const links = {
    [tf.quickLinks]: [
      { label:tn.stories,  href:'#catalog'  },
      { label:tn.pricing,  href:'#pricing'  },
      { label:tn.how,      href:'#how'      },
      { label:tn.reviews,  href:'#reviews'  },
      { label:t.order.title, href:'#order'  },
    ],
    [tf.contact]: [
      { label:'📘 Facebook',   href:'https://www.facebook.com/profile.php?id=61591547020659'  },
      { label:'📱 WhatsApp',   href:'https://wa.me/971501615994'           },
      { label:'📸 Instagram',  href:'https://instagram.com/batal.stories'  },
      { label:'🎵 TikTok',     href:'https://tiktok.com/@batal.stories'   },
    ],
  }

  return (
    <footer
      className="pt-16 pb-8"
      style={{
        background:'var(--navy)',
        borderTop:'4px solid transparent',
        borderImage:'linear-gradient(90deg,#FF2D7A,#FF7A1A,#FFC72C,#27D3B6,#7B3FF2) 1',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* ── BRAND ── */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Batal Stories"
                width={160}
                height={60}
                style={{ objectFit:'contain', height:'56px', width:'auto' }}
              />
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs mb-5"
              style={{ color:'rgba(255,255,255,0.45)', fontFamily:'var(--font-body)' }}
            >
              {tf.desc}
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-5"
              style={{
                background:'linear-gradient(90deg,#FF2D7A,#FF7A1A)',
                color:'white',
                fontFamily:'var(--font-body)',
              }}
            >
              {tf.slogan}
            </div>
            <div className="flex gap-3">
              {[
                { icon:'📘', href:'https://www.facebook.com/profile.php?id=61591547020659'  },
                { icon:'📸', href:'https://instagram.com/batal.stories'  },
                { icon:'🎵', href:'https://tiktok.com/@batal.stories'   },
              ].map((s,i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-all duration-200"
                  style={{
                    background:'rgba(255,255,255,0.08)',
                    border:'1px solid rgba(255,255,255,0.1)',
                    textDecoration:'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'var(--pink)'
                    el.style.transform  = 'translateY(-3px)'
                    el.style.boxShadow  = '0 6px 20px rgba(255,45,122,0.4)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.08)'
                    el.style.transform  = 'translateY(0)'
                    el.style.boxShadow  = 'none'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── LINKS ── */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <div
                className="text-xs font-black mb-4"
                style={{
                  color:'var(--pink)',
                  fontFamily:'var(--font-body)',
                  letterSpacing:'2px',
                  textTransform:'uppercase',
                }}
              >
                {title}
              </div>
              <div className="flex flex-col gap-2.5">
                {items.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      color:'rgba(255,255,255,0.5)',
                      fontFamily:'var(--font-body)',
                      textDecoration:'none',
                    }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--yellow)')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ borderTop:'1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Batal Stories"
              width={80}
              height={30}
              style={{ objectFit:'contain', height:'24px', width:'auto', opacity:0.4 }}
            />
            <p className="text-xs" style={{ color:'rgba(255,255,255,0.25)', fontFamily:'var(--font-body)' }}>
              {tf.rights}
            </p>
          </div>
          <p className="text-xs" style={{ color:'rgba(255,255,255,0.2)', fontFamily:'var(--font-body)' }}>
            {tf.madeIn}
          </p>
        </div>
      </div>
    </footer>
  )
}
