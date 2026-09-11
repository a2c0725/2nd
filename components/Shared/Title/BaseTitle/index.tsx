'use client'

import clsx from 'clsx'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { getNavItem } from '@/constants/nav'
import type { SectionTitleProps } from '@/types/ui'
import { usedClasses } from '@/utility/usedClasses'
import styles from './style.module.scss'

// SSR時はuseLayoutEffectがwarningを出すため、クライアントでのみuseLayoutEffectを使う
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

// 見出し脇の line が、画面に入ってくるのに少し遅れて追従するアニメーション。
// mount時（ボタン遷移・直URLアクセス）と、実際のスクロール時とで挙動が異なるため、
// 2つの line 要素（mountLine/scrollLine）を切り替えて表示する。
// - mountLine: mount時にのみ表示。縦位置は即座に確定し、横スライドだけアニメーションする
// - scrollLine: 実際に scroll が発生してから表示され、以降は縦位置が追従アニメーションする。
//   下スクロールで画面内に入る時は上から下へ、上スクロールで画面内に入る時は下から上へ、
//   スクロール方向に応じて待機位置(fromBelowの有無)を切り替えることで表現する。
//   画面内に入った/出たの検出は IntersectionObserver で行う（rAFでのポーリングは
//   検出タイミングがずれてアニメーションが途中で止まることがあるため使用しない）。
//   wheel/scroll イベントは、画面外にいる間の待機位置(fromBelow)をスクロール方向に
//   合わせて更新するためだけに使う。
export default function BaseTitle({
  navId,
  label,
  kana,
  prefix,
  subTitle,
  type,
  used,
}: SectionTitleProps) {
  const resolved = navId ? getNavItem(navId) : undefined
  const resolvedLabel = label ?? resolved?.label ?? ''
  const resolvedKana = kana ?? resolved?.sectionTitleKana ?? resolved?.kana ?? ''
  const resolvedSubTitle = subTitle ?? resolved?.subTitle
  const mountLineRef = useRef<HTMLDivElement>(null)
  const scrollLineRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const mountLine = mountLineRef.current
    const scrollLine = scrollLineRef.current
    if (!mountLine || !scrollLine) return

    // ホームページでは line を内包する section 単位で判定し、
    // section が無い場合（Product ページ等）は見出し(h2)自体を基準にする
    const boundsElement = mountLine.closest('section') ?? mountLine.closest('h2')

    function computeOnScreen() {
      if (!boundsElement) return null
      const windowHeight = window.innerHeight
      const rect = boundsElement.getBoundingClientRect()
      const offset = rect.top
      const bottom = offset + boundsElement.clientHeight
      return windowHeight > offset && bottom > 0
    }

    const scrollTarget: HTMLElement | Window =
      document.querySelector<HTMLElement>('.container') ?? window
    function getScrollTop() {
      return scrollTarget instanceof Window ? window.scrollY : scrollTarget.scrollTop
    }

    // mount時点の位置を mountLine に反映する（top には transition が無いため常に瞬時）
    const initialOnScreen = computeOnScreen()
    if (initialOnScreen !== null) {
      mountLine.classList.toggle(styles.onScreen, initialOnScreen)
      requestAnimationFrame(() => {
        mountLine!.classList.add(styles.revealed)
      })
    }

    let direction: 'up' | 'down' = 'down'
    let lastScrollTop = getScrollTop()
    let lastOnScreen: boolean | null = null
    let lastDirection: 'up' | 'down' | null = null
    let hasScrolled = false

    // scrollLine の状態を最新の onScreen / スクロール方向に同期する。
    // 画面外にいる間の待機位置の切り替えは常に瞬時（transition を一時的に無効化）で行い、
    // 画面内に入る瞬間だけ transition を効かせてアニメーションさせる
    function syncScrollLine(onScreen: boolean | null) {
      if (onScreen === null) return

      if (onScreen) {
        if (lastOnScreen !== true) {
          // wheel は passive のため、ブラウザの実スクロールと並行して処理されることがあり、
          // 画面外での待機位置(fromBelow)の事前同期が間に合わないケースがある。
          // そのため画面内に入る直前で、現在のスクロール方向と待機位置が
          // 食い違っていないかを必ず確認し、食い違っていれば瞬時（transition無効）で
          // 正しい待機位置に補正してからアニメーションを開始する
          const wantFromBelow = direction === 'up'
          if (scrollLine!.classList.contains(styles.fromBelow) !== wantFromBelow) {
            scrollLine!.style.transition = 'none'
            scrollLine!.classList.toggle(styles.fromBelow, wantFromBelow)
            void scrollLine!.offsetHeight
            scrollLine!.style.transition = ''
          }
          scrollLine!.classList.remove(styles.fromBelow)
          scrollLine!.classList.add(styles.onScreen)
        }
      } else if (lastOnScreen !== false || lastDirection !== direction) {
        scrollLine!.style.transition = 'none'
        scrollLine!.classList.remove(styles.onScreen)
        scrollLine!.classList.toggle(styles.fromBelow, direction === 'up')
        void scrollLine!.offsetHeight
        scrollLine!.style.transition = ''
      }

      lastOnScreen = onScreen
      lastDirection = direction
    }

    // scrollLine は非表示のうちに現在の状態へ即座に合わせておく
    syncScrollLine(initialOnScreen)

    // wheel は passive のため実際のスクロールと並行して処理されることがあり、
    // ここでの同期が必ず画面内に入る前に間に合うとは限らない（間に合わない場合の
    // フォールバックは syncScrollLine 内の onScreen 分岐で行う）。
    // 間に合った場合は無駄な瞬時切り替えを避けられるため、事前同期として残しておく
    function handleWheel(event: WheelEvent) {
      if (event.deltaY > 0) direction = 'down'
      else if (event.deltaY < 0) direction = 'up'
      syncScrollLine(computeOnScreen())
    }

    // touch操作やキーボード操作など wheel イベントが発生しない場合のために、
    // scroll イベントからも方向を確定させて待機位置を同期する
    function handleScroll() {
      const currentScrollTop = getScrollTop()
      if (currentScrollTop > lastScrollTop) direction = 'down'
      else if (currentScrollTop < lastScrollTop) direction = 'up'
      lastScrollTop = currentScrollTop

      syncScrollLine(computeOnScreen())

      if (!hasScrolled) {
        hasScrolled = true
        scrollLine!.classList.add(styles.shown)
        mountLine!.style.display = 'none'
      }
    }

    // 画面内に入った/出たの検出トリガーとして IntersectionObserver を使う。
    // ただし entry.isIntersecting はコールバックの発火自体が遅延することがあり、
    // 連続で素早くスクロールすると古い（もう無効な）交差状態が届いてしまうことがある。
    // そのため isIntersecting の値は使わず、発火した時点で computeOnScreen() を
    // 同期的に再計算して最新の状態を反映する
    const observer = new IntersectionObserver(
      () => {
        syncScrollLine(computeOnScreen())
      },
      { root: scrollTarget instanceof Window ? null : scrollTarget, threshold: 0 },
    )
    if (boundsElement) observer.observe(boundsElement)

    scrollTarget.addEventListener('wheel', handleWheel as EventListener, { passive: true })
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      scrollTarget.removeEventListener('wheel', handleWheel as EventListener)
      scrollTarget.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <h2 className={clsx(styles.baseTitle, type === 'white' && styles.white, usedClasses(styles, used))}>
      <div className={styles.mountLine} ref={mountLineRef} />
      <div className={styles.scrollLine} ref={scrollLineRef} />
      <div className={clsx(styles.titleText, resolvedSubTitle && styles.hasSub)}>
        <div className={styles.titleLabelGroup}>
          {prefix}
          {resolvedLabel}
          <span className={styles.titleKana}>{resolvedKana}</span>
        </div>
        {resolvedSubTitle && <span className={styles.titleSub}>{resolvedSubTitle}</span>}
      </div>
    </h2>
  )
}
