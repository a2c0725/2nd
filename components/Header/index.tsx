import clsx from 'clsx'
import Link from 'next/link'
import { COMPANY } from '@/constants/common/company'
import { NAV_ITEMS } from '@/constants/common/nav'
import { BASE_PATH } from '@/constants/common/basePath'
import styles from './style.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <Link className={styles.logoLink} href="/#top">
            <img className={styles.logoImgR} src={`${BASE_PATH}/img/logo/logo_red.svg`} alt={COMPANY.logoAlt} />
            <img className={styles.logoImgW} src={`${BASE_PATH}/img/logo/logo_white.svg`} alt={COMPANY.logoAlt} />
          </Link>
        </div>
        <div className={clsx('menu-icon', styles.menuIcon)}>
          <span className={styles.line} />
          <span className={styles.line} />
        </div>
        <div className={clsx('sp-gnav', styles.spGnav)}>
          <ul className={styles.spGnavMenu}>
            {NAV_ITEMS.map((item) => (
              <li className={styles.spGnavItem} key={item.id}>
                <a className={styles.spGnavLink} href={`${BASE_PATH}/#${item.id}`}>
                  <span className={styles.gnavEn}>{item.label}</span>
                  <span className={styles.gnavKana}>{item.kana}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ul className={styles.gnav}>
          {NAV_ITEMS.map((item) => (
            <li className={styles.gnavItem} key={item.id}>
              <a className={clsx('gnav-link', styles.gnavLink)} href={`${BASE_PATH}/#${item.id}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={clsx('overlay', styles.overlay)}>
        <img className={styles.spLogoImgW} src={`${BASE_PATH}/img/logo/logo_white.svg`} alt={COMPANY.logoAlt} />
      </div>
    </header>
  )
}
