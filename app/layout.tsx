import '@/styles/global.scss'

import type { Metadata } from 'next'
import RootShell from '@/components/Layouts/RootShell'
import type { RootLayoutProps } from '@/types/ui'

const SITE_NAME = '株式会社2nd｜東京都東村山の不動産・リフォーム・建築会社'
const SITE_URL = 'https://2nd-inc.com'
const DESCRIPTION =
  '株式会社2ndは、東京都東村山を中心に不動産業、建築事業、リフォーム事業、を展開する会社です。不動産の売買・賃貸から建築・リフォームまで、地域密着でお客様の暮らしをサポートします。'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: DESCRIPTION,
  keywords:
    '不動産, 建築, リフォーム, 建設, 株式会社2nd, 東村山, 久米川, 東京都, 関東, 不動産業者, 建築業, リフォーム業者, 建設業, 会社説明',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [{ url: '/img/ogp.png' }],
  },
  twitter: {
    card: 'summary',
    site: '@2nd_inc_',
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Serif+JP:wght@200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <RootShell>{children}</RootShell>
      </body>
    </html>
  )
}
