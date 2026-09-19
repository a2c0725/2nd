import type { ReactNode } from 'react'

export type RootLayoutProps = {
  children: ReactNode
}

export type RootShellProps = {
  children: ReactNode
}

export type SectionTitleProps = {
  // constants/nav.ts の NAV_ITEMS に対応する id。指定するとここから label/kana を解決する
  navId?: string
  // navId が NAV_ITEMS に無い見出し（Product ページ等）で直接指定する場合
  label?: string
  kana?: string
  // CONTACT セクションなど、見出し文言の先頭に付与したい要素がある場合に指定
  prefix?: ReactNode
  // 見出し下に表示するサブタイトル（例: 「ご入居者様専用サイト」）
  subTitle?: string
  // line の配色。暗い背景画像の上に載るセクションでは 'white' を指定する
  type?: 'white'
  // 呼び出し元ごとの見た目バリエーション。style.module.scss 側のクラス名(複数可)に対応する
  used?: string | string[]
}

export type ButtonProps = {
  text: string
  subLabel?: string
  url?: string
  className?: string
  used?: string | string[]
  disabled?: boolean
  download?: boolean
  onClick?: () => void
}

export type CardProps = {
  title: string
  description: string
  url?: string
  disabled?: boolean
  type?: 'commingsoon'
  used?: string | string[]
}


export type ScrollableSectionInnerProps = {
  className?: string
  children: ReactNode
}
