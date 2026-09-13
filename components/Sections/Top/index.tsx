import clsx from 'clsx'
import { HERO } from '@/constants/sections/hero'
import styles from './style.module.scss'

export default function Top() {
  return (
    <section id="top" className={clsx('section-contents-wrapper', styles.top)}>
      <div className="section-contents-inner">
        <div className={clsx('section-contents', 'serif')}>
          <h1 className={styles.companyName}>
            <p className={clsx(styles.hello, 'sans')}>{HERO.greeting}</p>
            <div className={styles.logoWrapper}>
              <img
                className={styles.companyLogo}
                src="/img/logo/logo_white.svg"
                alt={HERO.logoAlt}
              />
            </div>
          </h1>
          <div className={styles.companyCatch}>
            <p className={styles.catchJp}>{HERO.catchJp}</p>
            <p className={clsx(styles.catchEn, 'sans')}>{HERO.catchEn}</p>
            <div className={styles.catchFn}>
              {HERO.catchPrefix}
              <img className={styles.catchImg} src="/img/logo/2nd.svg" alt={HERO.logoAlt} />
              {HERO.catchSuffix}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
