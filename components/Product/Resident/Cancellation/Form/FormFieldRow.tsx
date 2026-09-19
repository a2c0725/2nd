import clsx from 'clsx'
import FormLabel from '@/components/Shared/Form/FormLabel'
import FormInput from '@/components/Shared/Form/FormInput'
import FormRadio from '@/components/Shared/Form/FormRadio'
import FormSelect from '@/components/Shared/Form/FormSelect'
import FormDatePicker from '@/components/Shared/Form/FormDatePicker'
import FormCheckbox from '@/components/Shared/Form/FormCheckbox'
import type { FormFieldItem } from '@/types/form'
import styles from './style.module.scss'

const FULL_WIDTH_INPUT_TYPES = ['textarea', 'checkboxGroup', 'checkbox']

export function isFullWidthField(field: FormFieldItem) {
  return FULL_WIDTH_INPUT_TYPES.includes(field.inputType ?? 'text')
}

// PCでは2カラムに分け、テキストエリア/チェックボックス系は常に全幅側に出す
export function splitFieldColumns(fields: FormFieldItem[]) {
  const columnFields = fields.filter((field) => !isFullWidthField(field))
  const fullFields = fields.filter(isFullWidthField)
  const splitIndex = Math.ceil(columnFields.length / 2)
  return {
    leftFields: columnFields.slice(0, splitIndex),
    rightFields: columnFields.slice(splitIndex),
    fullFields,
  }
}

function toggleGroupValue(current: string, optionValue: string) {
  const selected = current ? current.split(',') : []
  const next = selected.includes(optionValue)
    ? selected.filter((value) => value !== optionValue)
    : [...selected, optionValue]
  return next.join(',')
}

type FormFieldRowProps = {
  field: FormFieldItem
  value: string
  onChange: (name: string, value: string) => void
  error?: string
}

export default function FormFieldRow({ field, value, onChange, error }: FormFieldRowProps) {
  return (
    <div className={clsx(styles.formRow, isFullWidthField(field) && styles.formRowFull)}>
      <FormLabel label={field.label} type={field.type} htmlFor={field.name} used="productForm" />
      <div className={styles.formControl}>
        {field.inputType === 'select' ? (
          <FormSelect
            name={field.name}
            value={value}
            onChange={(v) => onChange(field.name, v)}
            options={field.options ?? []}
            placeholder={field.placeholder}
            type={field.type}
            used="productForm"
            error={error}
          />
        ) : field.inputType === 'date' ? (
          <FormDatePicker
            name={field.name}
            value={value}
            onChange={(v) => onChange(field.name, v)}
            placeholder={field.placeholder}
            type={field.type}
            used="productForm"
            error={error}
          />
        ) : field.inputType === 'radio' ? (
          <FormRadio
            name={field.name}
            value={value}
            onChange={(v) => onChange(field.name, v)}
            options={field.options ?? []}
            type={field.type}
            used="productForm"
            error={error}
          />
        ) : field.inputType === 'checkboxGroup' ? (
          <div className={styles.checkboxGroup}>
            {field.options?.map((option) => (
              <FormCheckbox
                key={option.value}
                checked={value.split(',').includes(option.value)}
                onChange={() => onChange(field.name, toggleGroupValue(value, option.value))}
                label={option.label}
              />
            ))}
            {error && <span className={styles.checkboxGroupError}>{error}</span>}
          </div>
        ) : field.inputType === 'checkbox' ? (
          <div className={styles.checkboxGroup}>
            <FormCheckbox
              checked={value === 'true'}
              onChange={(checked) => onChange(field.name, checked ? 'true' : '')}
              label={field.checkboxLabel ?? field.label}
            />
            {error && <span className={styles.checkboxGroupError}>{error}</span>}
          </div>
        ) : (
          <FormInput
            name={field.name}
            value={value}
            onChange={(v) => onChange(field.name, v)}
            placeholder={field.placeholder}
            email={field.email}
            type={field.type}
            used="productForm"
            error={error}
          />
        )}
        {field.note && <p className={styles.fieldNote}>{field.note}</p>}
      </div>
    </div>
  )
}
