import type { NavItem } from '@/types/nav'

// sectionTitleKana は about だけ kana と値が異なるため個別指定している。
// それ以外は kana と同値なので省略し、BaseTitle 側の kana へのフォールバックに任せる
export const NAV_ITEMS: NavItem[] = [
  { id: 'news', label: 'NEWS', kana: 'ニュース' },
  { id: 'about', label: 'ABOUT', kana: '2ndについて', sectionTitleKana: 'アバウト' },
  { id: 'business', label: 'BUSINESS', kana: '事業内容' },
  { id: 'support', label: 'SUPPORT', kana: 'サービス案内' },
  { id: 'company', label: 'COMPANY', kana: '会社概要' },
  { id: 'access', label: 'ACCESS', kana: 'アクセス' },
  { id: 'contact', label: 'CONTACT', kana: 'お問い合わせ' },
]

// SectionTitle 用の汎用解決。ホームの NAV_ITEMS(実際のナビゲーション兼用)と
// Support 系の SUPPORT_NAV_ITEMS(SectionTitle 表示専用)の両方から検索する
export function getNavItem(id: string): NavItem {
  const item = [...NAV_ITEMS, ...SUPPORT_NAV_ITEMS].find((navItem) => navItem.id === id)
  if (!item) {
    throw new Error(`NAV_ITEMS/SUPPORT_NAV_ITEMS に id="${id}" の項目が見つかりません`)
  }
  return item
}

// Support 系ページの SectionTitle 表示内容。home の NAV_ITEMS と同じ考え方で、
// ページ(URL)ごとに固定の navId を割り当て、label/kana/subTitle をここに集約する
const SUPPORT_NAV_ITEMS: NavItem[] = [
  { id: 'support-resident', label: 'Support', kana: 'サービス案内', subTitle: 'ご入居者様専用ページ' },
  {
    id: 'support-resident-renewal',
    label: 'Support',
    kana: 'サービス案内',
    subTitle: '契約の更新ついて',
  },
  {
    id: 'support-resident-cancellation',
    label: 'Support',
    kana: 'サービス案内',
    subTitle: 'ご解約について',
  },
  // kana/subTitle はStepごとに BaseTitle 側で個別指定するため、ここでは既定値のみ
  {
    id: 'support-resident-cancellation-form',
    label: 'Support',
    kana: '退去受付フォーム',
  },
  {
    id: 'support-resident-form',
    label: 'Support',
    kana: '暮らしに役立つお問い合わせ',
  },
  {
    id: 'agreement',
    label: 'Agreement',
    kana: '規約',
    subTitle: '個人情報の取り扱いについて',
  },
]
