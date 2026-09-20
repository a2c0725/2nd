import type { FormFieldItem } from '@/types/form'

// 必須 = type: 'required' / 任意 = type: 'optional'
// 改行を入れる場合は、\n で改行

// 1.賃貸借契約情報
export const CANCELLATION_FORM_LEASE_FIELDS: FormFieldItem[] = [
  { name: 'buildingName', label: '建物名', type: 'required', placeholder: '例：〇〇マンション' },
  { name: 'roomNumber', label: '部屋号室', type: 'required', placeholder: '例：101' },
  { name: 'postalCode', label: '郵便番号', type: 'required', placeholder: '例：171-0022' },
  { name: 'address', label: '住所', type: 'required', placeholder: '例：東京都豊島区南池袋' },
  { name: 'addressDetail', label: '以降の住所\n(番地まで)', type: 'required', placeholder: '例：1-7-20' },
]

const WITNESS_TIME_OPTIONS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
  '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
].map((time) => ({ label: time, value: time }))

// 2.ご解約情報
export const CANCELLATION_FORM_CANCELLATION_FIELDS: FormFieldItem[] = [
  {
    name: 'cancellationTarget',
    label: '解約をご希望の契約',
    type: 'required',
    inputType: 'checkboxGroup',
    options: [
      { label: '住居', value: 'housing' },
      { label: '駐車場', value: 'parking' },
      { label: 'その他', value: 'other' },
    ],
    labelFullWidth: true,
  },
  {
    name: 'cancellationDate',
    label: '解約希望日',
    type: 'required',
    inputType: 'date',
    note: '解約の申出は賃貸借契約書の条文に規定した期間前までにお願い致します。また、契約形態によっては、解約に当たり別途違約金等が発生する場合もございますので契約条項をご確認ください。',
  },
  {
    name: 'rentAgreement',
    label: '解約についての同意',
    type: 'required',
    inputType: 'checkbox',
    checkboxLabel: '解約希望日までの賃料発生に同意する',
    note: '本項目に同意しない場合、解約を受理できません。',
    labelFullWidth: true,
  },
  {
    name: 'cancellationReason',
    label: '解約理由',
    type: 'required',
    inputType: 'select',
    options: [
      { label: '就職', value: 'employment' },
      { label: '転勤', value: 'transfer' },
      { label: '結婚', value: 'marriage' },
      { label: '住宅購入', value: 'home-purchase' },
      { label: '管理サービスに不満', value: 'management-dissatisfaction' },
      { label: '設備に不満', value: 'facility-dissatisfaction' },
      { label: '家賃が高い', value: 'high-rent' },
      { label: '住環境', value: 'living-environment' },
      { label: 'その他', value: 'other' },
    ],
  },
  {
    name: 'witnessDate',
    label: '立会希望日',
    type: 'required',
    inputType: 'date',
    note: '立会日は解約日より前に設定してください。',
  },
  {
    name: 'witnessTime',
    label: '立会希望時間',
    type: 'required',
    inputType: 'select',
    options: WITNESS_TIME_OPTIONS,
    rowClassName: 'changeHeight',
  },
  { name: 'witnessPerson', label: '立会人', type: 'required', placeholder: '例：本人' },
  {
    name: 'witnessContact',
    label: '立会人ご連絡先',
    type: 'required',
    placeholder: '例：09012345678',
    rowClassName: 'changeHeight2',
  },
]

// 3.ご契約者様情報
export const CANCELLATION_FORM_CONTRACTOR_FIELDS: FormFieldItem[] = [
  { name: 'contractorName', label: 'ご契約者氏名', type: 'required', placeholder: '例：山田 太郎' },
  { name: 'contractorFurigana', label: 'フリガナ', type: 'required', placeholder: '例：ヤマダ タロウ' },
  { name: 'contractorBirthday', label: '生年月日', type: 'required', inputType: 'date' },
  { name: 'contractorPostalCode', label: '郵便番号', type: 'required', placeholder: '例：171-0022' },
  { name: 'contractorAddress', label: '契約者住所', type: 'required', placeholder: '例：東京都豊島区南池袋' },
  { name: 'contractorAddressDetail', label: '以降の住所', type: 'required', placeholder: '例：1-7-20' },
  { name: 'contractorTel', label: '契約者電話番号', type: 'required', placeholder: '例：090-1234-5678' },
  { name: 'email', label: 'メールアドレス', type: 'required', email: true, placeholder: '例：info@example.com' },
  { name: 'workplaceName', label: '勤務先名', type: 'required', placeholder: '例：株式会社〇〇' },
  { name: 'workplaceTel', label: '勤務先電話番号', type: 'required', placeholder: '例：03-1234-5678' },
  { name: 'residentName', label: '入居者名\n(法人の場合)', type: 'optional', placeholder: '例：山田 太郎' },
  { name: 'residentTel', label: '入居者電話番号', type: 'optional', placeholder: '例：090-1234-5678' },
]

