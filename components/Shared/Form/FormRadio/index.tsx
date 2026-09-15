import clsx from 'clsx'
import type { FormRadioProps } from '@/types/form'
import { usedClasses } from '@/utility/usedClasses'
import styles from './style.module.scss'

export default function FormRadio({
  name,
  value,
  onChange,
  options,
  type,
  used,
  error,
  disabled,
}: FormRadioProps) {
  return (
    <div className={clsx(styles.formRadio, ...usedClasses(styles, used))}>
      <div className={styles.options}>
        {options.map((option) => (
          <label className={styles.option} key={option.value}>
            <input
              className={styles.radio}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              required={type === 'required'}
              disabled={disabled}
            />
            <span className={styles.optionLabel}>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
