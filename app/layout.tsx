import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import EnhancedGoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import './globals.css'

// 字体配置 - 优化加载性能
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
})

// 元数据配置
export const metadata: Metadata = {
  title: '专业多媒体播控系统定制服务商 | 一站式技术解决方案',
  description:
    '10年+行业经验，提供全流程定制开发的多媒体播控系统。支持分布式群组控制、多协议兼容、云端+本地双重保障，为数字展馆、博物馆、企业展厅提供稳定可靠的解决方案。',
  keywords:
    '多媒体播控系统,数字展馆,博物馆控制系统,企业展厅,分布式控制,多屏联动,远程管控,ESP32控制,投影机控制,音频控制,灯光控制',
  authors: [{ name: '多媒体播控系统团队' }],
  creator: '多媒体播控系统团队',
  publisher: '多媒体播控系统团队',
  metadataBase: new URL('https://multimedia-control-system.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: '专业多媒体播控系统定制服务商 | 一站式技术解决方案',
    description: '10年+行业经验，提供全流程定制开发的多媒体播控系统',
    siteName: '多媒体播控系统',
    locale: 'zh_CN',
    url: 'https://multimedia-control-system.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '多媒体播控系统 - 专业定制服务',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '专业多媒体播控系统定制服务商',
    description: '10年+行业经验，提供全流程定制开发的多媒体播控系统',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'baidu-site-verification': 'your-baidu-verification-code',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// 环境变量配置
const isProduction = process.env.NEXT_PUBLIC_ENV === 'pro'
const gaId = process.env.NEXT_PUBLIC_GA_ID

// 根布局组件
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-CN' className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* 预加载关键资源 */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />

        {/* 图标和manifest */}
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />

        {/* 性能优化 */}
        <meta name='theme-color' content='#0ea5e9' />
        <meta name='color-scheme' content='light' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />

        {/* 结构化数据 */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '多媒体播控系统团队',
              description: '专业多媒体播控系统定制服务商',
              url: 'https://multimedia-control-system.com',
              logo: 'https://multimedia-control-system.com/logo.png',
              sameAs: [
                'https://github.com/multimedia-control-system',
                'https://twitter.com/multimedia_control',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+86-400-000-0000',
                contactType: 'customer service',
                areaServed: 'CN',
                availableLanguage: 'zh-CN',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
      {isProduction && gaId && <EnhancedGoogleAnalytics />}
    </html>
  )
}
