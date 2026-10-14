import clsx from 'clsx'
import type { FormInputProps } from '@/types/form'
import { usedClasses } from '@/utility/usedClasses'
import styles from './style.module.scss'

export default function FormInput({
  name,
  value,
  onChange,
  placeholder,
  email,
  type,
  used,
  error,
  disabled,
}: FormInputProps) {
  return (
    <div className={clsx(styles.formInput, ...usedClasses(styles, used))}>
      <input
        className={clsx(styles.input, error && styles.hasError)}
        id={name}
        name={name}
        type={email ? 'email' : 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={type === 'required'}
        disabled={disabled}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
