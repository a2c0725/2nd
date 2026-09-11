'use client'

import { useEffect } from 'react'

/**
 * Home・Product問わず全ページ共通で必要な操作。
 * ハンバーガーメニューの開閉と、画面高さに応じた small-device 判定を配線する。
 */
export function useGlobalInteractions() {
  useEffect(() => {
    let menuOpen = false
    const menuIcon = document.querySelector<HTMLElement>('.menu-icon')
    const overlay = document.querySelector<HTMLElement>('.overlay')
    const spGnav = document.querySelector<HTMLElement>('.sp-gnav')

    function closeMenu() {
      menuOpen = false
      document.body.classList.remove('menu-open')
      document.body.style.overflow = ''
      menuIcon?.classList.remove('active')
      if (spGnav) spGnav.style.right = '-100vw'
    }

    function handleMenuIconClick() {
      if (!menuOpen) {
        menuOpen = true
        document.body.classList.add('menu-open')
        document.body.style.overflow = 'hidden'
        menuIcon?.classList.add('active')
        window.setTimeout(() => {
          if (spGnav) spGnav.style.right = '0'
        }, 300)
      } else {
        closeMenu()
      }
    }

    function checkWindowSize() {
      document.body.classList.toggle('small-device', window.innerHeight <= 680)
    }

    menuIcon?.addEventListener('click', handleMenuIconClick)
    overlay?.addEventListener('click', closeMenu)
    spGnav?.addEventListener('click', closeMenu)
    window.addEventListener('load', checkWindowSize)
    window.addEventListener('resize', checkWindowSize)

    // マウント時点の画面サイズを反映
    checkWindowSize()

    return () => {
      menuIcon?.removeEventListener('click', handleMenuIconClick)
      overlay?.removeEventListener('click', closeMenu)
      spGnav?.removeEventListener('click', closeMenu)
      window.removeEventListener('load', checkWindowSize)
      window.removeEventListener('resize', checkWindowSize)
    }
  }, [])
}
