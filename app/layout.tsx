import type { Metadata } from 'next'
// import { Inter, Arima } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Preloader } from '@/components/preloader'
import './globals.css'
import config from "@/data/site-config.json"

const inter = { variable: '--font-inter' }
const arima = { variable: '--font-arima' }
/*
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const arima = Arima({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-arima',
  display: 'swap',
})
*/

export const metadata: Metadata = {
  title: 'Master ISI – Ingénierie des Systèmes Intelligents | FSAC',
  description:
    'Master en Ingénierie des Systèmes Intelligents – Faculté des Sciences Aïn Chock, Université Hassan II de Casablanca. Formation en Intelligence Artificielle, Machine Learning et Data Science.',
  keywords: ['Master ISI', 'Intelligence Artificielle', 'Machine Learning', 'Data Science', 'FSAC', 'Université Hassan II', 'Casablanca'],
  authors: [{ name: 'FSAC – Faculté des Sciences Aïn Chock' }],
  openGraph: {
    title: 'Master ISI – Ingénierie des Systèmes Intelligents',
    description: 'Formation d\'excellence en IA et Systèmes Intelligents à la FSAC, Université Hassan II de Casablanca.',
    type: 'website',
    locale: 'fr_MA',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: (config as any).customCss || "" }} />
      </head>
      <body className={`${inter.variable} ${arima.variable} font-sans antialiased`} suppressHydrationWarning>
        <Preloader />
        {children}
        <Analytics />
        {/* Scroll reveal observer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var io = new IntersectionObserver(function(entries){
                  entries.forEach(function(e){
                    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
                  });
                }, { threshold: 0.1 });
                function init(){ document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.shutter-reveal').forEach(function(el){ io.observe(el); }); }
                if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
