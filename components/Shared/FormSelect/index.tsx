import clsx from 'clsx'
import type { FormSelectProps } from '@/types/form'
import { usedClasses } from '@/utility/usedClasses'
import styles from './style.module.scss'

export default function FormSelect({
  name,
  value,
  onChange,
  options,
  placeholder,
  type,
  used,
  error,
  disabled,
}: FormSelectProps) {
  return (
    <div className={clsx(styles.formSelect, ...usedClasses(styles, used))}>
      <div className={styles.selectWrapper}>
        <select
          className={clsx(styles.select, error && styles.hasError, !value && styles.placeholder)}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={type === 'required'}
          disabled={disabled}
        >
          <option value="" disabled hidden>
            {placeholder ?? '選択してください'}
          </option>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
