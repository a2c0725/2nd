import clsx from 'clsx'
import type { FormTextareaProps } from '@/types/form'
import { usedClasses } from '@/utility/usedClasses'
import styles from './style.module.scss'

export default function FormTextarea({
  name,
  value,
  onChange,
  placeholder,
  type,
  used,
  error,
  disabled,
  rows = 6,
}: FormTextareaProps) {
  return (
    <div className={clsx(styles.formTextarea, ...usedClasses(styles, used))}>
      <textarea
        className={clsx(styles.textarea, error && styles.hasError)}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={type === 'required'}
        disabled={disabled}
        rows={rows}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
