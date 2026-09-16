import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import { ABOUT } from '@/constants/sections/about'
import { BASE_PATH } from '@/constants/common/basePath'
import styles from './style.module.scss'

export default function About() {
  return (
    <section id="about" className={clsx('section-contents-wrapper', styles.about)}>
      <div className="section-contents-inner">
        <BaseTitle navId="about" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={styles.aboutListArea}>
              <ul className={styles.aboutList}>
                {ABOUT.items.map((item) => {
                  const [titleMain, titleJp] = item.title.split('\n')
                  return (
                    <li className={styles.aboutItem} key={item.title}>
                      <h3 className={styles.aboutTitle}>
                        {titleMain}
                        {titleJp && <span className={styles.titleJp}>{titleJp}</span>}
                      </h3>
                      <p className={styles.aboutText}>
                        {item.text}
                        {'subText' in item && (
                          <>
                            <br />
                            <span className={styles.themeSubText}>{item.subText}</span>
                          </>
                        )}
                      </p>
                    </li>
                  )
                })}
              </ul>
              <div className={styles.representativeName}>
                <span className={styles.post}>{ABOUT.representativeTitle}</span>
                <span className={styles.name}>{ABOUT.representativeName}</span>
              </div>
            </div>
            <div className={styles.logoAbout}>
              <img
                className={styles.companyLogo}
                src={`${BASE_PATH}/img/logo/logo_notext_w.svg`}
                alt={ABOUT.logoAlt}
              />
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
