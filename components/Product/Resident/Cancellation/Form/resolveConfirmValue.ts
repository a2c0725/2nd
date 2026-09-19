import type { FormFieldItem } from '@/types/form'

export function resolveConfirmValue(field: FormFieldItem, value: string): string {
  if (field.inputType === 'checkbox') {
    return value === 'true' ? '同意する' : ''
  }
  if (field.inputType === 'checkboxGroup') {
    const selected = value ? value.split(',') : []
    return selected
      .map((selectedValue) => field.options?.find((option) => option.value === selectedValue)?.label ?? selectedValue)
      .join('、')
  }
  if (field.inputType === 'radio' || field.inputType === 'select') {
    return field.options?.find((option) => option.value === value)?.label ?? value
  }
  if (field.inputType === 'date') {
    if (!value) return ''
    const [year, month, day] = value.split('-')
    return `${year}/${month}/${day}`
  }
  return value
}
