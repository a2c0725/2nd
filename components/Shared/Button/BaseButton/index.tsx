'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import type { ButtonProps } from '@/types/ui'
import { usedClasses } from '@/utility/usedClasses'
import styles from './style.module.scss'

export default function BaseButton({
  text,
  subLabel,
  url,
  className,
  used,
  disabled,
  onClick,
}: ButtonProps) {
  const router = useRouter()

  const content = (
    <>
      {subLabel && <span className={styles.subLabel}>{subLabel}</span>}
      <span className={styles.label}>{text}</span>
    </>
  )
  const buttonClassName = clsx(styles.button, usedClasses(styles, used), className)

  function handleClick() {
    if (onClick) {
      onClick()
      return
    }
    if (!url) return
    const isExternal = url.startsWith('http')
    if (isExternal) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      router.push(url)
    }
  }

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={url || onClick ? handleClick : undefined}
      disabled={disabled}
    >
      {content}
    </button>
  )
}
