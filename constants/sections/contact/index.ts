import { COMPANY } from '@/constants/common/company'

export const CONTACT = {
  tel: COMPANY.tel,
  fax: COMPANY.fax,
} as const

export const CONTACT_BUTTONS = [
  {
    text: 'お問い合わせフォーム',
    url: '/contact/form',
  },
]
