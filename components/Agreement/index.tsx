import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import { AGREEMENT } from '@/constants/agreement'
import supportStyles from '@/app/support/style.module.scss'
import styles from './style.module.scss'

export default function AgreementSections() {
  return (
    <section className={clsx('section-contents-wrapper', supportStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="agreement" used="support" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner className={styles.scrollableAlways}>
            <div className={clsx(supportStyles.sectionItem, styles.agreement)}>
              <p className={supportStyles.desc}>{AGREEMENT.desc}</p>
              {AGREEMENT.rules.map((rule) => (
                <div className={supportStyles.sectionItemContents} key={rule.title}>
                  <h3 className={supportStyles.sectionSubTitle}>{rule.title}</h3>
                  {rule.textList.map((block, index) =>
                    Array.isArray(block) ? (
                      <ul className={styles.annotationList} key={index}>
                        {block.map((item) => (
                          <li className={styles.annotationItem} key={item}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={supportStyles.desc} key={index}>
                        {block}
                      </p>
                    ),
                  )}
                </div>
              ))}
              <div className={clsx(supportStyles.sectionItemContents, styles.companyInfo)}>
                {AGREEMENT.companyInfo.map((info) => (
                  <p className={supportStyles.desc} key={info.title}>
                    {info.title}：{info.text}
                  </p>
                ))}
              </div>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
