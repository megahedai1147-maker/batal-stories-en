'use client'
import { useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/components/translations'

const pkgIds = ['pdf1','pdf3','pdf6','print','premium']
const pkgPrices: Record<string,{price:string, newPrice?:string, popular?:boolean}> = {
  pdf1:{price:'80 EGP'}, pdf3:{price:'199 EGP', popular:true}, pdf6:{price:'349 EGP'},
  print:{price:'450 EGP', newPrice:'300 EGP'}, premium:{price:'650 EGP'},
}
const langIds = ['ar','en','both']

export default function Order() {
  const { lang } = useLanguage()
  const t = translations[lang].order
  const [form, setForm] = useState({ childName:'', age:'', interests:'', package:'pdf3', language:'ar', notes:'' })

  const packages = pkgIds.map((id, i) => ({ id, ...pkgPrices[id], label: t.packages[i].label }))
  const languages = langIds.map((id, i) => ({ id, label: t.languages[i].label }))

  const pkgLabels: Record<string,string> = Object.fromEntries(
    packages.map(p => [p.id, `${p.label} — ${p.newPrice ?? p.price}`])
  )
  const langLabels: Record<string,string> = Object.fromEntries(
    languages.map(l => [l.id, l.label])
  )

  const buildMessage = () => [
    t.waHeader, '',
    `${t.waName}: ${form.childName || '—'}`,
    `${t.waAge}: ${form.age || '—'}`,
    `${t.waInterests}: ${form.interests || '—'}`,
    `${t.waPackage}: ${pkgLabels[form.package]}`,
    `${t.waLanguage}: ${langLabels[form.language]}`,
    form.notes ? `${t.waNotes}: ${form.notes}` : '',
  ].filter(Boolean).join('\n')

  const handleSubmit = () => {
    if (!form.childName.trim()) { alert(t.alertName); return }
    window.open(`https://wa.me/201034502000?text=${encodeURIComponent(buildMessage())}`, '_blank')
  }

  const inputBase = {
    background:'#F7F8FC', border:'1.5px solid var(--gray-mid)',
    color:'var(--navy)', fontFamily:'var(--font-body)', borderRadius:'16px',
    width:'100%', padding:'12px 16px', fontSize:'14px', outline:'none',
    transition:'all 0.2s',
  }
  const focusStyle = { borderColor:'var(--pink)', background:'white', boxShadow:'0 0 0 3px rgba(255,45,122,0.1)' }

  return (
    <section id="order" className="py-24" style={{ background:'white' }}>
      <div className="max-w-xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 reveal">
          <div className="section-eyebrow">{t.eyebrow}</div>
          <h2 className="section-title text-4xl mb-3">{t.title}</h2>
          <div className="section-divider mx-auto"/>
          <p className="text-sm" style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Form card */}
        <div
          className="reveal rounded-3xl p-6 sm:p-8"
          style={{
            background:'linear-gradient(135deg,#FFF5F8,#FFF8EE)',
            border:'1.5px solid rgba(255,45,122,0.15)',
            boxShadow:'0 8px 40px rgba(255,45,122,0.1)',
          }}
        >
          <div className="flex flex-col gap-5">

            {/* Name */}
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color:'var(--navy)', fontFamily:'var(--font-body)', letterSpacing:'1px' }}>{t.childName}</label>
              <input
                type="text" placeholder={t.childNamePh}
                value={form.childName} onChange={e => setForm({...form, childName:e.target.value})}
                style={inputBase}
                onFocus={e => Object.assign(e.target.style, {...inputBase,...focusStyle})}
                onBlur={e => Object.assign(e.target.style, inputBase)}
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color:'var(--navy)', fontFamily:'var(--font-body)', letterSpacing:'1px' }}>{t.age}</label>
              <input
                type="text" placeholder={t.agePh}
                value={form.age} onChange={e => setForm({...form, age:e.target.value})}
                style={inputBase}
                onFocus={e => Object.assign(e.target.style, {...inputBase,...focusStyle})}
                onBlur={e => Object.assign(e.target.style, inputBase)}
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color:'var(--navy)', fontFamily:'var(--font-body)', letterSpacing:'1px' }}>{t.interests}</label>
              <input
                type="text" placeholder={t.interestsPh}
                value={form.interests} onChange={e => setForm({...form, interests:e.target.value})}
                style={inputBase}
                onFocus={e => Object.assign(e.target.style, {...inputBase,...focusStyle})}
                onBlur={e => Object.assign(e.target.style, inputBase)}
              />
            </div>

            {/* Package */}
            <div>
              <label className="block text-xs font-bold mb-3" style={{ color:'var(--navy)', fontFamily:'var(--font-body)', letterSpacing:'1px' }}>{t.packageLabel}</label>
              <div className="flex flex-col gap-2">
                {packages.map(p => (
                  <button
                    key={p.id} type="button"
                    onClick={() => setForm({...form, package:p.id})}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200"
                    style={{
                      background: form.package === p.id ? 'white' : 'rgba(255,255,255,0.6)',
                      border: form.package === p.id ? '2px solid var(--pink)' : '1.5px solid var(--gray-mid)',
                      color: form.package === p.id ? 'var(--navy)' : 'var(--gray-text)',
                      fontFamily:'var(--font-body)',
                      boxShadow: form.package === p.id ? '0 2px 12px rgba(255,45,122,0.15)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs border-2 transition-all"
                        style={{
                          borderColor: form.package === p.id ? 'var(--pink)' : 'var(--gray-mid)',
                          background:  form.package === p.id ? 'var(--pink)' : 'transparent',
                          color: 'white',
                        }}
                      >
                        {form.package === p.id && '✓'}
                      </div>
                      {p.label}
                      {p.popular && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background:'var(--yellow)', color:'var(--navy)' }}>{t.mostPopular}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {p.newPrice && (
                        <span style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)', fontSize:'12px', textDecoration:'line-through', opacity:0.5 }}>{p.price}</span>
                      )}
                      <span style={{ color:'var(--pink)', fontFamily:'var(--font-display)', fontWeight:800 }}>
                        {p.newPrice ?? p.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-xs font-bold mb-3" style={{ color:'var(--navy)', fontFamily:'var(--font-body)', letterSpacing:'1px' }}>{t.languageLabel}</label>
              <div className="flex gap-2">
                {languages.map(l => (
                  <button
                    key={l.id} type="button"
                    onClick={() => setForm({...form, language:l.id})}
                    className="flex-1 py-3 rounded-2xl text-xs font-bold transition-all duration-200"
                    style={{
                      background: form.language === l.id ? 'var(--grad-btn)' : 'rgba(255,255,255,0.8)',
                      color:      form.language === l.id ? 'white' : 'var(--gray-text)',
                      border:     form.language === l.id ? 'none' : '1.5px solid var(--gray-mid)',
                      fontFamily: 'var(--font-body)',
                      boxShadow:  form.language === l.id ? '0 4px 14px rgba(255,45,122,0.25)' : 'none',
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color:'var(--navy)', fontFamily:'var(--font-body)', letterSpacing:'1px' }}>{t.notes}</label>
              <textarea
                rows={3} placeholder={t.notesPh}
                value={form.notes} onChange={e => setForm({...form, notes:e.target.value})}
                style={{...inputBase, resize:'none'}}
                onFocus={e => Object.assign(e.target.style, {...inputBase,...focusStyle, resize:'none'})}
                onBlur={e => Object.assign(e.target.style, {...inputBase, resize:'none'})}
              />
            </div>

            {/* Submit */}
            <button
              type="button" onClick={handleSubmit}
              className="btn-primary w-full justify-center py-4 text-base mt-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.948-1.413A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
              {t.submit}
            </button>

            <p className="text-center text-xs" style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>
              {t.footNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
