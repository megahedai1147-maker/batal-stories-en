'use client'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/components/translations'

const reviewsData = {
  en: [
    { name:'Salma', city:'Dubai', text:'My son saw his name on the cover — he stopped, looked at it and said: Mom, is this me?! He kept reading the book by himself three times in one day', stars:5, tag:'Printed Book', tagColor:'var(--pink)' },
    { name:'Yara', city:'Abu Dhabi', text:'Such a special birthday gift — my daughter was so happy seeing herself as the hero of the story. Thank you Batal Stories ❤️', stars:5, tag:'Premium Gift', tagColor:'var(--orange)' },
    { name:'Layla', city:'Sharjah', text:'Faster than expected — I ordered the PDF and got it in less than 24 hours. Excellent quality and the pictures really look like my daughter', stars:5, tag:'PDF Edition', tagColor:'var(--purple)' },
    { name:'Ghada', city:'Ajman', text:'I was worried about the quality but I was pleasantly surprised! The illustrations are great and the story is beautifully written. I\u2019ll order again soon', stars:5, tag:'PDF Edition', tagColor:'var(--purple)' },
    { name:'Dina', city:'Al Ain', text:'The printed book is a masterpiece — beautiful packaging and excellent printing. My daughter reads it every day and learns from it', stars:5, tag:'Printed Book', tagColor:'var(--pink)' },
    { name:'Rana', city:'Ras Al Khaimah', text:'Super easy to deal with, and communication on WhatsApp is simple. They\u2019re always ready to answer questions. I\u2019ll recommend it to all my friends', stars:5, tag:'Premium Gift', tagColor:'var(--orange)' },
  ],
  ar: [
    { name:'سلمى',  city:'القاهرة',     text:'ابني لما شاف اسمه على الغلاف — وقف وبص وقالي: ماما ده أنا؟! وفضل يقرأ الكتاب لوحده 3 مرات في يوم واحد', stars:5, tag:'كتاب مطبوع',  tagColor:'var(--pink)'   },
    { name:'يارا', city:'الإسكندرية',  text:'هدية عيد ميلاد مش عادية خالص — بنتي فرحت جداً لما شافت نفسها بطلة القصة. شكراً Batal Stories ❤️',                 stars:5, tag:'Premium هدية', tagColor:'var(--orange)' },
    { name:'ليلى',  city:'الجيزة',      text:'أسرع من المتوقع — طلبت الـ PDF وجالي في أقل من 24 ساعة. الجودة ممتازة والصور تشبه بنتى جداً',                 stars:5, tag:'نسخة PDF',    tagColor:'var(--purple)' },
    { name:'غادة',   city:'المنصورة',    text:'كنت خايفة من الجودة بس اتفاجأت جداً! الصور محترمة والقصة مكتوبة بأسلوب جميل. هطلب تاني قريب',                  stars:5, tag:'نسخة PDF',    tagColor:'var(--purple)' },
    { name:'دينا',  city:'القاهرة',     text:'الكتاب المطبوع تحفة — التغليف قيم والطباعة ممتازة. بنتى بتقرأه كل يوم وبتتعلم منه',                          stars:5, tag:'كتاب مطبوع',  tagColor:'var(--pink)'   },
    { name:'رنا',  city:'أسوان',       text:'التعامل سهل جداً والتواصل على واتساب بسيط. جاهزين دايماً يردوا على الأسئلة. هنصح كل اصحابى بيه',                    stars:5, tag:'Premium هدية', tagColor:'var(--orange)' },
  ],
}

export default function Reviews() {
  const { lang } = useLanguage()
  const t = translations[lang].reviews
  const reviews = reviewsData[lang]

  return (
    <section id="reviews" className="py-24" style={{ background:'linear-gradient(135deg,#FFF5F8,#FFF8EE)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="section-eyebrow">{t.eyebrow}</div>
          <h2 className="section-title text-4xl mb-3">{t.title}</h2>
          <div className="section-divider mx-auto"/>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_,i) => (
              <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#FFC72C">
                <polygon points="10,1 12,7 19,7 13,11 15,18 10,14 5,18 7,11 1,7 8,7"/>
              </svg>
            ))}
            <span className="text-sm mx-2" style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>{t.ratingSuffix}</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="reveal rounded-3xl p-5"
              style={{
                animationDelay:`${i*0.08}s`,
                background:'white',
                border:'1.5px solid rgba(255,45,122,0.1)',
                boxShadow:'0 4px 20px rgba(255,45,122,0.07)',
              }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.stars)].map((_,j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 20 20" fill="#FFC72C">
                    <polygon points="10,1 12,7 19,7 13,11 15,18 10,14 5,18 7,11 1,7 8,7"/>
                  </svg>
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold"
                    style={{ background:'var(--pink-soft)', color:'var(--pink)', fontFamily:'var(--font-display)' }}
                  >
                    {r.name.slice(0,1)}
                  </div>
                  <div>
                    <div className="text-xs font-bold" style={{ color:'var(--navy)', fontFamily:'var(--font-body)' }}>{r.name}</div>
                    <div className="text-xs" style={{ color:'var(--gray-text)', fontFamily:'var(--font-body)' }}>{r.city}</div>
                  </div>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full font-bold"
                  style={{ background:`${r.tagColor}15`, color:r.tagColor, border:`1px solid ${r.tagColor}25`, fontFamily:'var(--font-body)' }}
                >
                  {r.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
