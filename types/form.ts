export type FormFieldType = 'required' | 'optional'

export type FormLabelProps = {
  label: string
  type: FormFieldType
  htmlFor?: string
  used?: string | string[]
  fullWidth?: boolean
  widthAuto?: boolean
}

export type FormInputProps = {
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  email?: boolean
  type: FormFieldType
  used?: string | string[]
  error?: string
  disabled?: boolean
}

export type FormTextareaProps = {
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type: FormFieldType
  used?: string | string[]
  error?: string
  disabled?: boolean
  rows?: number
}

export type FormRadioOption = {
  label: string
  value: string
}

export type FormRadioProps = {
  name: string
  value: string
  onChange: (value: string) => void
  options: FormRadioOption[]
  type: FormFieldType
  used?: string | string[]
  error?: string
  disabled?: boolean
}

export type FormSelectProps = {
  name: string
  value: string
  onChange: (value: string) => void
  options: FormRadioOption[]
  placeholder?: string
  type: FormFieldType
  used?: string | string[]
  error?: string
  disabled?: boolean
}

export type FormDatePickerProps = {
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type: FormFieldType
  used?: string | string[]
  error?: string
  disabled?: boolean
  // この日付(YYYY-MM-DD)より前の日付は選択不可にする
  minDate?: string
  // この日付(YYYY-MM-DD)以降の日付は選択不可にする
  maxDate?: string
  // エラー枠線は表示したまま、下のエラーテキストだけ非表示にする(他で同じ文言を表示している場合の重複防止用)
  hideErrorText?: boolean
}

export type FormBirthdayDatePickerProps = {
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type: FormFieldType
  used?: string | string[]
  error?: string
  disabled?: boolean
}

export type FormFieldItem = {
  name: string
  label: string
  type: FormFieldType
  placeholder?: string
  email?: boolean
  inputType?:
    | 'text'
    | 'textarea'
    | 'radio'
    | 'select'
    | 'checkboxGroup'
    | 'checkbox'
    | 'date'
    | 'birthday'
  options?: FormRadioOption[]
  // inputType: 'checkbox' の場合に、FormLabel の見出しとは別にチェックボックス自体へ表示する文言
  checkboxLabel?: string
  // 入力欄の下に表示する補足説明
  note?: string
  // .form-row に追加で付与するクラス名
  rowClassName?: string
  // FormLabel を全幅表示にするかどうか
  labelFullWidth?: boolean
  // FormLabel の幅を auto にするかどうか
  labelWidthAuto?: boolean
  // inputType: 'date' の場合、本日からこの日数だけ先の日付以降のみ選択可能にする
  minDaysFromToday?: number
  // inputType: 'date' の場合、この名前のフィールドの値(YYYY-MM-DD)を上限日(その日は含まない)として使う
  maxDateField?: string
}
