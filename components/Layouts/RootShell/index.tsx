'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
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
