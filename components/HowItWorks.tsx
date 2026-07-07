'use client'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/components/translations'

export default function HowItWorks() {
  const { lang } = useLanguage()
  const t = translations[lang].how

  const stepMeta = [
    { num:'01', icon:'📸', color:'var(--pink)', bg:'var(--pink-soft)' },
    { num:'02', icon:'✍️', color:'var(--purple)', bg:'var(--purple-soft)' },
    { num:'03', icon:'🎁', color:'var(--orange)', bg:'#FFF3EA' },
  ]
  const steps = stepMeta.map((m, i) => ({ ...m, ...t.steps[i] }))

  return (
    <section id="how" className="py-24" style={{ background:'white' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="section-eyebrow">{t.eyebrow}</div>
          <h2 className="section-title text-4xl mb-3">{t.title}</h2>
          <div className="section-divider mx-auto"/>
          <p className="text-sm" style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="reveal text-center"
              style={{ animationDelay:`${i*0.15}s` }}
            >
              <div className="font-tajawal font-black text-5xl mb-3 opacity-10" style={{ color:step.color }}>
                {step.num}
              </div>
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-4"
                style={{ background:step.bg, border:`2px solid ${step.color}30` }}
              >
                {step.icon}
              </div>
              <h3 className="font-tajawal font-black text-xl mb-3" style={{ color:'var(--navy)' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Photo guidelines */}
        <div
          className="rounded-3xl p-6 md:p-8 reveal"
          style={{
            background:'linear-gradient(135deg, #FFF5F8, #FFF8EE)',
            border:'1.5px solid rgba(255,45,122,0.15)',
          }}
        >
          <h3 className="font-tajawal font-black text-lg mb-6 text-center" style={{ color:'var(--pink)' }}>
            {t.photoTitle}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color:'#E53E3E', fontFamily:'var(--font-body)' }}>
                {t.avoidTitle}
              </div>
              {t.avoidList.map((txt: string) => (
                <div key={txt} className="flex items-center gap-2 py-2 border-b text-sm" style={{ borderColor:'rgba(229,62,62,0.1)', color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>
                  <span style={{ color:'#E53E3E' }}>✗</span> {txt}
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color:'var(--teal)', fontFamily:'var(--font-body)' }}>
                {t.idealTitle}
              </div>
              {t.idealList.map((txt: string) => (
                <div key={txt} className="flex items-center gap-2 py-2 border-b text-sm" style={{ borderColor:'rgba(39,211,182,0.15)', color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>
                  <span style={{ color:'var(--teal)' }}>✓</span> {txt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
