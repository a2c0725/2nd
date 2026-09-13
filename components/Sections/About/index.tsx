import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import { ABOUT } from '@/constants/sections/about'
import type { AboutItem } from '@/types/about'
import styles from './style.module.scss'

const ABOUT_ITEMS: AboutItem[] = [
  {
    id: 'intro',
    title: ABOUT.introTitle,
    text: (
      <>
        {ABOUT.introTextLine1}
        <br />
        {ABOUT.introTextLine2}
      </>
    ),
  },
  {
    id: 'theme',
    title: (
      <>
        {ABOUT.themeTitle}
        <span className={styles.titleJp}>{ABOUT.themeTitleJp}</span>
      </>
    ),
    text: (
      <>
        {ABOUT.themeTextLine1}
        <br />
        {ABOUT.themeTextLine2}
        <br className="spnone" />
        {ABOUT.themeTextLine3}
        <br className="spnone" />
        {ABOUT.themeTextLine4}
      </>
    ),
  },
  {
    id: 'greeting',
    title: (
      <>
        {ABOUT.greetingTitle}
        <span className={styles.titleJp}>{ABOUT.greetingTitleJp}</span>
      </>
    ),
    text: ABOUT.greetingText,
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
                <span className={styles.post}>{ABOUT.representativeTitle}</span>
                <span className={styles.name}>{ABOUT.representativeName}</span>
              </div>
            </div>
            <div className={styles.logoAbout}>
              <img
                className={styles.companyLogo}
                src="/img/logo/logo_notext_w.svg"
                alt={ABOUT.logoAlt}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
