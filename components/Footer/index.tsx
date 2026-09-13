import clsx from 'clsx'
import { NAV_ITEMS } from '@/constants/common/nav'
import { COMPANY } from '@/constants/common/company'
import styles from './style.module.scss'

export default function Footer() {
  return (
    <footer className={clsx('section-contents-wrapper', styles.footer)}>
      <div className="section-contents-inner">
        <div className={styles.footerLogoArea}>
          <div className={styles.footerLogo}>
            <img className={styles.logoImg} src="/img/logo/logo_notext_w.svg" alt={COMPANY.logoAlt} />
            <img className={styles.logoImg} src="/img/logo/2nd.svg" alt={COMPANY.logoAlt} />
          </div>
          <ul className={styles.companyInfo}>
            <li className={styles.companyName}>{COMPANY.name}</li>
            <li className={styles.companyAddress}>{COMPANY.address}</li>
            <li className={styles.companyTel}>TEL {COMPANY.tel} </li>
            <li className={styles.companyFax}>FAX {COMPANY.fax}</li>
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
