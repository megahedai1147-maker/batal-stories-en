# بطل ستوريز — الموقع الإلكتروني

## تشغيل المشروع محلياً

### المتطلبات
- Node.js 18+
- npm أو yarn

### الخطوات

```bash
# 1. فك ضغط الملف وادخل المجلد
cd batal-stories

# 2. ثبّت الحزم
npm install

# 3. شغّل الموقع
npm run dev
```

افتح المتصفح على: **http://localhost:3000**

---

## هيكل المشروع

```
batal-stories/
├── app/
│   ├── globals.css      ← الهوية البصرية والـ CSS الأساسي
│   ├── layout.tsx       ← Layout الرئيسي + Metadata
│   └── page.tsx         ← الصفحة الرئيسية
├── components/
│   ├── Navbar.tsx       ← شريط التنقل (Sticky + Mobile menu)
│   ├── Hero.tsx         ← القسم الأول
│   ├── Catalog.tsx      ← كتالوج القصص مع فلترة
│   ├── HowItWorks.tsx   ← كيف نطلب؟
│   ├── Pricing.tsx      ← الأسعار والباقات
│   ├── Reviews.tsx      ← آراء العملاء
│   ├── Order.tsx        ← فورم الطلب (WhatsApp)
│   └── Footer.tsx       ← التذييل
```

---

## التخصيص

### 1. رقم الواتساب
ابحث عن `201000000000` واستبدله برقمك في:
- `components/Catalog.tsx`
- `components/Pricing.tsx`
- `components/Order.tsx`
- `components/Footer.tsx`
- `app/page.tsx`

### 2. الألوان (في globals.css)
```css
--navy:  #0D1B2A   /* الأزرق الداكن */
--gold:  #D4A843   /* الذهبي */
--cream: #FBF5E6   /* الكريم */
--red:   #C0392B   /* الأحمر */
```

### 3. القصص (في Catalog.tsx)
الـ array `stories` — عدّل أو أضف قصص جديدة

### 4. الأسعار (في Pricing.tsx)
الـ array `plans` — عدّل الأسعار حسب ما تريد

---

## النشر على Vercel

```bash
npm install -g vercel
vercel
```

أو اربط الـ repo بـ Vercel مباشرة من vercel.com

---

## الميزات

- ✅ RTL عربي كامل
- ✅ Responsive (موبايل + تابلت + ديسكتوب)
- ✅ SEO محسّن
- ✅ WhatsApp integration
- ✅ فلترة القصص (جنس + عمر)
- ✅ فورم طلب متكامل
- ✅ Scroll reveal animations
- ✅ Sticky navbar مع mobile menu
- ✅ WhatsApp floating button
