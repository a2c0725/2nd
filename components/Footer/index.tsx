import clsx from 'clsx'
import { NAV_ITEMS } from '@/constants/nav'
import {
  COMPANY_ADDRESS,
  COMPANY_FAX,
  COMPANY_LOGO_ALT,
  COMPANY_NAME,
  COMPANY_TEL,
} from '@/constants/company'
import styles from './style.module.scss'

export default function Footer() {
  return (
    <footer className={clsx('section-contents-wrapper', styles.footer)}>
      <div className="section-contents-inner">
        <div className={styles.footerLogoArea}>
          <div className={styles.footerLogo}>
            <img className={styles.logoImg} src="/img/logo/logo_notext_w.svg" alt={COMPANY_LOGO_ALT} />
            <img className={styles.logoImg} src="/img/logo/2nd.svg" alt={COMPANY_LOGO_ALT} />
          </div>
          <ul className={styles.companyInfo}>
            <li className={styles.companyName}>{COMPANY_NAME}</li>
            <li className={styles.companyAddress}>{COMPANY_ADDRESS}</li>
            <li className={styles.companyTel}>TEL {COMPANY_TEL} </li>
            <li className={styles.companyFax}>FAX {COMPANY_FAX}</li>
          </ul>
        </div>
        <div className={styles.gnavArea}>
          <ul className={styles.gnav}>
            {NAV_ITEMS.map((item) => (
              <li className={styles.gnavItem} key={item.id}>
                <a className={clsx('gnav-link', styles.gnavLink)} href={`/#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <small className={styles.copyright}>&copy; 2024 2nd All rights reserved</small>
    </footer>
  )
}
