import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageContext'

export const metadata: Metadata = {
  title: 'Batal Stories — Your Child Is the Hero',
  description: "Personalized children's books by name and look — your child is the hero. Instant PDF or a printed book delivered across Egypt.",
  keywords: "kids stories, personalized book, kids gift, your child the hero, Batal Stories",
  openGraph: {
    title: 'Batal Stories — Your Child Is the Hero',
    description: "Personalized children's books by name and look",
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Tajawal:wght@400;500;700;900&family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