// 4.転居先情報
export const CANCELLATION_FORM_RELOCATION_FIELDS: FormFieldItem[] = [
  {
    name: 'relocationStatus',
    label: '転居先の決定状況',
    type: 'required',
    inputType: 'radio',
    options: [
      { label: '未定', value: 'undecided' },
      { label: '決定済', value: 'decided' },
    ],
    note: '未定の場合、立会時にご住所を記載していただきます。',
    labelWidthAuto: true,
  },
  { name: 'relocationPostalCode', label: '郵便番号', type: 'optional', placeholder: '例：171-0022' },
  { name: 'relocationAddress', label: '住所', type: 'optional', placeholder: '例：東京都豊島区南池袋' },
  {
    name: 'relocationAddressDetail',
    label: '以降の住所',
    type: 'optional',
    placeholder: '例：1-7-20',
    rowClassName: 'changeHeight',
  },
  { name: 'relocationTel', label: '電話番号', type: 'optional', placeholder: '例：090-1234-5678' },
]

// 5.精算金振込先口座
export const CANCELLATION_FORM_ACCOUNT_FIELDS: FormFieldItem[] = [
  { name: 'bankCode', label: '金融機関コード', type: 'required', placeholder: '例：0001' },
  { name: 'bankName', label: '金融機関名', type: 'required', placeholder: '例：みずほ銀行' },
  { name: 'branchCode', label: '支店番号', type: 'required', placeholder: '例：001' },
  { name: 'branchName', label: '支店名', type: 'required', placeholder: '例：本店' },
  {
    name: 'accountType',
    label: '口座種別',
    type: 'required',
    inputType: 'radio',
    options: [
      { label: '普通', value: 'ordinary' },
      { label: '当座', value: 'checking' },
    ],
    rowClassName: 'changeHeight',
  },
  { name: 'accountNumber', label: '口座番号', type: 'required', placeholder: '例：1234567' },
  { name: 'accountHolderName', label: '名義人', type: 'required', placeholder: '例：山田 太郎' },
  { name: 'accountHolderFurigana', label: 'フリガナ', type: 'required', placeholder: '例：ヤマダ タロウ' },
]

export type CancellationFormSection = {
  key: string
  heading: string
  // BaseTitle の subTitle に表示する文言（heading と異なり番号なし）
  subTitle: string
  fields: FormFieldItem[]
}

export const CANCELLATION_FORM_SECTIONS: CancellationFormSection[] = [
  {
    key: 'lease',
    heading: '1.賃貸借契約情報',
    subTitle: '賃貸借契約情報',
    fields: CANCELLATION_FORM_LEASE_FIELDS,
  },
  {
    key: 'cancellation',
    heading: '2.ご解約情報',
    subTitle: 'ご解約情報',
    fields: CANCELLATION_FORM_CANCELLATION_FIELDS,
  },
  {
    key: 'contractor',
    heading: '3.ご契約者様情報',
    subTitle: 'ご契約者様情報',
    fields: CANCELLATION_FORM_CONTRACTOR_FIELDS,
  },
  {
    key: 'relocation',
    heading: '4.転居先情報',
    subTitle: '転居先情報',
    fields: CANCELLATION_FORM_RELOCATION_FIELDS,
  },
  {
    key: 'account',
    heading: '5.精算金振込先口座',
    subTitle: '精算金振込先口座',
    fields: CANCELLATION_FORM_ACCOUNT_FIELDS,
  },
]

export const CANCELLATION_FORM_CONFIRM_SUBTITLE = '確認画面'

export const CANCELLATION_FORM_ALL_FIELDS: FormFieldItem[] = CANCELLATION_FORM_SECTIONS.flatMap(
  (section) => section.fields,
)

export const CANCELLATION_FORM_RULE = {
  title: '解約規程',
  text: '私は現在賃貸中の本申請物件について前項の解約日をもって賃貸借契約を解約し本物件を明け渡したくご通知いたします。尚、明け渡しに際しては公共料金等を精算し家財一切を搬出し鍵（複製鍵を含む）をすべて返却いたします。万一不履行の場合別紙契約書に基づきいかなる処置を取られても異議を申し立て致しません。',
}

export const CANCELLATION_FORM_COMPLETE = {
  subTitle: '送信完了',
  title: '退去受付フォームの送信を受付いたしました。',
  body: '後日、担当より確認のご連絡をさせていただきますので、\nしばらくお待ちください。\n\nまた、自動返信にて受付内容をお送りしておりますので、\n受付内容に相違がないかご確認お願いいたします。',
}
