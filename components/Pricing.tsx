'use client'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/components/translations'

const planMeta = [
  { id:'pdf', icon:'📱', popular:false, accentColor:'var(--purple)',
    tierPrices:[50, 130, 220] },
  { id:'print', icon:'📚', popular:true, accentColor:'var(--pink)',
    tierPrices:[100, 160] },
  { id:'premium', icon:'👑', popular:false, accentColor:'var(--orange)',
    tierPrices:[349] },
]

export default function Pricing() {
  const { lang } = useLanguage()
  const t = translations[lang].pricing

  const plans = planMeta.map((m, i) => ({ ...m, ...t.plans[i] }))

  return (
    <section id="pricing" className="py-24" style={{ background:'#F7F8FC' }}>
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

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan: any, i) => (
            <div
              key={plan.id}
              className="reveal relative rounded-3xl overflow-hidden"
              style={{
                animationDelay:`${i*0.1}s`,
                background:'white',
                border: plan.popular ? `2px solid var(--pink)` : '1.5px solid var(--gray-mid)',
                boxShadow: plan.popular ? '0 8px 40px rgba(255,45,122,0.18)' : '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              {plan.popular && (
                <div className="text-center text-xs font-bold py-2 text-white" style={{ background:'var(--grad-btn)', fontFamily:'var(--font-body)' }}>
                  {t.popularRibbon}
                </div>
              )}

              <div className="p-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background:`${plan.accentColor}15`, border:`1.5px solid ${plan.accentColor}25` }}
                >
                  {plan.icon}
                </div>
                <h3 className="font-tajawal font-black text-xl mb-1" style={{ color:'var(--navy)' }}>{plan.name}</h3>
                <p className="text-xs mb-5" style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>{plan.tagline}</p>

                {/* Tiers */}
                <div className="flex flex-col gap-2 mb-5">
                  {plan.tiers.map((tier: any, ti: number) => {
                    const price = plan.tierPrices[ti]
                    const oldPrice = plan.oldPrices?.[ti]
                    const highlight = ti === 1 || (plan.tiers.length === 1)
                    return (
                      <div
                        key={tier.label}
                        className="flex items-center justify-between rounded-2xl px-3 py-3"
                        style={{
                          background: highlight ? `${plan.accentColor}10` : '#F7F8FC',
                          border:     highlight ? `1.5px solid ${plan.accentColor}30` : '1.5px solid transparent',
                        }}
                      >
                        <div>
                          <div className="text-sm font-bold" style={{ color:'var(--navy)', fontFamily:'var(--font-body)' }}>{tier.label}</div>
                          {tier.priceNote && <div className="text-xs" style={{ color:plan.accentColor, fontFamily:'var(--font-body)' }}>{tier.priceNote}</div>}
                        </div>
                        <div className="flex items-center gap-2">
                          {oldPrice && (
                            <div className="text-sm line-through" style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)', opacity:0.5 }}>
                              {oldPrice} AED
                            </div>
                          )}
                          <div className="font-tajawal font-black text-xl" style={{ color:plan.accentColor }}>{price} AED</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Features */}
                <div className="flex flex-col gap-2 mb-5">
                  {plan.features.map((f: string) => (
                    <div key={f} className="flex items-center gap-2 text-sm" style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                        style={{ background:`${plan.accentColor}15`, color:plan.accentColor }}
                      >✓</span>
                      {f}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/971501615994?text=${encodeURIComponent(`${t.whatsappText} ${plan.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={plan.popular ? 'btn-primary w-full justify-center py-3' : ''}
                  style={!plan.popular ? {
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background:`${plan.accentColor}15`, color:plan.accentColor,
                    fontFamily:'var(--font-body)', fontWeight:700, fontSize:'14px',
                    borderRadius:'50px', padding:'12px', border:`1.5px solid ${plan.accentColor}30`,
                    textDecoration:'none', transition:'all 0.2s',
                  } : { display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-body)' }}
                >
                  {t.orderNow}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
