import Link from 'next/link'
import styles from './style.module.scss'

type FormCheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export default function FormCheckbox({ checked, onChange, disabled }: FormCheckboxProps) {
  return (
    <label className={styles.formCheckbox}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={styles.label}>
        個人情報取り扱いの
        <Link className={styles.link} href="/agreement" target="_blank" rel="noopener noreferrer">
          利用規約
        </Link>
        に同意する
      </span>
    </label>
  )
}
