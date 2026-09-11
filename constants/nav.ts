import { PRODUCT_NAV_ITEMS } from '@/constants/product'
import type { NavItem } from '@/types/nav'

export const NAV_ITEMS: NavItem[] = [
  { id: 'news', label: 'NEWS', kana: 'ニュース', sectionTitleKana: 'ニュース' },
  { id: 'about', label: 'ABOUT', kana: '2ndについて', sectionTitleKana: 'アバウト' },
  { id: 'business', label: 'BUSINESS', kana: '事業内容', sectionTitleKana: '事業内容' },
  { id: 'company', label: 'COMPANY', kana: '会社概要', sectionTitleKana: '会社概要' },
  { id: 'access', label: 'ACCESS', kana: 'アクセス', sectionTitleKana: 'アクセス' },
  { id: 'contact', label: 'CONTACT', kana: 'お問い合わせ', sectionTitleKana: 'お問い合わせ' },
]

// SectionTitle 用の汎用解決。ホームの NAV_ITEMS(実際のナビゲーション兼用)と
// Product 系の PRODUCT_NAV_ITEMS(SectionTitle 表示専用)の両方から検索する
export function getNavItem(id: string): NavItem {
  const item = [...NAV_ITEMS, ...PRODUCT_NAV_ITEMS].find((navItem) => navItem.id === id)
  if (!item) {
    throw new Error(`NAV_ITEMS/PRODUCT_NAV_ITEMS に id="${id}" の項目が見つかりません`)
  }
  return item
}
