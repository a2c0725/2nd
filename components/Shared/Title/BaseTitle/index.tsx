'use client'

import clsx from 'clsx'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { getNavItem } from '@/constants/common/nav'
import type { SectionTitleProps } from '@/types/ui'
import { usedClasses } from '@/utility/usedClasses'
import styles from './style.module.scss'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

// 見出し脇の line が、画面に入ってくるのに少し遅れて追従するアニメーション。
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

      // まだ実スクロール(hasScrolled)していない間は mountLine が表示され続けるため、
      // ナビリンク遷移などの疑似スクロールで画面内外の状態が変わった場合も
      // mountLine の縦位置を追従させる。top には transition が無いため常に瞬時
      if (!hasScrolled) {
        mountLine!.classList.toggle(styles.onScreen, onScreen)
      }

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

    // mount直後と同じ状態（mountLine表示・縦位置は即座に確定・hasScrolledはfalse）に
    // 揃える。初回mount時に加えて、bfcache(ブラウザバック/フォワード時にJSの状態を
    // 丸ごと凍結・復元する仕組み)から復元された場合にも呼び直す。bfcache復元時は
    // Reactのmount処理が再実行されず、離脱時点の状態(既に実スクロール済み等)が
    // そのまま復元されてしまうため、明示的にリセットしないと直アクセス時と
    // 挙動が食い違ってしまう
    function resetToMountState() {
      hasScrolled = false
      direction = 'down'
      lastScrollTop = getScrollTop()
      lastOnScreen = null
      lastDirection = null
      scrollLine!.classList.remove(styles.shown)
      mountLine!.style.display = ''
      mountLine!.classList.remove(styles.revealed)

      // mount時点の位置を mountLine に反映する（top には transition が無いため常に瞬時）
      const onScreen = computeOnScreen()
      if (onScreen !== null) {
        mountLine!.classList.toggle(styles.onScreen, onScreen)
        requestAnimationFrame(() => {
          mountLine!.classList.add(styles.revealed)
        })
      }

      // scrollLine は非表示のうちに現在の状態へ即座に合わせておく。
      // syncScrollLine の onScreen 分岐は本来アニメーションさせる処理だが、
      // ここではまだ非表示の間に位置を合わせるだけなので、一時的に transition を
      // 無効化して瞬時に反映する。有効なままだと、非表示のうちに開始した
      // top のtransitionが終わりきる前に hasScrolled が true になった場合
      // （ブラウザバックのジェスチャーが実スクロールとして扱われる等）、
      // アニメーションの途中経過がそのまま見えてしまう
      scrollLine!.style.transition = 'none'
      syncScrollLine(onScreen)
      void scrollLine!.offsetHeight
      scrollLine!.style.transition = ''
    }

    resetToMountState()

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) resetToMountState()
    }

    // mountLine(横スライドのみ)から scrollLine(縦アニメーション)への切り替えは、
    // 実際にユーザーがホイール/タッチで操作した場合にのみ行う。
    // ナビリンククリック時の疑似スムーズスクロール(useHomeInteractions.ts)や
    // 直URLアクセス時のハッシュジャンプも `scroll` イベントを発生させるため、
    // `scroll` イベント自体を判定材料にすると、それらの「ボタン遷移」でも
    // scrollLine に切り替わってしまい、意図した横スライドの見た目にならない
    function markRealScrollStarted() {
      if (hasScrolled) return
      hasScrolled = true
      scrollLine!.classList.add(styles.shown)
      mountLine!.style.display = 'none'
    }

    // wheel は passive のため実際のスクロールと並行して処理されることがあり、
    // ここでの同期が必ず画面内に入る前に間に合うとは限らない（間に合わない場合の
    // フォールバックは syncScrollLine 内の onScreen 分岐で行う）。
    // 間に合った場合は無駄な瞬時切り替えを避けられるため、事前同期として残しておく
    function handleWheel(event: WheelEvent) {
      if (event.deltaY > 0) direction = 'down'
      else if (event.deltaY < 0) direction = 'up'
      markRealScrollStarted()
      syncScrollLine(computeOnScreen())
    }

    // タッチ操作(スマートフォン等)も実スクロールとして扱う
    function handleTouchMove() {
      markRealScrollStarted()
    }

    // scroll イベントは wheel/touch によるものだけでなく、ナビリンク遷移時の
    // 疑似スムーズスクロールや直URLアクセスのハッシュジャンプでも発生するため、
    // ここでは方向の確定と待機位置の同期のみ行い、mountLine/scrollLine の
    // 切り替え(hasScrolled)は行わない
    function handleScroll() {
      const currentScrollTop = getScrollTop()
      if (currentScrollTop > lastScrollTop) direction = 'down'
      else if (currentScrollTop < lastScrollTop) direction = 'up'
      lastScrollTop = currentScrollTop

      syncScrollLine(computeOnScreen())
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
    scrollTarget.addEventListener('touchmove', handleTouchMove, { passive: true })
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('pageshow', handlePageShow)

    return () => {
      observer.disconnect()
      scrollTarget.removeEventListener('wheel', handleWheel as EventListener)
      scrollTarget.removeEventListener('touchmove', handleTouchMove)
      scrollTarget.removeEventListener('scroll', handleScroll)
      window.removeEventListener('pageshow', handlePageShow)
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
