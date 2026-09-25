import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import {
  RESIDENT,
  RESIDENT_PROCEDURE_BUTTONS,
  RESIDENT_LIFESTYLE_BUTTONS,
} from '@/constants/support/resident'
import supportStyles from '@/app/support/style.module.scss'
import styles from './style.module.scss'

export default function ResidentSections() {
  return (
    <section className={clsx('section-contents-wrapper', supportStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="support-resident" used="support" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner className={supportStyles.resident}>
            <div className={supportStyles.sectionItem}>
              <h3 className={supportStyles.heading}>{RESIDENT.guidanceHeading}</h3>
              <div className={supportStyles.sectionItemContents}>
                <p className={supportStyles.desc}>{RESIDENT.guidanceText}</p>
              </div>
            </div>

            <div className={supportStyles.sectionItem}>
              <h3 className={supportStyles.heading}>{RESIDENT.proceduresHeading}</h3>
              <div className={supportStyles.sectionItemContents}>
                <div className={styles.buttonGroup}>
                  {RESIDENT_PROCEDURE_BUTTONS.map((button) => (
                    <BaseButton key={button.text} text={button.text} url={button.url} used="resident" />
                  ))}
                </div>
              </div>
            </div>

            <div className={supportStyles.sectionItem}>
              <h3 className={supportStyles.heading}>{RESIDENT.lifestyleHeading}</h3>
              <div className={supportStyles.sectionItemContents}>
                <div className={styles.buttonGroup}>
                  {RESIDENT_LIFESTYLE_BUTTONS.map((button) => (
                    <BaseButton key={button.text} text={button.text} url={button.url} used="resident" />
                  ))}
                </div>
              </div>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
