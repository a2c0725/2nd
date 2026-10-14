import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import { CANCELLATION } from '@/constants/support/resident/cancellation'
import supportStyles from '@/app/support/style.module.scss'

export default function Step3() {
  const { step3 } = CANCELLATION
  return (
    <section className={clsx('section-contents-wrapper', supportStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="support-resident-cancellation" used="support" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={supportStyles.sectionItem}>
              <h3 className={supportStyles.heading}>{step3.heading}</h3>
              <div className={supportStyles.sectionItemContents}>
                <h4 className={supportStyles.sectionSubTitle}>{step3.item1.title}</h4>
                <p className={supportStyles.desc}>{step3.item1.text}</p>
                <p className={clsx(supportStyles.desc, supportStyles.annotationMargin)}>
                  {step3.item1.notice}
                </p>
              </div>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
