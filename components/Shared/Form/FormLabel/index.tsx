import clsx from 'clsx'
import type { FormLabelProps } from '@/types/form'
import { usedClasses } from '@/utility/usedClasses'
import styles from './style.module.scss'

export default function FormLabel({ label, type, htmlFor, used }: FormLabelProps) {
  return (
    <label
      className={clsx(styles.formLabel, ...usedClasses(styles, used))}
      htmlFor={htmlFor}
    >
      <span className={styles.badge} data-type={type}>
        {type === 'required' ? '必須' : '任意'}
      </span>
      <span className={styles.text}>{label}</span>
    </label>
  )
}
