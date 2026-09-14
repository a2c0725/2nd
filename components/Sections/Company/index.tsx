import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import { COMPANY_INFO } from '@/constants/sections/company'
import type { CompanyInfoRow } from '@/types/company'
import styles from './style.module.scss'

const COMPANY_INFO_ROWS: CompanyInfoRow[] = [
  { title: COMPANY_INFO.labels.name, text: `・${COMPANY_INFO.name}` },
  { title: COMPANY_INFO.labels.representative, text: `・${COMPANY_INFO.representativeName}` },
  {
    title: COMPANY_INFO.labels.address,
    text: (
      <>
        ・本社：{COMPANY_INFO.address}
        <br />・営業所：{COMPANY_INFO.branchOfficeAddress}
      </>
    ),
  },
  {
    title: COMPANY_INFO.labels.tel,
    text: (
      <>
        ・TEL{COMPANY_INFO.tel}
        <br className="pcnone" />・FAX{COMPANY_INFO.fax}
      </>
    ),
  },
  { title: COMPANY_INFO.labels.capital, text: `・${COMPANY_INFO.capital}` },
  { title: COMPANY_INFO.labels.businessHours, text: `・${COMPANY_INFO.businessHours}` },
  {
    title: COMPANY_INFO.labels.businessScope,
    text: (
      <ul className={styles.contentsList}>
        {COMPANY_INFO.businessScope.map((item) => (
          <li className={styles.contentsItem} key={item}>
            ・{item}
          </li>
        ))}
      </ul>
    ),
  },
  { title: COMPANY_INFO.labels.licenseNumber, text: `・${COMPANY_INFO.licenseNumber}` },
  { title: COMPANY_INFO.labels.establishedDate, text: `・${COMPANY_INFO.establishedDate}` },
]

export default function Company() {
  return (
    <section id="company" className={clsx('section-contents-wrapper', styles.company)}>
      <div className="section-contents-inner">
        <BaseTitle navId="company" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
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
                alt={COMPANY_INFO.logoAlt}
              />
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
