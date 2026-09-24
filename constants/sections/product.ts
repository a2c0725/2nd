import type { ProductListItem } from '@/types/product'

export const PRODUCT_LIST_ITEMS: ProductListItem[] = [
  {
    title: 'ご入居者様向け',
    description:
      'ご入居者様の生活を総合的にサポートすることを目的として、暮らしの様々なシーンでご利用できるサービスをご提供します。',
    url: '/product/resident',
  },
  {
    title: '不動産会社様向け',
    description:
      '不動産仲介会社様向けに、空室一覧や内見Web申込など、販売活動にお役立ていただけるサービスをご提供します。',
    url: 'https://itandi-accounts.com/login?client_id=itandi_bb&redirect_uri=https%3A%2F%2Fitandibb.com%2Fitandi_accounts_callback&response_type=token&state=233a9d1b2ed07922d56639302dcb3bd72b4d0b0649e10d622e2de5785f69d689',
  },
  {
    title: 'オーナー様向け',
    description:
      '多くのオーナー様の悩みのタネである、入居者様からの苦情対応、滞納処理など、賃貸経営に纏わる管理業務のサポートをご提供します。',
    disabled: true,
    type: 'commingsoon',
  },
]
