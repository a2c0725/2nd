import type { FormFieldItem } from '@/types/form'

// 必須 = type: 'required' / 任意 = type: 'optional'
// 改行を入れる場合は、\n で改行
export const RESIDENT_FORM_FIELDS: FormFieldItem[] = [
  {
    name: 'name',
    label: '名前',
    type: 'required',
    placeholder: '例：山田 太郎'
  },
  {
    name: 'furigana',
    label: 'フリガナ',
    type: 'required',
    placeholder: '例：ヤマダ タロウ'
  },
  {
    name: 'email',
    label: 'メール\nアドレス',
    type: 'required',
    email: true,
    placeholder: '例：info@example.com',
  },
  {
    name: 'tel',
    label: '電話番号',
    type: 'required',
    placeholder: '例：090-1234-5678'
  },
  {
    name: 'contactMethod',
    label: 'ご希望の\n連絡方法',
    type: 'required',
    inputType: 'radio',
    options: [
      { label: '電話', value: 'tel' },
      { label: 'メール', value: 'email' },
    ],
  },
  {
    name: 'postalCode',
    label: '郵便番号',
    type: 'required',
    placeholder: '例：123-4567'
  },
  {
    name: 'address',
    label: '住所',
    type: 'required',
    placeholder: '例：東京都東村山市栄町2-22-2',
  },
  {
    name: 'buildingName',
    label: '建物名 /\n部屋番号',
    type: 'required',
    placeholder: '例：〇〇マンション101号室'
  },
  {
    name: 'subject',
    label: 'ご用件',
    type: 'required',
    inputType: 'radio',
    options: [
      { label: '駐輪シールの申込', value: 'sticker' },
      { label: '車庫証明に関する書類の発行依頼', value: 'parking' },
      { label: '共用電灯切れの連絡', value: 'electric-light' },
      { label: 'その他設備の不具合', value: 'other' },
    ],
  },
  {
    name: 'content',
    label: 'お問い合わせ内容',
    type: 'required',
    inputType: 'textarea',
    placeholder: 'お問い合わせ内容をご入力ください',
  },
]

export const RESIDENT_FORM_COMPLETE = {
  title: 'お手続きの申請を受付いたしました。',
  body: '後日、担当より確認のお電話またはメールをさせていただきますので、\nしばらくお待ちください。\n\nまた、自動返信にて受付内容をお送りしておりますので、\n受付内容に相違がないかご確認お願いいたします。',
  buttonText: '入居者様専用サイトに戻る',
}
