import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import { AGREEMENT } from '@/constants/agreement'
import productStyles from '@/app/product/style.module.scss'
import styles from './style.module.scss'

export default function AgreementSections() {
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="agreement" used="product" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner className={styles.scrollableAlways}>
            <div className={clsx(productStyles.sectionItem, styles.agreement)}>
              <p className={productStyles.desc}>{AGREEMENT.desc}</p>
              {AGREEMENT.rules.map((rule) => (
                <div className={productStyles.sectionItemContents} key={rule.title}>
                  <h3 className={productStyles.sectionSubTitle}>{rule.title}</h3>
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
                      <p className={productStyles.desc} key={index}>
                        {block}
                      </p>
                    ),
                  )}
                </div>
              ))}
              <div className={clsx(productStyles.sectionItemContents, styles.companyInfo)}>
                {AGREEMENT.companyInfo.map((info) => (
                  <p className={productStyles.desc} key={info.title}>
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
