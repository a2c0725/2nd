import type { ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './style.module.scss'

type FormCheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: ReactNode
  disabled?: boolean
  error?: string
}

export default function FormCheckbox({ checked, onChange, label, disabled, error }: FormCheckboxProps) {
  return (
    <label className={styles.formCheckbox}>
      <input
        className={clsx(styles.checkbox, error && styles.hasError)}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={styles.label}>{label}</span>
    </label>
  )
}

// 個人情報取り扱いの利用規約(/agreement)へのリンクを、FormCheckbox の label 内で
// 共通のスタイルで使うための補助コンポーネント
export function FormCheckboxAgreementLink({ children }: { children: ReactNode }) {
  return (
    <Link className={styles.link} href="/agreement" target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  )
}
