import type { BusinessItem } from '@/types/business'
import { BASE_PATH } from '@/constants/common/basePath'

export const BUSINESS_TOP_ITEMS: BusinessItem[] = [
  {
    img: `${BASE_PATH}/img/home.svg`,
    alt: '不動産事業',
    title: '不動産事業',
    body: '売買、買取、相続、賃貸、仲介、管理、サブリース、不動産の事なら何でもお気軽にご相談ください。',
  },
  {
    img: `${BASE_PATH}/img/reform.svg`,
    alt: 'リフォーム事業',
    title: 'リフォーム事業',
    body: '水回りや壁紙の張替えといった部分的な改装工事やリフォーム、戸建てのリノベーション、外壁塗装、賃貸住宅の原状回復、空室改善リフォーム、マンションの大規模修繕など不動産に関することをワンストップでご提供しております。',
  },
  {
    img: `${BASE_PATH}/img/dog.svg`,
    alt: 'ペット事業',
    title: 'ペット事業',
    body: '美は健康から生まれる。愛犬の体と心の健康を最も優先し、一匹一匹の個性に合わせた特別なケアを提供いたします。また、人と犬がお互いに学び、楽しい一生を送るための幼稚園や、愛犬をお預けいただけるホテルも是非、ご利用ください。',
  },
]

export const BUSINESS_BOTTOM_ITEMS: BusinessItem[] = [
  { img: `${BASE_PATH}/img/analysis.svg`, alt: 'マーケティング', body: 'マーケティング' },
  { img: `${BASE_PATH}/img/consulting.svg`, alt: 'コンサルティング', body: 'コンサルティング' },
  { img: `${BASE_PATH}/img/management.svg`, alt: 'マネジメント', body: 'マネジメント' },
  { img: `${BASE_PATH}/img/training.svg`, alt: '研修', body: '研修' },
]
