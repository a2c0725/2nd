import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import { CANCELLATION, CANCELLATION_STEP4_BUTTONS } from '@/constants/support/resident/cancellation'
import supportStyles from '@/app/support/style.module.scss'

export default function Step4() {
  const { step4 } = CANCELLATION
  return (
    <section className={clsx('section-contents-wrapper', supportStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="support-resident-cancellation" used="support" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={supportStyles.sectionItem}>
              <h3 className={supportStyles.heading}>{step4.heading}</h3>
              <div className={supportStyles.sectionItemContents}>
                <h4 className={supportStyles.sectionSubTitle}>{step4.item1.title}</h4>
                <p className={supportStyles.desc}>{step4.item1.text}</p>
                <p className={clsx(supportStyles.desc, supportStyles.annotationMargin)}>
                  {step4.item1.notice}
                </p>
              </div>
              <div className={clsx(supportStyles.annotationBox, supportStyles.sectionItemContents)}>
                <h4 className={supportStyles.sectionSubTitle}>{step4.item2.title}</h4>
                <p className={supportStyles.desc}>{step4.item2.text}</p>
              </div>
              <div className={supportStyles.downloadButtons}>
                {CANCELLATION_STEP4_BUTTONS.map((button) => (
                  <BaseButton
                    key={button.text}
                    text={button.text}
                    url={button.url}
                    download={'download' in button ? button.download : undefined}
                    used="resident"
                  />
                ))}
              </div>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
