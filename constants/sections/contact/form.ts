import type { FormFieldItem } from '@/types/form'

// 必須 = type: 'required' / 任意 = type: 'optional'
// 改行を入れる場合は、\n で改行
export const CONTACT_FORM_FIELDS: FormFieldItem[] = [
  {
    name: 'name',
    label: '名前',
    type: 'required',
    placeholder: '例：山田 太郎',
  },
  {
    name: 'furigana',
    label: 'フリガナ',
    type: 'required',
    placeholder: '例：ヤマダ タロウ',
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
    type: 'optional',
    placeholder: '例：090-1234-5678',
  },
  {
    name: 'address',
    label: '住所',
    type: 'optional',
    placeholder: '例：東京都東村山市栄町2-22-2',
  },
  {
    name: 'content',
    label: 'お問い合わせ内容',
    type: 'required',
    inputType: 'textarea',
    placeholder: 'お問い合わせ内容をご入力ください',
  },
]

export const CONTACT_FORM_COMPLETE = {
  title: 'お問い合わせを受付いたしました。',
  body: '後日、担当より確認のご連絡をさせていただきますので、\nしばらくお待ちください。\n\nまた、自動返信にて受付内容をお送りしておりますので、\n受付内容に相違がないかご確認お願いいたします。',
  buttonText: 'トップページに戻る',
}
