import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import {
  ABOUT_GREETING_TEXT,
  ABOUT_GREETING_TITLE,
  ABOUT_GREETING_TITLE_JP,
  ABOUT_INTRO_TEXT_LINE1,
  ABOUT_INTRO_TEXT_LINE2,
  ABOUT_INTRO_TITLE,
  ABOUT_THEME_TEXT_LINE1,
  ABOUT_THEME_TEXT_LINE2,
  ABOUT_THEME_TEXT_LINE3,
  ABOUT_THEME_TEXT_LINE4,
  ABOUT_THEME_TITLE,
  ABOUT_THEME_TITLE_JP,
} from '@/constants/sections/about'
import {
  COMPANY_LOGO_ALT,
  COMPANY_REPRESENTATIVE_NAME,
  COMPANY_REPRESENTATIVE_TITLE,
} from '@/constants/company'
import type { AboutItem } from '@/types/about'
import styles from './style.module.scss'

const ABOUT_ITEMS: AboutItem[] = [
  {
    id: 'intro',
    title: ABOUT_INTRO_TITLE,
    text: (
      <>
        {ABOUT_INTRO_TEXT_LINE1}
        <br />
        {ABOUT_INTRO_TEXT_LINE2}
      </>
    ),
  },
  {
    id: 'theme',
    title: (
      <>
        {ABOUT_THEME_TITLE}
        <span className={styles.titleJp}>{ABOUT_THEME_TITLE_JP}</span>
      </>
    ),
    text: (
      <>
        {ABOUT_THEME_TEXT_LINE1}
        <br />
        {ABOUT_THEME_TEXT_LINE2}
        <br className="spnone" />
        {ABOUT_THEME_TEXT_LINE3}
        <br className="spnone" />
        {ABOUT_THEME_TEXT_LINE4}
      </>
    ),
  },
  {
    id: 'greeting',
    title: (
      <>
        {ABOUT_GREETING_TITLE}
        <span className={styles.titleJp}>{ABOUT_GREETING_TITLE_JP}</span>
      </>
    ),
    text: ABOUT_GREETING_TEXT,
  },
]

export default function About() {
  return (
    <section id="about" className={clsx('section-contents-wrapper', styles.about)}>
      <div className="section-contents-inner">
        <BaseTitle navId="about" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={styles.aboutListArea}>
              <ul className={styles.aboutList}>
                {ABOUT_ITEMS.map((item) => (
                  <li className={styles.aboutItem} key={item.id}>
                    <h3 className={styles.aboutTitle}>{item.title}</h3>
                    <p className={styles.aboutText}>{item.text}</p>
                  </li>
                ))}
              </ul>
              <div className={styles.representativeName}>
                <span className={styles.post}>{COMPANY_REPRESENTATIVE_TITLE}</span>
                <span className={styles.name}>{COMPANY_REPRESENTATIVE_NAME}</span>
              </div>
            </div>
            <div className={styles.logoAbout}>
              <img
                className={styles.companyLogo}
                src="/img/logo/logo_notext_w.svg"
                alt={COMPANY_LOGO_ALT}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
