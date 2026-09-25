import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import { CANCELLATION } from '@/constants/support/resident/cancellation'
import supportStyles from '@/app/support/style.module.scss'

export default function Step1() {
  const { step1 } = CANCELLATION
  return (
    <section className={clsx('section-contents-wrapper', supportStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="support-resident-cancellation" used="support" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={supportStyles.sectionItem}>
              <h3 className={supportStyles.heading}>{step1.heading}</h3>
              {step1.items.map((item) => (
                <div className={supportStyles.sectionItemContents} key={item.title}>
                  <h4 className={supportStyles.sectionSubTitle}>{item.title}</h4>
                  <p className={supportStyles.desc}>{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
