import clsx from 'clsx'
import type { ScrollableSectionInnerProps } from '@/types/ui'
import styles from './style.module.scss'

export default function ScrollableSectionInner({ className, children }: ScrollableSectionInnerProps) {
  return <div className={clsx('section-inner', styles.scrollable, className)}>{children}</div>
}
