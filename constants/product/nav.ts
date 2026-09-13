import type { NavItem } from '@/types/nav'

// Product 系ページの SectionTitle 表示内容。home の NAV_ITEMS と同じ考え方で、
// ページ(URL)ごとに固定の navId を割り当て、label/kana/subTitle をここに集約する
export const PRODUCT_NAV_ITEMS: NavItem[] = [
  { id: 'product-resident', label: 'Product', kana: '製品案内', subTitle: 'ご入居者様専用サイト' },
  {
    id: 'product-resident-renewal',
    label: 'Product',
    kana: '製品案内',
    subTitle: '契約の更新ついて',
  },
  {
    id: 'product-resident-cancellation',
    label: 'Product',
    kana: '製品案内',
    subTitle: 'ご解約について',
  },
]
