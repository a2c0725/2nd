import clsx from 'clsx'
import BaseButton from '@/components/Shared/Button/BaseButton'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <section className={clsx('section-contents-wrapper', 'not-found', styles.notFound)}>
      <div className={clsx('section-contents-inner', styles.inner)}>
        <p className={styles.code}>404</p>
        <p className={styles.message}>お探しのページが見つかりませんでした。</p>
        <BaseButton text="トップページへ戻る" url="/" className={styles.backButton} />
      </div>
    </section>
  )
}
