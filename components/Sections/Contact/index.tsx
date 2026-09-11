import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import { COMPANY_FAX, COMPANY_TEL } from '@/constants/company'
import { buttons, CONTACT_TITLE_PREFIX } from '@/constants/sections/contact'
import styles from './style.module.scss'

export default function Contact() {
  return (
    <section id="contact" className={clsx('section-contents-wrapper', styles.contact)}>
      <div className="section-contents-inner">
        <BaseTitle navId="contact" prefix={CONTACT_TITLE_PREFIX} type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <ul className={styles.telList}>
              <li className={styles.telItem}>TEL {COMPANY_TEL}</li>
              <li className={styles.telItem}>FAX {COMPANY_FAX}</li>
            </ul>
            <div className={styles.buttonWrapper}>
              {buttons.map((button) => (
                <BaseButton key={button.text} text={button.text} url={button.url} used="contact" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
