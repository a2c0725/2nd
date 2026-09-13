'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useInsertionEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useGlobalInteractions } from '@/hooks/useGlobalInteractions'
import type { RootShellProps } from '@/types/ui'
import './style.module.scss'

export default function RootShell({ children }: RootShellProps) {
  const pathname = usePathname()
  const isProduct = pathname.startsWith('/product')
  const isHome = pathname === '/'

  useGlobalInteractions()

  // .container はページ遷移をまたいで RootShell に保持され続けるため、
  // Next.js のルーティングだけではスクロール位置がリセットされない。
  // 前のページで下までスクロールした状態のまま次のページに遷移すると、
  // 新しいページの内容が画面外にスクロールされた状態でマウントされてしまう
  // （BaseTitle の mount時位置計算にも影響する）。
  // BaseTitle 側の useLayoutEffect より必ず先に実行される必要があるため、
  // 同一コミット内で全ての useLayoutEffect より先に走ることが保証されている
  // useInsertionEffect でリセットする。
  // ただし URL にハッシュが付いている場合（Footerリンク等、useHomeInteractions が
  // 動いていないページからの「/#company」のようなハッシュ付き遷移や直URLアクセス）は、
  // ブラウザ本来のアンカー機能でそのハッシュ位置へスクロールさせたいため、
  // ここでは 0 にリセットしない
  useInsertionEffect(() => {
    if (window.location.hash) return
    const container = document.querySelector<HTMLElement>('.container')
    if (container) container.scrollTop = 0
  }, [pathname])

  return (
    <div className={clsx(isProduct && 'product')}>
      <Header />
      <main className="container">
        {children}
        <Footer />
        {isHome && <div className="scroll-arrow" />}
      </main>
    </div>
  )
}
