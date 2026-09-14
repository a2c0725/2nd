import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import { CANCELLATION } from '@/constants/product/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step2() {
  const { step2 } = CANCELLATION
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{step2.heading}</h3>
              {step2.items.map((item) => (
                <div className={productStyles.sectionItemContents} key={item.title}>
                  <h4 className={productStyles.sectionSubTitle}>{item.title}</h4>
                  <p className={productStyles.desc}>{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
