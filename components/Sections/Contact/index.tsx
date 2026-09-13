import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import { CONTACT, CONTACT_BUTTONS } from '@/constants/sections/contact'
import styles from './style.module.scss'

export default function Contact() {
  return (
    <section id="contact" className={clsx('section-contents-wrapper', styles.contact)}>
      <div className="section-contents-inner">
        <BaseTitle navId="contact" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <ul className={styles.telList}>
              <li className={styles.telItem}>TEL {CONTACT.tel}</li>
              <li className={styles.telItem}>FAX {CONTACT.fax}</li>
            </ul>
            <div className={styles.buttonWrapper}>
              {CONTACT_BUTTONS.map((button) => (
                <BaseButton key={button.text} text={button.text} url={button.url} used="contact" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
