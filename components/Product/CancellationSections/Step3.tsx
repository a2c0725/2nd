import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import { CANCELLATION } from '@/constants/product/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step3() {
  const { step3 } = CANCELLATION
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{step3.heading}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step3.item1.title}</h4>
                <p className={productStyles.desc}>{step3.item1.text}</p>
                <p className={clsx(productStyles.desc, productStyles.annotationMargin)}>
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
