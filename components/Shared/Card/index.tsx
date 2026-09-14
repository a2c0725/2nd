import clsx from 'clsx'
import BaseButton from '@/components/Shared/Button/BaseButton'
import type { CardProps } from '@/types/ui'
import { usedClasses } from '@/utility/usedClasses'
import styles from './style.module.scss'

export default function Card({ title, description, url, disabled, type, used }: CardProps) {
  return (
    <div className={clsx(styles.card, disabled && styles.disabled, usedClasses(styles, used))}>
      {type === 'commingsoon' && (
        <div className={styles.commingsoonWrap}>
          <span className={styles.commingsoonText}>Coming soon...</span>
          <div className={styles.commingsoonOverlay} />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {url ? (
        <BaseButton
          text="詳細はこちら"
          url={url}
          used={used}
          disabled={type === 'commingsoon'}
        />
      ) : (
        <BaseButton text="詳細はこちら" used={used} disabled={type === 'commingsoon'} />
      )}
    </div>
  )
}
