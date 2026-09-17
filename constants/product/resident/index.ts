export const RESIDENT = {
  guidanceHeading: 'ご案内',
  guidanceText: '入居者様専用サイトでは、賃貸物件に関する各種お手続きや賃貸住宅へのお困りごと、\nご入居前・ご入居後に役立つ情報を発信しています。',
  proceduresHeading: '各種お手続き',
  lifestyleHeading: '暮らしに役立つご案内',
} as const

export const RESIDENT_PROCEDURE_BUTTONS = [
  { text: 'ご解約について', url: '/product/resident/cancellation' },
  { text: '契約更新について', url: '/product/resident/renewal' },
]

export const RESIDENT_LIFESTYLE_BUTTONS = [
  { text: '車庫証明の発行依頼', url: '/product/resident/form?subject=parking' },
  { text: '駐輪シールの発行依頼', url: '/product/resident/form?subject=sticker' },
  { text: '共用電灯切れの連絡', url: '/product/resident/form?subject=electric-light' },
  { text: 'その他設備の不備', url: '/product/resident/form?subject=other' },
]
