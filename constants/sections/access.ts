import type { CompanyOffice } from '@/types/company'

// ACCESSセクションに表示する拠点一覧。
// 本社住所はCOMPANY.address（Footer等で共通利用）と半角スペースの有無が異なるが、
// 元サイト側の表記の違いをそのまま踏襲している
export const ACCESS_OFFICES: CompanyOffice[] = [
  {
    title: '本社',
    postalCode: '〒189-0013',
    address: '東京都東村山市栄町2-22-2 Jビル 2F',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1635.9379589113998!2d139.46966266361343!3d35.7499736610408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e701c1d0572f%3A0xca54fcf24b22878b!2z5qCq5byP5Lya56S-Mm5k!5e0!3m2!1sja!2sjp!4v1778849217833!5m2!1sja!2sjp',
  },
  {
    title: '営業所',
    postalCode: '〒403-0004',
    address: '山梨県富士吉田市下吉田７丁目１２−１ プリムール 103',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.5259336337085!2d138.8096698762585!3d35.49127144038487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6019673b1c5399f7%3A0x2b97b0990d8df4d5!2z44CSNDAzLTAwMDQg5bGx5qKo55yM5a-M5aOr5ZCJ55Sw5biC5LiL5ZCJ55Sw77yX5LiB55uu77yR77yS4oiS77yRIOODl-ODquODoOODvOODqyAxMDM!5e0!3m2!1sja!2sjp!4v1778852011273!5m2!1sja!2sjp',
  },
]
