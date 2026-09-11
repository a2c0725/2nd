import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import {
  COMPANY_ADDRESS,
  COMPANY_BRANCH_OFFICE_ADDRESS,
  COMPANY_BUSINESS_HOURS,
  COMPANY_BUSINESS_SCOPE,
  COMPANY_CAPITAL,
  COMPANY_ESTABLISHED_DATE,
  COMPANY_FAX,
  COMPANY_INFO_LABELS,
  COMPANY_LICENSE_NUMBER,
  COMPANY_LOGO_ALT,
  COMPANY_NAME,
  COMPANY_REPRESENTATIVE_NAME,
  COMPANY_TEL,
} from '@/constants/company'
import type { CompanyInfoRow } from '@/types/company'
import styles from './style.module.scss'

const COMPANY_INFO_ROWS: CompanyInfoRow[] = [
  { title: COMPANY_INFO_LABELS.name, text: `・${COMPANY_NAME}` },
  { title: COMPANY_INFO_LABELS.representative, text: `・${COMPANY_REPRESENTATIVE_NAME}` },
  {
    title: COMPANY_INFO_LABELS.address,
    text: (
      <>
        ・本社：{COMPANY_ADDRESS}
        <br />・営業所：{COMPANY_BRANCH_OFFICE_ADDRESS}
      </>
    ),
  },
  {
    title: COMPANY_INFO_LABELS.tel,
    text: (
      <>
        ・TEL{COMPANY_TEL}
        <br className="pcnone" />・FAX{COMPANY_FAX}
      </>
    ),
  },
  { title: COMPANY_INFO_LABELS.capital, text: `・${COMPANY_CAPITAL}` },
  { title: COMPANY_INFO_LABELS.businessHours, text: `・${COMPANY_BUSINESS_HOURS}` },
  {
    title: COMPANY_INFO_LABELS.businessScope,
    text: (
      <ul className={styles.contentsList}>
        {COMPANY_BUSINESS_SCOPE.map((item) => (
          <li className={styles.contentsItem} key={item}>
            ・{item}
          </li>
        ))}
      </ul>
    ),
  },
  { title: COMPANY_INFO_LABELS.licenseNumber, text: `・${COMPANY_LICENSE_NUMBER}` },
  { title: COMPANY_INFO_LABELS.establishedDate, text: `・${COMPANY_ESTABLISHED_DATE}` },
]

export default function Company() {
  return (
    <section id="company" className={clsx('section-contents-wrapper', styles.company)}>
      <div className="section-contents-inner">
        <BaseTitle navId="company" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={styles.companyInfo}>
              <ul className={styles.companyInfoList}>
                {COMPANY_INFO_ROWS.map((row) => (
                  <li className={styles.companyInfoItem} key={row.title}>
                    <div className={styles.companyInfoTitle}>{row.title}</div>
                    <div className={styles.companyInfoText}>{row.text}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.companyInfoLogo}>
              <img
                className={styles.companyLogo}
                src="/img/logo/company-info-logo-r.svg"
                alt={COMPANY_LOGO_ALT}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
