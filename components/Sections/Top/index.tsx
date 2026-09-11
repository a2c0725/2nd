import clsx from 'clsx'
import { COMPANY_LOGO_ALT } from '@/constants/company'
import {
  HERO_CATCH_EN,
  HERO_CATCH_JP,
  HERO_CATCH_PREFIX,
  HERO_CATCH_SUFFIX,
  HERO_GREETING,
} from '@/constants/sections/hero'
import styles from './style.module.scss'

export default function Top() {
  return (
    <section id="top" className={clsx('section-contents-wrapper', styles.top)}>
      <div className="section-contents-inner">
        <div className={clsx('section-contents', 'serif')}>
          <h1 className={styles.companyName}>
            <p className={clsx(styles.hello, 'sans')}>{HERO_GREETING}</p>
            <div className={styles.logoWrapper}>
              <img
                className={styles.companyLogo}
                src="/img/logo/logo_white.svg"
                alt={COMPANY_LOGO_ALT}
              />
            </div>
          </h1>
          <div className={styles.companyCatch}>
            <p className={styles.catchJp}>{HERO_CATCH_JP}</p>
            <p className={clsx(styles.catchEn, 'sans')}>{HERO_CATCH_EN}</p>
            <div className={styles.catchFn}>
              {HERO_CATCH_PREFIX}
              <img className={styles.catchImg} src="/img/logo/2nd.svg" alt={COMPANY_LOGO_ALT} />
              {HERO_CATCH_SUFFIX}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
