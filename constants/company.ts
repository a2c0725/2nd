import type { CompanyOffice } from '@/types/company'

export const COMPANY_NAME = '株式会社2nd'
export const COMPANY_POSTAL_CODE = '〒189-0013'
export const COMPANY_ADDRESS = '東京都東村山市栄町2-22-2 Jビル2F'
export const COMPANY_TEL = '042-306-4742'
export const COMPANY_FAX = '042-306-4743'
export const COMPANY_REPRESENTATIVE_TITLE = '代表取締役社長'
export const COMPANY_REPRESENTATIVE_NAME = '田中 雄太朗'
export const COMPANY_CAPITAL = '5百万円'
export const COMPANY_BUSINESS_HOURS = '9:30-18:00'
export const COMPANY_LICENSE_NUMBER = '東京都知事(1)第111146号'
export const COMPANY_ESTABLISHED_DATE = '2024年3月'
export const COMPANY_BUSINESS_SCOPE = [
  '管理委託運営(管理受託)',
  '不動産売買',
  '不動産賃貸/仲介/管理',
  '不動産サブリース事業',
  'リフォーム',
  '建築',
  'ペットサロン/ホテル',
  '保険代理店業',
  'デザイン制作事業',
]

// ロゴ画像の alt テキスト。ヘッダー・フッター・各セクションで共通利用する
export const COMPANY_LOGO_ALT = '2nd'

// COMPANYセクションの項目ラベル
export const COMPANY_INFO_LABELS = {
  name: '社名',
  representative: '代表',
  address: '所在地',
  tel: '電話番号',
  capital: '資本金',
  businessHours: '営業時間',
  businessScope: '主な事業内容',
  licenseNumber: '免許番号',
  establishedDate: '設立年月日',
} as const

// COMPANYセクションの所在地欄でのみ使う表記。ACCESSセクション(COMPANY_OFFICES)とは
// 元サイト側で住所の表記が微妙に異なっているため、それぞれの表記のまま個別に定義する
export const COMPANY_BRANCH_OFFICE_ADDRESS = '山梨県富士吉田市下吉田7-12-1　フリムール103'

// ACCESSセクションの本社住所表記（COMPANY_ADDRESSとは半角スペースの有無が異なる）
export const COMPANY_HQ_ADDRESS = '東京都東村山市栄町2-22-2 Jビル 2F'

// 営業所（山梨）の郵便番号・住所
export const COMPANY_OFFICE_POSTAL_CODE = '〒403-0004'
export const COMPANY_OFFICE_ADDRESS = '山梨県富士吉田市下吉田７丁目１２−１ プリムール 103'

// ACCESSセクションに表示する拠点一覧
export const COMPANY_OFFICES: CompanyOffice[] = [
  {
    title: '本社',
    postalCode: COMPANY_POSTAL_CODE,
    address: COMPANY_HQ_ADDRESS,
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1635.9379589113998!2d139.46966266361343!3d35.7499736610408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e701c1d0572f%3A0xca54fcf24b22878b!2z5qCq5byP5Lya56S-Mm5k!5e0!3m2!1sja!2sjp!4v1778849217833!5m2!1sja!2sjp',
  },
  {
    title: '営業所',
    postalCode: COMPANY_OFFICE_POSTAL_CODE,
    address: COMPANY_OFFICE_ADDRESS,
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.5259336337085!2d138.8096698762585!3d35.49127144038487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6019673b1c5399f7%3A0x2b97b0990d8df4d5!2z44CSNDAzLTAwMDQg5bGx5qKo55yM5a-M5aOr5ZCJ55Sw5biC5LiL5ZCJ55Sw77yX5LiB55uu77yR77yS4oiS77yRIOODl-ODquODoOODvOODqyAxMDM!5e0!3m2!1sja!2sjp!4v1778852011273!5m2!1sja!2sjp',
  },
]
