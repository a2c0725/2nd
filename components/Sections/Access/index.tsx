import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import { COMPANY_OFFICES } from '@/constants/company'
import styles from './style.module.scss'

export default function Access() {
  return (
    <section id="access" className={clsx('section-contents-wrapper', styles.access)}>
      <div className="section-contents-inner">
        <BaseTitle navId="access" />
        <div className="section-contents">
          {COMPANY_OFFICES.map((office) => (
            <div className="section-inner" key={office.title}>
              <div className={styles.accessAddress}>
                <p className={styles.officeTitle}>{office.title}</p>
                <p className={styles.postCode}>{office.postalCode}</p>
                <p className={styles.address}>{office.address}</p>
              </div>
              <div className={styles.accessMap}>
                <iframe
                  className={styles.mapFrame}
                  src={office.mapEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
