export type NavItem = {
  id: string
  label: string
  // ハンバーガーメニュー(sp-gnav)で表示するかな
  kana: string
  // 各セクション見出し(h2.section-title)で表示するかな。about のみ kana と異なる。
  // 未指定の場合は SectionTitle 側で kana にフォールバックする(Product 系で利用)
  sectionTitleKana?: string
  // 見出し下に表示するサブタイトル（Product 系ページで利用）
  subTitle?: string
}
