import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import { RENEWAL } from '@/constants/support/resident/renewal'
import supportStyles from '@/app/support/style.module.scss'

export default function RenewalSections() {
  const { step1, step2 } = RENEWAL
  return (
    <section className={clsx('section-contents-wrapper', supportStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="support-resident-renewal" used="support" type="white" />
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

            <div className={supportStyles.sectionItem}>
              <h3 className={supportStyles.heading}>{step2.heading}</h3>
              <div className={supportStyles.sectionItemContents}>
                <h4 className={supportStyles.sectionSubTitle}>{step2.item1.title}</h4>
                <p className={clsx('annotation', supportStyles.desc)}>{step2.item1.text}</p>
                <p
                  className={clsx(
                    'annotation',
                    supportStyles.desc,
                    supportStyles.annotationMargin,
                  )}
                >
                  {step2.item2.text}
                </p>
                <p className={clsx('annotation', supportStyles.desc)}>{step2.item3.text}</p>
                <p
                  className={clsx(
                    'annotation',
                    supportStyles.desc,
                    supportStyles.annotationMargin,
                  )}
                >
                  {step2.item4.text}
                </p>
              </div>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
