'use client'

import { useEffect } from 'react'
import type { SectionThreshold } from '@/types/scroll'

// jQuery の easing 'swing' 相当（easeInOutQuad ではなく sin ベースの既定イージング）
function swing(progress: number) {
  return 0.5 - Math.cos(progress * Math.PI) / 2
}

// href から末尾のハッシュ部分だけを取り出す。
// '#news' はもちろん、他ページから戻れるようにした '/#news' のような形式にも対応する
function extractHash(href: string | null): string | null {
  if (!href) return null
  const index = href.indexOf('#')
  if (index === -1) return null
  const hash = href.slice(index)
  return hash.length > 1 ? hash : null
}

/**
 * オリジナル(src/js/main.js)の jQuery 実装を DOM API でそのまま移植したもの。
 * スクロール連動のナビゲーション状態切り替え・パララックス・スムーススクロール・
 * ハンバーガーメニュー開閉・矢印クリック・小画面判定を、マウント時に一度だけ配線する。
 */
export function useHomeInteractions() {
  useEffect(() => {
    const container = document.querySelector<HTMLElement>('.container')
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.gnav-link'))
    const footer = document.querySelector<HTMLElement>('footer')

    if (!container) return

    // 各ナビゲーションリンクが指すセクションの、コンテナ先頭からの絶対スクロール位置しきい値を記録する。
    // getBoundingClientRect().top はビューポート基準の相対値のため、現在の scrollTop を足して
    // 絶対位置に変換する（URLハッシュ付きで直接その位置に着地し、mount 時点で scrollTop が
    // 0 でないケースでもしきい値がズレないようにするため）
    const sections: SectionThreshold[] = []
    navLinks.forEach((link) => {
      const hash = extractHash(link.getAttribute('href'))
      if (!hash) return
      const target = document.querySelector<HTMLElement>(hash)
      if (!target) return
      const absoluteTop = target.getBoundingClientRect().top + container!.scrollTop
      sections.push({
        id: hash,
        top: absoluteTop,
        bottom: absoluteTop + target.offsetHeight,
      })
    })
    const footerTop = footer
      ? footer.getBoundingClientRect().top + container.scrollTop
      : undefined

    function updateNavLinks() {
      const scrollPosition = container!.scrollTop
      let activeFound = false

      for (let i = 0; i < sections.length; i++) {
        if (scrollPosition >= sections[i].top && scrollPosition < sections[i].bottom) {
          navLinks.forEach((link) => link.classList.remove('current'))
          navLinks
            .filter((link) => extractHash(link.getAttribute('href')) === sections[i].id)
            .forEach((link) => link.classList.add('current'))

          document.body.className = document.body.className.replace(/(^|\s)section-\S+/g, '')
          document.body.classList.add(`section-${sections[i].id.replace('#', '')}`)

          activeFound = true
          break
        }
      }

      if (!activeFound && footerTop !== undefined && scrollPosition >= footerTop) {
        document.body.className = document.body.className.replace(/(^|\s)section-\S+/g, '')
        document.body.classList.add('section-footer')
        activeFound = true
      }

      if (!activeFound && scrollPosition === 0) {
        document.body.className = document.body.className.replace(/(^|\s)section-\S+/g, '')
        document.body.classList.add('section-top')
      }

      if (!activeFound) {
        navLinks.forEach((link) => link.classList.remove('current'))
      }
    }

    function handleContainerScroll() {
      updateNavLinks()
    }

    let smoothScrollRaf = 0
    function handleAnchorClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]')
      if (!anchor) return

      const hash = extractHash(anchor.getAttribute('href'))
      if (!hash) return
      const target = document.querySelector<HTMLElement>(hash)
      if (!target) return

      event.preventDefault()

      const speed = 1000
      const startTop = container!.scrollTop
      const position = Math.floor(target.getBoundingClientRect().top + startTop)
      const distance = position - startTop
      const startTime = performance.now()

      container!.style.scrollSnapType = 'none'
      cancelAnimationFrame(smoothScrollRaf)

      function step(now: number) {
        const elapsed = Math.min((now - startTime) / speed, 1)
        container!.scrollTop = startTop + distance * swing(elapsed)

        if (elapsed < 1) {
          smoothScrollRaf = requestAnimationFrame(step)
        } else {
          const finalPosition = Math.floor(container!.scrollTop)
          if (finalPosition !== position) {
            container!.scrollTop = position
          }
          window.setTimeout(() => {
            container!.style.scrollSnapType = 'y mandatory'
          }, 10)
          updateNavLinks()
        }
      }
      smoothScrollRaf = requestAnimationFrame(step)
    }

    function handleScrollArrowClick() {
      container!.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }

    container.addEventListener('scroll', handleContainerScroll)
    document.addEventListener('click', handleAnchorClick)
    document.querySelector('.scroll-arrow')?.addEventListener('click', handleScrollArrowClick)

    // マウント時点（初期スクロール位置）の状態を反映
    updateNavLinks()

    return () => {
      cancelAnimationFrame(smoothScrollRaf)
      container.removeEventListener('scroll', handleContainerScroll)
      document.removeEventListener('click', handleAnchorClick)
      document.querySelector('.scroll-arrow')?.removeEventListener('click', handleScrollArrowClick)
    }
  }, [])
}
