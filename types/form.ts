export type FormFieldType = 'required' | 'optional'

export type FormLabelProps = {
  label: string
  type: FormFieldType
  htmlFor?: string
  used?: string | string[]
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

export type FormFieldItem = {
  name: string
  label: string
  type: FormFieldType
  placeholder?: string
  email?: boolean
  inputType?: 'text' | 'textarea' | 'radio'
  options?: FormRadioOption[]
}
